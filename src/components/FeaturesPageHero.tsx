import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export async function FeaturesPageHero() {
  const t = await getTranslations("featuresPage");
  const tNav = await getTranslations("nav");

  return (
    <section
      className="sg-page-hero sg-section-glow relative overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="sg-eyebrow">{tNav("features")}</span>
        <h1 className="mt-5 sg-h1">
          {t("heroTitle")}
        </h1>
        <p className="sg-lead mx-auto mt-3 max-w-2xl">
          {t("heroSubtext")}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://app.salongo.eu/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-8 py-3.5 text-base"
          >
            {t("heroCtaPrimary")}
          </a>
          <Link
            href="/bang-gia"
            className="btn-secondary px-8 py-3.5 text-base"
          >
            {t("heroCtaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
