import type { CSSProperties } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight, BadgeCheck, FileUp, Languages, Send } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SIGNUP_URL, appLink } from "@/lib/app-links";

// EET 2.0 bắt buộc ở Séc từ 1.1.2027 (luật 180/2026 Sb.): 00:00 giờ Praha = 23:00 UTC ngày 31.12.2026
const EET_START = Date.UTC(2026, 11, 31, 23, 0, 0);
const DAY = 86_400_000;

const POINTS = [
  { icon: FileUp, t: "p1t", d: "p1d" },
  { icon: Send, t: "p2t", d: "p2d" },
  { icon: BadgeCheck, t: "p3t", d: "p3d" },
  { icon: Languages, t: "p4t", d: "p4d" },
] as const;

/** Số ngày còn lại tới khi EET 2.0 bắt buộc (làm tròn lên); 0 = đã áp dụng. Trang dựng lại tối đa mỗi phút (ISR). */
export function daysUntilEet(now = Date.now()): number {
  return Math.max(0, Math.ceil((EET_START - now) / DAY));
}

// Trang chủ: EET 2.0 là lý do salon ở Séc phải đổi phần mềm trong năm 2027, nên đặt ngay dưới hero
export async function HomeEet() {
  const t = await getTranslations("eet");
  const locale = await getLocale();
  const days = daysUntilEet();

  return (
    <section className="sg-section" aria-labelledby="eet-title">
      <div className="sg-container">
        <div className="grid gap-8 rounded-[28px] border border-line bg-white p-5 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-12">
          <div data-reveal className="lg:col-span-5">
            <p className="sg-kicker">{t("eyebrow")}</p>
            <h2 id="eet-title" className="sg-h2 mt-4">
              {t("titleBefore")} <span className="text-brand-700">{t("titleAccent")}</span>
            </h2>
            <p className="sg-lead mt-4">{t("lead")}</p>

            <div className="mt-6 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-2xl bg-brand-50 px-4 py-3">
              <span className="whitespace-nowrap font-display text-[1.5rem] font-semibold leading-none tabular-nums text-brand-700 sm:text-[1.75rem]">
                {days > 0 ? t("countdown", { n: days }) : t("live")}
              </span>
              <span className="text-sm text-brand-700/80">{days > 0 ? t("countdownLabel") : t("liveLabel")}</span>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={appLink(SIGNUP_URL, locale)} target="_blank" rel="noopener noreferrer" className="btn-primary sg-arrow sg-arrow-up px-6 text-[15px]">
                {t("cta")}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <Link href="/lien-he" className="btn-secondary px-6 text-[15px]">
                {t("more")}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul data-stagger className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {POINTS.map(({ icon: Icon, t: tk, d: dk }) => (
                <li key={tk} className="rounded-[20px] bg-nude p-5 sm:p-6">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white text-brand-700" aria-hidden>
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold tracking-[-0.01em] text-ink sm:text-lg">{t(tk)}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{t(dk)}</p>
                </li>
              ))}
            </ul>
            <Link
              href="/goi-ban"
              className="sg-arrow mt-4 flex min-h-11 items-center gap-2 rounded-2xl border border-dashed border-line px-4 py-3 text-[14px] font-semibold text-ink transition-colors hover:border-brand-700 hover:text-brand-700"
              style={{ "--d": "200ms" } as CSSProperties}
            >
              <span className="flex-1">{t("deskNote")}</span>
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
