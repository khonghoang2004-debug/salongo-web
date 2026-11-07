import type { CSSProperties } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, Check, Lock, Play, UserCheck } from "lucide-react";
import { PhoneShot } from "../ui/AppShot";
import { SIGNUP_URL, appLink } from "@/lib/app-links";
import { siteConfig } from "@/lib/metadata";

const BLANK_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const A = "/images/app/";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Hero trang chủ. Dấu hiệu riêng: "đầu móng" đỏ đô (vòm tròn) đứng sau điện thoại, như một móng sơn màu đỏ đô.
// PC (từ 1024 px): chữ bên trái, vòm + điện thoại bên phải cao qua hai hàng, ảnh lịch theo nhân viên trên máy tính
// nằm hàng dưới, luồn dưới vòm. Màn nhỏ hơn: chữ rồi vòm + điện thoại (không tải ảnh máy tính).
export async function HomeHero() {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  const h = await getTranslations("home2");
  const v = await getTranslations("videos");

  let delay = 100;
  const words = (s: string) =>
    s.split(" ").map((w, i) => {
      delay += 45;
      return (
        <span key={i}>
          <span className="sg-word" style={d(delay)}>
            {w}
          </span>{" "}
        </span>
      );
    });

  return (
    <section className="relative overflow-hidden">
      {/* Nền đỏ đô cho nổi bật: phủ cả hero trên màn nhỏ; PC dừng giữa ảnh máy tính để ảnh "bước ra" nền trắng */}
      <div className="absolute inset-x-0 top-0 h-full bg-brand-700 lg:h-[calc(100%-240px)]" aria-hidden />

      <div className="sg-container relative grid px-4 pb-10 pt-7 sm:px-6 sm:pb-12 sm:pt-10 lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:pb-14 lg:pt-12">
        <div className="lg:col-span-7 lg:row-start-1 lg:self-center lg:pb-10">
          <p className="sg-eyebrow sg-in !text-white/85" style={d(0)}>
            {t("badge")}
          </p>

          <h1 className="mt-5 font-display text-[2.625rem] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[3.75rem] lg:mt-7 lg:text-[4rem] xl:text-[4.5rem]">
            <span className="block text-balance">{words(t("title1"))}</span>
            <span className="block text-balance text-[#F7C6D3]">{words(t("titleAccent"))}</span>
          </h1>

          <div className="sg-in mt-8 flex flex-col gap-3 sm:flex-row" style={d(640)}>
            <a href={appLink(SIGNUP_URL, locale)} target="_blank" rel="noopener noreferrer" className="btn-on-gradient sg-arrow sg-arrow-up px-7 text-base">
              {t("cta")}
              <ArrowUpRight className="size-[18px]" aria-hidden />
            </a>
            <a href="#video" className="btn-ghost-light px-6 text-base">
              <Play className="size-4 fill-current" aria-hidden />
              {v("heroVideo")}
            </a>
          </div>

          <ul className="sg-in mt-8 flex flex-col gap-2.5 text-[15px] text-white/85 sm:flex-row sm:flex-wrap sm:gap-x-7" style={d(760)}>
            {(["trial1", "trial2", "trial3"] as const).map((k) => (
              <li key={k} className="flex items-center gap-2.5">
                <Check className="size-4 shrink-0 text-white" strokeWidth={2.5} aria-hidden />
                {t(k)}
              </li>
            ))}
          </ul>
        </div>

        {/* Vòm đỏ đô đậm (trên nền đỏ đô) + điện thoại + thông báo đẩy */}
        <div className="relative z-10 mx-auto mt-12 w-full max-w-[360px] sm:max-w-[400px] lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-0 lg:max-w-none lg:translate-y-28 lg:self-end lg:pl-8">
          <div className="sg-float relative" style={d(700)}>
            <div className="sg-arch sg-arch-deep relative mx-auto aspect-[10/15] w-[86%] [--arch-v:33.3%] lg:aspect-[10/17] lg:[--arch-v:29.4%]" aria-hidden>
              <span className="sg-arch-shine" />
            </div>
            <div className="absolute inset-x-0 bottom-[5%] mx-auto w-[50%]">
              <PhoneShot src={A + "m-lich-hen.webp"} alt={t("imageAltPhone")} priority />
            </div>

            {/* Thông báo đẩy trên điện thoại (minh hoạ, dựng bằng HTML) */}
            <div className="sg-float absolute -left-1 top-[9%] w-[78%] max-w-[300px] rounded-2xl border border-line bg-white p-3 shadow-sg-lg sm:-left-6 lg:-left-4" style={d(1200)} aria-hidden>
              <div className="flex items-center gap-2 text-[12px] text-muted">
                <img src={siteConfig.logo} alt="" width={20} height={20} className="size-5 rounded-md" />
                <span className="font-semibold text-ink/80">{siteConfig.name}</span>
                <span className="ml-auto">{h("notifNow")}</span>
              </div>
              <p className="mt-1.5 text-[14px] font-semibold text-ink">{h("notifTitle")}</p>
              <p className="text-[13px] leading-snug text-ink/70">{h("notifText")}</p>
            </div>

            <div className="sg-float absolute -right-1 bottom-[18%] flex items-center gap-2 rounded-full border border-line bg-white py-2 pl-2 pr-4 text-[13px] font-semibold text-ink shadow-sg-md sm:-right-4 lg:right-0" style={d(1450)} aria-hidden>
              <span className="flex size-7 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <UserCheck className="size-4" />
              </span>
              {h("notifAssigned")}
            </div>
          </div>
        </div>

        {/* Lịch theo nhân viên trên máy tính: chỉ tải từ 1024 px */}
        <div className="relative z-0 hidden lg:col-span-10 lg:col-start-1 lg:row-start-2 lg:mt-6 lg:block">
          <div className="sg-stage" style={d(520)}>
            <div className="sg-browser shadow-sg-xl">
              <div className="sg-browser-bar">
                <span className="sg-browser-dot" />
                <span className="sg-browser-dot" />
                <span className="sg-browser-dot" />
                <span className="mx-auto flex h-6 w-full max-w-[240px] items-center justify-center gap-1.5 rounded-full border border-line bg-white px-2 text-[11px] text-muted">
                  <Lock className="size-3" aria-hidden />
                  app.salongo.eu
                </span>
                <span className="w-[42px]" aria-hidden />
              </div>
              <picture>
                <source media="(max-width: 1023.98px)" srcSet={BLANK_GIF} />
                <img
                  src={A + "lich-hen-nhan-vien.webp"}
                  alt={t("imageAlt")}
                  width={1600}
                  height={1000}
                  className="block h-auto w-full"
                  fetchPriority="high"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
