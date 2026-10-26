import { getTranslations } from "next-intl/server";
import { ArrowRight, UserPlus, Settings2, CalendarCheck } from "lucide-react";

const steps = [
  { titleKey: "step1Title" as const, descKey: "step1Desc" as const, Icon: UserPlus },
  { titleKey: "step2Title" as const, descKey: "step2Desc" as const, Icon: Settings2 },
  { titleKey: "step3Title" as const, descKey: "step3Desc" as const, Icon: CalendarCheck },
];

export async function HowItWorks() {
  const t = await getTranslations("howItWorks");

  return (
    <section className="sg-section sg-section-tint">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="sg-kicker">{t("eyebrow")}</p>
          <h2 className="sg-h2 mt-4">{t("title")}</h2>
          <p className="sg-lead mx-auto mt-4 max-w-2xl sm:mt-5">{t("subtitle")}</p>
        </div>

        <ol className="relative mt-10 grid gap-4 sm:gap-6 md:grid-cols-3 lg:mt-14">
          {steps.map(({ titleKey, descKey, Icon }, index) => (
            <li key={titleKey} className="sg-card relative flex gap-4 p-5 sm:p-6 md:flex-col md:items-center md:p-8 md:text-center">
              <div className="relative shrink-0">
                <span className="sg-icon-tile-solid size-12 rounded-2xl md:size-14">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full border-2 border-white bg-ink text-[11px] font-bold text-white">
                  {index + 1}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold tracking-[-0.01em] text-ink md:mt-6">{t(titleKey)}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted md:mt-3">{t(descKey)}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-center gap-4 sm:mt-12">
          <a
            href="https://app.salongo.eu/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full px-7 py-3.5 text-base sm:w-auto"
          >
            {t("ctaButton")}
            <ArrowRight className="size-[18px]" aria-hidden />
          </a>
          <p className="max-w-xl text-center text-sm leading-relaxed text-muted">{t("closingLine")}</p>
        </div>
      </div>
    </section>
  );
}
