"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/lib/metadata";
import { ArrowRight, Download, RefreshCw } from "lucide-react";
import { DOWNLOAD_LINKS, LOGIN_URL, SIGNUP_URL, RENEW_URL } from "@/lib/app-links";

const LocaleSwitcher = dynamic(() => import("./LocaleSwitcher").then((m) => m.LocaleSwitcher), {
  ssr: false,
  loading: () => (
    <div className="h-10 w-[76px] shrink-0 animate-pulse rounded-full border border-line bg-[#f3eeee]" />
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

  const winIcon = (
    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="1" y="1" width="10" height="10" rx="1.5" />
      <rect x="13" y="1" width="10" height="10" rx="1.5" />
      <rect x="1" y="13" width="10" height="10" rx="1.5" />
      <rect x="13" y="13" width="10" height="10" rx="1.5" />
    </svg>
  );
  const macIcon = (
    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.04-3.11z" />
    </svg>
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-white transition-colors duration-200 ${
        scrolled || menuOpen ? "border-line" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-3 px-3 sm:h-16 sm:px-6 lg:h-[72px] lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 rounded-lg transition-opacity hover:opacity-80">
          <img src={siteConfig.logo} alt="" width={36} height={36} className="size-7 shrink-0 sm:size-9" />
          <span className="font-display text-[1.125rem] font-semibold tracking-[-0.03em] text-ink sm:text-[1.375rem]">
            {siteConfig.name}
          </span>
        </Link>

        {/* Menu chính: nhóm link trong một khung bo tròn */}
        <nav
          className="hidden items-center gap-0.5 rounded-full border border-line bg-[#FBF7F7] p-1 lg:flex"
          aria-label="Main"
        >
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 xl:px-4 ${
                  active
                    ? "bg-white text-brand-700 shadow-[0_0_0_1px_#ECE6E7]"
                    : "text-ink/70 hover:text-ink"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={RENEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full px-3 py-2 text-sm font-semibold text-ink/80 transition-colors hover:text-brand-700 xl:inline-block"
          >
            {t("renew")}
          </a>
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full px-3 py-2 text-sm font-semibold text-ink/80 transition-colors hover:text-brand-700 xl:inline-block"
          >
            {t("login")}
          </a>
          <div className="relative hidden lg:block" ref={downloadRef}>
            <button
              type="button"
              onClick={() => setDownloadOpen((v) => !v)}
              className="flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
              aria-expanded={downloadOpen}
              aria-haspopup="true"
              aria-label={t("downloadApp")}
              title={t("downloadApp")}
            >
              <Download className="size-[18px]" aria-hidden />
            </button>
            {downloadOpen && (
              <div
                className="sg-pop absolute right-0 top-full z-50 mt-2 min-w-[220px] rounded-2xl border border-line bg-white p-1.5 shadow-sg-lg"
                role="menu"
              >
                {[
                  { href: DOWNLOAD_LINKS.windows, label: t("downloadForWindows"), icon: winIcon },
                  { href: DOWNLOAD_LINKS.mac, label: t("downloadForMac"), icon: macIcon },
                ].map((d) => (
                  <a
                    key={d.href}
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
                    role="menuitem"
                    onClick={() => setDownloadOpen(false)}
                  >
                    {d.icon}
                    <span>{d.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="hidden lg:block">
            <LocaleSwitcher compact />
          </div>
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden px-5 py-2.5 text-sm lg:inline-flex"
          >
            {t("tryFree")}
          </a>

          {/* Mobile: nút menu bên phải */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="relative block h-3 w-[18px]" aria-hidden>
              <span
                className={`absolute left-0 h-[1.5px] w-[18px] rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "top-[5px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-[18px] rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "top-[5px] -rotate-45" : "top-[10px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
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
            className="sg-menu-panel absolute inset-x-0 top-full flex max-h-[calc(100dvh-3.5rem)] flex-col overflow-y-auto border-b border-line bg-white px-4 pb-6 pt-2 sm:px-6 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {menuItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between border-b border-line py-4 text-[1.375rem] font-semibold tracking-[-0.02em] transition-colors ${
                      active ? "text-brand-700" : "text-ink hover:text-brand-700"
                    }`}
                  >
                    {t(item.labelKey)}
                    <ArrowRight className={`size-5 ${active ? "text-brand-700" : "text-ink/30"}`} aria-hidden />
                  </Link>
                );
              })}
            </nav>
            <div className="mt-6 grid gap-2.5">
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="btn-primary px-5 py-3.5 text-base"
              >
                {t("tryFree")}
              </a>
              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="btn-secondary px-5 py-3.5 text-base"
              >
                {t("login")}
              </a>
              <a
                href={RENEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-base font-semibold text-brand-700"
              >
                <RefreshCw className="size-4" aria-hidden />
                {t("renew")}
              </a>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2.5">
              <a
                href={DOWNLOAD_LINKS.windows}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#FBF7F7] px-3 py-3 text-sm font-medium text-ink"
              >
                {winIcon}
                Windows
              </a>
              <a
                href={DOWNLOAD_LINKS.mac}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#FBF7F7] px-3 py-3 text-sm font-medium text-ink"
              >
                {macIcon}
                macOS
              </a>
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <LocaleSwitcher up />
              <button type="button" onClick={closeMobileMenu} className="btn-secondary px-4 py-2.5 text-sm">
                {t("closeMenu")}
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
