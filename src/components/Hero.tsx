import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Wallet } from "lucide-react";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="sg-section-glow relative overflow-hidden px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-14 lg:px-8 lg:pt-16 lg:pb-20">
      <div className="relative z-10 mx-auto max-w-[1600px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.9fr] lg:gap-16">
          <div className="order-1">
            {/* H1 always visible for SEO - styling handles responsive display */}
            <h1 className="max-w-[600px] text-[2.5rem] font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {t("titleBefore")} <span className="sg-gradient-text">{t("titleSalon")}</span> {t("titleAfter1")}
              <span className="sg-gradient-text">{t("heroHighlight2")}</span>
              {t("titleAfter2")}
              <span className="sg-gradient-text">{t("heroHighlight3")}</span>
              {t("titleAfter3")}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mt-6">
              {t("subtitle")}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 lg:mt-10">
              <a
                href="https://app.salongo.eu/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-7 py-3.5 text-base"
              >
                {t("cta")}
                <ArrowUpRight className="size-5" aria-hidden />
              </a>
              <Link href="/tinh-nang" className="btn-secondary px-7 py-3.5 text-base">
                {t("ctaSecondary")}
              </Link>
            </div>

            <ul className="mt-6 space-y-2.5 sm:space-y-3 lg:mt-8">
              {(["proof1", "proof2", "proof3"] as const).map((key) => (
                <li key={key} className="flex items-center gap-3 text-[15px] font-medium text-muted sm:text-base">
                  <CheckIcon />
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative order-2 flex justify-center">
            <div className="relative w-full min-w-0 max-w-xl sm:max-w-2xl lg:max-w-4xl">
              {/* Khối gradient trang trí phía sau ảnh (không dùng blur) */}
              <div
                className="sg-gradient absolute -right-3 -top-3 hidden h-2/3 w-2/3 rounded-[28px] opacity-60 sm:block lg:-right-5 lg:-top-5"
                aria-hidden
              />
              <div className="sg-gradient relative rounded-2xl p-[1.5px] shadow-[0_30px_60px_-24px_rgba(76,29,149,0.35)] sm:rounded-[22px]">
                <img
                  src="/images/hero-image.png"
                  alt={t("imageAlt")}
                  className="block w-full rounded-[14.5px] bg-white sm:rounded-[20.5px]"
                />
              </div>

              {/* Thẻ doanh thu — cùng kiểu thẻ gradient trong app SalonGo */}
              <div className="sg-hero-card absolute -bottom-6 left-3 w-[72%] max-w-[300px] rounded-2xl p-3.5 shadow-[0_18px_40px_-14px_rgba(76,29,149,0.55)] ring-1 ring-white/50 sm:-bottom-8 sm:-left-6 sm:p-4 lg:-left-10">
                <p className="flex items-center gap-2 text-xs font-semibold sm:text-sm">
                  <Wallet className="size-4 sm:size-5" aria-hidden />
                  {t("revenueToday")}
                </p>
                <p className="mt-1.5 flex items-center gap-2.5 sm:mt-2">
                  <span className="text-2xl font-extrabold tracking-tight sm:text-[1.75rem]">1&nbsp;080&nbsp;Kč</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/35 px-2 py-0.5 text-xs font-bold sm:text-sm">
                    <ArrowUpRight className="size-3.5" aria-hidden />
                    +100%
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <span className="sg-icon-tile size-6 rounded-full shadow-none" aria-hidden>
      <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}
