import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, Check, Clock, RefreshCw } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { deskSignupLink, renewLink } from "@/lib/app-links";
import type { DeskPlan } from "@/lib/plans";

const fmt = (n: number) => new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 2 }).format(n);

export const DESK_FEATURES = ["f1", "f2", "f3", "f4", "f5", "f6"] as const;

/**
 * Thẻ giá gói Bàn (dùng ở trang Bảng giá và trang /goi-ban). Giá lấy từ app (lib/plans → desk).
 * Khi app chưa bán gói (desk.live = false): nhãn "Sắp ra mắt", giá dự kiến, nút dẫn tới trang Liên hệ
 * thay vì màn đăng ký / mua gói chưa có.
 */
export async function DeskPlanCard({ desk, showMore = false, headingLevel = 3 }: { desk: DeskPlan; showMore?: boolean; headingLevel?: 2 | 3 }) {
  const t = await getTranslations("desk");
  const locale = await getLocale();
  const H = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className="relative flex h-full flex-col rounded-[28px] border border-line bg-white p-6 sm:p-8">
      <span
        className={`absolute right-6 top-6 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-semibold ${
          desk.live ? "bg-brand-50 text-brand-700" : "bg-nude text-ink"
        }`}
      >
        {!desk.live && <Clock className="size-3.5" aria-hidden />}
        {desk.live ? t("badgeNew") : t("soon")}
      </span>
      <H className="pr-28 font-display text-[1.75rem] font-medium leading-none text-ink">{t("name")}</H>
      <p className="mt-2 pr-4 text-sm text-muted">{t("subtitle")}</p>

      <div className="mt-6 border-b border-line pb-6">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          {desk.listMonthly !== null && (
            <span className="text-lg text-muted line-through tabular-nums">{fmt(desk.listMonthly)}</span>
          )}
          <span className="font-display text-[3rem] font-medium leading-none tracking-[-0.02em] tabular-nums text-ink lg:text-[3.5rem]">
            {fmt(desk.monthly)}
          </span>
          <span className="text-muted">{t("perMonth")}</span>
        </div>
        <p className="mt-3 min-h-5 text-sm text-muted">
          {!desk.live
            ? t("expected")
            : desk.yearly !== null
              ? t.raw("perYear").replace("{total}", fmt(desk.yearly))
              : null}
        </p>
      </div>

      <ul className="mt-5 flex-1 space-y-3">
        {DESK_FEATURES.map((k) => (
          <li key={k} className="flex items-start gap-2.5 text-sm text-ink/80">
            <span className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700" aria-hidden>
              <Check className="size-3" strokeWidth={3} />
            </span>
            {t(k)}
          </li>
        ))}
      </ul>
      <p className="mt-5 border-t border-line pt-4 text-[13px] leading-relaxed text-muted">{t("notIncluded")}</p>

      <div className="mt-6 grid gap-2">
        {desk.live ? (
          <>
            <a href={deskSignupLink(locale)} target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-[15px]">
              {t("cta")}
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <a
              href={renewLink(locale, "DESK", "month")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              <RefreshCw className="size-4" aria-hidden />
              {t("buy")}
            </a>
          </>
        ) : (
          <Link href="/lien-he" className="btn-primary w-full text-[15px]">
            {t("notify")}
          </Link>
        )}
        {showMore && (
          <Link
            href="/goi-ban"
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            {t("more")}
          </Link>
        )}
      </div>
    </div>
  );
}
