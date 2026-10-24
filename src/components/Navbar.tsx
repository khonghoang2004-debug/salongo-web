"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/lib/metadata";

const LocaleSwitcher = dynamic(() => import("./LocaleSwitcher").then((m) => m.LocaleSwitcher), {
  ssr: false,
  loading: () => (
    <div className="h-9 w-[140px] shrink-0 animate-pulse rounded-lg border border-neutral-200 bg-neutral-100" />
  ),
});

const menuItems = [
  { href: "/", labelKey: "home" as const },
  { href: "/tinh-nang", labelKey: "features" as const },
  { href: "/giai-phap", labelKey: "solutions" as const },
  { href: "/bang-gia", labelKey: "pricing" as const },
  { href: "/faq", labelKey: "faq" as const },
  { href: "/lien-he", labelKey: "contact" as const },
];

function closeMobileMenu() {
  const checkbox = document.getElementById("nav-menu-toggle") as HTMLInputElement | null;
  if (checkbox) checkbox.checked = false;
}

const DOWNLOAD_LINKS = {
  windows:
    "https://github.com/khonghoang2004-debug/salongo-desktop-releases/releases/latest/download/SalonGo-Setup.exe",
  mac: "https://github.com/khonghoang2004-debug/salongo-desktop-releases/releases/latest/download/SalonGo-Setup.dmg",
};

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (downloadRef.current && !downloadRef.current.contains(e.target as Node)) {
        setDownloadOpen(false);
      }
    };
    if (downloadOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [downloadOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-line transition-all duration-300 ${
        scrolled
          ? "border-neutral-200/80 bg-white py-3 shadow-sg-lg"
          : "bg-white py-4"
      }`}
    >
      <input
        type="checkbox"
        id="nav-menu-toggle"
        className="peer sr-only"
        aria-hidden
      />
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Mobile: icon menu bên trái; Desktop: ẩn, dùng icon bên phải */}
        <label
          htmlFor="nav-menu-toggle"
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="size-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5 transition-opacity hover:opacity-80"
        >
          <img
            src={siteConfig.logo}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0"
          />
          <span className="sg-gradient-text text-xl font-bold tracking-tight sm:text-2xl">
            {siteConfig.name}
          </span>
        </Link>

        <nav
          className="hidden shrink-0 items-center justify-center gap-4 lg:flex lg:gap-5 xl:gap-7"
          aria-label="Main"
        >
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative whitespace-nowrap text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "pb-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:rounded-full after:bg-[image:var(--sg-gradient)]"
                    : "text-gray-700 hover:text-violet-600"
                }`}
              >
                {active ? (
                  <span className="sg-gradient-text font-semibold">
                    {t(item.labelKey)}
                  </span>
                ) : (
                  t(item.labelKey)
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="https://app.salongo.eu/login"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-violet-600 xl:inline-block"
          >
            {t("login")}
          </a>
          <a
            href="https://app.salongo.eu/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden px-4 py-2.5 text-sm lg:inline-flex xl:px-5"
          >
            {t("tryFree")}
          </a>
          <div className="relative hidden lg:block" ref={downloadRef}>
            <button
              type="button"
              onClick={() => setDownloadOpen((v) => !v)}
              className="btn-secondary gap-1 px-4 py-2.5 text-sm xl:px-5"
              aria-expanded={downloadOpen}
              aria-haspopup="true"
            >
              <span>{t("downloadApp")}</span>
              <svg
                className={`ml-0.5 size-4 shrink-0 transition-transform ${downloadOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {downloadOpen && (
              <div
                className="absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-2xl border border-neutral-200/80 bg-white py-1.5 shadow-sg-lg"
                role="menu"
              >
                <a
                  href={DOWNLOAD_LINKS.windows}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-1.5 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-violet-50"
                  role="menuitem"
                  onClick={() => setDownloadOpen(false)}
                >
                  <svg className="size-4 shrink-0" viewBox="0 0 24 24" aria-hidden>
                    <rect x="1" y="1" width="10" height="10" rx="1.5" fill="#f9a8d4" />
                    <rect x="13" y="1" width="10" height="10" rx="1.5" fill="#c4b5fd" />
                    <rect x="1" y="13" width="10" height="10" rx="1.5" fill="#a5b4fc" />
                    <rect x="13" y="13" width="10" height="10" rx="1.5" fill="#93c5fd" />
                  </svg>
                  <span>{t("downloadForWindows")}</span>
                </a>
                <a
                  href={DOWNLOAD_LINKS.mac}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-1.5 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-violet-50"
                  role="menuitem"
                  onClick={() => setDownloadOpen(false)}
                >
                  <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.04-3.11z" />
                  </svg>
                  <span>{t("downloadForMac")}</span>
                </a>
              </div>
            )}
          </div>
          <LocaleSwitcher />
        </div>
      </div>

      <div
        className="hidden max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-neutral-100 bg-white px-4 pt-3 pb-5 shadow-sg-lg lg:hidden peer-checked:block"
        role="dialog"
        aria-label="Mobile menu"
      >
        <nav className="flex flex-col gap-0.5" aria-label="Mobile">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  active
                    ? "sg-gradient-soft ring-1 ring-violet-200/70"
                    : "text-gray-700 hover:bg-gray-50 hover:text-violet-600"
                }`}
              >
                {active ? (
                  <span className="sg-gradient-text font-semibold">
                    {t(item.labelKey)}
                  </span>
                ) : (
                  t(item.labelKey)
                )}
              </Link>
            );
          })}
          <a
            href="https://app.salongo.eu/login"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className="rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-violet-600"
          >
            {t("login")}
          </a>
          <a
            href="https://app.salongo.eu/signup"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className="btn-primary mt-3 px-4 py-3.5 text-base"
          >
            {t("tryFree")}
          </a>
          <div className="mt-2 flex flex-col gap-2">
            <a
              href={DOWNLOAD_LINKS.windows}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="btn-secondary px-4 py-3.5 text-base"
            >
              {t("downloadForWindows")}
            </a>
            <a
              href={DOWNLOAD_LINKS.mac}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="btn-secondary px-4 py-3.5 text-base"
            >
              {t("downloadForMac")}
            </a>
          </div>
          <div className="mt-4 border-t border-gray-100 pt-4">
            <LocaleSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
