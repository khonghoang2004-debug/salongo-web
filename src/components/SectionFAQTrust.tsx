import { getTranslations } from "next-intl/server";
import { Users, Globe, MessageCircle, Shield } from "lucide-react";

const ITEMS = [
  { key: "trust1" as const, Icon: Users },
  { key: "trust2" as const, Icon: Globe },
  { key: "trust3" as const, Icon: MessageCircle },
  { key: "trust4" as const, Icon: Shield },
] as const;

export async function SectionFAQTrust() {
  const t = await getTranslations("faq");

  return (
    <section className="sg-section sg-section-alt">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center sg-h2-sm">
          {t("trustTitle")}
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 lg:gap-3">
          {ITEMS.map(({ key, Icon }) => (
            <div
              key={key}
              className="flex flex-col items-center rounded-xl border border-line bg-white px-2 py-3 text-center shadow-sg-sm transition-shadow hover:shadow-sg-md sm:rounded-2xl sm:p-6 sm:shadow-sg-md"
            >
              <div
                className="flex size-9 items-center justify-center sg-icon-tile rounded-xl sm:size-12 sm:rounded-2xl"
              >
                <Icon
                  className="size-[1.125rem] text-accent-strong sm:size-6"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
              <p className="mt-2 text-center text-xs font-medium leading-snug text-ink/80 sm:mt-3 sm:text-sm sm:leading-normal">
                {t(key)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
