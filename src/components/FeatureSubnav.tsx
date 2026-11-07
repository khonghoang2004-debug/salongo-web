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
      className="sticky top-16 z-30 border-b border-line bg-white lg:top-[72px]"
    >
      <div
        ref={listRef}
        className="no-scrollbar mx-auto flex max-w-[1200px] gap-1.5 overflow-x-auto px-4 py-2 sm:px-6 lg:justify-center lg:px-8"
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
              className={`flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors duration-200 ${
                on ? "bg-brand-700 text-white" : "text-ink/70 hover:bg-nude hover:text-ink"
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
