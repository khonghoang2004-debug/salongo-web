import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeFeatures } from "@/components/home/HomeFeatures";
import { HomeVideos } from "@/components/home/HomeVideos";
import { HomeHighlights } from "@/components/home/HomeHighlights";
import { HomeMarketing } from "@/components/home/HomeMarketing";
import { HomeLanguage } from "@/components/home/HomeLanguage";
import { HomeSalonTypes } from "@/components/home/HomeSalonTypes";
import { HomePricingTeaser } from "@/components/home/HomePricingTeaser";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/metadata";
import { VIDEOS, videoSrc } from "@/lib/videos";
import { CONTACT_EMAIL, CONTACT_FACEBOOK, CONTACT_INSTAGRAM, CONTACT_PHONE } from "@/lib/contact";

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
  const org = `${base}/#organization`;
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
        sameAs: [CONTACT_FACEBOOK, CONTACT_INSTAGRAM],
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
        // Giá các gói đang bán trong app (Basic 199, Pro 499, Premium 799 CZK/tháng)
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "CZK",
          lowPrice: 199,
          highPrice: 799,
          offerCount: 3,
          url: `${pageUrl}/bang-gia`,
        },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <HomeHero />
        <HomeVideos />
        <HomeFeatures />
        <HomeMarketing />
        <HomeHighlights />
        <HomeLanguage />
        <HomeSalonTypes />
        <HowItWorks />
        <HomePricingTeaser />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
