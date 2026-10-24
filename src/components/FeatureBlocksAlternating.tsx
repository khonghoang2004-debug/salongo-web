import { getTranslations } from "next-intl/server";
import { DashboardMockup } from "./DashboardMockup";
import { FeatureImageMockup } from "./FeatureImageMockup";
import { ScreenTabsMockup } from "./ScreenTabsMockup";
import { SCREEN_ICONS } from "./screenIcons";

const blocks = [
  {
    titleKey: "block1Title" as const,
    descKey: "block1Desc" as const,
    bullets: ["block1Bullet1", "block1Bullet2", "block1Bullet3", "block1Bullet4"] as const,
    image: "views" as const,
    views: [
      { icon: "staff", tab: "block1TabStaff", title: "block1ViewStaff", desc: "block1ViewStaffDesc", src: "/images/lich-hen-nhan-vien.webp" },
      { icon: "list", tab: "block1TabList", title: "block1ViewList", desc: "block1ViewListDesc", src: "/images/lich-hen-danh-sach.webp" },
    ] as const,
  },
  {
    titleKey: "block2Title" as const,
    descKey: "block2Desc" as const,
    bullets: ["block2Bullet1", "block2Bullet2"] as const,
    image: "custom" as const,
    imageSrc: "/images/tinh-tien.webp",
  },
  {
    titleKey: "block3Title" as const,
    descKey: "block3Desc" as const,
    bullets: ["block3Bullet1", "block3Bullet2", "block3Bullet3", "block3Bullet4"] as const,
    image: "views" as const,
    views: [
      { icon: "overview", tab: "block3TabOverview", title: "block3ViewOverview", desc: "block3ViewOverviewDesc", src: "/images/tong-quan.webp" },
      { icon: "revenue", tab: "block3TabRevenue", title: "block3ViewRevenue", desc: "block3ViewRevenueDesc", src: "/images/doanh-thu.webp" },
      { icon: "invoices", tab: "block3TabInvoices", title: "block3ViewInvoices", desc: "block3ViewInvoicesDesc", src: "/images/hoa-don.webp" },
    ] as const,
  },
  {
    titleKey: "block4Title" as const,
    descKey: "block4Desc" as const,
    bullets: ["block4Bullet1", "block4Bullet2", "block4Bullet3", "block4Bullet4"] as const,
    image: "custom" as const,
    imageSrc: "/images/lich-hen-online.webp",
  },
  {
    titleKey: "block5Title" as const,
    descKey: "block5Desc" as const,
    bullets: ["block5Bullet1", "block5Bullet3", "block5Bullet4"] as const,
    image: "custom" as const,
    imageSrc: "/images/trang-nhan-vien.jpeg",
    imageSrcAlt: "/images/features/trang-nhan-vien.jpeg",
    imageRight: true,
    imageVariant: "tall" as const,
  },
  {
    titleKey: "block6Title" as const,
    descKey: "block6Desc" as const,
    bullets: ["block6Bullet1", "block6Bullet2", "block6Bullet3", "block6Bullet4"] as const,
    image: "views" as const,
    views: [
      { icon: "customers", tab: "block6TabCustomers", title: "block6TabCustomers", desc: "block6Desc", src: "/images/khach-hang.webp" },
    ] as const,
  },
  {
    titleKey: "block7Title" as const,
    descKey: "block7Desc" as const,
    bullets: ["block7Bullet1", "block7Bullet2", "block7Bullet3", "block7Bullet4"] as const,
    image: "views" as const,
    views: [
      { icon: "services", tab: "block7TabServices", title: "block7TabServices", desc: "block7Desc", src: "/images/dich-vu.webp" },
    ] as const,
  },  {
    titleKey: "block8Title" as const,
    descKey: "block8Desc" as const,
    bullets: ["block8Bullet1", "block8Bullet2", "block8Bullet3", "block8Bullet4"] as const,
    image: "views" as const,
    views: [
      { icon: "payroll", tab: "block8TabPayroll", title: "block8TabPayroll", desc: "block8Desc", src: "/images/tinh-luong.webp" },
    ] as const,
  },
];

export async function FeatureBlocksAlternating() {
  const t = await getTranslations("featuresPage");

  return (
    <section className="sg-section bg-white">
      <div className="mx-auto max-w-6xl">
        {blocks.map((block, index) => {
          const isEven = index % 2 === 1;
          const imageOnRight =
            "imageRight" in block && (block as { imageRight?: boolean }).imageRight === true
              ? true
              : isEven;
          return (
            <div
              key={block.titleKey}
              className={`grid items-center gap-8 py-8 lg:grid-cols-2 lg:gap-16 lg:py-12 ${index > 0 ? "border-t border-violet-100/70" : "pt-0 lg:pt-0"}`}
            >
              <div className={`flex justify-center ${imageOnRight ? "lg:order-2 lg:justify-end" : "lg:justify-start"}`}>
                {block.image === "views" && "views" in block && block.views ? (
                  <ScreenTabsMockup
                    className="w-full max-w-xl"
                    views={block.views.map((v) => ({ key: v.tab, label: t(v.tab), src: v.src, icon: v.icon }))}
                  />
                ) : block.image === "custom" && "imageSrc" in block ? (
                  <FeatureImageMockup
                    src={block.imageSrc}
                    altPath={"imageSrcAlt" in block ? block.imageSrcAlt : undefined}
                    alt=""
                    placeholderLabel={t(block.titleKey)}
                    className={"imageVariant" in block && block.imageVariant === "tall" ? "max-w-sm w-full" : "max-w-xl w-full"}
                    imageVariant={"imageVariant" in block ? block.imageVariant : "default"}
                  />
                ) : (
                  <DashboardMockup className="max-w-lg" />
                )}
              </div>
              <div className={imageOnRight ? "lg:order-1" : ""}>
                <span className="sg-gradient-text text-sm font-extrabold tracking-wider">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
                  {t(block.titleKey)}
                </h2>
                <p className="sg-lead mt-3">
                  {t(block.descKey)}
                </p>
                {"views" in block && block.views && block.views.length > 1 && (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:[&>*:last-child:nth-child(odd)]:col-span-2">
                    {block.views.map(({ icon, title, desc }) => {
                      const Icon = SCREEN_ICONS[icon];
                      return (
                      <div key={title} className="sg-card p-4">
                        <div className="flex items-center gap-2.5">
                          <span className="sg-icon-tile size-8 rounded-lg" aria-hidden>
                            <Icon className="size-4" />
                          </span>
                          <h3 className="font-semibold text-ink">{t(title)}</h3>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{t(desc)}</p>
                      </div>
                      );
                    })}
                  </div>
                )}
                <ul className={`mt-5 ${block.image === "views" ? "grid gap-3 sm:grid-cols-2" : "space-y-3"}`}>
                  {block.bullets.map((key) => (
                    <li key={key} className="flex items-center gap-3">
                      <span className="sg-icon-tile size-6 rounded-full shadow-none" aria-hidden>
                        <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="font-medium text-ink">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
