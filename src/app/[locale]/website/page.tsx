import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowDown } from "lucide-react";
import { pageMetadata, pageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/metadata";
import { WEBSITE_PRICE_KC } from "@/lib/website-offer";
import { TEMPLATES } from "@/components/website/templates/registry";
import { PageShell } from "@/components/PageShell";
import { AtelierTemplateCards, offerVars } from "@/components/website/WebsiteOfferParts";
import { previewSrc } from "@/components/website/TemplatePreview";
import { fontAtelier } from "@/components/website/atelier";
import { WebsiteContactPanel } from "@/components/website/WebsiteContact";

type Props = { params: Promise<{ locale: string }> };

// Trang dịch vụ làm website + thư viện mẫu: được index (có trong sitemap). Trang demo từng mẫu thì noindex.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return pageMetadata({ locale, path: "/website", title: t("websiteTitle", offerVars()), description: t("websiteDesc", offerVars()) });
}

const INCLUDED = ["inc1", "inc2", "inc3", "inc4", "inc5", "inc6"] as const;
const STEPS = [1, 2, 3] as const;
const FAQ = [1, 6, 2, 3, 4, 5] as const;

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
        name: tp("websiteTitle", v),
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
          description: `${v.price} ${t("priceLine", v).replace("|", " ")}`,
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

  const serif = fontAtelier.className;
  const wrap = "mx-auto w-full max-w-[1200px] px-5 sm:px-8";
  const Kicker = ({ n, children, light = false }: { n: string; children: React.ReactNode; light?: boolean }) => (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-semibold uppercase tracking-[0.2em] ${light ? "text-[#C9BBA6]" : "text-[#7A6347]"}`}>
      <span className="whitespace-nowrap tabular-nums">{n}</span>
      <span className={`h-px w-8 ${light ? "bg-[#C9BBA6]/60" : "bg-[#7A6347]/50"}`} aria-hidden />
      {children}
    </p>
  );
  const [h1a, h1b] = t("heroTitle").split("|");
  const btnDark =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1F1C19] px-7 text-[15px] font-semibold text-[#F4F1EB] transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1A17] focus-visible:ring-offset-2";
  const btnLine =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#1C1A17]/25 px-7 text-[15px] font-semibold text-[#1C1A17] transition-colors hover:border-[#1C1A17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1A17] focus-visible:ring-offset-2";

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-[#FBFAF7] text-[#1C1A17]">
        {/* Đầu trang: chữ có chân kiểu tạp chí + bố cục ảnh mẫu thật */}
        <section className="px-1.5 pt-1.5 sm:px-3 sm:pt-3 lg:px-4">
          <div className="overflow-hidden rounded-[20px] bg-[#F4F1EB] sm:rounded-[32px]">
            <div className={`${wrap} grid gap-8 pb-8 pt-8 sm:pt-10 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-10 lg:pt-10`}>
              <div className="lg:col-span-7">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#7A6347]">{t("studio")}</p>
                <h1 className={`${serif} mt-5 text-[2.5rem] font-medium leading-[1.02] tracking-[-0.025em] text-balance sm:text-[3.5rem] lg:text-[3.75rem]`}>
                  <span className="block">{h1a}</span> {h1b && <span className="block italic text-brand-700">{h1b}</span>}
                </h1>
                <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-2 border-y border-[#DCD5CA] py-4 sm:gap-x-5">
                  <p className="w-full text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B645B]">{t("priceLabel")}</p>
                  <p className={`${serif} whitespace-nowrap text-[3rem] font-medium leading-[0.9] tracking-[-0.02em] sm:text-[3.5rem]`}>{v.price}</p>
                  <p className="pb-1 text-[15px] font-medium leading-snug text-[#3A3631] sm:text-[16px]">
                    {t("priceLine", v)
                      .split("|")
                      .map((x) => (
                        <span key={x} className="block">
                          {x}
                        </span>
                      ))}
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                  <a href="#mau" className={btnDark}>
                    {t("ctaTemplates")}
                    <ArrowDown className="size-[18px]" aria-hidden />
                  </a>
                  <a href="#lien-he" className={btnLine}>
                    {t("ctaContact")}
                  </a>
                </div>
                <p className="mt-6 max-w-xl border-l border-[#7A6347]/50 pl-5 text-[15px] leading-relaxed text-[#3A3631]">
                  <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A6347]">{t("customIdeaLabel")}</span>
                  {t("customIdea", v)}
                </p>
              </div>
              <div className="relative mx-auto w-full max-w-[620px] pb-8 pl-6 pt-6 sm:pl-10 lg:col-span-5 lg:max-w-none" aria-hidden>
                <div className="overflow-hidden rounded-[8px] bg-white shadow-[0_30px_60px_-20px_rgba(40,32,24,0.35)] ring-1 ring-black/5">
                  <div className="flex gap-1.5 border-b border-black/5 bg-[#F7F5F1] px-3 py-2">
                    <span className="size-2 rounded-full bg-[#DCD5CA]" />
                    <span className="size-2 rounded-full bg-[#DCD5CA]" />
                    <span className="size-2 rounded-full bg-[#DCD5CA]" />
                  </div>
                  <img src={previewSrc("aurel-beauty", "pc")} alt="" width={1200} height={750} className="block aspect-[16/10] w-full object-cover object-top" />
                </div>
                <div className="absolute bottom-0 left-0 w-[30%] rounded-[20px] bg-[#1F1C19] p-1.5 shadow-[0_24px_50px_-16px_rgba(40,32,24,0.45)]">
                  <img src={previewSrc("atelier-noir", "m")} alt="" width={390} height={760} className="block aspect-[390/760] w-full rounded-[15px] object-cover object-top" />
                </div>
                <div className="absolute -right-1 top-0 hidden w-[24%] rounded-[18px] bg-[#1F1C19] p-1.5 shadow-[0_24px_50px_-16px_rgba(40,32,24,0.45)] sm:block">
                  <img src={previewSrc("thermae-wellness", "m")} alt="" width={390} height={760} className="block aspect-[390/760] w-full rounded-[13px] object-cover object-top" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Thư viện mẫu */}
        <section id="mau" className="scroll-mt-20 py-10 sm:py-12 lg:py-12">
          <div className={wrap}>
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <Kicker n="01">{t("galleryKicker")}</Kicker>
                <h2 className={`${serif} mt-4 text-[2rem] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[2.5rem] lg:text-[3rem]`}>{t("galleryTitle")}</h2>
              </div>
            </div>
            <div className="mt-8 lg:mt-10">
              <AtelierTemplateCards />
            </div>
          </div>
        </section>

        {/* Gói gồm những gì: khối espresso */}
        <section className="px-1.5 sm:px-3 lg:px-4">
          <div className="rounded-[20px] bg-[#1F1C19] text-[#EFEAE2] sm:rounded-[32px]">
            <div className={`${wrap} grid gap-8 py-10 sm:py-12 lg:grid-cols-12 lg:gap-10 lg:py-12`}>
              <div className="lg:col-span-5">
                <Kicker n="02" light>
                  {t("incKicker")}
                </Kicker>
                <h2 className={`${serif} mt-4 text-[2rem] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[2.5rem]`}>{t("incTitle", v)}</h2>
              </div>
              <ol className="lg:col-span-7">
                {INCLUDED.map((k, i) => (
                  <li key={k} className="grid grid-cols-[44px_1fr] gap-x-3 border-t border-white/12 py-4 text-[16px] leading-relaxed last:border-b">
                    <span className={`${serif} text-[1.375rem] italic leading-snug text-[#C9BBA6]`}>{String(i + 1).padStart(2, "0")}</span>
                    <span>{t(k, v)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Ba bước */}
        <section className="py-10 sm:py-12 lg:py-12">
          <div className={wrap}>
            <Kicker n="03">{t("stepsKicker")}</Kicker>
            <h2 className={`${serif} mt-4 text-[2rem] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[2.5rem]`}>{t("stepsTitle")}</h2>
            <ol className="mt-8 grid gap-8 md:grid-cols-3 md:gap-8">
              {STEPS.map((n) => (
                <li key={n} className="border-t border-[#1C1A17] pt-6">
                  <span className={`${serif} block text-[3rem] font-medium italic leading-none text-[#7A6347]`}>{n}.</span>
                  <h3 className={`${serif} mt-4 text-[1.5rem] font-medium leading-tight`}>{t(`step${n}Title`)}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#6B645B]">{t(`step${n}Text`)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Hỏi đáp */}
        <section className="pb-10 sm:pb-12 lg:pb-12">
          <div className={`${wrap} grid gap-10 lg:grid-cols-12 lg:gap-12`}>
            <div className="lg:col-span-4">
              <Kicker n="04">{t("faqKicker")}</Kicker>
              <h2 className={`${serif} mt-4 text-[2rem] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[2.5rem]`}>{t("faqTitle")}</h2>
            </div>
            <div className="border-t border-[#DCD5CA] lg:col-span-8">
              {FAQ.map((n) => (
                <details key={n} className="group border-b border-[#DCD5CA]" open={n === 1}>
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 [&::-webkit-details-marker]:hidden">
                    <span className={`${serif} text-[1.25rem] font-medium leading-snug`}>{t(`faq${n}Q`, v)}</span>
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#DCD5CA] text-xl text-[#1C1A17] transition-transform group-open:rotate-45 motion-reduce:transition-none"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-5 text-[16px] leading-relaxed text-[#6B645B]">{t(`faq${n}A`, v)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Liên hệ */}
        <section id="lien-he" className="scroll-mt-20 px-1.5 pb-10 sm:px-3 sm:pb-14 lg:px-4">
          <div className="rounded-[20px] bg-[#E9E4DB] sm:rounded-[32px]">
            <div className="mx-auto max-w-[880px] px-5 py-9 text-center sm:px-8 sm:py-12">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#7A6347]">{t("contactKicker")}</p>
              <h2 className={`${serif} mt-4 text-[2rem] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[2.75rem]`}>{t("contactNow")}</h2>
              <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-[#3A3631]">{t("customIdea", v)}</p>
              <div className="mt-7 text-left">
                <WebsiteContactPanel tone="atelier" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
