import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { FEATURE_ICONS, type FeatureId } from "../featuresData";

type Tile = { id: FeatureId; anchor: string; img: string; span: string; tall?: boolean; zoom?: string };

// Lưới tính năng (bento): mỗi ô có ảnh chụp thật từ app
const TILES: Tile[] = [
  { id: "booking", anchor: "dat-lich-online", img: "/images/dat-lich-khach.webp", span: "lg:col-span-4", tall: true, zoom: "w-[150%] sm:w-[115%] lg:w-[105%]" },
  { id: "calendar", anchor: "lich-hen", img: "/images/lich-hen-nhan-vien.webp", span: "lg:col-span-2", tall: true },
  { id: "checkout", anchor: "tinh-tien", img: "/images/tinh-tien.webp", span: "lg:col-span-2" },
  { id: "reports", anchor: "bao-cao", img: "/images/tong-quan.webp", span: "lg:col-span-2" },
  { id: "payroll", anchor: "tinh-luong", img: "/images/tinh-luong.webp", span: "lg:col-span-2" },
  { id: "customers", anchor: "khach-hang", img: "/images/khach-hang.webp", span: "lg:col-span-3" },
  { id: "services", anchor: "dich-vu", img: "/images/dich-vu.webp", span: "lg:col-span-3" },
];

export async function HomeBento() {
  const h = await getTranslations("home2");
  const f = await getTranslations("featuresV2.f");

  return (
    <section className="sg-section sg-section-tint">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="sg-kicker">{h("bentoEyebrow")}</p>
            <h2 className="sg-h2 mt-4">{h("bentoTitle")}</h2>
            <p className="sg-lead mt-4">{h("bentoLead")}</p>
          </div>
          <Link href="/tinh-nang" className="btn-secondary shrink-0 px-5 py-3 text-sm">
            {h("bentoAll")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-6 lg:gap-5">
          {TILES.map(({ id, anchor, img, span, tall, zoom }) => {
            const Icon = FEATURE_ICONS[id];
            return (
              <Link
                key={id}
                href={`/tinh-nang#${anchor}`}
                className={`sg-card sg-card-hover group flex flex-col overflow-hidden ${span} ${id === "booking" ? "sm:col-span-2" : ""}`}
              >
                <div className="p-6 sm:p-7">
                  <span className="sg-icon-tile size-10 rounded-xl">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold tracking-[-0.01em] text-ink">{f(`${id}.title`)}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{f(`${id}.desc`)}</p>
                </div>
                <div className={`relative mt-auto ml-6 overflow-hidden rounded-tl-xl border-l border-t border-line bg-sand sm:ml-7 ${tall ? "h-56 sm:h-64 lg:h-72" : "h-48 sm:h-52"}`}>
                  <img
                    src={img}
                    alt=""
                    loading="lazy"
                    className={`absolute left-0 top-0 max-w-none origin-top-left transition-transform duration-500 group-hover:scale-[1.02] ${zoom ?? "w-[200%] sm:w-[160%] lg:w-[170%]"}`}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
