import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";
import { DeskHero } from "@/components/desk2/DeskHero";
import { DeskIncluded } from "@/components/desk2/DeskIncluded";
import { DeskPrice } from "@/components/desk2/DeskPrice";
import { FaqList } from "@/components/pricing2/FaqList";
import { DESK_VIDEO, videoSrc } from "@/lib/videos";
import { getPlans } from "@/lib/plans";
import { pageMetadata, pageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

const PATH = "/goi-ban";
const FAQ = [1, 2, 3, 4, 5, 6] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return pageMetadata({ locale, path: PATH, title: t("deskTitle"), description: t("deskDesc") });
}

export default async function DeskPlanPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("desk2");
  const tPages = await getTranslations("pages");
  const tName = await getTranslations("pricing2.desk");
  const { desk } = await getPlans();
  const vs = videoSrc(DESK_VIDEO);
  const faq = FAQ.map((i) => ({ q: t(`faq.q${i}`), a: t(`faq.a${i}`) }));

  // JSON-LD: FAQPage (đúng các câu đang hiện) + video + Product/Offer khi app đang bán gói
  const url = pageUrl(locale, PATH);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "VideoObject",
        "@id": `${url}#video`,
        name: `${siteConfig.name} – ${t("video.title")}`,
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
              name: `${siteConfig.name} ${tName("name")}`,
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

  return (
    // Nút dính dưới trên điện thoại mời salon dùng thử {days} ngày: không hợp với người thuê bàn, nên tắt ở trang này
    <PageShell cta={false}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <DeskHero desk={desk} />
      <DeskIncluded />
      <DeskPrice desk={desk} />
      <FaqList
        id="faq"
        title={t("faq.title")}
        items={faq}
        aside={
          <Link href="/faq" className="x-link mt-6">
            {t("faq.all")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        }
      />
    </PageShell>
  );
}
