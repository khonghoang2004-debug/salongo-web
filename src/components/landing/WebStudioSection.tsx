import { TEMPLATE_COUNT_LABEL } from "@/lib/website-offer";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { TEMPLATES } from "../website/templates/registry";
import { tr } from "../website/templates/types";
import { previewSrc, templateShot } from "../website/TemplatePreview";
import { offerVars } from "../website/WebsiteOfferParts";
import { DeviceDesktop, DevicePhone } from "./Shots";
import { SectionHead } from "./SectionHead";

// Mẫu lớn trong khung máy tính + iPhone; dải bên dưới cuộn ngang qua 10 mẫu đầu của thư viện
const HERO_PICK = "aurel-beauty";
const STRIP = 10;

/**
 * SalonGo Web Studio trên trang chủ: một khối mận đậm lớn như trang sản phẩm riêng (Web Studio là mảng chính của SalonGo,
 * không thu nhỏ). Điện thoại: chữ, giá, hai nút, ảnh mẫu, rồi dải mẫu kéo ngang (scroll-snap). Máy tính: hai cột + dải mẫu.
 */
export async function WebStudioSection() {
  const t = await getTranslations("webOffer");
  const s = await getTranslations("landing.studio");
  const locale = await getLocale();
  const v = offerVars();
  const [pl1, pl2] = t("priceLine", v).split("|");
  const shot = templateShot(HERO_PICK, locale);
  const strip = TEMPLATES.filter((x) => x.slug !== HERO_PICK).slice(0, STRIP);

  return (
    <section className="bg-white py-[clamp(3rem,2rem+4vw,6rem)]" aria-labelledby="web-offer-title">
      <div className="x-wrap">
        <div className="relative overflow-hidden rounded-[28px] bg-plum text-white">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_10%,rgba(241,201,211,0.16)_0%,rgba(42,15,23,0)_60%)]"
            aria-hidden
          />
          <div className="relative grid gap-10 p-6 pt-9 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-16 [&>*]:min-w-0">
            <div className="lg:col-span-6 [&_h2]:lg:!text-[clamp(2.4rem,1rem+2vw,3.3rem)]">
              <SectionHead id="web-offer-title" eyebrow={s("eyebrow")} title={s("title")} onDark />
              <p className="x-lead mt-5 max-w-[32rem] !text-white/[0.72]">{s("lead", { count: TEMPLATE_COUNT_LABEL })}</p>
              <div className="mt-8 flex flex-wrap items-end gap-x-3 gap-y-1 border-t border-white/10 pt-6">
                <p className="text-[15px] font-medium text-white/60">{t("priceLabel")}</p>
                <p className="whitespace-nowrap text-[2.6rem] font-semibold leading-none tracking-[-0.04em] text-white">{v.price}</p>
                <p className="basis-full pt-1.5 text-[15px] leading-snug text-white/60">
                  {pl1}
                  {pl2 && <span className="block text-white/80">{pl2}</span>}
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/website" className="x-btn-onDark !min-h-[52px] !px-7 text-base">
                  {t("ctaTemplates")}
                  <ArrowRight className="size-[18px]" aria-hidden />
                </Link>
                <Link href="/website#lien-he" className="x-btn-ghostDark !min-h-[52px] !px-7 text-base">
                  {t("ctaContact")}
                </Link>
              </div>
            </div>

            <Link href={`/website/mau/${HERO_PICK}`} tabIndex={-1} aria-hidden className="block lg:col-span-6">
              <div className="grid grid-cols-[minmax(0,1fr)_24%] items-end gap-3 sm:gap-5">
                <DeviceDesktop src={shot.desktop} width={shot.dw} height={shot.dh} alt="" />
                <DevicePhone shot={shot} alt="" />
              </div>
            </Link>
          </div>

          {/* Dải mẫu: kéo ngang trên điện thoại, cuộn ngang bằng trackpad trên máy tính */}
          <div className="relative border-t border-white/10 pb-7 pt-6 sm:pb-9">
            <div className="flex items-center justify-between gap-4 px-6 sm:px-10 lg:px-16">
              <p className="text-[14px] text-white/55">{s("scroll")}</p>
              <Link href="/website" className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-[15px] font-medium text-white underline decoration-white/30 underline-offset-[5px] hover:decoration-white">
                {t("allTemplates", { count: TEMPLATE_COUNT_LABEL })}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <ul className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] sm:scroll-px-10 sm:px-10 lg:scroll-px-16 lg:px-16 [&::-webkit-scrollbar]:hidden">
              {strip.map((tpl) => (
                <li key={tpl.slug} className="w-[72%] max-w-[300px] shrink-0 snap-start sm:w-[42%] lg:w-[23%]">
                  <Link
                    href={`/website/mau/${tpl.slug}`}
                    className="group block rounded-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-plum"
                  >
                    <span className="block overflow-hidden rounded-[12px] ring-1 ring-white/10">
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
                    <span className="mt-3 block truncate text-[1.0313rem] font-semibold tracking-[-0.01em] text-white">{tpl.name}</span>
                    <span className="mt-0.5 block truncate text-[14.5px] text-white/55">{tr(tpl.card.type, locale)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
