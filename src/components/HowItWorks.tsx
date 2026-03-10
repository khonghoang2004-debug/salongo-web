import { getTranslations } from "next-intl/server";

const steps = [
  { titleKey: "step1Title" as const, descKey: "step1Desc" as const },
  { titleKey: "step2Title" as const, descKey: "step2Desc" as const },
  { titleKey: "step3Title" as const, descKey: "step3Desc" as const },
];

export async function HowItWorks() {
  const t = await getTranslations("howItWorks");

  return (
    <section className="border-t border-neutral-100 bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#6B7280] sm:mt-8">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-3 lg:mt-20">
          {steps.map((step, index) => (
            <div
              key={step.titleKey}
              className="relative flex flex-col items-center text-center"
            >
              <div
                className="flex shrink-0 items-center justify-center rounded-full border text-3xl font-bold shadow-[0_2px_12px_rgba(236,72,153,0.15)]"
                style={{
                  background: "linear-gradient(135deg, rgba(252,231,243,0.95) 0%, rgba(250,240,255,0.95) 100%)",
                  borderColor: "rgba(236,72,153,0.25)",
                  width: "4.5rem",
                  height: "4.5rem",
                }}
              >
                <span
                  className="bg-clip-text font-bold"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {index + 1}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className="absolute top-9 left-[calc(50%+2.5rem)] hidden h-0.5 w-[calc(100%-5rem)] max-w-24 bg-gradient-to-r from-[#EC4899] to-[#A855F7] opacity-80 sm:block lg:left-[calc(50%+2.75rem)]"
                  aria-hidden
                />
              )}
              <h3 className="mt-6 text-lg font-bold text-[#1F2937]">
                {t(step.titleKey)}
              </h3>
              <p className="mt-3 max-w-sm text-[#6B7280] leading-[1.65]">
                {t(step.descKey)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:mt-14">
          <a
            href="https://app.salongo.eu/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-fit rounded-xl p-[2px] transition-none hover:translate-y-0"
            style={{ background: "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)" }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-[10px] bg-white px-6 py-3.5 text-base font-semibold transition-colors duration-200 hover:bg-pink-50"
            >
              <span
                className="bg-clip-text font-semibold"
                style={{
                  backgroundImage: "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                {t("ctaButton")}
                <span aria-hidden className="inline"> →</span>
              </span>
            </span>
          </a>
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-[#6B7280] leading-relaxed">
          {t("closingLine")}
        </p>
      </div>
    </section>
  );
}
