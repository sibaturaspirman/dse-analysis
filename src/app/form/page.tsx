import { AppHeader } from "@/components/layout/app-header";
import { HomeForm } from "@/components/home/home-form";

export default function FormPage() {
  return (
    <div className="relative min-h-dvh w-full overflow-x-hidden">
      <div className="relative z-10 mx-auto flex min-h-dvh w-full flex-col">
        <AppHeader />
        <section className="flex flex-1 flex-col pt-2 sm:pt-4 md:pt-6">
          <HomeForm />
        </section>
      </div>
    </div>
  );
}
