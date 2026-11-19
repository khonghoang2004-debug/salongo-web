import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Check, Minus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { PhoneShot } from "@/components/ui/AppShot";
import { DeskPlanCard } from "@/components/desk/DeskPlanCard";
import { FeatureVideo } from "@/components/video/FeatureVideo";
import { DESK_VIDEO, videoSrc } from "@/lib/videos";
import { deskSignupLink } from "@/lib/app-links";
import { getPlans } from "@/lib/plans";
import { pageMetadata, pageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

const PATH = "/goi-ban";
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return pageMetadata({ locale, path: PATH, title: t("deskTitle"), description: t("deskDesc") });
}

const YES = ["y1", "y2", "y3", "y4", "y5"] as const;
const NO = ["n1", "n2", "n3"] as const;

const STEPS = [
  ["s1t", "s1d"],
  ["s2t", "s2d"],
  ["s3t", "s3d"],
] as const;

const FAQ = [1, 2, 3, 4] as const;

export default async function DeskPlanPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("desk");
  const tNav = await getTranslations("nav");
  const tPages = await getTranslations("pages");
  const tVid = await getTranslations("videos");
  const vs = videoSrc(DESK_VIDEO);
  const plans = await getPlans();
  const { desk } = plans;

  // JSON-LD: FAQPage (đúng các câu đang hiện) + Product/Offer khi app đang bán gói
  const url = pageUrl(locale, PATH);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: FAQ.map((i) => ({
          "@type": "Question",
          name: t(`q${i}`),
          acceptedAnswer: { "@type": "Answer", text: t(`a${i}`) },
        })),
      },
      {
        "@type": "VideoObject",
        "@id": `${url}#video`,
        name: `${siteConfig.name} – ${t("videoTitle")}`,
        description: tPages("deskDesc"),
        thumbnailUrl: `${siteConfig.url}${vs.posterPc}`,
        contentUrl: `${siteConfig.url}${vs.pc}`,
        uploadDate: "2026-11-19",
        duration: DESK_VIDEO.iso,
        inLanguage: "vi",
      },
      ...(desk.live
        ? [
            {
              "@type": "Product",
              "@id": `${url}#product`,
              name: `${siteConfig.name} ${t("name")}`,
              description: tPages("deskDesc"),
              brand: { "@type": "Brand", name: siteConfig.name },
              offers: {
                "@type": "Offer",
                price: desk.monthly,
                priceCurrency: "CZK",
                url,
                availability: "https://schema.org/InStock",
              },
            },
          ]
        : []),
    ],
  };

  const primary = desk.live ? (
    <a href={deskSignupLink(locale)} target="_blank" rel="noopener noreferrer" className="btn-primary sg-arrow sg-arrow-up min-h-12 px-7 text-base">
      {t("cta")}
      <ArrowUpRight className="size-[18px]" aria-hidden />
    </a>
  ) : (
    <Link href="/lien-he" className="btn-primary min-h-12 px-7 text-base">
      {t("notify")}
    </Link>
  );

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHero
        crumb={tNav("desk")}
        eyebrow={
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-700 shadow-sm">
            {desk.live ? t("badgeNew") : t("soon")} · {t("audience")}
          </span>
        }
        title={t("heroTitle")}
        lead={t("heroLead")}
        actions={
          <>
            {primary}
            <Link href="/bang-gia#goi-ban" className="btn-secondary min-h-12 px-7 text-base">
              {tNav("pricing")}
            </Link>
          </>
        }
        aside={
          <div className="mx-auto max-w-[250px] sm:max-w-[300px] lg:mr-0">
            <PhoneShot src="/images/app/m-tinh-tien.webp" alt={t("shotAlt")} priority />
          </div>
        }
      />

      <section className="sg-section">
        <div className="sg-container">
          <SectionHead title={t("whatTitle")} layout="stack" />
          <div data-stagger className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-10 lg:gap-5">
            <div className="rounded-[22px] border border-line bg-white p-6 sm:p-8">
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">{t("yesTitle")}</h3>
              <ul className="mt-5 space-y-3.5">
                {YES.map((k) => (
                  <li key={k} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/85 sm:text-base">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700" aria-hidden>
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {t(k)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col rounded-[22px] bg-nude p-6 sm:p-8">
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">{t("noTitle")}</h3>
              <ul className="mt-5 space-y-3.5">
                {NO.map((k) => (
                  <li key={k} className="flex items-start gap-3 text-[15px] leading-relaxed text-muted sm:text-base">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-muted" aria-hidden>
                      <Minus className="size-3.5" strokeWidth={3} />
                    </span>
                    {t(k)}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-5 text-[14px] leading-relaxed text-muted">{t("noNote")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sg-section bg-nude">
        <div className="sg-container grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div data-reveal className="lg:col-span-5">
            <DeskPlanCard desk={desk} />
          </div>
          <div data-reveal className="lg:col-span-7" style={d(120)}>
            <h2 className="sg-h2">{t("stepsTitle")}</h2>
            <ol className="mt-8 grid gap-3">
              {STEPS.map(([tk, dk], i) => (
                <li key={tk} className="flex items-start gap-4 rounded-[20px] bg-white p-5 sm:p-6">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-lg font-semibold text-brand-700 tabular-nums" aria-hidden>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-[-0.01em] text-ink sm:text-lg">{t(tk)}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{t(dk)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="sg-section" aria-labelledby="desk-video-title">
        <div data-reveal className="sg-container">
          <h2 id="desk-video-title" className="sg-h2-sm mb-5 text-ink sm:mb-6">
            {t("videoTitle")}
          </h2>
          <div className="mx-auto max-w-[960px]">
            <FeatureVideo video={DESK_VIDEO} title={t("videoTitle")} playLabel={tVid("play")} note={t("videoNote")} />
          </div>
        </div>
      </section>

      <section className="sg-section bg-nude">
        <div data-reveal className="sg-container grid gap-8 lg:grid-cols-12 lg:gap-12">
          <h2 className="sg-h2 lg:col-span-4">{t("faqTitle")}</h2>
          {/* <details>: câu trả lời luôn có trong HTML, mở/đóng không cần JavaScript */}
          <div className="border-t border-line lg:col-span-8">
            {FAQ.map((i) => (
              <details key={i} className="group border-b border-line" open={i === 1}>
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-semibold text-ink transition-colors hover:text-brand-700 sm:py-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                  <h3 className="m-0 text-[inherit] font-[inherit]" style={{ fontFamily: "inherit" }}>
                    {t(`q${i}`)}
                  </h3>
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-transform group-open:rotate-45 group-open:border-brand-700 group-open:bg-brand-700 group-open:text-white"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-muted sm:text-base">{t(`a${i}`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="sg-hero-card px-4 py-10 sm:px-8 sm:py-14 lg:py-16">
          <div data-reveal className="sg-container relative">
            <h2 className="max-w-3xl font-display text-[2.125rem] font-semibold leading-[1.14] tracking-[-0.015em] text-balance sm:text-[3rem]">
              {t("ctaTitle")}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{desk.live ? t("ctaLead") : t("soonNote")}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {desk.live ? (
                <a href={deskSignupLink(locale)} target="_blank" rel="noopener noreferrer" className="btn-on-gradient sg-arrow sg-arrow-up px-7 text-base">
                  {t("cta")}
                  <ArrowUpRight className="size-[18px]" aria-hidden />
                </a>
              ) : (
                <Link href="/lien-he" className="btn-on-gradient px-7 text-base">
                  {t("notify")}
                </Link>
              )}
              <Link href="/bang-gia" className="btn-ghost-light px-7 text-base">
                {tNav("pricing")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
