import { CircleCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CHAPTERS, FEATURES, FEATURE_ICONS, type Feature } from "./featuresData";
import { ScreenTabsMockup } from "./ScreenTabsMockup";
import { StaffAccountVisual } from "./StaffAccountVisual";

// Phần chi tiết trang Tính năng: 3 phần theo một ngày làm việc của salon,
// mỗi tính năng có ảnh màn hình lớn và 4 việc bạn có thể làm
export async function FeatureChapters() {
  const t = await getTranslations("featuresV2");
  let n = 0;

  return (
    <>
      {CHAPTERS.map((c, ci) => (
        <section key={c} className={`sg-section ${ci % 2 === 1 ? "sg-section-alt" : "bg-white"}`}>
          <div className="mx-auto max-w-6xl">
            <header className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3.5 py-1 text-sm font-semibold text-violet-700">
                <span className="sg-gradient-text font-extrabold">{ci + 1}</span>
                {t(`chapters.${c}.label`)}
              </span>
              <h2 className="mt-4 sg-h2">{t(`chapters.${c}.title`)}</h2>
              <p className="sg-lead mx-auto mt-3 max-w-2xl">{t(`chapters.${c}.lead`)}</p>
            </header>

            <div className="mt-10 space-y-16 sm:mt-12 lg:space-y-24">
              {FEATURES.filter((f) => f.chapter === c).map((f) => (
                <FeatureShowcase key={f.id} feature={f} index={++n} t={t} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

type T = Awaited<ReturnType<typeof getTranslations<"featuresV2">>>;

function FeatureShowcase({ feature, index, t }: { feature: Feature; index: number; t: T }) {
  const { id, anchor, views } = feature;
  const Icon = FEATURE_ICONS[id];
  const k = (s: string) => `f.${id}.${s}` as Parameters<T>[0];

  return (
    <article id={anchor} className="scroll-mt-[136px]">
      <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3">
            <span className="sg-icon-tile size-11 rounded-xl" aria-hidden>
              <Icon className="size-5" />
            </span>
            <span className="text-sm font-bold tracking-wider text-muted">
              <span className="sg-gradient-text">{String(index).padStart(2, "0")}</span>
              <span className="mx-2 text-line">/</span>
              {t(k("short"))}
            </span>
          </div>
          <h3 className="mt-4 sg-h2-sm">{t(k("title"))}</h3>
        </div>
        <p className="sg-lead lg:col-span-5">{t(k("desc"))}</p>
      </div>

      <div className="mt-6 sm:mt-8">
        {views.length > 0 ? (
          <ScreenTabsMockup
            zoomLabel={t("zoom")}
            closeLabel={t("close")}
            views={views.map((v, i) => ({
              key: v.src,
              label: t(k(`tab${i + 1}`)),
              src: v.src,
              icon: v.icon,
            }))}
          />
        ) : (
          <StaffAccountVisual />
        )}
      </div>

      <div className="mt-6 sm:mt-8">
        <p className="text-sm font-bold uppercase tracking-wider text-muted">{t("youCan")}</p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="sg-card p-4 sm:p-5">
              <div className="flex items-start gap-2.5">
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                <div>
                  <h4 className="font-semibold leading-snug text-ink">{t(k(`p${i}Title`))}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{t(k(`p${i}Text`))}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
