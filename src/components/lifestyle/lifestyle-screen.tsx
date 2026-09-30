"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLocale } from "@/components/i18n/locale-context";
import { AppHeader } from "@/components/layout/app-header";
import { PageBackground } from "@/components/layout/page-background";
import {
  LIFESTYLE_QUESTIONS,
  TOTAL_LIFESTYLE_QUESTIONS,
} from "@/lib/lifestyle-questions";

const COPY = {
  idn: {
    title: "Pertanyaan Lifestyle",
    answered: (n: number) => `${n}/${TOTAL_LIFESTYLE_QUESTIONS} Answered Question`,
    continue: "Continue",
  },
  eng: {
    title: "Lifestyle Questions",
    answered: (n: number) => `${n}/${TOTAL_LIFESTYLE_QUESTIONS} Answered Question`,
    continue: "Continue",
  },
} as const;

export function LifestyleScreen() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = COPY[locale];
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === TOTAL_LIFESTYLE_QUESTIONS;
  const progress = (answeredCount / TOTAL_LIFESTYLE_QUESTIONS) * 100;

  function handleContinue() {
    if (!allAnswered) return;
    router.push("/complete");
  }

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden">
      <PageBackground src="/images/bg-journey.png" />
      <div className="relative z-10 mx-auto flex h-full w-full flex-col">
        <AppHeader variant="light" />

        <div className="shrink-0 px-4 sm:px-8 md:px-10">
          <div className="flex items-end justify-between gap-3">
            <h1 className="type-page font-medium text-[#404040]">
              {t.title}
            </h1>
            <p className="type-body shrink-0 pb-0.5 text-[#4a999e]">
              {t.answered(answeredCount)}
            </p>
          </div>
          <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-[#4a999e]/15 sm:mt-4">
            <div
              className="h-full rounded-full bg-[#4a999e]/45 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-4 pb-4 sm:mt-6 sm:px-8 sm:pb-6 md:px-10">
          <div className="flex flex-col gap-4 sm:gap-5">
            {LIFESTYLE_QUESTIONS.map((question) => {
              const selected = answers[question.id];
              return (
                <article
                  key={question.id}
                  className="rounded-[clamp(1.25rem,0.3rem+3.8vw,2.2rem)] border border-white/40 bg-white/80 px-[clamp(1rem,0.2rem+2.6vw,1.5rem)] py-[clamp(1rem,0.2rem+2.6vw,1.5rem)] shadow-[0_1px_0_rgba(74,153,158,0.06)] backdrop-blur-md"
                >
                  <div className="flex gap-3 sm:gap-4">
                    <span className="type-body shrink-0 font-semibold leading-none text-[#4a999e]">
                      {question.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="type-lead font-medium leading-snug text-[#4a999e]">
                        {question.text[locale]}
                      </h2>

                      <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:mt-6 sm:grid-cols-2 sm:gap-y-8">
                        {question.options.map((option) => {
                          const isSelected = selected === option.id;
                          return (
                            <label
                              key={option.id}
                              className="flex cursor-pointer items-start gap-4"
                            >
                              <span className="relative mt-0.5 flex size-[clamp(1.25rem,0.4rem+3.2vw,2rem)] shrink-0 items-center justify-center">
                                <input
                                  type="radio"
                                  name={question.id}
                                  value={option.id}
                                  checked={isSelected}
                                  onChange={() =>
                                    setAnswers((prev) => ({
                                      ...prev,
                                      [question.id]: option.id,
                                    }))
                                  }
                                  className="peer sr-only"
                                />
                                <span
                                  className={`size-[clamp(1.25rem,0.4rem+3.2vw,2rem)] rounded-full border-2 transition ${
                                    isSelected
                                      ? "border-[#4a999e] bg-[#4a999e]"
                                      : "border-[#c5c5c5] bg-transparent"
                                  }`}
                                  aria-hidden
                                />
                                <span
                                  className={`pointer-events-none absolute size-2 rounded-full bg-white transition sm:size-2.5 ${
                                    isSelected ? "opacity-100" : "opacity-0"
                                  }`}
                                  aria-hidden
                                />
                              </span>
                              <span className="type-body pt-0.5 font-semibold leading-snug text-[#404040]">
                                {option.label[locale]}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="shrink-0 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8 sm:pb-6 md:px-12 md:pb-8">
          <button
            type="button"
            disabled={!allAnswered}
            onClick={handleContinue}
            className="btn-cta mx-auto flex w-full max-w-[600px] items-center justify-center rounded-full border-2 border-white/40 bg-[#4a999e] font-medium text-white backdrop-blur-[24px] transition enabled:hover:bg-[#3f868b] disabled:cursor-not-allowed disabled:opacity-20"
          >
            {t.continue}
          </button>
        </div>
      </div>
    </div>
  );
}
