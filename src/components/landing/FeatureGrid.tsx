import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SHOTS, type ShotId } from "@/lib/media";
import { SectionHead } from "./SectionHead";

/**
 * Trang chủ: lưới "bento" 7 ô, mỗi ô là tên tính năng + một góc ảnh chụp thật của app (không mô tả dài,
 * owner 2026-11-22: chỉ tiêu đề; chi tiết ở /tinh-nang).
 * Điện thoại: 2 cột, ô lớn chiếm cả hàng. Máy tính: 6 cột (4+2 / 2+2+2 / 3+3).
 */
type Tile = { key: string; shot: ShotId; kind: "desktop" | "phone"; span: string; tint: string };
const TILES: Tile[] = [
  { key: "calendar", shot: "calendar", kind: "desktop", span: "col-span-2 lg:col-span-4", tint: "bg-porcelain" },
  { key: "online", shot: "booking", kind: "phone", span: "col-span-1 lg:col-span-2", tint: "bg-[#F3EEF7]" },
  { key: "checkout", shot: "checkout", kind: "phone", span: "col-span-1 lg:col-span-2", tint: "bg-blush/70" },
  { key: "thuchi", shot: "thuchi", kind: "phone", span: "col-span-1 lg:col-span-2", tint: "bg-[#EDF4EF]" },
  { key: "customers", shot: "customers", kind: "phone", span: "col-span-1 lg:col-span-2", tint: "bg-[#F6F1E8]" },
  { key: "payroll", shot: "payroll", kind: "desktop", span: "col-span-2 lg:col-span-3", tint: "bg-[#F6F1E8]" },
  { key: "branches", shot: "branches", kind: "desktop", span: "col-span-2 lg:col-span-3", tint: "bg-porcelain" },
];

export async function FeatureGrid() {
  const t = await getTranslations("landing.features");
  return (
    <section className="x-section bg-white" aria-labelledby="features-title">
      <div className="x-wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead id="features-title" eyebrow={t("eyebrow")} title={t("title")} className="max-w-[44rem]" />
          <Link href="/tinh-nang" className="x-link shrink-0">
            {t("all")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul data-stagger className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-14 lg:grid-cols-6 lg:gap-5">
          {TILES.map((tile) => {
            const s = SHOTS[tile.shot];
            const phone = tile.kind === "phone";
            return (
              <li
                key={tile.key}
                className={`relative flex flex-col overflow-hidden rounded-[22px] ring-1 ring-black/[0.05] ${tile.tint} ${tile.span}`}
              >
                <h3 className="px-4 pt-4 text-[15.5px] font-semibold leading-snug tracking-[-0.01em] text-ink sm:px-6 sm:pt-6 sm:text-[1.125rem]">
                  {t(`${tile.key}.title`)}
                </h3>
                <div
                  className={`mt-4 overflow-hidden sm:mt-5 ${
                    phone ? "mx-auto h-[200px] w-[78%] sm:h-[280px] sm:w-[62%] lg:h-[300px]" : "ml-4 h-[190px] sm:ml-6 sm:h-[280px] lg:h-[300px]"
                  }`}
                >
                  <img
                    src={phone ? s.phone : s.desktop}
                    alt=""
                    width={phone ? s.pw : s.dw}
                    height={phone ? s.ph : s.dh}
                    loading="lazy"
                    decoding="async"
                    className={`block h-auto ring-1 ring-black/[0.07] ${
                      phone
                        ? "w-full rounded-t-[18px] shadow-[0_18px_40px_-24px_rgba(42,15,23,0.45)]"
                        : "w-[160%] max-w-none rounded-tl-[12px] shadow-[0_18px_40px_-24px_rgba(42,15,23,0.4)] sm:w-[130%] lg:w-[112%]"
                    }`}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
