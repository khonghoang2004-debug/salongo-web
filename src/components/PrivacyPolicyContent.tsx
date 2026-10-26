import { getTranslations } from "next-intl/server";
import { CONTACT_EMAIL } from "@/lib/contact";

export async function PrivacyPolicyContent() {
  const t = await getTranslations("privacyPolicy");

  const sections = [
    { key: "intro" as const, title: null },
    { key: "serviceDescription" as const, title: null },
    { key: "userData" as const, title: null },
    { key: "responsibility" as const, title: null },
    { key: "security" as const, title: null },
    { key: "changes" as const, title: null },
    { key: "contact" as const, title: null },
  ] as const;

  return (
    <section className="bg-white px-4 pt-8 pb-12 sm:px-6 sm:pt-10 sm:pb-16 lg:px-8">
      <div className="mx-auto max-w-3xl prose prose-neutral">
        {sections.map(({ key }) => (
          <div key={key} className="mb-8">
            {key === "contact" ? (
              <p className="text-ink/80 leading-relaxed">
                {t("contact")}{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-accent-strong hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            ) : (
              <p className="text-ink/80 leading-relaxed">{t(key)}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
