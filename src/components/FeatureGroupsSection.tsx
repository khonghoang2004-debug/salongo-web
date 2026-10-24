import {
  BarChart3,
  Calendar,
  Calculator,
  CreditCard,
  FileText,
  Globe,
  Users,
  TrendingUp,
  PieChart,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

const iconBoxClass =
  "flex size-14 shrink-0 items-center justify-center sg-icon-tile rounded-2xl";
const groups = [
  {
    titleKey: "group1Title" as const,
    items: [
      { labelKey: "group1Item1" as const, Icon: Calendar },
      { labelKey: "group1Item2" as const, Icon: Globe },
      { labelKey: "group1Item3" as const, Icon: Users },
    ],
  },
  {
    titleKey: "group2Title" as const,
    items: [
      { labelKey: "group2Item1" as const, Icon: CreditCard },
      { labelKey: "group2Item2" as const, Icon: Calculator },
      { labelKey: "group2Item3" as const, Icon: FileText },
    ],
  },
  {
    titleKey: "group3Title" as const,
    items: [
      { labelKey: "group3Item1" as const, Icon: BarChart3 },
      { labelKey: "group3Item2" as const, Icon: TrendingUp },
      { labelKey: "group3Item3" as const, Icon: PieChart },
    ],
  },
];

export async function FeatureGroupsSection() {
  const t = await getTranslations("featuresPage");

  return (
    <section className="sg-section sg-section-alt">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center sg-h2">
          {t("groupsTitle")}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.titleKey}
              className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-ink">
                {t(group.titleKey)}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {group.items.map(({ labelKey, Icon }) => (
                  <li key={labelKey} className="flex items-center gap-4">
                    <div className={iconBoxClass}>
                      <Icon className="size-7 text-accent-strong" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden />
                    </div>
                    <span className="font-medium text-[#374151]">{t(labelKey)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
