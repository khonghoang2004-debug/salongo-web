import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeFeatures } from "@/components/home/HomeFeatures";
import { HomeLanguage } from "@/components/home/HomeLanguage";
import { HomeSalonTypes } from "@/components/home/HomeSalonTypes";
import { HomePricingTeaser } from "@/components/home/HomePricingTeaser";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const pageUrl = `${siteConfig.url}/${locale}`;
  return {
    title: t("homeTitle"),
    description: t("homeDesc"),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDesc"),
      url: pageUrl,
      images: [
        {
          url: `${siteConfig.url}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: t("homeTitle"),
        },
      ],
    },
    twitter: {
      title: t("homeTitle"),
      description: t("homeDesc"),
      images: [`${siteConfig.url}${siteConfig.ogImage}`],
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const base = siteConfig.url;
  const ogImageUrl = `${base}${siteConfig.ogImage}`;
  const pageUrl = `${base}/${locale}`;
  const tPage = await getTranslations({ locale, namespace: "pages" });
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${pageUrl}/#website`,
        url: pageUrl,
        name: siteConfig.name,
        description: tPage("homeDesc"),
        image: ogImageUrl,
      },
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: siteConfig.name,
        url: base,
        logo: `${base}${siteConfig.logo}`,
        image: ogImageUrl,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${base}/#software`,
        name: siteConfig.name,
        url: base,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        image: ogImageUrl,
        description: tPage("homeDesc"),
      },
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
        <HomeFeatures />
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
