"use client";

import Image from "next/image";
import Link from "next/link";
import { AppHeader } from "@/components/layout/app-header";
import { useLocale } from "@/components/i18n/locale-context";
import { ScanOverlay } from "@/components/shared/scan-overlay";

const COPY = {
  idn: {
    developed: "Dikembangkan bersama\nDermatologist & Global Trikologist",
    headline: "Kenali scalp-mu lebih dalam.",
    cta: "Start scalp analysis",
  },
  eng: {
    developed: "Developed with\nDermatologist & Global Trikologist",
    headline: "Know your scalp deeper.",
    cta: "Start scalp analysis",
  },
} as const;

export function LandingScreen() {
  const { locale } = useLocale();
  const t = COPY[locale];

  return (
    <div className="relative h-dvh w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-[4%] inset-y-[4.8%] border border-white/45 sm:inset-y-[4.4%]"
          aria-hidden
        >
          <span className="absolute -top-[7px] -left-[6px] text-[11px] leading-none text-white sm:text-[13px]">
            +
          </span>
          <span className="absolute -top-[7px] -right-[6px] text-[11px] leading-none text-white sm:text-[13px]">
            +
          </span>
          <span className="absolute -bottom-[7px] -left-[6px] text-[11px] leading-none text-white sm:text-[13px]">
            +
          </span>
          <span className="absolute -right-[6px] -bottom-[7px] text-[11px] leading-none text-white sm:text-[13px]">
            +
          </span>
        </div>

        <div className="absolute inset-x-0 top-[6.75rem] bottom-0 sm:top-[8rem] md:top-[9.5rem]">
          <Image
            src="/images/talent-home-fix.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_top]"
          />
        </div>

        <AppHeader size="hero" />

        <ScanOverlay wander className="absolute top-[28%] left-[27.6%] z-[6] w-[min(32vw,280px)] sm:top-[26%]" />

        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#0a242c] via-[#0a242c]/75 to-transparent px-[4.1%] pt-24 pb-[max(1.1rem,env(safe-area-inset-bottom))] sm:pt-32 sm:pb-7 md:pt-40">
          <p className="max-w-[80%] whitespace-pre-line text-[15px] leading-[1.25] text-white uppercase sm:text-[28px] md:text-[40px] md:leading-[1.2]">
            {t.developed}
          </p>
          <h1 className="mt-4 max-w-[90%] text-[16px] font-bold leading-tight tracking-wide text-white uppercase sm:mt-6 sm:text-[30px] md:mt-8 md:text-[40px] md:leading-none">
            {t.headline}
          </h1>

          <Link
            href="/form"
            className="mt-5 flex h-[56px] w-full items-center justify-center rounded-full border-2 border-white/30 bg-white/18 text-[16px] font-medium text-white backdrop-blur-[52px] transition hover:bg-white/28 sm:mt-7 sm:h-[88px] sm:text-[28px] md:mt-8 md:h-[104px] md:text-[36px]"
          >
            {t.cta}
          </Link>
        </div>
    </div>
  );
}
