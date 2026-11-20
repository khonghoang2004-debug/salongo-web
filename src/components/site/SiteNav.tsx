"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X, RefreshCw } from "lucide-react";
import { AppleIcon, WindowsIcon } from "@/components/site/BrandIcons";
import { siteConfig } from "@/lib/metadata";
import { DOWNLOAD_LINKS, LOGIN_URL, SIGNUP_URL, appLink, renewLink } from "@/lib/app-links";

const LocaleSwitcher = dynamic(() => import("../LocaleSwitcher").then((m) => m.LocaleSwitcher), {
  ssr: false,
  loading: () => <div className="h-11 w-[76px] shrink-0 rounded-full border border-line" />,
});

const ITEMS = [
  { href: "/tinh-nang", key: "features" },
  { href: "/bang-gia", key: "pricing" },
  { href: "/goi-ban", key: "desk" },
  { href: "/website", key: "website" },
  { href: "/faq", key: "faq" },
] as const;

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={onDark ? "flex size-8 items-center justify-center rounded-full bg-white" : "contents"}>
        <img src={siteConfig.logo} alt="" width={32} height={32} className={onDark ? "size-6" : "size-8"} />
      </span>
      <span className={`text-[1.3rem] font-semibold tracking-[-0.035em] ${onDark ? "text-white" : "text-ink"}`}>{siteConfig.name}</span>
    </span>
  );
}

/** Thanh menu của site mới: trắng, dính trên cùng, có vạch mờ khi cuộn. Dưới 1024 px là nút Menu mở trang menu toàn màn hình. */
export function SiteNav() {
  const t = useTranslations("site.nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const signup = appLink(SIGNUP_URL, locale);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        {t("skip")}
      </a>
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? "bg-white/85 shadow-[0_1px_0_rgba(42,15,23,0.08)] backdrop-blur-xl" : "bg-white"
        }`}
      >
        <div className="x-wrap flex h-16 items-center gap-4 lg:h-[72px] xl:gap-6">
          <Link href="/" aria-label={siteConfig.name} className="shrink-0 rounded-lg">
            <Logo />
          </Link>

          <nav aria-label="Menu" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {ITEMS.map((it) => (
                <li key={it.href} className={it.href === "/website" ? "hidden xl:block" : undefined}>
                  <Link
                    href={it.href}
                    aria-current={isActive(it.href) ? "page" : undefined}
                    className={`inline-flex h-10 items-center whitespace-nowrap rounded-full px-3 text-[15px] transition-colors xl:px-3.5 ${
                      isActive(it.href) ? "bg-porcelain font-medium text-ink" : "text-ink/70 hover:text-ink"
                    }`}
                  >
                    {t(it.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <a href={renewLink(locale)} className="hidden h-10 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[15px] text-ink/70 transition-colors hover:text-ink 2xl:inline-flex">
              <RefreshCw className="size-4" aria-hidden />
              {t("renew")}
            </a>
            <a href={appLink(LOGIN_URL, locale)} className="hidden h-10 items-center whitespace-nowrap rounded-full px-3 text-[15px] text-ink/70 transition-colors hover:text-ink sm:inline-flex">
              {t("login")}
            </a>
            <div className="hidden lg:block">
              <LocaleSwitcher compact />
            </div>
            <a href={signup} className="x-btn-primary !min-h-10 !px-4 sm:!min-h-11 sm:!px-5">
              <span className="sm:hidden lg:inline xl:hidden">{t("ctaShort")}</span>
              <span className="hidden sm:inline lg:hidden xl:inline">{t("cta")}</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink lg:hidden"
            >
              <Menu className="size-6" aria-hidden />
              <span className="sr-only">{t("menu")}</span>
            </button>
          </div>
        </div>
      </header>

      {mounted &&
        open &&
        createPortal(
          <div id="site-menu" role="dialog" aria-modal="true" aria-label={t("menu")} className="fixed inset-0 z-[70] flex flex-col bg-white lg:hidden">
            <div className="x-wrap flex h-16 shrink-0 items-center justify-between">
              <Link href="/" onClick={() => setOpen(false)} aria-label={siteConfig.name}>
                <Logo />
              </Link>
              <button type="button" onClick={() => setOpen(false)} className="-mr-2 inline-flex size-11 items-center justify-center rounded-full" autoFocus>
                <X className="size-6" aria-hidden />
                <span className="sr-only">{t("close")}</span>
              </button>
            </div>
            <div className="x-wrap flex flex-1 flex-col overflow-y-auto pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {[...ITEMS, { href: "/lien-he", key: "contact" as const }, { href: "/ve-salongo", key: "about" as const }].map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(it.href) ? "page" : undefined}
                      className={`flex min-h-14 items-center text-[1.35rem] tracking-[-0.02em] ${isActive(it.href) ? "font-semibold text-brand-700" : "font-medium text-ink"}`}
                    >
                      {t(it.key)}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-2">
                <a href={appLink(LOGIN_URL, locale)} className="x-btn-light">{t("login")}</a>
                <a href={renewLink(locale)} className="x-btn-light">
                  <RefreshCw className="size-4" aria-hidden />
                  {t("renew")}
                </a>
              </div>
              <p className="mt-6 text-sm text-muted">{t("download")}</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href={DOWNLOAD_LINKS.windows} className="x-btn-light"><WindowsIcon className="size-3.5" />{t("windows")}</a>
                <a href={DOWNLOAD_LINKS.mac} className="x-btn-light"><AppleIcon className="size-4" />{t("mac")}</a>
              </div>
              <div className="mt-6">
                <LocaleSwitcher up />
              </div>
              <div className="mt-auto pt-8">
                <a href={signup} className="x-btn-primary w-full !min-h-14 text-base">{t("cta")}</a>
                <p className="mt-3 text-center text-sm text-muted">{t("trialLine")}</p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
