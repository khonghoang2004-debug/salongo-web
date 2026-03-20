import { getTranslations } from "next-intl/server";

export async function CTA() {
  const t = await getTranslations("cta");

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8 lg:pt-20 lg:pb-24"
      style={{
        background: "linear-gradient(135deg, rgba(252,231,243,0.95) 0%, rgba(250,240,255,0.95) 100%)",
      }}
    >
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-[#6B7280] sm:text-xl">
          {t("subtitle")}
        </p>
        <a
          href="https://app.salongo.eu/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-lg font-semibold transition-all duration-300 hover:brightness-105 active:scale-[0.98]"
          style={{
            border: "1px solid rgba(236,72,153,0.25)",
          }}
        >
          <span className="btn-glass-text">{t("button")}</span>
        </a>
      </div>
    </section>
  );
}
