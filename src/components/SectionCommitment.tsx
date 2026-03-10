import { getTranslations } from "next-intl/server";

export async function SectionCommitment() {
  const t = await getTranslations("pricingPage");

  return (
    <section className="border-t border-neutral-100 bg-neutral-50/50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[#1F2937]">
          {t("commitmentTitle")}
        </h2>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-12 gap-y-4">
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
