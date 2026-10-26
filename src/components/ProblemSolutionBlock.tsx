import {
  Calendar,
  CalendarCheck,
  FileText,
  Calculator,
  Monitor,
  BarChart3,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

const ICON_PROPS = {
  size: 40,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  className: "size-10 text-accent-strong",
};

const ICONS = [
  Calendar,
  CalendarCheck,
  FileText,
  Calculator,
  Monitor,
  BarChart3,
] as const;

const BULLET_KEYS = [
  ["solution1Bullet1", "solution1Bullet2", "solution1Bullet3"],
  ["solution2Bullet1", "solution2Bullet2", "solution2Bullet3"],
  ["solution3Bullet1", "solution3Bullet2", "solution3Bullet3"],
  ["solution4Bullet1", "solution4Bullet2", "solution4Bullet3"],
  ["solution5Bullet1", "solution5Bullet2", "solution5Bullet3"],
  ["solution6Bullet1", "solution6Bullet2", "solution6Bullet3"],
] as const;

type Index = 1 | 2 | 3 | 4 | 5 | 6;

export async function ProblemSolutionBlock({ index }: { index: Index }) {
  const tProblem = await getTranslations("problem");
  const tSolution = await getTranslations("solution");
  const tPage = await getTranslations("solutionsPage");

  const i = index - 1;
  const Icon = ICONS[i];
  const bullets = BULLET_KEYS[i];

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sg-lg transition-all hover:shadow-sg-lg sm:p-6">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-4">
        {/* Problem */}
        <div className="flex gap-3">
          <div
            className="flex size-16 shrink-0 items-center justify-center sg-icon-tile rounded-2xl"
          >
            <Icon {...ICON_PROPS} />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-ink/80">
              {tProblem(`item${index}Title`)}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {tProblem(`item${index}Desc`)}
            </p>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden items-center justify-center lg:flex" aria-hidden>
          <span
            className="text-2xl text-accent-strong transition-transform duration-300 lg:hover:translate-x-1"
            style={{ filter: "drop-shadow(0 2px 4px rgba(139,92,246,0.2))" }}
          >
            →
          </span>
        </div>
        <div className="flex items-center justify-center py-1 lg:hidden" aria-hidden>
          <span className="text-accent-strong">↓</span>
        </div>

        {/* Solution */}
        <div className="rounded-xl bg-gradient-to-br from-brand-50/60 to-brand-50/40 p-4 sm:p-5" style={{ borderRadius: 16 }}>
          <h4 className="text-lg font-bold text-ink">
            {tSolution(`item${index}Title`)}
          </h4>
          <ul className="mt-2 space-y-1.5">
            {bullets.map((key) => (
              <li key={key} className="flex items-center gap-2 text-muted">
                <span
                  className="sg-gradient size-1.5 shrink-0 rounded-full"
                />
                {tPage(key)}
              </li>
            ))}
          </ul>
          <p className="mt-2.5 flex items-center gap-2 font-semibold text-emerald-600">
            <span className="text-lg">✓</span>
            {tSolution(`result${index}`)}
          </p>
        </div>
      </div>
    </div>
  );
}
