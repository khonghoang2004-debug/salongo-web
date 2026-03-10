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
    <section className="relative overflow-hidden border-t border-neutral-100 bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <svg className="absolute size-0" aria-hidden>
        <defs>
          <linearGradient id="trustSectionIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl lg:text-4xl">
            {t("titleBefore")}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)" }}
            >
              {t("titleHighlight")}
            </span>
            {t("titleAfter")}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#6B7280] sm:mt-8">
            {t("subtext")}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 lg:mt-20">
          {points.map(({ Icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="rounded-[18px] border border-neutral-200/60 bg-white p-9 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-none hover:translate-y-0"
            >
              <div
                className="flex size-14 shrink-0 items-center justify-center rounded-2xl border shadow-[0_2px_12px_rgba(236,72,153,0.12)]"
                style={{
                  background: "linear-gradient(135deg, rgba(252,231,243,0.95) 0%, rgba(250,240,255,0.95) 100%)",
                  borderColor: "rgba(236,72,153,0.25)",
                }}
              >
                <Icon className="size-7" stroke="url(#trustSectionIconGradient)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden />
              </div>
              <div className="mt-6 space-y-3">
                <h3 className="text-lg font-bold text-[#1F2937]">
                  {t(titleKey)}
                </h3>
                <p className="text-sm leading-[1.65] text-[#6B7280]">
                  {t(descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-14 text-center text-base font-medium text-[#374151] sm:mt-16">
          <span className="mr-1.5 text-amber-500" aria-hidden>⭐</span>
          {t("socialProof")}
        </p>
      </div>
    </section>
  );
}
