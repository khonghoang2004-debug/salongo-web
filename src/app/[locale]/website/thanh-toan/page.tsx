import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Lock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";
import { HostingCheckout } from "@/components/website/HostingCheckout";
import { HOSTING_LINKS, HOSTING_PRICES, isHostingCycle, isHostingPlan } from "@/lib/hosting-plans";
import { formatKc } from "@/lib/website-offer";

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ plan?: string; cycle?: string }> };

/** Hosting checkout inside salongo.eu (Stripe Embedded Checkout). Never indexed. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "webHosting" });
  return { title: t("payTitle"), robots: { index: false, follow: false } };
}

export default async function HostingPayPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("webHosting");
  const plan = isHostingPlan(sp.plan) ? sp.plan : "pro";
  const cycle = isHostingCycle(sp.cycle) ? sp.cycle : "m";
  const fallbackUrl = `${HOSTING_LINKS[plan][cycle]}?locale=${locale}`;
  const name = plan === "pro" ? t("planPro") : t("planBasic");
  const price = locale === "en" || locale === "de" ? `${HOSTING_PRICES[plan][cycle].toLocaleString("cs-CZ")} CZK` : formatKc(HOSTING_PRICES[plan][cycle]);
  return (
    <PageShell>
      <section className="bg-white py-8 sm:py-12">
        <div className="x-wrap max-w-[64rem]">
          <Link href="/website#hosting" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-muted hover:text-ink">
            <ArrowLeft className="size-4" aria-hidden />
            {t("payBack")}
          </Link>
          <h1 className="mt-4 text-[1.6rem] font-semibold tracking-[-0.02em] text-ink sm:text-[2rem]">{name}</h1>
          <p className="mt-1 text-[15px] text-muted">
            {price} {cycle === "y" ? t("perYear") : t("perMonth")} · {cycle === "y" ? t("noteYearly") : t("noteMonthly")}
          </p>
          <div className="mt-4 inline-flex rounded-full bg-porcelain p-1 ring-1 ring-black/[0.06]">
            {(["m", "y"] as const).map((c) => (
              <Link
                key={c}
                href={`/website/thanh-toan?plan=${plan}&cycle=${c}`}
                replace
                aria-current={c === cycle ? "page" : undefined}
                className={`inline-flex min-h-9 items-center rounded-full px-4 text-[14px] font-semibold ${c === cycle ? "bg-white text-ink shadow-[0_2px_8px_-3px_rgba(0,0,0,0.25)]" : "text-muted"}`}
              >
                {c === "y" ? t("yearly") : t("monthly")}
                {c === "y" ? <span className="ml-1.5 rounded-full bg-emerald-600/10 px-2 py-0.5 text-[12px] text-emerald-700">{t("yearGift")}</span> : null}
              </Link>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[13.5px] text-muted">
            <Lock className="size-3.5" aria-hidden />
            {t("secure")}
          </p>
          <div className="mt-6 rounded-[22px] bg-white py-2 ring-1 ring-line">
            <HostingCheckout key={`${plan}-${cycle}`} plan={plan} cycle={cycle} locale={locale} fallbackUrl={fallbackUrl} errorText={t("payFallback")} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
