import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { getLegalPack } from "@/content/legal";
import { LegalDocumentPage, fillLegal } from "@/components/LegalDocumentPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const doc = getLegalPack(locale).docs.terms;
  return pageMetadata({ locale, path: "/terms", title: fillLegal(doc.title), description: fillLegal(doc.description) });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocumentPage locale={locale} docKey="terms" />;
}
