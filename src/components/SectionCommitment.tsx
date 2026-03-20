import { getTranslations } from "next-intl/server";

export async function SectionCommitment() {
  const t = await getTranslations("pricingPage");

  return (
    <section className="border-t border-neutral-100 bg-neutral-50/50 px-4 pt-6 pb-10 sm:px-6 sm:pt-8 sm:pb-12 lg:px-8 lg:pt-10 lg:pb-14">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[#1F2937]">
          {t("commitmentTitle")}
        </h2>
        <ul className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3">
          <li className="flex items-center gap-2 text-[#6B7280]">
            <span className="text-emerald-500">✓</span>
            {t("commit1")}
          </li>
          <li className="flex items-center gap-2 text-[#6B7280]">
            <span className="text-emerald-500">✓</span>
            {t("commit2")}
          </li>
          <li className="flex items-center gap-2 text-[#6B7280]">
            <span className="text-emerald-500">✓</span>
            {t("commit3")}
          </li>
        </ul>
      </div>
    </section>
  );
}
