import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Plus } from "lucide-react";
import { SIGNUP_URL, appLink } from "@/lib/app-links";

export const LANDING_FAQ = [1, 2, 3, 4, 5, 6] as const;

export async function WebsiteBand() {
  const t = await getTranslations("landing.website");
  return (
    <section className="bg-white pb-4" aria-label={t("title")}>
      <div className="x-wrap">
        <div className="flex flex-col gap-5 border-y border-line py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">{t("title")}</h2>
            <p className="x-body mt-1">{t("desc")}</p>
          </div>
          <Link href="/website" className="x-link shrink-0">
            {t("cta")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Câu hỏi ngắn: câu trả lời có sẵn trong HTML (<details>), cũng dùng cho JSON-LD FAQPage. */
export async function FaqShort() {
  const t = await getTranslations("landing.faq");
  const q = await getTranslations("homeFaq");
  return (
    <section className="x-section bg-white" aria-labelledby="faq-title">
      <div className="x-wrap grid gap-10 lg:grid-cols-12 [&>*]:min-w-0">
        <div className="lg:col-span-4">
          <h2 id="faq-title" className="x-h2 text-ink">{t("title")}</h2>
          <Link href="/faq" className="x-link mt-6">
            {t("all")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="border-t border-line lg:col-span-8">
          {LANDING_FAQ.map((i) => (
            <details key={i} className="group border-b border-line">
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="text-[1.0625rem] font-medium tracking-[-0.01em] text-ink sm:text-[1.15rem]">{q(`q${i}`)}</h3>
                <Plus className="size-5 shrink-0 text-ink/50 transition-transform duration-200 group-open:rotate-45" aria-hidden />
              </summary>
              <p className="x-body max-w-[42rem] pb-6">{q(`a${i}`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function FinalCta() {
  const t = await getTranslations("landing.final");
  const locale = await getLocale();
  return (
    <section className="bg-white pb-12 lg:pb-28" aria-labelledby="final-title">
      <div className="x-wrap">
        <div data-cta className="x-panel bg-porcelain px-7 py-14 sm:px-12 lg:px-16 lg:py-20">
          <h2 id="final-title" className="x-h2 max-w-[42rem] text-ink">{t("title")}</h2>
          <p className="x-lead mt-5 max-w-[34rem]">{t("lead")}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={appLink(SIGNUP_URL, locale)} className="x-btn-primary !min-h-[52px] !px-7 text-base">{t("cta")}</a>
            <Link href="/lien-he" className="x-btn-light !min-h-[52px] !px-7 text-base">{t("contact")}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
