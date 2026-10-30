import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
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
  return pageMetadata({ locale, path: "/faq", title: t("faqTitle"), description: t("faqDesc") });
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "faq" });
  // Dữ liệu cấu trúc FAQPage: đúng các câu hỏi đang hiện trên trang
  const QS = ["1", "2", "3", "4", "5", "10", "11", "12", "6", "7", "15", "13", "14", "8", "9"];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QS.map((n) => ({ "@type": "Question", name: t(`q${n}`), acceptedAnswer: { "@type": "Answer", text: t(`a${n}`) } })),
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FAQPageHero />
      <SectionFAQ />
      <SectionFAQTrust />
    </PageShell>
  );
}
