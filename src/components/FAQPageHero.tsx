import { getTranslations } from "next-intl/server";

export async function FAQPageHero() {
  const t = await getTranslations("faq");

  return (
    <section
      className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      style={{
        background:
          "linear-gradient(180deg, rgba(252,231,243,0.28) 0%, rgba(250,240,255,0.2) 50%, rgba(255,255,255,1) 100%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl lg:text-5xl">
          {t("heroTitle")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#6B7280]">
          {t("heroSubtext")}
        </p>
      </div>
    </section>
  );
}
