import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export async function FeaturesPageHero() {
  const t = await getTranslations("featuresPage");

  return (
    <section
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      style={{
        background: "linear-gradient(180deg, rgba(252,231,243,0.25) 0%, rgba(250,240,255,0.2) 50%, rgba(255,255,255,1) 100%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl lg:text-5xl">
          {t("heroTitle")}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-[#6B7280] sm:text-xl">
          {t("heroSubtext")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://app.salongo.eu/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:brightness-105 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #EC4899, #A855F7)",
            }}
          >
            {t("heroCtaPrimary")}
          </a>
          <Link
            href="/bang-gia"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#EC4899]/40 bg-white px-8 py-3.5 text-base font-semibold text-[#1F2937] transition-colors hover:border-[#EC4899] hover:bg-pink-50/50"
          >
            {t("heroCtaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
