import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHead } from "../ui/SectionHead";
import { FeatureTabs, type FeatureTabItem } from "./FeatureTabs";

// "Một ngày ở tiệm": các tính năng theo đúng thứ tự một ngày làm việc (chữ: messages → day.items.*).
// Ảnh chụp thật từ app (PC + điện thoại), giữ nguyên tên file trong public/images/app.
const A = "/images/app/";
const ITEMS = [
  { id: "s1", anchor: "dat-lich-online", img: A + "dat-lich-khach.webp", mobile: A + "m-dat-lich-gio.webp" },
  { id: "s2", anchor: "dat-lich-online", img: A + "lich-online-noi-dung.webp", mobile: A + "m-lich-online.webp" },
  { id: "s3", anchor: "lich-hen", img: A + "lich-hen-nhan-vien-noi-dung.webp", mobile: A + "m-lich-hen.webp" },
  { id: "s4", anchor: "nhan-vien", img: A + "nhan-vien-noi-dung.webp", mobile: A + "m-nv-hom-nay.webp" },
  { id: "s5", anchor: "tinh-tien", img: A + "tinh-tien-noi-dung.webp", mobile: A + "m-tinh-tien.webp" },
  { id: "s6", anchor: "khach-hang", img: A + "khach-hang-noi-dung.webp", mobile: A + "m-khach-hang.webp" },
  // 20:00 chốt sổ: doanh thu của chính ngày đó (Tổng quan "Hôm nay"), không phải 30 ngày
  { id: "s7", anchor: "bao-cao", img: A + "tong-quan-noi-dung.webp", mobile: A + "m-tong-quan.webp" },
  { id: "s8", anchor: "tinh-luong", img: A + "tinh-luong-noi-dung.webp", mobile: A + "m-tinh-luong.webp" },
] as const;

export async function HomeFeatures() {
  const t = await getTranslations("day");

  const items: FeatureTabItem[] = ITEMS.map((it) => ({
    ...it,
    time: t(`items.${it.id}.time`),
    title: t(`items.${it.id}.title`),
    desc: t(`items.${it.id}.desc`),
  }));

  return (
    <section className="sg-section">
      <div className="sg-container">
        <SectionHead
          cols="content"
          kicker={t("kicker")}
          title={t("title")}
          lead={t("lead")}
          action={
            <Link href="/tinh-nang" className="btn-secondary px-6 text-[15px]">
              {t("all")}
            </Link>
          }
        />
        <FeatureTabs items={items} moreLabel={t("more")} listLabel={t("title")} />
      </div>
    </section>
  );
}
