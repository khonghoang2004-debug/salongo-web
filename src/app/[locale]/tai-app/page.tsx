import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Download, Globe } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";
import { AppleIcon, WindowsIcon } from "@/components/site/BrandIcons";
import { APP_URL, DOWNLOAD_LINKS, IOS_APP_LIVE, appLink } from "@/lib/app-links";
import { KASA_DOWNLOAD, KASA_PRICE_CZK, kasaPrice } from "@/lib/kasa";
import { getPlans } from "@/lib/plans";
import { pageMetadata, pageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/metadata";
import { jsonLdString } from "@/lib/json-ld";

type Props = { params: Promise<{ locale: string }> };
const PATH = "/tai-app";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "downloads.meta" });
  return pageMetadata({ locale, path: PATH, title: t("title"), description: t("desc"), absolute: true });
}

type Row = { href: string; icon: React.ReactNode; label: string; note: string; external?: boolean };

function DownloadRow({ r }: { r: Row }) {
  return (
    <li>
      <a
        href={r.href}
        {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : { rel: "nofollow" })}
        className="group flex min-h-[64px] items-center gap-4 rounded-2xl border border-line bg-white px-4 transition-colors hover:border-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-porcelain" aria-hidden>
          {r.icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15.5px] font-semibold text-ink">{r.label}</span>
          <span className="block text-[13px] text-muted">{r.note}</span>
        </span>
        <Download className="size-4 shrink-0 text-ink/40 transition-colors group-hover:text-brand-700" aria-hidden />
      </a>
    </li>
  );
}

/** Download hub: SalonGo (Mac, Windows, iPhone/iPad, web) and SalonGo Kasa (Mac Apple/Intel, Windows) on one page. */
export default async function DownloadsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("downloads");
  const plans = await getPlans();
  const url = pageUrl(locale, PATH);
  const ico = "size-5 text-ink";

  const salongo: Row[] = [
    { href: DOWNLOAD_LINKS.mac, icon: <AppleIcon className={ico} />, label: t("mac"), note: t("macNote") },
    { href: DOWNLOAD_LINKS.windows, icon: <WindowsIcon className="size-[18px] text-ink" />, label: t("win"), note: t("winNote") },
    ...(IOS_APP_LIVE ? [{ href: DOWNLOAD_LINKS.ios, icon: <AppleIcon className={ico} />, label: t("ios"), note: t("iosNote"), external: true }] : []),
    { href: appLink(APP_URL, locale), icon: <Globe className={ico} strokeWidth={1.75} />, label: t("salongo.web"), note: t("salongo.webNote"), external: true },
  ];
  const kasa: Row[] = [
    { href: KASA_DOWNLOAD.mac, icon: <AppleIcon className={ico} />, label: t("macArm"), note: t("macNote") },
    { href: KASA_DOWNLOAD.macIntel, icon: <AppleIcon className="size-5 text-ink/60" />, label: t("macIntel"), note: t("macNote") },
    { href: KASA_DOWNLOAD.win, icon: <WindowsIcon className="size-[18px] text-ink" />, label: t("win"), note: t("winNote") },
  ];

  const publisher = { "@type": "Organization", name: siteConfig.name, url: siteConfig.url };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#salongo`,
        name: "SalonGo",
        applicationCategory: "BusinessApplication",
        operatingSystem: "macOS, Windows, iOS, iPadOS, Web",
        downloadUrl: [`${siteConfig.url}${DOWNLOAD_LINKS.mac}`, `${siteConfig.url}${DOWNLOAD_LINKS.windows}`, DOWNLOAD_LINKS.ios],
        url: pageUrl(locale, ""),
        publisher,
        offers: { "@type": "Offer", price: 0, priceCurrency: "CZK", description: t("salongo.trial", { days: plans.trialDays }) },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#kasa`,
        name: "SalonGo Kasa",
        applicationCategory: "BusinessApplication",
        operatingSystem: "macOS, Windows",
        downloadUrl: [`${siteConfig.url}${KASA_DOWNLOAD.mac}`, `${siteConfig.url}${KASA_DOWNLOAD.win}`],
        url: pageUrl(locale, "/kasa"),
        publisher,
        offers: { "@type": "Offer", price: KASA_PRICE_CZK, priceCurrency: "CZK", url: pageUrl(locale, "/kasa/thanh-toan") },
      },
    ],
  };

  const card = "flex flex-col rounded-[28px] border border-line bg-white p-6 sm:p-8";
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <section className="bg-white pb-6 pt-10 sm:pt-14">
        <div className="x-wrap">
          <h1 className="x-display text-ink max-sm:!text-[2.2rem]">{t("title")}</h1>
          <p className="x-lead mt-4 max-w-[40rem]">{t("lead")}</p>
        </div>
      </section>

      <section className="bg-white pb-14">
        <div className="x-wrap grid gap-5 lg:grid-cols-2">
          <article className={card} aria-labelledby="dl-salongo">
            <div className="flex items-center gap-3">
              <img src={siteConfig.logo} alt="" width={40} height={40} className="size-10" />
              <h2 id="dl-salongo" className="text-[1.5rem] font-semibold tracking-[-0.025em] text-ink">
                {t("salongo.name")}
              </h2>
            </div>
            <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{t("salongo.tag")}</p>
            <p className="mt-2 inline-flex w-fit rounded-full bg-[#E8F1EC] px-3 py-1 text-[13px] font-semibold text-[#2F5E47]">
              {t("salongo.trial", { days: plans.trialDays })}
            </p>
            <ul className="mt-6 grid gap-2.5">
              {salongo.map((r) => (
                <DownloadRow key={r.href} r={r} />
              ))}
            </ul>
          </article>

          <article className={card} aria-labelledby="dl-kasa">
            <div className="flex items-center gap-3">
              <img src="/images/kasa-icon.png" alt="" width={40} height={40} className="size-10 rounded-[10px]" />
              <h2 id="dl-kasa" className="text-[1.5rem] font-semibold tracking-[-0.025em] text-ink">
                {t("kasa.name")}
              </h2>
              <span className="ml-auto whitespace-nowrap text-[15px] font-semibold text-brand-700">{kasaPrice(locale)}</span>
            </div>
            <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{t("kasa.tag")}</p>
            <ul className="mt-6 grid gap-2.5">
              {kasa.map((r) => (
                <DownloadRow key={r.href} r={r} />
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6 text-[15px]">
              <Link href="/kasa" className="x-link inline-flex items-center gap-1">
                {t("kasa.more")} <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/kasa/thanh-toan" className="x-link">
                {t("kasa.buy")}
              </Link>
            </div>
          </article>
        </div>
        <p className="x-wrap mt-6 text-[14.5px] text-muted">
          {t("help")}{" "}
          <Link href="/lien-he" className="x-link">
            {t("contact")}
          </Link>
        </p>
      </section>
    </PageShell>
  );
}
