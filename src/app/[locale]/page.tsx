import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeWebsiteOffer } from "@/components/home/HomeWebsiteOffer";
import { HomeFeatures } from "@/components/home/HomeFeatures";
import { HomeVideos } from "@/components/home/HomeVideos";
import { HomeHighlights } from "@/components/home/HomeHighlights";
import { HomeMarketing } from "@/components/home/HomeMarketing";
import { HomeLanguage } from "@/components/home/HomeLanguage";
import { HomeSalonTypes } from "@/components/home/HomeSalonTypes";
import { HomePricingTeaser } from "@/components/home/HomePricingTeaser";
import { HomeEet } from "@/components/home/HomeEet";
import { HomeFaq, HOME_FAQ_KEYS } from "@/components/home/HomeFaq";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/metadata";
import { getPlans, priceRange } from "@/lib/plans";
import { VIDEOS, videoSrc } from "@/lib/videos";
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
  const tVid = await getTranslations({ locale, namespace: "videos" });
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
        description: tPage("homeDesc"),
        inLanguage: locale,
        publisher: { "@id": org },
      },
      {
        "@type": "Organization",
        "@id": org,
        name: siteConfig.name,
        url: base,
        logo: `${base}/icon-512.png`,
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
        // Dịch vụ làm website cho khách SalonGo (chi tiết: JSON-LD Service trên trang /website)
        makesOffer: {
          "@type": "Offer",
          price: 999,
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
        mainEntity: HOME_FAQ_KEYS.map((i) => ({
          "@type": "Question",
          name: tFaq(`q${i}`),
          acceptedAnswer: { "@type": "Answer", text: tFaq(`a${i}`) },
        })),
      },
      // Video giới thiệu từng tính năng (để Google hiện kết quả video)
      ...VIDEOS.map((v) => {
        const s = videoSrc(v);
        return {
          "@type": "VideoObject",
          "@id": `${base}/#video-${v.id}`,
          name: `${siteConfig.name} – ${tVid(`items.${v.id}.title`)}`,
          description: tVid(`items.${v.id}.desc`),
          thumbnailUrl: `${base}${s.posterPc}`,
          contentUrl: `${base}${s.pc}`,
          uploadDate: "2026-10-31",
          duration: v.iso,
          inLanguage: "vi",
          publisher: { "@id": org },
        };
      }),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main>
        <HomeHero />
        <HomeWebsiteOffer />
        <HomeEet />
        <HomeFeatures />
        <HomeVideos />
        <HomeHighlights />
        <HomeMarketing />
        <HomeLanguage />
        <HomeSalonTypes />
        <HowItWorks />
        <HomePricingTeaser />
        <HomeFaq />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
