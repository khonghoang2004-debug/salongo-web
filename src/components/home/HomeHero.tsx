import type { CSSProperties } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, Check, Lock, Play } from "lucide-react";
import { CountUp } from "../motion/CountUp";
import { PhoneShot } from "../ui/AppShot";
import { SIGNUP_URL, appLink } from "@/lib/app-links";

const stats = [
  { value: "stat1Value", label: "stat1Label" },
  { value: "stat2Value", label: "stat2Label" },
] as const;

const BLANK_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Hero trang chủ: tiêu đề lớn căn trái hiện từng chữ, dưới là dải lợi ích + nút ngăn bằng đường kẻ,, ảnh chụp app thật (PC + điện thoại) nghiêng rồi đặt thẳng
export async function HomeHero() {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  const h = await getTranslations("home2");
  const v = await getTranslations("videos");

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
      <section>
        <div className="sg-panel overflow-hidden !border-brand-800 !bg-brand-700">
          <div className="mx-auto max-w-[1200px] px-4 pb-9 pt-8 sm:px-8 sm:pb-0 sm:pt-14 lg:pt-16">
            <span className="sg-eyebrow sg-in !text-white/80" style={d(0)}>
              {t("badge")}
            </span>

            <h1 className="mt-5 font-display text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-[3.5rem] lg:mt-7 lg:text-[4.25rem] xl:text-[4.75rem]">
              <span className="block">{words(t("title1"))}</span>
              <span className="block text-[#F7C6D3]">{words(t("titleAccent"))}</span>
            </h1>

            <div className="sg-in mt-8 grid gap-6 border-t border-white/20 pt-6 lg:grid-cols-12 lg:items-center lg:gap-10" style={d(680)}>
              <ul className="flex flex-col gap-2 text-[15px] text-white/85 sm:flex-row sm:flex-wrap sm:gap-x-7 lg:col-span-6">
                {(["trial1", "trial2", "trial3"] as const).map((k) => (
                  <li key={k} className="flex items-center gap-2.5">
                    <Check className="size-4 shrink-0 text-white" strokeWidth={2.5} aria-hidden />
                    {t(k)}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2.5 sm:flex-row lg:col-span-6 lg:justify-end [&>a]:whitespace-nowrap">
                <a
                  href={appLink(SIGNUP_URL, locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-on-gradient sg-arrow sg-arrow-up min-h-12 px-6 text-base"
                >
                  {t("cta")}
                  <ArrowUpRight className="size-[18px]" aria-hidden />
                </a>
                <a href="#video" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/40 px-6 text-base font-semibold text-white transition-colors hover:bg-white/10">
                  <Play className="size-[18px] fill-current" aria-hidden />
                  {v("heroVideo")}
                </a>
              </div>
            </div>
          </div>

          {/* Sân khấu ảnh app: ảnh hiển thị trọn vẹn. Điện thoại: ẩn để màn hình đầu gọn */}
          <div className="relative mx-auto mt-8 hidden max-w-[1180px] sm:block px-3 pb-4 sm:mt-12 sm:px-10 sm:pb-12 lg:mt-14 lg:px-16 lg:pb-16">
            {/* Ảnh máy tính (từ sm trở lên) */}
            <div className="sg-stage">
              <div className="sg-browser border-white/20 shadow-[0_6px_20px_rgba(20,0,6,0.28)]">
                <div className="sg-browser-bar">
                  <span className="sg-browser-dot" />
                  <span className="sg-browser-dot" />
                  <span className="sg-browser-dot" />
                  <span className="mx-auto hidden h-6 w-full max-w-[240px] items-center justify-center gap-1.5 rounded-md border border-line bg-white px-2 text-[11px] text-muted sm:flex">
                    <Lock className="size-3" aria-hidden />
                    app.salongo.eu
                  </span>
                  <span className="hidden w-[42px] sm:block" aria-hidden />
                </div>
                {/* Điện thoại không tải ảnh này (khung bị ẩn): nguồn rỗng 1×1 cho màn hẹp */}
                <picture>
                  <source media="(max-width: 639.98px)" srcSet={BLANK_GIF} />
                  <img
                    src="/images/app/tong-quan.webp"
                    alt={t("imageAlt")}
                    width={1600}
                    height={1000}
                    className="block h-auto w-full"
                    fetchPriority="high"
                  />
                </picture>
              </div>
            </div>

            {/* Cùng màn Tổng quan trên điện thoại (PC: nổi góc phải; mobile: không hiện để ảnh PC đủ lớn) */}
            <div className="sg-float absolute bottom-6 right-2 hidden w-[190px] lg:block xl:-right-4 xl:w-[210px]" style={d(1300)}>
              <PhoneShot src="/images/app/m-tong-quan.webp" alt={t("imageAltPhone")} />
            </div>
          </div>
        </div>
      </section>

      {/* Dải số liệu, số đếm lên khi cuộn tới */}
      <section className="px-4 sm:px-8">
        <div className="sg-container grid gap-6 border-b border-line py-8 sm:py-10 lg:grid-cols-12 lg:items-center">
          <p data-reveal className="max-w-md text-[15px] font-medium leading-relaxed text-muted sm:text-base lg:col-span-6">
            {h("statsTitle")}
          </p>
          <dl data-stagger className="grid grid-cols-2 lg:col-span-6">
            {stats.map(({ value, label }, i) => (
              <div key={value} className={`flex flex-col-reverse justify-end ${i ? "border-l border-line pl-6 sm:pl-10" : ""}`}>
                <dt className="mt-1 text-sm text-muted">{t(label)}</dt>
                <dd className="font-display text-[2.25rem] font-semibold leading-none tracking-[-0.04em] text-ink sm:text-[3rem]">
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
