"use client";

import { useEffect, useState } from "react";
import { SCREEN_ICONS, type ScreenIcon } from "./screenIcons";

type View = { key: string; label: string; src: string; icon: ScreenIcon };

// Khung trình duyệt có tab để chuyển giữa các màn hình của app (vd: lịch theo nhân viên / danh sách).
// Tự chuyển tab mỗi vài giây cho tới khi người dùng bấm chọn.
export function ScreenTabsMockup({
  views,
  className = "",
}: {
  views: View[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % views.length), 5000);
    return () => window.clearInterval(id);
  }, [auto, views.length]);

  return (
    <div className={`overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sg-lg ${className}`}>
      <div className="flex items-center gap-3 border-b border-neutral-100 px-4 py-2.5 sm:px-5">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#f9a8d4]" />
          <span className="size-3 rounded-full bg-[#c4b5fd]" />
          <span className="size-3 rounded-full bg-[#93c5fd]" />
        </div>
        {views.length > 1 && (
        <div className="ml-auto flex rounded-full border border-line bg-[#fafafc] p-0.5" role="tablist">
          {views.map((v, i) => {
            const Icon = SCREEN_ICONS[v.icon];
            const on = active === i;
            return (
              <button
                key={v.key}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => {
                  setActive(i);
                  setAuto(false);
                }}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-200 sm:text-[13px] ${
                  on ? "bg-white text-violet-700 shadow-sg-sm ring-1 ring-violet-200" : "text-muted hover:text-ink"
                }`}
              >
                <Icon className="size-3.5" aria-hidden />
                {v.label}
              </button>
            );
          })}
        </div>
        )}
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-50">
        {views.map((v, i) => (
          <img
            key={v.key}
            src={v.src}
            alt={v.label}
            width={1760}
            height={1100}
            sizes="(max-width: 1024px) 100vw, 576px"
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${
              active === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
