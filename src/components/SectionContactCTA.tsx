import { getTranslations } from "next-intl/server";

export async function SectionContactCTA() {
  const t = await getTranslations("contact");

  return (
    <section className="sg-section bg-white">
      <div className="sg-hero-card mx-auto max-w-6xl rounded-[28px] px-6 py-10 text-center shadow-sg-lg sm:rounded-[32px] sm:px-10 sm:py-12">
        <h2 className="mx-auto max-w-3xl text-[1.75rem] font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
          {t("ctaTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg font-medium text-white/95">
          {t("ctaSubtext")}
        </p>
        <div className="mt-6">
          <a
            href="https://app.salongo.eu/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-on-gradient [text-shadow:none] px-8 py-4 text-base"
          >
            {t("ctaButton")}
          </a>
        </div>
      </div>
    </section>
  );
}
