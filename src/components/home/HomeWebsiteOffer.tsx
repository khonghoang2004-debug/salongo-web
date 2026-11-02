import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { TEMPLATES } from "../website/templates/registry";
import { tr } from "../website/templates/types";
import { PREVIEW_TINT, previewSrc } from "../website/TemplatePreview";
import { CustomIdeaNote, HostingNote, OfferPrice, offerVars } from "../website/WebsiteOfferParts";

// 8 mẫu tuyển chọn trên trang chủ (đủ loại salon, nhiều màu); thư viện /website có đủ tất cả
const HOME_PICKS = ["tropicana-nails", "lumen-hair", "cherry-hair", "lilac-lash", "chroma-nails", "saffron-color", "rose-bridal", "azure-barber"];

// Ưu đãi làm website ngay dưới hero: giá 999 Kč một lần, tối đa 5 trang, ảnh chụp thật từ demo (tải lười,
// không ảnh hưởng hero), 4 mẫu tuyển chọn dẫn tới demo và thư viện /website
export async function HomeWebsiteOffer() {
  const t = await getTranslations("webOffer");
  const locale = await getLocale();
  const v = offerVars();

  return (
    <section className="px-3 pb-4 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16" aria-labelledby="web-offer-title">
      <div className="sg-container">
        <div data-reveal className="overflow-hidden rounded-[24px] border border-[#EADDE0] bg-[#FBF7F7] sm:rounded-[32px]">
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-10 lg:p-12">
            <div className="lg:col-span-6">
              <span className="sg-eyebrow">
                <span className="size-1.5 rounded-full bg-brand-700" aria-hidden />
                {t("eyebrow")}
              </span>
              <h2 id="web-offer-title" className="sg-h2 mt-4 !text-[1.875rem] sm:!text-[2.375rem] lg:!text-[2.75rem]">
                {t("homeTitle")}
              </h2>
              <div className="mt-5">
                <OfferPrice />
              </div>
              <p className="sg-lead mt-5 !text-base">{t("lead")}</p>
              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                <Link href="/website" className="btn-primary min-h-12 px-6 text-base">
                  {t("ctaTemplates")}
                  <ArrowRight className="size-[18px]" aria-hidden />
                </Link>
                <Link href="/website#lien-he" className="btn-secondary min-h-12 px-6 text-base">
                  {t("ctaContact")}
                </Link>
              </div>
              <div className="mt-6">
                <HostingNote />
              </div>
              <CustomIdeaNote className="mt-4 max-w-xl" />
            </div>

            {/* Phối cảnh máy tính + điện thoại, ảnh chụp từ chính các demo */}
            <div className="lg:col-span-6" aria-hidden>
              <div className="relative mx-auto max-w-[560px] pb-6 pr-6 sm:pb-10 sm:pr-10">
                <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_10px_30px_rgba(41,17,25,0.12)]">
                  <div className="flex gap-1.5 border-b border-black/5 bg-[#FAF8F6] px-3 py-2">
                    <span className="size-2 rounded-full bg-[#E2D9D6]" />
                    <span className="size-2 rounded-full bg-[#E2D9D6]" />
                    <span className="size-2 rounded-full bg-[#E2D9D6]" />
                  </div>
                  <img src={previewSrc("cherry-hair", "pc", locale)} alt="" width={1200} height={750} loading="lazy" decoding="async" className="block aspect-[16/10] w-full object-cover object-top" />
                </div>
                <div className="absolute bottom-0 right-0 w-[30%] rounded-[20px] bg-[#1F1A1A] p-1.5 shadow-[0_10px_30px_rgba(41,17,25,0.25)]">
                  <img src={previewSrc("tropicana-nails", "m", locale)} alt="" width={390} height={760} loading="lazy" decoding="async" className="block aspect-[390/760] w-full rounded-[15px] object-cover object-top" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#EADDE0] p-5 sm:p-8 lg:px-12">
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {HOME_PICKS.map((slug) => TEMPLATES.find((x) => x.slug === slug)!).map((tpl) => (
                <li key={tpl.slug}>
                  <Link
                    href={`/website/mau/${tpl.slug}`}
                    className="group block rounded-2xl border border-line bg-white p-2 transition-colors hover:border-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                  >
                    <span className="block overflow-hidden rounded-xl" style={{ backgroundColor: PREVIEW_TINT[tpl.slug] }}>
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
                    <span className="flex items-center justify-between gap-2 px-1.5 pb-1 pt-2.5">
                      <span className="min-w-0">
                        <span className="block text-[15px] font-semibold leading-snug text-ink">{tpl.name}</span>
                        <span className="block text-[13px] leading-snug text-muted">{tr(tpl.card.type, locale)}</span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-brand-700 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/website" className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-brand-700 hover:text-brand-800">
              {t("allTemplates", { count: TEMPLATES.length })}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
