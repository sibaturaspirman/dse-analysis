import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { LocaleProvider } from "@/components/i18n/locale-context";
import { PageBackground } from "@/components/layout/page-background";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "DSE Analysis",
  description: "Dermascalp Expert — get to know each other",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-transparent font-sans">
        <PageBackground />
        <div className="relative z-10 min-h-full">
          <LocaleProvider>{children}</LocaleProvider>
        </div>
      </body>
    </html>
  );
}
