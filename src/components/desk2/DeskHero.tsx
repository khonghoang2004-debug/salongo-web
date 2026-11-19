import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { deskSignupLink } from "@/lib/app-links";
import type { DeskPlan } from "@/lib/plans";
import { PhoneShot } from "@/components/landing/Shots";
import { DeskReceipt } from "./DeskReceipt";

/** Đầu trang Gói Bàn. Hình chính: hoá đơn in tên và IČO của thợ, đặt cạnh màn tính tiền thật trên điện thoại. */
export async function DeskHero({ desk }: { desk: DeskPlan }) {
  const t = await getTranslations("desk2.hero");
  const locale = await getLocale();
  return (
    <section className="overflow-hidden bg-white pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-16" aria-labelledby="desk-hero-title">
      <div className="x-wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-8 [&>*]:min-w-0">
        <div className="lg:col-span-6">
          <p className="x-kicker">
            {!desk.live && <span className="rounded-full bg-blush px-2.5 py-0.5 text-[13px] text-brand-800">{t("soon")}</span>}
            {t("kicker")}
          </p>
          <h1 id="desk-hero-title" className="x-display mt-5 text-ink lg:!text-[clamp(2.75rem,0.9rem+2.9vw,4rem)]">{t("title")}</h1>
          <p className="x-lead mt-6 max-w-[32rem]">{t("lead")}</p>
          <p className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[2rem] font-semibold tracking-[-0.04em] text-ink tabular-nums">{t("price")}</span>
            <span className="text-[15px] text-muted">{desk.live ? t("trial") : t("expected")}</span>
          </p>
          <div data-cta className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {desk.live ? (
              <a href={deskSignupLink(locale)} className="x-btn-primary !min-h-[52px] !px-7 text-base">
                {t("cta")}
              </a>
            ) : (
              <Link href="/lien-he" className="x-btn-primary !min-h-[52px] !px-7 text-base">
                {t("notify")}
              </Link>
            )}
            <Link href="/bang-gia#goi-ban" className="x-btn-light !min-h-[52px] !px-7 text-base">
              {t("pricing")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>

        <figure className="relative lg:col-span-6">
          <div className="absolute -inset-x-5 -bottom-16 top-10 rounded-[28px] bg-porcelain sm:-inset-x-8 lg:-right-[50vw] lg:left-6 lg:rounded-r-none" aria-hidden />
          <div className="relative flex items-start justify-center gap-0 pt-4 sm:justify-start sm:pl-[8%]">
            <PhoneShot id="desk" alt={t("phoneAlt")} priority className="x-hero-desktop w-[46%] max-w-[270px] shrink-0 sm:w-[42%]" />
            <DeskReceipt alt={t("receiptAlt")} className="x-hero-phone relative -ml-[6%] mt-[16%] w-[214px] shrink-0 rotate-[2deg] !px-4 !text-[10.5px] sm:-ml-[5%] sm:w-[280px] sm:!px-6 sm:!text-[12.5px]" />
          </div>
          <figcaption className="relative mt-8 text-[14px] text-muted sm:pl-[8%]">{t("receiptCaption")}</figcaption>
        </figure>
      </div>
    </section>
  );
}
