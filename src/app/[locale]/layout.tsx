import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, IBM_Plex_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/metadata";
import { MotionRoot } from "@/components/motion/MotionRoot";

import enMessages from "../../../messages/en.json";
import viMessages from "../../../messages/vi.json";
import csMessages from "../../../messages/cs.json";
import deMessages from "../../../messages/de.json";

// Be Vietnam Pro: font thiết kế cho tiếng Việt, đủ dấu Séc / Đức, dùng cho cả tiêu đề và nội dung
const sans = Be_Vietnam_Pro({
  // latin-ext: dấu tiếng Séc / Đức (ř, ů, ß…); vietnamese: dấu tiếng Việt. Thiếu hai bộ này thì chữ có dấu rơi về font hệ thống
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});


// Chỉ dùng cho hình hoá đơn (giấy in nhiệt) trên trang, không dùng cho chữ thường
const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#800020",
};

const localeToOg = { en: "en_US", vi: "vi_VN", cs: "cs_CZ", de: "de_DE" } as const;

const metadataMap = {
  en: (enMessages as { metadata: { description: string } }).metadata,
  vi: (viMessages as { metadata: { description: string } }).metadata,
  cs: (csMessages as { metadata: { description: string } }).metadata,
  de: (deMessages as { metadata: { description: string } }).metadata,
} as const;

const CLIENT_NAMESPACES = ["site", "nav", "device", "faq", "contact", "pricingPage", "webOffer"] as const;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = (hasLocale(routing.locales, locale) ? metadataMap[locale as keyof typeof metadataMap] : metadataMap.vi) as { description: string };
  const ogLocale = localeToOg[locale as keyof typeof localeToOg] || "vi_VN";

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      // Chỉ dùng khi trang không tự đặt tiêu đề (trang 404); mọi trang thật đều có tiêu đề riêng
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: meta.description,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    /** Favicon / logo tab & Google kết quả tìm kiếm - URLs tuyệt đối với metadataBase */
    icons: {
      // favicon.ico không có tham số: Bing / Google lấy icon kết quả tìm kiếm từ đúng đường dẫn này.
      // Các file còn lại giữ ?v=3 để trình duyệt (nhất là Safari) bỏ icon Next.js cũ đã lưu
      icon: [
        { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
        { url: "/icon-192.png?v=3", sizes: "192x192", type: "image/png" },
        { url: "/salongo-logo.svg?v=3", type: "image/svg+xml", sizes: "any" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-touch-icon.png?v=3", type: "image/png", sizes: "180x180" }],
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: meta.description,
      images: [
        {
          url: `${siteConfig.url}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: meta.description,
      images: [`${siteConfig.url}${siteConfig.ogImage}`],
    },
    // Mã xác minh Search Console / Bing / Seznam: đặt biến môi trường trên Vercel (không cần sửa code).
    // Google đã xác minh bằng file public/googlef4498c62abaef25e.html — đừng xoá file đó.
    verification: {
      ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : {}),
      other: {
        ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : {}),
        ...(process.env.NEXT_PUBLIC_SEZNAM_SITE_VERIFICATION ? { "seznam-wmt": process.env.NEXT_PUBLIC_SEZNAM_SITE_VERIFICATION } : {}),
      },
    },
    // Không ghi "index, follow" (mặc định của Google): để trang 404 chỉ còn thẻ noindex của Next
    robots: {
      googleBot: {
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

  // Chỉ gửi xuống trình duyệt các nhóm chữ mà component "use client" dùng (useTranslations) — trước đây
  // cả file ngôn ngữ (~70 KB) bị nhúng vào mọi trang. Thêm client component dùng nhóm mới thì thêm vào đây.
  const all = await getMessages();
  const messages = Object.fromEntries(CLIENT_NAMESPACES.filter((k) => k in all).map((k) => [k, all[k]]));

  return (
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Bật chuyển động trước khi vẽ trang để nội dung không bị nháy */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('sg-js')" }} />
      </head>
      <body>
        <svg className="absolute size-0 overflow-hidden" aria-hidden>
          <defs>
            <linearGradient id="gradientPinkPurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6b1532" />
              <stop offset="50%" stopColor="#800020" />
              <stop offset="100%" stopColor="#c04a6e" />
            </linearGradient>
          </defs>
        </svg>
        <NextIntlClientProvider messages={messages}>
          <div id="sg-root" className={`${sans.variable} ${mono.variable} font-sans antialiased`}>
            {children}
            <MotionRoot />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
