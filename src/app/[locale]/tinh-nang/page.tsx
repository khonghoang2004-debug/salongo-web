import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";
import { FeaturesHero } from "@/components/features2/FeaturesHero";
import { FeatureRow } from "@/components/features2/FeatureRow";
import { FeaturesMore } from "@/components/features2/FeaturesMore";
import { Closing } from "@/components/features2/Closing";
import { PairShot, Phone, ResponsiveShot, TwoPhones, Window } from "@/components/features2/Frames";
import { Receipt } from "@/components/landing/Receipt";
import { pageMetadata, pageUrl } from "@/lib/seo";
import { SHOTS } from "@/lib/media";
import { FEATURE_SHOTS } from "@/lib/media-features";

const PATH = "/tinh-nang";

/** Thứ tự các phần; id là neo cũ mà trang khác trỏ tới (/tinh-nang#dat-lich-online …), thu-chi là neo mới. */
const ROWS = [
  { key: "booking", id: "dat-lich-online" },
  { key: "calendar", id: "lich-hen", wide: true },
  { key: "checkout", id: "tinh-tien" },
  { key: "thuchi", id: "thu-chi" },
  { key: "customers", id: "khach-hang", wide: true },
  { key: "marketing", id: "marketing" },
  { key: "payroll", id: "tinh-luong" },
  { key: "staff", id: "nhan-vien" },
  { key: "branches", id: "da-chi-nhanh", wide: true },
] as const;

/** Phần nhỏ không ảnh; id dich-vu, bao-cao là neo cũ. */
const MORE = [
  { key: "services", id: "dich-vu" },
  { key: "reports", id: "bao-cao" },
  { key: "devices", id: "ung-dung" },
  { key: "desk", id: "goi-ban", href: "/goi-ban" },
] as const;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return pageMetadata({ locale, path: PATH, title: t("featuresTitle"), description: t("featuresDesc") });
}

export default async function FeaturesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("features2");
  const tNav = await getTranslations("nav");

  const media: Record<(typeof ROWS)[number]["key"], React.ReactNode> = {
    booking: <PairShot desktop={FEATURE_SHOTS.approve} phone={SHOTS.booking} alt={t("items.booking.alt")} phoneAlt={t("items.booking.altPhone")} />,
    calendar: <ResponsiveShot shot={SHOTS.calendar} alt={t("items.calendar.alt")} />,
    checkout: (
      <div>
        <Phone shot={SHOTS.checkout} alt={t("items.checkout.alt")} className="w-[64%] max-w-[270px] md:hidden" />
        <div className="relative hidden pb-[14%] pr-[12%] md:block">
          <Window shot={SHOTS.checkout} alt={t("items.checkout.alt")} />
          <div className="absolute bottom-0 right-0 origin-bottom-right scale-[0.8] xl:scale-90">
            <Receipt className="rotate-[2deg]" />
          </div>
        </div>
      </div>
    ),
    thuchi: <ResponsiveShot shot={SHOTS.thuchi} alt={t("items.thuchi.alt")} />,
    customers: <ResponsiveShot shot={SHOTS.customers} alt={t("items.customers.alt")} />,
    marketing: (
      <TwoPhones
        items={[
          { shot: SHOTS.marketing, alt: t("items.marketing.alt") },
          { shot: FEATURE_SHOTS.birthday, alt: t("items.marketing.alt2") },
        ]}
      />
    ),
    payroll: <ResponsiveShot shot={SHOTS.payroll} alt={t("items.payroll.alt")} />,
    staff: (
      <TwoPhones
        items={[
          { shot: FEATURE_SHOTS.staffToday, alt: t("items.staff.cap1"), caption: t("items.staff.cap1") },
          { shot: FEATURE_SHOTS.staffAccess, alt: t("items.staff.cap2"), caption: t("items.staff.cap2") },
        ]}
      />
    ),
    branches: <ResponsiveShot shot={SHOTS.branches} alt={t("items.branches.alt")} />,
  };

  const more = MORE.map((m) => ({
    id: m.id,
    title: t(`more.${m.key}.title`),
    text: t(`more.${m.key}.text`),
    ...("href" in m ? { href: m.href, link: t("more.desk.link") } : {}),
  }));

  const url = pageUrl(locale, PATH);
  const listed = [...ROWS.map((r) => ({ id: r.id, name: t(`items.${r.key}.title`) })), ...more.map((m) => ({ id: m.id, name: m.title }))];
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
      // Đúng các tiêu đề H2 / H3 đang hiện trên trang, mỗi mục trỏ về neo của nó
      {
        "@type": "ItemList",
        name: t("h1"),
        itemListElement: listed.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.name, url: `${url}#${x.id}` })),
      },
    ],
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <FeaturesHero
        locale={locale}
        title={t("h1")}
        lead={t("lead")}
        cta={t("cta")}
        secondary={t("pricing")}
        indexLabel={t("indexLabel")}
        items={ROWS.map((r) => ({ id: r.id, label: t(`items.${r.key}.nav`) }))}
      />

      {ROWS.map((r) => (
        <FeatureRow
          key={r.id}
          id={r.id}
          title={t(`items.${r.key}.title`)}
          lead={t(`items.${r.key}.lead`)}
          points={t.raw(`items.${r.key}.points`) as string[]}
          media={media[r.key]}
          wide={"wide" in r}
          extra={
            r.key === "checkout" ? (
              <Link href="/eet-2-0" className="x-link mt-6 min-h-11">
                {t("items.checkout.eetLink")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            ) : undefined
          }
        />
      ))}

      <FeaturesMore title={t("more.title")} items={more} />

      <Closing locale={locale} title={t("closing.title")} lead={t("closing.lead")} cta={t("closing.cta")} link={{ href: "/bang-gia", label: t("closing.link") }} />
    </PageShell>
  );
}
