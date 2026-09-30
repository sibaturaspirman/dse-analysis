"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const STEPS = [
  "Scalp Condition",
  "Hair Condition",
  "Hair Density",
  "Hair Type",
] as const;

const STEP_DELAY_MS = 700;
const REDIRECT_DELAY_MS = 900;

export function LoadingScreen() {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(0);
  const [showEllipsis, setShowEllipsis] = useState(true);

  useEffect(() => {
    if (visibleCount >= STEPS.length) {
      setShowEllipsis(false);
      const redirectTimer = window.setTimeout(() => {
        router.push("/result");
      }, REDIRECT_DELAY_MS);
      return () => window.clearTimeout(redirectTimer);
    }

    const timer = window.setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, STEP_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [visibleCount, router]);

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <div className="relative z-10 mx-auto flex h-full w-full flex-col px-6">
        <header className="flex shrink-0 items-center justify-center pt-5 sm:pt-7 md:pt-8">
          <Image
            src="/images/logo.svg"
            alt="dse Dermascalp Expert"
            width={177}
            height={50}
            priority
            className="logo-mark"
          />
        </header>

        <div className="mt-6 flex shrink-0 flex-col items-center gap-3 text-center text-white sm:mt-8 sm:gap-4 md:mt-10 md:gap-5">
          <p className="type-label font-bold uppercase tracking-[0.04em]">
            Your Initial Analysis
          </p>
          <h1 className="type-display max-w-[520px] font-medium">
            Your hair profile is ready.
          </h1>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center py-4">
          <div className="relative size-[220px] sm:size-[280px] md:size-[318px]">
            <div className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgba(120,220,230,0.35)_0%,rgba(120,220,230,0)_70%)] blur-md" />
            <Image
              src="/images/biomimetic.png"
              alt="Biomimetic analysis"
              fill
              priority
              sizes="(max-width: 800px) 70vw, 318px"
              className="object-contain animate-[pulse-soft_3s_ease-in-out_infinite]"
            />
          </div>
        </div>

        <div className="mx-auto mb-10 flex w-full max-w-[295px] flex-col items-start justify-center gap-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:mb-12 sm:gap-10 md:mb-16 md:gap-12">
          {STEPS.map((step, index) => {
            const isDone = index < visibleCount;
            return (
              <div
                key={step}
                className={`type-lead flex items-center gap-1.5 text-white transition-all duration-500 ${
                  isDone
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                <span aria-hidden>✓</span>
                <span>{step}</span>
              </div>
            );
          })}

          {showEllipsis && visibleCount > 0 && visibleCount < STEPS.length && (
            <p
              className="type-lead tracking-[0.35em] text-white"
              aria-hidden
            >
              <span className="inline-flex gap-1">
                <span className="animate-[dot_1.2s_ease-in-out_infinite]">.</span>
                <span className="animate-[dot_1.2s_ease-in-out_0.2s_infinite]">.</span>
                <span className="animate-[dot_1.2s_ease-in-out_0.4s_infinite]">.</span>
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
