import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/metadata";

const OG_LOCALE = { en: "en_US", vi: "vi_VN", cs: "cs_CZ", de: "de_DE" } as const;

/** URL tuyệt đối của một trang: /{locale}{path}; path "" = trang chủ */
export const pageUrl = (locale: string, path = "") => `${siteConfig.url}/${locale}${path}`;

/**
 * Metadata chuẩn SEO cho mỗi trang: canonical, hreflang cho 4 ngôn ngữ (+ x-default = tiếng Việt),
 * Open Graph / Twitter riêng từng trang (thay cho tiêu đề chung của layout).
 * title: chuỗi đầy đủ khi `absolute` (trang chủ), còn lại layout tự thêm " | SalonGo".
 */
export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  absolute = false,
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
  absolute?: boolean;
}): Metadata {
  const url = pageUrl(locale, path);
  const fullTitle = absolute ? title : `${title} | ${siteConfig.name}`;
  const image = { url: `${siteConfig.url}${siteConfig.ogImage}`, width: 1200, height: 630, alt: fullTitle };
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, pageUrl(l, path)])),
        "x-default": pageUrl(routing.defaultLocale, path),
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: OG_LOCALE[locale as keyof typeof OG_LOCALE] ?? "vi_VN",
      url,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}
