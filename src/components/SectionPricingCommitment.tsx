import { getTranslations } from "next-intl/server";
import { Shield, XCircle, Lock, MessageCircle, Sparkles } from "lucide-react";

const COMMITMENTS = [
  { key: "commit1", Icon: Shield },
  { key: "commit2", Icon: XCircle },
  { key: "commit3", Icon: Lock },
  { key: "commit4", Icon: MessageCircle },
  { key: "commit5", Icon: Sparkles },
] as const;

export async function SectionPricingCommitment() {
  const t = await getTranslations("pricingPage");

  return (
    <section className="border-t border-neutral-100 bg-neutral-50/50 px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl">
          {t("commitmentTitle")}
        </h2>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {COMMITMENTS.map(({ key, Icon }) => (
            <li
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
              <span className="mt-3 text-sm font-medium text-[#374151]">
                {t(key)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
