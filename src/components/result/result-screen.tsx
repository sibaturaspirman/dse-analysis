"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useLocale } from "@/components/i18n/locale-context";
import { AppHeader } from "@/components/layout/app-header";
import { headingHeadline } from "@/lib/typography";

const REPORTS = {
  full: {
    src: "/images/DRDT.jpg",
    alt: "Full scalp and hair assessment report",
    downloadName: "dse-report-full.jpg",
  },
  advanced: {
    src: "/images/OSDT.jpg",
    alt: "Advanced scalp and hair assessment report",
    downloadName: "dse-report-advanced.jpg",
  },
} as const;

type ReportTab = keyof typeof REPORTS;

const COPY = {
  idn: {
    title: "Laporan Rambut & Kulit Kepalamu Sudah Siap",
    subtitle: "Profil rambut personalmu sudah siap.",
    full: "Full Report",
    advanced: "Advanced",
    tap: "Tap to open your report",
    share: "Share",
    products: "Product Recommendations",
    close: "Close",
  },
  eng: {
    title: "Your Hair & Scalp Report Is Ready",
    subtitle: "Your personal hair profile is ready.",
    full: "Full Report",
    advanced: "Advanced",
    tap: "Tap to open your report",
    share: "Share",
    products: "Product Recommendations",
    close: "Close",
  },
} as const;

export function ResultScreen() {
  const { locale } = useLocale();
  const t = COPY[locale];
  const [tab, setTab] = useState<ReportTab>("full");
  const [zoomed, setZoomed] = useState(false);
  const report = REPORTS[tab];

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden">
      <div className="relative z-10 mx-auto flex h-full w-full flex-col">
        <AppHeader />

        <div className="flex min-h-0 flex-1 flex-col items-center px-4 sm:px-8">
          <div className="mt-1 w-[min(92%,675px)] bg-white/10 px-3 py-2 text-center backdrop-blur-[3px] sm:mt-2 sm:px-4">
            <h1 className={headingHeadline}>{t.title}</h1>
          </div>
          <p className="text-base md:text-lead mt-3 text-center text-white/50 sm:mt-4">
            {t.subtitle}
          </p>

          <div className="mt-4 flex items-center justify-center gap-3 sm:mt-6 sm:gap-4">
            {(["full", "advanced"] as const).map((id) => {
              const selected = tab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`text-xs md:text-base rounded-full px-5 py-2.5 font-medium uppercase sm:px-6 sm:py-3.5 ${
                    selected
                      ? "bg-black/35 text-white"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {t[id]}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setZoomed(true)}
            className="relative mt-4 w-[min(78%,23.5rem)] flex-1 sm:mt-0"
            aria-label={t.tap}
          >
            <span
              className="absolute top-[8%] right-0 bottom-[4%] left-[12%] rounded-[1.4rem] bg-black"
              aria-hidden
            />
            <span
              className="absolute top-[4%] right-[6%] bottom-[8%] left-[6%] rounded-[1.4rem] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
              aria-hidden
            />
            <span className="absolute inset-x-0 top-[7%] bottom-0 flex flex-col rounded-[1.6rem] bg-[#163844] px-5 pt-5 pb-6 text-left shadow-[0_18px_40px_rgba(0,0,0,0.25)] sm:px-6 sm:pt-6">
              <Image
                src="/images/logo.svg"
                alt=""
                width={133}
                height={37}
                className="h-7 w-auto sm:h-9"
              />
              <span className="mt-auto">
                <span className="text-lead block font-medium text-white">
                  Personalized Assessment Report
                </span>
                <span className="mt-2 block text-[clamp(0.8rem,0.4rem+1.4vw,1.15rem)] text-white/90 italic">
                  Prepared exclusively for you
                </span>
              </span>
            </span>
            <span className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white/17 px-3.5 py-1.5 text-white backdrop-blur-md sm:px-4 sm:py-2">
              <Image
                src="/images/zoom-in.svg"
                alt=""
                width={20}
                height={20}
                className="size-4 shrink-0 sm:size-5"
              />
              <span className="text-[clamp(0.75rem,0.45rem+0.9vw,1rem)] leading-none whitespace-nowrap">
                {t.tap}
              </span>
            </span>
          </button>
        </div>

        <div className="mx-auto flex w-full max-w-[734px] items-center gap-3 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:gap-4 sm:px-8 sm:pb-6">
          <Link
            href="/share"
            className="flex h-[clamp(2.75rem,1.4rem+4vw,4rem)] w-[30%] shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white text-[clamp(0.85rem,0.4rem+1.5vw,1.25rem)] font-medium whitespace-nowrap text-[#4f9fa6] transition hover:bg-white/90"
          >
            {t.share}
          </Link>
          <Link
            href="/products"
            className="flex h-[clamp(2.75rem,1.4rem+4vw,4rem)] min-w-0 flex-1 items-center justify-center rounded-full border-2 border-white/30 bg-white/11 px-4 text-[clamp(0.8rem,0.35rem+1.5vw,1.15rem)] font-medium whitespace-nowrap text-white backdrop-blur-[52px] transition hover:bg-white/20"
          >
            {t.products}
          </Link>
        </div>
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t.tap}
          onClick={() => setZoomed(false)}
        >
          <button
            type="button"
            className="absolute top-5 right-5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md"
            onClick={() => setZoomed(false)}
          >
            {t.close}
          </button>
          <Image
            src={report.src}
            alt={report.alt}
            width={1200}
            height={1800}
            className="max-h-[90dvh] w-auto max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
