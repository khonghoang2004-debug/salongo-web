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
      <div className="h-9 w-[140px] shrink-0 animate-pulse rounded-lg border border-line bg-[#f3eeee]" />
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-[#e3dbdd] bg-white px-2.5 py-2 text-sm font-medium text-ink/80 transition-colors hover:border-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/40"
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
          className="sg-pop absolute right-0 top-full z-50 mt-2 min-w-[170px] rounded-xl border border-line bg-white p-1 shadow-sg-lg"
        >
          {locales.map((loc) => (
            <li key={loc.code} role="option" aria-selected={locale === loc.code}>
              <button
                type="button"
                onClick={() => handleSelect(loc.code)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
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
