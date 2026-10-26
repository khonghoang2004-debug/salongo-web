import { getTranslations } from "next-intl/server";
import { Building2, Flower2, Scissors, Sparkles } from "lucide-react";

const TYPES = [
  { k: "type1", Icon: Sparkles },
  { k: "type2", Icon: Scissors },
  { k: "type3", Icon: Flower2 },
  { k: "type4", Icon: Building2 },
] as const;

export async function HomeSalonTypes() {
  const h = await getTranslations("home2");

  return (
    <section className="sg-section bg-white pt-0 sm:pt-0 lg:pt-0">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="sg-kicker">{h("typesEyebrow")}</p>
          <h2 className="sg-h2 mt-4">{h("typesTitle")}</h2>
          <p className="sg-lead mt-4">{h("typesLead")}</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
          {TYPES.map(({ k, Icon }) => (
            <div key={k} className="sg-card sg-card-hover p-6 sm:p-7">
              <span className="sg-icon-tile size-11 rounded-xl">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-[-0.01em] text-ink">{h(`${k}Title`)}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{h(`${k}Text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
