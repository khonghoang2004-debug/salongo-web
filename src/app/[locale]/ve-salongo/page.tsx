import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/PageShell";
import { SectionAbout } from "@/components/SectionAbout";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("aboutTitle"),
    description: t("aboutDesc"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell>
      <SectionAbout />
    </PageShell>
  );
}
