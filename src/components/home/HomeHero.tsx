import type { CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight, Check, Lock } from "lucide-react";
import { CountUp } from "../motion/CountUp";
import { DemoNote, PhoneShot } from "../ui/AppShot";
import { SIGNUP_URL } from "@/lib/app-links";

const stats = [
  { value: "stat1Value", label: "stat1Label" },
  { value: "stat2Value", label: "stat2Label" },
  { value: "stat3Value", label: "stat3Label" },
  { value: "stat4Value", label: "stat4Label" },
] as const;

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Hero trang chủ: tiêu đề lớn căn giữa hiện từng chữ, ảnh chụp app thật (PC + điện thoại) nghiêng rồi đặt thẳng
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
      <section className="pt-1.5 sm:pt-3">
        <div className="sg-panel overflow-hidden">
          <div className="mx-auto max-w-[1160px] px-4 pt-7 text-center sm:px-8 sm:pt-14 lg:pt-16">
            <span className="sg-eyebrow sg-in" style={d(0)}>
              <span className="size-1.5 rounded-full bg-brand-700" aria-hidden />
              {t("badge")}
            </span>

            <h1 className="mt-5 font-display text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.04em] text-ink text-balance sm:text-[3.75rem] lg:text-[4.25rem] xl:text-[4.625rem]">
              <span className="block">{words(t("title1"))}</span>
              <span className="block text-brand-700">{words(t("titleAccent"))}</span>
            </h1>

            <p className="sg-lead sg-in mx-auto mt-5 max-w-[640px]" style={d(560)}>
              {t("subtitle")}
            </p>

            <div className="sg-in mt-7 flex flex-col justify-center gap-2.5 sm:flex-row" style={d(680)}>
              <a
                href={SIGNUP_URL}
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

            <ul className="sg-in mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted" style={d(780)}>
              {(["trial1", "trial2", "trial3"] as const).map((k) => (
                <li key={k} className="flex items-center gap-1.5">
                  <Check className="size-4 text-brand-700" strokeWidth={2.5} aria-hidden />
                  {t(k)}
                </li>
              ))}
            </ul>
          </div>

          {/* Sân khấu ảnh app: ảnh hiển thị trọn vẹn */}
          <div className="relative mx-auto mt-8 max-w-[1180px] px-3 pb-4 sm:mt-12 sm:px-10 sm:pb-12 lg:mt-14 lg:px-16 lg:pb-16">
            {/* Điện thoại: ảnh chụp app bản mobile, đọc được chữ */}
            <PhoneShot src="/images/app/m-tong-quan.webp" alt={t("imageAltPhone")} priority className="sg-stage mx-auto max-w-[270px] sm:hidden" />
            <div className="sg-stage max-sm:hidden" style={d(600)}>
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
                  src="/images/app/tong-quan.webp"
                  alt={t("imageAlt")}
                  width={1600}
                  height={1000}
                  className="block h-auto w-full"
                  fetchPriority="high"
                />
              </div>
            </div>

            {/* Cùng màn Tổng quan trên điện thoại (PC: nổi góc phải; mobile: không hiện để ảnh PC đủ lớn) */}
            <div className="sg-float absolute bottom-6 right-2 hidden w-[190px] lg:block xl:-right-4 xl:w-[210px]" style={d(1300)}>
              <PhoneShot src="/images/app/m-tong-quan.webp" alt={t("imageAltPhone")} priority />
            </div>
            <DemoNote text={h("demoNote")} className="mt-4 justify-center lg:justify-start" />
          </div>
        </div>
      </section>

      {/* Dải số liệu, số đếm lên khi cuộn tới */}
      <section className="px-3 pb-2 pt-10 sm:px-6 sm:pt-16 lg:px-8">
        <div className="sg-container">
          <p data-reveal className="mx-auto max-w-2xl text-center text-[15px] font-medium text-muted sm:text-base">
            {h("statsTitle")}
          </p>
          <dl data-stagger className="mt-7 grid grid-cols-2 gap-x-4 gap-y-7 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-line">
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
