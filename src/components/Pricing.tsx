import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLegalPack } from "@/content/legal";
import { getPlans, maxYearlyDiscount } from "@/lib/plans";
import { PricingCards, type PlanCard } from "./PricingCards";

/** Nhãn của từng gói trên website (tên + mô tả ngắn); giá và giới hạn lấy từ app qua getPlans(). */
export const PLAN_KEYS = {
  BASIC: { nameKey: "plan1Name", subtitleKey: "plan1Subtitle" },
  PRO: { nameKey: "plan2Name", subtitleKey: "plan2Subtitle" },
  PREMIUM: { nameKey: "plan3Name", subtitleKey: "plan3Subtitle" },
} as const;

const COMMON = ["allFeature1", "allFeature2", "allFeature3", "allFeature4"] as const;

export async function Pricing() {
  const t = await getTranslations("pricing");
  const tPage = await getTranslations("pricingPage");
  const locale = await getLocale();
  const data = await getPlans();
  const discount = maxYearlyDiscount(data);

  const plans: PlanCard[] = data.plans.map((p) => ({
    code: p.code,
    name: t(PLAN_KEYS[p.code].nameKey),
    subtitle: t(PLAN_KEYS[p.code].subtitleKey),
    monthly: p.monthly,
    yearly: p.yearly,
    staffLabel: p.staff ? tPage("staffLimit", { n: p.staff }) : tPage("staffUnlimited"),
    branchLabel: p.branches ? tPage("branchLimit", { n: p.branches }) : tPage("branchUnlimited"),
    highlighted: p.highlighted,
  }));

  return (
    <section id="pricing" className="sg-section">
      <div className="sg-container">
        <PricingCards
          plans={plans}
          labels={{
            monthly: tPage("toggleMonth"),
            yearly: tPage("toggleYear"),
            yearlyBadge: discount ? `-${discount}%` : "",
            perMonth: t("perMonth"),
            perYear: tPage.raw("perYear") as string,
            billedYearly: tPage.raw("billedYearly") as string,
            popular: tPage("popularMost"),
            trialCta: tPage("cardTrialCta"),
            renewCta: tPage.raw("cardRenewCta") as string,
            common: COMMON.map((k) => tPage(k)),
          }}
        />
        <p className="mx-auto mt-6 max-w-[1080px] text-center text-sm text-muted">{tPage("plansNote", { days: data.trialDays, discount: discount ?? 0 })}{" "}
          <Link href="/terms" className="font-medium text-brand-700 hover:underline">
            {getLegalPack(locale).docs.terms.title}
          </Link>
        </p>
      </div>
    </section>
  );
}
