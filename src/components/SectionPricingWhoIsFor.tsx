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
    <section className="border-t border-neutral-100 bg-white px-4 pt-6 pb-8 sm:px-6 sm:pt-8 sm:pb-10 lg:px-8 lg:pt-10 lg:pb-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl">
          {t("whoTitle")}
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4">
          {CARDS.map(({ planKey, titleKey, descKey }) => (
            <div
              key={planKey}
              className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-lg"
            >
              <p className="text-sm font-semibold text-[#EC4899]">
                {tPricing(planKey)}
              </p>
              <h3 className="mt-1.5 text-lg font-bold text-[#1F2937]">
                {t(titleKey)}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
