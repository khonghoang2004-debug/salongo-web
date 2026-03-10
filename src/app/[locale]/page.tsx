import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DownloadSection } from "@/components/DownloadSection";
import { TrustSection } from "@/components/TrustSection";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("homeTitle"),
    description: t("homeDesc"),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <Hero />
      <TrustSection />
      <HowItWorks />
      <DownloadSection />
      <CTA />
      <Footer />
    </>
  );
}
