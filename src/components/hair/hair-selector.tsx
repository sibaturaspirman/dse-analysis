"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { HAIR_TYPES } from "@/lib/hair-types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function HairSelector() {
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeHair = HAIR_TYPES[activeIndex] ?? HAIR_TYPES[0];

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
    swiperRef.current?.slideToLoop(index);
  }, []);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-[700px] shrink-0 flex-wrap items-center justify-center gap-2 px-4 sm:gap-3 md:gap-4">
        {HAIR_TYPES.map((hair, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={hair.id}
              type="button"
              onClick={() => goToSlide(index)}
              className={`rounded-full px-4 py-3 text-[13px] font-bold uppercase leading-none transition sm:px-5 sm:py-4 sm:text-[18px] md:px-6 md:py-6 md:text-[24px] md:leading-6 ${
                isActive
                  ? "bg-white text-[#4f9fa6]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {hair.label}
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-4 w-full max-w-[561px] shrink-0 px-6 sm:mt-5">
        <div className="h-px w-full bg-white/40" />
      </div>

      <div className="mx-auto mt-3 flex w-full max-w-[600px] shrink-0 items-center justify-between px-6 sm:mt-4 sm:px-8 md:px-0">
        <p className="text-[15px] text-white sm:text-[20px] md:text-[24px] md:leading-8">
          Select Specific Hair
        </p>
        <p className="text-[15px] font-bold text-white sm:text-[20px] md:text-[24px] md:leading-8">
          {activeHair.code}
        </p>
      </div>

      {/* Hair swiper — fills remaining height, image anchored to bottom */}
      <div className="relative mt-1 min-h-0 flex-1">
        <div className="absolute inset-x-0 bottom-0 top-0">
          <Swiper
            modules={[Navigation, Pagination]}
            centeredSlides
            loop
            slidesPerView="auto"
            spaceBetween={0}
            navigation={{
              prevEl: ".hair-nav-prev",
              nextEl: ".hair-nav-next",
            }}
            pagination={{
              el: ".hair-pagination",
              clickable: true,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            className="hair-swiper h-full !overflow-visible"
          >
            {HAIR_TYPES.map((hair) => (
              <SwiperSlide
                key={hair.id}
                className="hair-slide !flex !h-full !w-[78%] max-w-[551px] items-end justify-center sm:!w-[72%]"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={hair.image}
                    alt={`${hair.label} hair type ${hair.code}`}
                    fill
                    sizes="(max-width: 800px) 78vw, 551px"
                    className="object-contain object-bottom"
                    priority={hair.id === "straight"}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          type="button"
          aria-label="Previous hair type"
          className="hair-nav-prev absolute top-[38%] left-3 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-[52px] transition hover:bg-white/20 sm:left-5 sm:size-16 md:left-8 md:size-[88px]"
        >
          <Image
            src="/images/chevron-nav.svg"
            alt=""
            width={24}
            height={24}
            className="size-5 rotate-180 sm:size-6"
            aria-hidden
          />
        </button>

        <button
          type="button"
          aria-label="Next hair type"
          className="hair-nav-next absolute top-[38%] right-3 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-[52px] transition hover:bg-white/20 sm:right-5 sm:size-16 md:right-8 md:size-[88px]"
        >
          <Image
            src="/images/chevron-nav.svg"
            alt=""
            width={24}
            height={24}
            className="size-5 sm:size-6"
            aria-hidden
          />
        </button>

      </div>

      {/* Pagination + Continue — fixed bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex flex-col items-center gap-4 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:gap-5 sm:px-8 sm:pb-6 md:gap-6 md:px-12 md:pb-8">
        <div className="hair-pagination pointer-events-auto flex items-center justify-center gap-3" />
        <button
          type="button"
          onClick={() =>
            router.push(`/questions?hair=${encodeURIComponent(activeHair.id)}`)
          }
          className="pointer-events-auto mx-auto flex h-[64px] w-full max-w-[600px] items-center justify-center rounded-full border-2 border-white/30 bg-[rgba(255,255,255,0.11)] text-[20px] font-medium text-white backdrop-blur-[52px] transition hover:bg-white/20 sm:h-[80px] sm:text-[28px] md:h-[106px] md:text-[32px]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
