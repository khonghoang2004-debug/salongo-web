import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";

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
      className="sg-section bg-white pt-2 sm:pt-4 lg:pt-6"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch lg:gap-5">
          {planKeys.map((plan) => {
            const hi = plan.highlighted;
            return (
              <div
                key={plan.nameKey}
                className={`relative flex h-full flex-col rounded-[1.25rem] p-6 transition-all duration-300 sm:p-7 ${
                  hi
                    ? "sg-dark shadow-sg-xl lg:-my-3 lg:py-10"
                    : "sg-card sg-card-hover"
                }`}
              >
                {hi && (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white ring-1 ring-white/20">
                    {tPage("popularMost")}
                  </span>
                )}

                <h3 className={`font-display text-xl font-bold ${hi ? "text-white" : "text-ink"}`}>{t(plan.nameKey)}</h3>
                <p className={`mt-2 min-h-[2.5rem] text-sm ${hi ? "text-white/70" : "text-muted"}`}>{t(plan.subtitleKey)}</p>

                <div className={`mt-6 border-b pb-6 ${hi ? "border-white/15" : "border-line"}`}>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`font-display text-4xl font-extrabold tracking-[-0.03em] lg:text-[2.75rem] ${hi ? "text-white" : "text-ink"}`}>
                      {plan.price}
                    </span>
                    <span className={hi ? "text-white/70" : "text-muted"}>{t("perMonth")}</span>
                  </div>
                  {plan.originalPrice && (
                    <p className={`mt-1 text-sm line-through ${hi ? "text-white/45" : "text-[#a49a9d]"}`}>
                      {plan.originalPrice} CZK
                    </p>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.featureKeys.map((key) => (
                    <li key={key} className={`flex items-start gap-2.5 text-sm ${hi ? "text-white/90" : "text-ink/80"}`}>
                      <span
                        className={`mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full ${
                          hi ? "bg-white/15 text-white" : "bg-brand-50 text-brand-700"
                        }`}
                        aria-hidden
                      >
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {tPage(key)}
                    </li>
                  ))}
                </ul>

                <a
                  href={`${APP_URL}/signup`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 w-full py-3.5 text-sm ${hi ? "btn-on-gradient" : "btn-secondary"}`}
                >
                  {t("upgrade")}
                </a>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          {t("footer")}
        </p>
      </div>
    </section>
  );
}
