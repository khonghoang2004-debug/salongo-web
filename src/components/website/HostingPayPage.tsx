import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Lock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/site/SiteNav";
import { HostingCheckout } from "@/components/website/HostingCheckout";
import { HOSTING_LINKS, HOSTING_PRICES, type HostingCycle, type HostingPlanKey } from "@/lib/hosting-plans";
import { formatKc } from "@/lib/website-offer";

export type HostingPayProps = { params: Promise<{ locale: string }> };

/** Short link the owner sends to a customer: /<locale>/hosting-<price> = that plan's payment page. */
export const hostingSlug = (plan: HostingPlanKey, cycle: HostingCycle) => `/hosting-${HOSTING_PRICES[plan][cycle]}`;

export async function hostingPayMetadata({ params }: HostingPayProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "webHosting" });
  return { title: t("payTitle"), robots: { index: false, follow: false } };
}

/**
 * Standalone hosting payment page (no site menu / footer / trial bar): only the plan, a month/year switch and the
 * Stripe Embedded Checkout. Falls back to the Payment Link when the Stripe keys are missing.
 */
export async function HostingPayPage({ params, plan, cycle }: HostingPayProps & { plan: HostingPlanKey; cycle: HostingCycle }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("webHosting");
  const fallbackUrl = `${HOSTING_LINKS[plan][cycle]}?locale=${locale}`;
  const name = plan === "pro" ? t("planPro") : t("planBasic");
  const n = HOSTING_PRICES[plan][cycle];
  const price = locale === "en" || locale === "de" ? `${n.toLocaleString("cs-CZ")} CZK` : formatKc(n);
  return (
    <main id="main" className="min-h-dvh bg-porcelain/40 py-6 sm:py-10">
      <div className="x-wrap max-w-[64rem]">
        <Logo />
        <div className="mt-6 rounded-[22px] bg-white p-5 ring-1 ring-line sm:p-7">
          <h1 className="text-[1.5rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.9rem]">{name}</h1>
          <p className="mt-1 text-[15px] text-muted">
            {price} {cycle === "y" ? t("perYear") : t("perMonth")} · {cycle === "y" ? t("noteYearly") : t("noteMonthly")}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="inline-flex rounded-full bg-porcelain p-1 ring-1 ring-black/[0.06]">
              {(["m", "y"] as const).map((c) => (
                <Link
                  key={c}
                  href={hostingSlug(plan, c)}
                  replace
                  aria-current={c === cycle ? "page" : undefined}
                  className={`inline-flex min-h-9 items-center rounded-full px-4 text-[14px] font-semibold ${c === cycle ? "bg-white text-ink shadow-[0_2px_8px_-3px_rgba(0,0,0,0.25)]" : "text-muted"}`}
                >
                  {c === "y" ? t("yearly") : t("monthly")}
                  {c === "y" ? <span className="ml-1.5 rounded-full bg-emerald-600/10 px-2 py-0.5 text-[12px] text-emerald-700">{t("yearGift")}</span> : null}
                </Link>
              ))}
            </div>
            <span className="flex items-center gap-1.5 text-[13.5px] text-muted">
              <Lock className="size-3.5" aria-hidden />
              {t("secure")}
            </span>
          </div>
          <div className="mt-6">
            <HostingCheckout key={`${plan}-${cycle}`} plan={plan} cycle={cycle} locale={locale} fallbackUrl={fallbackUrl} errorText={t("payFallback")} />
          </div>
        </div>
      </div>
    </main>
  );
}
