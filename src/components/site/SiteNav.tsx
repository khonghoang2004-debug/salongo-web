"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X, CalendarSync, ChevronRight, Sparkles, Tag, Armchair, Globe, ReceiptText, Calculator, CircleHelp, Mail, Info } from "lucide-react";
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
  { href: "/kasa", key: "kasa" },
  { href: "/website", key: "website" },
  { href: "/faq", key: "faq" },
] as const;

type MenuItem = { href: string; key: string; label?: string; icon: typeof Tag; tone: string };
/** Phone menu rows (icon tile colours: soft tints, same family as the app's menu). */
const MOBILE_MAIN: MenuItem[] = [
  { href: "/tinh-nang", key: "features", icon: Sparkles, tone: "bg-[#F8EEF1] text-brand-700" },
  { href: "/bang-gia", key: "pricing", icon: Tag, tone: "bg-[#FFF3E0] text-[#C2410C]" },
  { href: "/goi-ban", key: "desk", icon: Armchair, tone: "bg-[#F3E8FF] text-[#7E22CE]" },
  { href: "/kasa", key: "kasa", icon: Calculator, tone: "bg-[#FFF1F2] text-[#BE123C]" },
  { href: "/website", key: "website", icon: Globe, tone: "bg-[#E0F2FE] text-[#0369A1]" },
  { href: "/eet-2-0", key: "eet", label: "EET 2.0", icon: ReceiptText, tone: "bg-[#DCFCE7] text-[#15803D]" },
  { href: "/faq", key: "faq", icon: CircleHelp, tone: "bg-[#F1F5F9] text-[#475569]" },
];
const MOBILE_MORE: MenuItem[] = [
  { href: "/lien-he", key: "contact", icon: Mail, tone: "bg-[#F1F5F9] text-[#475569]" },
  { href: "/ve-salongo", key: "about", icon: Info, tone: "bg-[#F1F5F9] text-[#475569]" },
];

function MenuRow({ it, active, label, onGo }: { it: MenuItem; active: boolean; label: string; onGo: () => void }) {
  const Icon = it.icon;
  return (
    <Link
      href={it.href}
      onClick={onGo}
      aria-current={active ? "page" : undefined}
      className={`flex min-h-[52px] items-center gap-3 px-3.5 text-[16px] ${active ? "bg-porcelain font-semibold text-brand-700" : "font-medium text-ink"}`}
    >
      <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${it.tone}`} aria-hidden>
        <Icon className="size-[18px]" strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <ChevronRight className="size-4 shrink-0 text-ink/35" aria-hidden />
    </Link>
  );
}

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
        <div className="x-wrap flex h-16 items-center gap-2 sm:gap-4 lg:h-[72px] xl:gap-6">
          <Link href="/" aria-label={siteConfig.name} className="shrink-0 rounded-lg">
            <Logo />
          </Link>

          <nav aria-label="Menu" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {ITEMS.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    aria-current={isActive(it.href) ? "page" : undefined}
                    className={`inline-flex h-10 items-center whitespace-nowrap rounded-full px-2 text-[15px] transition-colors xl:px-3.5 ${
                      isActive(it.href) ? "bg-porcelain font-medium text-ink" : "text-ink/70 hover:text-ink"
                    }`}
                  >
                    {t(it.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <a href={renewLink(locale)} className="hidden h-10 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[15px] text-ink/70 transition-colors hover:text-ink 2xl:inline-flex">
              <CalendarSync className="size-4" aria-hidden />
              {t("renew")}
            </a>
            <a href={appLink(LOGIN_URL, locale)} className="hidden h-10 items-center whitespace-nowrap rounded-full px-3 text-[15px] text-ink/70 transition-colors hover:text-ink sm:inline-flex">
              {t("login")}
            </a>
            <div className="hidden lg:block">
              <LocaleSwitcher compact />
            </div>
            <a href={signup} className="x-btn-primary !min-h-10 !px-3.5 sm:!min-h-11 sm:!px-5">
              <span className="sm:hidden lg:inline xl:hidden">{t("ctaShort")}</span>
              <span className="hidden sm:inline lg:hidden xl:inline">{t("cta")}</span>
            </a>
            {/* Phone / tablet: language right after the trial button on the logo row (owner 2026-11-22). */}
            <div className="lg:hidden">
              <LocaleSwitcher tight />
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="-mr-2 inline-flex size-10 items-center justify-center rounded-full text-ink sm:size-11 lg:hidden"
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
            {/* Phone menu (owner 2026-11-21: "khá xấu" → compact): grouped rows with a coloured icon, the current page
                highlighted; downloads + language small; Đăng nhập / Dùng thử pinned at the bottom (safe area). */}
            <div className="x-wrap flex-1 overflow-y-auto pt-2 pb-4">
              <ul className="overflow-hidden rounded-2xl border border-line bg-white">
                {MOBILE_MAIN.map((it) => (
                  <li key={it.href} className="border-b border-line last:border-b-0">
                    <MenuRow it={it} active={isActive(it.href)} label={it.label ?? t(it.key as never)} onGo={() => setOpen(false)} />
                  </li>
                ))}
              </ul>
              <ul className="mt-3 overflow-hidden rounded-2xl border border-line bg-white">
                {MOBILE_MORE.map((it) => (
                  <li key={it.href} className="border-b border-line last:border-b-0">
                    <MenuRow it={it} active={isActive(it.href)} label={t(it.key as never)} onGo={() => setOpen(false)} />
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <p className="text-[13px] font-medium text-muted">{t("download")}</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <a href={DOWNLOAD_LINKS.windows} className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-line px-3.5 text-[14px] font-medium text-ink">
                    <WindowsIcon className="size-3.5" />
                    {t("windows")}
                  </a>
                  <a href={DOWNLOAD_LINKS.mac} className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-line px-3.5 text-[14px] font-medium text-ink">
                    <AppleIcon className="size-4" />
                    {t("mac")}
                  </a>
                  <a href={DOWNLOAD_LINKS.ios} target="_blank" rel="noopener noreferrer" className="col-span-2 inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-line px-3.5 text-[14px] font-medium text-ink">
                    <AppleIcon className="size-4" />
                    {t("appStore")}
                  </a>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-end gap-3">
                {/* Gia hạn: a clear pill in the brand tint (owner 2026-11-21: "làm lại đẹp hơn"). */}
                <a
                  href={renewLink(locale)}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[#E8C9D1] bg-[#F8EEF1] px-4 text-[14px] font-semibold text-brand-700 transition-colors hover:border-brand-700"
                >
                  <CalendarSync className="size-4" aria-hidden />
                  {t("renew")}
                </a>
              </div>
            </div>
            <div className="x-wrap grid shrink-0 grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-2 border-t border-line bg-white pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <a href={appLink(LOGIN_URL, locale)} className="x-btn-light !min-h-12">{t("login")}</a>
              <a href={signup} className="x-btn-primary !min-h-12">{t("cta")}</a>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
