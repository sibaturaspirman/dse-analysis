"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useLocale } from "@/components/i18n/locale-context";
import { AppHeader } from "@/components/layout/app-header";
import { ScanOverlay } from "@/components/shared/scan-overlay";

/** Prototype timing: hold 0.8s, talent rise 1.5s ease-out, scan 0.8s. */
const HOLD_MS = 800;
const RISE_MS = 1500;
const SCAN_DELAY_MS = 800;
const SCAN_MS = 800;
const EXIT_MS = 2000;
const EASE_OUT = "cubic-bezier(0, 0, 0.58, 1)";

type Phase = "hold" | "rise" | "scan";

const VARIANTS = {
  intro: {
    talentSrc: "/images/talent-home-fix.png",
    objectPosition: "center top",
    scanClassName: "top-[6%] left-[35.5%]",
    nextHref: "/lifestyle",
    autoAdvance: true,
    copy: {
      idn: {
        title: "Awal yang bagus!",
        subtitle: "Selanjutnya, mari kenali gaya hidupmu.",
        tip: "Tips: Kebiasaan sehari-harimu dapat membantu memahami kebutuhan rambutmu.",
        continue: "Continue",
      },
      eng: {
        title: "Great start!",
        subtitle: "Next, let's get to know your lifestyle.",
        tip: "Tip: Your daily habits can help us understand your hair needs.",
        continue: "Continue",
      },
    },
  },
  done: {
    talentSrc: "/images/talent-hijab.png",
    objectPosition: "74% top",
    scanClassName: "top-[12%] left-[17%]",
    nextHref: "/result",
    autoAdvance: false,
    copy: {
      idn: {
        title: "Analisis Selesai",
        subtitle:
          "Kami telah mengumpulkan semua informasinya untuk memahami kondisi rambutmu dengan lebih baik.",
        tip: "Tips: Kebiasaan sehari-harimu dapat membantu memahami kebutuhan rambutmu.",
        continue: "Continue",
      },
      eng: {
        title: "Analysis complete",
        subtitle:
          "We've gathered everything we need to understand your hair better.",
        tip: "Tip: Your daily habits can help us understand your hair needs.",
        continue: "Continue",
      },
    },
  },
} as const;

export function TransitionScreen({
  variant = "intro",
}: {
  variant?: keyof typeof VARIANTS;
}) {
  const router = useRouter();
  const { locale } = useLocale();
  const config = VARIANTS[variant];
  const t = config.copy[locale];
  const [phase, setPhase] = useState<Phase>("hold");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("scan");
      if (!config.autoAdvance) return;
      const done = window.setTimeout(() => router.push(config.nextHref), 1600);
      return () => window.clearTimeout(done);
    }

    const riseAt = HOLD_MS;
    const scanAt = HOLD_MS + RISE_MS + SCAN_DELAY_MS;
    const exitAt = scanAt + SCAN_MS + EXIT_MS;

    const rise = window.setTimeout(() => setPhase("rise"), riseAt);
    const scan = window.setTimeout(() => setPhase("scan"), scanAt);
    const done = config.autoAdvance
      ? window.setTimeout(() => router.push(config.nextHref), exitAt)
      : undefined;

    return () => {
      window.clearTimeout(rise);
      window.clearTimeout(scan);
      if (done) window.clearTimeout(done);
    };
  }, [router, config.autoAdvance, config.nextHref]);

  const talentIn = phase !== "hold";
  const scanIn = phase === "scan";
  const step = phase === "hold" ? 0 : phase === "rise" ? 1 : 2;
  const showContinue = !config.autoAdvance && scanIn;

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <div className="relative z-10 mx-auto flex h-full w-full flex-col">
        <AppHeader />

        <div className="relative flex min-h-0 flex-1 flex-col">
          <div
            className="pointer-events-none absolute inset-x-5 inset-y-2 border border-white/55 sm:inset-x-8 sm:inset-y-3 md:inset-x-10"
            aria-hidden
          >
            <span className="absolute -top-1 -left-1 size-2 rounded-full bg-white sm:size-2.5" />
            <span className="absolute -top-1 -right-1 size-2 rounded-full bg-white sm:size-2.5" />
            <span className="absolute -bottom-1 -left-1 size-2 rounded-full bg-white sm:size-2.5" />
            <span className="absolute -right-1 -bottom-1 size-2 rounded-full bg-white sm:size-2.5" />
          </div>

          <div className="relative z-20 mx-auto mt-2 w-[min(92%,565px)] px-4 text-center sm:mt-4 sm:px-6">
            <div className="bg-white/10 px-3 py-2 backdrop-blur-[3px] sm:px-4 sm:py-2.5">
              <h1 className="type-display font-medium text-white">{t.title}</h1>
            </div>
            <p className="type-lead mt-3 text-white sm:mt-4">{t.subtitle}</p>
          </div>

          <div className="relative min-h-0 flex-1">
            <div
              className="pointer-events-none absolute inset-x-0 top-1 bottom-0 overflow-hidden will-change-[transform,opacity] motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:!transition-none"
              style={{
                opacity: talentIn ? 1 : 0,
                transform: talentIn
                  ? "translate3d(0, 0, 0)"
                  : "translate3d(20%, 42%, 0)",
                transition: `transform ${RISE_MS}ms ${EASE_OUT}, opacity ${RISE_MS}ms ${EASE_OUT}`,
              }}
            >
              {variant === "done" ? (
                <Image
                  src={config.talentSrc}
                  alt=""
                  width={1942}
                  height={1224}
                  priority
                  className="pointer-events-none absolute top-0 h-auto w-[243%] max-w-none"
                  style={{ left: "-130%" }}
                />
              ) : (
                <Image
                  src={config.talentSrc}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: config.objectPosition }}
                />
              )}
              {variant === "done" ? (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a3a44]/80" />
              ) : null}
            </div>

            <div
              className={`pointer-events-none absolute z-[5] w-[31.75%] max-w-[16rem] will-change-[transform,opacity] motion-reduce:!scale-100 motion-reduce:!opacity-100 motion-reduce:!transition-none ${config.scanClassName}`}
              style={{
                opacity: scanIn ? 1 : 0,
                transform: scanIn ? "scale(1)" : "scale(0.08)",
                transition: `transform ${SCAN_MS}ms ${EASE_OUT}, opacity ${SCAN_MS}ms ${EASE_OUT}`,
              }}
            >
              <ScanOverlay active={scanIn} />
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-10 sm:pb-8 md:pb-10">
              <p className="type-lead mx-auto max-w-[692px] text-center text-white">
                {t.tip}
              </p>

              {showContinue ? (
                <button
                  type="button"
                  onClick={() => router.push(config.nextHref)}
                  className="btn-cta mx-auto mt-5 flex w-full max-w-[600px] items-center justify-center rounded-full border-2 border-white/30 bg-white/11 font-medium text-white backdrop-blur-[52px] transition hover:bg-white/20 sm:mt-7"
                >
                  {t.continue}
                </button>
              ) : (
                <div className="mt-5 flex items-center justify-center gap-1.5 sm:mt-7 sm:gap-2">
                  {[0, 1, 2].map((i) => {
                    const active = i <= step;
                    const isLast = i === 2;
                    return (
                      <span
                        key={i}
                        className={`h-3 rounded-full border border-white/25 backdrop-blur-[21px] transition-all duration-500 sm:h-4 ${
                          isLast ? "w-3 sm:w-4" : "w-12 sm:w-16"
                        } ${active ? "bg-white/90" : "bg-white/35"}`}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
