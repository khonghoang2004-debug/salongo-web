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
    <section className="sg-section sg-section-alt">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center sg-h2">
          {t("resultsTitle")}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4">
          {stats.map(({ titleKey, descKey }) => (
            <div
              key={titleKey}
              className="rounded-2xl border border-line bg-white p-6 shadow-sg-lg transition-all hover:shadow-sg-lg"
              style={{ borderRadius: 16 }}
            >
              <h3 className="text-lg font-bold text-ink">
                {t(titleKey)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
