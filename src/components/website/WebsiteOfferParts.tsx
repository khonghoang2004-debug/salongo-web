import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { WEBSITE_MAX_PAGES, WEBSITE_PRICE_KC, formatKc } from "@/lib/website-offer";
import { CATEGORY, TEMPLATES } from "./templates/registry";
import { TemplateFilter } from "./TemplateFilter";
import { tr } from "./templates/types";
import { PREVIEW_TINT, TemplatePreview } from "./TemplatePreview";
import { ChooseTemplateButton } from "./WebsiteContact";
import { fontAtelier } from "./atelier";

export const offerVars = () => ({ price: formatKc(WEBSITE_PRICE_KC), pages: WEBSITE_MAX_PAGES });

/** Tiêu đề 2 dòng: phần sau dấu "|" ở dòng thứ hai, màu đỏ đô (nhấn mạnh như hero trang chủ) */
export function SplitTitle({ text }: { text: string }) {
  const [a, b] = text.split("|");
  return (
    <>
      <span className="block">{a}</span>{" "}
      {b && <span className="block text-brand-700">{b}</span>}
    </>
  );
}

/** Giá nổi bật trên một dòng: "999 Kč cho 1 website tối đa 5 trang" */
export async function OfferPrice({ light = false }: { light?: boolean }) {
  const t = await getTranslations("webOffer");
  const v = offerVars();
  return (
    <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className={`whitespace-nowrap font-display text-[2.75rem] font-semibold leading-none tracking-[-0.04em] sm:text-[3.5rem] ${light ? "text-white" : "text-brand-700"}`}>
        {v.price}
      </span>
      <span className={`text-lg font-semibold sm:text-xl ${light ? "text-white/90" : "text-ink"}`}>{t("priceLine", v)}</span>
    </p>
  );
}

/** "Ý tưởng riêng, giá không đổi" (người dùng chốt câu chữ 02/11/2026): thẻ sáng, vạch nhấn bên trái */
export async function CustomIdeaNote({ className = "" }: { className?: string }) {
  const t = await getTranslations("webOffer");
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-brand-100 bg-white py-4 pl-6 pr-5 shadow-sg-sm ${className}`}>
      <span className="absolute inset-y-3 left-0 w-1 rounded-full bg-brand-700" aria-hidden />
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">{t("customIdeaLabel")}</p>
      <p className="mt-1 text-[15px] leading-relaxed text-ink sm:text-base">{t("customIdea", offerVars())}</p>
    </div>
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
                <h3 className={`${fontAtelier.className} min-w-0 flex-1 truncate text-[1.75rem] font-medium leading-none text-[#1C1A17]`}>{tpl.name}</h3>
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
