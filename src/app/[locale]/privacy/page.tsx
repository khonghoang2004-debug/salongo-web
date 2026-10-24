import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/PageShell";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { PrivacyPolicyContent } from "@/components/PrivacyPolicyContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("privacyTitle"),
    description: t("privacyDesc"),
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages");
  const tNav = await getTranslations("nav");

  return (
    <PageShell>
      <header className="border-b border-neutral-100 bg-white px-4 pt-8 pb-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-violet-300 hover:text-violet-700"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {tNav("backHome")}
          </Link>
          <h1 className="sg-h1">
            {t("privacyTitle")}
          </h1>
        </div>
      </header>
      <PrivacyPolicyContent />
    </PageShell>
  );
}
