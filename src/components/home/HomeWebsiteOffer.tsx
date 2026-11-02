import { TEMPLATE_COUNT_LABEL } from "@/lib/website-offer";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { TEMPLATES } from "../website/templates/registry";
import { tr } from "../website/templates/types";
import { previewSrc } from "../website/TemplatePreview";
import { offerVars } from "../website/WebsiteOfferParts";
import { fontAtelier } from "../website/atelier";

// Mẫu tiêu biểu trên trang chủ, một dãy gọn (người dùng chốt 02/11): điện thoại 1 mẫu, máy tính bảng 2, máy tính 3
const HOME_PICKS = ["aurel-beauty", "atelier-noir", "maison-claire"];
const SHOW = ["", "hidden sm:flex", "hidden lg:flex"];

// Ưu đãi làm website ngay dưới hero, cùng phong cách "atelier" với trang /website (kem đá, espresso, chữ Newsreader;
// màu ghi chú trong website/atelier.ts). Ảnh chụp thật từ demo, tải lười nên không ảnh hưởng hero.
export async function HomeWebsiteOffer() {
  const t = await getTranslations("webOffer");
  const locale = await getLocale();
  const v = offerVars();
  const serif = fontAtelier.className;
  const [ha, hb] = t("homeTitle").split("|");

  return (
    <section className="px-3 pb-2 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-12" aria-labelledby="web-offer-title">
      <div className="sg-container">
        <div data-reveal className="overflow-hidden rounded-[24px] bg-[#F4F1EB] text-[#1C1A17] sm:rounded-[32px]">
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-12 lg:py-10">
            <div className="lg:col-span-6">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#7A6347]">
                <span className="whitespace-nowrap">{t("studio")}</span>
              </p>
              <h2 id="web-offer-title" className={`${serif} mt-5 text-[2.25rem] font-medium leading-[1.04] tracking-[-0.025em] sm:text-[2.75rem] lg:text-[2.25rem] xl:text-[2.875rem]`}>
                <span className="block">{ha}</span> {hb && <span className="block italic text-brand-700 sm:whitespace-nowrap">{hb}</span>}
              </h2>
              <div className="mt-6 flex flex-wrap items-end gap-x-5 gap-y-2 border-y border-[#DCD5CA] py-4">
                <p className="w-full text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B645B]">{t("priceLabel")}</p>
                <p className={`${serif} whitespace-nowrap text-[2.75rem] font-medium leading-[0.9] tracking-[-0.02em] sm:text-[3.25rem]`}>{v.price}</p>
                <p className="pb-1 text-[15px] font-medium leading-snug text-[#3A3631] sm:text-[16px]">
                  {t("priceLine", v)
                    .split("|")
                    .map((x) => (
                      <span key={x} className="block">
                        {x}
                      </span>
                    ))}
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <Link
                  href="/website"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1F1C19] px-6 text-[15px] font-semibold text-[#F4F1EB] transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1A17] focus-visible:ring-offset-2"
                >
                  {t("ctaTemplates")}
                  <ArrowRight className="size-[18px]" aria-hidden />
                </Link>
                <Link
                  href="/website#lien-he"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#1C1A17]/25 px-6 text-[15px] font-semibold text-[#1C1A17] transition-colors hover:border-[#1C1A17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1A17] focus-visible:ring-offset-2"
                >
                  {t("ctaContact")}
                </Link>
              </div>
              <p className="mt-6 max-w-xl border-l border-[#7A6347]/50 pl-5 text-[15px] leading-relaxed text-[#3A3631]">
                <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A6347]">{t("customIdeaLabel")}</span>
                {t("customIdea", v)}
              </p>
            </div>

            {/* Phối cảnh máy tính + 2 điện thoại, ảnh chụp từ chính các demo */}
            <div className="lg:col-span-6" aria-hidden>
              <div className="relative mx-auto max-w-[580px] pb-8 pl-6 pt-6 sm:pl-10">
                <div className="overflow-hidden rounded-[8px] bg-white shadow-[0_30px_60px_-20px_rgba(40,32,24,0.35)] ring-1 ring-black/5">
                  <div className="flex gap-1.5 border-b border-black/5 bg-[#F7F5F1] px-3 py-2">
                    <span className="size-2 rounded-full bg-[#DCD5CA]" />
                    <span className="size-2 rounded-full bg-[#DCD5CA]" />
                    <span className="size-2 rounded-full bg-[#DCD5CA]" />
                  </div>
                  <img src={previewSrc("thermae-wellness", "pc", locale)} alt="" width={1200} height={750} loading="lazy" decoding="async" className="block aspect-[16/10] w-full object-cover object-top" />
                </div>
                <div className="absolute bottom-0 left-0 w-[30%] rounded-[20px] bg-[#1F1C19] p-1.5 shadow-[0_24px_50px_-16px_rgba(40,32,24,0.45)]">
                  <img src={previewSrc("maison-claire", "m", locale)} alt="" width={390} height={760} loading="lazy" decoding="async" className="block aspect-[390/760] w-full rounded-[15px] object-cover object-top" />
                </div>
                <div className="absolute -right-1 top-0 hidden w-[24%] rounded-[18px] bg-[#1F1C19] p-1.5 shadow-[0_24px_50px_-16px_rgba(40,32,24,0.45)] sm:block">
                  <img src={previewSrc("atelier-noir", "m", locale)} alt="" width={390} height={760} loading="lazy" decoding="async" className="block aspect-[390/760] w-full rounded-[13px] object-cover object-top" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-[#DCD5CA] p-5 sm:flex-row sm:flex-wrap sm:items-center sm:p-6 lg:flex-nowrap lg:gap-6 lg:px-12">
            {HOME_PICKS.map((slug) => TEMPLATES.find((x) => x.slug === slug)!).map((tpl, i) => (
              <Link
                key={tpl.slug}
                href={`/website/mau/${tpl.slug}`}
                className={`group flex min-w-0 flex-1 items-center gap-3.5 rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1A17] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F4F1EB] ${SHOW[i]}`}
              >
                <span className="block w-[44%] shrink-0 overflow-hidden rounded-[6px] bg-[#E6E0D6] ring-1 ring-black/5">
                  <img
                    src={previewSrc(tpl.slug, "pc", locale)}
                    alt={t("previewLabel", { name: tpl.name })}
                    width={1200}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    className="block aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`${serif} block text-[1.125rem] font-medium leading-tight`}>{tpl.name}</span>
                  <span className="mt-1 block truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6B645B]">{tr(tpl.card.type, locale)}</span>
                  <ArrowRight className="mt-2 block size-4 text-[#1C1A17] transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}
            <Link
              href="/website"
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap text-[15px] font-semibold text-[#1C1A17] underline decoration-[#1C1A17]/35 underline-offset-[6px] hover:decoration-[#1C1A17] sm:basis-full lg:basis-auto"
            >
              {t("allTemplates", { count: TEMPLATE_COUNT_LABEL })}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
