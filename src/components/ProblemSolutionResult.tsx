import { getTranslations } from "next-intl/server";

const indices = [1, 2, 3, 4, 5, 6] as const;

export async function ProblemSolutionResult() {
  const tProblem = await getTranslations("problem");
  const tSolution = await getTranslations("solution");

  return (
    <section className="sg-section bg-white">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="sg-h2">
            {tProblem("title")}
          </h2>
          <p className="sg-lead mx-auto mt-5 max-w-2xl">
            {tProblem("subtitle")}
          </p>
        </div>

        <div className="mt-10 space-y-12 lg:mt-14">
          {indices.map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-line bg-sand p-8 shadow-sg-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-muted">
                {tSolution("problemLabel")}
              </p>
              <h3 className="mt-2 text-lg font-bold text-ink">
                {tProblem(`item${i}Title`)}
              </h3>
              <p className="mt-4 text-sm text-muted">
                {tProblem(`item${i}Desc`)}
              </p>

              <div className="mt-6 flex items-center gap-2 text-accent-strong">
                <span className="text-lg">→</span>
                <span className="text-sm font-semibold">{tSolution("solutionLabel")}</span>
              </div>
              <h4 className="mt-2 text-lg font-bold text-ink">
                {tSolution(`item${i}Title`)}
              </h4>
              <p className="mt-2 text-muted">
                {tSolution(`item${i}Desc`)}
              </p>

              <div className="mt-6 flex items-center gap-2 font-semibold text-emerald-600">
                <span className="text-lg">✓</span>
                <span>{tSolution(`result${i}`)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="sg-section-tint mt-10 rounded-2xl p-8 text-center ring-1 ring-brand-100 lg:mt-14">
          <h3 className="text-xl font-bold text-ink">
            {tSolution("title")}
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            {tSolution("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
