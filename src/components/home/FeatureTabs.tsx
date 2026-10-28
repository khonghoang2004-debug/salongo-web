"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FEATURE_ICONS, type FeatureId } from "../featuresData";

export type FeatureTabItem = {
  id: FeatureId;
  anchor: string;
  img: string;
  short: string;
  title: string;
  desc: string;
};

// Danh sách tính năng bên trái, ảnh app nguyên vẹn bên phải; mobile: chip cuộn ngang
export function FeatureTabs({ items, moreLabel }: { items: FeatureTabItem[]; moreLabel: string }) {
  const [active, setActive] = useState(0);
  const cur = items[active];

  return (
    <div className="mt-12 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-12">
      {/* Mobile: chip chọn tính năng */}
      <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:hidden" role="tablist" aria-label={moreLabel}>
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
            <li key={it.id} className="border-b border-line">
              <button
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
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
                  {on && <span className="mt-2 block text-[15px] leading-relaxed text-muted">{it.desc}</span>}
                </span>
              </button>
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
            <img
              key={cur.img}
              src={cur.img}
              alt={cur.title}
              width={2400}
              height={1570}
              loading="lazy"
              className="sg-fade block h-auto w-full"
            />
          </div>
          <div className="mt-5 px-1 lg:hidden">
            <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">{cur.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{cur.desc}</p>
          </div>
          <Link
            href={`/tinh-nang#${cur.anchor}`}
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full px-1 text-sm font-semibold text-brand-700 hover:text-brand-800 lg:mt-6"
          >
            {moreLabel}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
