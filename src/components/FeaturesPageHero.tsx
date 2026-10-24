import { ArrowDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { FEATURES, FEATURE_ICONS } from "./featuresData";

export async function FeaturesPageHero() {
  const t = await getTranslations("featuresV2");

  return (
    <section className="sg-page-hero sg-section-glow relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="sg-eyebrow">{t("eyebrow")}</span>
          <h1 className="mt-5 sg-h1">{t("heroTitle")}</h1>
          <p className="sg-lead mx-auto mt-4 max-w-2xl">{t("heroLead")}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://app.salongo.eu/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-3.5 text-base"
            >
              {t("ctaPrimary")}
            </a>
            <Link href="/bang-gia" className="btn-secondary px-8 py-3.5 text-base">
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>

        {/* Bản đồ tính năng: bấm để nhảy tới phần chi tiết */}
        <div className="mt-12 lg:mt-14">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className="text-lg font-bold text-ink sm:text-xl">{t("mapTitle")}</h2>
            <p className="flex items-center gap-1.5 text-sm text-muted">
              <ArrowDown className="size-4" aria-hidden />
              {t("mapHint")}
            </p>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {FEATURES.map(({ id, anchor }) => {
              const Icon = FEATURE_ICONS[id];
              return (
                <li key={id}>
                  <a
                    href={`#${anchor}`}
                    className="sg-card sg-card-hover group flex h-full flex-col gap-3 p-4 sm:flex-row sm:items-start sm:p-5"
                  >
                    <span className="sg-icon-tile size-10 rounded-xl sm:size-11" aria-hidden>
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-ink transition-colors group-hover:text-violet-700">
                        {t(`f.${id}.short`)}
                      </span>
                      <span className="mt-0.5 block text-sm leading-snug text-muted">{t(`f.${id}.tile`)}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
