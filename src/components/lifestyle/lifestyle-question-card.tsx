import type { LifestyleQuestion } from "@/lib/lifestyle-questions";

/** Lifestyle question card — edit font sizes here only. */
const numberClass =
  "pt-1 shrink-0 text-[clamp(0.95rem,0.64rem+1.7vw,1.5rem)] font-semibold leading-none text-[#4a999e]";
const questionClass =
  "text-lg md:text-2xl leading-[1.3] font-medium text-[#4a999e]";
const optionClass =
  "text-sm md:text-xl font-semibold text-[#404040]";

type LifestyleQuestionCardProps = {
  question: LifestyleQuestion;
  locale: "idn" | "eng";
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
};

export function LifestyleQuestionCard({
  question,
  locale,
  selectedOptionId,
  onSelect,
}: LifestyleQuestionCardProps) {
  return (
    <article className="rounded-[clamp(1.25rem,0.3rem+3.8vw,2.2rem)] border border-white/40 bg-white/80 px-[clamp(1rem,0.2rem+2.6vw,1.5rem)] py-[clamp(1rem,0.2rem+2.6vw,1.5rem)] shadow-[0_1px_0_rgba(74,153,158,0.06)] backdrop-blur-md">
      <div className="flex gap-3 sm:gap-4">
        <span className={numberClass}>{question.number}</span>
        <div className="min-w-0 flex-1">
          <h2 className={questionClass}>{question.text[locale]}</h2>

          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:mt-6 sm:grid-cols-2 sm:gap-y-8">
            {question.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
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
                      onChange={() => onSelect(option.id)}
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
                  <span className={optionClass}>{option.label[locale]}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
