import { getTranslations } from "next-intl/server";

export async function PricingPageHero() {
  const t = await getTranslations("pricingPage");

  return (
    <section
      className="sg-page-hero sg-section-glow relative overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/80 bg-white/90 px-4 py-2 text-sm font-medium text-muted shadow-sg-sm">
          <span className="text-amber-500">⭐</span> {t("heroBadge")}
        </p>
        <h1 className="mt-5 sg-h1">
          {t("heroTitle")}
        </h1>
        <p className="sg-lead mx-auto mt-5 max-w-2xl">
          {t("heroSubtext")}
        </p>
      </div>
    </section>
  );
}
