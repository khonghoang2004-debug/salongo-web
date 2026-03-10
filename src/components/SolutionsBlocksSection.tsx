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
    <section className="border-t border-neutral-100 bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl lg:text-4xl">
            {tProblem("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#6B7280]">
            {tProblem("subtitle")}
          </p>
        </div>

        <div className="mt-14 space-y-16 lg:mt-16">
          {GROUPS.map(({ groupTitleKey, indices }) => (
            <div key={groupTitleKey}>
              <h3 className="mb-8 text-xl font-bold text-[#1F2937] sm:text-2xl">
                {t(groupTitleKey)}
              </h3>
              <div className="space-y-8">
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
