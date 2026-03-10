import { getTranslations } from "next-intl/server";

export async function SectionSolutionsCase() {
  const t = await getTranslations("solutionsPage");

  return (
    <section className="border-t border-neutral-100 bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#1F2937]">
          {t("caseTitle")}
        </h2>
        <blockquote className="mt-8 rounded-2xl border border-neutral-100 bg-gradient-to-br from-pink-50/50 to-violet-50/30 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)]" style={{ borderRadius: 16 }}>
          <p className="text-lg leading-relaxed text-[#374151] italic">
            &ldquo;{t("caseQuote")}&rdquo;
          </p>
          <footer className="mt-6 font-semibold text-[#1F2937]">
            – {t("caseAuthor")}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
