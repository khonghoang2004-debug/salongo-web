import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/PageShell";
import { LandingHero } from "@/components/landing/LandingHero";
import { WebStudioSection } from "@/components/landing/WebStudioSection";
import { Platforms } from "@/components/landing/Platforms";
import { DayTour } from "@/components/landing/DayTour";
import { MoreGrid } from "@/components/landing/MoreGrid";
import { ClipSection } from "@/components/landing/ClipSection";
import { WhoFor } from "@/components/landing/WhoFor";
import { EetBand } from "@/components/landing/EetBand";
import { PriceBoard } from "@/components/landing/PriceBoard";
import { FaqShort, FinalCta, LANDING_FAQ } from "@/components/landing/Closing";
import { siteConfig } from "@/lib/metadata";
import { getPlans, priceRange } from "@/lib/plans";
import { CLIPS } from "@/lib/clips";
import { CONTACT_EMAIL, CONTACT_FACEBOOK, CONTACT_PHONE } from "@/lib/contact";
import { OPERATOR } from "@/lib/legal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  // Trang chủ: tiêu đề đầy đủ có từ khoá + tên thương hiệu (template của layout không áp dụng ở cùng cấp)
  return pageMetadata({ locale, title: `${t("homeTitle")} | ${siteConfig.name}`, description: t("homeDesc"), absolute: true });
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const base = siteConfig.url;
  const ogImageUrl = `${base}${siteConfig.ogImage}`;
  const pageUrl = `${base}/${locale}`;
  const tPage = await getTranslations({ locale, namespace: "pages" });
  const tVid = await getTranslations({ locale, namespace: "landing.videos" });
  const tFaq = await getTranslations({ locale, namespace: "homeFaq" });
  const org = `${base}/#organization`;
  const prices = priceRange(await getPlans());
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${pageUrl}/#website`,
        url: pageUrl,
        name: siteConfig.name,
        alternateName: ["SalonGo app", "salongo.eu"],
        description: tPage("homeDesc"),
        inLanguage: locale,
        publisher: { "@id": org },
      },
      // Trang chủ là một WebPage của WebSite, nói về phần mềm SalonGo (giúp Google/AI nối trang ↔ thực thể)
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: `${tPage("homeTitle")} | ${siteConfig.name}`,
        description: tPage("homeDesc"),
        inLanguage: locale,
        isPartOf: { "@id": `${pageUrl}/#website` },
        about: { "@id": `${base}/#software` },
        primaryImageOfPage: { "@type": "ImageObject", url: ogImageUrl, width: 1200, height: 630 },
        publisher: { "@id": org },
      },
      {
        "@type": "Organization",
        "@id": org,
        name: siteConfig.name,
        url: base,
        // Một câu cố định (tiếng Anh) ở mọi ngôn ngữ: thực thể giống nhau trên Google, Bing, trợ lý AI
        description:
          "SalonGo makes salon management software (booking, checkout, Czech EET 2.0, payroll) for nail, hair, lash and beauty salons in Europe, with Vietnamese and Czech support. Based in Jesenice, Czech Republic.",
        logo: { "@type": "ImageObject", url: `${base}/icon-512.png`, width: 512, height: 512 },
        image: ogImageUrl,
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE,
        // Người vận hành theo živnostenský rejstřík (giống chân trang); IČO giúp Google/AI nhận đúng thực thể
        legalName: OPERATOR.name,
        identifier: { "@type": "PropertyValue", propertyID: "IČO", value: OPERATOR.ico },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Svornosti 189",
          postalCode: "252 42",
          addressLocality: "Jesenice",
          addressCountry: "CZ",
        },
        // Chỉ trang của doanh nghiệp; Instagram hiện là tài khoản cá nhân nên không đưa vào sameAs
        sameAs: [CONTACT_FACEBOOK],
        areaServed: [
          { "@type": "Country", name: "Czech Republic" },
          { "@type": "Place", name: "Europe" },
        ],
        knowsLanguage: ["vi", "cs", "en", "de"],
        // Dịch vụ làm website cho khách SalonGo (chi tiết: JSON-LD Service trên trang /website)
        makesOffer: {
          "@type": "Offer",
          price: 4999,
          priceCurrency: "CZK",
          url: `${pageUrl}/website`,
          itemOffered: { "@id": `${pageUrl}/website#service` },
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: CONTACT_EMAIL,
          telephone: CONTACT_PHONE,
          availableLanguage: ["vi", "cs"],
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${base}/#software`,
        name: siteConfig.name,
        url: pageUrl,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Salon management software",
        operatingSystem: "Web, Windows, macOS",
        inLanguage: ["vi", "cs", "sk", "en", "de", "fr"],
        image: ogImageUrl,
        description: tPage("homeDesc"),
        publisher: { "@id": org },
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Nail studios, hair salons, lash and brow studios, beauty salons and spas (many Vietnamese-run, in Czechia and Europe)",
        },
        featureList: [
          "Online booking page for clients",
          "Appointment calendar per staff member",
          "Checkout (POS): cash, card, QR bank transfer, tips",
          "Czech EET 2.0 fiscal reporting",
          "Payroll by commission or fixed salary",
          "Client profiles, loyalty points, email marketing",
          "Reports and exports",
          "Multiple locations in one account",
        ],
        // Giá các gói đang bán trong app (lib/plans: lấy từ app, dự phòng Basic 199 / Pro 499 / Premium 799 CZK/tháng)
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "CZK",
          lowPrice: prices.low,
          highPrice: prices.high,
          offerCount: prices.count,
          url: `${pageUrl}/bang-gia`,
        },
      },
      // Câu hỏi ngắn ở trang chủ (đúng nội dung đang hiện ở mục HomeFaq)
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: LANDING_FAQ.map((i) => ({
          "@type": "Question",
          name: tFaq(`q${i}`),
          acceptedAnswer: { "@type": "Answer", text: tFaq(`a${i}`) },
        })),
      },
      // Đoạn phim ngắn đang hiện ở mục ClipSection (không tiếng → không ghi inLanguage; chú thích theo ngôn ngữ trang)
      ...CLIPS.map((c) => ({
        "@type": "VideoObject",
        "@id": `${pageUrl}/#clip-${c.id}`,
        name: `${siteConfig.name} – ${tVid(`items.${c.id}.title`)}`,
        description: tVid(`items.${c.id}.desc`),
        thumbnailUrl: `${base}${c.posterPc}`,
        contentUrl: `${base}${c.pc}`,
        uploadDate: "2026-11-20T00:00:00+01:00",
        publisher: { "@id": org },
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PageShell>
        <LandingHero />
        <Platforms />
        <DayTour />
        <MoreGrid />
        <ClipSection />
        <WhoFor />
        <EetBand />
        <WebStudioSection />
        <PriceBoard />
        <FaqShort />
        <FinalCta />
      </PageShell>
    </>
  );
}
