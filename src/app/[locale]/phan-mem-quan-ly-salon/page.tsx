import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";
import { ArticleBody, Toc, type GuideSection } from "@/components/guide2/Article";
import { FaqList, type Qa } from "@/components/guide2/FaqList";
import { pageMetadata, pageUrl } from "@/lib/seo";
import { jsonLdString } from "@/lib/json-ld";
import { SIGNUP_URL, appLink } from "@/lib/app-links";
import { siteConfig } from "@/lib/metadata";
import { getPlans, priceRange } from "@/lib/plans";
import { SHOTS } from "@/lib/media";

// Bài hướng dẫn cho từ khoá chính ("phần mềm quản lý salon / tiệm nail", "rezervační systém pro salon",
// "Salonsoftware", "salon management software"): đọc như một bài viết, liên kết sang Tính năng, Bảng giá, Hỏi đáp.
const PATH = "/phan-mem-quan-ly-salon";

/** Ảnh trong bài theo id mục */
const FIGURES = { "dat-lich-online": SHOTS.booking, "thu-chi": SHOTS.thuchi };

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guide" });
  return pageMetadata({ locale, path: PATH, title: t("metaTitle"), description: t("metaDesc") });
}

export default async function SalonSoftwarePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guide2");
  const tMeta = await getTranslations("guide");
  const tNav = await getTranslations("nav");
  const sections = t.raw("sections") as GuideSection[];
  const faq = t.raw("faq") as Qa[];
  const prices = priceRange(await getPlans());
  const url = pageUrl(locale, PATH);
  const org = { "@id": `${siteConfig.url}/#organization` };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: tNav("home"), item: pageUrl(locale) },
          { "@type": "ListItem", position: 2, name: t("crumb"), item: url },
        ],
      },
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: t("h1"),
        description: tMeta("metaDesc"),
        inLanguage: locale,
        mainEntityOfPage: url,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        author: org,
        publisher: org,
        about: { "@id": `${siteConfig.url}/#software` },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteConfig.url}/#software`,
        name: siteConfig.name,
        url: pageUrl(locale),
        publisher: org,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, Windows, macOS",
        offers: { "@type": "AggregateOffer", priceCurrency: "CZK", lowPrice: prices.low, highPrice: prices.high, offerCount: prices.count },
      },
    ],
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />

      <header className="bg-white pb-12 pt-8 sm:pt-12 lg:pb-16 lg:pt-16">
        <div className="x-wrap">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[14px] text-muted">
              <li>
                <Link href="/" className="inline-flex min-h-11 items-center hover:text-ink">
                  {tNav("home")}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">
                {t("crumb")}
              </li>
            </ol>
          </nav>
          <h1 className="mt-4 max-w-[56rem] text-[clamp(2.2rem,1.3rem+3.4vw,4rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-ink [text-wrap:balance] [:lang(vi)_&]:leading-[1.2]">
            {t("h1")}
          </h1>
          <p className="x-lead mt-6 max-w-[40rem]">{t("intro")}</p>
          <div data-cta className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={appLink(SIGNUP_URL, locale)} className="x-btn-primary !min-h-[52px] !px-7 text-base">
              {t("ctaTrial")}
            </a>
            <Link href="/tinh-nang" className="x-btn-light !min-h-[52px] !px-7 text-base">
              {t("ctaFeatures")}
            </Link>
          </div>
        </div>
      </header>

      <div className="bg-white pb-16 lg:pb-24">
        <div className="x-wrap">
          <div className="grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-16 [&>*]:min-w-0">
            <aside className="lg:col-span-3">
              <Toc label={t("toc")} sections={sections} />
            </aside>
            <article className="lg:col-span-8 lg:col-start-5">
              <ArticleBody sections={sections} shots={FIGURES} />

              <div data-cta className="mt-16 max-w-[42rem] border-t border-ink/15 pt-8">
                <p className="text-[1.35rem] font-semibold tracking-[-0.02em] text-ink">{t("endTitle")}</p>
                <p className="x-body mt-2">{t("endText")}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                  <a href={appLink(SIGNUP_URL, locale)} className="x-btn-primary !min-h-[52px] !px-7 text-base">
                    {t("ctaTrial")}
                  </a>
                  <Link href="/bang-gia" className="x-link min-h-11">
                    {t("ctaPricing")}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      <FaqList title={t("faqTitle")} items={faq} />
      <div className="pb-12" />
    </PageShell>
  );
}
