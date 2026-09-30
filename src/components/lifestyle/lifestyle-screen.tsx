"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLocale } from "@/components/i18n/locale-context";
import { LifestylePageHeader } from "@/components/lifestyle/lifestyle-page-header";
import { LifestyleQuestionCard } from "@/components/lifestyle/lifestyle-question-card";
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

        <LifestylePageHeader
          title={t.title}
          answeredLabel={t.answered(answeredCount)}
          progressPercent={progress}
        />

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-4 pb-4 sm:mt-6 sm:px-8 sm:pb-6 md:px-10">
          <div className="flex flex-col gap-4 sm:gap-5">
            {LIFESTYLE_QUESTIONS.map((question) => (
              <LifestyleQuestionCard
                key={question.id}
                question={question}
                locale={locale}
                selectedOptionId={answers[question.id]}
                onSelect={(optionId) =>
                  setAnswers((prev) => ({ ...prev, [question.id]: optionId }))
                }
              />
            ))}
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
