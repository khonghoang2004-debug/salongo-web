import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/PageShell";
import { ContactPageHero } from "@/components/ContactPageHero";
import { SectionContact } from "@/components/SectionContact";
import { SectionContactMiniFAQ } from "@/components/SectionContactMiniFAQ";
import { SectionContactTrust } from "@/components/SectionContactTrust";
import { SectionContactCTA } from "@/components/SectionContactCTA";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("contactTitle"),
    description: t("contactDesc"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell>
      <ContactPageHero />
      <SectionContact />
      <SectionContactMiniFAQ />
      <SectionContactTrust />
      <SectionContactCTA />
    </PageShell>
  );
}
