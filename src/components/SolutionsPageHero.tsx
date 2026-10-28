import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { PageHero } from "./ui/PageHero";

export async function SolutionsPageHero() {
  const t = await getTranslations("solutionsPage");
  const tNav = await getTranslations("nav");

  return (
    <PageHero
      crumb={tNav("solutions")}
      title={t("heroTitle")}
      lead={t("heroSubtext")}
      actions={
        <>
          <a
            href="https://app.salongo.eu/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-7 py-4 text-base"
          >
            {t("heroCtaPrimary")}
          </a>
          <Link href="/tinh-nang" className="btn-secondary px-7 py-4 text-base">
            {t("heroCtaSecondary")}
          </Link>
        </>
      }
    />
  );
}
