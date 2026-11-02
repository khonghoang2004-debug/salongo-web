"use client";

import { useState } from "react";

// Bộ lọc đơn giản theo loại salon cho thư viện mẫu (thẻ đã render sẵn ở server, ở đây chỉ ẩn/hiện)
export function TemplateFilter({
  label,
  options,
  items,
  tone = "brand",
}: {
  tone?: "brand" | "atelier";
  label: string;
  options: { value: string; label: string }[];
  items: { cat: string; node: React.ReactNode; key: string }[];
}) {
  const [cat, setCat] = useState("all");
  return (
    <>
      <div role="group" aria-label={label} className={tone === "atelier" ? "flex flex-wrap gap-x-1 gap-y-2 border-b border-[#DCD5CA]" : "flex flex-wrap gap-2"}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={cat === o.value}
            onClick={() => setCat(o.value)}
            className={
              tone === "atelier"
                ? `-mb-px min-h-12 border-b-2 px-3 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1A17] ${
                    cat === o.value ? "border-[#1C1A17] text-[#1C1A17]" : "border-transparent text-[#6B645B] hover:text-[#1C1A17]"
                  }`
                : `min-h-11 rounded-full border px-4 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${
                    cat === o.value ? "border-brand-700 bg-brand-700 text-white" : "border-line bg-white text-ink hover:border-ink"
                  }`
            }
          >
            {o.label}
          </button>
        ))}
      </div>
      <ul className={tone === "atelier" ? "mt-8 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3" : "mt-6 grid gap-5 md:grid-cols-2 md:gap-6"}>
        {items.map((it) => (
          <li
            key={it.key}
            className={`${cat !== "all" && cat !== it.cat ? "hidden" : "flex"} flex-col ${tone === "atelier" ? "" : "overflow-hidden rounded-[24px] border border-line bg-white"}`}
          >
            {it.node}
          </li>
        ))}
      </ul>
    </>
  );
}
