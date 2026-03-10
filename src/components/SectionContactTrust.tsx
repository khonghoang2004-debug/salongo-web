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
    <section className="border-t border-neutral-100 bg-neutral-50/40 px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-xl font-bold tracking-tight text-[#1F2937] sm:text-2xl">
          {t("trustTitle")}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ key, Icon }) => (
            <div
              key={key}
              className="flex flex-col items-center rounded-2xl border border-neutral-200/80 bg-white p-6 text-center shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-md"
            >
              <div
                className="flex size-12 items-center justify-center rounded-2xl border shadow-[0_2px_10px_rgba(236,72,153,0.12)]"
                style={{
                  background: "linear-gradient(135deg, rgba(252,231,243,0.95) 0%, rgba(250,240,255,0.95) 100%)",
                  borderColor: "rgba(236,72,153,0.25)",
                }}
              >
                <Icon className="size-6 text-[#EC4899]" strokeWidth={2} aria-hidden />
              </div>
              <p className="mt-3 text-sm font-medium text-[#374151]">
                {t(key)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
