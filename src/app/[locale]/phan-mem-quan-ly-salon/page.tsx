import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { PhoneShot } from "@/components/ui/AppShot";
import { pageMetadata, pageUrl } from "@/lib/seo";
import { SIGNUP_URL } from "@/lib/app-links";
import { siteConfig } from "@/lib/metadata";

// Trang nội dung cho từ khoá chính ("phần mềm quản lý salon / tiệm nail", "rezervační systém pro salon",
// "Salonsoftware", "salon management software"): giải thích đầy đủ, liên kết sang trang tính năng, giá, FAQ.
const PATH = "/phan-mem-quan-ly-salon";

type Props = { params: Promise<{ locale: string }> };
type Section = { h: string; p: string; points?: string[]; link?: { href: string; label: string } };
type Qa = { q: string; a: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guide" });
  return pageMetadata({ locale, path: PATH, title: t("metaTitle"), description: t("metaDesc") });
}

export default async function SalonSoftwarePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guide");
  const tNav = await getTranslations("nav");
  const sections = t.raw("sections") as Section[];
  const faq = t.raw("faq") as Qa[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: tNav("home"), item: pageUrl(locale) },
          { "@type": "ListItem", position: 2, name: t("crumb"), item: pageUrl(locale, PATH) },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        url: pageUrl(locale, PATH),
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, Windows, macOS",
        offers: { "@type": "AggregateOffer", priceCurrency: "CZK", lowPrice: 199, highPrice: 799, offerCount: 3 },
      },
    ],
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumb={t("crumb")}
        title={t("h1")}
        lead={t("intro")}
        actions={
          <>
            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary sg-arrow sg-arrow-up px-7 py-4 text-base">
              {t("ctaTrial")}
              <ArrowUpRight className="size-[18px]" aria-hidden />
            </a>
            <Link href="/tinh-nang" className="btn-secondary px-7 py-4 text-base">
              {t("ctaFeatures")}
            </Link>
          </>
        }
      />

      <section className="sg-section">
        <div className="sg-container grid gap-10 lg:grid-cols-12 lg:gap-14">
          <article className="lg:col-span-8">
            {sections.map((s, i) => (
              <div key={i} className={i ? "mt-10 border-t border-line pt-10" : ""}>
                <h2 className="sg-h2-sm">{s.h}</h2>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/80">{s.p}</p>
                {s.points && (
                  <ul className="mt-5 space-y-3">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/85">
                        <Check className="mt-1 size-4 shrink-0 text-brand-700" strokeWidth={3} aria-hidden />
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
                {s.link && (
                  <Link href={s.link.href} className="sg-arrow mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800">
                    {s.link.label}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                )}
              </div>
            ))}
          </article>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <PhoneShot src="/images/app/m-tong-quan.webp" alt={t("shotAlt")} className="mx-auto max-w-[260px]" />
              <div className="mt-6 rounded-[20px] border border-line bg-[#FBF7F7] p-5">
                <p className="font-semibold text-ink">{t("boxTitle")}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t("boxText")}</p>
                <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 w-full py-3 text-sm">
                  {t("ctaTrial")}
                </a>
                <Link href="/bang-gia" className="mt-2 flex min-h-11 items-center justify-center text-sm font-semibold text-brand-700">
                  {t("ctaPricing")}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="sg-section bg-[#FBF7F7]">
        <div className="sg-container max-w-[860px]">
          <h2 className="sg-h2">{t("faqTitle")}</h2>
          <div className="mt-6 border-t border-line">
            {faq.map(({ q, a }) => (
              <details key={q} className="group border-b border-line py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink sm:text-lg">
                  {q}
                  <span className="text-brand-700 transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
