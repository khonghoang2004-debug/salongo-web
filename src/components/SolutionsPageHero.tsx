import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export async function SolutionsPageHero() {
  const t = await getTranslations("solutionsPage");
  const tNav = await getTranslations("nav");

  return (
    <section
      className="sg-page-hero sg-section-glow relative overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="sg-eyebrow">{tNav("solutions")}</span>
        <h1 className="mt-5 sg-h1">
          {t("heroTitle")}
        </h1>
        <p className="sg-lead mx-auto mt-5 max-w-2xl">
          {t("heroSubtext")}
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a
            href="https://app.salongo.eu/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-8 py-3.5 text-base"
          >
            {t("heroCtaPrimary")}
          </a>
          <Link
            href="/tinh-nang"
            className="btn-secondary px-8 py-3.5 text-base"
          >
            {t("heroCtaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
