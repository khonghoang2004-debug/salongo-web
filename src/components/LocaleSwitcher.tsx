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

function FlagImg({ code, className }: { code: string; className?: string }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt=""
      className={className}
      width={20}
      height={15}
      loading="lazy"
    />
  );
}

export function LocaleSwitcher() {
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mounted]);

  const handleSelect = (newLocale: (typeof locales)[number]["code"]) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
    setOpen(false);
  };

  if (!mounted) {
    return (
      <div className="h-9 w-[140px] shrink-0 animate-pulse rounded-lg border border-neutral-200 bg-neutral-100" />
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <FlagImg code={current.flagCode} className="shrink-0 rounded-sm object-cover" />
        <span>{current.label}</span>
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
          className="absolute right-0 top-full z-50 mt-1 min-w-[160px] rounded-lg border border-neutral-200 bg-white py-1 shadow-lg"
        >
          {locales.map((loc) => (
            <li key={loc.code} role="option" aria-selected={locale === loc.code}>
              <button
                type="button"
                onClick={() => handleSelect(loc.code)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                  locale === loc.code
                    ? "bg-purple-50 font-medium text-purple-700"
                    : "text-neutral-700 hover:bg-neutral-50"
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
