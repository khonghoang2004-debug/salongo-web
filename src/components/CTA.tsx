import type { CSSProperties } from "react";
import { appLink, SIGNUP_URL } from "@/lib/app-links";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type CtaBandProps = {
  title: string;
  subtitle?: string;
  button: string;
  secondaryLabel?: string;
};

// Dải kêu gọi hành động: nền đỏ đô đặc, tiêu đề chữ có chân + nút bên trái; bên phải là hàng "móng mẫu"
// như bảng màu sơn ở quầy tiệm nail (chỉ trang trí)
export function CtaBand({ title, subtitle, button, secondaryLabel }: CtaBandProps) {
  const locale = useLocale();
  return (
    <section>
      <div className="sg-hero-card px-4 py-14 sm:px-8 sm:py-20 lg:py-24">
        <div className="sg-container relative grid gap-12 lg:grid-cols-12 lg:items-end">
          <div data-reveal className="lg:col-span-7" style={{ "--d": "120ms" } as CSSProperties}>
            <h2 className="max-w-3xl font-display text-[2.125rem] font-medium leading-[1.14] tracking-[-0.015em] text-balance sm:text-[3rem] lg:text-[3.75rem]">
              {title}
            </h2>
            {subtitle && <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{subtitle}</p>}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={appLink(SIGNUP_URL, locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-on-gradient sg-arrow sg-arrow-up px-7 text-base"
              >
                {button}
                <ArrowUpRight className="size-[18px]" aria-hidden />
              </a>
              {secondaryLabel && (
                <Link href="/lien-he" className="btn-ghost-light px-7 text-base">
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
          <NailSwatches />
        </div>
      </div>
    </section>
  );
}

// Năm móng mẫu cao thấp khác nhau, các sắc đỏ đô và nude của SalonGo
const SWATCHES = [
  { h: 62, c: "#F7F1EF" },
  { h: 80, c: "#CF8396" },
  { h: 100, c: "#FFFFFF" },
  { h: 86, c: "#66001A" },
  { h: 70, c: "transparent" },
];

function NailSwatches() {
  return (
    <div className="hidden items-end justify-end gap-3 sm:flex lg:col-span-5 lg:gap-4" aria-hidden>
      {SWATCHES.map(({ h, c }, i) => (
        <span
          key={i}
          className="relative block w-14 border border-white/25 lg:w-[72px]"
          style={{ height: `${h * 2.2}px`, background: c, borderRadius: "50% 50% 14px 14px / 36px 36px 14px 14px" }}
        >
          <span className="absolute left-[22%] top-[12%] h-[26%] w-[3px] rounded-full bg-white/35 mix-blend-overlay" />
        </span>
      ))}
    </div>
  );
}

export async function CTA() {
  const t = await getTranslations("cta");
  const tNav = await getTranslations("nav");
  return <CtaBand title={t("title")} subtitle={t("subtitle")} button={t("button")} secondaryLabel={tNav("contact")} />;
}
