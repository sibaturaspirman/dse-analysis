import Image from "next/image";

type PageBackgroundProps = {
  src?: string;
};

export function PageBackground({ src = "/images/bg-page.jpg" }: PageBackgroundProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}
