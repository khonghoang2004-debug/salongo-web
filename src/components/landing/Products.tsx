import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SHOTS } from "@/lib/media";
import { kasaPrice } from "@/lib/kasa";
import { SectionHead } from "./SectionHead";

/**
 * Ba sản phẩm SalonGo cạnh nhau: thuê bao cho chủ tiệm (khối mận, nổi bật), Gói IČO riêng và Kasa (trả một lần).
 * Điện thoại: xếp dọc, mỗi thẻ có giá và một nút. Máy tính: 3 cột bằng nhau, giá thẳng hàng ở đáy.
 */
export async function Products() {
  const t = await getTranslations("landing.products");
  const locale = await getLocale();
  const items = [
    { key: "salon", href: "/bang-gia", dark: true, img: SHOTS.calendar.desktop, price: t("salon.price") },
    { key: "desk", href: "/goi-ban", dark: false, img: SHOTS.desk.phone, price: t("desk.price") },
    { key: "kasa", href: "/kasa", dark: false, img: SHOTS.checkout.desktop, price: t("kasa.price", { price: kasaPrice(locale) }) },
  ] as const;

  return (
    <section className="x-section bg-white" aria-labelledby="products-title">
      <div className="x-wrap">
        <SectionHead id="products-title" eyebrow={t("eyebrow")} title={t("title")} className="max-w-[46rem]" />
        <div data-stagger className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-3 lg:gap-5 [&>*]:min-w-0">
          {items.map((it) => (
            <article
              key={it.key}
              className={`flex flex-col overflow-hidden rounded-[24px] ${
                it.dark ? "bg-plum text-white" : "bg-porcelain text-ink ring-1 ring-black/[0.05]"
              }`}
            >
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className={`text-[13px] font-medium uppercase tracking-[0.12em] ${it.dark ? "text-[#f1c9d3]" : "text-brand-700"}`}>
                  {t(`${it.key}.tag`)}
                </p>
                <h3 className="mt-3 text-[1.85rem] font-medium leading-[1.12] tracking-[-0.02em] [font-family:var(--font-serif)]">
                  {t(`${it.key}.title`)}
                </h3>
                <p className={`mt-3 text-[1.0313rem] leading-relaxed ${it.dark ? "text-white/75" : "text-ink/70"}`}>{t(`${it.key}.desc`)}</p>
                <div className="mt-auto pt-7">
                  <p className={`flex items-center gap-2 text-[1.15rem] font-semibold tabular-nums tracking-[-0.01em] ${it.dark ? "text-white" : "text-ink"}`}>
                    <Check className={`size-4 ${it.dark ? "text-[#9BD3B4]" : "text-[#2F5E47]"}`} aria-hidden />
                    {it.price}
                  </p>
                  <Link href={it.href} className={`${it.dark ? "x-btn-onDark" : "x-btn-dark"} mt-5 w-full sm:w-auto`}>
                    {t(`${it.key}.cta`)}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
              <div className={`h-[150px] overflow-hidden pl-6 sm:h-[180px] sm:pl-8`} aria-hidden>
                <img
                  src={it.img}
                  alt=""
                  width={it.key === "desk" ? 780 : 2880}
                  height={it.key === "desk" ? 1688 : 1800}
                  loading="lazy"
                  decoding="async"
                  className={`block h-auto max-w-none rounded-tl-[12px] ${it.key === "desk" ? "w-[56%] rounded-tr-[12px]" : "w-[150%] lg:w-[170%]"} ${it.dark ? "opacity-95" : "ring-1 ring-black/[0.07]"}`}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
