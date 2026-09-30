"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ScanOverlayProps = {
  className?: string;
  /** When false, keeps layout but pauses animation (e.g. before transition reveal) */
  active?: boolean;
  /** Glide to random spots over the hair, looping */
  wander?: boolean;
};

type Offset = { x: number; y: number };

/** Offsets (% of the viewfinder) that stay on the hair, not the face/empty bg */
const HAIR_SPOTS: Offset[] = [
  { x: 0, y: 0 },
  { x: -42, y: 18 },
  { x: -18, y: -32 },
  { x: 28, y: 36 },
  { x: -55, y: 58 },
  { x: 48, y: 8 },
  { x: -8, y: 48 },
  { x: 18, y: -22 },
];

const MOVE_MS = 2600;

function jitteredSpot(spot: Offset): Offset {
  return {
    x: spot.x + (Math.random() * 16 - 8),
    y: spot.y + (Math.random() * 16 - 8),
  };
}

/**
 * Figma Scan Variant3 (254×261): one viewfinder + clipped mesh,
 * with a light band sweeping inside the square (node 7144:7311).
 */
export function ScanOverlay({
  className = "",
  active = true,
  wander = false,
}: ScanOverlayProps) {
  const [offset, setOffset] = useState<Offset>(HAIR_SPOTS[0]);

  useEffect(() => {
    if (!wander || !active) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let lastIndex = 0;

    const move = () => {
      let next = Math.floor(Math.random() * HAIR_SPOTS.length);
      if (next === lastIndex) {
        next = (next + 1) % HAIR_SPOTS.length;
      }
      lastIndex = next;
      setOffset(jitteredSpot(HAIR_SPOTS[next]));
    };

    const id = window.setInterval(move, MOVE_MS);
    return () => window.clearInterval(id);
  }, [wander, active]);

  return (
    <div
      className={`pointer-events-none ${className}`}
      data-active={active ? "true" : "false"}
      aria-hidden
      style={
        wander
          ? {
              transform: `translate3d(${offset.x}%, ${offset.y}%, 0)`,
              transition: active
                ? "transform 1.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s ease-out"
                : "opacity 0.7s ease-out",
            }
          : undefined
      }
    >
      <div className="scan-overlay relative aspect-[254/261] w-full">
        <Image
          src="/images/scan-frame.png"
          alt=""
          fill
          priority
          sizes="32vw"
          className="object-contain mix-blend-screen"
        />

        <div className="absolute top-[8.4%] right-[7.5%] bottom-[8.8%] left-[7.1%] overflow-hidden">
          <div className="scan-line absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#d9d9d9] from-0% to-transparent to-[59%] mix-blend-overlay" />
        </div>
      </div>
    </div>
  );
}
