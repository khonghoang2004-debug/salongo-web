import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";
import { KasaBuyForm } from "@/components/kasa/KasaBuyForm";
import { KASA_BANK, kasaBankReady, kasaCardReady, kasaPrice } from "@/lib/kasa";

type Props = { params: Promise<{ locale: string }> };

const TEXT_KEYS = [
  "ico", "icoPlaceholder", "lookup", "looking", "found", "invalid", "notFound", "unavailable", "company", "address", "email",
  "pay", "card", "bank", "next", "fillFirst", "soon", "secure", "edit", "account", "iban", "amount", "vs", "message",
  "bankNote", "fallback",
] as const;

/** Kasa buy page (IČO + ARES, e-mail, consent → card or bank transfer). Never indexed. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kasa.meta" });
  return { title: t("buyTitle"), robots: { index: false, follow: false } };
}

export default async function KasaBuyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("kasa.buy");
  const price = kasaPrice(locale);
  const text = Object.fromEntries(TEXT_KEYS.map((k) => [k, t(k)])) as Record<(typeof TEXT_KEYS)[number], string>;
  const linkCls = "font-medium text-brand-700 underline decoration-brand-700/30 underline-offset-4 hover:decoration-brand-700";
  const consent = t.rich("consent", {
    terms: (c) => (
      <Link href="/terms" target="_blank" className={linkCls}>
        {c}
      </Link>
    ),
    privacy: (c) => (
      <Link href="/privacy" target="_blank" className={linkCls}>
        {c}
      </Link>
    ),
  });
  return (
    <PageShell cta={false}>
      <section className="bg-white py-8 sm:py-12">
        <div className="x-wrap max-w-[44rem]">
          <Link href="/kasa" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-muted hover:text-ink">
            <ArrowLeft className="size-4" aria-hidden />
            {t("back")}
          </Link>
          <h1 className="mt-4 text-[1.6rem] font-semibold tracking-[-0.02em] text-ink sm:text-[2rem]">{t("title")}</h1>
          <p className="mt-1 text-[15px] tabular-nums text-muted">{t("summary", { price })}</p>
          <div className="mt-6 rounded-[22px] bg-white p-5 ring-1 ring-line sm:p-7">
            <KasaBuyForm
              text={text}
              consent={consent}
              locale={locale}
              price={price}
              cardReady={kasaCardReady()}
              bank={kasaBankReady() ? { account: KASA_BANK.account, iban: KASA_BANK.iban } : null}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
