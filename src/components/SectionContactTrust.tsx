import { getTranslations } from "next-intl/server";
import { Users, Globe, Shield, BadgeCheck } from "lucide-react";

const ITEMS = [
  { key: "trust1" as const, Icon: Users },
  { key: "trust2" as const, Icon: Globe },
  { key: "trust3" as const, Icon: Shield },
  { key: "trust4" as const, Icon: BadgeCheck },
] as const;

export async function SectionContactTrust() {
  const t = await getTranslations("contact");

  return (
    <section className="sg-section pt-0 sm:pt-0 lg:pt-0">
      <div className="sg-container">
        <div data-reveal className="rounded-[28px] border border-line p-5 sm:p-8 lg:p-10">
          <h2 className="sg-h2-sm">{t("trustTitle")}</h2>
          <div data-stagger className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {ITEMS.map(({ key, Icon }) => (
              <div key={key} className="flex items-center gap-3">
                <span className="sg-icon-tile size-11 rounded-xl">
                  <Icon className="size-5" strokeWidth={2} aria-hidden />
                </span>
                <p className="text-[15px] font-medium leading-snug text-ink/85">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
