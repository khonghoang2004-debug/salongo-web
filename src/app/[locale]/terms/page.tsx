import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/PageShell";
import { TermsOfServiceContent } from "@/components/TermsOfServiceContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("termsTitle"),
    description: t("termsDesc"),
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages");

  return (
    <PageShell>
      <header className="border-b border-neutral-100 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl">
            {t("termsTitle")}
          </h1>
        </div>
      </header>
      <TermsOfServiceContent />
    </PageShell>
  );
}
