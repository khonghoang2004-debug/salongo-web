import { getTranslations } from "next-intl/server";

export async function ContactPageHero() {
  const t = await getTranslations("contact");
  const tNav = await getTranslations("nav");

  return (
    <section
      className="sg-page-hero sg-section-glow relative overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="sg-eyebrow">{tNav("contact")}</span>
        <h1 className="mt-5 sg-h1">
          {t("heroTitle")}
        </h1>
        <p className="sg-lead mx-auto mt-5 max-w-2xl">
          {t("heroSubtext")}
        </p>
      </div>
    </section>
  );
}
