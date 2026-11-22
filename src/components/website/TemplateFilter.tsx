"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

/** "Tất cả": hiện trước chừng này mẫu (điện thoại đỡ phải cuộn rất dài), còn lại sau nút "Xem thêm" */
const FIRST = 9;

// Bộ lọc theo loại salon cho thư viện mẫu (thẻ đã render sẵn ở server, ở đây chỉ ẩn/hiện).
// Điện thoại: dải nút cuộn ngang tràn mép (không xuống dòng); từ sm: xuống dòng gọn.
export function TemplateFilter({
  label,
  options,
  items,
}: {
  /** Giữ để tương thích chỗ gọi cũ; giao diện mới chỉ có một kiểu */
  tone?: "brand" | "atelier";
  label: string;
  options: { value: string; label: string; count?: number }[];
  items: { cat: string; node: React.ReactNode; key: string }[];
}) {
  const t = useTranslations("webOffer");
  const [cat, setCat] = useState("all");
  const [more, setMore] = useState(false);
  const shown = items.filter((it) => cat === "all" || cat === it.cat);
  const rest = cat === "all" && !more ? Math.max(0, shown.length - FIRST) : 0;
  const visible = new Set(shown.slice(0, rest ? FIRST : undefined).map((it) => it.key));
  return (
    <>
      <div
        role="group"
        aria-label={label}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {options.map((o) => {
          const on = cat === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              onClick={() => setCat(o.value)}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 ${
                on ? "border-brand-700 bg-brand-700 text-white" : "border-line bg-white text-ink hover:border-ink/30"
              }`}
            >
              {o.label}
              {o.count !== undefined && <span className={`text-[13px] tabular-nums ${on ? "text-white/75" : "text-muted"}`}>{o.count}</span>}
            </button>
          );
        })}
      </div>
      <ul className="mt-8 grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
        {items.map((it) => (
          <li key={it.key} className={`${visible.has(it.key) ? "flex" : "hidden"} min-w-0 flex-col`}>
            {it.node}
          </li>
        ))}
      </ul>
      {rest > 0 && (
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setMore(true)} className="x-btn-light w-full !min-h-[52px] text-base sm:w-auto sm:!px-8">
            {t("showMore", { count: rest })}
          </button>
        </div>
      )}
    </>
  );
}
