import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "en", "cs", "de"],
  defaultLocale: "vi",
  localePrefix: "always",
  localeDetection: false,
  // hreflang đã có trong <head> (src/lib/seo.ts) và sitemap. Header Link của next-intl trỏ x-default
  // về URL không có ngôn ngữ (/tinh-nang → chuyển hướng 307), mâu thuẫn với hai nguồn kia → tắt.
  alternateLinks: false,
});
