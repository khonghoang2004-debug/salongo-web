import { getTranslations } from "next-intl/server";

const steps = [
  { titleKey: "step1Title" as const, descKey: "step1Desc" as const },
  { titleKey: "step2Title" as const, descKey: "step2Desc" as const },
  { titleKey: "step3Title" as const, descKey: "step3Desc" as const },
];

export async function HowItWorks() {
  const t = await getTranslations("howItWorks");

  return (
    <section className="sg-section sg-section-tint">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="sg-h2">
            {t("title")}
          </h2>
          <p className="sg-lead mx-auto mt-4 max-w-2xl sm:mt-5">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-8 grid gap-10 sm:grid-cols-3 lg:mt-10">
          {steps.map((step, index) => (
            <div
              key={step.titleKey}
              className="relative flex flex-col items-center text-center"
            >
              <div className="sg-icon-tile relative z-10 size-16 rounded-full text-2xl font-bold ring-[6px] ring-white [text-shadow:var(--sg-on-gradient-shadow)] sm:size-[4.5rem] sm:text-3xl">
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className="absolute top-9 left-[calc(50%+3rem)] hidden h-[3px] w-[calc(100%-6rem)] rounded-full bg-[image:var(--sg-gradient)] opacity-70 sm:block"
                  aria-hidden
                />
              )}
              <h3 className="mt-6 text-lg font-bold text-ink">
                {t(step.titleKey)}
              </h3>
              <p className="mt-3 max-w-sm text-muted leading-[1.65]">
                {t(step.descKey)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <a
            href="https://app.salongo.eu/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-7 py-3.5 text-base"
          >
            {t("ctaButton")}
            <span aria-hidden>→</span>
          </a>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted leading-relaxed">
          {t("closingLine")}
        </p>
      </div>
    </section>
  );
}
