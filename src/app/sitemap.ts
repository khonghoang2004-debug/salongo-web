import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";
import { routing } from "@/i18n/routing";

const paths = [
  "",
  "/tinh-nang",
  "/giai-phap",
  "/bang-gia",
  "/ve-salongo",
  "/faq",
  "/lien-he",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  return routing.locales.flatMap((locale) =>
    paths.map((path) => {
      const url = path ? `${baseUrl}/${locale}${path}` : `${baseUrl}/${locale}`;
      return {
        url,
        lastModified: new Date(),
        changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
        priority: path === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [
              loc,
              path ? `${baseUrl}/${loc}${path}` : `${baseUrl}/${loc}`,
            ])
          ),
        },
      };
    })
  );
}
