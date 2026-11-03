import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { pageUrl } from "@/lib/seo";

// Trang được index (mỗi trang có đủ 4 ngôn ngữ). Thêm trang mới: thêm vào đây và vào chân trang/menu.
// Demo website mẫu (/website/mau/...) cố ý không có ở đây: noindex, chỉ để minh hoạ.
export const SITEMAP_PATHS = [
  "",
  "/tinh-nang",
  "/phan-mem-quan-ly-salon",
  "/giai-phap",
  "/bang-gia",
  "/ve-salongo",
  "/faq",
  "/lien-he",
  "/website",
  "/privacy",
  "/terms",
  "/cookies",
  "/dpa",
  "/website-terms",
];

// Không ghi lastmod / changefreq / priority: Google bỏ qua changefreq, priority, và chỉ tin lastmod khi nó
// đúng là ngày nội dung đổi (trước đây là giờ build, mỗi lần deploy đều "mới").
export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    SITEMAP_PATHS.map((path) => ({
      url: pageUrl(locale, path),
      alternates: {
        languages: {
          ...Object.fromEntries(routing.locales.map((l) => [l, pageUrl(l, path)])),
          "x-default": pageUrl(routing.defaultLocale, path),
        },
      },
    }))
  );
}
