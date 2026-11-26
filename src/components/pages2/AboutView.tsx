import { getTranslations, getLocale } from "next-intl/server";
import { ArrowRight, Building2, CalendarDays, Check, Receipt, ShieldCheck, Users, Wallet, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { OPERATOR } from "@/lib/legal";
import { getLegalPack } from "@/content/legal";

const DOES: { k: "do1" | "do2" | "do3" | "do4" | "do5"; Icon: LucideIcon; href?: "/eet-2-0" }[] = [
  { k: "do1", Icon: CalendarDays },
  { k: "do2", Icon: Receipt },
  { k: "do3", Icon: ShieldCheck, href: "/eet-2-0" },
  { k: "do4", Icon: Users },
  { k: "do5", Icon: Wallet },
];
const FOR = ["for1", "for2", "for3", "for4", "for5"] as const;
const FACTS = ["fact5", "fact6", "promise1", "promise2", "promise3", "promise4"] as const;

/** Về SalonGo: ngắn, gọn trên điện thoại. Chỉ ghi điều có thật (không số khách, không giải thưởng). */
export async function AboutView() {
  const t = await getTranslations("pages2.about");
  const locale = await getLocale();
  const { ui } = getLegalPack(locale);
  const h2 = "x-title text-ink";
  return (
    <>
      {/* Đầu trang */}
      <header className="bg-white pb-8 pt-8 sm:pb-12 sm:pt-14 lg:pt-16">
        <div className="x-wrap">
          <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">{t("title")}</h1>
          <p className="mt-3 max-w-[40rem] text-[16px] leading-relaxed text-muted sm:text-[18px]">{t("lead")}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={t("forTitle")}>
            {FOR.map((k) => (
              <li key={k} className="rounded-full bg-porcelain px-3 py-1.5 text-[14px] text-ink/80 ring-1 ring-black/[0.05]">{t(k)}</li>
            ))}
            <li>
              <Link href="/goi-ban" className="inline-flex rounded-full bg-blush px-3 py-1.5 text-[14px] font-medium text-brand-800 ring-1 ring-brand-700/10 hover:bg-[#F3E2E7]">
                {t("for6")}
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {/* SalonGo làm gì */}
      <section className="bg-white pb-10 sm:pb-10" aria-labelledby="about-do">
        <div className="x-wrap">
          <h2 id="about-do" className={h2}>{t("doTitle")}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DOES.map(({ k, Icon, href }) => {
              const body = (
                <>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-700 ring-1 ring-black/[0.06]">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-[16px] font-semibold text-ink">
                      {t(`${k}T`)}
                      {href && <ArrowRight className="size-4 text-brand-700" aria-hidden />}
                    </span>
                    <span className="mt-0.5 block text-[15px] leading-snug text-muted">{t(k)}</span>
                  </span>
                </>
              );
              const cls = "flex h-full gap-3.5 rounded-2xl bg-porcelain p-4 ring-1 ring-black/[0.05]";
              return (
                <li key={k}>
                  {href ? (
                    <Link href={href} className={`${cls} transition hover:bg-white hover:ring-brand-700/30`}>{body}</Link>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Vì sao có SalonGo */}
      <section className="bg-porcelain py-10 sm:py-10" aria-labelledby="about-why">
        <div className="x-wrap grid gap-6 lg:grid-cols-12 lg:gap-12 [&>*]:min-w-0">
          <h2 id="about-why" className={`${h2} lg:col-span-4`}>{t("whyTitle")}</h2>
          <ol className="space-y-3 lg:col-span-8">
            {(["why1", "why2", "why3"] as const).map((k, i) => (
              <li key={k} className="flex gap-3.5 rounded-2xl bg-white p-4 ring-1 ring-black/[0.05]">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-700 text-[13px] font-semibold text-white">{i + 1}</span>
                <span className="text-[15.5px] leading-snug text-ink/85">{t(k)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Điều bạn có thể tin */}
      <section className="bg-white py-10 sm:py-10" aria-labelledby="about-facts">
        <div className="x-wrap">
          <h2 id="about-facts" className={h2}>{t("factsTitle")}</h2>
          <ul className="mt-5 grid rounded-2xl px-4 ring-1 ring-line sm:grid-cols-2 sm:gap-x-10 sm:px-6">
            {FACTS.map((k) => (
              <li key={k} className="flex gap-3 border-b border-line py-3.5 text-[15px] leading-snug text-ink/85 last:border-0 sm:[&:nth-last-child(2)]:border-0">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-700" strokeWidth={2.5} aria-hidden />
                {t(k)}
              </li>
            ))}
          </ul>

          {/* Liên hệ + người vận hành */}
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col justify-between gap-4 rounded-2xl bg-brand-800 p-5 text-white sm:flex-row sm:items-center">
              <div>
                <p className="text-[16px] font-semibold">{t("contactTitle")}</p>
                <p className="mt-0.5 text-[14.5px] text-white/75">{t("contactLead")}</p>
              </div>
              <Link href="/lien-he" className="x-btn-onDark !min-h-11 shrink-0 !px-5 text-[15px]">
                {t("contactCta")}
              </Link>
            </div>
            <div className="rounded-2xl p-5 ring-1 ring-line">
              <p className="flex items-center gap-2 text-[14px] text-muted">
                <Building2 className="size-4 text-brand-700" aria-hidden />
                {t("who")}
              </p>
              <p className="mt-1.5 text-[15px] leading-snug text-ink/85">
                {OPERATOR.name}
                {OPERATOR.ico ? ` · ${ui.ico} ${OPERATOR.ico}` : ""}
                {OPERATOR.address ? <span className="block">{OPERATOR.address}</span> : null}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
