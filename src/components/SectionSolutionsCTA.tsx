import { getTranslations } from "next-intl/server";
import { CtaBand } from "./CTA";

export async function SectionSolutionsCTA() {
  const t = await getTranslations("solutionsPage");
  const tNav = await getTranslations("nav");
  return <CtaBand title={t("ctaTitle")} subtitle={t("ctaSubtext")} button={t("ctaButton")} secondaryLabel={tNav("contact")} />;
}
