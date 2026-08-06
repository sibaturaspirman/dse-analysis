"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const REPORTS = [
  {
    id: "drdt",
    src: "/images/DRDT.jpg",
    alt: "DRDT scalp and hair analysis report",
    downloadName: "dse-report-DRDT.jpg",
  },
  {
    id: "osdt",
    src: "/images/OSDT.jpg",
    alt: "OSDT scalp and hair analysis report",
    downloadName: "dse-report-OSDT.jpg",
  },
] as const;

export function ResultScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const activeReport = REPORTS[activeIndex] ?? REPORTS[0];

  return (
    <div className="relative min-h-dvh w-full overflow-x-hidden">
      <Image
        src="/images/bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[800px] flex-col px-5 pb-8 sm:px-8 md:px-8">
        <header className="flex shrink-0 items-center justify-center pt-5 sm:pt-7 md:pt-8">
          <Image
            src="/images/logo.svg"
            alt="dse Dermascalp Expert"
            width={177}
            height={50}
            priority
            className="h-8 w-auto sm:h-10 md:h-[50px]"
          />
        </header>

        <section className="mt-6 flex flex-1 flex-col items-center sm:mt-8 md:mt-10">
          <h1 className="max-w-[533px] text-center text-[28px] font-medium leading-tight text-white sm:text-[40px] md:text-[48px] md:leading-[56px]">
            Review your scalp and hair assessment
          </h1>

          <button
            type="button"
            onClick={() => setZoomed(true)}
            className="mt-4 flex items-center gap-3 text-white transition hover:opacity-80 sm:mt-5"
          >
            <Image
              src="/images/zoom-in.svg"
              alt=""
              width={24}
              height={24}
              className="size-5 sm:size-6"
              aria-hidden
            />
            <span className="text-[16px] sm:text-[20px] md:text-[24px] md:leading-[41px]">
              Tap to close up your report
            </span>
          </button>

          <div className="relative mt-6 w-full max-w-[471px] sm:mt-8">
            <Swiper
              modules={[Pagination]}
              slidesPerView={1}
              spaceBetween={16}
              pagination={{
                el: ".result-pagination",
                clickable: true,
              }}
              onSwiper={(swiper: SwiperType) => setActiveIndex(swiper.activeIndex)}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="result-swiper w-full overflow-visible"
            >
              {REPORTS.map((report, index) => (
                <SwiperSlide key={report.id}>
                  <button
                    type="button"
                    onClick={() => setZoomed(true)}
                    className="w-full overflow-hidden rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition hover:scale-[1.01]"
                    aria-label={`Open ${report.id.toUpperCase()} report preview`}
                  >
                    <Image
                      src={report.src}
                      alt={report.alt}
                      width={856}
                      height={1284}
                      priority={index === 0}
                      className="h-auto w-full"
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="result-pagination mt-4 flex items-center justify-center gap-2" />
          </div>
        </section>

        <div className="mx-auto mt-8 flex w-full max-w-[734px] flex-col gap-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:mt-10 sm:flex-row sm:gap-4 md:mt-12">
          <Link
            href="/"
            className="flex h-[64px] flex-1 items-center justify-center rounded-full border-2 border-white/30 bg-[rgba(255,255,255,0.11)] text-[18px] font-medium text-white backdrop-blur-[52px] transition hover:bg-white/20 sm:h-[80px] sm:text-[24px] md:h-[106px] md:text-[32px]"
          >
            Back to Home
          </Link>
          <a
            href={activeReport.src}
            download={activeReport.downloadName}
            className="flex h-[64px] flex-1 items-center justify-center rounded-full border-2 border-white/30 bg-white text-[18px] font-medium text-[#4f9fa6] transition hover:bg-white/90 sm:h-[80px] sm:text-[24px] md:h-[106px] md:text-[32px]"
          >
            Download
          </a>
        </div>
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Report close-up"
          onClick={() => setZoomed(false)}
        >
          <button
            type="button"
            className="absolute top-5 right-5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md"
            onClick={() => setZoomed(false)}
          >
            Close
          </button>
          <Image
            src={activeReport.src}
            alt={`${activeReport.alt} close-up`}
            width={1200}
            height={1800}
            className="max-h-[90dvh] w-auto max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
