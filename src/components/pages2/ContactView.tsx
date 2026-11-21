import { getTranslations, getLocale } from "next-intl/server";
import { ArrowUpRight, Building2, Check, Facebook, Mail, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_FACEBOOK, CONTACT_PHONE, CONTACT_WHATSAPP } from "@/lib/contact";
import { OPERATOR } from "@/lib/legal";
import { getLegalPack } from "@/content/legal";

type Row = { label: string; value: string; href: string; action: string; ext: boolean; Icon: LucideIcon };

/** Trang Liên hệ: mỗi cách liên hệ là một thẻ bấm được (icon, nhãn, giá trị), gọn trên điện thoại. */
export async function ContactView() {
  const t = await getTranslations("pages2.contact");
  const locale = await getLocale();
  const { ui } = getLegalPack(locale);
  const rows: Row[] = [
    { label: t("phone"), value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE.replace(/\s/g, "")}`, action: t("call"), ext: false, Icon: Phone },
    { label: t("whatsapp"), value: CONTACT_PHONE, href: CONTACT_WHATSAPP, action: t("write"), ext: true, Icon: MessageCircle },
    { label: t("email"), value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, action: t("send"), ext: false, Icon: Mail },
    { label: t("facebook"), value: "SalonGo", href: CONTACT_FACEBOOK, action: t("open"), ext: true, Icon: Facebook },
  ];
  return (
    <>
      <header className="bg-white pb-6 pt-8 sm:pb-10 sm:pt-14 lg:pt-16">
        <div className="x-wrap">
          <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">{t("title")}</h1>
          <p className="mt-3 max-w-[38rem] text-[16px] leading-relaxed text-muted sm:text-[17px]">{t("lead")}</p>
        </div>
      </header>

      <section className="bg-white pb-16 lg:pb-24">
        <div className="x-wrap grid gap-8 lg:grid-cols-12 lg:gap-12 [&>*]:min-w-0">
          <ul className="grid gap-3 lg:col-span-7 lg:self-start">
            {rows.map(({ label, value, href, action, ext, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={`${action}: ${value}`}
                  className="group flex min-h-[72px] items-center gap-3.5 rounded-2xl bg-porcelain px-4 py-3.5 ring-1 ring-black/[0.05] transition hover:bg-white hover:ring-brand-700/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-700 ring-1 ring-black/[0.06]">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] text-muted">{label}</span>
                    <span className="block truncate text-[16px] font-semibold text-ink">{value}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-brand-700 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <div className="rounded-2xl px-4 py-4 ring-1 ring-line sm:px-5">
              <h2 className="text-[16px] font-semibold text-ink">{t("helpTitle")}</h2>
              <ul className="mt-3 space-y-2">
                {(["help1", "help2", "help3"] as const).map((k) => (
                  <li key={k} className="flex gap-2.5 text-[15px] leading-snug text-ink/80">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-700" strokeWidth={2.5} aria-hidden />
                    {t(k)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl px-4 py-4 ring-1 ring-line sm:px-5">
              <h2 className="flex items-center gap-2 text-[16px] font-semibold text-ink">
                <Building2 className="size-4 text-brand-700" aria-hidden />
                {t("company")}
              </h2>
              <dl className="mt-3 space-y-1 text-[15px] leading-snug text-ink/80">
                <div><dt className="sr-only">{ui.operatorName}</dt><dd>{OPERATOR.name}</dd></div>
                {OPERATOR.ico && <div className="flex gap-2"><dt className="text-muted">{ui.ico}</dt><dd>{OPERATOR.ico}</dd></div>}
                {OPERATOR.address && <div><dt className="sr-only">{ui.address}</dt><dd>{OPERATOR.address}</dd></div>}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
