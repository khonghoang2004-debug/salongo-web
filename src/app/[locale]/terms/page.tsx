import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/PageShell";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { TermsOfServiceContent } from "@/components/TermsOfServiceContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return pageMetadata({ locale, path: "/terms", title: t("termsTitle"), description: t("termsDesc") });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages");
  const tNav = await getTranslations("nav");

  return (
    <PageShell>
      <header className="border-b border-line bg-white px-4 pt-8 pb-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-brand-300 hover:text-brand-700"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {tNav("backHome")}
          </Link>
          <h1 className="sg-h1">
            {t("termsTitle")}
          </h1>
        </div>
      </header>
      <TermsOfServiceContent />
    </PageShell>
  );
}
