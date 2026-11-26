import { getTranslations } from "next-intl/server";
import { CLIPS } from "@/lib/clips";
import { SectionHead } from "./SectionHead";
import { ClipReel, type ClipItem } from "./ClipReel";

export async function ClipSection() {
  const t = await getTranslations("landing.videos");
  const items: ClipItem[] = CLIPS.map((c) => ({ ...c, title: t(`items.${c.id}.title`), desc: t(`items.${c.id}.desc`) }));
  return (
    <section className="x-section bg-white" aria-labelledby="clips-title">
      <div className="x-wrap">
        <SectionHead id="clips-title" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} className="max-w-[40rem]" />
        <div className="mt-10 lg:mt-14">
          <ClipReel items={items} playLabel={t("play")} pauseLabel={t("pause")} />
        </div>
      </div>
    </section>
  );
}
