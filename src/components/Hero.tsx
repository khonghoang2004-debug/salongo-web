import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight, Wallet } from "lucide-react";

const stats = [
  { value: "stat1Value", label: "stat1Label" },
  { value: "stat2Value", label: "stat2Label" },
  { value: "stat3Value", label: "stat3Label" },
  { value: "stat4Value", label: "stat4Label" },
] as const;

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="sg-section-glow relative overflow-hidden px-4 pt-10 pb-12 sm:px-6 sm:pt-14 sm:pb-16 lg:px-8 lg:pt-20 lg:pb-20">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          <div>
            <span className="sg-eyebrow">
              <span className="sg-gradient size-2 rounded-full" aria-hidden />
              {t("badge")}
            </span>
            {/* H1 always visible for SEO */}
            <h1 className="mt-5 max-w-[620px] text-[2.375rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.6rem]">
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
                className="btn-primary px-6 py-3.5 text-base"
              >
                {t("cta")}
                <ArrowUpRight className="size-[18px]" aria-hidden />
              </a>
              <Link href="/tinh-nang" className="btn-secondary px-6 py-3.5 text-base">
                {t("ctaSecondary")}
                <ArrowRight className="size-[18px] text-muted" aria-hidden />
              </Link>
            </div>

            <ul className="mt-7 grid gap-2.5 sm:gap-3 lg:mt-9">
              {(["proof1", "proof2", "proof3"] as const).map((key) => (
                <li key={key} className="flex items-center gap-3 text-[15px] font-medium text-[#374151]">
                  <CheckIcon />
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-w-0">
            {/* Khung trình duyệt: viền mảnh, bóng gọn, không blur */}
            <div className="overflow-hidden rounded-xl border border-line bg-white shadow-sg-lg sm:rounded-2xl">
              <div className="flex items-center gap-1.5 border-b border-line bg-[#fafafc] px-3.5 py-2.5">
                <span className="size-2.5 rounded-full bg-[#f9a8d4]" />
                <span className="size-2.5 rounded-full bg-[#c4b5fd]" />
                <span className="size-2.5 rounded-full bg-[#93c5fd]" />
                <span className="ml-3 hidden h-5 max-w-[220px] flex-1 items-center rounded-md border border-line bg-white px-2 text-[11px] text-muted sm:flex">
                  app.salongo.eu
                </span>
              </div>
              <img src="/images/hero-image.png" alt={t("imageAlt")} className="block w-full" />
            </div>

            {/* Thẻ doanh thu — cùng kiểu thẻ gradient trong app SalonGo */}
            <div className="sg-hero-card absolute -bottom-6 left-3 w-[72%] max-w-[300px] rounded-2xl border border-white/60 p-3.5 shadow-sg-lg sm:-bottom-8 sm:-left-6 sm:p-4 lg:-left-10">
              <p className="flex items-center gap-2 text-xs font-semibold sm:text-sm">
                <Wallet className="size-4 sm:size-5" aria-hidden />
                {t("revenueToday")}
              </p>
              <p className="mt-1.5 flex items-center gap-2.5 sm:mt-2">
                <span className="text-2xl font-extrabold tracking-tight sm:text-[1.75rem]">89&nbsp;230&nbsp;Kč</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/35 px-2 py-0.5 text-xs font-bold sm:text-sm">
                  <ArrowUpRight className="size-3.5" aria-hidden />
                  +100%
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Dải số liệu */}
        <dl className="mt-16 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-white shadow-sg-sm sm:mt-20 lg:grid-cols-4">
          {stats.map(({ value, label }, i) => (
            <div
              key={value}
              className={`px-5 py-5 sm:px-7 sm:py-6 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <dt className="text-sm font-medium text-muted">{t(label)}</dt>
              <dd className="sg-gradient-text mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">{t(value)}</dd>
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
