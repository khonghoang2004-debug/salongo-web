import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";
import { Receipt } from "@/components/landing/Receipt";
import { pageMetadata, pageUrl } from "@/lib/seo";
import { jsonLdString } from "@/lib/json-ld";
import { daysUntilEet } from "@/lib/eet";
import { SIGNUP_URL, appLink } from "@/lib/app-links";
import { siteConfig } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

const SUMMARY = ["1", "2", "3", "4", "5"] as const;
const STEPS = ["1", "2", "3"] as const;
const QS = ["1", "2", "3", "4"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return pageMetadata({ locale, path: "/eet-2-0", title: t("eetTitle"), description: t("eetDesc") });
}

/**
 * EET 2.0 (bắt buộc ở Séc từ 1.1.2027): trang trả lời thẳng các câu chủ tiệm hay tìm — từ khi nào, ai phải dùng,
 * cần gì, làm trong SalonGo thế nào. Có tóm tắt dạng dl, các bước, hỏi đáp (FAQPage) và breadcrumb.
 */
export default async function EetPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("eet2");
  const tNav = await getTranslations("site.nav");
  const lc = await getLocale();
  const days = daysUntilEet();
  const url = pageUrl(locale, "/eet-2-0");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: siteConfig.name, item: pageUrl(locale, "") },
          { "@type": "ListItem", position: 2, name: t("crumb"), item: url },
        ],
      },
      {
        "@type": "HowTo",
        name: t("stepsTitle"),
        step: STEPS.map((n, i) => ({ "@type": "HowToStep", position: i + 1, name: t(`s${n}t`), text: t(`s${n}d`) })),
      },
      {
        "@type": "FAQPage",
        mainEntity: QS.map((n) => ({ "@type": "Question", name: t(`q${n}`), acceptedAnswer: { "@type": "Answer", text: t(`a${n}`) } })),
      },
    ],
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <header className="bg-white pb-12 pt-12 sm:pt-16 lg:pb-16 lg:pt-20">
        <div className="x-wrap">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/" className="hover:text-ink">{siteConfig.name}</Link>
            <span className="mx-2" aria-hidden>/</span>
            <span aria-current="page">{t("crumb")}</span>
          </nav>
          <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#E8F1EC] px-3 py-1 text-[14px] font-medium tabular-nums text-[#2F5E47]">
            <span className="size-1.5 rounded-full bg-[#2F5E47]" aria-hidden />
            {days > 0 ? t("countdown", { n: days }) : t("live")}
          </p>
          <h1 className="x-display mt-5 max-w-[56rem] text-ink lg:!text-[clamp(2.8rem,1.4rem+2.8vw,4.3rem)]">{t("title")}</h1>
          <p className="x-lead mt-6 max-w-[42rem]">{t("lead")}</p>
        </div>
      </header>

      <section className="bg-white pb-12 lg:pb-28" aria-labelledby="eet-summary">
        <div className="x-wrap grid gap-12 lg:grid-cols-12 [&>*]:min-w-0">
          <div className="lg:col-span-7">
            <h2 id="eet-summary" className="x-h3 text-ink">{t("summaryTitle")}</h2>
            <dl className="mt-6 border-t border-line">
              {SUMMARY.map((n) => (
                <div key={n} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="text-[15px] text-muted">{t(`k${n}`)}</dt>
                  <dd className="text-[1.0625rem] leading-relaxed text-ink">{t(`v${n}`)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="x-panel flex items-start justify-center overflow-hidden bg-porcelain px-6 pt-12 lg:col-span-5">
            <Receipt className="rotate-[1.5deg]" />
          </div>
        </div>
      </section>

      <section className="bg-porcelain py-12 lg:py-28" aria-labelledby="eet-steps">
        <div className="x-wrap">
          <h2 id="eet-steps" className="x-h2 max-w-[36rem] text-ink">{t("stepsTitle")}</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((n) => (
              <li key={n} className="border-t border-ink/15 pt-6">
                <p className="text-[15px] font-semibold tabular-nums text-brand-700">{n}</p>
                <h3 className="mt-3 text-[1.2rem] font-semibold tracking-[-0.015em] text-ink">{t(`s${n}t`)}</h3>
                <p className="x-body mt-2">{t(`s${n}d`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-28" aria-labelledby="eet-faq">
        <div className="x-wrap grid gap-10 lg:grid-cols-12 [&>*]:min-w-0">
          <h2 id="eet-faq" className="x-h2 text-ink lg:col-span-4">{t("faqTitle")}</h2>
          <div className="border-t border-line lg:col-span-8">
            {QS.map((n) => (
              <details key={n} className="group border-b border-line">
                <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[1.0625rem] font-medium tracking-[-0.01em] text-ink sm:text-[1.15rem]">{t(`q${n}`)}</h3>
                  <Plus className="size-5 shrink-0 text-ink/50 transition-transform duration-200 group-open:rotate-45" aria-hidden />
                </summary>
                <p className="x-body max-w-[42rem] pb-6">{t(`a${n}`)}</p>
              </details>
            ))}
            <p className="mt-8 text-sm leading-relaxed text-muted">{t("note")}</p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="x-wrap">
          <div data-cta className="x-panel flex flex-col gap-4 bg-brand-800 px-7 py-12 text-white sm:flex-row sm:items-center sm:justify-between sm:px-12">
            <p className="max-w-[30rem] text-[1.35rem] font-semibold leading-snug tracking-[-0.02em]">{tNav("trialLine")}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={appLink(SIGNUP_URL, lc)} className="x-btn-onDark">{t("cta")}</a>
              <Link href="/lien-he" className="x-btn-ghostDark">{t("ask")}</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
