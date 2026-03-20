import { getTranslations } from "next-intl/server";

export async function SectionAbout() {
  const t = await getTranslations("about");

  return (
    <section className="border-t border-neutral-100 bg-white px-4 pt-6 pb-12 sm:px-6 sm:pt-8 sm:pb-14 lg:px-8 lg:pt-10 lg:pb-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl lg:text-4xl">
          {t("title")}
        </h2>

        <div className="mt-8 space-y-10">
          <div>
            <h3 className="text-xl font-bold text-[#1F2937]">
              {t("missionTitle")}
            </h3>
            <p className="mt-3 text-lg leading-relaxed text-[#6B7280]">
              {t("missionDesc")}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#1F2937]">
              {t("whyTitle")}
            </h3>
            <ul className="mt-3 space-y-2.5 text-[#6B7280]">
              <li className="flex gap-3">
                <span className="text-[#EC4899]">•</span>
                {t("why1")}
              </li>
              <li className="flex gap-3">
                <span className="text-[#EC4899]">•</span>
                {t("why2")}
              </li>
              <li className="flex gap-3">
                <span className="text-[#EC4899]">•</span>
                {t("why3")}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#1F2937]">
              {t("roadmapTitle")}
            </h3>
            <ul className="mt-3 space-y-2.5 text-[#6B7280]">
              <li className="flex gap-3">
                <span className="text-[#A855F7]">→</span>
                {t("roadmap1")}
              </li>
              <li className="flex gap-3">
                <span className="text-[#A855F7]">→</span>
                {t("roadmap2")}
              </li>
              <li className="flex gap-3">
                <span className="text-[#A855F7]">→</span>
                {t("roadmap3")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
