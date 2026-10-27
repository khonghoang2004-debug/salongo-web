"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/lib/metadata";

const LocaleSwitcher = dynamic(() => import("./LocaleSwitcher").then((m) => m.LocaleSwitcher), {
  ssr: false,
  loading: () => (
    <div className="h-9 w-[140px] shrink-0 animate-pulse rounded-lg border border-line bg-[#f3eeee]" />
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
  const [menuOpen, setMenuOpen] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);
  const closeMobileMenu = () => setMenuOpen(false);

  // Đóng menu khi chuyển trang
  useEffect(() => {
    setMenuOpen(false);
    setDownloadOpen(false);
  }, [pathname]);

  // Esc để đóng menu / dropdown; khoá cuộn trang khi menu mobile mở
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setDownloadOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

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
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-line bg-white py-3 shadow-sg-sm"
          : "border-transparent bg-white py-4"
      }`}
    >
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Mobile: icon menu bên trái; Desktop: ẩn, dùng icon bên phải */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="relative flex size-10 shrink-0 items-center justify-center rounded-lg text-ink transition-colors hover:bg-sand lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {/* 3 gạch → dấu X, chuyển động mượt */}
          <span className="relative block h-4 w-5" aria-hidden>
            <span
              className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                menuOpen ? "top-[7px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                menuOpen ? "top-[7px] -rotate-45" : "top-[14px]"
              }`}
            />
          </span>
        </button>
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
        >
          <img
            src={siteConfig.logo}
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
          />
          <span className="font-display text-xl font-extrabold tracking-[-0.02em] text-ink sm:text-[1.375rem]">
            {siteConfig.name}
          </span>
        </Link>

        <nav
          className="hidden shrink-0 items-center justify-center gap-0.5 lg:flex xl:gap-1"
          aria-label="Main"
        >
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors duration-200 xl:px-3 ${
                  active
                    ? "bg-brand-50 font-semibold text-brand-700"
                    : "text-ink/70 hover:bg-sand hover:text-ink"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="https://app.salongo.eu/login"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden px-1 text-sm font-semibold text-ink/80 transition-colors duration-200 hover:text-brand-700 xl:inline-block"
          >
            {t("login")}
          </a>
          <a
            href="https://app.salongo.eu/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden px-4 py-2.5 text-sm lg:inline-flex"
          >
            {t("tryFree")}
          </a>
          <div className="relative hidden lg:block" ref={downloadRef}>
            <button
              type="button"
              onClick={() => setDownloadOpen((v) => !v)}
              className="btn-secondary gap-1 px-3.5 py-2.5 text-sm"
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
                className="sg-pop absolute right-0 top-full z-50 mt-2 min-w-[220px] rounded-xl border border-line bg-white py-1.5 shadow-sg-lg"
                role="menu"
              >
                <a
                  href={DOWNLOAD_LINKS.windows}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-1.5 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brand-50"
                  role="menuitem"
                  onClick={() => setDownloadOpen(false)}
                >
                  <svg className="size-4 shrink-0" viewBox="0 0 24 24" aria-hidden>
                    <rect x="1" y="1" width="10" height="10" rx="1.5" fill="#800020" />
                    <rect x="13" y="1" width="10" height="10" rx="1.5" fill="#800020" />
                    <rect x="1" y="13" width="10" height="10" rx="1.5" fill="#b34366" />
                    <rect x="13" y="13" width="10" height="10" rx="1.5" fill="#cf6e8a" />
                  </svg>
                  <span>{t("downloadForWindows")}</span>
                </a>
                <a
                  href={DOWNLOAD_LINKS.mac}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-1.5 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brand-50"
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

      {menuOpen && (
        <>
          {/* Lớp nền tối nhẹ (không blur) — chạm để đóng menu */}
          {createPortal(
            <button
              type="button"
              aria-label="Close menu"
              tabIndex={-1}
              onClick={closeMobileMenu}
              className="sg-fade fixed inset-0 z-40 cursor-default bg-[#1a0a10]/30 lg:hidden"
            />,
            document.body,
          )}
      <div
        id="mobile-menu"
        className="sg-menu-panel absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white px-4 pt-3 pb-5 shadow-sg-lg lg:hidden"
        role="dialog"
        aria-modal="true"
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
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  active
                    ? "bg-brand-50 font-semibold text-brand-700"
                    : "text-ink/80 hover:bg-sand hover:text-ink"
                }`}
              >
                {t(item.labelKey)}
                {active && <span className="size-1.5 rounded-full bg-brand-600" aria-hidden />}
              </Link>
            );
          })}
          <a
            href="https://app.salongo.eu/login"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className="rounded-xl px-4 py-3 text-base font-medium text-ink/80 transition-colors hover:bg-sand hover:text-ink"
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
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
            <LocaleSwitcher />
            <button
              type="button"
              onClick={closeMobileMenu}
              className="btn-secondary px-4 py-2 text-sm"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {t("closeMenu")}
            </button>
          </div>
        </nav>
      </div>
        </>
      )}
    </header>
  );
}
