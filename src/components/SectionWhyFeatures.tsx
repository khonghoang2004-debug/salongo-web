import { getTranslations } from "next-intl/server";

const cards = [
  { titleKey: "whyCard1Title" as const, descKey: "whyCard1Desc" as const },
  { titleKey: "whyCard2Title" as const, descKey: "whyCard2Desc" as const },
  { titleKey: "whyCard3Title" as const, descKey: "whyCard3Desc" as const },
];

export async function SectionWhyFeatures() {
  const t = await getTranslations("featuresPage");

  return (
    <section className="sg-section bg-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center sg-h2">
          {t("whyTitle")}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3 lg:mt-8">
          {cards.map(({ titleKey, descKey }) => (
            <div
              key={titleKey}
              className="sg-card sg-card-hover p-6"
            >
              <h3 className="text-lg font-bold text-ink">
                {t(titleKey)}
              </h3>
              <p className="mt-2 text-muted leading-relaxed">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
