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
import { SectionPricingFAQ } from "@/components/SectionPricingFAQ";
import { PRICING_FAQ_KEYS } from "@/lib/pricing-faq";
import { SectionRenew } from "@/components/SectionRenew";
import { PricingDeskBand } from "@/components/desk/PricingDeskBand";
import { PricingAudiencePicker } from "@/components/PricingAudiencePicker";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return pageMetadata({ locale, path: "/bang-gia", title: t("pricingTitle"), description: t("pricingDesc") });
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pricingPage" });
  // FAQPage: đúng các câu hỏi/đáp đang hiện ở mục FAQ của trang giá (render sẵn từ server)
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQ_KEYS.map((i) => ({
      "@type": "Question",
      name: t(`faqQ${i}`),
      acceptedAnswer: { "@type": "Answer", text: t(`faqA${i}`) },
    })),
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PricingPageHero />
      <PricingAudiencePicker />
      <Pricing />
      <PricingDeskBand />
      <PricingComparisonTable />
      <SectionRenew />
      <SectionPricingWhoIsFor />
      <SectionPricingCommitment />
      <SectionPricingFAQ />
      <SectionPricingCTA />
    </PageShell>
  );
}
