import { getTranslations } from "next-intl/server";

export async function SectionContactCTA() {
  const t = await getTranslations("contact");

  return (
    <section
      className="relative overflow-hidden px-4 pt-8 pb-12 sm:px-6 sm:pt-10 sm:pb-14 lg:px-8 lg:pt-12 lg:pb-16"
      style={{
        background:
          "linear-gradient(135deg, rgba(236,72,153,0.12) 0%, rgba(168,85,247,0.1) 50%, rgba(236,72,153,0.08) 100%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl lg:text-4xl">
          {t("ctaTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-[#6B7280]">
          {t("ctaSubtext")}
        </p>
        <div className="mt-6">
          <a
            href="https://app.salongo.eu/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,#EC4899,#A855F7)] px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:brightness-110 hover:shadow-xl active:scale-[0.98]"
          >
            {t("ctaButton")}
          </a>
        </div>
      </div>
    </section>
  );
}
