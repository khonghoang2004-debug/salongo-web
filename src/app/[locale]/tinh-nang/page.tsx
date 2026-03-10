import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/PageShell";
import { FeaturesPageHero } from "@/components/FeaturesPageHero";
import { FeatureBlocksAlternating } from "@/components/FeatureBlocksAlternating";
import { FeatureGroupsSection } from "@/components/FeatureGroupsSection";
import { SectionWhyFeatures } from "@/components/SectionWhyFeatures";
import { SectionFeaturesCTA } from "@/components/SectionFeaturesCTA";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("featuresTitle"),
    description: t("featuresDesc"),
  };
}

export default async function FeaturesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell>
      <FeaturesPageHero />
      <FeatureBlocksAlternating />
      <FeatureGroupsSection />
      <SectionWhyFeatures />
      <SectionFeaturesCTA />
    </PageShell>
  );
}
