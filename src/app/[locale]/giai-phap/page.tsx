import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/PageShell";
import { SolutionsPageHero } from "@/components/SolutionsPageHero";
import { SolutionsBlocksSection } from "@/components/SolutionsBlocksSection";
import { SectionSolutionsResults } from "@/components/SectionSolutionsResults";
import { SectionSolutionsCTA } from "@/components/SectionSolutionsCTA";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("solutionsTitle"),
    description: t("solutionsDesc"),
  };
}

export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell>
      <SolutionsPageHero />
      <SolutionsBlocksSection />
      <SectionSolutionsResults />
      <SectionSolutionsCTA />
    </PageShell>
  );
}
