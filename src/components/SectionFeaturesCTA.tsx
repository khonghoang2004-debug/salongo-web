import { getTranslations } from "next-intl/server";

export async function SectionFeaturesCTA() {
  const t = await getTranslations("featuresPage");

  return (
    <section
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      style={{
        background: "linear-gradient(135deg, rgba(252,231,243,0.6) 0%, rgba(250,240,255,0.6) 50%, rgba(236,72,153,0.08) 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl lg:text-5xl">
          {t("ctaTitle")}
        </h2>
        <p className="mt-5 text-lg text-[#6B7280] sm:text-xl">
          {t("ctaSubtext")}
        </p>
        <a
          href="https://app.salongo.eu/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center justify-center rounded-full px-12 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:brightness-105 active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #EC4899, #A855F7)",
          }}
        >
          {t("ctaButton")}
        </a>
      </div>
    </section>
  );
}
