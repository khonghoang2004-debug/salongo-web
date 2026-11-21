import { TEMPLATE_COUNT_LABEL } from "@/lib/website-offer";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { TEMPLATES } from "../website/templates/registry";
import { tr } from "../website/templates/types";
import { previewSrc, templateShot } from "../website/TemplatePreview";
import { offerVars } from "../website/WebsiteOfferParts";
import { DeviceDesktop, DevicePhone } from "./Shots";

// Mẫu tiêu biểu: một mẫu lớn trong khung máy tính + iPhone, ba mẫu nhỏ bên dưới (điện thoại 1, máy tính bảng 2, máy tính 3)
const HERO_PICK = "aurel-beauty";
const HOME_PICKS = ["atelier-noir", "maison-claire", "thermae-wellness"];
const SHOW = ["", "hidden sm:flex", "hidden lg:flex"];

// SalonGo Web Studio trên trang chủ (ngay sau khối EET): cùng kiểu trang /website (khung máy thật, màu đỏ đô), gọn một khối.
export async function WebStudioSection() {
  const t = await getTranslations("webOffer");
  const locale = await getLocale();
  const v = offerVars();
  const [ha, hb] = t("homeTitle").split("|");
  const [pl1, pl2] = t("priceLine", v).split("|");
  const shot = templateShot(HERO_PICK, locale);
  const picks = HOME_PICKS.map((slug) => TEMPLATES.find((x) => x.slug === slug)).filter((x) => x !== undefined);

  return (
    <section className="bg-white pb-[clamp(3rem,2rem+4vw,5.5rem)]" aria-labelledby="web-offer-title">
      <div className="x-wrap">
        <div className="x-panel overflow-hidden bg-porcelain ring-1 ring-black/[0.04]">
          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-14 [&>*]:min-w-0">
            <div className="lg:col-span-6">
              <p className="inline-flex items-center rounded-full bg-blush px-3 py-1 text-[14px] font-semibold text-brand-800">{t("studio")}</p>
              <h2 id="web-offer-title" className="x-h2 mt-5 text-ink lg:!text-[clamp(2.2rem,1rem+1.8vw,3rem)]">
                {ha} {hb && <span className="text-brand-700">{hb}</span>}
              </h2>
              <p className="x-lead mt-4 max-w-[30rem]">{t("lead")}</p>
              <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1">
                <p className="text-[15px] font-medium text-muted">{t("priceLabel")}</p>
                <p className="whitespace-nowrap text-[2.5rem] font-semibold leading-none tracking-[-0.04em] text-brand-700">{v.price}</p>
                <p className="basis-full pt-1 text-[15px] leading-snug text-muted">
                  {pl1}
                  {pl2 && <span className="block text-ink/80">{pl2}</span>}
                </p>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/website" className="x-btn-primary !min-h-[52px] !px-7 text-base">
                  {t("ctaTemplates")}
                  <ArrowRight className="size-[18px]" aria-hidden />
                </Link>
                <Link href="/website#lien-he" className="x-btn-light !min-h-[52px] !px-7 text-base">
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

          <div className="flex flex-col gap-3 border-t border-line bg-white/60 px-6 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:px-10 lg:flex-nowrap lg:gap-6 lg:px-14">
            {picks.map((tpl, i) => (
              <Link
                key={tpl.slug}
                href={`/website/mau/${tpl.slug}`}
                className={`group flex min-h-11 min-w-0 flex-1 items-center gap-3.5 rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-4 ${SHOW[i]}`}
              >
                <span className="block w-[38%] max-w-[150px] shrink-0 overflow-hidden rounded-[8px] ring-1 ring-black/[0.07]">
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
                  <span className="block truncate text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink">{tpl.name}</span>
                  <span className="mt-0.5 block truncate text-[15px] text-muted">{tr(tpl.card.type, locale)}</span>
                </span>
              </Link>
            ))}
            <Link href="/website" className="x-link min-h-11 shrink-0 whitespace-nowrap text-[15px] sm:basis-full lg:basis-auto">
              {t("allTemplates", { count: TEMPLATE_COUNT_LABEL })}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
