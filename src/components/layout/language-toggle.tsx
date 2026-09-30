"use client";

import { useLocale, type Locale } from "@/components/i18n/locale-context";

type LanguageToggleProps = {
  className?: string;
  variant?: "dark" | "light";
};

export function LanguageToggle({
  className = "",
  variant = "dark",
}: LanguageToggleProps) {
  const { locale, setLocale } = useLocale();
  const isLight = variant === "light";

  return (
    <div
      className={`relative flex shrink-0 items-center gap-1 rounded-full border-2 p-1 backdrop-blur-[52px] sm:gap-2 sm:p-1.5 md:p-2 ${
        isLight
          ? "border-[#4a999e]/25 bg-white/50"
          : "border-white/30 bg-white/18"
      } ${className}`}
      role="group"
      aria-label="Language"
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute top-1 bottom-1 w-[calc(50%-2px)] rounded-full bg-white transition-transform duration-300 sm:top-1.5 sm:bottom-1.5 ${
          locale === "idn" ? "left-1 translate-x-0 sm:left-1.5" : "left-1 translate-x-[100%] sm:left-1.5"
        }`}
      />
      {(["idn", "eng"] as Locale[]).map((option) => {
        const active = locale === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLocale(option)}
            className={`type-toggle relative z-10 min-w-[2.6rem] px-2 py-1.5 uppercase leading-none transition sm:min-w-[3.25rem] sm:px-3 sm:py-2 ${
              active
                ? isLight
                  ? "text-[#4a999e]"
                  : "text-[#151515]"
                : isLight
                  ? "text-[#151515]"
                  : "text-white"
            }`}
          >
            {option === "idn" ? "IDN" : "ENG"}
          </button>
        );
      })}
    </div>
  );
}
