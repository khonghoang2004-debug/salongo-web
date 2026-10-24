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
    <section className="sg-section sg-section-alt">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center sg-h2-sm">
          {t("commitmentTitle")}
        </h2>

        <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3 lg:mt-8 lg:grid-cols-5 lg:gap-2.5">
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
                  className="sg-icon-tile size-9 rounded-xl sm:size-11 sm:rounded-2xl lg:size-10"
                >
                  <Icon
                    className="size-[1.125rem] text-accent-strong sm:size-[1.35rem] lg:size-5"
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
