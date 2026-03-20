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
      className="border-t border-neutral-100 bg-white px-4 pt-6 pb-10 sm:px-6 sm:pt-8 sm:pb-12 lg:px-8 lg:pt-10 lg:pb-14"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch lg:gap-5">
          {planKeys.map((plan) => (
            <div
              key={plan.nameKey}
              className={`relative flex h-full flex-col rounded-2xl border bg-white transition-all duration-300 hover:shadow-lg ${
                plan.highlighted
                  ? "scale-[1.02] border-transparent p-[10px] shadow-[0_8px 30px_rgba(168,85,247,0.15)] lg:scale-[1.03]"
                  : "border-neutral-200/80 p-6 shadow-[0_4px 20px_rgba(0,0,0,0.06)]"
              }`}
              style={
                plan.highlighted
                  ? {
                      background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,231,243,0.15) 50%, rgba(250,240,255,0.2) 100%)",
                      border: "1px solid transparent",
                      boxShadow: "0 0 0 1.5px rgba(236,72,153,0.25), 0 12px 40px rgba(168,85,247,0.18)",
                    }
                  : undefined
              }
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-md"
                    style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
                  >
                    {tPage("popularMost")}
                  </span>
                </div>
              )}

              <div
                className={`flex flex-1 flex-col rounded-2xl bg-white ${plan.highlighted ? "p-6" : ""}`}
                style={plan.highlighted ? { borderRadius: 14 } : undefined}
              >
                <h3 className="text-xl font-bold text-[#1F2937]">
                  {t(plan.nameKey)}
                </h3>
                <p className="mt-2 text-sm text-[#6B7280]">{t(plan.subtitleKey)}</p>

                <div className="mt-6">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold tracking-tight text-[#1F2937] lg:text-4xl">
                      {plan.price}
                    </span>
                    <span className="text-[#6B7280]">{t("perMonth")}</span>
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
                className={`mt-6 flex w-full items-center justify-center rounded-xl py-3.5 text-center text-sm font-semibold transition-all duration-300 hover:brightness-105 active:scale-[0.98] ${
                  plan.highlighted
                    ? "bg-[linear-gradient(135deg,#EC4899,#A855F7)] text-white shadow-md"
                    : "border border-pink-200/80 bg-pink-50/80 text-[#831843]"
                }`}
              >
                {t("upgrade")}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-[#6B7280]">
          {t("footer")}
        </p>
      </div>
    </section>
  );
}
