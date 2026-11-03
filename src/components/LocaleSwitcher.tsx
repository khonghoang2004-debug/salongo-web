"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const locales = [
  { code: "vi", label: "Tiếng Việt", flagCode: "vn" },
  { code: "en", label: "English", flagCode: "us" },
  { code: "cs", label: "Čeština", flagCode: "cz" },
  { code: "de", label: "Deutsch", flagCode: "de" },
] as const;

/**
 * Cờ vẽ bằng SVG ngay trong trang (trước đây tải từ flagcdn.com: lộ IP người xem cho bên thứ ba,
 * trái với chính sách "không tải nội dung bên thứ ba").
 */
function FlagImg({ code, className }: { code: string; className?: string }) {
  const common = { className, width: 20, height: 15, viewBox: "0 0 20 15", "aria-hidden": true } as const;
  switch (code) {
    case "vn":
      return (
        <svg {...common}>
          <rect width="20" height="15" fill="#DA251D" />
          <polygon fill="#FFFF00" points="10,3 11.18,6.62 15,6.62 11.91,8.86 13.09,12.47 10,10.24 6.91,12.47 8.09,8.86 5,6.62 8.82,6.62" />
        </svg>
      );
    case "cz":
      return (
        <svg {...common}>
          <rect width="20" height="7.5" fill="#FFFFFF" />
          <rect y="7.5" width="20" height="7.5" fill="#D7141A" />
          <polygon fill="#11457E" points="0,0 10,7.5 0,15" />
        </svg>
      );
    case "de":
      return (
        <svg {...common}>
          <rect width="20" height="5" fill="#000000" />
          <rect y="5" width="20" height="5" fill="#DD0000" />
          <rect y="10" width="20" height="5" fill="#FFCE00" />
        </svg>
      );
    default:
      // us
      return (
        <svg {...common}>
          <rect width="20" height="15" fill="#FFFFFF" />
          {[0, 2, 4, 6, 8, 10, 12].map((i) => (
            <rect key={i} y={(i * 15) / 13} width="20" height={15 / 13} fill="#B22234" />
          ))}
          <rect width="8" height={(7 * 15) / 13} fill="#3C3B6E" />
        </svg>
      );
  }
}

export function LocaleSwitcher({ compact = false, up = false }: { compact?: boolean; up?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = locales.find((l) => l.code === locale) ?? locales[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [mounted]);

  const handleSelect = (newLocale: (typeof locales)[number]["code"]) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
    setOpen(false);
  };

  if (!mounted) {
    return (
      <div className={`h-10 shrink-0 animate-pulse rounded-md border border-line bg-[#f3eeee] ${compact ? "w-[76px]" : "w-[150px]"}`} />
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 items-center gap-2 rounded-md border border-line bg-white px-3 text-sm font-medium text-ink/80 transition-colors hover:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/40"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <FlagImg code={current.flagCode} className="shrink-0 rounded-sm object-cover" />
        <span>{compact ? current.code.toUpperCase() : current.label}</span>
        <svg
          className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className={`sg-pop absolute z-50 min-w-[170px] rounded-xl border border-line bg-white p-1.5 shadow-sg-lg ${up ? "bottom-full left-0 mb-2" : "right-0 top-full mt-2"}`}
        >
          {locales.map((loc) => (
            <li key={loc.code} role="option" aria-selected={locale === loc.code}>
              <button
                type="button"
                onClick={() => handleSelect(loc.code)}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                  locale === loc.code
                    ? "bg-brand-50 font-medium text-brand-700"
                    : "text-ink/80 hover:bg-sand"
                }`}
              >
                <FlagImg code={loc.flagCode} className="shrink-0 rounded-sm object-cover" />
                {loc.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
