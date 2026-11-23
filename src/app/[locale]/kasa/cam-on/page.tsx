import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";

type Props = { params: Promise<{ locale: string }> };

/** Return page after Stripe Embedded Checkout for Kasa. Never indexed; the licence key goes out by e-mail. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kasa.meta" });
  return { title: t("thanksTitle"), robots: { index: false, follow: false } };
}

export default async function KasaThanksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("kasa.thanks");
  return (
    <PageShell cta={false}>
      <section className="bg-white py-10 sm:py-16">
        <div className="x-wrap max-w-[36rem] text-center">
          <CheckCircle2 className="mx-auto size-14 text-emerald-600" aria-hidden />
          <h1 className="mt-5 text-[1.75rem] font-semibold tracking-[-0.02em] text-ink sm:text-[2.25rem]">{t("title")}</h1>
          <p className="mt-3 text-[16px] leading-relaxed text-muted">{t("lead")}</p>
          <Link href="/kasa/download" className="x-btn-primary mt-8 inline-flex !min-h-12 !px-7">
            {t("download")}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
