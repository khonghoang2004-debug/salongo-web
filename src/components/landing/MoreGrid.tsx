import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { PhoneShot } from "./Shots";
import { SHOTS } from "@/lib/media";

export async function MoreGrid() {
  const t = await getTranslations("landing.more");
  const small = ["branches", "staff", "invoices", "devices"] as const;
  return (
    <section className="x-section bg-porcelain" aria-labelledby="more-title">
      <div className="x-wrap">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 id="more-title" className="x-h2 max-w-[40rem] text-ink">{t("title")}</h2>
          <Link href="/tinh-nang" className="x-link shrink-0">
            {t("all")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 [&>*]:min-w-0">
          <article className="x-panel flex flex-col overflow-hidden bg-white ring-1 ring-black/[0.05] lg:col-span-7">
            <div className="p-7 sm:p-9">
              <h3 className="x-h3 text-ink">{t("customers")}</h3>
              <p className="x-body mt-2 max-w-[28rem]">{t("customersDesc")}</p>
            </div>
            <div className="mt-auto pl-7 sm:pl-9">
              <img src={SHOTS.customers.desktop} alt={t("customers")} width={SHOTS.customers.dw} height={SHOTS.customers.dh} loading="lazy" decoding="async" className="block h-auto w-full rounded-tl-[12px] ring-1 ring-black/[0.06]" />
            </div>
          </article>
          <article className="x-panel flex flex-col overflow-hidden bg-brand-800 text-white lg:col-span-5">
            <div className="p-7 sm:p-9">
              <h3 className="x-h3">{t("marketing")}</h3>
              <p className="mt-2 max-w-[24rem] leading-relaxed text-white/75">{t("marketingDesc")}</p>
            </div>
            <div className="mt-auto flex justify-center px-7 pt-2">
              <PhoneShot id="marketing" alt={t("marketing")} crop className="h-[300px] w-[230px] sm:h-[340px] sm:w-[250px]" />
            </div>
          </article>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {small.map((k) => (
            <li key={k} className="border-t border-ink/15 pt-5">
              <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink">{t(k)}</h3>
              <p className="x-body mt-2 text-[15px]">{t(`${k}Desc`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
