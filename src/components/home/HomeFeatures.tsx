import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHead } from "../ui/SectionHead";
import { FeatureTabs, type FeatureTabItem } from "./FeatureTabs";
import { BranchesVisual } from "../BranchesVisual";

// Ảnh chụp thật từ app cho từng tính năng
const ITEMS: { id: FeatureTabItem["id"]; anchor: string; img?: string }[] = [
  { id: "booking", anchor: "dat-lich-online", img: "/images/dat-lich-khach.webp" },
  { id: "calendar", anchor: "lich-hen", img: "/images/lich-hen-nhan-vien.webp" },
  { id: "checkout", anchor: "tinh-tien", img: "/images/tinh-tien.webp" },
  { id: "reports", anchor: "bao-cao", img: "/images/tong-quan.webp" },
  { id: "payroll", anchor: "tinh-luong", img: "/images/tinh-luong.webp" },
  { id: "customers", anchor: "khach-hang", img: "/images/khach-hang.webp" },
  { id: "services", anchor: "dich-vu", img: "/images/dich-vu.webp" },
  // Đa chi nhánh không có ảnh chụp, dùng minh hoạ vẽ bằng giao diện
  { id: "branches", anchor: "da-chi-nhanh" },
];

export async function HomeFeatures() {
  const h = await getTranslations("home2");
  const f = await getTranslations("featuresV2.f");

  const items: FeatureTabItem[] = ITEMS.map((it) => ({
    ...it,
    short: f(`${it.id}.short`),
    title: f(`${it.id}.title`),
    desc: f(`${it.id}.desc`),
    visual: it.img ? undefined : <BranchesVisual compact />,
  }));

  return (
    <section className="sg-section">
      <div className="sg-container">
        <SectionHead
          kicker={h("bentoEyebrow")}
          title={h("bentoTitle")}
          lead={h("bentoLead")}
          action={
            <Link href="/tinh-nang" className="btn-secondary px-6 py-3 text-sm">
              {h("bentoAll")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        />
        <FeatureTabs items={items} moreLabel={h("featureMore")} />
      </div>
    </section>
  );
}
