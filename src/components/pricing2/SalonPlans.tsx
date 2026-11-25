import { getLocale, getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SIGNUP_URL, appLink, renewLink } from "@/lib/app-links";
import { maxYearlyDiscount, type SitePlans } from "@/lib/plans";
import { PlanTable, type PlanRow } from "./PlanTable";
import { money } from "./format";

export const PLAN_NAMES = { BASIC: "Basic", PRO: "Pro", PREMIUM: "Premium" } as const;

/** Ba gói salon (giá từ app qua getPlans) + một dòng "gói nào cũng có". */
export async function SalonPlans({ data }: { data: SitePlans }) {
  const t = await getTranslations("pricing2.plans");
  const locale = await getLocale();
  const discount = maxYearlyDiscount(data);

  const rows: PlanRow[] = data.plans.map((p) => {
    const name = PLAN_NAMES[p.code];
    return {
      code: p.code,
      name,
      fit: t(`fit${p.code}`),
      staff: p.staff === null ? t("staffAll") : t("staff", { n: p.staff }),
      branches: p.branches === null ? t("branchesAll") : t("branches", { n: p.branches }),
      marketing: t(`marketing${p.code}`),
      monthly: p.monthly,
      listMonthly: p.listMonthly,
      monthlyDiscountPct: p.monthlyDiscountPct,
      yearly: p.yearly,
      highlighted: p.highlighted,
      trialAria: t("trialAria", { plan: name }),
      renewAria: t("renewAria", { plan: name }),
      renewHref: { month: renewLink(locale, p.code, "month"), year: renewLink(locale, p.code, "year") },
    };
  });

  return (
    <section id="salon" className="x-section scroll-mt-20 bg-porcelain" aria-labelledby="salon-title">
      <div className="x-wrap">
        <h2 id="salon-title" className="x-h2 max-w-[40rem] text-ink">{t("title")}</h2>
        <p className="x-lead mt-4">{t("lead")}</p>
        <div className="mt-7">
          <PlanTable
            rows={rows}
            locale={locale}
            signupHref={appLink(SIGNUP_URL, locale)}
            labels={{
              cycle: t("cycle"),
              month: t("month"),
              year: t("year"),
              yearBadge: discount ? `−${money(locale, discount)}%` : "",
              perMonth: t("perMonth"),
              billedYearly: t.raw("billedYearly") as string,
              orYearly: t.raw("orYearly") as string,
              monthOnly: t("monthOnly"),
              popular: t("popular"),
              trial: t("trial"),
              renew: t("renew"),
            }}
          />
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-12">
          <h3 className="text-[15px] font-semibold text-ink lg:col-span-3">{t("includedTitle")}</h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-2.5 lg:col-span-9">
            {(t.raw("included") as string[]).map((f) => (
              <li key={f} className="flex items-center gap-2 text-[15px] text-ink/80">
                <Check className="size-4 shrink-0 text-brand-700" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 text-[14px] text-muted">
          {t("note")}{" "}
          <Link href="/terms" className="underline decoration-ink/20 underline-offset-4 hover:text-ink">
            {t("terms")}
          </Link>
        </p>
      </div>
    </section>
  );
}
