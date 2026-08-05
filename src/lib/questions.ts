export type AnswerOption = {
  id: string;
  label: string;
  /** Degrees from top (12 o'clock), clockwise */
  angle: number;
};

export type Question = {
  id: string;
  text: string;
};

export const ANSWER_OPTIONS: AnswerOption[] = [
  { id: "strongly-disagree", label: "Strongly Disagree", angle: 40 },
  { id: "disagree", label: "Disagree", angle: 100 },
  { id: "neutral", label: "Neutral", angle: 180 },
  { id: "agree", label: "Agree", angle: 260 },
  { id: "strongly-agree", label: "Strongly Agree", angle: 320 },
];

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "My hair feels rough, frizzy, brittle, tangled, or easily broken.",
  },
  {
    id: "q2",
    text: "My scalp often feels dry, tight, itchy, or flaky",
  },
];
