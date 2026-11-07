"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SHOT } from "../featuresData";
import { PhoneShot } from "../ui/AppShot";

export type FeatureTabItem = {
  id: string;
  /** Mốc giờ trong ngày ("07:40") hoặc nhãn ("Cuối tháng"): như một dòng trong sổ hẹn */
  time: string;
  anchor: string;
  img: string;
  /** Ảnh chụp bản điện thoại, hiện thay ảnh PC trên màn hình nhỏ */
  mobile: string;
  title: string;
  desc: string;
};

const AUTO_MS = 7000;

// "Một ngày ở tiệm": danh sách mốc giờ bên trái (PC), ảnh app nguyên vẹn bên phải; mobile: chip giờ cuộn ngang.
// Tự chuyển khi khối đang trong màn hình, dừng hẳn khi người dùng tự chọn hoặc rê chuột vào.
export function FeatureTabs({ items, moreLabel, listLabel }: { items: FeatureTabItem[]; moreLabel: string; listLabel: string }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const chips = useRef<HTMLDivElement>(null);
  const cur = items[active];

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setAuto(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = auto && !paused;
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % items.length), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [running, active, items.length]);

  // Mobile: giữ chip đang chọn trong tầm nhìn (chỉ cuộn ngang)
  useEffect(() => {
    const row = chips.current;
    const chip = row?.querySelectorAll("button")[active];
    if (row && chip) row.scrollTo({ left: chip.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  const pick = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  return (
    <div ref={ref} data-reveal className="mt-7 lg:mt-10 lg:grid lg:grid-cols-12 lg:gap-12" onMouseEnter={() => setPaused(true)}>
      {/* Mobile / tablet: chip mốc giờ */}
      <div ref={chips} className="no-scrollbar relative -mx-4 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:hidden" role="tablist" aria-label={listLabel}>
        <div className="flex w-max gap-2">
          {items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => pick(i)}
              className={`flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors ${
                i === active ? "border-brand-700 bg-brand-700 text-white" : "border-line bg-white text-ink/80"
              }`}
            >
              <span className={`font-display text-[1.0625rem] tabular-nums ${i === active ? "text-white" : "text-brand-700"}`}>{it.time}</span>
            </button>
          ))}
        </div>
      </div>

      {/* PC: sổ hẹn — mỗi dòng một mốc giờ */}
      <ol className="hidden border-t border-line lg:col-span-5 lg:block" role="tablist" aria-label={listLabel} aria-orientation="vertical">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <li key={it.id} className="relative border-b border-line">
              <button type="button" role="tab" aria-selected={on} onClick={() => pick(i)} className="group grid w-full grid-cols-[7.75rem_1fr] items-baseline gap-4 py-4 text-left">
                <span className={`whitespace-nowrap font-display text-[1.375rem] tabular-nums leading-tight transition-colors ${on ? "text-brand-700" : "text-ink/55 group-hover:text-ink"}`}>
                  {it.time}
                </span>
                <span className="min-w-0">
                  <span className={`block text-[16px] font-semibold leading-snug tracking-[-0.01em] transition-colors ${on ? "text-ink" : "text-ink/60 group-hover:text-ink"}`}>
                    {it.title}
                  </span>
                  {on && <span className="sg-fade mt-2 block text-[15px] leading-relaxed text-muted">{it.desc}</span>}
                </span>
              </button>
              {on && (
                <span className="absolute inset-x-0 -bottom-px h-[2px] overflow-hidden" aria-hidden>
                  <span key={`${active}-${running}`} className={`block h-full bg-brand-700 ${running ? "sg-progress" : ""}`} style={{ animationDuration: `${AUTO_MS}ms` }} />
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {/* Ảnh + mô tả */}
      <div className="mt-4 lg:col-span-7 lg:mt-0" role="tabpanel">
        {/* Mobile / tablet: chọn giờ là thấy ngay tiêu đề + mô tả, ngay dưới hàng chip, trước ảnh */}
        <div className="mb-5 lg:hidden">
          <h3 key={cur.id} className="sg-fade text-[1.1875rem] font-semibold leading-snug tracking-[-0.01em] text-ink">
            <span className="mr-2 font-display tabular-nums text-brand-700">{cur.time}</span>
            {cur.title}
          </h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{cur.desc}</p>
        </div>
        <div className="lg:sticky lg:top-28">
          {/* Từ 640 px: ảnh máy tính trên nền nude */}
          <div className="rounded-[28px] bg-nude p-4 max-sm:hidden sm:p-8 lg:p-10">
            <div className="sg-browser">
              <div className="sg-browser-bar">
                <span className="sg-browser-dot" />
                <span className="sg-browser-dot" />
                <span className="sg-browser-dot" />
              </div>
              <img key={cur.img} src={cur.img} alt={cur.title} width={SHOT.w} height={SHOT.h} loading="lazy" decoding="async" className="sg-swap block h-auto w-full" />
            </div>
          </div>

          {/* Điện thoại: ảnh app trên điện thoại, đứng trước một "đầu móng" nude */}
          <div className="relative mx-auto max-w-[280px] sm:hidden">
            <div className="sg-arch-nude absolute inset-x-[6%] bottom-0 top-[8%]" aria-hidden />
            <PhoneShot key={cur.mobile} src={cur.mobile} alt={cur.title} className="sg-swap relative mx-auto w-[74%]" />
          </div>

          <Link
            href={`/tinh-nang#${cur.anchor}`}
            className="sg-arrow mt-3 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-brand-700 hover:text-brand-800 lg:mt-5"
          >
            {moreLabel}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
