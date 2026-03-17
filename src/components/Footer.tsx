import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_WHATSAPP,
  CONTACT_FACEBOOK,
  CONTACT_INSTAGRAM,
} from "@/lib/contact";
import { siteConfig } from "@/lib/metadata";

const footerNavItems = [
  { href: "/", labelKey: "home" as const },
  { href: "/tinh-nang", labelKey: "features" as const },
  { href: "/giai-phap", labelKey: "solutions" as const },
  { href: "/bang-gia", labelKey: "pricing" as const },
  { href: "/faq", labelKey: "faq" as const },
  { href: "/lien-he", labelKey: "contact" as const },
] as const;

const linkBase =
  "text-sm text-neutral-600 transition-colors duration-200 hover:text-[#EC4899] focus:outline-none focus:ring-2 focus:ring-[#EC4899]/30 focus:ring-offset-1 rounded";

const socialBtnClass =
  "flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50/80 text-neutral-600 transition-colors sm:h-9 sm:w-9 sm:rounded-lg";

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/*
          Mobile: 2 cột — điều hướng | liên hệ (gọn). Tablet+: layout cũ.
          Hàng 1 mobile: brand full width. Hàng 2: nav | contact.
        */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 flex flex-col sm:col-span-1 lg:col-span-4">
            <div className="flex items-start justify-between gap-3 sm:block">
              <Link
                href="/"
                className="inline-flex min-w-0 items-center gap-2 transition-opacity hover:opacity-85 sm:gap-2.5"
              >
                <img
                  src={siteConfig.logo}
                  alt=""
                  width={40}
                  height={40}
                  className="h-9 w-9 shrink-0 rounded-lg sm:h-10 sm:w-10"
                />
                <span className="bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-base font-bold tracking-tight text-transparent sm:text-lg">
                  {siteConfig.name}
                </span>
              </Link>
              {/* Social: cùng hàng brand trên mobile */}
              <div className="flex shrink-0 items-center gap-1 sm:mt-4 sm:justify-start lg:mt-4">
              <a
                href={CONTACT_FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className={`${socialBtnClass} hover:border-[#EC4899]/30 hover:bg-pink-50 hover:text-[#EC4899]`}
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={CONTACT_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className={`${socialBtnClass} hover:border-[#EC4899]/30 hover:bg-pink-50 hover:text-[#EC4899]`}
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href={CONTACT_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className={`${socialBtnClass} hover:border-green-500/30 hover:bg-green-50 hover:text-green-600`}
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
            </div>
            <p className="mt-2.5 text-xs leading-snug text-neutral-500 sm:mt-3 sm:max-w-xs sm:text-sm sm:leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Quick links — mobile: cột trái, gọn */}
          <div className="min-w-0 sm:col-span-1 lg:col-span-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 sm:text-xs">
              {t("quickLinks")}
            </h3>
            <ul className="mt-2 space-y-1 sm:mt-4 sm:space-y-2.5">
              {footerNavItems.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`${linkBase} inline-block text-xs sm:text-sm`}
                  >
                    {labelKey === "home" ? t("home") : tNav(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal — mobile: cột phải cạnh điều hướng */}
          <div className="min-w-0 max-sm:border-l max-sm:border-neutral-100 max-sm:pl-3 sm:col-span-1 lg:col-span-5">
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 sm:text-xs">
              {tNav("contact")}
            </h3>
            <dl className="mt-2 space-y-1.5 sm:mt-4 sm:space-y-2.5">
              <div>
                <dt className="sr-only">Email</dt>
                <dd>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className={`${linkBase} block text-xs break-all sm:inline sm:text-sm sm:break-normal`}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">Phone</dt>
                <dd>
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                    className={`${linkBase} text-xs sm:text-sm`}
                  >
                    {CONTACT_PHONE}
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-3 flex flex-wrap gap-x-2.5 gap-y-0.5 border-t border-neutral-100 pt-3 sm:mt-5 sm:gap-x-5 sm:gap-y-2 sm:pt-5">
              <Link href="/privacy" className={`${linkBase} text-xs sm:text-sm`}>
                {t("privacy")}
              </Link>
              <Link href="/terms" className={`${linkBase} text-xs sm:text-sm`}>
                {t("terms")}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-neutral-100 pt-5 sm:mt-12 sm:flex-row sm:gap-4 sm:pt-8">
          <p className="text-center text-xs text-neutral-500 sm:text-left sm:text-sm">
            &copy; {new Date().getFullYear()} SalonGo. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
