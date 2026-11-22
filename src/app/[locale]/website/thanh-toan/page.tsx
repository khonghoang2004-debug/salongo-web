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
          <p className="mt-2 flex items-center gap-1.5 text-[13.5px] text-muted">
            <Lock className="size-3.5" aria-hidden />
            {t("secure")}
          </p>
          <div className="mt-6 rounded-[22px] bg-white py-2 ring-1 ring-line">
            <HostingCheckout plan={plan} cycle={cycle} locale={locale} fallbackUrl={fallbackUrl} errorText={t("payFallback")} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
