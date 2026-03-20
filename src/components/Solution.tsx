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
  className: "size-8 text-[#EC4899]",
};

function IconGlobeCalendar() {
  return (
    <div className="relative flex size-8 shrink-0 items-center justify-center text-[#EC4899]">
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
  "flex size-14 shrink-0 items-center justify-center rounded-2xl border shadow-[0_2px_12px_rgba(236,72,153,0.12)]";
const iconBoxStyle = {
  background: "linear-gradient(135deg, rgba(252,231,243,0.95) 0%, rgba(250,240,255,0.95) 100%)",
  borderColor: "rgba(236,72,153,0.25)",
} as const;

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
    <section className="border-t border-neutral-100 bg-white px-4 pt-8 pb-12 sm:px-6 sm:pt-12 sm:pb-16 lg:px-8 lg:pt-16 lg:pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-[#6B7280]">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-2 lg:mt-12">
          {items.map(({ titleKey, descKey }, index) => {
            const IconOrComponent = ITEM_ICONS[index];
            const isComposite = IconOrComponent === IconGlobeCalendar;

            return (
              <div key={titleKey} className="flex flex-col items-start gap-4">
                <div className={iconBoxClass} style={iconBoxStyle}>
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
                <h3 className="text-xl font-bold text-[#1F2937]">
                  {t(titleKey)}
                </h3>
                <p className="leading-relaxed text-[#6B7280]">
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
