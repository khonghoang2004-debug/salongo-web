import { getTranslations } from "next-intl/server";

export async function SectionSolutionsCTA() {
  const t = await getTranslations("solutionsPage");

  return (
    <section className="sg-section bg-white">
      <div className="sg-hero-card mx-auto max-w-6xl rounded-[28px] px-6 py-12 text-center shadow-[0_30px_60px_-28px_rgba(76,29,149,0.55)] sm:rounded-[32px] sm:px-10 sm:py-16">
        <h2 className="mx-auto max-w-3xl text-[1.75rem] leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {t("ctaTitle")}
        </h2>
        <p className="mt-3 text-lg mx-auto max-w-xl font-medium text-white/95 sm:text-xl">
          {t("ctaSubtext")}
        </p>
        <a
          href="https://app.salongo.eu/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-on-gradient [text-shadow:none] mt-6 px-12 py-4 text-lg"
        >
          {t("ctaButton")}
        </a>
      </div>
    </section>
  );
}
