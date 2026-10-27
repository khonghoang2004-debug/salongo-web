import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight, BellRing, Check, Lock, Wallet } from "lucide-react";

const stats = [
  { value: "stat1Value", label: "stat1Label" },
  { value: "stat2Value", label: "stat2Label" },
  { value: "stat3Value", label: "stat3Label" },
  { value: "stat4Value", label: "stat4Label" },
] as const;

// Hero trang chủ: tiêu đề căn giữa, ảnh app lớn bên dưới, thẻ nổi và dải số liệu
export async function HomeHero() {
  const t = await getTranslations("hero");
  const h = await getTranslations("home2");

  return (
    <section className="sg-section-glow relative overflow-hidden px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="sg-eyebrow">
          <span className="size-1.5 rounded-full bg-brand-700" aria-hidden />
          {t("badge")}
        </span>
        {/* H1 luôn hiển thị cho SEO */}
        <h1 className="mx-auto mt-6 max-w-[880px] font-display text-[2.375rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-ink text-balance sm:text-[3.25rem] lg:text-[4rem]">
          {t("titleBefore")} <span className="text-brand-700">{t("titleSalon")}</span> {t("titleAfter1")}
          <span className="text-brand-700">{t("heroHighlight2")}</span>
          {t("titleAfter2")}
          <span className="text-brand-700">{t("heroHighlight3")}</span>
          {t("titleAfter3")}
        </h1>
        <p className="sg-lead mx-auto mt-6 max-w-2xl">{t("subtitle")}</p>

        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a
            href="https://app.salongo.eu/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-7 py-3.5 text-base"
          >
            {t("cta")}
            <ArrowUpRight className="size-[18px]" aria-hidden />
          </a>
          <Link href="/tinh-nang" className="btn-secondary px-7 py-3.5 text-base">
            {t("ctaSecondary")}
            <ArrowRight className="size-[18px] text-muted" aria-hidden />
          </Link>
        </div>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
          {(["proof1", "proof2", "proof3"] as const).map((key) => (
            <li key={key} className="flex items-center gap-1.5">
              <Check className="size-4 text-brand-700" strokeWidth={2.5} aria-hidden />
              {t(key)}
            </li>
          ))}
        </ul>
      </div>

      {/* Ảnh app lớn */}
      <div className="relative z-10 mx-auto mt-14 max-w-6xl sm:mt-16">
        <div className="sg-browser">
          <div className="sg-browser-bar">
            <span className="sg-browser-dot" />
            <span className="sg-browser-dot" />
            <span className="sg-browser-dot" />
            <span className="mx-auto hidden h-6 w-full max-w-[280px] items-center justify-center gap-1.5 rounded-md border border-line bg-white px-2 text-[11px] text-muted sm:flex">
              <Lock className="size-3" aria-hidden />
              app.salongo.eu
            </span>
            <span className="hidden w-[42px] sm:block" aria-hidden />
          </div>
          <img
            src="/images/hero-dashboard.webp"
            alt={t("imageAlt")}
            width={2000}
            height={1150}
            className="block h-auto w-full"
            fetchPriority="high"
          />
        </div>

        {/* Thẻ: lịch hẹn mới */}
        <div className="absolute -right-3 top-[18%] hidden w-[290px] rounded-2xl border border-line bg-white p-4 text-left shadow-sg-xl md:block lg:-right-10">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <BellRing className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{h("notifTitle")}</p>
              <p className="truncate text-[13px] text-muted">{h("notifText")}</p>
            </div>
            <span className="rounded-lg bg-brand-700 px-2.5 py-1.5 text-xs font-semibold text-white">{h("notifAction")}</span>
          </div>
        </div>

        {/* Thẻ: doanh thu hôm nay */}
        <div className="absolute -bottom-6 left-3 hidden w-[62%] max-w-[300px] rounded-2xl bg-brand-700 p-3.5 text-left text-white shadow-sg-xl sm:-bottom-8 sm:left-[-1.5rem] sm:block sm:p-5 lg:-left-10">
          <p className="flex items-center gap-2 text-xs font-medium text-white/80 sm:text-sm">
            <Wallet className="size-4" aria-hidden />
            {t("revenueToday")}
          </p>
          <p className="mt-1.5 flex items-center gap-2.5">
            <span className="font-display text-xl font-bold tracking-tight sm:text-[1.75rem]">89&nbsp;230&nbsp;Kč</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold sm:text-xs">
              <ArrowUpRight className="size-3.5" aria-hidden />
              +100%
            </span>
          </p>
        </div>
      </div>

      {/* Dải số liệu */}
      <div className="relative z-10 mx-auto max-w-6xl pb-14 pt-16 sm:pb-20 sm:pt-24">
        <p className="text-center text-sm font-medium text-muted">{h("statsTitle")}</p>
        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={value} className="flex flex-col-reverse bg-white px-5 py-6 text-center sm:py-8">
              <dt className="mt-1 text-[13px] text-muted sm:text-sm">{t(label)}</dt>
              <dd className="font-display text-[1.75rem] font-bold tracking-[-0.03em] text-ink sm:text-[2.5rem]">{t(value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
