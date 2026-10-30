import { CircleCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CHAPTERS, FEATURES, FEATURE_ICONS, type Feature } from "./featuresData";
import { ScreenTabsMockup } from "./ScreenTabsMockup";
import { PhoneShot } from "./ui/AppShot";
import { VideoModalButton } from "./video/VideoModalButton";
import { videoById, type VideoId } from "@/lib/videos";

// Tính năng nào có video giới thiệu (một video có thể dùng cho 2 tính năng liền nhau)
const FEATURE_VIDEO: Partial<Record<Feature["id"], VideoId>> = {
  booking: "booking",
  calendar: "booking",
  checkout: "checkout",
  reports: "checkout",
  marketing: "marketing",
  payroll: "payroll",
  branches: "branches",
};

// Phần chi tiết trang Tính năng: 3 phần theo một ngày làm việc của salon,
// mỗi tính năng có ảnh màn hình lớn và 4 việc bạn có thể làm
export async function FeatureChapters() {
  const t = await getTranslations("featuresV2");
  const v = await getTranslations("videos");
  const videoLabels = { label: v("watch"), playLabel: v("play"), closeLabel: v("close"), note: v("note") };
  let n = 0;

  return (
    <>
      {CHAPTERS.map((c, ci) => (
        <section key={c} className={`sg-section ${ci % 2 === 1 ? "bg-[#FBF7F7]" : "bg-white"}`}>
          <div className="sg-container">
            <header data-reveal className="grid gap-4 border-b border-line pb-7 lg:grid-cols-12 lg:items-end lg:gap-10">
              <div className="lg:col-span-7">
                <p className="sg-kicker">
                  {String(ci + 1).padStart(2, "0")} · {t(`chapters.${c}.label`)}
                </p>
                <h2 className="mt-4 sg-h2">{t(`chapters.${c}.title`)}</h2>
              </div>
              <p className="sg-lead lg:col-span-5 lg:pb-1.5">{t(`chapters.${c}.lead`)}</p>
            </header>

            <div className="mt-8 space-y-14 sm:mt-10 lg:space-y-20">
              {FEATURES.filter((f) => f.chapter === c).map((f) => (
                <FeatureShowcase
                  key={f.id}
                  feature={f}
                  index={++n}
                  t={t}
                  video={FEATURE_VIDEO[f.id] && { id: FEATURE_VIDEO[f.id]!, title: v(`items.${FEATURE_VIDEO[f.id]!}.title`), ...videoLabels }}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

type T = Awaited<ReturnType<typeof getTranslations<"featuresV2">>>;

type VideoProps = { id: VideoId; title: string; label: string; playLabel: string; closeLabel: string; note: string };

function FeatureShowcase({ feature, index, t, video }: { feature: Feature; index: number; t: T; video?: VideoProps }) {
  const { id, anchor, views, phones } = feature;
  const Icon = FEATURE_ICONS[id];
  const k = (s: string) => `f.${id}.${s}` as Parameters<T>[0];

  return (
    <article id={anchor} className="scroll-mt-[136px]">
      <div data-reveal className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3">
            <span className="sg-icon-tile size-11 rounded-xl" aria-hidden>
              <Icon className="size-5" />
            </span>
            <span className="text-sm font-bold tracking-wider text-muted">
              <span className="text-brand-700">{String(index).padStart(2, "0")}</span>
              <span className="mx-2 text-line">/</span>
              {t(k("short"))}
            </span>
          </div>
          <h3 className="mt-4 sg-h2-sm">{t(k("title"))}</h3>
          {video && (
            <VideoModalButton
              video={videoById(video.id)}
              title={video.title}
              label={video.label}
              playLabel={video.playLabel}
              closeLabel={video.closeLabel}
              note={video.note}
              className="mt-5"
            />
          )}
        </div>
        <p className="sg-lead lg:col-span-5">{t(k("desc"))}</p>
      </div>

      <div data-reveal="scale" className="mt-6 sm:mt-8">
        {phones ? (
          <div className="rounded-2xl bg-brand-700 px-4 pb-6 pt-7 sm:rounded-3xl sm:px-10 sm:pb-9 sm:pt-10">
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-auto sm:grid sm:max-w-[860px] sm:grid-cols-3 sm:gap-8 sm:overflow-visible sm:px-0">
              {phones.map((src, i) => (
                <figure key={src} className="w-[62vw] max-w-[240px] shrink-0 snap-center sm:w-auto sm:max-w-none">
                  <PhoneShot src={src} alt={t(k(`shot${i + 1}`))} />
                  <figcaption className="mt-3 text-center text-xs font-semibold text-white/85 sm:text-sm">{t(k(`shot${i + 1}`))}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        ) : (
          <ScreenTabsMockup
            zoomLabel={t("zoom")}
            closeLabel={t("close")}
            views={views.map((v, i) => ({
              key: v.src,
              label: t(k(`tab${i + 1}`)),
              src: v.src,
              icon: v.icon,
              mobile: v.mobile,
            }))}
          />
        )}
      </div>

      <div className="mt-6 sm:mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{t("youCan")}</p>
        <ul data-stagger className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="rounded-2xl border border-line bg-white p-5">
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
