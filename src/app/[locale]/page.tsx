import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DownloadSection } from "@/components/DownloadSection";
import { TrustSection } from "@/components/TrustSection";
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
      images: [{ url: siteConfig.ogImage, alt: t("homeTitle") }],
    },
    twitter: {
      title: t("homeTitle"),
      description: t("homeDesc"),
      images: [siteConfig.ogImage],
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const base = siteConfig.url;
  const heroImageUrl = `${base}${siteConfig.ogImage}`;
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
        image: heroImageUrl,
      },
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: siteConfig.name,
        url: base,
        logo: `${base}${siteConfig.logo}`,
        image: heroImageUrl,
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
      <Hero />
      <TrustSection />
      <HowItWorks />
      <DownloadSection />
      <CTA />
      <Footer />
    </>
  );
}
