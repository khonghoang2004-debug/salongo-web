"use client";

import { useId, useState } from "react";

// Bảng giá dạng tab theo nhóm dịch vụ (kiểu "tabs" của bộ mẫu kit). Bàn phím: ← → chuyển tab.
export function KitTabs({
  tabs,
  c,
}: {
  tabs: { label: string; panel: React.ReactNode }[];
  /** class: list, tab, tabOn */
  c: Record<"list" | "tab" | "tabOn", string>;
}) {
  const [i, setI] = useState(0);
  const id = useId();
  return (
    <div>
      <div
        role="tablist"
        className={c.list}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setI((v) => (v + 1) % tabs.length);
          if (e.key === "ArrowLeft") setI((v) => (v - 1 + tabs.length) % tabs.length);
        }}
      >
        {tabs.map((t, k) => (
          <button
            key={k}
            type="button"
            role="tab"
            id={`${id}-t${k}`}
            aria-selected={k === i}
            aria-controls={`${id}-p${k}`}
            tabIndex={k === i ? 0 : -1}
            onClick={() => setI(k)}
            className={`${c.tab} ${k === i ? c.tabOn : ""}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, k) => (
        <div key={k} role="tabpanel" id={`${id}-p${k}`} aria-labelledby={`${id}-t${k}`} hidden={k !== i} className="mt-6">
          {t.panel}
        </div>
      ))}
    </div>
  );
}
