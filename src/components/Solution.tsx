import {
  BarChart3,
  Calculator,
  Calendar,
  CalendarCheck,
  ClipboardList,
  Globe,
  MonitorSmartphone,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

const ICON_SIZE = 32;
const ICON_PROPS = {
  size: ICON_SIZE,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  className: "size-8 text-accent-strong",
};

function IconGlobeCalendar() {
  return (
    <div className="relative flex size-8 shrink-0 items-center justify-center text-accent-strong">
      <Globe {...ICON_PROPS} className="size-8" />
      <Calendar
        {...ICON_PROPS}
        size={16}
        className="absolute bottom-0 right-0 size-4"
      />
    </div>
  );
}

const ITEM_ICONS = [
  IconGlobeCalendar,
  CalendarCheck,
  ClipboardList,
  Calculator,
  MonitorSmartphone,
  BarChart3,
] as const;

const iconBoxClass =
  "flex size-14 shrink-0 items-center justify-center sg-icon-tile rounded-2xl";
export async function Solution() {
  const t = await getTranslations("solution");

  const items = [
    { titleKey: "item1Title" as const, descKey: "item1Desc" as const },
    { titleKey: "item2Title" as const, descKey: "item2Desc" as const },
    { titleKey: "item3Title" as const, descKey: "item3Desc" as const },
    { titleKey: "item4Title" as const, descKey: "item4Desc" as const },
    { titleKey: "item5Title" as const, descKey: "item5Desc" as const },
    { titleKey: "item6Title" as const, descKey: "item6Desc" as const },
  ];

  return (
    <section className="sg-section bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="sg-h2">
            {t("title")}
          </h2>
          <p className="sg-lead mx-auto mt-3 max-w-2xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-2 lg:mt-12">
          {items.map(({ titleKey, descKey }, index) => {
            const IconOrComponent = ITEM_ICONS[index];
            const isComposite = IconOrComponent === IconGlobeCalendar;

            return (
              <div key={titleKey} className="flex flex-col items-start gap-4">
                <div className={iconBoxClass}>
                  {isComposite ? (
                    <IconOrComponent />
                  ) : (
                    <IconOrComponent
                      {...ICON_PROPS}
                      className="size-8"
                      aria-hidden
                    />
                  )}
                </div>
                <h3 className="text-xl font-bold text-ink">
                  {t(titleKey)}
                </h3>
                <p className="leading-relaxed text-muted">
                  {t(descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
