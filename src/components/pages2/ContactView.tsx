import { getTranslations, getLocale } from "next-intl/server";
import { Check } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_FACEBOOK, CONTACT_PHONE, CONTACT_WHATSAPP } from "@/lib/contact";
import { OPERATOR } from "@/lib/legal";
import { getLegalPack } from "@/content/legal";
import { PageHead } from "./PageHead";

export async function ContactView() {
  const t = await getTranslations("pages2.contact");
  const locale = await getLocale();
  const { ui } = getLegalPack(locale);
  const rows = [
    { label: t("phone"), value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE.replace(/\s/g, "")}`, action: t("call"), ext: false },
    { label: t("whatsapp"), value: CONTACT_PHONE, href: CONTACT_WHATSAPP, action: t("write"), ext: true },
    { label: t("email"), value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, action: t("send"), ext: false },
    { label: t("facebook"), value: "SalonGo", href: CONTACT_FACEBOOK, action: t("open"), ext: true },
  ];
  return (
    <>
      <PageHead title={t("title")} lead={t("lead")} />
      <section className="bg-white pb-24 lg:pb-32">
        <div className="x-wrap grid gap-14 lg:grid-cols-12 [&>*]:min-w-0">
          <ul className="border-t border-line lg:col-span-7">
            {rows.map((r) => (
              <li key={r.label} className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line py-6">
                <span className="w-28 shrink-0 text-[15px] text-muted">{r.label}</span>
                <span className="min-w-0 flex-1 text-[1.2rem] font-medium tracking-[-0.01em] text-ink [overflow-wrap:anywhere]">{r.value}</span>
                <a
                  href={r.href}
                  {...(r.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="x-btn-light !min-h-11 !px-5 text-sm"
                >
                  {r.action}
                </a>
              </li>
            ))}
          </ul>
          <div className="lg:col-span-4 lg:col-start-9">
            <h2 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">{t("helpTitle")}</h2>
            <ul className="mt-5 space-y-3">
              {(["help1", "help2", "help3"] as const).map((k) => (
                <li key={k} className="flex gap-3 text-[15.5px] leading-relaxed text-ink/80">
                  <Check className="mt-1 size-4 shrink-0 text-brand-700" aria-hidden />
                  {t(k)}
                </li>
              ))}
            </ul>
            <h2 className="mt-12 text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">{t("company")}</h2>
            <dl className="mt-4 space-y-1.5 text-[15px] text-ink/80">
              <div><dt className="sr-only">{ui.operatorName}</dt><dd>{OPERATOR.name}</dd></div>
              {OPERATOR.ico && <div className="flex gap-2"><dt className="text-muted">{ui.ico}</dt><dd>{OPERATOR.ico}</dd></div>}
              {OPERATOR.address && <div><dt className="sr-only">{ui.address}</dt><dd>{OPERATOR.address}</dd></div>}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
