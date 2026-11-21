import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { WEBSITE_MAX_PAGES, WEBSITE_PRICE_KC, formatKc } from "@/lib/website-offer";
import { CATEGORY, TEMPLATES } from "./templates/registry";
import { TemplateFilter } from "./TemplateFilter";
import { tr } from "./templates/types";
import { PREVIEW_TINT, TemplatePreview } from "./TemplatePreview";
import { ChooseTemplateButton } from "./WebsiteContact";

export const offerVars = () => ({ price: formatKc(WEBSITE_PRICE_KC), pages: WEBSITE_MAX_PAGES });

const CATS = ["nail", "hair", "makeup", "spa", "lash", "barber"] as const;
const CAT_KEY = { nail: "catNail", hair: "catHair", spa: "catSpa", lash: "catLash", makeup: "catMakeup", barber: "catBarber" } as const;

/**
 * Thư viện mẫu (trang /website): bộ lọc theo loại salon + thẻ có khung máy tính và iPhone thật.
 * Bấm ảnh hoặc "Xem demo" → /website/mau/<slug>; "Chọn mẫu này" mở hộp liên hệ có sẵn tên mẫu.
 */
export async function TemplateGallery() {
  const t = await getTranslations("webOffer");
  const locale = await getLocale();
  const count = (c: string) => TEMPLATES.filter((x) => CATEGORY[x.slug] === c).length;
  return (
    <TemplateFilter
      label={t("filterLabel")}
      options={[
        { value: "all", label: t("filterAll"), count: TEMPLATES.length },
        ...CATS.filter((c) => count(c) > 0).map((c) => ({ value: c, label: t(CAT_KEY[c]), count: count(c) })),
      ]}
      items={TEMPLATES.map((tpl) => ({
        key: tpl.slug,
        cat: CATEGORY[tpl.slug],
        node: (
          <>
            <Link
              href={`/website/mau/${tpl.slug}`}
              tabIndex={-1}
              aria-hidden
              className="group block rounded-[20px] transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none"
            >
              <TemplatePreview
                slug={tpl.slug}
                locale={locale}
                name={tpl.name}
                tint={PREVIEW_TINT[tpl.slug] ?? "#F2ECEA"}
                label={{ desktop: t("desktop"), mobile: t("mobile") }}
              />
            </Link>
            <div className="flex flex-1 flex-col pt-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="min-w-0 truncate text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">{tpl.name}</h3>
                <span className="shrink-0 rounded-full bg-sand px-2.5 py-0.5 text-[13px] font-medium text-muted">{tr(tpl.card.type, locale)}</span>
              </div>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{tr(tpl.card.style, locale)}</p>
              <div className="mt-auto flex flex-wrap gap-2.5 pt-5 [&>*]:flex-1">
                <Link href={`/website/mau/${tpl.slug}`} className="x-btn-dark !min-h-11 !px-4 text-[15px]">
                  {t("viewDemo")}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <ChooseTemplateButton template={tpl.name} className="x-btn-light !min-h-11 !px-4 text-[15px]">
                  {t("choose")}
                </ChooseTemplateButton>
              </div>
            </div>
          </>
        ),
      }))}
    />
  );
}

/** Tên cũ (trước bản 21/11): giữ để không gãy chỗ gọi khác */
export const AtelierTemplateCards = TemplateGallery;
