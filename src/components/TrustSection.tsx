import { getTranslations } from "next-intl/server";
import { Globe, MonitorSmartphone, BadgeDollarSign } from "lucide-react";

const points = [
  { Icon: Globe, titleKey: "point1" as const, descKey: "point1Desc" as const },
  { Icon: MonitorSmartphone, titleKey: "point2" as const, descKey: "point2Desc" as const },
  { Icon: BadgeDollarSign, titleKey: "point3" as const, descKey: "point3Desc" as const },
];

export async function TrustSection() {
  const t = await getTranslations("trust");

  return (
    <section className="sg-section bg-white relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="sg-h2">
            {t("titleBefore")}
            <span className="sg-gradient-text">
              {t("titleHighlight")}
            </span>
            {t("titleAfter")}
          </h2>
          <p className="sg-lead mx-auto mt-4 max-w-3xl sm:mt-5">
            {t("subtext")}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 lg:mt-10">
          {points.map(({ Icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="sg-card sg-card-hover p-6 sm:p-8"
            >
              {/* Mobile: icon + title cùng hàng; Desktop: icon trên, title + mô tả dưới */}
              <div className="flex flex-row items-start gap-3 md:flex-col md:items-stretch">
                <div className="sg-icon-tile size-12 sm:size-14">
                  <Icon className="size-6 sm:size-7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden />
                </div>
                <div className="min-w-0 flex-1 space-y-2 md:mt-6 md:space-y-3">
                  <h3 className="text-lg font-bold text-ink">
                    {t(titleKey)}
                  </h3>
                  <p className="text-sm leading-[1.65] text-muted">
                    {t(descKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-center text-sm font-medium text-[#374151] shadow-sg-lg ring-1 ring-violet-100 sm:mt-10 sm:text-base">
          <span className="text-amber-500" aria-hidden>⭐</span>
          {t("socialProof")}
        </p>
      </div>
    </section>
  );
}
