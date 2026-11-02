import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { DemoBar } from "@/components/website/DemoBar";
import { TEMPLATES, getTemplate } from "@/components/website/templates/registry";
import { DEMO_PAGES, tr, type DemoPage } from "@/components/website/templates/types";
import { SITES } from "@/components/website/sites";

const DEMO_LOCALE = "cs";

type Props = { params: Promise<{ locale: string; template: string; page?: string[] }> };

// 4 mẫu × 5 trang × 4 ngôn ngữ, dựng tĩnh
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    TEMPLATES.flatMap((t) => DEMO_PAGES.map((p) => ({ locale, template: t.slug, page: p ? [p] : [] })))
  );
}
export const dynamicParams = false;

function resolve(template: string, page?: string[]) {
  const t = getTemplate(template);
  const p = (page?.[0] ?? "") as DemoPage;
  if (!t || (page && page.length > 1) || !DEMO_PAGES.includes(p)) return null;
  return { t, p };
}

// Trang demo chỉ để minh hoạ: noindex và không có trong sitemap (docs/seo/AUDIT-2026-11.md §3)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, template, page } = await params;
  const r = resolve(template, page);
  if (!r) return {};
  const w = await getTranslations({ locale, namespace: "webOffer" });
  const type = tr(r.t.card.type, locale);
  const pageName = r.p ? ` · ${tr(r.t.nav[r.p], DEMO_LOCALE)}` : "";
  return {
    title: { absolute: `${w("demoTitle", { name: r.t.name, type })}${pageName}` },
    description: w("demoDesc", { type }),
    robots: { index: false, follow: true },
  };
}

export default async function DemoPage({ params }: Props) {
  const { locale, template, page } = await params;
  setRequestLocale(locale);
  const r = resolve(template, page);
  if (!r) notFound();
  const Site = SITES[r.t.slug];
  return (
    <>
      <DemoBar name={r.t.name} type={tr(r.t.card.type, locale)} />
      {/* Nội dung website mẫu luôn bằng tiếng Séc (khách của salon ở Séc); thanh SalonGo theo ngôn ngữ trang */}
      <div lang={DEMO_LOCALE}>
        <Site t={r.t} page={r.p} locale={DEMO_LOCALE} />
      </div>
    </>
  );
}
