import { getTranslations } from "next-intl/server";

export async function SectionPricingCTA() {
  const t = await getTranslations("pricingPage");

  return (
    <section className="sg-section bg-white">
      <div className="sg-hero-card mx-auto max-w-6xl rounded-[28px] px-6 py-10 text-center shadow-sg-lg sm:rounded-[32px] sm:px-10 sm:py-12">
        <h2 className="mx-auto max-w-3xl text-[1.75rem] leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {t("ctaTitle")}
        </h2>
        <div className="mt-6 sm:mt-8">
          <a
            href="https://app.salongo.eu/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-on-gradient [text-shadow:none] px-10 py-4 text-lg"
          >
            {t("ctaButton")}
          </a>
        </div>
      </div>
    </section>
  );
}
