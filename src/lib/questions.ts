type Copy = { idn: string; eng: string };
type Lines = { idn: [string, string?]; eng: [string, string?] };

export type ScalpOption = {
  id: string;
  label: Copy;
  /** Short lines for radial label around the dial */
  labelLines: Lines;
  /** Degrees from top (12 o'clock), clockwise */
  angle: number;
  image: string;
};

export type Question = {
  id: string;
  stepLabel: { idn: string; eng: string };
  text: { idn: string; eng: string };
  hint: { idn: string; eng: string };
  options: ScalpOption[];
};

/** Question 1 — scalp condition */
export const Q1_OPTIONS: ScalpOption[] = [
  {
    id: "cepat-lepek",
    label: { idn: "Cepat Lepek", eng: "Gets oily fast" },
    labelLines: { idn: ["Cepat", "Lepek"], eng: ["Gets oily", "fast"] },
    angle: 231,
    image: "/images/q1/cepat-lepek.png",
  },
  {
    id: "serpihan-berminyak",
    label: { idn: "Serpihan berminyak", eng: "Oily flakes" },
    labelLines: { idn: ["Serpihan", "berminyak"], eng: ["Oily", "flakes"] },
    angle: 289,
    image: "/images/q1/serpihan-berminyak.png",
  },
  {
    id: "berminyak-bau-apek",
    label: { idn: "Berminyak atau Bau Apek", eng: "Oily or musty smell" },
    labelLines: {
      idn: ["Berminyak", "atau Bau Apek"],
      eng: ["Oily or", "musty smell"],
    },
    angle: 331,
    image: "/images/q1/berminyak-bau-apek.png",
  },
  {
    id: "kering-tertarik",
    label: { idn: "Kering atau tertarik", eng: "Dry or tight" },
    labelLines: { idn: ["Kering atau", "tertarik"], eng: ["Dry or", "tight"] },
    angle: 29,
    image: "/images/q1/kering-tertarik.png",
  },
  {
    id: "serpihan-putih-kering",
    label: { idn: "Serpihan putih kering", eng: "Dry white flakes" },
    labelLines: {
      idn: ["Serpihan", "putih kering"],
      eng: ["Dry white", "flakes"],
    },
    angle: 72,
    image: "/images/q1/serpihan-putih-kering.png",
  },
  {
    id: "gatal-mengelupas",
    label: { idn: "Gatal & Mengelupas", eng: "Itchy & flaky" },
    labelLines: { idn: ["Gatal &", "Mengelupas"], eng: ["Itchy &", "flaky"] },
    angle: 129,
    image: "/images/q1/gatal-mengelupas.png",
  },
];

/** Question 2 — scalp reaction */
export const Q2_OPTIONS: ScalpOption[] = [
  {
    id: "gatal-berkeringat",
    label: { idn: "Gatal saat berkeringat", eng: "Itchy when sweating" },
    labelLines: {
      idn: ["Gatal saat", "berkeringat"],
      eng: ["Itchy when", "sweating"],
    },
    angle: 0,
    image: "/images/q2/gatal-berkeringat.png",
  },
  {
    id: "jarang-bereaksi",
    label: { idn: "Jarang bereaksi", eng: "Rarely reacts" },
    labelLines: { idn: ["Jarang", "bereaksi"], eng: ["Rarely", "reacts"] },
    angle: 51,
    image: "/images/q2/jarang-bereaksi.png",
  },
  {
    id: "bebas-ganti-produk",
    label: { idn: "Bebas ganti produk", eng: "Fine switching products" },
    labelLines: {
      idn: ["Bebas ganti", "produk"],
      eng: ["Fine switching", "products"],
    },
    angle: 90,
    image: "/images/q2/bebas-ganti-produk.png",
  },
  {
    id: "tidak-ada-keluhan",
    label: { idn: "Tidak ada keluhan", eng: "No complaints" },
    labelLines: { idn: ["Tidak ada", "keluhan"], eng: ["No", "complaints"] },
    angle: 129,
    image: "/images/q2/tidak-ada-keluhan.png",
  },
  {
    id: "perih-kena-produk",
    label: { idn: "Perih kena produk", eng: "Stings from products" },
    labelLines: { idn: ["Perih kena", "produk"], eng: ["Stings from", "products"] },
    angle: 231,
    image: "/images/q2/perih-kena-produk.png",
  },
  {
    id: "gatal-merah-panas",
    label: { idn: "Gatal/merah kena panas", eng: "Itchy/red from heat" },
    labelLines: {
      idn: ["Gatal/merah", "kena panas"],
      eng: ["Itchy/red", "from heat"],
    },
    angle: 275,
    image: "/images/q2/gatal-merah-panas.png",
  },
  {
    id: "jerawat-bruntusan",
    label: { idn: "Jerawat atau bruntusan", eng: "Acne or bumps" },
    labelLines: { idn: ["Jerawat atau", "bruntusan"], eng: ["Acne or", "bumps"] },
    angle: 318,
    image: "/images/q2/jerawat-bruntusan.png",
  },
];

/** Question 3 — hair shaft condition & texture */
export const Q3_OPTIONS: ScalpOption[] = [
  {
    id: "mudah-patah",
    label: { idn: "Mudah patah", eng: "Breaks easily" },
    labelLines: { idn: ["Mudah", "patah"], eng: ["Breaks", "easily"] },
    angle: 231,
    image: "/images/q3/mudah-patah.png",
  },
  {
    id: "ujung-bercabang",
    label: { idn: "Ujung bercabang", eng: "Split ends" },
    labelLines: { idn: ["Ujung", "bercabang"], eng: ["Split", "ends"] },
    angle: 289,
    image: "/images/q3/ujung-bercabang.png",
  },
  {
    id: "kasar-kering",
    label: { idn: "Kasar & kering", eng: "Rough & dry" },
    labelLines: { idn: ["Kasar &", "kering"], eng: ["Rough &", "dry"] },
    angle: 331,
    image: "/images/q3/kasar-kering.png",
  },
  {
    id: "kusam-mengembang",
    label: { idn: "Kusam & mengembang", eng: "Dull & frizzy" },
    labelLines: { idn: ["Kusam &", "mengembang"], eng: ["Dull &", "frizzy"] },
    angle: 29,
    image: "/images/q3/kusam-mengembang.png",
  },
  {
    id: "kusut-sulit-disisir",
    label: { idn: "Kusut & sulit disisir", eng: "Tangled & hard to comb" },
    labelLines: {
      idn: ["Kusut &", "sulit disisir"],
      eng: ["Tangled &", "hard to comb"],
    },
    angle: 72,
    image: "/images/q3/kusut-sulit-disisir.png",
  },
  {
    id: "halus-berkilau",
    label: { idn: "Halus & berkilau", eng: "Smooth & shiny" },
    labelLines: { idn: ["Halus &", "berkilau"], eng: ["Smooth &", "shiny"] },
    angle: 129,
    image: "/images/q3/halus-berkilau.png",
  },
];

/** Question 4 — volume & density */
export const Q4_OPTIONS: ScalpOption[] = [
  {
    id: "sangat-tipis",
    label: { idn: "Rambut sangat tipis", eng: "Very thin hair" },
    labelLines: { idn: ["Rambut", "sangat tipis"], eng: ["Very", "thin hair"] },
    angle: 45,
    image: "/images/q4/sangat-tipis.png",
  },
  {
    id: "tipis-kurang-volume",
    label: { idn: "Tipis dan kurang volume", eng: "Thin, low volume" },
    labelLines: {
      idn: ["Tipis dan", "kurang volume"],
      eng: ["Thin,", "low volume"],
    },
    angle: 135,
    image: "/images/q4/tipis-kurang-volume.png",
  },
  {
    id: "cukup-tebal",
    label: { idn: "Cukup tebal", eng: "Fairly thick" },
    labelLines: { idn: ["Cukup", "tebal"], eng: ["Fairly", "thick"] },
    angle: 225,
    image: "/images/q4/cukup-tebal.png",
  },
  {
    id: "tebal-penuh",
    label: { idn: "Tebal, penuh, banyak volume", eng: "Thick, full, lots of volume" },
    labelLines: {
      idn: ["Tebal, penuh,", "banyak volume"],
      eng: ["Thick, full,", "lots of volume"],
    },
    angle: 315,
    image: "/images/q4/tebal-penuh.png",
  },
];

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    stepLabel: { idn: "Pertanyaan 1", eng: "Question 1" },
    text: {
      idn: "Apa yang paling menggambarkan kondisi kulit kepalamu belakangan ini?",
      eng: "What best describes your scalp condition lately?",
    },
    hint: { idn: "Putar untuk jawab", eng: "Rotate to answer" },
    options: Q1_OPTIONS,
  },
  {
    id: "q2",
    stepLabel: { idn: "Pertanyaan 2", eng: "Question 2" },
    text: {
      idn: "Bagaimana kulit kepalamu bereaksi terhadap produk, panas, keringat, atau cuaca?",
      eng: "How does your scalp react to products, heat, sweat, or weather?",
    },
    hint: { idn: "Putar untuk jawab", eng: "Rotate to answer" },
    options: Q2_OPTIONS,
  },
  {
    id: "q3",
    stepLabel: { idn: "Pertanyaan 3", eng: "Question 3" },
    text: {
      idn: "Bagaimana kondisi & tekstur batang rambutmu?",
      eng: "How is the condition & texture of your hair shaft?",
    },
    hint: { idn: "Putar untuk jawab", eng: "Rotate to answer" },
    options: Q3_OPTIONS,
  },
  {
    id: "q4",
    stepLabel: { idn: "Pertanyaan 4", eng: "Question 4" },
    text: {
      idn: "Bagaimana volume & kerapatan rambutmu secara umum?",
      eng: "How is your hair volume & density in general?",
    },
    hint: { idn: "Putar untuk jawab", eng: "Rotate to answer" },
    options: Q4_OPTIONS,
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;
