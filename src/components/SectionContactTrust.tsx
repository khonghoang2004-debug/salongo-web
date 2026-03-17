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
    <section className="border-t border-neutral-100 bg-neutral-50/40 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-lg font-bold tracking-tight text-[#1F2937] sm:text-xl lg:text-2xl">
          {t("trustTitle")}
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-4">
          {ITEMS.map(({ key, Icon }) => (
            <div
              key={key}
              className="flex flex-col items-center rounded-xl border border-neutral-200/80 bg-white px-2 py-3 text-center shadow-sm transition-shadow hover:shadow-md sm:rounded-2xl sm:p-6 sm:shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
            >
              <div
                className="flex size-9 items-center justify-center rounded-xl border shadow-[0_2px_8px_rgba(236,72,153,0.1)] sm:size-12 sm:rounded-2xl sm:shadow-[0_2px_10px_rgba(236,72,153,0.12)]"
                style={{
                  background: "linear-gradient(135deg, rgba(252,231,243,0.95) 0%, rgba(250,240,255,0.95) 100%)",
                  borderColor: "rgba(236,72,153,0.25)",
                }}
              >
                <Icon
                  className="size-[1.125rem] text-[#EC4899] sm:size-6"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
              <p className="mt-2 text-center text-xs font-medium leading-snug text-[#374151] sm:mt-3 sm:text-sm sm:leading-normal">
                {t(key)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
