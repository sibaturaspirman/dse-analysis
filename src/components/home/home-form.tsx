"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/i18n/locale-context";
import { headingDisplay } from "@/lib/typography";

const MONTHS_ENG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const MONTHS_IDN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
] as const;

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const YEARS = Array.from({ length: 80 }, (_, i) => String(new Date().getFullYear() - 10 - i));

const COPY = {
  idn: {
    title: "Yuk, mulai dari kamu.",
    subtitle:
      "Beberapa informasi akan membantu kami menyesuaikan analisis kulit kepalamu.",
    name: "Nama kamu",
    namePlaceholder: "Masukkan nama kamu",
    phone: "No. Telepon",
    phonePlaceholder: "Masukkan nomor telepon",
    dob: "Tanggal Lahir",
    continue: "Continue",
    months: MONTHS_IDN,
  },
  eng: {
    title: "Let's start with you.",
    subtitle: "A few details help us personalize your scalp analysis.",
    name: "Your name",
    namePlaceholder: "Enter your name",
    phone: "Phone number",
    phonePlaceholder: "Enter your phone number",
    dob: "Date of Birth",
    continue: "Continue",
    months: MONTHS_ENG,
  },
} as const;

function Chevron() {
  return (
    <Image
      src="/images/chevron-down.svg"
      alt=""
      width={24}
      height={24}
      className="pointer-events-none size-5 shrink-0 sm:size-6"
      aria-hidden
    />
  );
}

const fieldLabel = "text-lead w-full text-left text-white";

const pillBase =
  "field-pill relative flex w-full items-center rounded-full border-2 border-[rgba(255,255,255,0.3)] bg-white font-medium text-[#3c7a85] outline-none backdrop-blur-[52px] transition focus-within:ring-2 focus-within:ring-white/40";

export function HomeForm() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = COPY[locale];
  const months = t.months;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+62");
  const [day, setDay] = useState("20");
  const [month, setMonth] = useState<string>(MONTHS_IDN[0]);
  const [year, setYear] = useState("1990");

  useEffect(() => {
    const engIdx = MONTHS_ENG.indexOf(month as (typeof MONTHS_ENG)[number]);
    const idnIdx = MONTHS_IDN.indexOf(month as (typeof MONTHS_IDN)[number]);
    const idx = engIdx >= 0 ? engIdx : idnIdx >= 0 ? idnIdx : 0;
    const next = months[idx] ?? months[0];
    if (next !== month) setMonth(next);
  }, [locale, months, month]);

  const canContinue = useMemo(
    () => name.trim().length > 0 && phone.trim().length > 0 && Boolean(day && month && year),
    [name, phone, day, month, year],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canContinue) return;

    const params = new URLSearchParams({
      name: name.trim(),
      phone: `${countryCode}${phone.trim()}`,
      dob: `${day} ${month} ${year}`,
    });

    router.push(`/hair?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-[600px] flex-1 flex-col px-5 pb-8 pt-2 sm:px-8 sm:pb-10 md:px-0 md:pb-12"
    >
      <div className="mx-auto mb-6 w-full text-center sm:mb-8 md:mb-10">
        <div className="rounded-lg bg-white/9 px-1 py-2 backdrop-blur-[3px] sm:py-2.5">
          <h1 className={headingDisplay}>
            {t.title}
          </h1>
        </div>
        <p className="text-lead mt-3 text-white/50 sm:mt-4">
          {t.subtitle}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-6 sm:gap-8 md:gap-12">
        <label className="flex w-full flex-col gap-2 sm:gap-3 md:gap-4">
          <span className={fieldLabel}>{t.name}</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder={t.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${pillBase} placeholder:text-[#3c7a85]/placeholder:opacity-50`}
          />
        </label>

        <label className="flex w-full flex-col gap-2 sm:gap-3 md:gap-4">
          <span className={fieldLabel}>{t.phone}</span>
          <div className={`${pillBase} gap-3 sm:gap-4`}>
            <div className="relative flex shrink-0 items-center pr-5 sm:pr-6">
              <select
                aria-label="Country code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="cursor-pointer bg-transparent pr-1 font-medium text-[#3c7a85] outline-none"
              >
                <option value="+62">+62</option>
                <option value="+65">+65</option>
                <option value="+60">+60</option>
              </select>
              <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
                <Chevron />
              </span>
            </div>
            <input
              type="tel"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              placeholder={t.phonePlaceholder}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-full min-w-0 flex-1 bg-transparent font-medium text-[#3c7a85] outline-none placeholder:text-[#3c7a85] placeholder:opacity-50"
            />
          </div>
        </label>

        <fieldset className="flex w-full flex-col gap-2 border-0 p-0 sm:gap-3 md:gap-4">
          <legend className={`${fieldLabel} mb-4 w-full px-0`}>{t.dob}</legend>
          <div className="flex w-full gap-2 sm:gap-3 md:gap-4">
            <div className={`${pillBase} min-w-0 basis-[22%] px-3 sm:basis-[134px] sm:px-5`}>
              <select
                aria-label="Day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="h-full w-full cursor-pointer bg-transparent pr-5 font-medium text-[#3c7a85] outline-none"
              >
                {DAYS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 sm:right-5">
                <Chevron />
              </span>
            </div>

            <div className={`${pillBase} min-w-0 flex-1 px-3 sm:basis-[249px] sm:px-5`}>
              <select
                aria-label="Month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="h-full w-full cursor-pointer bg-transparent pr-5 font-medium text-[#3c7a85] outline-none"
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 sm:right-5">
                <Chevron />
              </span>
            </div>

            <div className={`${pillBase} min-w-0 basis-[28%] px-3 sm:basis-[190px] sm:px-5`}>
              <select
                aria-label="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="h-full w-full cursor-pointer bg-transparent pr-5 font-medium text-[#3c7a85] outline-none"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 sm:right-5">
                <Chevron />
              </span>
            </div>
          </div>
        </fieldset>
      </div>

      <button
        type="submit"
        disabled={!canContinue}
        className="btn-cta mt-8 flex w-full items-center justify-center rounded-full border-2 border-white/30 bg-white/18 font-medium text-white backdrop-blur-[52px] transition enabled:hover:bg-white/28 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-10"
      >
        {t.continue}
      </button>
    </form>
  );
}
