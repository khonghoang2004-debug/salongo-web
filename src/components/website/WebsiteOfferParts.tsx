import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { WEBSITE_MAX_PAGES, WEBSITE_PRICE_KC, formatKc } from "@/lib/website-offer";
import { CATEGORY, TEMPLATES } from "./templates/registry";
import { TemplateFilter } from "./TemplateFilter";
import { tr } from "./templates/types";
import { TemplatePreview } from "./TemplatePreview";
import { ChooseTemplateButton } from "./WebsiteContact";
import { fontAtelier } from "./atelier";

export const offerVars = () => ({ price: formatKc(WEBSITE_PRICE_KC), pages: WEBSITE_MAX_PAGES });

/** Thư viện mẫu kiểu "atelier" (trang /website): lưới 3 cột, khung xem trước nền đá đồng nhất, tên chữ có chân */
export async function AtelierTemplateCards() {
  const t = await getTranslations("webOffer");
  const locale = await getLocale();
  const cats = ["nail", "hair", "spa", "lash", "makeup", "barber"] as const;
  const catKey = { nail: "catNail", hair: "catHair", spa: "catSpa", lash: "catLash", makeup: "catMakeup", barber: "catBarber" } as const;
  return (
    <TemplateFilter
      tone="atelier"
      label={t("filterLabel")}
      options={[{ value: "all", label: t("filterAll") }, ...cats.map((c) => ({ value: c, label: t(catKey[c]) }))]}
      items={TEMPLATES.map((tpl, i) => ({
        key: tpl.slug,
        cat: CATEGORY[tpl.slug],
        node: (
          <>
            <Link href={`/website/mau/${tpl.slug}`} tabIndex={-1} aria-hidden className="group block overflow-hidden rounded-[6px]">
              <TemplatePreview
                slug={tpl.slug}
                locale={locale}
                name={tpl.name}
                tint="#E6E0D6"
                label={{ desktop: t("desktop"), mobile: t("mobile") }}
                className="rounded-[6px] transition-[filter] duration-300 group-hover:brightness-[0.97]"
              />
            </Link>
            <div className="flex flex-1 flex-col pt-5">
              <div className="flex items-baseline gap-3 border-b border-[#DCD5CA] pb-3">
                <span className="text-[12px] font-semibold tabular-nums tracking-[0.12em] text-[#7A6347]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className={`${fontAtelier.className} min-w-0 flex-1 truncate text-[1.5rem] font-medium leading-none tracking-[-0.01em] text-[#1C1A17]`}>{tpl.name}</h3>
                <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B645B]">{tr(tpl.card.type, locale)}</span>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6B645B]">{tr(tpl.card.style, locale)}</p>
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5">
                <Link
                  href={`/website/mau/${tpl.slug}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1F1C19] px-5 text-[14px] font-semibold text-[#F4F1EB] transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1A17] focus-visible:ring-offset-2"
                >
                  {t("viewDemo")}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <ChooseTemplateButton
                  template={tpl.name}
                  tone="atelier"
                  className="inline-flex min-h-11 items-center text-[14px] font-semibold text-[#1C1A17] underline decoration-[#1C1A17]/35 underline-offset-[6px] transition-colors hover:decoration-[#1C1A17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1A17]"
                >
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
