import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "en", "cs", "de"],
  defaultLocale: "vi",
  localePrefix: "always",
  localeDetection: false,
});
