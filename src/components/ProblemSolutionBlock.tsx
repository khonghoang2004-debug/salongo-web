import {
  Calendar,
  CalendarCheck,
  FileText,
  Calculator,
  Monitor,
  BarChart3,
  Check,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

const ICON_PROPS = {
  size: 40,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  className: "size-5",
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
    <div className="grid overflow-hidden rounded-[20px] border border-line bg-white md:grid-cols-2">
      {/* Vấn đề */}
      <div className="p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#FBF7F7] text-ink/60">
            <Icon {...ICON_PROPS} />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{tPage("problemLabel")}</span>
        </div>
        <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-ink">{tProblem(`item${index}Title`)}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{tProblem(`item${index}Desc`)}</p>
      </div>

      {/* Giải pháp */}
      <div className="border-t border-line bg-brand-50 p-6 sm:p-7 md:border-l md:border-t-0">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">{tPage("solutionLabel")}</span>
        <h4 className="mt-3 text-lg font-semibold tracking-[-0.01em] text-ink">{tSolution(`item${index}Title`)}</h4>
        <ul className="mt-3 space-y-2">
          {bullets.map((key) => (
            <li key={key} className="flex items-center gap-2.5 text-[15px] text-ink/75">
              <span className="size-1.5 shrink-0 rounded-full bg-brand-700" aria-hidden />
              {tPage(key)}
            </li>
          ))}
        </ul>
        <p className="mt-5 flex items-start gap-2 border-t border-brand-100 pt-4 text-[15px] font-semibold text-brand-700">
          <Check className="mt-0.5 size-4 shrink-0" strokeWidth={3} aria-hidden />
          {tSolution(`result${index}`)}
        </p>
      </div>
    </div>
  );
}
