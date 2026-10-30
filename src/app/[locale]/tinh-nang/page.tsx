import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/PageShell";
import { FeaturesPageHero } from "@/components/FeaturesPageHero";
import { FeatureSubnav } from "@/components/FeatureSubnav";
import { FeatureChapters } from "@/components/FeatureChapters";
import { FEATURES } from "@/components/featuresData";
import { SectionWhyFeatures } from "@/components/SectionWhyFeatures";
import { SectionFeaturesCTA } from "@/components/SectionFeaturesCTA";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return pageMetadata({ locale, path: "/tinh-nang", title: t("featuresTitle"), description: t("featuresDesc") });
}

export default async function FeaturesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("featuresV2");

  return (
    <PageShell>
      <FeaturesPageHero />
      <FeatureSubnav
        label={t("navLabel")}
        items={FEATURES.map(({ id, anchor }) => ({ id, anchor, label: t(`f.${id}.short`) }))}
      />
      <FeatureChapters />
      <SectionWhyFeatures />
      <SectionFeaturesCTA />
    </PageShell>
  );
}
