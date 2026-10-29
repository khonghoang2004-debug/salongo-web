import { getTranslations } from "next-intl/server";
import { Building2, Flower2, Scissors, Sparkles } from "lucide-react";
import { SectionHead } from "../ui/SectionHead";

const TYPES = [
  { k: "type1", Icon: Sparkles },
  { k: "type2", Icon: Scissors },
  { k: "type3", Icon: Flower2 },
  { k: "type4", Icon: Building2 },
] as const;

// Loại salon phù hợp: 4 thẻ hiện lần lượt, rê chuột chuyển nền đỏ đô
export async function HomeSalonTypes() {
  const h = await getTranslations("home2");

  return (
    <section className="sg-section">
      <div className="sg-container">
        <SectionHead kicker={h("typesEyebrow")} title={h("typesTitle")} lead={h("typesLead")} />
        <div data-stagger className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-16 lg:grid-cols-4">
          {TYPES.map(({ k, Icon }, i) => (
            <div
              key={k}
              className="group flex min-h-[260px] flex-col rounded-[24px] border border-line bg-white p-7 transition-colors duration-500 hover:border-brand-700 hover:bg-brand-700 sm:min-h-[300px]"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span className="font-display text-sm font-semibold text-ink/30 transition-colors duration-500 group-hover:text-white/60">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-auto pt-10 text-xl font-semibold tracking-[-0.02em] text-ink transition-colors duration-500 group-hover:text-white">
                {h(`${k}Title`)}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/80">
                {h(`${k}Text`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
