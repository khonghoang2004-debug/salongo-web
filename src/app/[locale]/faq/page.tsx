import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/PageShell";
import { FAQPageHero } from "@/components/FAQPageHero";
import { SectionFAQ } from "@/components/SectionFAQ";
import { SectionFAQTrust } from "@/components/SectionFAQTrust";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("faqTitle"),
    description: t("faqDesc"),
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell>
      <FAQPageHero />
      <SectionFAQ />
      <SectionFAQTrust />
    </PageShell>
  );
}
