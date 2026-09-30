"use client";

import Image from "next/image";
import { LanguageToggle } from "@/components/layout/language-toggle";

type AppHeaderProps = {
  className?: string;
  variant?: "dark" | "light";
  /** Larger stacked logo (logo.png includes [scalp° Intelligence]) */
  size?: "default" | "hero";
};

export function AppHeader({
  className = "",
  variant = "dark",
  size = "default",
}: AppHeaderProps) {
  const isLight = variant === "light";
  const isHero = size === "hero";

  return (
    <header
      className={`z-20 flex shrink-0 justify-between gap-2 sm:gap-3 pb-0 ${
        isHero
          ? "absolute inset-x-[4%] top-[4.8%] w-auto items-start px-3 sm:top-[4.4%] sm:px-4 md:px-5"
          : "relative w-full items-center px-4 pt-3 pb-0 sm:px-6 sm:pt-5 md:px-10 md:pt-8"
      } ${className}`}
    >
      <div
        className={`flex min-w-0 flex-1 items-center gap-1.5 sm:gap-3 ${
          isHero ? "mt-5 sm:mt-6 md:mt-7" : ""
        }`}
      >
        {isHero ? (
          <Image
            src="/images/logo.png"
            alt="dse Dermascalp Expert [scalp° Intelligence]"
            width={1310}
            height={380}
            priority
            className="h-auto w-[min(58%,250px)] sm:w-[280px] md:w-[318px]"
          />
        ) : (
          <>
            <Image
              src="/images/logo.svg"
              alt="dse Dermascalp Expert"
              width={251}
              height={70}
              priority
              className={`logo-mark ${isLight ? "brightness-0" : ""}`}
            />
            <span
              className={`type-meta truncate tracking-wide ${
                isLight ? "text-[#404040]/80" : "text-white/90"
              }`}
            >
              [scalp° Intelligence]
            </span>
          </>
        )}
      </div>
      <LanguageToggle
        variant={variant}
        className={isHero ? "-translate-y-1/2" : ""}
      />
    </header>
  );
}
