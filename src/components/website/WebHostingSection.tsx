import { getLocale, getTranslations } from "next-intl/server";
import { Lock } from "lucide-react";
import { WEBSITE_PRICE_KC, formatKc } from "@/lib/website-offer";
import { HostingPlans, type HostingPlan } from "./HostingPlans";

/**
 * "Hosting & bảo trì" on /website (PREVIEW, owner prices 2026-11-22): monthly / yearly hosting paid by card through
 * Stripe Payment Links (auto-renew, cancel any time, paused after 14 unpaid days; success page /website/cam-on).
 */
const PRICES = { basic: { m: 299, y: 2999 }, pro: { m: 999, y: 9999 } };
const LINKS = {
  basic: { m: "https://buy.stripe.com/5kQ28j23m6594qKbRw8k803", y: "https://buy.stripe.com/00wcMX4bu8dh1eyg7M8k805" },
  pro: { m: "https://buy.stripe.com/bJefZ9eQ8eBF5oaNs8k801", y: "https://buy.stripe.com/3cIdR123mdxB4qKg7M8k802" },
};
/** Stripe Customer Portal (billing.stripe.com/p/login/…); empty until the owner sends it. */
const PORTAL_URL = "";
const BANDS = {
  basic: "linear-gradient(135deg,#1f2937 0%,#4b5563 50%,#9ca3af 100%)",
  pro: "linear-gradient(135deg,#3d0414 0%,#800020 55%,#b0284f 100%)",
};

export async function WebHostingSection() {
  const t = await getTranslations("webHosting");
  const locale = await getLocale();
  const money = (n: number) => (locale === "en" || locale === "de" ? `${n.toLocaleString("cs-CZ").replace(/\s/g, "\u00a0")} CZK` : formatKc(n));
  const faq = t.raw("faq") as { q: string; a: string }[];
  const link = (u: string) => `${u}?locale=${locale}`;
  const base = [t("inc.domain"), t("inc.hosting"), t("inc.ssl"), t("inc.backup")];
  const plans: HostingPlan[] = [
    { key: "basic", name: t("planBasic"), forWhom: t("forBasic"), monthly: money(PRICES.basic.m), yearly: money(PRICES.basic.y), monthlyUrl: link(LINKS.basic.m), yearlyUrl: link(LINKS.basic.y), band: BANDS.basic, inc: base },
    {
      key: "pro",
      name: t("planPro"),
      forWhom: t("forPro"),
      monthly: money(PRICES.pro.m),
      yearly: money(PRICES.pro.y),
      monthlyUrl: link(LINKS.pro.m),
      yearlyUrl: link(LINKS.pro.y),
      band: BANDS.pro,
      featured: true,
      intro: t("everythingIn"),
      inc: [t("inc.edits"), t("inc.sameDay")],
    },
  ];
  const labels = {
    monthly: t("monthly"), yearly: t("yearly"), perMonth: t("perMonth"), perYear: t("perYear"), yearGift: t("yearGift"),
    recommended: t("recommended"), cta: t("cta"), noteMonthly: t("noteMonthly"), noteYearly: t("noteYearly"),
  };
  return (
    <section id="hosting" className="x-section scroll-mt-20 bg-white" aria-labelledby="hosting-title">
      <div className="x-wrap">
        <h2 id="hosting-title" className="x-h2 text-ink">{t("eyebrow")}</h2>
        <p className="mt-3 max-w-[38rem] text-[16px] leading-relaxed text-muted">{t("lead")}</p>

        <HostingPlans plans={plans} labels={labels} />

        <div className="mt-6 flex flex-col gap-2 text-[14px] text-muted lg:max-w-[58rem]">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Lock className="size-4 text-ink/60" aria-hidden />
            {t("secure")}{" "}
            {PORTAL_URL ? (
              <>
                <a href={PORTAL_URL} className="font-semibold text-brand-700 underline decoration-dotted underline-offset-4">{t("manage")}</a>
                <span className="hidden sm:inline">· {t("manageNote")}</span>
              </>
            ) : null}
          </span>
          <span>{t("buildFee", { price: formatKc(WEBSITE_PRICE_KC) })}</span>
        </div>

        <div className="mt-10 lg:max-w-[58rem]">
          <h3 className="text-[1.125rem] font-semibold text-ink">{t("faqTitle")}</h3>
          <div className="mt-3 divide-y divide-line rounded-2xl ring-1 ring-line">
            {faq.map((f) => (
              <details key={f.q} className="group px-5 py-4">
                <summary className="cursor-pointer list-none text-[15px] font-semibold text-ink">{f.q}</summary>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
