import { getTranslations } from "next-intl/server";

export async function SectionCommitment() {
  const t = await getTranslations("pricingPage");

  return (
    <section className="sg-section sg-section-alt">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="sg-h2">
          {t("commitmentTitle")}
        </h2>
        <ul className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3">
          <li className="flex items-center gap-2 text-muted">
            <span className="text-emerald-500">✓</span>
            {t("commit1")}
          </li>
          <li className="flex items-center gap-2 text-muted">
            <span className="text-emerald-500">✓</span>
            {t("commit2")}
          </li>
          <li className="flex items-center gap-2 text-muted">
            <span className="text-emerald-500">✓</span>
            {t("commit3")}
          </li>
        </ul>
      </div>
    </section>
  );
}
