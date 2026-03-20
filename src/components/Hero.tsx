import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-white px-4 pt-6 pb-6 sm:px-6 sm:pt-8 sm:pb-10 lg:px-8 lg:pt-12 lg:pb-16">
      <div className="relative z-10 mx-auto max-w-[1600px]">
        <div className="grid items-center gap-4 lg:grid-cols-[1fr_1.9fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            {/* H1 always visible for SEO - styling handles responsive display */}
            <h1 className="max-w-[600px] text-4xl font-bold leading-tight tracking-tight text-[#1F2937] sm:text-5xl lg:text-6xl">
              {t("titleBefore")}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #EC4899 0%, #C084FC 100%)" }}
              >
                {t("titleSalon")}
              </span>{" "}
              {t("titleAfter1")}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #EC4899 0%, #C084FC 100%)" }}
              >
                {t("heroHighlight2")}
              </span>
              {t("titleAfter2")}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #EC4899 0%, #C084FC 100%)" }}
              >
                {t("heroHighlight3")}
              </span>
              {t("titleAfter3")}
            </h1>
            <p className="mt-3 max-w-xl text-lg text-[#6B7280] sm:mt-4 lg:mt-6">
              {t("subtitle")}
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-4 lg:mt-10">
              <a
                href="https://app.salongo.eu/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 transition-all duration-300 hover:brightness-105"
                style={{
                  background: "linear-gradient(135deg, rgba(252,231,243,0.95) 0%, rgba(250,240,255,0.95) 100%)",
                  border: "1px solid rgba(236,72,153,0.25)",
                }}
              >
                <span className="btn-glass-text text-base">{t("cta")}</span>
              </a>
              <Link
                href="/tinh-nang"
                className="inline-flex items-center justify-center rounded-full border px-6 py-3 font-semibold text-[#1F2937] transition-all duration-300 hover:border-[#EC4899]/40 hover:bg-gradient-to-br hover:from-pink-100 hover:to-violet-50 hover:text-[#EC4899] hover:shadow-[0_2px_12px_rgba(236,72,153,0.15)]"
                style={{
                  background: "rgba(255,255,255,0.5)",
                  borderColor: "rgba(0,0,0,0.06)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                {t("ctaSecondary")}
              </Link>
            </div>

            <div className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3 lg:mt-8">
              <p className="flex items-center gap-3 text-base font-medium text-[#6B7280]">
                <CheckIcon />
                {t("proof1")}
              </p>
              <p className="flex items-center gap-3 text-base font-medium text-[#6B7280]">
                <CheckIcon />
                {t("proof2")}
              </p>
              <p className="flex items-center gap-3 text-base font-medium text-[#6B7280]">
                <CheckIcon />
                {t("proof3")}
              </p>
            </div>
          </div>

          <div className="relative order-1 flex justify-center lg:order-2">
            <div className="relative w-full max-w-xl min-w-0 drop-shadow-2xl sm:max-w-2xl lg:max-w-4xl lg:scale-[1.02] lg:origin-center">
              <img
                src="/images/hero-image.png"
                alt={t("imageAlt")}
                className="w-full"
              />
              {/* Mobile only: visual overlay text (not H1 for SEO) */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 lg:hidden">
                <div className="text-2xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] sm:text-3xl">
                  {t("titleBefore")}{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(135deg, #f9a8d4 0%, #e9d5ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    {t("titleSalon")}
                  </span>{" "}
                  {t("titleAfter1")}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(135deg, #f9a8d4 0%, #e9d5ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    {t("heroHighlight2")}
                  </span>
                  {t("titleAfter2")}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(135deg, #f9a8d4 0%, #e9d5ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    {t("heroHighlight3")}
                  </span>
                  {t("titleAfter3")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      className="size-5 shrink-0 text-emerald-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
