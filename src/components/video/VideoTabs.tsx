"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FEATURE_ICONS } from "../featuresData";
import { VIDEOS, type VideoId } from "@/lib/videos";
import { FeatureVideo } from "./FeatureVideo";

export type VideoTabItem = { id: VideoId; tab: string; title: string; desc: string; anchor: string };

const ICON: Record<VideoId, keyof typeof FEATURE_ICONS> = {
  booking: "calendar",
  checkout: "checkout",
  marketing: "marketing",
  payroll: "payroll",
  branches: "branches",
};

// Khu xem video trang chủ: chọn tính năng (PC: danh sách bên trái, mobile: chip cuộn ngang), video bên phải
export function VideoTabs({ items, playLabel, note, moreLabel }: { items: VideoTabItem[]; playLabel: string; note: string; moreLabel: string }) {
  const [active, setActive] = useState(0);
  const chips = useRef<HTMLDivElement>(null);
  const cur = items[active];
  const video = VIDEOS.find((v) => v.id === cur.id)!;

  useEffect(() => {
    const row = chips.current;
    const chip = row?.querySelectorAll("button")[active];
    if (row && chip) row.scrollTo({ left: chip.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  return (
    <div data-reveal className="mt-7 lg:mt-12 lg:grid lg:grid-cols-12 lg:gap-10">
      <div ref={chips} className="relative -mx-3 overflow-x-auto px-3 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:hidden" role="tablist">
        <div className="flex w-max gap-2">
          {items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`min-h-11 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors ${
                i === active ? "border-brand-700 bg-brand-700 text-white" : "border-line bg-white text-ink/80"
              }`}
            >
              {it.tab}
            </button>
          ))}
        </div>
      </div>

      <ul className="hidden lg:col-span-4 lg:flex lg:flex-col lg:gap-2" role="tablist" aria-orientation="vertical">
        {items.map((it, i) => {
          const Icon = FEATURE_ICONS[ICON[it.id]];
          const on = i === active;
          const v = VIDEOS.find((x) => x.id === it.id)!;
          return (
            <li key={it.id}>
              <button
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={`group flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all ${
                  on ? "border-brand-700/25 bg-white shadow-[0_1px_4px_rgba(77,0,20,0.10)]" : "border-transparent hover:bg-white/70"
                }`}
              >
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    on ? "bg-brand-700 text-white" : "bg-white text-brand-700 ring-1 ring-line"
                  }`}
                  aria-hidden
                >
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-[17px] font-semibold tracking-[-0.01em] ${on ? "text-ink" : "text-ink/70 group-hover:text-ink"}`}>{it.title}</span>
                  <span className="mt-0.5 block text-[13px] text-muted">{v.duration}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 lg:col-span-8 lg:mt-0">
        <FeatureVideo key={cur.id} video={video} title={cur.title} playLabel={playLabel} note={note} />
        <div className="mt-5 flex flex-col gap-3 px-1 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div>
            <h3 key={cur.id} className="sg-fade text-lg font-semibold tracking-[-0.01em] text-ink sm:text-xl">{cur.title}</h3>
            <p className="mt-1.5 max-w-[560px] text-[15px] leading-relaxed text-muted">{cur.desc}</p>
          </div>
          <Link
            href={`/tinh-nang#${cur.anchor}`}
            className="sg-arrow inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            {moreLabel}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
