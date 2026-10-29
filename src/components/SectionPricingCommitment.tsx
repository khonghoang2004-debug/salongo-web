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
    <section className="sg-section pt-0 sm:pt-0 lg:pt-0">
      <div className="sg-container">
        <div data-reveal className="rounded-[28px] border border-line p-5 sm:p-8 lg:p-10">
          <h2 className="sg-h2-sm">{t("commitmentTitle")}</h2>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {COMMITMENTS.map(({ key, Icon }) => (
              <li
                key={key}
                className="flex min-h-11 items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2 text-[15px] font-medium text-ink/85"
              >
                <Icon className="size-[18px] text-brand-700" strokeWidth={2} aria-hidden />
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
