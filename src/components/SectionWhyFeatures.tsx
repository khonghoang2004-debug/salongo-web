import { getTranslations } from "next-intl/server";

const cards = [
  { titleKey: "whyCard1Title" as const, descKey: "whyCard1Desc" as const },
  { titleKey: "whyCard2Title" as const, descKey: "whyCard2Desc" as const },
  { titleKey: "whyCard3Title" as const, descKey: "whyCard3Desc" as const },
];

export async function SectionWhyFeatures() {
  const t = await getTranslations("featuresPage");

  return (
    <section className="border-t border-neutral-100 bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#1F2937] lg:text-3xl">
          {t("whyTitle")}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3 lg:mt-12">
          {cards.map(({ titleKey, descKey }) => (
            <div
              key={titleKey}
              className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-pink-100"
              style={{
                background: "linear-gradient(180deg, #fff 0%, rgba(252,231,243,0.12) 100%)",
              }}
            >
              <h3 className="text-lg font-bold text-[#1F2937]">
                {t(titleKey)}
              </h3>
              <p className="mt-3 text-[#6B7280] leading-relaxed">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
