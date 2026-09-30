"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLocale } from "@/components/i18n/locale-context";
import { AppHeader } from "@/components/layout/app-header";
import { PageBackground } from "@/components/layout/page-background";
import { ScalpDial } from "@/components/questions/scalp-dial";
import { QUESTIONS, TOTAL_QUESTIONS } from "@/lib/questions";

export function QuestionFlow() {
  const router = useRouter();
  const { locale } = useLocale();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = QUESTIONS[index];
  const selected = answers[question.id] ?? null;
  const canContinue = Boolean(selected);
  const progress = ((index + 1) / TOTAL_QUESTIONS) * 100;

  function handleContinue() {
    if (!canContinue) return;

    if (index < QUESTIONS.length - 1) {
      setIndex((prev) => prev + 1);
      return;
    }

    router.push("/transition");
  }

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden">
      <PageBackground src="/images/bg-journey.png" />
      <div className="relative z-10 mx-auto flex h-full w-full flex-col">
        <AppHeader variant="light" />

        <section className="flex min-h-0 flex-1 flex-col px-4 pt-1 sm:px-8 sm:pt-2 md:pt-4">
          <div className="mx-auto w-full max-w-[700px] shrink-0 text-center">
            <p className="type-label font-semibold text-[#4a999e]">
              {question.stepLabel[locale]}
            </p>
            <h1 className="type-title mt-1 font-medium text-[#404040] sm:mt-2">
              {question.text[locale]}
            </h1>
            <div className="mt-2 flex flex-col items-center sm:mt-3">
              <p className="type-body font-medium text-[#404040]/50">
                {question.hint[locale]}
              </p>
              <Image
                src="/images/q1/rotate-arrow.svg"
                alt=""
                width={76}
                height={25}
                className="mt-1 h-6 w-auto opacity-70"
                aria-hidden
              />
            </div>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center py-2 sm:py-4">
            <ScalpDial
              key={question.id}
              options={question.options}
              value={selected}
              onChange={(optionId) =>
                setAnswers((prev) => ({ ...prev, [question.id]: optionId }))
              }
            />
          </div>
        </section>

        <div className="shrink-0 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8 sm:pb-6 md:px-12 md:pb-8">
          <div className="mx-auto flex w-full max-w-[600px] flex-col items-center gap-3 sm:gap-5 md:gap-6">
            <div className="flex w-full flex-col items-center gap-2 sm:gap-4">
              <p className="type-body text-[#4a999e]">
                {index + 1} of {TOTAL_QUESTIONS}
              </p>
              <div className="relative h-4 w-full max-w-[467px] overflow-hidden rounded-full bg-[#4a999e]/10">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[#4a999e] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              disabled={!canContinue}
              onClick={handleContinue}
              className="btn-cta flex w-full items-center justify-center rounded-full border-2 border-white/40 bg-[#4a999e] font-medium text-white backdrop-blur-[24px] transition enabled:hover:bg-[#3f868b] disabled:cursor-not-allowed disabled:opacity-20"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
