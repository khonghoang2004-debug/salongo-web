import { getTranslations } from "next-intl/server";
import { CtaBand } from "./CTA";

export async function SectionFeaturesCTA() {
  const t = await getTranslations("featuresPage");
  const tNav = await getTranslations("nav");
  return <CtaBand title={t("ctaTitle")} subtitle={t("ctaSubtext")} button={t("ctaButton")} secondaryLabel={tNav("contact")} />;
}
