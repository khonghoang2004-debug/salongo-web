import { getTranslations } from "next-intl/server";
import { Check, Minus } from "lucide-react";
import { FeatureVideo } from "@/components/video/FeatureVideo";
import { DESK_VIDEO } from "@/lib/videos";

const YES = ["y1", "y2", "y3", "y4", "y5"] as const;
const NO = ["n1", "n2", "n3"] as const;

/** Có gì / không có gì (danh sách mảnh, không thẻ), cạnh video 35 giây quay từ app. */
export async function DeskIncluded() {
  const t = await getTranslations("desk2.what");
  const tv = await getTranslations("desk2.video");
  const tVid = await getTranslations("videos");
  return (
    <section className="x-section bg-white" aria-labelledby="desk-what-title">
      <div className="x-wrap grid gap-12 lg:grid-cols-12 lg:gap-8 [&>*]:min-w-0">
        <div className="lg:col-span-5">
          <h2 id="desk-what-title" className="x-h2 text-ink">{t("title")}</h2>
          <h3 className="mt-10 text-[15px] font-semibold text-ink">{t("yesTitle")}</h3>
          <ul className="mt-3 border-t border-ink/80">
            {YES.map((k) => (
              <li key={k} className="flex gap-3 border-b border-line py-4 text-[1.0625rem] leading-snug text-ink">
                <Check className="mt-0.5 size-[18px] shrink-0 text-brand-700" strokeWidth={2.5} aria-hidden />
                {t(k)}
              </li>
            ))}
          </ul>
          <h3 className="mt-10 text-[15px] font-semibold text-ink">{t("noTitle")}</h3>
          <ul className="mt-3 border-t border-line">
            {NO.map((k) => (
              <li key={k} className="flex gap-3 border-b border-line py-3.5 text-[15.5px] leading-snug text-muted">
                <Minus className="mt-0.5 size-[18px] shrink-0 text-ink/30" aria-hidden />
                {t(k)}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14.5px] text-muted">{t("noNote")}</p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
          <h3 id="desk-video-title" className="mb-4 text-[15px] font-semibold text-ink">{tv("title")}</h3>
          <FeatureVideo video={DESK_VIDEO} title={tv("title")} playLabel={tVid("play")} className="!rounded-[14px] !shadow-none" />
        </div>
      </div>
    </section>
  );
}
