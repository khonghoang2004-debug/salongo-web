import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/PageShell";
import { FeaturesHero } from "@/components/features2/FeaturesHero";
import { Closing } from "@/components/features2/Closing";
import { TypeSection, type Pair } from "@/components/solutions2/TypeSection";
import { DeskPanel } from "@/components/solutions2/DeskPanel";
import { FaqList, type Qa } from "@/components/guide2/FaqList";
import { pageMetadata, pageUrl } from "@/lib/seo";
import { jsonLdString } from "@/lib/json-ld";
import { SHOTS } from "@/lib/media";

const PATH = "/giai-phap";

/** Kiểu tiệm: neo, ảnh app và phần trang Tính năng nói kỹ hơn. */
const TYPES = [
  { key: "nail", id: "tiem-nail", shot: SHOTS.payroll, href: "/tinh-nang#tinh-luong" },
  { key: "hair", id: "salon-toc", shot: SHOTS.calendar, href: "/tinh-nang#lich-hen" },
  { key: "beauty", id: "mi-spa", shot: SHOTS.customers, href: "/tinh-nang#khach-hang" },
  { key: "chain", id: "nhieu-chi-nhanh", shot: SHOTS.branches, href: "/tinh-nang#da-chi-nhanh" },
] as const;
const DESK_ID = "thue-ban";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return pageMetadata({ locale, path: PATH, title: t("solutionsTitle"), description: t("solutionsDesc") });
}

export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("solutions2");
  const tNav = await getTranslations("nav");
  const faq = t.raw("faq.items") as Qa[];

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
      // Đúng các câu hỏi đang hiện ở mục "Hỏi nhanh" cuối trang
      {
        "@type": "FAQPage",
        mainEntity: faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
    ],
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <FeaturesHero
        locale={locale}
        title={t("h1")}
        lead={t("lead")}
        cta={t("cta")}
        secondary={t("features")}
        secondaryHref="/tinh-nang"
        indexLabel={t("indexLabel")}
        items={[...TYPES.map((x) => ({ id: x.id, label: t(`types.${x.key}.nav`) })), { id: DESK_ID, label: t("desk.nav") }]}
      />

      {TYPES.map((x) => (
        <TypeSection
          key={x.id}
          id={x.id}
          title={t(`types.${x.key}.title`)}
          lead={t(`types.${x.key}.lead`)}
          pairs={t.raw(`types.${x.key}.pairs`) as Pair[]}
          problemLabel={t("problem")}
          answerLabel={t("answer")}
          link={{ href: x.href, label: t(`types.${x.key}.link`) }}
          shot={x.shot}
          alt={t(`types.${x.key}.alt`)}
        />
      ))}

      <DeskPanel
        id={DESK_ID}
        title={t("desk.title")}
        lead={t("desk.lead")}
        price={t("desk.price")}
        note={t("desk.note")}
        cta={t("desk.cta")}
        alt={t("desk.alt")}
      />

      <div className="pt-10 lg:pt-16">
        <FaqList title={t("faq.title")} items={faq} />
      </div>

      <Closing locale={locale} title={t("closing.title")} lead={t("closing.lead")} cta={t("closing.cta")} link={{ href: "/bang-gia", label: t("closing.link") }} />
    </PageShell>
  );
}
