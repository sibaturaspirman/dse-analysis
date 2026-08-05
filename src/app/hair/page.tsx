import Image from "next/image";
import { HairSelector } from "@/components/hair/hair-selector";

export default function HairPage() {
  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <Image
        src="/images/bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[800px] flex-col">
        <header className="flex shrink-0 items-center justify-center px-6 pt-5 sm:pt-7 md:pt-8">
          <Image
            src="/images/logo.svg"
            alt="dse Dermascalp Expert"
            width={177}
            height={50}
            priority
            className="h-8 w-auto sm:h-10 md:h-[50px]"
          />
        </header>

        <section className="flex min-h-0 flex-1 flex-col pt-4 sm:pt-6 md:pt-8">
          <h1 className="mx-auto max-w-[483px] shrink-0 px-6 text-center text-[26px] font-medium leading-[1.3] text-white sm:text-[36px] md:text-[48px] md:leading-[65.5px]">
            What is your Natural Hair Type
          </h1>

          <div className="mt-4 flex min-h-0 flex-1 flex-col sm:mt-6 md:mt-8">
            <HairSelector />
          </div>
        </section>
      </div>
    </div>
  );
}
