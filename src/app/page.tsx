import Image from "next/image";
import { HomeForm } from "@/components/home/home-form";

export default function Home() {
  return (
    <div className="relative min-h-dvh w-full overflow-hidden">
      <Image
        src="/images/bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[800px] flex-col">
        <header className="flex shrink-0 items-center justify-center px-6 pt-6 sm:pt-8 md:pt-10">
          <Image
            src="/images/logo.svg"
            alt="dse Dermascalp Expert"
            width={177}
            height={50}
            priority
            className="h-9 w-auto sm:h-11 md:h-[50px]"
          />
        </header>

        <section className="flex flex-1 flex-col px-2 pt-8 sm:pt-10 md:pt-[52px]">
          <h1 className="mx-auto max-w-[565px] px-4 text-center text-[28px] font-medium leading-[1.45] text-white sm:text-[40px] sm:leading-[1.5] md:text-[38px] md:leading-[1.4]">
            Pretty please let&apos;s get to know each other by filling out this form!
          </h1>

          <div className="mt-10 flex flex-1 flex-col sm:mt-12 md:mt-5">
            <HomeForm />
          </div>
        </section>
      </div>
    </div>
  );
}
