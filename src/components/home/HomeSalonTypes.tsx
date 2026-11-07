import { getTranslations } from "next-intl/server";
import { Building2, Flower2, Scissors, Sparkles } from "lucide-react";
import { SectionHead } from "../ui/SectionHead";

const TYPES = [
  { k: "type1", Icon: Sparkles },
  { k: "type2", Icon: Scissors },
  { k: "type3", Icon: Flower2 },
  { k: "type4", Icon: Building2 },
] as const;

// Loại salon phù hợp: 4 cột ngăn bằng đường kẻ mảnh, icon trong ô hình đầu móng
export async function HomeSalonTypes() {
  const h = await getTranslations("home2");

  return (
    <section className="sg-section">
      <div className="sg-container">
        <SectionHead kicker={h("typesEyebrow")} title={h("typesTitle")} lead={h("typesLead")} />
        <div data-stagger className="mt-8 grid border-t border-line sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {TYPES.map(({ k, Icon }, i) => (
            <div
              key={k}
              className={`flex flex-col border-b border-line py-7 sm:px-6 lg:border-b-0 lg:py-8 ${i % 2 ? "sm:border-l" : "sm:pl-0"} ${i ? "lg:border-l lg:pl-6" : "lg:pl-0"}`}
            >
              <span className="flex h-14 w-11 items-center justify-center rounded-[50%_50%_12px_12px/40%_40%_12px_12px] bg-brand-50 text-brand-700" aria-hidden>
                <Icon className="mt-2 size-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-ink">
                {h(`${k}Title`)}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                {h(`${k}Text`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
