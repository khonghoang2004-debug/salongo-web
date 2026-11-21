import { getLegalPack } from "@/content/legal";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowDown, Check, LayoutTemplate, MessageCircle, Plus, Send } from "lucide-react";
import { pageMetadata, pageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/metadata";
import { WEBSITE_PRICE_KC } from "@/lib/website-offer";
import { TEMPLATES } from "@/components/website/templates/registry";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";
import { TemplateGallery, offerVars } from "@/components/website/WebsiteOfferParts";
import { templateShot } from "@/components/website/TemplatePreview";
import { tr } from "@/components/website/templates/types";
import { LivePreview, type LiveItem } from "@/components/website/LivePreview";
import { DevicePhone } from "@/components/landing/Shots";
import { WebsiteContactPanel } from "@/components/website/WebsiteContact";

type Props = { params: Promise<{ locale: string }> };

// Trang dịch vụ làm website + thư viện mẫu: được index (có trong sitemap). Trang demo từng mẫu thì noindex.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  // The title already starts with the brand ("SalonGo Web Studio – …"): no extra " | SalonGo" at the end.
  return pageMetadata({ locale, path: "/website", title: t("websiteTitle", offerVars()), description: t("websiteDesc", offerVars()), absolute: true });
}

const INCLUDED = ["inc1", "inc2", "inc3", "inc4", "inc5", "inc6"] as const;
const STEPS = [1, 2, 3] as const;
const FAQ = [6, 2, 3, 4, 5] as const;
// Mẫu trong khung xem trước đầu trang (đổi bằng nút tên mẫu) và trong khối giá
const HERO_PICKS = ["aurel-beauty", "atelier-noir", "maison-claire", "thermae-wellness"];
const PRICE_PICK = "maison-claire";

export default async function WebsitePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("webOffer");
  const tp = await getTranslations("pages");
  const tn = await getTranslations("nav");
  const v = offerVars();

  // Dữ liệu có cấu trúc: dịch vụ thật của SalonGo (giá đã chốt), FAQ đúng như hiển thị, breadcrumb.
  // Không đưa salon mẫu nào vào (chúng chỉ là demo, noindex).
  const url = pageUrl(locale, "/website");
  const org = `${siteConfig.url}/#organization`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "SalonGo Web Studio",
        alternateName: tp("websiteTitle", v),
        description: tp("websiteDesc", v),
        serviceType: "Website design for beauty salons",
        url,
        inLanguage: locale,
        provider: { "@id": org },
        brand: { "@type": "Brand", name: siteConfig.name },
        areaServed: [{ "@type": "Country", name: "Czechia" }, { "@type": "Place", name: "European Union" }],
        audience: { "@type": "BusinessAudience", name: "Hair, nail, beauty, spa and barber salons using SalonGo" },
        offers: {
          "@type": "Offer",
          price: WEBSITE_PRICE_KC,
          priceCurrency: "CZK",
          url,
          availability: "https://schema.org/InStock",
          description: `${v.price} ${t("priceLine", v)}`,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t("galleryTitle"),
          numberOfItems: TEMPLATES.length,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: FAQ.map((n) => ({
          "@type": "Question",
          name: t(`faq${n}Q`, v),
          acceptedAnswer: { "@type": "Answer", text: t(`faq${n}A`, v) },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: tn("home"), item: pageUrl(locale) },
          { "@type": "ListItem", position: 2, name: t("breadcrumb"), item: url },
        ],
      },
    ],
  };

  const [h1a, h1b] = t("heroTitle").split("|");
  const [pl1, pl2] = t("priceLine", v).split("|");
  const live: LiveItem[] = HERO_PICKS.map((slug) => TEMPLATES.find((x) => x.slug === slug))
    .filter((x) => x !== undefined)
    .map((x) => ({ slug: x.slug, name: x.name, type: tr(x.card.type, locale), shot: templateShot(x.slug, locale) }));
  const STEP_ICON = [LayoutTemplate, MessageCircle, Send];

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* 1. Đầu trang: chữ + giá bên trái, mẫu thật trong khung máy tính + iPhone bên phải */}
      <section className="relative overflow-hidden bg-white pb-14 pt-8 sm:pt-12 lg:pb-20 lg:pt-16">
        <div className="x-wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-12 [&>*]:min-w-0">
          <div className="lg:col-span-5">
            <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 text-[14px] text-ink/80">
              <span className="shrink-0 whitespace-nowrap rounded-full bg-blush px-2.5 py-0.5 text-[13px] font-semibold text-brand-800">{t("studio")}</span>
              <span className="truncate">{t("heroLead")}</span>
            </p>
            <h1 className="x-display mt-6 text-ink lg:!text-[clamp(2.8rem,1rem+3.2vw,4.4rem)]">
              {h1a} {h1b && <span className="text-brand-700">{h1b}</span>}
            </h1>
            <p className="x-lead mt-5 max-w-[32rem]">{t("lead")}</p>
            <div className="mt-7 flex flex-wrap items-end gap-x-4 gap-y-1">
              <p className="text-[15px] font-medium text-muted">{t("priceLabel")}</p>
              <p className="whitespace-nowrap text-[2.6rem] font-semibold leading-none tracking-[-0.04em] text-brand-700 sm:text-[3rem]">{v.price}</p>
              <p className="basis-full text-[15px] leading-snug text-muted sm:basis-auto sm:pb-1">
                {pl1}
                {pl2 && <span className="block text-ink/80">{pl2}</span>}
              </p>
            </div>
            <div data-cta className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#mau" className="x-btn-primary !min-h-[52px] !px-7 text-base">
                {t("ctaTemplates")}
                <ArrowDown className="size-[18px]" aria-hidden />
              </a>
              <a href="#lien-he" className="x-btn-light !min-h-[52px] !px-7 text-base">
                {t("ctaContact")}
              </a>
            </div>
          </div>
          <div className="relative lg:col-span-7">
            <div className="absolute -inset-x-5 -bottom-14 -top-6 rounded-[28px] bg-porcelain sm:-inset-x-8 lg:-right-[50vw] lg:left-0 lg:rounded-r-none" aria-hidden />
            <div className="relative px-0 pt-2 sm:px-2 lg:pl-8">
              <LivePreview items={live} label={t("previewGroup")} demoLabel={t("viewDemo")} desktopLabel={t("desktop")} mobileLabel={t("mobile")} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Cách làm: ba bước */}
      <section className="x-section-tight bg-white" aria-labelledby="steps-title">
        <div className="x-wrap">
          <p className="x-kicker">{t("stepsKicker")}</p>
          <h2 id="steps-title" className="x-h2 mt-3 text-ink">{t("stepsTitle")}</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
            {STEPS.map((n, i) => {
              const Icon = STEP_ICON[i];
              return (
                <li key={n} className="x-panel relative bg-porcelain p-6 ring-1 ring-black/[0.04] sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-full bg-white text-brand-700 ring-1 ring-black/[0.06]">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="text-[2.5rem] font-semibold leading-none tracking-[-0.04em] text-brand-700/15" aria-hidden>
                      {n}
                    </span>
                  </div>
                  <h3 className="x-h3 mt-6 text-ink">{t(`step${n}Title`)}</h3>
                  <p className="x-body mt-2">{t(`step${n}Text`)}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 3. Gói gồm những gì */}
      <section className="x-section-tight bg-porcelain" aria-labelledby="inc-title">
        <div className="x-wrap grid gap-10 lg:grid-cols-12 lg:gap-12 [&>*]:min-w-0">
          <div className="lg:col-span-5">
            <p className="x-kicker">{t("incKicker")}</p>
            <h2 id="inc-title" className="x-h2 mt-3 text-ink">{t("incTitle", v)}</h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {INCLUDED.map((k) => (
              <li key={k} className="flex gap-3.5 rounded-[20px] bg-white p-5 ring-1 ring-black/[0.05]">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-blush text-brand-800">
                  <Check className="size-4" aria-hidden />
                </span>
                <span className="text-[15.5px] leading-relaxed text-ink/85">{t(k, v)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Thư viện mẫu */}
      <section id="mau" className="x-section scroll-mt-20 bg-white" aria-labelledby="gallery-title">
        <div className="x-wrap">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <div className="max-w-[46rem]">
              <p className="x-kicker">{t("galleryKicker")}</p>
              <h2 id="gallery-title" className="x-h2 mt-3 text-ink">{t("galleryTitle")}</h2>
            </div>
            <p className="x-body max-w-[22rem]">{t("galleryLead")}</p>
          </div>
          <div className="mt-8">
            <TemplateGallery />
          </div>
        </div>
      </section>

      {/* 5. Giá: khối mận đậm, cùng kiểu khối EET ở trang chủ */}
      <section className="bg-white pb-[clamp(3rem,2rem+4vw,5.5rem)]" aria-labelledby="price-title">
        <div className="x-wrap">
          <div className="x-panel grid overflow-hidden bg-brand-800 text-white lg:grid-cols-12">
            <div className="p-7 sm:p-10 lg:col-span-7 lg:p-14">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[14px] text-white/85">{t("eyebrow")}</p>
              <h2 id="price-title" className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[1.25rem] font-medium text-white/75">{t("priceLabel")}</span>
                <span className="whitespace-nowrap text-[clamp(3rem,2rem+4vw,5rem)] font-semibold leading-none tracking-[-0.045em]">{v.price}</span>
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/80">
                {pl1}
                {pl2 && <span className="block">{pl2}</span>}
              </p>
              <p className="mt-6 max-w-[34rem] text-[15px] leading-relaxed text-white/70">{t("hosting")}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#lien-he" className="x-btn-onDark !min-h-[52px] !px-7 text-base">
                  {t("ctaContact")}
                </a>
                <Link href="/website-terms" className="x-btn-ghostDark !min-h-[52px] !px-7 text-base">
                  {getLegalPack(locale).docs.websiteTerms.title}
                </Link>
              </div>
            </div>
            <div className="relative hidden items-end justify-center overflow-hidden bg-brand-900/40 px-10 pt-12 lg:col-span-5 lg:flex" aria-hidden>
              <div className="w-[min(240px,70%)] translate-y-[18%]">
                <DevicePhone shot={templateShot(PRICE_PICK, locale)} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Hỏi đáp */}
      <section className="x-section-tight bg-porcelain" aria-labelledby="faq-title">
        <div className="x-wrap grid gap-10 lg:grid-cols-12 lg:gap-12 [&>*]:min-w-0">
          <div className="lg:col-span-4">
            <p className="x-kicker">{t("faqKicker")}</p>
            <h2 id="faq-title" className="x-h2 mt-3 text-ink">{t("faqTitle")}</h2>
          </div>
          <div className="x-panel bg-white px-5 ring-1 ring-black/[0.05] sm:px-8 lg:col-span-8">
            {FAQ.map((n) => (
              <details key={n} className="group border-b border-line last:border-0" open={n === FAQ[0]}>
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] text-ink">{t(`faq${n}Q`, v)}</span>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sand text-ink transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden>
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="x-body max-w-2xl pb-6">{t(`faq${n}A`, v)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Liên hệ: gọi, Facebook, Instagram + tin nhắn mẫu (không có form gửi dữ liệu) */}
      <section id="lien-he" className="x-section scroll-mt-20 bg-white" aria-labelledby="contact-title">
        <div className="x-wrap grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12 [&>*]:min-w-0">
          <div className="lg:col-span-5">
            <p className="x-kicker">{t("contactKicker")}</p>
            <h2 id="contact-title" className="x-h2 mt-3 text-ink">{t("contactNow")}</h2>
            <p className="x-lead mt-5 max-w-[30rem]">{t("customIdea", v)}</p>
          </div>
          <div data-cta className="x-panel bg-porcelain p-5 ring-1 ring-black/[0.05] sm:p-8 lg:col-span-7">
            <WebsiteContactPanel stacked />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
