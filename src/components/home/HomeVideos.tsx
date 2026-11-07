import { getTranslations } from "next-intl/server";
import { SectionHead } from "../ui/SectionHead";
import { VideoTabs, type VideoTabItem } from "../video/VideoTabs";
import { VIDEOS } from "@/lib/videos";

const ANCHOR = { booking: "dat-lich-online", checkout: "tinh-tien", marketing: "marketing", payroll: "tinh-luong", branches: "da-chi-nhanh" } as const;

// Trang chủ: video giới thiệu từng tính năng, ngay dưới hero
export async function HomeVideos() {
  const t = await getTranslations("videos");
  const items: VideoTabItem[] = VIDEOS.map(({ id }) => ({
    id,
    anchor: ANCHOR[id],
    tab: t(`items.${id}.tab`),
    title: t(`items.${id}.title`),
    desc: t(`items.${id}.desc`),
  }));

  return (
    <section id="video" className="sg-section scroll-mt-20 bg-nude">
      <div className="sg-container">
        <SectionHead kicker={t("kicker")} title={t("title")} />
        <VideoTabs items={items} playLabel={t("play")} note={t("note")} moreLabel={t("more")} />
      </div>
    </section>
  );
}
