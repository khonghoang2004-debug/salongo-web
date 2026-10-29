"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FEATURE_ICONS, type FeatureId } from "../featuresData";

export type FeatureTabItem = {
  id: FeatureId;
  anchor: string;
  img?: string;
  // Minh hoạ vẽ bằng giao diện, dùng thay ảnh chụp khi tính năng không có ảnh
  visual?: ReactNode;
  short: string;
  title: string;
  desc: string;
};

const AUTO_MS = 6000;

// Danh sách tính năng bên trái, ảnh app nguyên vẹn bên phải; mobile: chip cuộn ngang
export function FeatureTabs({ items, moreLabel }: { items: FeatureTabItem[]; moreLabel: string }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const chips = useRef<HTMLDivElement>(null);
  const cur = items[active];

  // Tự chuyển tính năng khi khối đang trong màn hình; dừng hẳn khi người dùng tự bấm
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
    <div
      ref={ref}
      data-reveal
      className="mt-12 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-12"
      onMouseEnter={() => setPaused(true)}
    >
      {/* Mobile: chip chọn tính năng */}
      <div ref={chips} className="relative -mx-4 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:hidden" role="tablist" aria-label={moreLabel}>
        <div className="flex w-max gap-2">
          {items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => pick(i)}
              className={`min-h-11 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors ${
                i === active ? "border-brand-700 bg-brand-700 text-white" : "border-line bg-white text-ink/80"
              }`}
            >
              {it.short}
            </button>
          ))}
        </div>
      </div>

      {/* PC: danh sách tính năng */}
      <ul className="hidden border-t border-line lg:col-span-5 lg:block" role="tablist" aria-orientation="vertical">
        {items.map((it, i) => {
          const Icon = FEATURE_ICONS[it.id];
          const on = i === active;
          return (
            <li key={it.id} className="relative border-b border-line">
              <button
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => pick(i)}
                className="group flex w-full items-start gap-4 py-5 text-left"
              >
                <span
                  className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    on ? "bg-brand-700 text-white" : "bg-brand-50 text-brand-700"
                  }`}
                  aria-hidden
                >
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-lg font-semibold tracking-[-0.01em] transition-colors ${
                      on ? "text-ink" : "text-ink/60 group-hover:text-ink"
                    }`}
                  >
                    {it.title}
                  </span>
                  {on && <span className="sg-fade mt-2 block text-[15px] leading-relaxed text-muted">{it.desc}</span>}
                </span>
              </button>
              {on && (
                <span className="absolute inset-x-0 -bottom-px h-px overflow-hidden" aria-hidden>
                  <span
                    key={`${active}-${running}`}
                    className={`block h-full bg-brand-700 ${running ? "sg-progress" : ""}`}
                    style={{ animationDuration: `${AUTO_MS}ms` }}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {/* Ảnh + mô tả */}
      <div className="mt-6 lg:col-span-7 lg:mt-0">
        <div className="rounded-[24px] bg-brand-50 p-3 sm:p-6 lg:sticky lg:top-24 lg:p-8">
          <div className="sg-browser">
            <div className="sg-browser-bar">
              <span className="sg-browser-dot" />
              <span className="sg-browser-dot" />
              <span className="sg-browser-dot" />
              <span className="ml-2 truncate text-xs font-medium text-muted">{cur.short}</span>
            </div>
            {cur.img ? (
              <img
                key={cur.img}
                src={cur.img}
                alt={cur.title}
                width={2400}
                height={1570}
                loading="lazy"
                className="sg-swap block h-auto w-full"
              />
            ) : (
              <div key={cur.id} className="sg-swap">
                {cur.visual}
              </div>
            )}
          </div>
          <div className="mt-5 px-1 lg:hidden">
            <h3 key={cur.id} className="sg-fade text-lg font-semibold tracking-[-0.01em] text-ink">{cur.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{cur.desc}</p>
          </div>
          <Link
            href={`/tinh-nang#${cur.anchor}`}
            className="sg-arrow mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full px-1 text-sm font-semibold text-brand-700 hover:text-brand-800 lg:mt-6"
          >
            {moreLabel}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
