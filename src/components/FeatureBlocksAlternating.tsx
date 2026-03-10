import { getTranslations } from "next-intl/server";
import { DashboardMockup } from "./DashboardMockup";
import { FeatureImageMockup } from "./FeatureImageMockup";

const blocks = [
  {
    titleKey: "block1Title" as const,
    descKey: "block1Desc" as const,
    bullets: ["block1Bullet1", "block1Bullet2", "block1Bullet3", "block1Bullet4"] as const,
    image: "custom" as const,
    imageSrc: "/images/anh-lich-hen.png",
    imageSrcAlt: "/images/features/anh-lich-hen.png",
  },
  {
    titleKey: "block2Title" as const,
    descKey: "block2Desc" as const,
    bullets: ["block2Bullet1", "block2Bullet2"] as const,
    image: "custom" as const,
    imageSrc: "/images/anh-tinh-tien.png",
    imageSrcAlt: "/images/features/anh-tinh-tien.png",
  },
  {
    titleKey: "block3Title" as const,
    descKey: "block3Desc" as const,
    bullets: ["block3Bullet1", "block3Bullet2", "block3Bullet3", "block3Bullet4"] as const,
    image: "custom" as const,
    imageSrc: "/images/anh-doanh-thu.png",
    imageSrcAlt: "/images/features/anh-doanh-thu.png",
  },
  {
    titleKey: "block4Title" as const,
    descKey: "block4Desc" as const,
    bullets: ["block4Bullet1", "block4Bullet2", "block4Bullet3", "block4Bullet4"] as const,
    image: "custom" as const,
    imageSrc: "/images/dat-lich-online.png",
    imageSrcAlt: "/images/features/dat-lich-online.png",
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
];

export async function FeatureBlocksAlternating() {
  const t = await getTranslations("featuresPage");

  return (
    <section className="border-t border-neutral-100 bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
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
              className={`grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-14 lg:py-16 ${index > 0 ? "border-t border-neutral-100" : ""}`}
            >
              <div className={imageOnRight ? "lg:order-2" : ""}>
                {block.image === "custom" && "imageSrc" in block ? (
                  <FeatureImageMockup
                    src={block.imageSrc}
                    altPath={"imageSrcAlt" in block ? block.imageSrcAlt : undefined}
                    alt=""
                    placeholderLabel={t(block.titleKey)}
                    className={"imageVariant" in block && block.imageVariant === "tall" ? "max-w-sm w-full" : "max-w-lg w-full"}
                    imageVariant={"imageVariant" in block ? block.imageVariant : "default"}
                  />
                ) : (
                  <DashboardMockup className="max-w-lg" />
                )}
              </div>
              <div className={imageOnRight ? "lg:order-1 lg:text-right" : ""}>
                <h2 className="text-2xl font-bold tracking-tight text-[#1F2937] lg:text-3xl">
                  {t(block.titleKey)}
                </h2>
                <p className="mt-4 text-[#6B7280] leading-relaxed">
                  {t(block.descKey)}
                </p>
                <ul className={`mt-6 space-y-3 ${imageOnRight ? "lg:ml-auto lg:flex lg:flex-col lg:items-end" : ""}`}>
                  {block.bullets.map((key) => (
                    <li key={key} className="flex items-center gap-3">
                      <span
                        className="size-2 shrink-0 rounded-full"
                        style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
                      />
                      <span className="text-[#1F2937] font-medium">{t(key)}</span>
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
