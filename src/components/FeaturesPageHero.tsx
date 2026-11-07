import { ArrowDown } from "lucide-react";
import { appLink, SIGNUP_URL } from "@/lib/app-links";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { FEATURES, FEATURE_ICONS } from "./featuresData";
import { PageHero } from "./ui/PageHero";

export async function FeaturesPageHero() {
  const t = await getTranslations("featuresV2");
  const locale = await getLocale();
  const tNav = await getTranslations("nav");

  return (
    <PageHero
      crumb={tNav("features")}
      title={t("heroTitle")}
      lead={t("heroLead")}
      actions={
        <>
          <a
            href={appLink(SIGNUP_URL, locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-7 text-base"
          >
            {t("ctaPrimary")}
          </a>
          <Link href="/bang-gia" className="btn-secondary px-7 text-base">
            {t("ctaSecondary")}
          </Link>
        </>
      }
    >
      {/* Bản đồ tính năng: bấm để nhảy tới phần chi tiết */}
      <div className="mt-8 border-t border-line pt-6 lg:mt-12">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-display text-[1.5rem] font-semibold text-ink">{t("mapTitle")}</h2>
          <p className="flex items-center gap-1.5 text-sm text-muted">
            <ArrowDown className="size-4" aria-hidden />
            {t("mapHint")}
          </p>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-x-6 sm:gap-x-8 lg:grid-cols-3">
          {FEATURES.map(({ id, anchor }) => {
            const Icon = FEATURE_ICONS[id];
            return (
              <li key={id}>
                <a
                  href={`#${anchor}`}
                  className="group flex h-full min-h-14 items-start gap-3 border-b border-line py-4"
                >
                  <Icon className="mt-0.5 size-5 shrink-0 text-brand-700" strokeWidth={1.75} aria-hidden />
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold text-ink transition-colors group-hover:text-brand-700">
                      {t(`f.${id}.short`)}
                    </span>
                    <span className="mt-0.5 hidden text-sm leading-snug text-muted sm:block">{t(`f.${id}.tile`)}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </PageHero>
  );
}
