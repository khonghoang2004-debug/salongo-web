import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, Check, Minus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { deskSignupLink, renewLink } from "@/lib/app-links";
import type { DeskPlan } from "@/lib/plans";
import { money, withTotal } from "./format";

const ROWS = [
  { key: "rowCheckout", salon: true, desk: true },
  { key: "rowEet", salon: true, desk: true },
  { key: "rowThuchi", salon: true, desk: true },
  { key: "rowCalendar", salon: true, desk: false },
  { key: "rowTeam", salon: true, desk: false },
  { key: "rowMarketing", salon: true, desk: false },
] as const;

/**
 * Gói Bàn trên trang Bảng giá: giá, nút đăng ký / mua và bảng so với gói salon.
 * desk.live = false: "Sắp ra mắt", giá dự kiến, không có nút mua (chỉ "Báo tôi khi mở bán" → Liên hệ).
 */
export async function DeskBand({ desk }: { desk: DeskPlan }) {
  const t = await getTranslations("pricing2.desk");
  const locale = await getLocale();

  const mark = (on: boolean) =>
    on ? (
      <>
        <Check className="mx-auto size-[18px] text-brand-700" strokeWidth={2.5} aria-hidden />
        <span className="sr-only">{t("yes")}</span>
      </>
    ) : (
      <>
        <Minus className="mx-auto size-[18px] text-ink/30" aria-hidden />
        <span className="sr-only">{t("no")}</span>
      </>
    );

  return (
    <section id="goi-ban" className="x-section scroll-mt-20 bg-white" aria-labelledby="desk-title">
      <div className="x-wrap grid gap-12 lg:grid-cols-12 lg:gap-8 [&>*]:min-w-0">
        <div className="lg:col-span-5">
          {!desk.live && <p className="x-kicker mb-4">{t("soon")}</p>}
          <h2 id="desk-title" className="x-h2 text-ink">{t("title")}</h2>
          <p className="x-lead mt-5 max-w-[30rem]">{t("lead")}</p>

          <p className="mt-9 flex flex-wrap items-baseline gap-x-2">
            {desk.listMonthly !== null && <s className="text-[1.05rem] tabular-nums text-muted">{money(locale, desk.listMonthly)}</s>}
            <span className="text-[3rem] font-semibold leading-none tracking-[-0.045em] text-brand-800 tabular-nums">{money(locale, desk.monthly)}</span>
            <span className="text-[15px] text-muted">{t("perMonth")}</span>
          </p>
          <p className="mt-2 text-[14.5px] tabular-nums text-muted">
            {!desk.live
              ? t("expected")
              : desk.yearly !== null
                ? `${withTotal(t.raw("orYearly") as string, money(locale, desk.yearly))} · ${t("trial")}`
                : t("trial")}
          </p>

          {desk.live ? (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
              <a href={deskSignupLink(locale)} className="x-btn-dark">
                {t("signup")}
              </a>
              <a href={renewLink(locale, "DESK", "month")} className="x-link min-h-11">
                {t("buy")}
              </a>
            </div>
          ) : (
            <>
              <p className="x-body mt-6 max-w-[28rem]">{t("soonNote")}</p>
              <Link href="/lien-he" className="x-btn-dark mt-6">
                {t("notify")}
              </Link>
            </>
          )}
          <p className="mt-6">
            <Link href="/goi-ban" className="x-link min-h-11">
              {t("more")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">
          <table className="w-full border-collapse text-left text-[15px]">
            <caption className="pb-4 text-left text-[15px] font-semibold text-ink">{t("caption")}</caption>
            <thead>
              <tr className="border-b border-ink/80 text-[14px]">
                <th scope="col" className="py-3 pr-3 font-medium text-muted">{t("colFeature")}</th>
                <th scope="col" className="w-[26%] px-2 py-3 text-center font-medium text-ink">{t("colSalon")}</th>
                <th scope="col" className="w-[26%] px-2 py-3 text-center font-semibold text-brand-800">{t("colDesk")}</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.key} className="border-b border-line">
                  <th scope="row" className="py-4 pr-3 font-normal text-ink/85">{t(r.key)}</th>
                  <td className="px-2 py-4 text-center">{mark(r.salon)}</td>
                  <td className="px-2 py-4 text-center">{mark(r.desk)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
