"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Shot } from "@/lib/media";
import { DeviceDesktop, DevicePhone } from "@/components/landing/Shots";

export type LiveItem = { slug: string; name: string; type: string; shot: Shot };

/**
 * Đầu trang /website: một mẫu thật trong khung máy tính + iPhone, đổi mẫu bằng các nút tên mẫu.
 * Hai khung đặt cạnh nhau (không đè nhau) nên vừa cả màn hình 360px.
 */
export function LivePreview({
  items,
  label,
  demoLabel,
  desktopLabel,
  mobileLabel,
}: {
  items: LiveItem[];
  label: string;
  demoLabel: string;
  desktopLabel: string;
  mobileLabel: string;
}) {
  const [i, setI] = useState(0);
  const cur = items[i];
  return (
    <div>
      <div className="grid grid-cols-[minmax(0,1fr)_24%] items-end gap-3 sm:gap-5">
        <DeviceDesktop
          key={`d-${cur.slug}`}
          src={cur.shot.desktop}
          width={cur.shot.dw}
          height={cur.shot.dh}
          alt={`${cur.name} — ${desktopLabel}`}
          priority={i === 0}
          className="x-hero-desktop"
        />
        <DevicePhone key={`m-${cur.slug}`} shot={cur.shot} alt={`${cur.name} — ${mobileLabel}`} priority={i === 0} className="x-hero-phone" />
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div role="group" aria-label={label} className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((it, n) => (
            <button
              key={it.slug}
              type="button"
              aria-pressed={n === i}
              onClick={() => setI(n)}
              className={`inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full px-4 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 ${
                n === i ? "bg-white text-ink shadow-[0_1px_2px_rgba(42,15,23,0.08)] ring-1 ring-black/[0.06]" : "text-muted hover:text-ink"
              }`}
            >
              {it.name}
            </button>
          ))}
        </div>
        <Link href={`/website/mau/${cur.slug}`} className="x-link min-h-11 text-[15px]">
          {demoLabel} · {cur.type}
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
