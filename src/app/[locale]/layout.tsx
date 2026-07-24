import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "k399game — Every Game, 100% AI Generated",
  description:
    "A curated collection of games created entirely by artificial intelligence. No human coding, pure AI creativity.",
  keywords: ["AI games", "AI generated games", "AI gaming platform", "k399game"],
  openGraph: {
    title: "k399game — Every Game, 100% AI Generated",
    description: "A curated collection of games created entirely by AI.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const locales = ["en", "zh"];

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) {
    notFound();
  }

  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex flex-col min-h-screen">
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
