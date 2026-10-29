import { getTranslations } from "next-intl/server";
import { Check, Store, Users } from "lucide-react";

const APP_URL = "https://app.salongo.eu";

// Khớp với màn Nâng cấp gói trong app: giá/tháng, % giảm theo tháng, nhân viên mỗi chi nhánh, số chi nhánh.
// null = không giới hạn. Mọi gói đều có toàn bộ tính năng; trả theo năm giảm 10%.
const PLANS = [
  { nameKey: "plan1Name", subtitleKey: "plan1Subtitle", staff: 3, branches: 1, listPrice: 199, discount: 0, highlighted: false },
  { nameKey: "plan2Name", subtitleKey: "plan2Subtitle", staff: 8, branches: 3, listPrice: 499, discount: 0, highlighted: true },
  { nameKey: "plan3Name", subtitleKey: "plan3Subtitle", staff: null, branches: null, listPrice: 799, discount: 0, highlighted: false },
] as const;

const COMMON = ["allFeature1", "allFeature2", "allFeature3", "allFeature4"] as const;

export async function Pricing() {
  const t = await getTranslations("pricing");
  const tPage = await getTranslations("pricingPage");

  return (
    <section id="pricing" className="sg-section">
      <div className="sg-container">
        <div data-stagger className="mx-auto grid max-w-[1080px] gap-4 md:grid-cols-3 md:items-stretch lg:gap-5">
          {PLANS.map((plan) => {
            const hi = plan.highlighted;
            const price = Math.round(plan.listPrice * (1 - plan.discount / 100));
            return (
              <div
                key={plan.nameKey}
                className={`relative flex h-full flex-col rounded-[24px] p-6 sm:p-7 ${
                  hi ? "sg-dark" : "border border-line bg-white transition-colors duration-300 hover:border-brand-300"
                }`}
              >
                {hi && (
                  <span className="absolute right-5 top-5 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white ring-1 ring-white/20">
                    {tPage("popularMost")}
                  </span>
                )}

                <h3 className={`font-display text-xl font-semibold ${hi ? "text-white" : "text-ink"}`}>{t(plan.nameKey)}</h3>
                <p className={`mt-2 text-sm ${hi ? "text-white/70" : "text-muted"}`}>{t(plan.subtitleKey)}</p>

                <div className={`mt-6 border-b pb-6 ${hi ? "border-white/15" : "border-line"}`}>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className={`font-display text-[2.75rem] font-semibold tracking-[-0.04em] lg:text-[3.25rem] ${hi ? "text-white" : "text-ink"}`}>
                      {price}
                    </span>
                    <span className={hi ? "text-white/70" : "text-muted"}>{t("perMonth")}</span>
                  </div>
                  <p className={`mt-1 flex h-5 items-center gap-2 text-sm ${hi ? "text-white/60" : "text-[#a49a9d]"}`}>
                    {plan.discount > 0 && (
                      <>
                        <span className="line-through">{plan.listPrice} CZK</span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${hi ? "bg-white/15 text-white" : "bg-brand-50 text-brand-700"}`}>
                          -{plan.discount}%
                        </span>
                      </>
                    )}
                  </p>
                </div>

                <div className={`mt-6 space-y-2.5 text-[15px] font-semibold ${hi ? "text-white" : "text-ink"}`}>
                  <p className="flex items-center gap-2.5">
                    <Users className={`size-[18px] shrink-0 ${hi ? "text-white" : "text-brand-700"}`} aria-hidden />
                    {plan.staff ? tPage("staffLimit", { n: plan.staff }) : tPage("staffUnlimited")}
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Store className={`size-[18px] shrink-0 ${hi ? "text-white" : "text-brand-700"}`} aria-hidden />
                    {plan.branches ? tPage("branchLimit", { n: plan.branches }) : tPage("branchUnlimited")}
                  </p>
                </div>

                <ul className={`mt-5 flex-1 space-y-3 border-t pt-5 ${hi ? "border-white/15" : "border-line"}`}>
                  {COMMON.map((key) => (
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

        <p className="mx-auto mt-6 max-w-[1080px] text-center text-sm text-muted">{tPage("plansNote")}</p>
      </div>
    </section>
  );
}
