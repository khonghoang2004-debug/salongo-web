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
              className={`grid items-center gap-8 py-10 lg:grid-cols-2 lg:gap-16 lg:py-14 ${index > 0 ? "border-t border-violet-100/70" : "pt-0 lg:pt-0"}`}
            >
              <div className={`flex justify-center ${imageOnRight ? "lg:order-2 lg:justify-end" : "lg:justify-start"}`}>
                {block.image === "custom" && "imageSrc" in block ? (
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
                <ul className="mt-5 space-y-3">
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
