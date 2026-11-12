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
import { getPlans, maxYearlyDiscount } from "@/lib/plans";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const data = await getPlans();
  const price = (code: string) => {
    const n = data.plans.find((p) => p.code === code)?.monthly;
    return n === undefined ? "–" : new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 2 }).format(n);
  };
  const description = t("pricingDesc", {
    basic: price("BASIC"),
    pro: price("PRO"),
    premium: price("PREMIUM"),
    discount: maxYearlyDiscount(data) ?? 0,
    days: data.trialDays,
  });
  return pageMetadata({ locale, path: "/bang-gia", title: t("pricingTitle"), description });
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
