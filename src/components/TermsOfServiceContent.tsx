import { getTranslations } from "next-intl/server";
import { CONTACT_EMAIL } from "@/lib/contact";

const SECTION_KEYS = [
  "intro",
  "serviceDescription",
  "accounts",
  "usage",
  "userData",
  "payments",
  "limitation",
  "termination",
  "law",
  "contact",
] as const;

export async function TermsOfServiceContent() {
  const t = await getTranslations("termsOfService");

  return (
    <section className="border-t border-neutral-100 bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-3xl prose prose-neutral">
        {SECTION_KEYS.map((key) => (
          <div key={key} className="mb-8">
            {key === "contact" ? (
              <p className="text-[#374151] leading-relaxed">
                {t("contact")}{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-[#EC4899] hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            ) : (
              <p className="text-[#374151] leading-relaxed">{t(key)}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
