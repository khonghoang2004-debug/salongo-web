import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

import enMessages from "../../messages/en.json";
import viMessages from "../../messages/vi.json";
import csMessages from "../../messages/cs.json";
import deMessages from "../../messages/de.json";

const messagesMap = {
  en: enMessages,
  vi: viMessages,
  cs: csMessages,
  de: deMessages,
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = messagesMap[locale] ?? viMessages;

  return {
    locale,
    messages,
  };
});
