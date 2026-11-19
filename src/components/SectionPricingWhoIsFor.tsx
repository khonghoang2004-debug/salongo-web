import { getTranslations } from "next-intl/server";

const CARDS = [
  { planKey: "plan1Name", titleKey: "whoBasic", descKey: "whoBasicDesc" },
  { planKey: "plan2Name", titleKey: "whoPro", descKey: "whoProDesc" },
  { planKey: "plan3Name", titleKey: "whoPremium", descKey: "whoPremiumDesc" },
] as const;

export async function SectionPricingWhoIsFor() {
  const t = await getTranslations("pricingPage");
  const tPricing = await getTranslations("pricing");
  const tDesk = await getTranslations("desk");

  return (
    <section className="sg-section">
      <div className="sg-container">
        <h2 className="sg-h2">{t("whoTitle")}</h2>
        <div data-stagger className="mt-7 grid border-t lg:mt-12 border-line md:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {CARDS.map(({ planKey, titleKey, descKey }) => (
            <div key={planKey} className="border-b border-line py-8 md:px-6 md:odd:pl-0 lg:border-b-0 lg:px-6 lg:first:pl-0">
              <p className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">{tPricing(planKey)}</p>
              <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-ink">{t(titleKey)}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{t(descKey)}</p>
            </div>
          ))}
          {/* Người thuê bàn: gói riêng (Bàn), không phải gói salon */}
          <div className="border-b border-line py-8 md:px-6 lg:border-b-0 lg:px-6 lg:pr-0">
            <p className="inline-flex rounded-full bg-nude px-3 py-1 text-sm font-semibold text-ink">{tDesk("name")}</p>
            <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-ink">{t("whoDesk")}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{t("whoDeskDesc")}</p>
            <a href="#goi-ban" className="mt-3 inline-flex min-h-11 items-center text-[15px] font-semibold text-brand-700 hover:underline">
              {t("pickDeskCta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
