import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/PageShell";
import { KasaCompare, KasaFeatures, KasaHero } from "@/components/kasa/KasaSections";
import { KasaAnchorNav, KasaBuySteps, KasaInstallGuide, KasaPick, KasaWhat } from "@/components/kasa/KasaGuide";
import { FaqList } from "@/components/pricing2/FaqList";
import { pageMetadata, pageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/metadata";
import { jsonLdString } from "@/lib/json-ld";
import { KASA_PRICE_CZK, kasaPrice } from "@/lib/kasa";

type Props = { params: Promise<{ locale: string }> };

const PATH = "/kasa";
const FAQ = [1, 2, 3, 4, 5] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kasa.meta" });
  // Title already carries the product name; keep it whole (no " | SalonGo" suffix)
  return pageMetadata({ locale, path: PATH, title: t("title"), description: t("desc", { price: kasaPrice(locale) }), absolute: true });
}

/** SalonGo Kasa: hero, jump links, what Kasa is, features, Kasa vs SalonGo, how to buy, step-by-step install guide, FAQ. */
export default async function KasaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("kasa");
  const price = kasaPrice(locale);
  const faq = FAQ.map((i) => ({ q: t(`faq.q${i}`), a: t(`faq.a${i}`, { price }) }));
  const url = pageUrl(locale, PATH);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#app`,
        name: "SalonGo Kasa",
        url,
        description: t("meta.desc", { price }),
        applicationCategory: "BusinessApplication",
        operatingSystem: "Windows, macOS",
        inLanguage: locale,
        publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        offers: {
          "@type": "Offer",
          price: KASA_PRICE_CZK,
          priceCurrency: "CZK",
          url: pageUrl(locale, `${PATH}/thanh-toan`),
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    // The sticky phone CTA invites a SalonGo trial: not the offer on this page
    <PageShell cta={false}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <KasaHero />
      <KasaAnchorNav />
      <KasaWhat />
      <KasaFeatures />
      <KasaPick />
      <KasaCompare />
      <KasaBuySteps />
      <KasaInstallGuide />
      <FaqList id="faq" title={t("faq.title")} items={faq} />
    </PageShell>
  );
}
