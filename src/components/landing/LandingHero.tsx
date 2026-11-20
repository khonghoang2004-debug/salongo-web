import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SIGNUP_URL, appLink } from "@/lib/app-links";
import { DesktopShot, PhoneShot } from "./Shots";

export async function LandingHero() {
  const t = await getTranslations("landing.hero");
  const locale = await getLocale();
  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-16">
      <div className="x-wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-8 [&>*]:min-w-0">
        <div className="lg:col-span-6 lg:pr-6 xl:col-span-5">
          <Link
            href="/eet-2-0"
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 text-[13.5px] text-ink/80 transition-colors hover:border-ink/25"
          >
            <span className="shrink-0 whitespace-nowrap rounded-full bg-[#E8F1EC] px-2 py-0.5 text-[12px] font-semibold text-[#2F5E47]">EET 2.0</span>
            <span className="truncate">{t("eet")}</span>
          </Link>
          <h1 className="x-display mt-6 text-ink lg:!text-[clamp(3rem,1rem+3.6vw,4.6rem)]">{t("title")}</h1>
          <p className="x-lead mt-6 max-w-[34rem]">{t("lead")}</p>
          <div data-cta className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={appLink(SIGNUP_URL, locale)} className="x-btn-primary !min-h-[52px] !px-7 text-base">
              {t("cta")}
            </a>
            <Link href="/bang-gia" className="x-btn-light !min-h-[52px] !px-7 text-base">
              {t("secondary")}
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted">{t("note")}</p>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-7">
          {/* Nền sứ bo tròn tràn ra mép phải màn hình trên máy tính */}
          <div className="absolute -inset-x-5 -bottom-16 top-12 rounded-[28px] bg-porcelain sm:-inset-x-8 lg:-right-[50vw] lg:left-10 lg:top-10 lg:rounded-r-none" aria-hidden />
          <div className="relative pb-6 sm:pb-[12%] sm:pl-[14%]">
            <DesktopShot id="calendar" alt={t("altDesktop")} priority className="x-hero-desktop hidden sm:block lg:w-[118%] lg:max-w-none" />
            <PhoneShot
              id="checkout"
              alt={t("altPhone")}
              priority
              className="x-hero-phone mx-auto w-[64%] max-w-[290px] sm:absolute sm:-bottom-[14%] sm:left-0 sm:mx-0 sm:w-[24%] sm:max-w-[220px] lg:-left-4 lg:w-[32%] xl:w-[24%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
