import { getTranslations } from "next-intl/server";
import { BarChart3, BellRing, CalendarX2, Calculator, Globe2, NotebookPen, Sparkles } from "lucide-react";

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
      <section className="sg-page-hero sg-section-glow relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <span className="sg-eyebrow">
            <Sparkles className="size-3.5" aria-hidden />
            {t("missionTitle")}
          </span>
          <h1 className="mt-5 sg-h1">{t("title")}</h1>
          <div className="sg-hero-card mx-auto mt-8 max-w-3xl rounded-3xl px-6 py-8 sm:mt-10 sm:px-10 sm:py-10">
            <p className="text-xl font-semibold leading-snug sm:text-2xl lg:text-[1.75rem]">
              “{t("missionDesc")}”
            </p>
          </div>
        </div>
      </section>

      {/* Vì sao xây dựng */}
      <section className="sg-section bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center sg-h2">{t("whyTitle")}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3 lg:mt-12 lg:gap-6">
            {whyItems.map(({ key, Icon }) => (
              <div key={key} className="sg-card sg-card-hover p-6 sm:p-7">
                <div className="sg-icon-tile size-12">
                  <Icon className="size-6" strokeWidth={2} aria-hidden />
                </div>
                <p className="mt-5 text-base font-medium leading-relaxed text-ink">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Định hướng phát triển: dòng thời gian */}
      <section className="sg-section sg-section-alt">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center sg-h2">{t("roadmapTitle")}</h2>
          <ol className="relative mt-10 space-y-5 lg:mt-12">
            <span
              className="absolute bottom-6 left-6 top-6 w-[3px] -translate-x-1/2 rounded-full bg-[image:var(--sg-gradient)] opacity-70"
              aria-hidden
            />
            {roadmapItems.map(({ key, Icon }, i) => (
              <li key={key} className="relative flex items-center gap-4 sm:gap-5">
                <div className="sg-icon-tile relative z-10 size-12 rounded-full ring-4 ring-[#fbfaff]">
                  <Icon className="size-5" strokeWidth={2} aria-hidden />
                </div>
                <div className="sg-card flex-1 px-5 py-4 sm:px-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent-strong">0{i + 1}</p>
                  <p className="mt-1 font-medium leading-relaxed text-ink">{t(key)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
