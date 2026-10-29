import { ArrowDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { FEATURES, FEATURE_ICONS } from "./featuresData";
import { PageHero } from "./ui/PageHero";

export async function FeaturesPageHero() {
  const t = await getTranslations("featuresV2");
  const tNav = await getTranslations("nav");

  return (
    <PageHero
      crumb={tNav("features")}
      title={t("heroTitle")}
      lead={t("heroLead")}
      actions={
        <>
          <a
            href="https://app.salongo.eu/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-7 py-4 text-base"
          >
            {t("ctaPrimary")}
          </a>
          <Link href="/bang-gia" className="btn-secondary px-7 py-4 text-base">
            {t("ctaSecondary")}
          </Link>
        </>
      }
    >
      {/* Bản đồ tính năng: bấm để nhảy tới phần chi tiết */}
      <div className="mt-14 border-t border-line pt-8 lg:mt-16">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-lg font-semibold text-ink">{t("mapTitle")}</h2>
          <p className="flex items-center gap-1.5 text-sm text-muted">
            <ArrowDown className="size-4" aria-hidden />
            {t("mapHint")}
          </p>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3">
          {FEATURES.map(({ id, anchor }) => {
            const Icon = FEATURE_ICONS[id];
            return (
              <li key={id}>
                <a
                  href={`#${anchor}`}
                  className="group flex h-full items-start gap-3 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-brand-700 sm:p-5"
                >
                  <span className="sg-icon-tile size-10 rounded-xl" aria-hidden>
                    <Icon className="size-5" />
                  </span>
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
