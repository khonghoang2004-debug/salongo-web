import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Download, Info, KeyRound } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";
import { AppleIcon, WindowsIcon } from "@/components/site/BrandIcons";
import { KASA_DOWNLOAD } from "@/lib/kasa";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ soon?: string }> };

/** Kasa installers (download is free, activation needs a licence code). Indexed: people search "SalonGo Kasa download". */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kasa" });
  return pageMetadata({ locale, path: "/kasa/download", title: t("meta.downloadTitle"), description: t("download.lead") });
}

export default async function KasaDownloadPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { soon } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("kasa.download");
  const d = await getTranslations("downloads");
  const g = await getTranslations("kasa.nav");
  const btn =
    "group flex min-h-[76px] items-center gap-4 rounded-2xl border border-line bg-white px-5 text-left transition-colors hover:border-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700";
  const items = [
    { href: KASA_DOWNLOAD.mac, icon: <AppleIcon className="size-7 shrink-0 text-ink" />, label: t("mac"), file: t("macFile") },
    { href: KASA_DOWNLOAD.macIntel, icon: <AppleIcon className="size-7 shrink-0 text-ink/60" />, label: t("macIntel"), file: t("macIntelFile") },
    { href: KASA_DOWNLOAD.win, icon: <WindowsIcon className="size-6 shrink-0 text-ink" />, label: t("win"), file: t("winFile") },
  ];
  return (
    <PageShell cta={false}>
      <section className="bg-white py-10 sm:py-14">
        <div className="x-wrap max-w-[44rem]">
          <h1 className="x-title !text-[clamp(2rem,1.5rem+2vw,3rem)] text-ink">{t("title")}</h1>
          <p className="mt-2 text-[16px] text-muted">{t("lead")}</p>

          {soon ? (
            <p role="status" className="mt-6 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[15px] text-amber-900">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                {t("soon")}{" "}
                <Link href="/lien-he" className="x-link">
                  {d("contact")}
                </Link>
              </span>
            </p>
          ) : null}

          <ul className="mt-8 grid gap-3">
            {items.map((it) => (
              <li key={it.href}>
                <a href={it.href} className={btn} rel="nofollow">
                  {it.icon}
                  <span className="min-w-0 flex-1">
                    <span className="block text-[16px] font-semibold text-ink">{it.label}</span>
                    <span className="block text-[13.5px] text-muted">{it.file}</span>
                  </span>
                  <Download className="size-4 shrink-0 text-ink/40 transition-colors group-hover:text-brand-700" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13.5px] text-muted">{t("which")}</p>

          <p className="mt-6 flex items-start gap-2 rounded-2xl bg-[#F8EEF1] px-4 py-3 text-[15px] text-brand-800">
            <KeyRound className="mt-0.5 size-4 shrink-0" aria-hidden />
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
          <Link href="/kasa#huong-dan" className="x-link mt-5">
            {g("guide")}
          </Link>

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
