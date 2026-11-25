"use client";

import { useState } from "react";
import type { BillingCycle, PlanCode } from "@/lib/app-links";
import { money, withTotal } from "./format";

export type PlanRow = {
  code: PlanCode;
  name: string;
  fit: string;
  staff: string;
  branches: string;
  /** Email marketing per plan: Basic none, Pro 50 clients a day, Premium no limit (app: lib/marketing/plan-limit). */
  marketing: string;
  monthly: number;
  listMonthly: number | null;
  monthlyDiscountPct: number | null;
  yearly: number | null;
  highlighted: boolean;
  trialAria: string;
  renewAria: string;
  /** Link Gia hạn cho từng kỳ (tạo sẵn ở server bằng renewLink) */
  renewHref: Record<BillingCycle, string>;
};

export type PlanTableLabels = {
  cycle: string;
  month: string;
  year: string;
  yearBadge: string;
  perMonth: string;
  billedYearly: string;
  orYearly: string;
  monthOnly: string;
  popular: string;
  trial: string;
  renew: string;
};

/**
 * Ba gói salon dạng bảng giá treo ở tiệm: mỗi gói một dòng, phân cách bằng đường mảnh.
 * Nút Theo tháng / Theo năm đổi giá hiển thị và đổi luôn kỳ hạn trên link Gia hạn.
 */
export function PlanTable({ rows, labels, locale, signupHref }: { rows: PlanRow[]; labels: PlanTableLabels; locale: string; signupHref: string }) {
  const [cycle, setCycle] = useState<BillingCycle>("month");
  const anyYearly = rows.some((r) => r.yearly !== null);

  return (
    <div>
      {anyYearly && (
        <div role="radiogroup" aria-label={labels.cycle} className="inline-flex rounded-full border border-line bg-white p-1">
          {(["month", "year"] as const).map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={cycle === c}
              onClick={() => setCycle(c)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[15px] font-medium transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 ${
                cycle === c ? "bg-ink text-white" : "text-ink/70 hover:text-ink"
              }`}
            >
              {c === "month" ? labels.month : labels.year}
              {c === "year" && labels.yearBadge && (
                <span className={`rounded-full px-2 py-0.5 text-[12.5px] tabular-nums ${cycle === c ? "bg-white/15 text-white" : "bg-blush text-brand-800"}`}>
                  {labels.yearBadge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      <ul className="mt-8 border-t border-ink/80">
        {rows.map((r) => {
          const yearOn = cycle === "year" && r.yearly !== null;
          const shown = yearOn ? r.yearly! / 12 : r.monthly;
          const effectiveCycle: BillingCycle = yearOn ? "year" : "month";
          return (
            <li
              key={r.code}
              className="grid gap-x-8 gap-y-4 border-b border-line py-7 md:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-center lg:py-8 [&>*]:min-w-0"
            >
              <div className="md:col-start-1 md:row-start-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-[1.6rem] font-semibold tracking-[-0.025em] text-ink">{r.name}</h3>
                  {r.highlighted && <span className="rounded-full bg-blush px-2.5 py-0.5 text-[13px] font-medium text-brand-800">{labels.popular}</span>}
                </div>
                <p className="mt-1 text-[15px] text-muted">{r.fit}</p>
              </div>

              <p className="text-[15px] leading-relaxed text-ink/80 md:col-start-1 md:row-start-2 lg:col-start-2 lg:row-start-1">
                {r.staff}
                <br />
                {r.branches}
                <br />
                {r.marketing}
              </p>

              <div className="md:col-start-2 md:row-span-2 md:row-start-1 md:text-right lg:col-start-3 lg:row-span-1 lg:text-left" aria-live="polite">
                <p className="flex flex-wrap items-baseline gap-x-2 md:justify-end lg:justify-start">
                  {!yearOn && r.listMonthly !== null && <s className="text-[1.05rem] tabular-nums text-muted">{money(locale, r.listMonthly)}</s>}
                  <span className="text-[2.4rem] font-semibold leading-none tracking-[-0.04em] text-ink tabular-nums">{money(locale, shown, yearOn ? 0 : 2)}</span>
                  <span className="text-[14px] text-muted">{labels.perMonth}</span>
                  {!yearOn && r.monthlyDiscountPct !== null && (
                    <span className="rounded-full bg-blush px-2 py-0.5 text-[12.5px] tabular-nums text-brand-800">−{r.monthlyDiscountPct}%</span>
                  )}
                </p>
                <p className="mt-2 text-[14px] tabular-nums text-muted">
                  {yearOn
                    ? withTotal(labels.billedYearly, money(locale, r.yearly!))
                    : r.yearly !== null
                      ? withTotal(labels.orYearly, money(locale, r.yearly))
                      : labels.monthOnly}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-2 md:row-start-3 lg:col-span-1 lg:col-start-4 lg:row-start-1 lg:justify-end">
                <a href={signupHref} aria-label={r.trialAria} className={`${r.highlighted ? "x-btn-primary" : "x-btn-light"} min-w-[9.5rem] flex-1 sm:flex-none`}>
                  {labels.trial}
                </a>
                <a href={r.renewHref[effectiveCycle]} aria-label={r.renewAria} className="x-link min-h-11">
                  {labels.renew}
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
