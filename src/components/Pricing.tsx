import { getTranslations } from "next-intl/server";

const APP_URL = "https://app.salongo.eu";

const planKeys = [
  {
    nameKey: "plan1Name",
    subtitleKey: "plan1Subtitle",
    featureKeys: ["plan1Feature1", "plan1Feature2", "plan1Feature3", "plan1Feature4"],
    originalPrice: "199",
    price: "159",
    highlighted: false,
  },
  {
    nameKey: "plan2Name",
    subtitleKey: "plan2Subtitle",
    featureKeys: ["plan2Feature1", "plan2Feature2", "plan2Feature3", "plan2Feature4", "plan2Feature5"],
    originalPrice: "399",
    price: "299",
    highlighted: true,
  },
  {
    nameKey: "plan3Name",
    subtitleKey: "plan3Subtitle",
    featureKeys: ["plan3Feature1", "plan3Feature2", "plan3Feature3", "plan3Feature4", "plan3Feature5"],
    originalPrice: "599",
    price: "419",
    highlighted: false,
  },
  {
    nameKey: "plan4Name",
    subtitleKey: "plan4Subtitle",
    featureKeys: ["plan4Feature1", "plan4Feature2", "plan4Feature4", "plan4Feature5"],
    originalPrice: "999",
    price: "599",
    highlighted: false,
  },
] as const;

export async function Pricing() {
  const t = await getTranslations("pricing");
  const tPage = await getTranslations("pricingPage");

  return (
    <section
      id="pricing"
      className="sg-section bg-white"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch lg:gap-5">
          {planKeys.map((plan) => (
            <div
              key={plan.nameKey}
              className={`relative flex h-full flex-col rounded-2xl border bg-white transition-all duration-300 hover:shadow-sg-md ${
                plan.highlighted
                  ? "sg-gradient-border scale-[1.02] p-[10px] shadow-sg-lg lg:scale-[1.03]"
                  : "border-neutral-200/80 p-6 shadow-sg-lg"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                  <span
                    className="sg-gradient inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-sg-md"
                  >
                    {tPage("popularMost")}
                  </span>
                </div>
              )}

              <div
                className={`flex flex-1 flex-col rounded-2xl bg-white ${plan.highlighted ? "p-6" : ""}`}
                style={plan.highlighted ? { borderRadius: 14 } : undefined}
              >
                <h3 className="text-xl font-bold text-ink">
                  {t(plan.nameKey)}
                </h3>
                <p className="mt-2 text-sm text-muted">{t(plan.subtitleKey)}</p>

                <div className="mt-6">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold tracking-tight text-ink lg:text-4xl">
                      {plan.price}
                    </span>
                    <span className="text-muted">{t("perMonth")}</span>
                  </div>
                  {plan.originalPrice && (
                    <p className="mt-1 text-sm text-neutral-400 line-through">
                      {plan.originalPrice} CZK
                    </p>
                  )}
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.featureKeys.map((key) => (
                    <li key={key} className="flex items-start gap-2 text-sm text-[#4B5563]">
                      <span className="mt-0.5 shrink-0 text-emerald-500">✓</span>
                      {tPage(key)}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`${APP_URL}/signup`}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 w-full py-3.5 text-sm ${plan.highlighted ? "btn-primary" : "btn-secondary"}`}
              >
                {t("upgrade")}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          {t("footer")}
        </p>
      </div>
    </section>
  );
}
