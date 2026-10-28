import { getTranslations } from "next-intl/server";
import { Building2, Flower2, Scissors, Sparkles } from "lucide-react";
import { SectionHead } from "../ui/SectionHead";

const TYPES = [
  { k: "type1", Icon: Sparkles },
  { k: "type2", Icon: Scissors },
  { k: "type3", Icon: Flower2 },
  { k: "type4", Icon: Building2 },
] as const;

// Loại salon phù hợp: 4 cột ngăn bằng đường kẻ, không dùng thẻ
export async function HomeSalonTypes() {
  const h = await getTranslations("home2");

  return (
    <section className="sg-section">
      <div className="sg-container">
        <SectionHead kicker={h("typesEyebrow")} title={h("typesTitle")} lead={h("typesLead")} />
        <div className="mt-12 grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:mt-16 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-line">
          {TYPES.map(({ k, Icon }, i) => (
            <div key={k} className="border-b border-line py-8 sm:py-10 lg:border-b-0 lg:px-7 lg:first:pl-0 lg:last:pr-0">
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span className="font-display text-sm font-semibold text-ink/30">0{i + 1}</span>
              </div>
              <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em] text-ink">{h(`${k}Title`)}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{h(`${k}Text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
