"use client";

import Image from "next/image";
import Link from "next/link";

import { useLocale } from "@/components/i18n/locale-context";
import { AppHeader } from "@/components/layout/app-header";
import { headingHeadline } from "@/lib/typography";

const PRODUCTS = [
  {
    src: "/images/products/serum.png",
    tag: "For shedding & thining hair",
    name: "Hairfall Resist Serum",
  },
  {
    src: "/images/products/conditioner.png",
    tag: "For weakened hair, prone to falling from breakage",
    name: "Hairfall Resist Conditioner",
  },
  {
    src: "/images/products/shampoo.png",
    tag: "For dry flakes and dandruff",
    name: "Dandruff Relief Shampoo",
  },
] as const;

const COPY = {
  idn: {
    title: "Rekomendasi Produk",
    subtitle: "Rekomendasi produk yang sesuai untukmu sudah siap.",
    section: "Recommendation DSE Product",
    back: "Back to Result",
  },
  eng: {
    title: "Product Recommendations",
    subtitle: "Product recommendations that fit you are ready.",
    section: "Recommendation DSE Product",
    back: "Back to Result",
  },
} as const;

function ProductRow({
  src,
  tag,
  name,
}: {
  src: string;
  tag: string;
  name: string;
}) {
  return (
    <div className="flex w-full items-center gap-3 rounded-[1.4rem] border-2 border-white bg-white py-2 pr-4 pl-3 sm:gap-4 sm:py-3 sm:pr-6 sm:pl-4">
      <div className="relative h-[4.5rem] w-[3.6rem] shrink-0 sm:h-[7.2rem] sm:w-[5.7rem]">
        <Image
          src={src}
          alt=""
          fill
          sizes="92px"
          className="object-contain"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[clamp(0.7rem,0.35rem+1.1vw,1rem)] font-bold tracking-wide text-[#4f9fa6] uppercase">
          {tag}
        </p>
        <p className="mt-1 text-[clamp(1rem,0.45rem+2vw,1.75rem)] leading-tight font-medium tracking-[-0.02em] text-[#241f21]">
          {name}
        </p>
      </div>
      <Image
        src="/images/products/arrow.svg"
        alt=""
        width={31}
        height={14}
        className="h-[14px] w-[31px] shrink-0"
      />
    </div>
  );
}

export function ProductsScreen() {
  const { locale } = useLocale();
  const t = COPY[locale];
  const [featured, ...rest] = PRODUCTS;

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden">
      <div className="relative z-10 mx-auto flex h-full w-full flex-col">
        <AppHeader />

        <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-4 sm:px-8">
          <div className="mt-1 bg-white/10 px-4 py-2 text-center backdrop-blur-[3px] sm:mt-2">
            <h1 className={headingHeadline}>
              {t.title}
            </h1>
          </div>
          <p className="text-base md:text-lead mt-3 max-w-[565px] text-center text-white/50 sm:mt-5">
            {t.subtitle}
          </p>

          <div className="mt-6 flex w-full max-w-[678px] flex-col gap-4 pb-4 sm:mt-8 sm:gap-6">
            <div className="rounded-2xl border-2 border-white/30 bg-white/11 px-0 pt-4 backdrop-blur-[52px] sm:pt-6">
              <p className="text-center text-[clamp(1rem,0.45rem+1.8vw,1.8rem)] font-medium text-white">
                {t.section}
              </p>
              <div className="mt-4">
                <ProductRow {...featured} />
              </div>
            </div>
            {rest.map((product) => (
              <ProductRow key={product.name} {...product} />
            ))}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[734px] justify-center px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8 sm:pb-6">
          <Link
            href="/result"
            className="flex h-[clamp(2.75rem,1.4rem+4vw,4rem)] w-full max-w-[472px] items-center justify-center rounded-full border-2 border-white/30 bg-white/11 text-[clamp(0.85rem,0.4rem+1.5vw,1.25rem)] font-medium whitespace-nowrap text-white backdrop-blur-[52px] transition hover:bg-white/20"
          >
            {t.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
