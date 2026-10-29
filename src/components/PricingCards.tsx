"use client";

import { useState } from "react";
import { ArrowUpRight, Check, RefreshCw, Store, Users } from "lucide-react";
import { SIGNUP_URL, renewUrl, type PlanCode } from "@/lib/app-links";

export type PlanCard = {
  code: PlanCode;
  name: string;
  subtitle: string;
  /** Giá niêm yết / tháng (CZK), khớp SubscriptionPlan.priceMonthly trong app */
  monthly: number;
  staffLabel: string;
  branchLabel: string;
  highlighted: boolean;
};

export type PricingLabels = {
  monthly: string;
  yearly: string;
  yearlyBadge: string;
  perMonth: string;
  perYear: string;
  billedYearly: string;
  popular: string;
  trialCta: string;
  renewCta: string;
  common: string[];
};

// Trả theo năm giảm 10% (BillingDiscountCycle 1 năm, mọi gói) — làm tròn như màn Nâng cấp gói trong app
const YEARLY_DISCOUNT = 10;
const fmt = (n: number) => new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 }).format(Math.round(n));

export function PricingCards({ plans, labels }: { plans: PlanCard[]; labels: PricingLabels }) {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-line bg-white p-1" role="radiogroup" aria-label={labels.yearly}>
          {[false, true].map((y) => (
            <button
              key={String(y)}
              type="button"
              role="radio"
              aria-checked={yearly === y}
              onClick={() => setYearly(y)}
              className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors sm:px-5 ${
                yearly === y ? "bg-brand-700 text-white" : "text-muted hover:text-ink"
              }`}
            >
              {y ? labels.yearly : labels.monthly}
              {y && (
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${yearly ? "bg-white/20 text-white" : "bg-brand-50 text-brand-700"}`}>
                  {labels.yearlyBadge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div data-stagger className="mx-auto mt-8 grid max-w-[1080px] gap-4 md:grid-cols-3 md:items-stretch lg:gap-5">
        {plans.map((plan) => {
          const hi = plan.highlighted;
          const perMonth = yearly ? plan.monthly * (1 - YEARLY_DISCOUNT / 100) : plan.monthly;
          const perYear = plan.monthly * 12 * (1 - YEARLY_DISCOUNT / 100);
          return (
            <div
              key={plan.code}
              className={`relative flex h-full flex-col rounded-[24px] p-6 sm:p-7 ${
                hi ? "sg-dark" : "border border-line bg-white transition-colors duration-300 hover:border-brand-300"
              }`}
            >
              {hi && (
                <span className="absolute right-5 top-5 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white ring-1 ring-white/20">
                  {labels.popular}
                </span>
              )}
              <h3 className={`font-display text-xl font-semibold ${hi ? "text-white" : "text-ink"}`}>{plan.name}</h3>
              <p className={`mt-2 text-sm ${hi ? "text-white/70" : "text-muted"}`}>{plan.subtitle}</p>

              <div className={`mt-6 border-b pb-6 ${hi ? "border-white/15" : "border-line"}`}>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className={`font-display text-[2.75rem] font-semibold tracking-[-0.04em] lg:text-[3.25rem] ${hi ? "text-white" : "text-ink"}`}>
                    {fmt(perMonth)}
                  </span>
                  <span className={hi ? "text-white/70" : "text-muted"}>{labels.perMonth}</span>
                </div>
                <p className={`mt-1 flex min-h-5 flex-wrap items-center gap-x-2 text-sm ${hi ? "text-white/65" : "text-[#8a7f82]"}`}>
                  {yearly ? (
                    <>
                      <span className="line-through">{fmt(plan.monthly)} CZK</span>
                      <span>· {labels.billedYearly.replace("{total}", fmt(perYear))}</span>
                    </>
                  ) : (
                    <span>{labels.perYear.replace("{total}", fmt(perYear))}</span>
                  )}
                </p>
              </div>

              <div className={`mt-6 space-y-2.5 text-[15px] font-semibold ${hi ? "text-white" : "text-ink"}`}>
                <p className="flex items-center gap-2.5">
                  <Users className={`size-[18px] shrink-0 ${hi ? "text-white" : "text-brand-700"}`} aria-hidden />
                  {plan.staffLabel}
                </p>
                <p className="flex items-center gap-2.5">
                  <Store className={`size-[18px] shrink-0 ${hi ? "text-white" : "text-brand-700"}`} aria-hidden />
                  {plan.branchLabel}
                </p>
              </div>

              <ul className={`mt-5 flex-1 space-y-3 border-t pt-5 ${hi ? "border-white/15" : "border-line"}`}>
                {labels.common.map((text) => (
                  <li key={text} className={`flex items-start gap-2.5 text-sm ${hi ? "text-white/90" : "text-ink/80"}`}>
                    <span
                      className={`mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full ${
                        hi ? "bg-white/15 text-white" : "bg-brand-50 text-brand-700"
                      }`}
                      aria-hidden
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid gap-2">
                <a
                  href={SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 text-sm ${hi ? "btn-on-gradient" : "btn-primary"}`}
                >
                  {labels.trialCta}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
                <a
                  href={renewUrl(plan.code, yearly ? "year" : "month")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors ${
                    hi ? "text-white/90 hover:bg-white/10" : "text-brand-700 hover:bg-brand-50"
                  }`}
                >
                  <RefreshCw className="size-4" aria-hidden />
                  {labels.renewCta.replace("{plan}", plan.name)}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
