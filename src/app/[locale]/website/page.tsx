import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowDown, Check } from "lucide-react";
import { pageMetadata, pageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/metadata";
import { WEBSITE_PRICE_KC } from "@/lib/website-offer";
import { TEMPLATES } from "@/components/website/templates/registry";
import { PageShell } from "@/components/PageShell";
import { SectionHead } from "@/components/ui/SectionHead";
import { CustomIdeaNote, OfferPrice, SplitTitle, TemplateCards, offerVars } from "@/components/website/WebsiteOfferParts";
import { WebsiteContactPanel } from "@/components/website/WebsiteContact";

type Props = { params: Promise<{ locale: string }> };

// Trang dịch vụ làm website + thư viện mẫu: được index (có trong sitemap). Trang demo từng mẫu thì noindex.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return pageMetadata({ locale, path: "/website", title: t("websiteTitle", offerVars()), description: t("websiteDesc", offerVars()) });
}

const INCLUDED = ["inc1", "inc2", "inc3", "inc4", "inc5", "inc6"] as const;
const STEPS = [1, 2, 3] as const;
const FAQ = [1, 6, 2, 3, 4, 5] as const;

export default async function WebsitePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("webOffer");
  const tp = await getTranslations("pages");
  const tn = await getTranslations("nav");
  const v = offerVars();

  // Dữ liệu có cấu trúc: dịch vụ thật của SalonGo (giá đã chốt), FAQ đúng như hiển thị, breadcrumb.
  // Không đưa salon mẫu nào vào (chúng chỉ là demo, noindex).
  const url = pageUrl(locale, "/website");
  const org = `${siteConfig.url}/#organization`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: tp("websiteTitle", v),
        description: tp("websiteDesc", v),
        serviceType: "Website design for beauty salons",
        url,
        inLanguage: locale,
        provider: { "@id": org },
        brand: { "@type": "Brand", name: siteConfig.name },
        areaServed: [{ "@type": "Country", name: "Czechia" }, { "@type": "Place", name: "European Union" }],
        audience: { "@type": "BusinessAudience", name: "Hair, nail, beauty, spa and barber salons using SalonGo" },
        offers: {
          "@type": "Offer",
          price: WEBSITE_PRICE_KC,
          priceCurrency: "CZK",
          url,
          availability: "https://schema.org/InStock",
          description: `${v.price} ${t("priceLine", v)}`,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t("galleryTitle"),
          numberOfItems: TEMPLATES.length,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: FAQ.map((n) => ({
          "@type": "Question",
          name: t(`faq${n}Q`, v),
          acceptedAnswer: { "@type": "Answer", text: t(`faq${n}A`, v) },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: tn("home"), item: pageUrl(locale) },
          { "@type": "ListItem", position: 2, name: t("breadcrumb"), item: url },
        ],
      },
    ],
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="pt-1.5 sm:pt-3">
        <div className="sg-panel">
          <div className="mx-auto max-w-[1160px] px-4 py-10 sm:px-8 sm:py-14 lg:py-16">
            <span className="sg-eyebrow">
              <span className="size-1.5 rounded-full bg-brand-700" aria-hidden />
              {t("eyebrow")}
            </span>
            <h1 className="sg-h1 mt-5 max-w-4xl"><SplitTitle text={t("heroTitle")} /></h1>
            <p className="sg-lead mt-5 max-w-2xl">{t("heroLead", v)}</p>
            <div className="mt-7">
              <OfferPrice />
            </div>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <a href="#mau" className="btn-primary min-h-12 px-7 text-base">
                {t("ctaTemplates")}
                <ArrowDown className="size-[18px]" aria-hidden />
              </a>
              <a href="#lien-he" className="btn-secondary min-h-12 px-7 text-base">
                {t("ctaContact")}
              </a>
            </div>
              <CustomIdeaNote className="mt-6 max-w-xl" />
          </div>
        </div>
      </section>

      <section id="mau" className="sg-section scroll-mt-20">
        <div className="sg-container">
          <SectionHead kicker={t("galleryKicker")} title={t("galleryTitle")} lead={t("galleryLead", v)} />
          <div className="mt-8 lg:mt-12">
            <TemplateCards headingLevel="h3" />
          </div>
        </div>
      </section>

      <section className="sg-section sg-section-tint">
        <div className="sg-container grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="sg-kicker">{t("incKicker")}</p>
            <h2 className="sg-h2 mt-4">{t("incTitle", v)}</h2>
          </div>
          <ul className="grid gap-3 lg:col-span-7">
            {INCLUDED.map((k) => (
              <li key={k} className="flex gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-[15px] leading-relaxed text-ink">
                <Check className="mt-0.5 size-5 shrink-0 text-brand-700" strokeWidth={2.5} aria-hidden />
                {t(k, v)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sg-section">
        <div className="sg-container">
          <SectionHead kicker={t("stepsKicker")} title={t("stepsTitle")} layout="stack" />
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map((n) => (
              <li key={n} className="rounded-[24px] border border-line bg-white p-6 sm:p-7">
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-50 font-display font-semibold text-brand-700">{n}</span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{t(`step${n}Title`)}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{t(`step${n}Text`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sg-section pt-0 sm:pt-0 lg:pt-0">
        <div className="sg-container grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="sg-kicker">{t("faqKicker")}</p>
            <h2 className="sg-h2-sm mt-4">{t("faqTitle")}</h2>
          </div>
          <div className="divide-y divide-line rounded-[24px] border border-line bg-white lg:col-span-8">
            {FAQ.map((n) => (
              <details key={n} className="group px-5 sm:px-7" open={n === 1}>
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {t(`faq${n}Q`, v)}
                  <span className="text-xl font-normal text-brand-700 transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="pb-5 text-[15px] leading-relaxed text-muted">{t(`faq${n}A`, v)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="lien-he" className="sg-section scroll-mt-20 pt-0 sm:pt-0 lg:pt-0">
        <div className="sg-container">
          <div className="mx-auto max-w-3xl rounded-[28px] border border-line bg-[#FBF7F7] px-5 py-10 text-center sm:px-10 sm:py-14">
            <h2 className="sg-h2-sm">{t("contactNow")}</h2>
            <CustomIdeaNote className="mx-auto mt-5 max-w-xl justify-center text-left" />
            <div className="mt-7 text-left">
              <WebsiteContactPanel />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
