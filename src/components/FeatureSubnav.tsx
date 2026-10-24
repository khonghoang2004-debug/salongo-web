"use client";

import { useEffect, useRef, useState } from "react";
import { FEATURE_ICONS, type FeatureId } from "./featuresData";

type Item = { id: FeatureId; anchor: string; label: string };

// Thanh chọn tính năng dính dưới menu: tô sáng phần đang xem, bấm để nhảy tới
export function FeatureSubnav({ items, label }: { items: Item[]; label: string }) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.anchor))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  // Giữ nút đang chọn trong tầm nhìn khi thanh cuộn ngang (mobile)
  useEffect(() => {
    const list = listRef.current;
    const btn = list?.querySelector<HTMLElement>(`[data-anchor="${active}"]`);
    if (!list || !btn) return;
    const left = btn.offsetLeft - list.clientWidth / 2 + btn.clientWidth / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label={label}
      className="sticky top-[65px] z-30 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85"
    >
      <div
        ref={listRef}
        className="mx-auto flex max-w-6xl gap-1.5 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:px-6 lg:justify-center lg:px-8"
      >
        {items.map(({ id, anchor, label: text }) => {
          const Icon = FEATURE_ICONS[id];
          const on = active === anchor;
          return (
            <a
              key={id}
              href={`#${anchor}`}
              data-anchor={anchor}
              aria-current={on ? "true" : undefined}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-200 ${
                on ? "bg-violet-50 text-violet-700 ring-1 ring-violet-200" : "text-muted hover:bg-neutral-50 hover:text-ink"
              }`}
            >
              <Icon className="size-4" aria-hidden />
              {text}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
