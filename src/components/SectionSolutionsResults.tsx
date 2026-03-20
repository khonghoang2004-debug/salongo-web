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
    <section className="border-t border-neutral-100 bg-neutral-50/50 px-4 pt-6 pb-8 sm:px-6 sm:pt-8 sm:pb-10 lg:px-8 lg:pt-10 lg:pb-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#1F2937] lg:text-3xl">
          {t("resultsTitle")}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4">
          {stats.map(({ titleKey, descKey }) => (
            <div
              key={titleKey}
              className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
              style={{ borderRadius: 16 }}
            >
              <h3 className="text-lg font-bold text-[#1F2937]">
                {t(titleKey)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
