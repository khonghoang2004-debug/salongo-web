import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/PageShell";
import { PricingPageHero } from "@/components/PricingPageHero";
import { Pricing } from "@/components/Pricing";
import { PricingComparisonTable } from "@/components/PricingComparisonTable";
import { SectionPricingWhoIsFor } from "@/components/SectionPricingWhoIsFor";
import { SectionPricingCommitment } from "@/components/SectionPricingCommitment";
import { SectionPricingCTA } from "@/components/SectionPricingCTA";
import { SectionPricingFAQ } from "@/components/PricingPageDynamic";
import { SectionRenew } from "@/components/SectionRenew";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return pageMetadata({ locale, path: "/bang-gia", title: t("pricingTitle"), description: t("pricingDesc") });
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell>
      <PricingPageHero />
      <Pricing />
      <PricingComparisonTable />
      <SectionRenew />
      <SectionPricingWhoIsFor />
      <SectionPricingCommitment />
      <SectionPricingFAQ />
      <SectionPricingCTA />
    </PageShell>
  );
}
