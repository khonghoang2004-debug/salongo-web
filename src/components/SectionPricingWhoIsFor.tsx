import { getTranslations } from "next-intl/server";

const CARDS = [
  { planKey: "plan1Name", titleKey: "whoBasic", descKey: "whoBasicDesc" },
  { planKey: "plan2Name", titleKey: "whoPro", descKey: "whoProDesc" },
  { planKey: "plan3Name", titleKey: "whoPremium", descKey: "whoPremiumDesc" },
] as const;

export async function SectionPricingWhoIsFor() {
  const t = await getTranslations("pricingPage");
  const tPricing = await getTranslations("pricing");

  return (
    <section className="sg-section">
      <div className="sg-container">
        <h2 className="sg-h2">{t("whoTitle")}</h2>
        <div data-stagger className="mt-12 grid border-t border-line md:grid-cols-3 md:divide-x md:divide-line">
          {CARDS.map(({ planKey, titleKey, descKey }) => (
            <div key={planKey} className="border-b border-line py-8 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0 lg:px-8">
              <p className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">{tPricing(planKey)}</p>
              <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-ink">{t(titleKey)}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
