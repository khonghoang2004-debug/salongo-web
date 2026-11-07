import type { CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, Check } from "lucide-react";
import { RENEW_URL, appLink } from "@/lib/app-links";
import { DownloadCard } from "../DownloadSection";
import { PLANS } from "../Pricing";

const fmt = (n: number) => new Intl.NumberFormat("cs-CZ").format(n);

// Giá + thiết bị: hai khối cạnh nhau. Bên trái là ba gói như ba dòng trong bảng giá ở tiệm, cùng số với trang Bảng giá
export async function HomePricingTeaser() {
  const h = await getTranslations("home2");
  const tp = await getTranslations("pricing");
  const tpp = await getTranslations("pricingPage");
  const locale = await getLocale();

  return (
    <section className="sg-section">
      <div className="sg-container grid gap-5 lg:grid-cols-12 lg:gap-6">
        <div data-reveal className="flex flex-col rounded-[28px] bg-brand-700 p-6 text-white sm:p-10 lg:col-span-7">
          <p className="text-[15px] font-medium text-white/75">{h("priceEyebrow")}</p>
          <h2 className="mt-3 font-display text-[2rem] font-medium leading-[1.14] tracking-[-0.015em] text-balance sm:text-[2.5rem]">{h("priceTitle")}</h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/80 sm:text-base">{h("priceLead")}</p>

          <dl className="mt-7 border-t border-white/20">
            {PLANS.map((p) => (
              <div key={p.code} className="flex items-baseline justify-between gap-4 border-b border-white/20 py-4">
                <dt className="min-w-0">
                  <span className="block text-[17px] font-semibold">{tp(p.nameKey)}</span>
                  <span className="block text-[13px] text-white/70">
                    {p.staff ? tpp("staffLimit", { n: p.staff }) : tpp("staffUnlimited")}
                  </span>
                </dt>
                <dd className="shrink-0 text-right">
                  <span className="font-display text-[2rem] leading-none tabular-nums sm:text-[2.375rem]">{fmt(p.monthly)}</span>
                  <span className="ml-1.5 text-[13px] text-white/75">{tp("perMonth")}</span>
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-3 sm:gap-4">
            {(["price1", "price2", "price3"] as const).map((k) => (
              <li key={k} className="flex items-start gap-2 text-[14px] leading-snug text-white/90">
                <Check className="mt-0.5 size-4 shrink-0" strokeWidth={2.5} aria-hidden />
                {h(k)}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-2 pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
            <Link href="/bang-gia" className="btn-on-gradient px-7 text-[15px]">
              {h("priceCta")}
            </Link>
            <a
              href={appLink(RENEW_URL, locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="sg-arrow sg-arrow-up inline-flex min-h-11 items-center justify-center gap-1.5 px-2 text-center text-[15px] font-semibold text-white/90 hover:text-white focus-visible:!outline-white sm:whitespace-nowrap"
            >
              {h("priceRenew")}
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
        <div data-reveal className="lg:col-span-5" style={{ "--d": "120ms" } as CSSProperties}>
          <DownloadCard />
        </div>
      </div>
    </section>
  );
}
