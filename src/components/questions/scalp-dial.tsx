"use client";

import Image from "next/image";
import { PointerEvent, useEffect, useRef, useState } from "react";

import { useLocale } from "@/components/i18n/locale-context";
import type { ScalpOption } from "@/lib/questions";

const SIZE = 360;
const CENTER = SIZE / 2;
const TRACK_R = 148;
const NODE_R = 20;
const STROKE = 9;
const LABEL_R = TRACK_R + 46;
const IMAGE_R = TRACK_R - 22;
/** Inside this radius the pointer angle is too noisy, so rotation follows finger travel. */
const INNER_R = 78;
const SNAP_MS = 340;
const TAP_PX = 12;

function norm(deg: number) {
  return ((deg % 360) + 360) % 360;
}

function shortestDelta(from: number, to: number) {
  let d = norm(to) - norm(from);
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

function polarToXY(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: Math.round((CENTER + radius * Math.cos(rad)) * 100) / 100,
    y: Math.round((CENTER + radius * Math.sin(rad)) * 100) / 100,
  };
}

function pointerPolar(clientX: number, clientY: number, rect: DOMRect) {
  const x = ((clientX - rect.left) / rect.width) * SIZE - CENTER;
  const y = ((clientY - rect.top) / rect.height) * SIZE - CENTER;
  let angle = (Math.atan2(y, x) * 180) / Math.PI + 90;
  if (angle < 0) angle += 360;
  return { angle, radius: Math.hypot(x, y), x: x + CENTER, y: y + CENTER };
}

function nearestOption(angle: number, options: ScalpOption[]) {
  let best = options[0];
  let bestDiff = Infinity;
  for (const option of options) {
    const diff = Math.abs(shortestDelta(angle, option.angle));
    if (diff < bestDiff) {
      bestDiff = diff;
      best = option;
    }
  }
  return { option: best, diff: bestDiff };
}

function describeSweep(startAngle: number, sweepDeg: number, radius: number) {
  const sweep = Math.max(-359.5, Math.min(359.5, sweepDeg));
  if (Math.abs(sweep) < 1) return "";
  const start = polarToXY(startAngle, radius);
  const end = polarToXY(norm(startAngle + sweep), radius);
  const large = Math.abs(sweep) > 180 ? 1 : 0;
  const sweepFlag = sweep >= 0 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} ${sweepFlag} ${end.x} ${end.y}`;
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

/** Follow the ring, but stay within ±90° so labels never read upside down. */
function labelRotation(angle: number) {
  let rot = angle > 180 ? angle - 360 : angle;
  if (rot > 90) rot -= 180;
  if (rot < -90) rot += 180;
  return Math.round(rot);
}

function hitOption(
  point: { x: number; y: number },
  options: ScalpOption[],
) {
  let hit: ScalpOption | null = null;
  let best = NODE_R + 14;
  for (const option of options) {
    const node = polarToXY(option.angle, TRACK_R);
    const dist = Math.hypot(point.x - node.x, point.y - node.y);
    if (dist < best) {
      best = dist;
      hit = option;
    }
  }
  return hit;
}

type ScalpDialProps = {
  options: ScalpOption[];
  value: string | null;
  onChange: (optionId: string) => void;
};

export function ScalpDial({ options, value, onChange }: ScalpDialProps) {
  const { locale } = useLocale();
  const dialRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const sweepRef = useRef(0);
  const arcOriginRef = useRef(0);
  const shownIdRef = useRef<string | null>(value);
  const paintRef = useRef<number | null>(null);
  const snapRef = useRef<number | null>(null);
  const optionsRef = useRef(options);
  const onChangeRef = useRef(onChange);
  const valueRef = useRef(value);
  const dragRef = useRef<{
    lastAngle: number;
    lastX: number;
    lastY: number;
    moved: number;
    inside: boolean;
    armed: boolean;
  } | null>(null);

  const [displayAngle, setDisplayAngle] = useState(0);
  const [sweep, setSweep] = useState(0);
  const [arcOrigin, setArcOrigin] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [showArc, setShowArc] = useState(false);
  const [shownId, setShownId] = useState<string | null>(value);

  optionsRef.current = options;
  onChangeRef.current = onChange;

  function cancelSnap() {
    if (snapRef.current != null) cancelAnimationFrame(snapRef.current);
    snapRef.current = null;
  }

  function paint() {
    if (paintRef.current != null) return;
    paintRef.current = requestAnimationFrame(() => {
      paintRef.current = null;
      setDisplayAngle(angleRef.current);
      setSweep(sweepRef.current);
      setArcOrigin(arcOriginRef.current);
      setShownId(shownIdRef.current);
    });
  }

  function select(id: string) {
    shownIdRef.current = id;
    if (id !== valueRef.current) {
      valueRef.current = id;
      onChangeRef.current(id);
    }
  }

  function animateTo(target: number, keepArc: boolean) {
    cancelSnap();
    const start = angleRef.current;
    const delta = shortestDelta(start, target);
    const startSweep = keepArc ? sweepRef.current : 0;
    if (!keepArc) {
      sweepRef.current = 0;
      setShowArc(false);
    }
    if (Math.abs(delta) < 0.4) {
      angleRef.current = norm(target);
      sweepRef.current = keepArc ? startSweep : 0;
      paint();
      return;
    }
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / SNAP_MS);
      const eased = easeOutCubic(t);
      angleRef.current = norm(start + delta * eased);
      sweepRef.current = startSweep + delta * eased;
      paint();
      if (t < 1) snapRef.current = requestAnimationFrame(step);
      else snapRef.current = null;
    };
    snapRef.current = requestAnimationFrame(step);
  }

  useEffect(() => {
    return () => {
      cancelSnap();
      if (paintRef.current != null) cancelAnimationFrame(paintRef.current);
    };
  }, []);

  useEffect(() => {
    if (dragRef.current || snapRef.current != null) {
      valueRef.current = value;
      return;
    }
    if (value === valueRef.current && shownIdRef.current === value) return;
    valueRef.current = value;
    const selected = options.find((option) => option.id === value) ?? null;
    shownIdRef.current = selected?.id ?? null;
    setShownId(shownIdRef.current);
    if (!selected) return;
    angleRef.current = selected.angle;
    arcOriginRef.current = selected.angle;
    sweepRef.current = 0;
    setDisplayAngle(selected.angle);
    setArcOrigin(selected.angle);
    setSweep(0);
    setShowArc(false);
  }, [value, options]);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    const el = dialRef.current;
    if (!el) return;
    cancelSnap();
    const polar = pointerPolar(
      event.clientX,
      event.clientY,
      el.getBoundingClientRect(),
    );
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* pointer already released */
    }
    dragRef.current = {
      lastAngle: polar.angle,
      lastX: event.clientX,
      lastY: event.clientY,
      moved: 0,
      inside: polar.radius < INNER_R,
      armed: false,
    };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const el = dialRef.current;
    if (!drag || !el) return;
    const rect = el.getBoundingClientRect();
    const polar = pointerPolar(event.clientX, event.clientY, rect);
    const dx = event.clientX - drag.lastX;
    const dy = event.clientY - drag.lastY;
    drag.moved += Math.hypot(dx, dy);
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;

    if (drag.moved < 4) return;

    if (!drag.armed) {
      // Near the center the angle is unstable, so wait until the finger is on the ring.
      if (!valueRef.current && polar.radius < INNER_R) return;
      drag.armed = true;
      const start = valueRef.current ? angleRef.current : polar.angle;
      angleRef.current = start;
      arcOriginRef.current = start;
      sweepRef.current = 0;
      drag.lastAngle = polar.angle;
      drag.inside = false;
      setEngaged(true);
      setShowArc(Boolean(valueRef.current));
      paint();
      return;
    }

    let delta = 0;
    if (polar.radius >= INNER_R) {
      if (drag.inside) {
        drag.inside = false;
        drag.lastAngle = polar.angle;
      } else {
        delta = shortestDelta(drag.lastAngle, polar.angle);
        drag.lastAngle = polar.angle;
      }
    } else {
      drag.inside = true;
      const rad = ((angleRef.current - 90) * Math.PI) / 180;
      const tx = -Math.sin(rad);
      const ty = Math.cos(rad);
      const scale = rect.width / SIZE;
      const tangentialPx = dx * tx + dy * ty;
      delta = (tangentialPx / scale / TRACK_R) * (180 / Math.PI);
    }

    if (Math.abs(delta) < 0.05) return;

    angleRef.current = norm(angleRef.current + delta);
    sweepRef.current += delta;
    setShowArc(true);

    const { option, diff } = nearestOption(angleRef.current, optionsRef.current);
    const current = optionsRef.current.find(
      (item) => item.id === shownIdRef.current,
    );
    const currentDiff = current
      ? Math.abs(shortestDelta(angleRef.current, current.angle))
      : Infinity;
    if (
      option.id !== shownIdRef.current &&
      (diff + 6 < currentDiff || diff < 14)
    ) {
      select(option.id);
    }

    paint();
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    const armed = drag.armed;
    dragRef.current = null;
    setEngaged(false);
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }

    const el = dialRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const polar = pointerPolar(event.clientX, event.clientY, rect);
    const list = optionsRef.current;

    if (!armed || drag.moved < TAP_PX) {
      const hit = hitOption(polar, list);
      if (hit) {
        const hadValue = valueRef.current != null;
        select(hit.id);
        if (!hadValue) {
          angleRef.current = hit.angle;
          arcOriginRef.current = hit.angle;
          sweepRef.current = 0;
          setShowArc(false);
          paint();
          return;
        }
        animateTo(hit.angle, false);
        return;
      }
      if (!valueRef.current) {
        sweepRef.current = 0;
        setShowArc(false);
        paint();
      }
      return;
    }

    const { option } = nearestOption(angleRef.current, list);
    select(option.id);
    setShowArc(true);
    animateTo(option.angle, true);
  }

  const activeImage =
    options.find((option) => option.id === shownId)?.image ??
    options[0]?.image;
  const knobVisible = Boolean(shownId) || engaged;
  const knob = knobVisible ? polarToXY(displayAngle, TRACK_R) : null;
  const arcPath = showArc ? describeSweep(arcOrigin, sweep, TRACK_R) : "";

  return (
    <div
      ref={dialRef}
      className="relative mx-auto aspect-square w-[min(78vw,500px)] cursor-grab touch-none select-none active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={options.length - 1}
      aria-valuetext={
        options.find((option) => option.id === shownId)?.label[locale] ??
        "Select"
      }
      aria-label="Scalp condition dial"
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={TRACK_R}
          fill="none"
          stroke="rgba(255,255,255,0.92)"
          strokeWidth={STROKE}
        />

        {arcPath ? (
          <path
            d={arcPath}
            fill="none"
            stroke="#4a999e"
            strokeWidth={STROKE}
            strokeLinecap="round"
          />
        ) : null}
      </svg>

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 overflow-hidden rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.9)]"
        style={{
          width: `${((IMAGE_R * 2) / SIZE) * 100}%`,
          height: `${((IMAGE_R * 2) / SIZE) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {activeImage ? <DialPhoto src={activeImage} /> : null}
      </div>

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
      >
        {options.map((option) => {
          const { x, y } = polarToXY(option.angle, TRACK_R);
          return (
            <circle
              key={option.id}
              cx={x}
              cy={y}
              r={NODE_R}
              fill="#d7e4e5"
              stroke="#fff"
              strokeWidth={3}
            />
          );
        })}

        {knob ? (
          <circle
            cx={knob.x}
            cy={knob.y}
            r={NODE_R}
            fill="#4a999e"
            stroke="#fff"
            strokeWidth={3}
          />
        ) : null}
      </svg>

      {options.map((option) => {
        const { x, y } = polarToXY(option.angle, LABEL_R);
        const isActive = option.id === shownId;
        const lines = option.labelLines[locale];
        return (
          <span
            key={option.id}
            className={`type-dial pointer-events-none absolute z-30 text-center ${
              isActive ? "font-semibold text-[#4a999e]" : "text-[#241f21]"
            }`}
            style={{
              left: `${((x / SIZE) * 100).toFixed(2)}%`,
              top: `${((y / SIZE) * 100).toFixed(2)}%`,
              transform: `translate(-50%, -50%) rotate(${labelRotation(option.angle)}deg)`,
            }}
          >
            {lines[0]}
            {lines[1] ? (
              <>
                <br />
                {lines[1]}
              </>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}

function DialPhoto({ src }: { src: string }) {
  const [current, setCurrent] = useState(src);
  const [previous, setPrevious] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (src === current) return;
    setPrevious(current);
    setCurrent(src);
    setVisible(false);
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [src, current]);

  return (
    <div className="relative h-full w-full">
      {previous ? (
        <Image
          src={previous}
          alt=""
          fill
          draggable={false}
          sizes="(max-width: 800px) 60vw, 320px"
          className="pointer-events-none object-cover"
        />
      ) : null}
      <Image
        src={current}
        alt=""
        fill
        draggable={false}
        sizes="(max-width: 800px) 60vw, 320px"
        className={`pointer-events-none object-cover transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        priority
        onTransitionEnd={() => setPrevious(null)}
      />
    </div>
  );
}
