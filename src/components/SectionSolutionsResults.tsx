import { getTranslations } from "next-intl/server";

const stats = [
  { titleKey: "resultStat1Title" as const, descKey: "resultStat1Desc" as const },
  { titleKey: "resultStat2Title" as const, descKey: "resultStat2Desc" as const },
  { titleKey: "resultStat3Title" as const, descKey: "resultStat3Desc" as const },
  { titleKey: "resultStat4Title" as const, descKey: "resultStat4Desc" as const },
];

export async function SectionSolutionsResults() {
  const t = await getTranslations("solutionsPage");

  return (
    <section className="sg-section pt-0 sm:pt-0 lg:pt-0">
      <div className="sg-container">
        <div data-reveal="scale" className="rounded-[28px] bg-brand-700 p-7 text-white sm:p-10 lg:p-14">
          <h2 className="max-w-2xl font-display text-[1.875rem] font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[2.375rem] lg:text-[3rem]">
            {t("resultsTitle")}
          </h2>
          <div data-stagger className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {stats.map(({ titleKey, descKey }) => (
              <div key={titleKey} className="border-t border-white/20 py-6">
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{t(titleKey)}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/75">{t(descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
