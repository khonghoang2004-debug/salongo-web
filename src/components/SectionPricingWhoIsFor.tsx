import { getTranslations } from "next-intl/server";

const CARDS = [
  { planKey: "plan1Name", titleKey: "whoBasic", descKey: "whoBasicDesc" },
  { planKey: "plan2Name", titleKey: "whoPro", descKey: "whoProDesc" },
  { planKey: "plan3Name", titleKey: "whoPremium", descKey: "whoPremiumDesc" },
  { planKey: "plan4Name", titleKey: "whoEnterprise", descKey: "whoEnterpriseDesc" },
] as const;

export async function SectionPricingWhoIsFor() {
  const t = await getTranslations("pricingPage");
  const tPricing = await getTranslations("pricing");

  return (
    <section className="sg-section bg-white">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center sg-h2">
          {t("whoTitle")}
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4">
          {CARDS.map(({ planKey, titleKey, descKey }) => (
            <div
              key={planKey}
              className="rounded-2xl border border-line bg-white p-6 shadow-sg-lg transition-shadow hover:shadow-sg-md"
            >
              <p className="text-sm font-semibold text-accent-strong">
                {tPricing(planKey)}
              </p>
              <h3 className="mt-1.5 text-lg font-bold text-ink">
                {t(titleKey)}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
