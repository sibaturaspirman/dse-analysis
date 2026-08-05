"use client";

import Image from "next/image";
import { PointerEvent, useCallback, useMemo, useRef } from "react";

import { ANSWER_OPTIONS, type AnswerOption } from "@/lib/questions";

const SIZE = 320;
const CENTER = SIZE / 2;
const TRACK_R = 118;
const NODE_R = 18;
const STROKE = 10;

function polarToXY(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function describeArc(startAngle: number, endAngle: number, radius: number) {
  if (endAngle <= 0) return "";

  const start = polarToXY(0, radius);
  const end = polarToXY(endAngle, radius);
  const largeArc = endAngle > 180 ? 1 : 0;

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

function angleFromPoint(clientX: number, clientY: number, rect: DOMRect) {
  const x = clientX - (rect.left + rect.width / 2);
  const y = clientY - (rect.top + rect.height / 2);
  let deg = (Math.atan2(y, x) * 180) / Math.PI + 90;
  if (deg < 0) deg += 360;
  return deg;
}

function nearestOption(angle: number): AnswerOption {
  let best = ANSWER_OPTIONS[0];
  let bestDiff = Infinity;

  for (const option of ANSWER_OPTIONS) {
    const diff = Math.min(
      Math.abs(angle - option.angle),
      360 - Math.abs(angle - option.angle),
    );
    if (diff < bestDiff) {
      bestDiff = diff;
      best = option;
    }
  }

  return best;
}

type AnswerDialProps = {
  value: string | null;
  onChange: (optionId: string) => void;
};

export function AnswerDial({ value, onChange }: AnswerDialProps) {
  const dialRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const selected = useMemo(
    () => ANSWER_OPTIONS.find((o) => o.id === value) ?? null,
    [value],
  );

  const selectFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const el = dialRef.current;
      if (!el) return;
      const angle = angleFromPoint(clientX, clientY, el.getBoundingClientRect());
      onChange(nearestOption(angle).id);
    },
    [onChange],
  );

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    selectFromPointer(e.clientX, e.clientY);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    selectFromPointer(e.clientX, e.clientY);
  }

  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  const labelPositions = ANSWER_OPTIONS.map((option) => {
    const pos = polarToXY(option.angle, TRACK_R + 52);
    return { option, ...pos };
  });

  return (
    <div className="relative mx-auto w-full max-w-[480px] select-none px-2 pb-8 pt-5">
      <div className="absolute top-1 left-1/2 z-10 -translate-x-1/2">
        <Image
          src="/images/rotate-hint.svg"
          alt=""
          width={66}
          height={16}
          className="h-3.5 w-auto opacity-80 sm:h-4"
          aria-hidden
        />
      </div>

      <div
        ref={dialRef}
        className="relative mx-auto aspect-square w-[min(100%,300px)] touch-none sm:w-[340px] md:w-[380px]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="slider"
        aria-valuetext={selected?.label ?? "Rotate for Answer"}
        aria-label="Answer dial"
      >
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full overflow-visible">
          <circle
            cx={CENTER}
            cy={CENTER}
            r={TRACK_R + 28}
            fill="rgba(255,255,255,0.55)"
          />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={TRACK_R}
            fill="none"
            stroke="rgba(74,153,158,0.18)"
            strokeWidth={STROKE}
          />

          {selected && (
            <path
              d={describeArc(0, selected.angle, TRACK_R)}
              fill="none"
              stroke="#4a999e"
              strokeWidth={STROKE}
              strokeLinecap="round"
            />
          )}

          {/* Start node at top — active before answer */}
          {!selected && (
            <circle
              cx={CENTER}
              cy={CENTER - TRACK_R}
              r={NODE_R}
              fill="#4a999e"
            />
          )}

          {ANSWER_OPTIONS.map((option) => {
            const { x, y } = polarToXY(option.angle, TRACK_R);
            const isActive = option.id === value;
            return (
              <g key={option.id}>
                <circle
                  cx={x}
                  cy={y}
                  r={NODE_R + 12}
                  fill="transparent"
                  className="cursor-pointer"
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    onChange(option.id);
                  }}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={NODE_R}
                  fill={isActive ? "#4a999e" : "#d7e4e5"}
                  stroke={isActive ? "#fff" : "transparent"}
                  strokeWidth={3}
                  className="pointer-events-none transition-colors"
                />
              </g>
            );
          })}
        </svg>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-14 text-center">
          <p className="text-[20px] font-medium leading-tight text-[#4a999e] sm:text-[26px] md:text-[34px] md:leading-[44px]">
            {selected?.label ?? "Rotate for Answer"}
          </p>
        </div>

        {labelPositions.map(({ option, x, y }) => (
          <span
            key={option.id}
            className="pointer-events-none absolute max-w-[88px] -translate-x-1/2 -translate-y-1/2 text-center text-[11px] leading-tight text-[#241f21] sm:max-w-[100px] sm:text-[13px] md:text-[15px]"
            style={{
              left: `${(x / SIZE) * 100}%`,
              top: `${(y / SIZE) * 100}%`,
            }}
          >
            {option.label}
          </span>
        ))}
      </div>
    </div>
  );
}
