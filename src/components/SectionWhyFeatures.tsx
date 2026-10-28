import { CalendarCheck, HandCoins, TrendingUp } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHead } from "./ui/SectionHead";

const cards = [
  { i: 1, Icon: CalendarCheck },
  { i: 2, Icon: HandCoins },
  { i: 3, Icon: TrendingUp },
] as const;

export async function SectionWhyFeatures() {
  const t = await getTranslations("featuresV2");

  return (
    <section className="sg-section">
      <div className="sg-container">
        <SectionHead title={t("whyTitle")} layout="stack" />
        <div className="mt-12 grid border-t border-line md:grid-cols-3 md:divide-x md:divide-line">
          {cards.map(({ i, Icon }) => (
            <div key={i} className="border-b border-line py-8 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0">
              <span className="sg-icon-tile size-12 rounded-2xl" aria-hidden>
                <Icon className="size-6" />
              </span>
              <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em] text-ink">{t(`why${i}Title`)}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{t(`why${i}Text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
