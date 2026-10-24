import { getTranslations } from "next-intl/server";
import { ProblemSolutionBlock } from "./ProblemSolutionBlock";

const GROUPS: { groupTitleKey: "group1Title" | "group2Title" | "group3Title"; indices: [number, number] }[] = [
  { groupTitleKey: "group1Title", indices: [1, 4] },
  { groupTitleKey: "group2Title", indices: [2, 3] },
  { groupTitleKey: "group3Title", indices: [5, 6] },
];

export async function SolutionsBlocksSection() {
  const t = await getTranslations("solutionsPage");
  const tProblem = await getTranslations("problem");

  return (
    <section className="sg-section bg-white">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="sg-h2">
            {tProblem("title")}
          </h2>
          <p className="sg-lead mx-auto mt-3 max-w-2xl">
            {tProblem("subtitle")}
          </p>
        </div>

        <div className="mt-6 space-y-8 lg:mt-8">
          {GROUPS.map(({ groupTitleKey, indices }) => (
            <div key={groupTitleKey}>
              <h3 className="mb-4 text-xl font-bold text-ink sm:text-2xl">
                {t(groupTitleKey)}
              </h3>
              <div className="space-y-4">
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
