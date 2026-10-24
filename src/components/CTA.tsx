import { getTranslations } from "next-intl/server";

export async function CTA() {
  const t = await getTranslations("cta");

  return (
    <section id="contact" className="sg-section bg-white">
      <div className="sg-hero-card mx-auto max-w-6xl rounded-[28px] px-6 py-10 text-center shadow-sg-lg sm:rounded-[32px] sm:px-10 sm:py-12 lg:py-14">
        <h2 className="mx-auto max-w-3xl text-[1.75rem] font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base font-medium text-white/95 sm:text-xl">
          {t("subtitle")}
        </p>
        <a
          href="https://app.salongo.eu/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-on-gradient mt-8 px-9 py-4 text-lg [text-shadow:none]"
        >
          {t("button")}
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
