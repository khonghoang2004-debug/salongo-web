import { getTranslations } from "next-intl/server";
import { CtaBand } from "./CTA";

export async function SectionContactCTA() {
  const t = await getTranslations("contact");
  return <CtaBand title={t("ctaTitle")} subtitle={t("ctaSubtext")} button={t("ctaButton")} />;
}
