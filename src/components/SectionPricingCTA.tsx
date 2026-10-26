import { getTranslations } from "next-intl/server";
import { CtaBand } from "./CTA";

export async function SectionPricingCTA() {
  const t = await getTranslations("pricingPage");
  const tNav = await getTranslations("nav");
  return <CtaBand title={t("ctaTitle")} button={t("ctaButton")} secondaryLabel={tNav("contact")} />;
}
