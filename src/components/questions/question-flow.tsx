"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AnswerDial } from "@/components/questions/answer-dial";
import { QUESTIONS } from "@/lib/questions";

export function QuestionFlow() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const total = QUESTIONS.length;
  const question = QUESTIONS[index];
  const selected = answers[question.id] ?? null;
  const canContinue = Boolean(selected);
  const progress = ((index + 1) / total) * 100;

  function handleContinue() {
    if (!canContinue) return;

    if (index < total - 1) {
      setIndex((prev) => prev + 1);
      return;
    }

    router.push("/loading");
  }

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-[linear-gradient(180deg,#eefbff_0%,#f7fffe_45%,#ffffff_100%)]">
      <div className="mx-auto flex h-full w-full max-w-[800px] flex-col">
        <header className="flex shrink-0 items-center justify-center px-6 pt-5 sm:pt-7 md:pt-8">
          <Image
            src="/images/logo.svg"
            alt="dse Dermascalp Expert"
            width={177}
            height={50}
            priority
            className="h-8 w-auto brightness-0 sm:h-10 md:h-[50px]"
          />
        </header>

        <section className="flex min-h-0 flex-1 flex-col px-5 pt-4 sm:px-8 sm:pt-6 md:pt-8">
          <div className="mx-auto w-full max-w-[600px] shrink-0 text-center">
            <p className="text-[18px] font-semibold text-[#4a999e] sm:text-[22px] md:text-[24px] md:leading-9">
              Question {index + 1}
            </p>
            <h1 className="mt-2 text-[22px] font-medium leading-snug text-[#404040] sm:text-[28px] sm:leading-10 md:text-[32px] md:leading-[40px]">
              {question.text}
            </h1>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center py-4 sm:py-6">
            <AnswerDial
              key={question.id}
              value={selected}
              onChange={(optionId) =>
                setAnswers((prev) => ({ ...prev, [question.id]: optionId }))
              }
            />
          </div>
        </section>

        <div className="shrink-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8 sm:pb-6 md:px-12 md:pb-8">
          <div className="mx-auto flex w-full max-w-[600px] flex-col items-center gap-4 sm:gap-6 md:gap-8">
            <div className="flex w-full flex-col items-center gap-3 sm:gap-5">
              <p className="text-[18px] text-[#4a999e] sm:text-[22px] md:text-[24px] md:leading-9">
                {index + 1} of {total}
              </p>
              <div className="relative h-3 w-full max-w-[467px] overflow-hidden rounded-full bg-[#4a999e]/10 sm:h-4">
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
              className="flex h-[64px] w-full items-center justify-center rounded-full border-2 border-white/40 bg-[#4a999e] text-[20px] font-medium text-white backdrop-blur-[24px] transition enabled:hover:bg-[#3f868b] disabled:cursor-not-allowed disabled:opacity-20 sm:h-[80px] sm:text-[28px] md:h-[100px] md:text-[32px]"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
