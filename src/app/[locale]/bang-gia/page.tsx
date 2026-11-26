import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { OtherProducts } from "@/components/pricing2/OtherProducts";
import { PageShell } from "@/components/PageShell";
import { PricingHero } from "@/components/pricing2/PricingHero";
import { SalonPlans, PLAN_NAMES } from "@/components/pricing2/SalonPlans";
import { DeskBand } from "@/components/pricing2/DeskBand";
import { RenewPanel } from "@/components/pricing2/RenewPanel";
import { FaqList } from "@/components/pricing2/FaqList";
import { SIGNUP_URL, appLink } from "@/lib/app-links";
import { getPlans } from "@/lib/plans";
import { pageMetadata, pageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/metadata";
import { jsonLdString } from "@/lib/json-ld";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

const PATH = "/bang-gia";
/** Thứ tự câu hỏi ở mục FAQ (dùng cho cả phần hiển thị và JSON-LD FAQPage). */
const FAQ = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return pageMetadata({ locale, path: PATH, title: t("pricingTitle"), description: t("pricingDesc") });
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricing2");
  const tPages = await getTranslations("pages");
  const data = await getPlans();
  const faq = FAQ.map((i) => ({ q: t(`faq.q${i}`), a: t(`faq.a${i}`) }));

  // JSON-LD: FAQPage (đúng các câu đang hiện) + giá từng gói (đúng giá trên bảng, lấy từ app)
  const url = pageUrl(locale, PATH);
  const offer = (name: string, price: number) => ({
    "@type": "Offer",
    name,
    price,
    priceCurrency: "CZK",
    url,
    availability: "https://schema.org/InStock",
    priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "CZK", unitCode: "MON", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" } },
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: siteConfig.name,
        description: tPages("pricingDesc"),
        brand: { "@type": "Brand", name: siteConfig.name },
        offers: [
          ...data.plans.map((p) => offer(`${siteConfig.name} ${PLAN_NAMES[p.code]}`, p.monthly)),
          ...(data.desk.live ? [offer(`${siteConfig.name} – ${t("desk.name")}`, data.desk.monthly)] : []),
        ],
      },
    ],
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <PricingHero />
      <SalonPlans data={data} />
      <DeskBand desk={data.desk} />
      <OtherProducts />
      <RenewPanel />
      <FaqList
        id="faq"
        title={t("faq.title")}
        items={faq}
        aside={
          <div className="mt-8 flex flex-col items-start gap-5">
            <a href={appLink(SIGNUP_URL, locale)} className="x-btn-primary">
              {t("faq.trialCta")}
            </a>
            <Link href="/faq" className="x-link">
              {t("faq.all")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        }
      />
    </PageShell>
  );
}
