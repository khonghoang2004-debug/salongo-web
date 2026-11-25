import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_FACEBOOK,
  CONTACT_PHONE,
  CONTACT_WHATSAPP,
} from "@/lib/contact";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";
import { KasaBuyForm } from "@/components/kasa/KasaBuyForm";
import { KASA_BANK, kasaBankReady, kasaCardReady, kasaPrice } from "@/lib/kasa";

type Props = { params: Promise<{ locale: string }> };

const TEXT_KEYS = [
  "ico",
  "icoPlaceholder",
  "lookup",
  "looking",
  "found",
  "invalid",
  "notFound",
  "unavailable",
  "company",
  "address",
  "email",
  "pay",
  "card",
  "bank",
  "next",
  "fillFirst",
  "soon",
  "secure",
  "edit",
  "account",
  "iban",
  "amount",
  "vs",
  "message",
  "bankNote",
  "fallback",
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
  const text = Object.fromEntries(TEXT_KEYS.map((k) => [k, t(k)])) as Record<
    (typeof TEXT_KEYS)[number],
    string
  >;
  const linkCls =
    "font-medium text-brand-700 underline decoration-brand-700/30 underline-offset-4 hover:decoration-brand-700";
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
          <Link
            href="/kasa"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-muted hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t("back")}
          </Link>
          <h1 className="mt-4 text-[1.6rem] font-semibold tracking-[-0.02em] text-ink sm:text-[2rem]">
            {t("title")}
          </h1>
          <p className="mt-1 text-[15px] tabular-nums text-muted">
            {t("summary", { price })}
          </p>
          {/* Owner 2026-11-25: until card / bank payment is set up, buying goes through a call or message. */}
          {!kasaCardReady() && !kasaBankReady() ? (
            <div className="mt-6 rounded-[22px] bg-white p-5 ring-1 ring-line sm:p-7">
              <p className="text-[16px] leading-relaxed text-ink">
                {t("contactLead")}
              </p>
              <ul className="mt-5 grid grid-cols-3 gap-2.5">
                {[
                  {
                    href: `tel:${CONTACT_PHONE.replace(/\s/g, "")}`,
                    label: `${t("contactCall")} ${CONTACT_PHONE}`,
                    icon: <Phone className="size-4" aria-hidden />,
                    primary: true,
                  },
                  {
                    href: CONTACT_WHATSAPP,
                    label: t("contactWhatsapp"),
                    icon: null,
                    external: true,
                  },
                  {
                    href: CONTACT_FACEBOOK,
                    label: t("contactFacebook"),
                    icon: null,
                    external: true,
                  },
                  {
                    href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("SalonGo Kasa")}`,
                    label: t("contactEmail"),
                    icon: <Mail className="size-4" aria-hidden />,
                  },
                ].map((c) => (
                  <li key={c.href} className={c.primary ? "col-span-3" : undefined}>
                    <a
                      href={c.href}
                      {...(c.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={`${c.primary ? "x-btn-primary" : "x-btn-light"} !min-h-[52px] w-full !justify-center gap-2 text-[15px]`}
                    >
                      {c.icon}
                      <span className="truncate">{c.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[14px] text-muted">
                {CONTACT_EMAIL} · {t("hours")}
              </p>
            </div>
          ) : (
            <div className="mt-6 rounded-[22px] bg-white p-5 ring-1 ring-line sm:p-7">
              <KasaBuyForm
                text={text}
                consent={consent}
                locale={locale}
                price={price}
                cardReady={kasaCardReady()}
                bank={
                  kasaBankReady()
                    ? { account: KASA_BANK.account, iban: KASA_BANK.iban }
                    : null
                }
              />
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
