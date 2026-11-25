"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  CalendarSync,
  LayoutGrid,
  Armchair,
  Calculator,
  ReceiptText,
  Download,
  Hand,
  Scissors,
  Flower2,
  Building2,
  BookOpen,
  LayoutTemplate,
  PenLine,
  FileText,
  CircleHelp,
  Info,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { AppleIcon, WindowsIcon } from "@/components/site/BrandIcons";
import { siteConfig } from "@/lib/metadata";
import { DOWNLOAD_LINKS, LOGIN_URL, SIGNUP_URL, appLink, renewLink } from "@/lib/app-links";

const LocaleSwitcher = dynamic(() => import("../LocaleSwitcher").then((m) => m.LocaleSwitcher), {
  ssr: false,
  loading: () => <div className="h-11 w-[76px] shrink-0 rounded-[10px] border border-line" />,
});

type Item = { key: string; href: string; icon: LucideIcon };
type Group = { key: "product" | "solutions" | "studio" | "resources"; items: Item[]; feature: "product" | "studio" };

/** Menu chính: 4 nhóm mở ra bảng chọn + một liên kết Bảng giá. Web Studio là một nhóm riêng, ngang hàng Sản phẩm. */
const GROUPS: Group[] = [
  {
    key: "product",
    feature: "product",
    items: [
      { key: "features", href: "/tinh-nang", icon: LayoutGrid },
      { key: "desk", href: "/goi-ban", icon: Armchair },
      { key: "kasa", href: "/kasa", icon: Calculator },
      { key: "eet", href: "/eet-2-0", icon: ReceiptText },
      { key: "download", href: "/tai-app", icon: Download },
    ],
  },
  {
    key: "solutions",
    feature: "product",
    items: [
      { key: "nail", href: "/giai-phap#tiem-nail", icon: Hand },
      { key: "hair", href: "/giai-phap#salon-toc", icon: Scissors },
      { key: "beauty", href: "/giai-phap#mi-spa", icon: Flower2 },
      { key: "chain", href: "/giai-phap#nhieu-chi-nhanh", icon: Building2 },
      { key: "guide", href: "/phan-mem-quan-ly-salon", icon: BookOpen },
    ],
  },
  {
    key: "studio",
    feature: "studio",
    items: [
      { key: "templates", href: "/website", icon: LayoutTemplate },
      { key: "contact", href: "/website#lien-he", icon: PenLine },
      { key: "terms", href: "/website-terms", icon: FileText },
    ],
  },
  {
    key: "resources",
    feature: "product",
    items: [
      { key: "faq", href: "/faq", icon: CircleHelp },
      { key: "about", href: "/ve-salongo", icon: Info },
      { key: "contact", href: "/lien-he", icon: Mail },
    ],
  },
];

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

function ItemIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-line bg-white text-brand-700 transition-colors group-hover:border-brand-700/30" aria-hidden>
      <Icon className="size-[18px]" strokeWidth={1.6} />
    </span>
  );
}

/**
 * Thanh menu: trắng, dính trên cùng. Từ 1280 px là menu ngang có bảng chọn (mega-menu);
 * dưới 1280 px là nút Menu mở trang menu toàn màn hình, các nhóm mở/đóng được.
 */
export function SiteNav() {
  const t = useTranslations("site");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [panel, setPanel] = useState<Group["key"] | null>(null);
  const [mobileGroup, setMobileGroup] = useState<Group["key"] | null>("product");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    setOpen(false);
    setPanel(null);
  }, [pathname]);
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
  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(null);
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setPanel(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [panel]);

  const base = (href: string) => href.split("#")[0];
  const isActive = (href: string) => pathname === base(href) || pathname.startsWith(base(href) + "/");
  const groupActive = (g: Group) => g.items.some((it) => isActive(it.href));
  const signup = appLink(SIGNUP_URL, locale);

  const hoverOpen = (k: Group["key"]) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPanel(k);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setPanel(null), 140);
  };

  const current = GROUPS.find((g) => g.key === panel);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[80] focus:rounded-[10px] focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        {t("nav.skip")}
      </a>
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          scrolled || panel ? "bg-white/95 shadow-[0_1px_0_rgba(42,15,23,0.08)] backdrop-blur-xl" : "bg-white"
        }`}
      >
        <div ref={navRef} onMouseLeave={hoverClose} className="relative">
          <div className="x-wrap flex h-14 items-center gap-2 sm:h-16 sm:gap-4 xl:h-[72px] xl:gap-8">
            <Link href="/" aria-label={siteConfig.name} className="shrink-0 rounded-lg">
              <Logo />
            </Link>

            <nav aria-label={t("nav.menu")} className="hidden shrink-0 xl:block">
              <ul className="flex items-center gap-0.5">
                {GROUPS.slice(0, 3).map((g) => (
                  <GroupButton key={g.key} g={g} />
                ))}
                <li>
                  <Link
                    href="/bang-gia"
                    onMouseEnter={hoverClose}
                    aria-current={isActive("/bang-gia") ? "page" : undefined}
                    className={`inline-flex h-10 items-center whitespace-nowrap rounded-[10px] px-3 text-[15px] transition-colors ${
                      isActive("/bang-gia") ? "font-medium text-ink" : "text-ink/70 hover:text-ink"
                    }`}
                  >
                    {t("menu.groups.pricing")}
                  </Link>
                </li>
                <GroupButton g={GROUPS[3]} />
              </ul>
            </nav>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
              <a href={appLink(LOGIN_URL, locale)} className="hidden h-10 items-center whitespace-nowrap rounded-[10px] px-3 text-[15px] text-ink/70 transition-colors hover:text-ink md:inline-flex">
                {t("nav.login")}
              </a>
              <div className="hidden xl:block">
                <LocaleSwitcher compact />
              </div>
              <a href={signup} className="x-btn-primary !min-h-10 !px-4 text-[14px] sm:!min-h-11 sm:!px-5 sm:text-[15px]">
                <span className="sm:hidden">{t("nav.ctaShort")}</span>
                <span className="hidden sm:inline">{t("nav.cta")}</span>
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="site-menu"
                className="-mr-2 inline-flex size-11 items-center justify-center rounded-[10px] text-ink xl:hidden"
              >
                <Menu className="size-6" strokeWidth={1.75} aria-hidden />
                <span className="sr-only">{t("nav.menu")}</span>
              </button>
            </div>
          </div>

          {/* Bảng chọn của nhóm đang mở (máy tính) */}
          {current && (
            <div className="absolute inset-x-0 top-full hidden border-t border-line bg-white shadow-[0_24px_48px_-24px_rgba(42,15,23,0.25)] xl:block" onMouseEnter={() => hoverOpen(current.key)}>
              <div className="x-wrap grid grid-cols-12 gap-10 py-8">
                <ul className="col-span-8 grid grid-cols-2 gap-x-6 gap-y-1">
                  {current.items.map((it) => (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        onClick={() => setPanel(null)}
                        aria-current={isActive(it.href) && !it.href.includes("#") ? "page" : undefined}
                        className="group flex items-start gap-3.5 rounded-[12px] p-3 transition-colors hover:bg-porcelain"
                      >
                        <ItemIcon icon={it.icon} />
                        <span className="min-w-0">
                          <span className="block text-[15px] font-medium text-ink">{t(`menu.${current.key}.${it.key}.title` as never)}</span>
                          <span className="mt-0.5 block text-[14px] leading-snug text-muted">{t(`menu.${current.key}.${it.key}.desc` as never)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <FeatureCard kind={current.feature} onGo={() => setPanel(null)} signup={signup} />
              </div>
            </div>
          )}
        </div>
      </header>

      {mounted &&
        open &&
        createPortal(
          <div id="site-menu" role="dialog" aria-modal="true" aria-label={t("nav.menu")} className="sg-menu-panel fixed inset-0 z-[70] flex flex-col bg-white xl:hidden">
            <div className="x-wrap flex h-14 shrink-0 items-center justify-between border-b border-line sm:h-16">
              <Link href="/" onClick={() => setOpen(false)} aria-label={siteConfig.name}>
                <Logo />
              </Link>
              <button type="button" onClick={() => setOpen(false)} className="-mr-2 inline-flex size-11 items-center justify-center rounded-[10px]" autoFocus>
                <X className="size-6" strokeWidth={1.75} aria-hidden />
                <span className="sr-only">{t("nav.close")}</span>
              </button>
            </div>
            <div className="x-wrap flex-1 overflow-y-auto pb-6">
              <ul>
                {GROUPS.slice(0, 3).map((g) => (
                  <MobileGroup key={g.key} g={g} />
                ))}
                <li className="border-b border-line">
                  <Link href="/bang-gia" onClick={() => setOpen(false)} className="flex min-h-[60px] items-center justify-between text-[18px] font-medium text-ink">
                    {t("menu.groups.pricing")}
                    <ArrowRight className="size-5 text-ink/40" strokeWidth={1.75} aria-hidden />
                  </Link>
                </li>
                <MobileGroup g={GROUPS[3]} />
              </ul>

              <div className="mt-6 flex items-center justify-between gap-3">
                <LocaleSwitcher tight />
                <a href={renewLink(locale)} className="inline-flex h-11 items-center gap-2 rounded-[10px] border border-line px-4 text-[14px] font-medium text-ink">
                  <CalendarSync className="size-4 text-brand-700" aria-hidden />
                  {t("nav.renew")}
                </a>
              </div>
              <p className="mt-6 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-muted">{t("nav.download")}</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <a href={DOWNLOAD_LINKS.ios} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-1.5 rounded-[10px] border border-line text-[14px] font-medium text-ink">
                  <AppleIcon className="size-4" />
                  iOS
                </a>
                <a href={DOWNLOAD_LINKS.mac} className="inline-flex h-11 items-center justify-center gap-1.5 rounded-[10px] border border-line text-[14px] font-medium text-ink">
                  <AppleIcon className="size-4" />
                  {t("nav.mac")}
                </a>
                <a href={DOWNLOAD_LINKS.windows} className="inline-flex h-11 items-center justify-center gap-1.5 rounded-[10px] border border-line text-[14px] font-medium text-ink">
                  <WindowsIcon className="size-3.5" />
                  {t("nav.windows")}
                </a>
              </div>
            </div>
            <div className="x-wrap grid shrink-0 grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-2 border-t border-line bg-white pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <a href={appLink(LOGIN_URL, locale)} className="x-btn-light !min-h-12">{t("nav.login")}</a>
              <a href={signup} className="x-btn-primary !min-h-12">{t("nav.cta")}</a>
            </div>
          </div>,
          document.body,
        )}
    </>
  );

  function GroupButton({ g }: { g: Group }) {
    const isOpen = panel === g.key;
    return (
      <li>
        <button
          type="button"
          aria-expanded={isOpen}
          onMouseEnter={() => hoverOpen(g.key)}
          onClick={() => setPanel(isOpen ? null : g.key)}
          className={`inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-[10px] px-3 text-[15px] transition-colors ${
            isOpen || groupActive(g) ? "text-ink" : "text-ink/70 hover:text-ink"
          } ${groupActive(g) ? "font-medium" : ""}`}
        >
          {t(`menu.groups.${g.key}` as never)}
          <ChevronDown className={`size-4 opacity-50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden />
        </button>
      </li>
    );
  }

  function MobileGroup({ g }: { g: Group }) {
    const isOpen = mobileGroup === g.key;
    return (
      <li className="border-b border-line">
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setMobileGroup(isOpen ? null : g.key)}
          className="flex min-h-[60px] w-full items-center justify-between text-left text-[18px] font-medium text-ink"
        >
          {t(`menu.groups.${g.key}` as never)}
          <ChevronDown className={`size-5 text-ink/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} strokeWidth={1.75} aria-hidden />
        </button>
        {isOpen && (
          <ul className="-mt-1 pb-3">
            {g.items.map((it) => (
              <li key={it.href}>
                <Link href={it.href} onClick={() => setOpen(false)} className="group flex items-center gap-3.5 rounded-[12px] py-2.5">
                  <ItemIcon icon={it.icon} />
                  <span className="min-w-0">
                    <span className="block text-[15.5px] font-medium text-ink">{t(`menu.${g.key}.${it.key}.title` as never)}</span>
                    <span className="block text-[13.5px] leading-snug text-muted">{t(`menu.${g.key}.${it.key}.desc` as never)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }
}

/** Thẻ nổi bật bên phải bảng chọn: dùng thử (sản phẩm) hoặc Web Studio. */
function FeatureCard({ kind, onGo, signup }: { kind: "product" | "studio"; onGo: () => void; signup: string }) {
  const t = useTranslations("site.menu");
  if (kind === "studio") {
    return (
      <Link href="/website" onClick={onGo} className="group col-span-4 flex flex-col justify-between overflow-hidden rounded-[16px] bg-plum p-6 text-white">
        <span className="font-[family-name:var(--font-serif)] text-[1.6rem] leading-[1.15] tracking-[-0.02em]">{t("studioFeature")}</span>
        <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-white/85 group-hover:text-white">
          {t("studioFeatureCta")}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </Link>
    );
  }
  return (
    <a href={signup} className="group col-span-4 flex flex-col justify-between rounded-[16px] bg-porcelain p-6 ring-1 ring-black/[0.04]">
      <span className="font-[family-name:var(--font-serif)] text-[1.6rem] leading-[1.15] tracking-[-0.02em] text-ink">{t("productFeature")}</span>
      <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-brand-700">
        {t("productFeatureCta")}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </a>
  );
}
