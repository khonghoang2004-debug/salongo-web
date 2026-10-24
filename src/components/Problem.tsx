import {
  BarChart3,
  Calculator,
  Calendar,
  CalendarCheck,
  Clipboard,
  Globe,
  MonitorSmartphone,
  Percent,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

const ICON_SIZE = 28;
const ICON_PROPS = {
  size: ICON_SIZE,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  className: "size-7 text-accent-strong",
};

function IconCalendarGlobe() {
  return (
    <div className="relative flex size-7 shrink-0 items-center justify-center text-accent-strong">
      <Calendar {...ICON_PROPS} className="size-7" />
      <Globe
        {...ICON_PROPS}
        size={14}
        className="absolute bottom-0 right-0 size-3.5"
      />
    </div>
  );
}

function IconCalculatorPercent() {
  return (
    <div className="relative flex size-7 shrink-0 items-center justify-center text-accent-strong">
      <Calculator {...ICON_PROPS} className="size-7" />
      <Percent
        {...ICON_PROPS}
        size={14}
        className="absolute bottom-0 right-0 size-3.5"
      />
    </div>
  );
}

const ITEM_ICONS = [
  IconCalendarGlobe,
  CalendarCheck,
  Clipboard,
  IconCalculatorPercent,
  MonitorSmartphone,
  BarChart3,
] as const;

export async function Problem() {
  const t = await getTranslations("problem");

  const items = [
    { title: t("item1Title"), desc: t("item1Desc") },
    { title: t("item2Title"), desc: t("item2Desc") },
    { title: t("item3Title"), desc: t("item3Desc") },
    { title: t("item4Title"), desc: t("item4Desc") },
    { title: t("item5Title"), desc: t("item5Desc") },
    { title: t("item6Title"), desc: t("item6Desc") },
  ];

  return (
    <section className="sg-section bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="sg-h2">
            {t("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {items.map((item, index) => {
            const IconOrComponent = ITEM_ICONS[index];
            const isComposite =
              IconOrComponent === IconCalendarGlobe ||
              IconOrComponent === IconCalculatorPercent;

            return (
              <div
                key={index}
                className="space-y-4 sg-card sg-card-hover p-6 sm:p-8"
              >
                <div className="sg-icon-tile size-14 rounded-2xl">
                  {isComposite ? (
                    <IconOrComponent />
                  ) : (
                    <IconOrComponent
                      {...ICON_PROPS}
                      className="size-7"
                      aria-hidden
                    />
                  )}
                </div>
                <h3 className="text-lg font-bold text-ink">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-muted">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
