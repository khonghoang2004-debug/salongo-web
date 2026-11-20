import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { deskSignupLink, renewLink } from "@/lib/app-links";
import type { DeskPlan } from "@/lib/plans";
import { money, withTotal } from "@/components/pricing2/format";

const STEPS = [
  ["s1t", "s1d"],
  ["s2t", "s2d"],
  ["s3t", "s3d"],
] as const;

/** Giá gói Bàn (từ app) và 3 bước bắt đầu. Chưa mở bán: giá dự kiến, không có nút mua. */
export async function DeskPrice({ desk }: { desk: DeskPlan }) {
  const t = await getTranslations("desk2.price");
  const tHero = await getTranslations("desk2.hero");
  const locale = await getLocale();
  return (
    <section id="gia" className="x-section scroll-mt-20 bg-porcelain" aria-labelledby="desk-price-title">
      <div className="x-wrap grid gap-12 lg:grid-cols-12 lg:gap-8 [&>*]:min-w-0">
        <div className="lg:col-span-5">
          <h2 id="desk-price-title" className="x-h2 text-ink">{t("title")}</h2>
          <p className="x-lead mt-5 max-w-[28rem]">{t("lead")}</p>
          <p className="mt-9 flex flex-wrap items-baseline gap-x-2">
            {desk.listMonthly !== null && <s className="text-[1.1rem] tabular-nums text-muted">{money(locale, desk.listMonthly)}</s>}
            <span className="text-[clamp(3.5rem,2.5rem+3vw,5rem)] font-semibold leading-none tracking-[-0.05em] text-brand-800 tabular-nums">{money(locale, desk.monthly)}</span>
            <span className="text-[16px] text-muted">{t("perMonth")}</span>
          </p>
          <p className="mt-3 text-[15px] tabular-nums text-muted">
            {!desk.live
              ? t("expected")
              : desk.yearly !== null
                ? `${withTotal(t.raw("orYearly") as string, money(locale, desk.yearly))} · ${t("trial")}`
                : t("trial")}
          </p>
          {desk.live ? (
            <>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
                <a href={deskSignupLink(locale)} className="x-btn-dark">
                  {tHero("cta")}
                </a>
                <a href={renewLink(locale, "DESK", "month")} className="x-link min-h-11">
                  {t("buy")}
                </a>
              </div>
              <p className="mt-6 max-w-[28rem] text-[14px] leading-relaxed text-muted">{t("buyNote")}</p>
            </>
          ) : (
            <>
              <p className="x-body mt-6 max-w-[28rem]">{t("soonNote")}</p>
              <Link href="/lien-he" className="x-btn-dark mt-6">
                {tHero("notify")}
              </Link>
            </>
          )}
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">
          <h3 className="text-[15px] font-semibold text-ink">{t("stepsTitle")}</h3>
          <ol className="mt-3 border-t border-ink/80">
            {STEPS.map(([tk, dk], i) => (
              <li key={tk} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 border-b border-line py-6">
                <span className="text-[1.6rem] font-semibold leading-none tracking-[-0.03em] text-ink/25 tabular-nums" aria-hidden>
                  {i + 1}
                </span>
                <div>
                  <p className="text-[1.15rem] font-semibold tracking-[-0.015em] text-ink">{t(tk)}</p>
                  <p className="x-body mt-1">{t(dk)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
