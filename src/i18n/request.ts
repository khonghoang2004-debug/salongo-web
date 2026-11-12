import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { getPlans } from "@/lib/plans";
import { fillPlanMessages, planTokens } from "@/lib/plans-core";

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

// Văn bản có số liệu gói ({days}, {from}, {discount}…) được điền từ giá của app; giữ bản đã điền theo ngôn ngữ + số liệu
const filled = new Map<string, unknown>();

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const raw = messagesMap[locale] ?? viMessages;
  const tokens = planTokens(await getPlans(), locale);
  const key = `${locale}|${JSON.stringify(tokens)}`;
  let messages = filled.get(key) as typeof raw | undefined;
  if (!messages) {
    messages = fillPlanMessages(raw, tokens);
    if (filled.size > 20) filled.clear();
    filled.set(key, messages);
  }

  return {
    locale,
    messages,
  };
});
