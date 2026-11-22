"use client";

import { useState } from "react";
import { Check, CreditCard, Sparkles } from "lucide-react";

export type HostingPlan = {
  key: string;
  name: string;
  forWhom: string;
  monthly: string;
  yearly: string;
  monthlyUrl: string;
  yearlyUrl: string;
  band: string;
  featured?: boolean;
  intro?: string;
  inc: string[];
};

type Labels = { monthly: string; yearly: string; perMonth: string; perYear: string; yearGift: string; recommended: string; cta: string; noteMonthly: string; noteYearly: string };

/** Hosting plan cards with a Month / Year switch (each button opens the matching Stripe Payment Link). */
export function HostingPlans({ plans, labels }: { plans: HostingPlan[]; labels: Labels }) {
  const [year, setYear] = useState(false);
  return (
    <>
      <div className="mt-7 inline-flex rounded-full bg-porcelain p-1 ring-1 ring-black/[0.06]" role="group">
        {[false, true].map((y) => (
          <button
            key={String(y)}
            type="button"
            aria-pressed={year === y}
            onClick={() => setYear(y)}
            className={`min-h-10 rounded-full px-5 text-[14.5px] font-semibold transition ${year === y ? "bg-white text-ink shadow-[0_2px_8px_-3px_rgba(0,0,0,0.25)]" : "text-muted"}`}
          >
            {y ? labels.yearly : labels.monthly}
            {y ? <span className="ml-1.5 rounded-full bg-emerald-600/10 px-2 py-0.5 text-[12px] text-emerald-700">{labels.yearGift}</span> : null}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:max-w-[58rem]">
        {plans.map((p) => (
          <article
            key={p.key}
            className={`relative overflow-hidden rounded-[22px] bg-white ring-1 shadow-[0_18px_40px_-28px_rgba(17,12,14,0.45)] ${p.featured ? "ring-[#b0284f]/40" : "ring-black/[0.07]"}`}
          >
            <div className="relative px-6 pb-6 pt-6 text-white" style={{ background: p.band }}>
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_38%)]" aria-hidden />
              {p.featured ? (
                <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[12px] font-semibold text-[#800020]">
                  <Sparkles className="size-3.5" aria-hidden />
                  {labels.recommended}
                </span>
              ) : null}
              <h3 className="relative pr-28 text-[1.35rem] font-semibold tracking-[-0.01em]">{p.name}</h3>
              <p className="relative mt-1 text-[14px] text-white/80">{p.forWhom}</p>
              <p className="relative mt-4 flex flex-wrap items-baseline gap-x-2">
                <span className="text-[2.1rem] font-extrabold leading-none tracking-[-0.02em]">{year ? p.yearly : p.monthly}</span>
                <span className="text-[14px] text-white/80">{year ? labels.perYear : labels.perMonth}</span>
              </p>
              <p className="relative mt-1.5 h-5 text-[13px] font-semibold text-white/90">{year ? labels.yearGift : ""}</p>
            </div>
            <div className="px-6 pb-6 pt-5">
              {p.intro ? <p className="mb-2.5 text-[13.5px] font-semibold text-muted">{p.intro}</p> : null}
              <ul className="space-y-2.5">
                {p.inc.map((k) => (
                  <li key={k} className="flex items-start gap-2.5 text-[15px] leading-snug text-ink/85">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-600/10 text-emerald-700">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden />
                    </span>
                    {k}
                  </li>
                ))}
              </ul>
              <a
                href={year ? p.yearlyUrl : p.monthlyUrl}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold text-white transition hover:brightness-110"
                style={{ background: p.band }}
              >
                <CreditCard className="size-4" aria-hidden />
                {labels.cta}
              </a>
              <p className="mt-2 text-center text-[12.5px] text-muted">{year ? labels.noteYearly : labels.noteMonthly}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
