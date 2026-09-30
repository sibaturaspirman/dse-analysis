import Image from "next/image";

import { textTitle } from "@/lib/typography";

/** Question journey header — edit font sizes here only. */
const stepLabelClass = "text-label font-semibold text-[#4a999e]";
const titleClass = `text-xl md:text-[clamp(1.35rem,1.15rem+1.95vw,2.125rem)] leading-[1.18] mt-1 font-medium text-[#404040] sm:mt-2`;
const hintClass = "text-sm md:text-body font-medium text-[#404040]/50";

type QuestionHeaderProps = {
  stepLabel: string;
  title: string;
  hint: string;
};

export function QuestionHeader({ stepLabel, title, hint }: QuestionHeaderProps) {
  return (
    <div className="mx-auto w-full max-w-[700px] shrink-0 text-center">
      <p className={stepLabelClass}>{stepLabel}</p>
      <h1 className={titleClass}>{title}</h1>
      <div className="mt-2 flex flex-col items-center sm:mt-3">
        <p className={hintClass}>{hint}</p>
        <Image
          src="/images/q1/rotate-arrow.svg"
          alt=""
          width={76}
          height={25}
          className="mt-1 h-3 w-auto opacity-70"
          aria-hidden
        />
      </div>
    </div>
  );
}
