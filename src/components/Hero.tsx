import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight, Lock, Wallet } from "lucide-react";

const stats = [
  { value: "stat1Value", label: "stat1Label" },
  { value: "stat2Value", label: "stat2Label" },
  { value: "stat3Value", label: "stat3Label" },
  { value: "stat4Value", label: "stat4Label" },
] as const;

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="sg-section-glow relative overflow-hidden px-4 pt-10 pb-4 sm:px-6 sm:pt-14 sm:pb-6 lg:px-8 lg:pt-20 lg:pb-8">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          <div>
            <span className="sg-eyebrow">
              <span className="relative flex size-2" aria-hidden>
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-600" />
              </span>
              {t("badge")}
            </span>
            {/* H1 always visible for SEO */}
            <h1 className="mt-6 max-w-[640px] font-display text-[2.5rem] font-extrabold leading-[1.1] tracking-[-0.035em] text-ink sm:text-[3.25rem] lg:text-[3.85rem]">
              {t("titleBefore")} <span className="sg-gradient-text">{t("titleSalon")}</span> {t("titleAfter1")}
              <span className="sg-gradient-text">{t("heroHighlight2")}</span>
              {t("titleAfter2")}
              <span className="sg-gradient-text">{t("heroHighlight3")}</span>
              {t("titleAfter3")}
            </h1>
            <p className="sg-lead mt-5 max-w-xl lg:mt-6">{t("subtitle")}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-9">
              <a
                href="https://app.salongo.eu/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 py-3.5 text-base sm:px-7"
              >
                {t("cta")}
                <ArrowUpRight className="size-[18px]" aria-hidden />
              </a>
              <Link href="/tinh-nang" className="btn-secondary px-6 py-3.5 text-base sm:px-7">
                {t("ctaSecondary")}
                <ArrowRight className="size-[18px] text-muted" aria-hidden />
              </Link>
            </div>

            <p className="mt-4 text-sm text-muted">{t("trialNote")}</p>

            <ul className="mt-7 grid gap-2.5 border-t border-line pt-6 sm:gap-3 lg:mt-8">
              {(["proof1", "proof2", "proof3"] as const).map((key) => (
                <li key={key} className="flex items-center gap-3 text-[15px] font-medium text-ink/80">
                  <CheckIcon />
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-w-0">
            {/* Khung trình duyệt: viền mảnh, bóng gọn, không blur */}
            <div className="sg-browser">
              <div className="sg-browser-bar">
                <span className="sg-browser-dot" />
                <span className="sg-browser-dot" />
                <span className="sg-browser-dot" />
                <span className="ml-3 hidden h-6 max-w-[240px] flex-1 items-center gap-1.5 rounded-md border border-line bg-white px-2 text-[11px] text-muted sm:flex">
                  <Lock className="size-3" aria-hidden />
                  app.salongo.eu
                </span>
              </div>
              <img src="/images/app/tong-quan.webp" alt={t("imageAlt")} width={1600} height={1000} className="block h-auto w-full" />
            </div>

            {/* Thẻ doanh thu — nền đỏ đô đặc */}
            <div className="sg-hero-card absolute -bottom-10 left-3 w-[62%] max-w-[300px] rounded-xl border border-white/15 p-3 shadow-sg-xl sm:w-[72%] sm:rounded-2xl sm:-bottom-8 sm:-left-6 sm:p-4 lg:-left-10">
              <p className="flex items-center gap-2 text-xs font-semibold text-white/80 sm:text-sm">
                <Wallet className="size-4 sm:size-5" aria-hidden />
                {t("revenueToday")}
              </p>
              <p className="mt-1 flex items-center gap-2 sm:mt-2 sm:gap-2.5">
                <span className="font-display text-xl font-extrabold tracking-tight sm:text-[1.75rem]">89&nbsp;230&nbsp;Kč</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-1.5 py-0.5 text-[11px] font-bold text-emerald-200 sm:px-2 sm:text-sm">
                  <ArrowUpRight className="size-3.5" aria-hidden />
                  +100%
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Dải số liệu */}
        <dl className="mt-16 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-white shadow-sg-md sm:mt-20 lg:grid-cols-4">
          {stats.map(({ value, label }, i) => (
            <div
              key={value}
              className={`flex flex-col-reverse px-5 py-5 sm:px-8 sm:py-7 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <dt className="text-[13px] font-medium text-muted sm:text-sm">{t(label)}</dt>
              <dd className="mb-1 font-display text-[1.75rem] font-extrabold tracking-[-0.03em] text-brand-700 sm:text-[2.25rem]">{t(value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <span className="sg-icon-tile size-5 rounded-full" aria-hidden>
      <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}
