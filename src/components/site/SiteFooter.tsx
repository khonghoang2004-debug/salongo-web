import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_WHATSAPP, CONTACT_FACEBOOK } from "@/lib/contact";
import { siteConfig } from "@/lib/metadata";
import { DOWNLOAD_LINKS, LOGIN_URL, SIGNUP_URL, appLink, renewLink } from "@/lib/app-links";
import { LEGAL_DOCS, OPERATOR } from "@/lib/legal";
import { getLegalPack } from "@/content/legal";
import { Logo } from "./SiteNav";

const link = "inline-flex min-h-10 items-center text-[15px] text-white/70 transition-colors hover:text-white focus-visible:!outline-white";
const head = "text-[13px] font-medium text-white/45";

/** Chân trang site mới: khối mận đậm, 4 cột trên máy tính, 2 cột trên iPad/điện thoại. */
export async function SiteFooter() {
  const locale = await getLocale();
  const t = await getTranslations("site");
  const legal = getLegalPack(locale);

  const product = [
    ["/tinh-nang", t("nav.features")],
    ["/bang-gia", t("nav.pricing")],
    ["/goi-ban", t("nav.desk")],
    ["/website", t("nav.website")],
    ["/giai-phap", t("footer.solutions")],
  ] as const;
  const company = [
    ["/ve-salongo", t("nav.about")],
    ["/faq", t("nav.faq")],
    ["/lien-he", t("nav.contact")],
    ["/phan-mem-quan-ly-salon", t("footer.guide")],
  ] as const;

  return (
    <footer className="bg-plum text-white">
      <div className="x-wrap pb-8 pt-16 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex rounded-lg focus-visible:!outline-white" aria-label={siteConfig.name}>
              <Logo onDark />
            </Link>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-white/75">{t("footer.tagline")}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={appLink(SIGNUP_URL, locale)} className="x-btn-onDark !min-h-11 !px-5">{t("nav.cta")}</a>
            </div>
          </div>

          <nav aria-label={t("footer.product")}>
            <h2 className={head}>{t("footer.product")}</h2>
            <ul className="mt-3">
              {product.map(([href, label]) => (
                <li key={href}><Link href={href} className={link}>{label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("footer.company")}>
            <h2 className={head}>{t("footer.company")}</h2>
            <ul className="mt-3">
              {company.map(([href, label]) => (
                <li key={href}><Link href={href} className={link}>{label}</Link></li>
              ))}
              <li><a href={appLink(LOGIN_URL, locale)} className={link}>{t("nav.login")}</a></li>
              <li><a href={renewLink(locale)} className={link}>{t("nav.renew")}</a></li>
            </ul>
          </nav>

          <div>
            <h2 className={head}>{t("footer.help")}</h2>
            <ul className="mt-3">
              <li><a href={`mailto:${CONTACT_EMAIL}`} className={`${link} [overflow-wrap:anywhere]`}>{CONTACT_EMAIL}</a></li>
              <li><a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className={link}>{CONTACT_PHONE}</a></li>
              <li className="flex gap-4">
                <a href={CONTACT_WHATSAPP} target="_blank" rel="noopener noreferrer" className={link}>WhatsApp</a>
                <a href={CONTACT_FACEBOOK} target="_blank" rel="noopener noreferrer" className={link}>Facebook</a>
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-white/50">{t("footer.support")}</p>
            <h2 className={`${head} mt-7`}>{t("nav.download")}</h2>
            <div className="mt-3 flex gap-2">
              <a href={DOWNLOAD_LINKS.windows} className="x-btn-ghostDark !min-h-10 !px-4 text-sm">{t("nav.windows")}</a>
              <a href={DOWNLOAD_LINKS.mac} className="x-btn-ghostDark !min-h-10 !px-4 text-sm">{t("nav.mac")}</a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6 text-[13px] leading-relaxed text-white/45">
          <ul className="flex flex-wrap gap-x-5">
            {LEGAL_DOCS.map((d) => (
              <li key={d.key}>
                <Link href={d.path} className="inline-flex min-h-10 items-center transition-colors hover:text-white focus-visible:!outline-white">
                  {legal.docs[d.key].title}
                </Link>
              </li>
            ))}
          </ul>
          {/* Thông tin người bán bắt buộc (§ 435 OZ), lấy từ src/lib/legal.ts */}
          <p className="mt-3">
            © {new Date().getFullYear()} {siteConfig.name}. {t("footer.rights")} {t("footer.operator")}: {OPERATOR.name}
            {OPERATOR.ico ? `, ${legal.ui.ico} ${OPERATOR.ico}` : ""}
            {OPERATOR.address ? `, ${OPERATOR.address}` : ""}
            {OPERATOR.vatId ? `, ${legal.ui.vatId} ${OPERATOR.vatId}` : OPERATOR.vatPayer === false ? `. ${legal.ui.notVatPayer}.` : "."}
          </p>
        </div>
      </div>
    </footer>
  );
}
