import { getTranslations } from "next-intl/server";
import type { ShotId } from "@/lib/media";
import { DayTourClient, type DayStep } from "./DayTourClient";

const STEPS: { key: string; shot: ShotId }[] = [
  { key: "s1", shot: "booking" },
  { key: "s2", shot: "calendar" },
  { key: "s3", shot: "checkout" },
  { key: "s4", shot: "thuchi" },
  { key: "s5", shot: "payroll" },
];

export async function DayTour() {
  const t = await getTranslations("landing.day");
  const steps: DayStep[] = STEPS.map(({ key, shot }) => ({
    time: t(`${key}.time`),
    title: t(`${key}.title`),
    desc: t(`${key}.desc`),
    shot,
    alt: t(`${key}.title`),
  }));
  return (
    <section className="x-section bg-white" aria-labelledby="day-title">
      <div className="x-wrap">
        <div className="max-w-[46rem]">
          <h2 id="day-title" className="x-h2 text-ink">{t("title")}</h2>
          <p className="x-lead mt-5">{t("lead")}</p>
        </div>
        <div className="mt-14 lg:mt-6">
          <DayTourClient steps={steps} />
        </div>
      </div>
    </section>
  );
}
