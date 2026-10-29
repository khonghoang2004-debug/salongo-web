import { getTranslations } from "next-intl/server";
import { BarChart3, BellRing, CalendarX2, Calculator, Globe2, NotebookPen } from "lucide-react";
import { PageHero } from "./ui/PageHero";
import { SectionHead } from "./ui/SectionHead";

const whyItems = [
  { key: "why1" as const, Icon: NotebookPen },
  { key: "why2" as const, Icon: Calculator },
  { key: "why3" as const, Icon: CalendarX2 },
];

const roadmapItems = [
  { key: "roadmap1" as const, Icon: BellRing },
  { key: "roadmap2" as const, Icon: BarChart3 },
  { key: "roadmap3" as const, Icon: Globe2 },
];

export async function SectionAbout() {
  const t = await getTranslations("about");

  return (
    <>
      {/* Hero + sứ mệnh */}
      <PageHero
        crumb={t("title")}
        title={t("title")}
        aside={
          <figure className="rounded-[24px] bg-brand-700 p-7 text-white sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{t("missionTitle")}</p>
            <blockquote className="mt-4 text-xl font-semibold leading-snug tracking-[-0.01em] sm:text-2xl">
              “{t("missionDesc")}”
            </blockquote>
          </figure>
        }
      />

      {/* Vì sao xây dựng */}
      <section className="sg-section">
        <div className="sg-container">
          <SectionHead title={t("whyTitle")} layout="stack" />
          <div data-stagger className="mt-7 grid border-t lg:mt-12 border-line md:grid-cols-3 md:gap-x-0 md:divide-x md:divide-line">
            {whyItems.map(({ key, Icon }, i) => (
              <div key={key} className="border-b border-line py-8 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0">
                <div className="flex items-center justify-between">
                  <span className="sg-icon-tile size-12 rounded-2xl">
                    <Icon className="size-6" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="font-display text-sm font-semibold text-ink/30">0{i + 1}</span>
                </div>
                <p className="mt-8 text-lg font-medium leading-relaxed text-ink">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Định hướng phát triển */}
      <section className="sg-section pt-0 sm:pt-0 lg:pt-0">
        <div className="sg-container">
          <div data-reveal className="grid gap-10 rounded-[28px] bg-[#FBF7F7] p-5 sm:p-8 lg:p-10 lg:grid-cols-12 lg:p-14">
            <div className="lg:col-span-5">
              <h2 className="sg-h2">{t("roadmapTitle")}</h2>
            </div>
            <ol className="space-y-3 lg:col-span-7">
              {roadmapItems.map(({ key, Icon }, i) => (
                <li key={key} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 sm:gap-5">
                  <span className="font-display text-2xl font-semibold tracking-[-0.03em] text-brand-700">0{i + 1}</span>
                  <p className="flex-1 font-medium leading-relaxed text-ink">{t(key)}</p>
                  <Icon className="size-5 shrink-0 text-ink/35" strokeWidth={2} aria-hidden />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
