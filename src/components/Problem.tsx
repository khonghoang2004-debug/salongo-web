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
  className: "size-7 text-[#EC4899]",
};

function IconCalendarGlobe() {
  return (
    <div className="relative flex size-7 shrink-0 items-center justify-center text-[#EC4899]">
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
    <div className="relative flex size-7 shrink-0 items-center justify-center text-[#EC4899]">
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
    <section className="bg-white px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1F2937] md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[#6B7280]">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const IconOrComponent = ITEM_ICONS[index];
            const isComposite =
              IconOrComponent === IconCalendarGlobe ||
              IconOrComponent === IconCalculatorPercent;

            return (
              <div
                key={index}
                className="space-y-4 rounded-[24px] p-8"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(255,255,255,0.6)",
                }}
              >
                <div className="flex size-12 shrink-0 items-center justify-center">
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
                <h3 className="text-lg font-bold text-[#1F2937]">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-[#6B7280]">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
