import { getTranslations } from "next-intl/server";

const indices = [1, 2, 3, 4, 5, 6] as const;

export async function ProblemSolutionResult() {
  const tProblem = await getTranslations("problem");
  const tSolution = await getTranslations("solution");

  return (
    <section className="border-t border-neutral-100 bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl lg:text-4xl">
            {tProblem("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[#6B7280]">
            {tProblem("subtitle")}
          </p>
        </div>

        <div className="mt-16 space-y-16 lg:mt-20">
          {indices.map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-neutral-100 bg-neutral-50/50 p-8 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-[#6B7280]">
                {tSolution("problemLabel")}
              </p>
              <h3 className="mt-2 text-lg font-bold text-[#1F2937]">
                {tProblem(`item${i}Title`)}
              </h3>
              <p className="mt-4 text-sm text-[#6B7280]">
                {tProblem(`item${i}Desc`)}
              </p>

              <div className="mt-6 flex items-center gap-2 text-[#EC4899]">
                <span className="text-lg">→</span>
                <span className="text-sm font-semibold">{tSolution("solutionLabel")}</span>
              </div>
              <h4 className="mt-2 text-lg font-bold text-[#1F2937]">
                {tSolution(`item${i}Title`)}
              </h4>
              <p className="mt-2 text-[#6B7280]">
                {tSolution(`item${i}Desc`)}
              </p>

              <div className="mt-6 flex items-center gap-2 font-semibold text-emerald-600">
                <span className="text-lg">✓</span>
                <span>{tSolution(`result${i}`)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl p-8 text-center lg:mt-20" style={{ background: "linear-gradient(135deg, rgba(252,231,243,0.5) 0%, rgba(250,240,255,0.5) 100%)" }}>
          <h3 className="text-xl font-bold text-[#1F2937]">
            {tSolution("title")}
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-[#6B7280]">
            {tSolution("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
