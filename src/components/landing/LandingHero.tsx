import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SIGNUP_URL, appLink } from "@/lib/app-links";
import { DesktopShot, PhoneShot } from "./Shots";
import { DownloadBadges } from "@/components/site/DownloadBadges";
import { splitTitle } from "./SectionHead";

/**
 * Hero trang chủ (bản premium 2026-11): chữ ở trên, ảnh app lớn ở dưới như Linear/Stripe.
 * Điện thoại: chữ canh trái, nút rộng hết hàng, ảnh máy tính + iPhone chồng lên nhau. Máy tính: chữ canh giữa, ảnh tràn rộng.
 */
export async function LandingHero() {
  const t = await getTranslations("landing.hero");
  const nav = await getTranslations("site.nav");
  const locale = await getLocale();
  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="hero-title">
      {/* Quầng sáng hồng phấn rất nhẹ phía sau tiêu đề */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(60%_55%_at_50%_0%,#F8E9ED_0%,rgba(255,255,255,0)_70%)]"
        aria-hidden
      />
      <div className="x-wrap relative pt-10 sm:pt-16 lg:pt-20">
        <div className="max-w-[46rem] lg:mx-auto lg:text-center">
          <Link
            href="/eet-2-0"
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-white/80 py-1.5 pl-1.5 pr-3.5 text-[13.5px] text-ink/80 transition-colors hover:border-ink/25"
          >
            <span className="shrink-0 whitespace-nowrap rounded-full bg-[#E8F1EC] px-2 py-0.5 text-[12px] font-semibold text-[#2F5E47]">EET 2.0</span>
            <span className="truncate">{t("eet")}</span>
            <ArrowRight className="size-3.5 shrink-0 text-ink/40" aria-hidden />
          </Link>
          <h1 id="hero-title" className="x-display mt-7 text-ink">{splitTitle(t("title"))}</h1>
          <p className="x-lead mt-6 max-w-[36rem] lg:mx-auto">{t("lead")}</p>
          <div data-cta className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-center">
            <a href={appLink(SIGNUP_URL, locale)} className="x-btn-primary !min-h-[54px] !px-8 text-base shadow-[0_10px_30px_-12px_rgba(122,30,52,0.55)]">
              {t("cta")}
              <ArrowRight className="size-[18px]" aria-hidden />
            </a>
            <Link href="/bang-gia" className="x-btn-light !min-h-[54px] !px-8 text-base">
              {t("secondary")}
            </Link>
          </div>
          <p className="mt-5 text-[14.5px] text-muted">{t("note")}</p>
          <DownloadBadges
            className="mt-6 lg:justify-center"
            labels={{ label: nav("download"), mac: nav("mac"), win: nav("windows"), ios: nav("appStoreShort") }}
          />
        </div>

        <div className="relative mx-auto mt-12 max-w-[1120px] pb-10 sm:mt-16 lg:mt-20 lg:pb-20">
          <div className="absolute inset-x-[-20px] bottom-0 top-[18%] rounded-t-[32px] bg-porcelain sm:inset-x-[-32px] lg:inset-x-[-80px]" aria-hidden />
          <div className="relative pr-[18%] sm:pr-[14%]">
            <DesktopShot id="calendar" alt={t("altDesktop")} priority className="x-hero-desktop" />
          </div>
          <PhoneShot
            id="overview"
            alt={t("altPhone")}
            priority
            className="x-hero-phone absolute bottom-4 right-0 w-[34%] max-w-[250px] sm:bottom-6 sm:w-[24%] lg:bottom-10"
          />
        </div>
      </div>
    </section>
  );
}
