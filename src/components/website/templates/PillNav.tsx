"use client";

// Menu dạng viên thuốc nổi giữa trên cùng, đè lên ảnh đầu trang (kiểu Dephaus / Studio Itta).
// Dính khi cuộn (sticky) và dùng margin âm để ảnh hero nằm dưới; trên mobile thu gọn thành tên + nút đặt lịch + nút menu.
import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import type { NavItem } from "./DemoUI";

export function PillNav({
  brand,
  brandClass,
  items,
  cta,
  menuLabel,
  closeLabel,
  c,
}: {
  brand: string;
  brandClass: string;
  items: NavItem[];
  cta: { href: string; label: string };
  menuLabel: string;
  closeLabel: string;
  /** class: bar (khung viên thuốc), link, active, cta, panel */
  c: Record<"bar" | "link" | "active" | "cta" | "panel", string>;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const id = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-3 z-40 -mb-[68px] px-3">
      <div className={`mx-auto flex w-full max-w-[880px] items-center justify-between gap-2 rounded-full p-1.5 pl-5 ${c.bar}`}>
        <Link href={items[0].href} className={`flex min-h-11 items-center ${brandClass}`}>
          {brand}
        </Link>
        <nav aria-label="Menu" className="hidden items-center gap-1 lg:flex">
          {items.slice(1, -1).map((it) => (
            <Link key={it.href} href={it.href} aria-current={it.active ? "page" : undefined} className={`${c.link} ${it.active ? c.active : ""}`}>
              {it.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <Link href={cta.href} className={c.cta}>
            {cta.label}
          </Link>
          <button
            ref={btnRef}
            type="button"
            aria-expanded={open}
            aria-controls={id}
            aria-label={open ? closeLabel : menuLabel}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-full hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-current lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>
      <nav id={id} aria-label="Menu" hidden={!open} className={`mx-auto mt-2 max-w-[880px] rounded-3xl p-2 shadow-lg lg:hidden ${c.panel}`}>
        {items.map((it) => (
          <Link key={it.href} href={it.href} aria-current={it.active ? "page" : undefined} className={`flex min-h-12 w-full items-center ${c.link} !justify-start ${it.active ? c.active : ""}`}>
            {it.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
