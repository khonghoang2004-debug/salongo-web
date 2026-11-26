import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHead } from "@/components/landing/SectionHead";
import { kasaPrice } from "@/lib/kasa";
import { TEMPLATE_COUNT_LABEL } from "@/lib/website-offer";
import { offerVars } from "@/components/website/WebsiteOfferParts";
import { previewSrc } from "@/components/website/TemplatePreview";
import { SHOTS } from "@/lib/media";

/** Bảng giá: hai sản phẩm trả một lần (Kasa, Web Studio) để khách thấy đủ mọi thứ SalonGo bán, ngay trên trang giá. */
export async function OtherProducts() {
  const t = await getTranslations("pricing2.other");
  const locale = await getLocale();
  const v = offerVars();
  const cards = [
    {
      key: "kasa",
      href: "/kasa",
      img: SHOTS.checkout.desktop,
      price: t("kasaPrice", { kasa: kasaPrice(locale) }),
      desc: t("kasaDesc"),
    },
    {
      key: "studio",
      href: "/website",
      img: previewSrc("aurel-beauty", "pc", locale),
      price: t("studioPrice", { price: v.price, pages: v.pages }),
      desc: t("studioDesc", { count: TEMPLATE_COUNT_LABEL }),
    },
  ] as const;
  return (
    <section id="san-pham-khac" className="x-section scroll-mt-20 bg-porcelain" aria-labelledby="other-title">
      <div className="x-wrap">
        <SectionHead id="other-title" eyebrow={t("eyebrow")} title={t("title")} className="max-w-[44rem]" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-14 lg:gap-5 [&>*]:min-w-0">
          {cards.map((c) => (
            <article key={c.key} className="flex flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-black/[0.05]">
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-brand-700">{t(`${c.key}Tag`)}</p>
                <h3 className="mt-3 text-[1.85rem] font-medium leading-[1.12] tracking-[-0.02em] text-ink [font-family:var(--font-serif)]">{t(`${c.key}Title`)}</h3>
                <p className="mt-3 text-[1.0313rem] leading-relaxed text-ink/70">{c.desc}</p>
                <p className="mt-6 text-[1.15rem] font-semibold tabular-nums text-ink">{c.price}</p>
                <div className="mt-auto pt-6">
                  <Link href={c.href} className="x-btn-dark">
                    {t(`${c.key}Cta`)}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
              <div className="h-[150px] overflow-hidden pl-6 sm:h-[190px] sm:pl-8" aria-hidden>
                <img src={c.img} alt="" width={2880} height={1800} loading="lazy" decoding="async" className="block h-auto w-[140%] max-w-none rounded-tl-[12px] ring-1 ring-black/[0.07] lg:w-[120%]" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
