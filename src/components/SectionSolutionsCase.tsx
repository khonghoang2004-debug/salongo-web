import { getTranslations } from "next-intl/server";

export async function SectionSolutionsCase() {
  const t = await getTranslations("solutionsPage");

  return (
    <section className="sg-section bg-white">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center sg-h2">
          {t("caseTitle")}
        </h2>
        <blockquote className="mt-5 rounded-2xl border border-neutral-100 bg-gradient-to-br from-pink-50/50 to-violet-50/30 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] sm:p-8" style={{ borderRadius: 16 }}>
          <p className="text-lg leading-relaxed text-[#374151] italic">
            &ldquo;{t("caseQuote")}&rdquo;
          </p>
          <footer className="mt-4 font-semibold text-ink">
            – {t("caseAuthor")}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
