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
    <section className="border-t border-neutral-100 bg-neutral-50/50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-xl font-bold tracking-tight text-[#1F2937] sm:text-2xl lg:text-3xl">
          {t("commitmentTitle")}
        </h2>

        <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:mt-10 lg:grid-cols-5 lg:gap-3">
          {COMMITMENTS.map(({ key, Icon }, index) => (
            <li
              key={key}
              className={
                index === COMMITMENTS.length - 1
                  ? "col-span-2 flex justify-center sm:col-span-2 lg:col-span-1"
                  : ""
              }
            >
              <div
                className="mx-auto flex w-full max-w-[11.5rem] flex-col items-center rounded-xl border border-neutral-200/80 bg-white px-3 py-3 text-center shadow-sm transition-shadow hover:shadow sm:mx-0 sm:max-w-none sm:rounded-2xl sm:px-4 sm:py-5 lg:py-4"
              >
                <div
                  className="flex size-9 items-center justify-center rounded-xl border shadow-[0_2px_8px_rgba(236,72,153,0.1)] sm:size-11 sm:rounded-2xl lg:size-10"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(252,231,243,0.95) 0%, rgba(250,240,255,0.95) 100%)",
                    borderColor: "rgba(236,72,153,0.25)",
                  }}
                >
                  <Icon
                    className="size-[1.125rem] text-[#EC4899] sm:size-[1.35rem] lg:size-5"
                    strokeWidth={2}
                    aria-hidden
                  />
                </div>
                <span className="mt-1.5 text-xs font-medium leading-tight text-[#374151] sm:mt-2.5 sm:text-sm">
                  {t(key)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
