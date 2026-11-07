import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_WHATSAPP,
  CONTACT_FACEBOOK,
  CONTACT_INSTAGRAM,
} from "@/lib/contact";
import { siteConfig } from "@/lib/metadata";
import { BackToTop } from "./BackToTop";
import { LOGIN_URL, SIGNUP_URL, RENEW_URL, appLink } from "@/lib/app-links";
import { LEGAL_DOCS, OPERATOR } from "@/lib/legal";
import { getLegalPack } from "@/content/legal";

const footerNavItems = [
  { href: "/", labelKey: "home" as const },
  { href: "/tinh-nang", labelKey: "features" as const },
  { href: "/giai-phap", labelKey: "solutions" as const },
  { href: "/bang-gia", labelKey: "pricing" as const },
  { href: "/faq", labelKey: "faq" as const },
  { href: "/lien-he", labelKey: "contact" as const },
  { href: "/phan-mem-quan-ly-salon", labelKey: "guide" as const },
  { href: "/ve-salongo", labelKey: "about" as const },
  { href: "/website", labelKey: "website" as const },
] as const;

const SOCIALS = [
  { href: CONTACT_FACEBOOK, label: "Facebook", d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { href: CONTACT_INSTAGRAM, label: "Instagram", d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { href: CONTACT_WHATSAPP, label: "WhatsApp", d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
];

const linkBase = "inline-flex min-h-11 items-center text-[15px] text-white/75 transition-colors duration-200 hover:text-white focus-visible:!outline-white";
const colTitle = "text-sm font-medium text-white/55";

// Chân trang nền đỏ đô đậm (cùng màu trên điện thoại và máy tính): thương hiệu, điều hướng, liên hệ
export async function Footer() {
  const t = await getTranslations("footer");
  const locale = await getLocale();
  const tNav = await getTranslations("nav");
  const tGuide = await getTranslations("guide");
  const tPages = await getTranslations("pages");
  const tWeb = await getTranslations("webOffer");
  const legal = getLegalPack(locale);

  return (
    <footer className="bg-brand-900 text-white">
      <div className="mx-auto max-w-[1280px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg transition-opacity hover:opacity-80 focus-visible:!outline-white">
              <span className="flex size-10 items-center justify-center rounded-full bg-white">
                <img src={siteConfig.logo} alt="" width={28} height={28} className="size-7 shrink-0" />
              </span>
              <span className="text-[1.375rem] font-semibold tracking-[-0.03em] text-white">{siteConfig.name}</span>
            </Link>
            <p className="mt-5 max-w-sm font-display text-[1.5rem] leading-[1.3] text-white">{t("tagline")}</p>
            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map(({ href, label, d }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white hover:text-white focus-visible:!outline-white"
                >
                  <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden>
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className={colTitle}>{t("quickLinks")}</h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 sm:grid-cols-2 lg:grid-cols-1">
              {footerNavItems.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link href={href} className={linkBase}>
                    {labelKey === "home"
                      ? t("home")
                      : labelKey === "guide"
                        ? tGuide("crumb")
                        : labelKey === "about"
                          ? tPages("aboutTitle")
                          : labelKey === "website"
                            ? tWeb("footerLink")
                            : tNav(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className={colTitle}>{tNav("contact")}</h3>
            <ul className="mt-3">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={`${linkBase} [overflow-wrap:anywhere]`}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className={linkBase}>
                  {CONTACT_PHONE}
                </a>
              </li>
              {([
                [appLink(SIGNUP_URL, locale), tNav("tryFree")],
                [appLink(LOGIN_URL, locale), tNav("login")],
                [appLink(RENEW_URL, locale), tNav("renew")],
              ] as const).map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1 text-[15px] font-semibold text-white hover:underline focus-visible:!outline-white"
                  >
                    {label}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>
              &copy; {new Date().getFullYear()} {siteConfig.name}. {t("rights")}
            </p>
            {/* Thông tin người bán bắt buộc (§ 435 OZ): tên, IČO, địa chỉ lấy từ src/lib/legal.ts */}
            <p className="mt-1 text-xs">
              {[
                `${legal.ui.operator}: ${OPERATOR.name}`,
                OPERATOR.ico ? `${legal.ui.ico}: ${OPERATOR.ico}` : null,
                OPERATOR.address || null,
                OPERATOR.vatId ? `${legal.ui.vatId}: ${OPERATOR.vatId}` : OPERATOR.vatPayer === false ? legal.ui.notVatPayer : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-5 sm:pr-14">
            {LEGAL_DOCS.map((d) => (
              <li key={d.key}>
                <Link href={d.path} className="inline-flex min-h-11 items-center transition-colors hover:text-white focus-visible:!outline-white">
                  {legal.docs[d.key].title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}
