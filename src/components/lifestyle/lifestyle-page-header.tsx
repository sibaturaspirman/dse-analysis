/** Lifestyle page header — edit font sizes here only. */
const pageTitleClass =
  "text-xl md:text-3xl leading-[1.15] font-medium text-[#404040]";
const answeredClass =
  "text-sm md:text-xl leading-[1.35] shrink-0 pb-0.5 text-[#4a999e]";

type LifestylePageHeaderProps = {
  title: string;
  answeredLabel: string;
  progressPercent: number;
};

export function LifestylePageHeader({
  title,
  answeredLabel,
  progressPercent,
}: LifestylePageHeaderProps) {
  return (
    <div className="shrink-0 px-4 sm:px-8 md:px-10">
      <div className="flex items-end justify-between gap-3">
        <h1 className={pageTitleClass}>{title}</h1>
        <p className={answeredClass}>{answeredLabel}</p>
      </div>
      <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-[#4a999e]/15 sm:mt-4">
        <div
          className="h-full rounded-full bg-[#4a999e]/45 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
