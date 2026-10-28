import { getTranslations } from "next-intl/server";
import { PageHero } from "./ui/PageHero";

export async function PricingPageHero() {
  const t = await getTranslations("pricingPage");
  const tNav = await getTranslations("nav");

  return (
    <PageHero
      crumb={tNav("pricing")}
      eyebrow={<span className="sg-eyebrow">{t("heroBadge")}</span>}
      title={t("heroTitle")}
      lead={t("heroSubtext")}
    />
  );
}
