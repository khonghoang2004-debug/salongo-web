import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getPlans } from "@/lib/plans";
import { PLAN_KEYS } from "./Pricing";

const ROW_KEYS = [
  "compareRow1",
  "compareRow2",
  "compareRow4",
  "compareRow3",
  "compareRowMarketing",
  "compareRow5",
  "compareRow6",
  "compareRow8",
] as const;

export async function PricingComparisonTable() {
  const t = await getTranslations("pricingPage");
  const tPricing = await getTranslations("pricing");

  // Mọi gói đều có đủ tính năng; chỉ khác số nhân viên mỗi chi nhánh và số chi nhánh (2 dòng đầu, lấy từ app). null = không giới hạn
  const { plans } = await getPlans();
  const planNames = plans.map((p) => tPricing(PLAN_KEYS[p.code].nameKey));
  const LIMITS = [
    { key: "compareRowStaff", values: plans.map((p) => p.staff) },
    { key: "compareRowBranches", values: plans.map((p) => p.branches) },
  ] as const;
  const COLS = plans.map((_, i) => i);

  return (
    <section className="sg-section bg-nude">
      <div className="sg-container">
        <h2 className="sg-h2">{t("compareTitle")}</h2>
        <p className="sg-lead mt-4 max-w-2xl">{t("compareLead")}</p>

        <div data-reveal className="mt-10 overflow-hidden rounded-[22px] border border-line bg-white">
          <table className="w-full border-collapse text-left text-[13px] sm:text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="px-3 py-4 font-semibold text-muted sm:px-5 sm:py-5">{t("compareFeatureCol")}</th>
                {planNames.map((name) => (
                  <th key={name} className="w-[22%] px-1 py-4 text-center font-semibold text-ink sm:px-4 sm:py-5">
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LIMITS.map((row) => (
                <tr key={row.key} className="border-b border-line bg-nude">
                  <td className="px-3 py-3.5 font-semibold text-ink sm:px-5 sm:py-4">{t(row.key)}</td>
                  {row.values.map((n, i) => (
                    <td key={i} className="px-1 py-3.5 text-center font-display text-base font-semibold text-brand-700 sm:px-4 sm:py-4 sm:text-xl">
                      {n ?? t("unlimited")}
                    </td>
                  ))}
                </tr>
              ))}
              {ROW_KEYS.map((rowKey) => (
                <tr key={rowKey} className="border-b border-line last:border-b-0">
                  <td className="px-3 py-3.5 font-medium text-ink/85 sm:px-5 sm:py-4">{t(rowKey)}</td>
                  {COLS.map((n) => (
                    <td key={n} className="px-1 py-3.5 text-center sm:px-4 sm:py-4">
                      <Check className="mx-auto size-[18px] text-brand-700" strokeWidth={2.5} aria-label="✓" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
