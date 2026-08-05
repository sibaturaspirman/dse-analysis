"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

const MONTHS = [
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

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const YEARS = Array.from({ length: 80 }, (_, i) => String(new Date().getFullYear() - 10 - i));

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

const fieldLabel =
  "w-full text-left text-[22px] leading-tight text-white sm:text-[28px] md:text-[32px] md:leading-[41px]";

const pillBase =
  "relative flex h-[72px] w-full items-center rounded-full border-2 border-[rgba(255,255,255,0.3)] bg-white px-5 text-[22px] font-medium text-[#3c7a85] outline-none backdrop-blur-[52px] transition focus-within:ring-2 focus-within:ring-white/40 sm:h-[88px] sm:px-7 sm:text-[28px] md:h-[106px] md:px-8 md:text-[32px]";

export function HomeForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+62");
  const [day, setDay] = useState("20");
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("1990");

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
      className="mx-auto flex w-full max-w-[600px] flex-1 flex-col px-5 pb-8 pt-4 sm:px-8 sm:pb-10 md:px-0 md:pb-12"
    >
      <div className="flex flex-1 flex-col gap-7 sm:gap-8 md:gap-10">
        <label className="flex w-full flex-col gap-3 sm:gap-4 md:gap-[22px]">
          <span className={fieldLabel}>Your name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${pillBase} placeholder:text-[#3c7a85]/placeholder:opacity-50`}
          />
        </label>

        <label className="flex w-full flex-col gap-3 sm:gap-4 md:gap-[22px]">
          <span className={fieldLabel}>No. Telp</span>
          <div className={`${pillBase} gap-3 sm:gap-4 md:gap-5`}>
            <div className="relative flex shrink-0 items-center pr-6 sm:pr-7">
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
              placeholder="Enter your no.telp"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-full min-w-0 flex-1 bg-transparent font-medium text-[#3c7a85] outline-none placeholder:text-[#3c7a85] placeholder:opacity-50"
            />
          </div>
        </label>

        <fieldset className="flex w-full flex-col gap-3 border-0 p-0 sm:gap-4 md:gap-[22px]">
          <legend className={`${fieldLabel} mb-0 w-full px-0`}>Date of Birth</legend>
          <div className="flex w-full gap-2 sm:gap-3 md:gap-4">
            <div className={`${pillBase} min-w-0 basis-[22%] px-3 sm:basis-[134px] sm:px-5 md:px-8`}>
              <select
                aria-label="Day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="h-full w-full cursor-pointer bg-transparent pr-6 font-medium text-[#3c7a85] outline-none sm:pr-7"
              >
                {DAYS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 sm:right-5 md:right-8">
                <Chevron />
              </span>
            </div>

            <div className={`${pillBase} min-w-0 flex-1 px-3 sm:basis-[249px] sm:px-5 md:px-8`}>
              <select
                aria-label="Month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="h-full w-full cursor-pointer bg-transparent pr-6 font-medium text-[#3c7a85] outline-none sm:pr-7"
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 sm:right-5 md:right-8">
                <Chevron />
              </span>
            </div>

            <div className={`${pillBase} min-w-0 basis-[28%] px-3 sm:basis-[190px] sm:px-5 md:px-8`}>
              <select
                aria-label="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="h-full w-full cursor-pointer bg-transparent pr-6 font-medium text-[#3c7a85] outline-none sm:pr-7"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 sm:right-5 md:right-8">
                <Chevron />
              </span>
            </div>
          </div>
        </fieldset>
      </div>

      <button
        type="submit"
        disabled={!canContinue}
        className="mt-10 flex h-[72px] w-full items-center justify-center rounded-full border-2 border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.11)] text-[22px] font-medium text-white backdrop-blur-[52px] transition enabled:bg-[rgba(255,255,255,0.22)] enabled:opacity-100 enabled:hover:bg-[rgba(255,255,255,0.3)] disabled:cursor-not-allowed disabled:opacity-50 sm:mt-12 sm:h-[88px] sm:text-[28px] md:mt-10 md:h-[106px] md:text-[32px]"
      >
        Continue
      </button>
    </form>
  );
}
