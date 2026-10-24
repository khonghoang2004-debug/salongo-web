import { CalendarCheck, HandCoins, TrendingUp } from "lucide-react";
import { getTranslations } from "next-intl/server";

const cards = [
  { i: 1, Icon: CalendarCheck },
  { i: 2, Icon: HandCoins },
  { i: 3, Icon: TrendingUp },
] as const;

export async function SectionWhyFeatures() {
  const t = await getTranslations("featuresV2");

  return (
    <section className="sg-section sg-section-alt">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center sg-h2">{t("whyTitle")}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {cards.map(({ i, Icon }) => (
            <div key={i} className="sg-card sg-card-hover p-6">
              <span className="sg-icon-tile size-11 rounded-xl" aria-hidden>
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{t(`why${i}Title`)}</h3>
              <p className="mt-2 leading-relaxed text-muted">{t(`why${i}Text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
