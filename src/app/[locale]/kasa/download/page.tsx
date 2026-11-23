import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { KeyRound } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";
import { AppleIcon, WindowsIcon } from "@/components/site/BrandIcons";
import { KASA_DOWNLOAD } from "@/lib/kasa";

type Props = { params: Promise<{ locale: string }> };

/** Kasa installers for licence holders. Not indexed (the product page /kasa is the one to find). */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kasa.meta" });
  return { title: t("downloadTitle"), robots: { index: false, follow: true } };
}

export default async function KasaDownloadPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("kasa.download");
  const btn = "flex min-h-[72px] items-center gap-4 rounded-2xl border border-line bg-white px-5 text-left transition-colors hover:border-brand-700";
  return (
    <PageShell cta={false}>
      <section className="bg-white py-10 sm:py-14">
        <div className="x-wrap max-w-[44rem]">
          <h1 className="text-[1.9rem] font-semibold tracking-[-0.025em] text-ink sm:text-[2.5rem]">{t("title")}</h1>
          <p className="mt-2 text-[16px] text-muted">{t("lead")}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a href={KASA_DOWNLOAD.mac} className={btn}>
              <AppleIcon className="size-7 shrink-0 text-ink" />
              <span>
                <span className="block text-[16px] font-semibold text-ink">{t("mac")}</span>
                <span className="block text-[13.5px] text-muted">{t("macFile")}</span>
              </span>
            </a>
            <a href={KASA_DOWNLOAD.win} className={btn}>
              <WindowsIcon className="size-6 shrink-0 text-ink" />
              <span>
                <span className="block text-[16px] font-semibold text-ink">{t("win")}</span>
                <span className="block text-[13.5px] text-muted">{t("winFile")}</span>
              </span>
            </a>
          </div>

          <p className="mt-5 flex items-center gap-2 rounded-2xl bg-[#F8EEF1] px-4 py-3 text-[15px] text-brand-800">
            <KeyRound className="size-4 shrink-0" aria-hidden />
            {t("key")}
          </p>

          <h2 className="mt-10 text-[1.15rem] font-semibold tracking-[-0.015em] text-ink">{t("steps")}</h2>
          <ol className="mt-3 border-t border-ink/80">
            {(["s1", "s2", "s3"] as const).map((k, i) => (
              <li key={k} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 border-b border-line py-4">
                <span className="text-[1.3rem] font-semibold leading-none tracking-[-0.03em] text-ink/25 tabular-nums" aria-hidden>
                  {i + 1}
                </span>
                <p className="text-[15.5px] leading-snug text-ink">{t(k)}</p>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-[15px] text-muted">
            {t("noKey")}{" "}
            <Link href="/kasa/thanh-toan" className="x-link">
              {t("buy")}
            </Link>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
