import { getTranslations } from "next-intl/server";
import { CLIPS } from "@/lib/clips";
import { ClipReel, type ClipItem } from "./ClipReel";

export async function ClipSection() {
  const t = await getTranslations("landing.videos");
  const items: ClipItem[] = CLIPS.map((c) => ({ ...c, title: t(`items.${c.id}.title`), desc: t(`items.${c.id}.desc`) }));
  return (
    <section className="x-section bg-white" aria-labelledby="clips-title">
      <div className="x-wrap">
        <div className="max-w-[40rem]">
          <h2 id="clips-title" className="x-h2 text-ink">{t("title")}</h2>
          <p className="x-lead mt-4">{t("lead")}</p>
        </div>
        <div className="mt-12">
          <ClipReel items={items} playLabel={t("play")} pauseLabel={t("pause")} />
        </div>
      </div>
    </section>
  );
}
