import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/metadata";

import enMessages from "../../../messages/en.json";
import viMessages from "../../../messages/vi.json";
import csMessages from "../../../messages/cs.json";
import deMessages from "../../../messages/de.json";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171717",
};

const localeToOg = { en: "en_US", vi: "vi_VN", cs: "cs_CZ", de: "de_DE" } as const;

const metadataMap = {
  en: (enMessages as { metadata: { description: string; keywords: string[] } }).metadata,
  vi: (viMessages as { metadata: { description: string; keywords: string[] } }).metadata,
  cs: (csMessages as { metadata: { description: string; keywords: string[] } }).metadata,
  de: (deMessages as { metadata: { description: string; keywords: string[] } }).metadata,
} as const;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = (hasLocale(routing.locales, locale) ? metadataMap[locale as keyof typeof metadataMap] : metadataMap.vi) as { description: string; keywords: string[] };
  const ogLocale = localeToOg[locale as keyof typeof localeToOg] || "vi_VN";

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${meta.description}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: meta.description,
      images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: meta.description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className={`${inter.variable} font-sans antialiased`}>{children}</div>
    </NextIntlClientProvider>
  );
}
