import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, Check, Info, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { WEBSITE_MAX_PAGES, WEBSITE_PRICE_KC, formatKc } from "@/lib/website-offer";
import { CATEGORY, TEMPLATES } from "./templates/registry";
import { TemplateFilter } from "./TemplateFilter";
import { tr } from "./templates/types";
import { PREVIEW_TINT, TemplatePreview } from "./TemplatePreview";
import { ChooseTemplateButton } from "./WebsiteContact";

export const offerVars = () => ({ price: formatKc(WEBSITE_PRICE_KC), pages: WEBSITE_MAX_PAGES });

/** Giá nổi bật: "999 Kč · một lần" + "Website tối đa 5 trang" ngay cạnh */
export async function OfferPrice({ light = false }: { light?: boolean }) {
  const t = await getTranslations("webOffer");
  const v = offerVars();
  return (
    <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
      <p className="flex items-baseline gap-2">
        <span className={`font-display text-[2.75rem] font-semibold leading-none tracking-[-0.04em] sm:text-[3.5rem] ${light ? "text-white" : "text-brand-700"}`}>
          {v.price}
        </span>
        <span className={`text-base font-semibold ${light ? "text-white/85" : "text-ink"}`}>{t("priceOnce")}</span>
      </p>
      <p
        className={`mb-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${
          light ? "bg-white/10 text-white ring-1 ring-white/25" : "bg-brand-50 text-brand-800 ring-1 ring-brand-100"
        }`}
      >
        <Check className="size-4" strokeWidth={2.5} aria-hidden />
        {t("pagesNote", v)}
      </p>
    </div>
  );
}

/** Ghi chú hosting: chữ thường, đủ tương phản, không ẩn trong tooltip */
export async function HostingNote({ light = false }: { light?: boolean }) {
  const t = await getTranslations("webOffer");
  return (
    <p className={`flex items-start gap-2 text-[15px] leading-relaxed ${light ? "text-white/90" : "text-ink/80"}`}>
      <Info className={`mt-0.5 size-[18px] shrink-0 ${light ? "text-white" : "text-brand-700"}`} aria-hidden />
      {t("hosting")}
    </p>
  );
}

/** "Web theo ý tưởng riêng, giá không đổi" (người dùng chốt 02/11/2026) */
export async function CustomIdeaNote({ className = "" }: { className?: string }) {
  const t = await getTranslations("webOffer");
  return (
    <p className={`flex items-start gap-2 rounded-2xl bg-brand-700 px-4 py-3 text-[15px] font-semibold leading-snug text-white ${className}`}>
      <Sparkles className="mt-0.5 size-[18px] shrink-0" aria-hidden />
      {t("customIdea", offerVars())}
    </p>
  );
}

/** Thẻ mẫu trong thư viện: ảnh PC + điện thoại, tên, loại salon, mô tả, Xem demo, Chọn mẫu; có lọc theo loại */
export async function TemplateCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const t = await getTranslations("webOffer");
  const locale = await getLocale();
  const H = headingLevel;
  const cats = ["nail", "hair", "spa", "lash", "makeup", "barber"] as const;
  const catKey = { nail: "catNail", hair: "catHair", spa: "catSpa", lash: "catLash", makeup: "catMakeup", barber: "catBarber" } as const;
  return (
    <TemplateFilter
      label={t("filterLabel")}
      options={[{ value: "all", label: t("filterAll") }, ...cats.map((c) => ({ value: c, label: t(catKey[c]) }))]}
      items={TEMPLATES.map((tpl) => ({
        key: tpl.slug,
        cat: CATEGORY[tpl.slug],
        node: (
          <>
            <Link href={`/website/mau/${tpl.slug}`} tabIndex={-1} aria-hidden className="block">
              <TemplatePreview
                slug={tpl.slug}
                locale={locale}
                name={tpl.name}
                tint={PREVIEW_TINT[tpl.slug]}
                label={{ desktop: t("desktop"), mobile: t("mobile") }}
                className="rounded-none"
              />
            </Link>
            <div className="flex flex-1 flex-col p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <H className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">{tpl.name}</H>
                <span className="rounded-full bg-sand px-2.5 py-0.5 text-[13px] font-medium text-muted ring-1 ring-line">{tr(tpl.card.type, locale)}</span>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{tr(tpl.card.style, locale)}</p>
              <p className="mt-3 text-[13px] font-medium text-ink/70">{t("cardPages", offerVars())}</p>
              <div className="mt-auto grid gap-2.5 pt-6 min-[420px]:grid-cols-2">
                <Link href={`/website/mau/${tpl.slug}`} className="btn-primary min-h-12 px-5 text-[15px]">
                  {t("viewDemo")}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <ChooseTemplateButton template={tpl.name} className="btn-secondary min-h-12 px-5 text-[15px]">
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
