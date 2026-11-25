import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, Check, Download, PiggyBank, Printer, ReceiptText, Scissors, UserRound, Users, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DesktopShot } from "@/components/landing/Shots";
import { Receipt } from "@/components/landing/Receipt";
import { kasaBankReady, kasaCardReady, kasaPrice } from "@/lib/kasa";

/** /kasa hero: EET 2.0 pill, name, one line, one-time price, Buy + Download, three short facts; POS screenshot. */
export async function KasaHero() {
  const t = await getTranslations("kasa.hero");
  const locale = await getLocale();
  return (
    <section className="overflow-hidden bg-white pb-10 pt-10 lg:pb-16" aria-labelledby="kasa-hero-title">
      <div className="x-wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-8 [&>*]:min-w-0">
        <div className="lg:col-span-6 xl:col-span-5">
          <Link
            href="/eet-2-0"
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 text-[13.5px] text-ink/80 transition-colors hover:border-ink/25"
          >
            <span className="shrink-0 whitespace-nowrap rounded-full bg-[#E8F1EC] px-2 py-0.5 text-[12px] font-semibold text-[#2F5E47]">EET 2.0</span>
            <span className="truncate">{t("pill")}</span>
          </Link>
          <h1 id="kasa-hero-title" className="x-display mt-6 text-ink max-sm:!text-[2.6rem] lg:!text-[clamp(3rem,1rem+3.6vw,4.6rem)]">
            {t("title")}
          </h1>
          <p className="x-lead mt-5 max-w-[30rem]">{t("lead")}</p>
          <p className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[2.25rem] font-semibold tracking-[-0.04em] text-brand-800 tabular-nums">{kasaPrice(locale)}</span>
            <span className="text-[15px] text-muted">
              {t("once")} · {t("platforms")}
            </span>
          </p>
          <div data-cta className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/kasa/thanh-toan" className="x-btn-primary !min-h-[52px] !px-7 text-base">
              {kasaCardReady() || kasaBankReady() ? t("buy") : t("buyContact")}
            </Link>
            <Link href="/kasa/download" className="x-btn-light !min-h-[52px] !px-7 text-base">
              <Download className="size-4" aria-hidden />
              {t("download")}
            </Link>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[14.5px] text-ink/80">
            {(["fact1", "fact2", "fact3"] as const).map((k) => (
              <li key={k} className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-brand-700" strokeWidth={2.5} aria-hidden />
                {t(k)}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative lg:col-span-6 xl:col-span-7">
          <div className="absolute -inset-x-5 -bottom-16 top-10 rounded-[28px] bg-porcelain sm:-inset-x-8 lg:-right-[50vw] lg:left-10 lg:rounded-r-none" aria-hidden />
          <div className="relative pb-4 sm:pl-[8%]">
            <DesktopShot id="checkout" alt={t("alt")} priority className="x-hero-desktop lg:w-[112%] lg:max-w-none" />
            {/* Printed receipt with EET codes over the shot's sidebar (the cloud app's menu is not part of Kasa) */}
            <Receipt className="absolute -bottom-8 left-0 hidden origin-bottom-left -rotate-2 scale-[0.6] sm:block lg:-left-4 xl:scale-[0.7]" />
          </div>
        </div>
      </div>
    </section>
  );
}

const TILES = [
  { key: "checkout", icon: Printer, tone: "bg-[#F8EEF1] text-brand-700" },
  { key: "eet", icon: ReceiptText, tone: "bg-[#E8F1EC] text-[#2F5E47]" },
  { key: "thuchi", icon: PiggyBank, tone: "bg-emerald-50 text-emerald-700" },
  { key: "services", icon: Scissors, tone: "bg-violet-50 text-violet-700" },
  { key: "staff", icon: Users, tone: "bg-amber-50 text-amber-700" },
  { key: "customers", icon: UserRound, tone: "bg-sky-50 text-sky-700" },
] as const;

/** Six tiles: title + one short line (same tile style as the home FeatureGrid). */
export async function KasaFeatures() {
  const t = await getTranslations("kasa.features");
  return (
    <section className="x-section-tight bg-white" aria-labelledby="kasa-features-title">
      <div className="x-wrap">
        <h2 id="kasa-features-title" className="x-h2 text-ink">{t("title")}</h2>
        <ul className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {TILES.map(({ key, icon: Icon, tone }) => (
            <li key={key} className="rounded-2xl bg-porcelain/60 p-4 ring-1 ring-black/[0.05] sm:p-5">
              <span className={`grid size-10 place-items-center rounded-xl ${tone}`}>
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-3 text-[15.5px] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[1.0625rem]">{t(`${key}.t`)}</h3>
              <p className="mt-1 text-[14px] leading-snug text-muted sm:text-[15px]">{t(`${key}.d`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type Cell = boolean | string;
/** Kasa vs SalonGo: two text rows, then ✓ / ✗ rows. */
export async function KasaCompare() {
  const t = await getTranslations("kasa.compare");
  const rows: [string, Cell, Cell][] = [
    [t("price"), t("priceKasa"), t("priceGo")],
    [t("data"), t("dataKasa"), t("dataGo")],
    [t("appointments"), false, true],
    [t("booking"), false, true],
    [t("devices"), false, true],
    [t("eet"), true, true],
    [t("thuchi"), true, true],
    [t("staffRevenue"), true, true],
  ];
  const cell = (v: Cell) =>
    typeof v === "string" ? (
      <span className="text-[14.5px] font-medium text-ink sm:text-[15px]">{v}</span>
    ) : v ? (
      <>
        <Check className="mx-auto size-5 text-emerald-700" strokeWidth={2.5} aria-hidden />
        <span className="sr-only">{t("yes")}</span>
      </>
    ) : (
      <>
        <X className="mx-auto size-5 text-ink/30" strokeWidth={2.5} aria-hidden />
        <span className="sr-only">{t("no")}</span>
      </>
    );
  return (
    <section id="so-sanh" className="x-section-tight scroll-mt-20 bg-porcelain" aria-labelledby="kasa-compare-title">
      <div className="x-wrap max-w-[52rem]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="kasa-compare-title" className="x-h2 text-ink">{t("title")}</h2>
          <Link href="/" className="x-link shrink-0">
            {t("goLink")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-7 overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06]">
          <table className="w-full table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[40%]" />
              <col className="w-[30%]" />
              <col className="w-[30%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-line">
                <td className="p-3 sm:p-4" />
                <th scope="col" className="bg-[#F8EEF1] p-3 text-center text-[15px] font-semibold text-brand-800 sm:p-4">Kasa</th>
                <th scope="col" className="p-3 text-center text-[15px] font-semibold text-ink sm:p-4">SalonGo</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, k, g]) => (
                <tr key={label} className="border-b border-line last:border-b-0">
                  <th scope="row" className="p-3 text-[14.5px] font-normal text-ink/80 sm:p-4 sm:text-[15px]">{label}</th>
                  <td className="bg-[#F8EEF1]/45 p-3 text-center sm:p-4">{cell(k)}</td>
                  <td className="p-3 text-center sm:p-4">{cell(g)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
