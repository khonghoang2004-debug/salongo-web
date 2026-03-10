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
  "flex size-14 shrink-0 items-center justify-center rounded-2xl border shadow-[0_2px_12px_rgba(236,72,153,0.12)]";
const iconBoxStyle = {
  background: "linear-gradient(135deg, rgba(252,231,243,0.95) 0%, rgba(250,240,255,0.95) 100%)",
  borderColor: "rgba(236,72,153,0.25)",
} as const;

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
    <section className="border-t border-neutral-100 bg-neutral-50/40 px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#1F2937] lg:text-3xl">
          {t("groupsTitle")}
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.titleKey}
              className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-[#1F2937]">
                {t(group.titleKey)}
              </h3>
              <ul className="mt-5 space-y-4">
                {group.items.map(({ labelKey, Icon }) => (
                  <li key={labelKey} className="flex items-center gap-4">
                    <div className={iconBoxClass} style={iconBoxStyle}>
                      <Icon className="size-7 text-[#EC4899]" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden />
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
