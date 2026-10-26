import { getTranslations } from "next-intl/server";
import { Globe, MonitorSmartphone, BadgeDollarSign, Star } from "lucide-react";

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
          <p className="sg-kicker">{t("eyebrow")}</p>
          <h2 className="sg-h2 mt-4">
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

        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 lg:mt-14">
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
                  <h3 className="text-lg font-bold tracking-[-0.01em] text-ink">
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

        <p className="mx-auto mt-10 flex w-fit items-center gap-2.5 rounded-full border border-line bg-white py-2 pl-2 pr-4 text-center text-sm font-medium text-ink/80 shadow-sg-sm sm:mt-12 sm:text-[15px]">
          <span className="flex items-center gap-0.5 rounded-full bg-brand-50 px-2 py-1 text-brand-700" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-3 fill-current" />
            ))}
          </span>
          {t("socialProof")}
        </p>
      </div>
    </section>
  );
}
