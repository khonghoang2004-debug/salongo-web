import { getLocale, getTranslations } from "next-intl/server";
import { ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_WHATSAPP, CONTACT_FACEBOOK } from "@/lib/contact";
import { siteConfig } from "@/lib/metadata";
import { LOGIN_URL, SIGNUP_URL, appLink, renewLink } from "@/lib/app-links";
import { LEGAL_DOCS, OPERATOR } from "@/lib/legal";
import { getLegalPack } from "@/content/legal";
import { Logo } from "./SiteNav";
import { DownloadBadges } from "./DownloadBadges";

const link = "inline-flex min-h-10 items-center py-1.5 text-[15px] leading-snug text-white/70 transition-colors hover:text-white focus-visible:!outline-white";
const head = "text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white/45";

type Item = readonly [href: string, label: string, external?: boolean];

/**
 * Chân trang (bản premium 2026-11): khối mận đậm. Cột thương hiệu + 4 cột liên kết (Sản phẩm, Giải pháp & Web Studio,
 * Tài nguyên, Tài khoản & hỗ trợ). Điện thoại: thương hiệu trên cùng, liên kết 2 cột. Chữ nhỏ nhất 14 px.
 */
export async function SiteFooter() {
  const locale = await getLocale();
  const t = await getTranslations("site");
  const legal = getLegalPack(locale);
  const m = (k: string) => t(`menu.${k}.title` as never);

  const cols: { title: string; items: Item[] }[] = [
    {
      title: t("footer.product"),
      items: [
        ["/tinh-nang", m("product.features")],
        ["/bang-gia", t("nav.pricing")],
        ["/goi-ban", m("product.desk")],
        ["/kasa", m("product.kasa")],
        ["/eet-2-0", m("product.eet")],
        ["/tai-app", m("product.download")],
      ],
    },
    {
      title: t("footer.studio"),
      items: [
        ["/website", m("studio.templates")],
        ["/website#lien-he", m("studio.contact")],
      ],
    },
    {
      title: t("footer.resources"),
      items: [
        ["/giai-phap", t("footer.solutions")],
        ["/phan-mem-quan-ly-salon", t("footer.guide")],
        ["/faq", m("resources.faq")],
        ["/ve-salongo", m("resources.about")],
        ["/lien-he", m("resources.contact")],
      ],
    },
    {
      title: t("footer.account"),
      items: [
        [appLink(LOGIN_URL, locale), t("nav.login"), true],
        [renewLink(locale), t("nav.renew"), true],
        [appLink(SIGNUP_URL, locale), t("nav.cta"), true],
      ],
    },
  ];

  return (
    <footer className="bg-plum text-white">
      <div className="x-wrap pb-8 pt-16 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_3.5fr] lg:gap-16">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex rounded-lg focus-visible:!outline-white" aria-label={siteConfig.name}>
              <Logo onDark />
            </Link>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-white/75">{t("footer.tagline")}</p>
            <ul className="mt-6 space-y-0.5">
              <li><a href={`mailto:${CONTACT_EMAIL}`} className={`${link} [overflow-wrap:anywhere]`}>{CONTACT_EMAIL}</a></li>
              <li><a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className={`${link} tabular-nums`}>{CONTACT_PHONE}</a></li>
              <li className="flex gap-5">
                <a href={CONTACT_WHATSAPP} target="_blank" rel="noopener noreferrer" className={link}>WhatsApp</a>
                <a href={CONTACT_FACEBOOK} target="_blank" rel="noopener noreferrer" className={link}>Facebook</a>
              </li>
            </ul>
            <p className="mt-3 text-[14px] leading-relaxed text-white/50">{t("footer.support")}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {cols.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <h2 className={head}>{c.title}</h2>
                <ul className="mt-4">
                  {c.items.map(([href, label, ext]) => (
                    <li key={href}>
                      {ext ? <a href={href} className={link}>{label}</a> : <Link href={href} className={link}>{label}</Link>}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="inline-flex items-center gap-2 text-[14px] text-white/60">
            <ShieldCheck className="size-4 shrink-0 text-[#9BD3B4]" aria-hidden />
            {t("footer.gdpr")}
          </p>
          <DownloadBadges tone="dark" labels={{ mac: t("nav.mac"), win: t("nav.windows"), ios: t("nav.appStoreShort") }} />
        </div>

        <div className="mt-6 text-[14px] leading-relaxed text-white/45">
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
