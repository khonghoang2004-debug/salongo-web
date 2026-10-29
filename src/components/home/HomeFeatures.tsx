import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHead } from "../ui/SectionHead";
import { FeatureTabs, type FeatureTabItem } from "./FeatureTabs";

// Ảnh chụp thật từ app cho từng tính năng (PC + điện thoại)
const A = "/images/app/";
const ITEMS: { id: FeatureTabItem["id"]; anchor: string; img: string; mobile?: string }[] = [
  { id: "booking", anchor: "dat-lich-online", img: A + "dat-lich-khach.webp", mobile: A + "m-dat-lich-gio.webp" },
  { id: "calendar", anchor: "lich-hen", img: A + "lich-hen-nhan-vien-noi-dung.webp", mobile: A + "m-lich-hen.webp" },
  { id: "checkout", anchor: "tinh-tien", img: A + "tinh-tien-noi-dung.webp", mobile: A + "m-tinh-tien.webp" },
  { id: "reports", anchor: "bao-cao", img: A + "tong-quan-30-ngay-noi-dung.webp", mobile: A + "m-tong-quan.webp" },
  { id: "payroll", anchor: "tinh-luong", img: A + "tinh-luong-noi-dung.webp", mobile: A + "m-tinh-luong.webp" },
  { id: "customers", anchor: "khach-hang", img: A + "khach-hang-noi-dung.webp", mobile: A + "m-khach-hang.webp" },
  { id: "services", anchor: "dich-vu", img: A + "dich-vu-noi-dung.webp", mobile: A + "m-dich-vu.webp" },
  { id: "branches", anchor: "da-chi-nhanh", img: A + "tat-ca-salon-noi-dung.webp", mobile: A + "m-tat-ca-salon.webp" },
];

export async function HomeFeatures() {
  const h = await getTranslations("home2");
  const f = await getTranslations("featuresV2.f");

  const items: FeatureTabItem[] = ITEMS.map((it) => ({
    ...it,
    short: f(`${it.id}.short`),
    title: f(`${it.id}.title`),
    desc: f(`${it.id}.desc`),
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
