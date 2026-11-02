import { Link } from "@/i18n/navigation";
import { appLink, SIGNUP_URL } from "@/lib/app-links";
import { getLocale, getTranslations } from "next-intl/server";
import { PageHero } from "./ui/PageHero";

export async function SolutionsPageHero() {
  const t = await getTranslations("solutionsPage");
  const locale = await getLocale();
  const tNav = await getTranslations("nav");

  return (
    <PageHero
      crumb={tNav("solutions")}
      title={t("heroTitle")}
      lead={t("heroSubtext")}
      actions={
        <>
          <a
            href={appLink(SIGNUP_URL, locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary min-h-12 px-7 text-base"
          >
            {t("heroCtaPrimary")}
          </a>
          <Link href="/tinh-nang" className="btn-secondary min-h-12 px-7 text-base">
            {t("heroCtaSecondary")}
          </Link>
        </>
      }
    />
  );
}
