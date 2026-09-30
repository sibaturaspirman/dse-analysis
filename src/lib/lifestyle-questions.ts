export type LifestyleOption = {
  id: string;
  label: { idn: string; eng: string };
};

export type LifestyleQuestion = {
  id: string;
  number: string;
  text: { idn: string; eng: string };
  options: LifestyleOption[];
};

export const LIFESTYLE_QUESTIONS: LifestyleQuestion[] = [
  {
    id: "heat-styling",
    number: "01",
    text: {
      idn: "Seberapa sering Anda menggunakan alat styling panas (hair dryer, catokan, atau curling iron)?",
      eng: "How often do you use heat styling tools (hair dryer, straightener, or curling iron)?",
    },
    options: [
      { id: "never", label: { idn: "Tidak Pernah", eng: "Never" } },
      {
        id: "occasional",
        label: { idn: "Sesekali (1–2 kali/bulan)", eng: "Occasionally (1–2×/month)" },
      },
      {
        id: "weekly",
        label: { idn: "Mingguan (1–3 kali/minggu)", eng: "Weekly (1–3×/week)" },
      },
      {
        id: "often",
        label: { idn: "Sering (>3 kali/minggu)", eng: "Often (>3×/week)" },
      },
    ],
  },
  {
    id: "chemical-treatment",
    number: "02",
    text: {
      idn: "Apakah Anda melakukan perawatan kimia pada rambut dalam 6 bulan terakhir?",
      eng: "Have you had chemical hair treatments in the last 6 months?",
    },
    options: [
      {
        id: "none",
        label: { idn: "Tidak ada perawatan", eng: "No treatment" },
      },
      {
        id: "straightening",
        label: { idn: "Straightening / Rebonding", eng: "Straightening / Rebonding" },
      },
      {
        id: "coloring",
        label: { idn: "Pewarnaan rambut", eng: "Hair coloring" },
      },
      { id: "bleaching", label: { idn: "Bleaching", eng: "Bleaching" } },
    ],
  },
  {
    id: "scalp-covered",
    number: "03",
    text: {
      idn: "Berapa jam per hari kulit kepala Anda biasanya tertutup pada sebagian besar hari?",
      eng: "How many hours per day is your scalp usually covered on most days?",
    },
    options: [
      { id: "under-1", label: { idn: "<1 Jam", eng: "<1 Hour" } },
      { id: "1-4", label: { idn: "1–4 Jam", eng: "1–4 Hours" } },
      { id: "4-8", label: { idn: "4–8 Jam", eng: "4–8 Hours" } },
      { id: "over-8", label: { idn: ">8 Jam", eng: ">8 Hours" } },
    ],
  },
  {
    id: "post-sweat-wash",
    number: "04",
    text: {
      idn: "Setelah banyak berkeringat atau berolahraga, kapan Anda biasanya mencuci rambut/kulit kepala?",
      eng: "After heavy sweating or exercise, when do you usually wash your hair/scalp?",
    },
    options: [
      { id: "immediately", label: { idn: "Segera", eng: "Immediately" } },
      {
        id: "same-day",
        label: { idn: "Pada hari yang sama", eng: "Same day" },
      },
      {
        id: "next-day",
        label: { idn: "Keesokan hari", eng: "Next day" },
      },
      { id: "rarely", label: { idn: "Jarang", eng: "Rarely" } },
    ],
  },
  {
    id: "sleep-hours",
    number: "05",
    text: {
      idn: "Rata-rata, berapa jam Anda tidur setiap malam?",
      eng: "On average, how many hours do you sleep each night?",
    },
    options: [
      { id: "7-plus", label: { idn: "≥7 Jam", eng: "≥7 Hours" } },
      { id: "6-7", label: { idn: "6–7 Jam", eng: "6–7 Hours" } },
      { id: "5-6", label: { idn: "5–6 Jam", eng: "5–6 Hours" } },
      { id: "under-5", label: { idn: "<5 Jam", eng: "<5 Hours" } },
    ],
  },
  {
    id: "protein-iron",
    number: "06",
    text: {
      idn: "Seberapa sering Anda mengonsumsi protein yang cukup (daging, ikan, telur, kacang-kacangan, produk susu) dan makanan kaya zat besi (daging merah, sayuran hijau)?",
      eng: "How often do you get enough protein (meat, fish, eggs, legumes, dairy) and iron-rich foods (red meat, leafy greens)?",
    },
    options: [
      { id: "daily", label: { idn: "Setiap Hari", eng: "Every day" } },
      {
        id: "almost-daily",
        label: { idn: "Hampir Setiap Hari", eng: "Almost every day" },
      },
      { id: "occasional", label: { idn: "Sesekali", eng: "Occasionally" } },
      { id: "rarely", label: { idn: "Jarang", eng: "Rarely" } },
    ],
  },
  {
    id: "weight-loss",
    number: "07",
    text: {
      idn: "Apakah Anda baru-baru ini mengalami penurunan berat badan yang cepat atau menjalani diet ketat?",
      eng: "Have you recently experienced rapid weight loss or followed a strict diet?",
    },
    options: [
      { id: "none", label: { idn: "Tidak", eng: "No" } },
      { id: "mild", label: { idn: "Ringan", eng: "Mild" } },
      { id: "moderate", label: { idn: "Sedang", eng: "Moderate" } },
      {
        id: "severe",
        label: { idn: "Berat/Cepat", eng: "Severe/Rapid" },
      },
    ],
  },
  {
    id: "water-intake",
    number: "08",
    text: {
      idn: "Berapa banyak air putih yang Anda minum setiap hari?",
      eng: "How much water do you drink every day?",
    },
    options: [
      { id: "8-plus", label: { idn: "≥8 Gelas", eng: "≥8 Glasses" } },
      { id: "5-7", label: { idn: "5–7 Gelas", eng: "5–7 Glasses" } },
      { id: "3-4", label: { idn: "3–4 Gelas", eng: "3–4 Glasses" } },
      { id: "under-3", label: { idn: "<3 Gelas", eng: "<3 Glasses" } },
    ],
  },
  {
    id: "stress-level",
    number: "09",
    text: {
      idn: "Bagaimana Anda menilai tingkat stres Anda selama 3 bulan terakhir?",
      eng: "How would you rate your stress level over the last 3 months?",
    },
    options: [
      { id: "low", label: { idn: "Rendah", eng: "Low" } },
      { id: "medium", label: { idn: "Sedang", eng: "Medium" } },
      { id: "high", label: { idn: "Tinggi", eng: "High" } },
      {
        id: "very-high",
        label: { idn: "Sangat Tinggi", eng: "Very High" },
      },
    ],
  },
];

export const TOTAL_LIFESTYLE_QUESTIONS = LIFESTYLE_QUESTIONS.length;
