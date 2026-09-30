"use client";

import { AppHeader } from "@/components/layout/app-header";
import { HairSelector } from "@/components/hair/hair-selector";
import { useLocale } from "@/components/i18n/locale-context";

const COPY = {
  idn: {
    title: "Apa Tipe Rambut Alami Kamu?",
  },
  eng: {
    title: "What is your Natural Hair Type?",
  },
} as const;

export function HairScreen() {
  const { locale } = useLocale();
  const t = COPY[locale];

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <div className="relative z-10 mx-auto flex h-full w-full flex-col">
        <AppHeader />

        <section className="flex min-h-0 flex-1 flex-col pt-2 sm:pt-4 md:pt-6">
          <h1 className="type-headline mx-auto max-w-[42rem] shrink-0 px-5 text-center font-medium text-white sm:px-8">
            {t.title}
          </h1>

          <div className="mt-3 flex min-h-0 flex-1 flex-col sm:mt-5 md:mt-6">
            <HairSelector />
          </div>
        </section>
      </div>
    </div>
  );
}
