import { getTranslations } from "next-intl/server";
import { ProblemSolutionBlock } from "./ProblemSolutionBlock";
import { SectionHead } from "./ui/SectionHead";

const GROUPS: { groupTitleKey: "group1Title" | "group2Title" | "group3Title"; indices: [number, number] }[] = [
  { groupTitleKey: "group1Title", indices: [1, 4] },
  { groupTitleKey: "group2Title", indices: [2, 3] },
  { groupTitleKey: "group3Title", indices: [5, 6] },
];

export async function SolutionsBlocksSection() {
  const t = await getTranslations("solutionsPage");
  const tProblem = await getTranslations("problem");

  return (
    <section className="sg-section">
      <div className="sg-container">
        <SectionHead title={tProblem("title")} lead={tProblem("subtitle")} />

        <div className="mt-12 space-y-12 lg:mt-16 lg:space-y-16">
          {GROUPS.map(({ groupTitleKey, indices }, gi) => (
            <div key={groupTitleKey} className="grid gap-5 border-t border-line pt-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-3">
                <span className="font-display text-sm font-semibold text-brand-700">0{gi + 1}</span>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-ink lg:sticky lg:top-24">{t(groupTitleKey)}</h3>
              </div>
              <div className="space-y-4 lg:col-span-9">
                {indices.map((idx) => (
                  <ProblemSolutionBlock key={idx} index={idx as 1 | 2 | 3 | 4 | 5 | 6} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
