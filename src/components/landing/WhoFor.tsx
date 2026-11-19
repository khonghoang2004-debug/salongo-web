import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { SHOTS } from "@/lib/media";

/** Hai cách dùng SalonGo: chủ tiệm (khối mận) và người thuê bàn có IČO riêng (khối hồng phấn). Hai khối khác bố cục, không phải hai thẻ giống nhau. */
export async function WhoFor() {
  const t = await getTranslations("landing.who");
  return (
    <section className="x-section bg-white" aria-labelledby="who-title">
      <div className="x-wrap">
        <h2 id="who-title" className="x-h2 max-w-[38rem] text-ink">{t("title")}</h2>
        <div className="mt-12 grid gap-4 lg:grid-cols-12 [&>*]:min-w-0">
          <article className="x-panel relative flex flex-col overflow-hidden bg-plum p-7 text-white sm:p-10 lg:col-span-7">
            <p className="text-[14px] text-white/60">{t("salonTag")}</p>
            <h3 className="x-h2 mt-3 !text-[clamp(1.75rem,1.2rem+1.6vw,2.6rem)]">{t("salonTitle")}</h3>
            <p className="mt-4 max-w-[30rem] text-[1.0625rem] leading-relaxed text-white/75">{t("salonDesc")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/bang-gia" className="x-btn-onDark">
                {t("salonCta")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <p className="text-[15px] tabular-nums text-white/70">{t("salonPrice")}</p>
            </div>
            <div className="-mb-10 -mr-10 mt-10 hidden self-end sm:block sm:w-[78%]">
              <img src={SHOTS.calendar.desktop} alt="" width={SHOTS.calendar.dw} height={SHOTS.calendar.dh} loading="lazy" decoding="async" className="block h-auto w-full rounded-tl-[12px] opacity-95" />
            </div>
          </article>
          <article className="x-panel flex flex-col bg-blush/70 p-7 sm:p-10 lg:col-span-5">
            <p className="text-[14px] text-brand-800/70">{t("deskTag")}</p>
            <h3 className="x-h2 mt-3 !text-[clamp(1.75rem,1.2rem+1.6vw,2.6rem)] text-ink">{t("deskTitle")}</h3>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/70">{t("deskDesc")}</p>
            <p className="mt-8 text-[2.4rem] font-semibold tabular-nums tracking-[-0.03em] text-brand-800">{t("deskPrice")}</p>
            <div className="mt-auto pt-8">
              <Link href="/goi-ban" className="x-btn-primary">
                {t("deskCta")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
