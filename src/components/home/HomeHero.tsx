import type { CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight, BellRing, Check, Lock, TrendingUp } from "lucide-react";
import { CountUp } from "../motion/CountUp";

const stats = [
  { value: "stat1Value", label: "stat1Label" },
  { value: "stat2Value", label: "stat2Label" },
  { value: "stat3Value", label: "stat3Label" },
  { value: "stat4Value", label: "stat4Label" },
] as const;

// Cột doanh thu trong thẻ nổi (cột cuối là hôm nay)
const BARS = [38, 52, 44, 66, 58, 74, 92];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Hero trang chủ: tiêu đề lớn căn giữa hiện từng chữ, ảnh app nghiêng rồi đặt thẳng, thẻ số liệu nổi hai bên
export async function HomeHero() {
  const t = await getTranslations("hero");
  const h = await getTranslations("home2");

  let delay = 120;
  const words = (s: string) =>
    s.split(" ").map((w, i) => {
      delay += 60;
      return (
        <span key={i}>
          <span className="sg-word" style={d(delay)}>
            {w}
          </span>{" "}
        </span>
      );
    });

  return (
    <>
      <section className="pt-2 sm:pt-3">
        <div className="sg-panel overflow-hidden">
          <div className="mx-auto max-w-[1160px] px-5 pt-14 text-center sm:px-8 sm:pt-20 lg:pt-24">
            <span className="sg-eyebrow sg-in" style={d(0)}>
              <span className="size-1.5 rounded-full bg-brand-700" aria-hidden />
              {t("badge")}
            </span>

            <h1 className="mt-7 font-display text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.04em] text-ink text-balance sm:text-[3.75rem] lg:text-[4.25rem] xl:text-[4.625rem]">
              <span className="block">{words(t("title1"))}</span>
              <span className="block text-brand-700">{words(t("titleAccent"))}</span>
            </h1>

            <p className="sg-lead sg-in mx-auto mt-7 max-w-[640px]" style={d(560)}>
              {t("subtitle")}
            </p>

            <div className="sg-in mt-9 flex flex-col justify-center gap-3 sm:flex-row" style={d(680)}>
              <a
                href="https://app.salongo.eu/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary sg-arrow sg-arrow-up px-7 py-4 text-base"
              >
                {t("cta")}
                <ArrowUpRight className="size-[18px]" aria-hidden />
              </a>
              <Link href="/tinh-nang" className="btn-secondary sg-arrow px-7 py-4 text-base">
                {t("ctaSecondary")}
                <ArrowRight className="size-[18px]" aria-hidden />
              </Link>
            </div>

            <ul className="sg-in mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted" style={d(780)}>
              {(["trial1", "trial2", "trial3"] as const).map((k) => (
                <li key={k} className="flex items-center gap-1.5">
                  <Check className="size-4 text-brand-700" strokeWidth={2.5} aria-hidden />
                  {t(k)}
                </li>
              ))}
            </ul>
          </div>

          {/* Sân khấu ảnh app: ảnh hiển thị trọn vẹn */}
          <div className="relative mx-auto mt-14 max-w-[1180px] px-3 pb-3 sm:mt-16 sm:px-10 sm:pb-16 lg:mt-20 lg:px-16 lg:pb-24">
            <div className="sg-stage" style={d(600)}>
              <div className="sg-browser shadow-[0_50px_100px_-50px_rgba(77,0,20,0.45)]">
                <div className="sg-browser-bar">
                  <span className="sg-browser-dot" />
                  <span className="sg-browser-dot" />
                  <span className="sg-browser-dot" />
                  <span className="mx-auto hidden h-6 w-full max-w-[240px] items-center justify-center gap-1.5 rounded-full border border-line bg-white px-2 text-[11px] text-muted sm:flex">
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
            </div>

            {/* Thẻ doanh thu hôm nay (PC) */}
            <div
              className="sg-float absolute bottom-8 left-6 hidden w-[300px] items-center gap-5 rounded-2xl border border-line bg-white p-4 text-left shadow-[0_24px_48px_-24px_rgba(77,0,20,0.35)] lg:flex xl:-left-2"
              style={d(1300)}
              aria-hidden
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted">{t("revenueToday")}</p>
                <p className="mt-0.5 font-display text-[1.5rem] font-semibold tracking-[-0.03em] text-ink">{h("revenueValue")}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-brand-700">
                  <TrendingUp className="size-3.5 shrink-0" />
                  {h("revenueDelta")}
                </p>
              </div>
              <div className="flex h-14 w-[92px] shrink-0 items-end gap-1">
                {BARS.map((v, i) => (
                  <span
                    key={i}
                    className={`sg-bar flex-1 rounded-[4px] ${i === BARS.length - 1 ? "bg-brand-700" : "bg-brand-100"}`}
                    style={{ height: `${v}%`, ...d(1450 + i * 70) }}
                  />
                ))}
              </div>
            </div>

            {/* Thẻ lịch hẹn mới */}
            <div
              className="sg-float mx-auto mt-4 flex max-w-[340px] items-center gap-3 rounded-2xl border border-line bg-white p-3.5 text-left shadow-[0_24px_48px_-24px_rgba(77,0,20,0.35)] sm:absolute sm:bottom-6 sm:right-6 sm:mt-0 sm:w-[330px] lg:bottom-8 xl:-right-2"
              style={d(1500)}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <BellRing className="size-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">{h("notifTitle")}</p>
                <p className="truncate text-[13px] text-muted">{h("notifText")}</p>
              </div>
              <span className="rounded-full bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white">{h("notifAction")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dải số liệu, số đếm lên khi cuộn tới */}
      <section className="px-4 pb-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
        <div className="sg-container">
          <p data-reveal className="mx-auto max-w-2xl text-center text-[15px] font-medium text-muted sm:text-base">
            {h("statsTitle")}
          </p>
          <dl data-stagger className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-line">
            {stats.map(({ value, label }) => (
              <div key={value} className="flex flex-col-reverse justify-end text-center lg:px-6">
                <dt className="mt-2 text-sm text-muted">{t(label)}</dt>
                <dd className="font-display text-[2.25rem] font-semibold tracking-[-0.04em] text-ink sm:text-[3.25rem]">
                  <CountUp value={t(value)} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
