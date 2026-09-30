"use client";

import Image from "next/image";
import Link from "next/link";

import { useLocale } from "@/components/i18n/locale-context";
import { AppHeader } from "@/components/layout/app-header";
import { headingHeadline } from "@/lib/typography";

const COPY = {
  idn: {
    title: "Share Profile Rambut & Kulit Kepalamu di Social Media",
    back: "Back",
    download: "Download Story",
  },
  eng: {
    title: "Share Your Hair & Scalp Profile on Social Media",
    back: "Back",
    download: "Download Story",
  },
} as const;

export function ShareScreen() {
  const { locale } = useLocale();
  const t = COPY[locale];

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden">
      <div className="relative z-10 mx-auto flex h-full w-full flex-col">
        <AppHeader />

        <div className="flex min-h-0 flex-1 flex-col items-center px-4 sm:px-8">
          <div className="mt-1 w-[min(92%,675px)] bg-white/10 px-3 py-2 text-center backdrop-blur-[3px] sm:mt-2 sm:px-4">
            <h1 className={headingHeadline}>{t.title}</h1>
          </div>

          <div className="mt-4 flex min-h-0 w-full flex-1 items-center justify-center sm:mt-6">
            <Image
              src="/images/share-story.png"
              alt="Hair and scalp profile story"
              width={437}
              height={777}
              priority
              className="h-auto max-h-full w-[min(78%,437px)] object-contain shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
            />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[734px] items-center gap-3 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:gap-4 sm:px-8 sm:pb-6">
          <Link
            href="/result"
            className="flex h-[clamp(2.75rem,1.4rem+4vw,4rem)] w-[30%] shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white/17 text-[clamp(0.85rem,0.4rem+1.5vw,1.25rem)] font-medium whitespace-nowrap text-white backdrop-blur-[52px] transition hover:bg-white/25"
          >
            {t.back}
          </Link>
          <a
            href="/images/share-story.png"
            download="dse-share-story.png"
            className="flex h-[clamp(2.75rem,1.4rem+4vw,4rem)] min-w-0 flex-1 items-center justify-center rounded-full border-2 border-white/30 bg-white text-[clamp(0.85rem,0.4rem+1.5vw,1.25rem)] font-medium whitespace-nowrap text-[#4f9fa6] transition hover:bg-white/90"
          >
            {t.download}
          </a>
        </div>
      </div>
    </div>
  );
}
