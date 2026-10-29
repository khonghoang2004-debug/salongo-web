import { getTranslations } from "next-intl/server";
import { PricingCards, type PlanCard } from "./PricingCards";

// Khớp với các gói đang bán trong app (SubscriptionPlan, đối chiếu 29/10/2026): giá niêm yết / tháng,
// nhân viên mỗi chi nhánh (maxStaff) và số chi nhánh (limitsJson.maxLocations); null = không giới hạn.
// Mọi gói đều có toàn bộ tính năng; trả theo năm giảm 10%. Giá thật luôn do app tính khi thanh toán.
const PLANS = [
  { code: "BASIC", nameKey: "plan1Name", subtitleKey: "plan1Subtitle", staff: 3, branches: 1, monthly: 199, highlighted: false },
  { code: "PRO", nameKey: "plan2Name", subtitleKey: "plan2Subtitle", staff: 8, branches: 3, monthly: 499, highlighted: true },
  { code: "PREMIUM", nameKey: "plan3Name", subtitleKey: "plan3Subtitle", staff: null, branches: null, monthly: 799, highlighted: false },
] as const;

const COMMON = ["allFeature1", "allFeature2", "allFeature3", "allFeature4"] as const;

export async function Pricing() {
  const t = await getTranslations("pricing");
  const tPage = await getTranslations("pricingPage");

  const plans: PlanCard[] = PLANS.map((p) => ({
    code: p.code,
    name: t(p.nameKey),
    subtitle: t(p.subtitleKey),
    monthly: p.monthly,
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
            yearlyBadge: "-10%",
            perMonth: t("perMonth"),
            perYear: tPage.raw("perYear") as string,
            billedYearly: tPage.raw("billedYearly") as string,
            popular: tPage("popularMost"),
            trialCta: tPage("cardTrialCta"),
            renewCta: tPage.raw("cardRenewCta") as string,
            common: COMMON.map((k) => tPage(k)),
          }}
        />
        <p className="mx-auto mt-6 max-w-[1080px] text-center text-sm text-muted">{tPage("plansNote")}</p>
      </div>
    </section>
  );
}
