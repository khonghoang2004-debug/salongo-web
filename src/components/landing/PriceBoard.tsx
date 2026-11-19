import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getPlans, maxYearlyDiscount } from "@/lib/plans";

const NAMES = { BASIC: "Basic", PRO: "Pro", PREMIUM: "Premium" } as const;

/**
 * Bảng giá kiểu bảng giá dịch vụ treo ở tiệm: tên gói, giới hạn, đường chấm, giá. Giá lấy từ app (GET /api/public/plans),
 * cập nhật trong khoảng 1 phút khi app đổi giá.
 */
export async function PriceBoard() {
  const t = await getTranslations("landing.pricing");
  const locale = await getLocale();
  const p = await getPlans();
  const tag = { vi: "vi-VN", cs: "cs-CZ", en: "en-GB", de: "de-DE" }[locale] ?? "cs-CZ";
  const num = (n: number) => new Intl.NumberFormat(tag, { maximumFractionDigits: 0 }).format(n);
  const discount = maxYearlyDiscount(p);

  const rows = [
    ...p.plans.map((pl) => ({
      key: pl.code,
      name: NAMES[pl.code],
      line: [pl.staff === null ? t("staffAll") : t("staff", { n: pl.staff }), pl.branches === null ? t("branchesAll") : t("branches", { n: pl.branches })].join(", "),
      price: pl.monthly,
      list: pl.listMonthly,
      hot: pl.highlighted,
    })),
    { key: "DESK", name: t("desk"), line: t("deskLine"), price: p.desk.monthly, list: p.desk.listMonthly, hot: false },
  ];

  return (
    <section className="x-section bg-porcelain" aria-labelledby="price-title">
      <div className="x-wrap grid gap-12 lg:grid-cols-12 [&>*]:min-w-0">
        <div className="lg:col-span-5">
          <h2 id="price-title" className="x-h2 text-ink">{t("title")}</h2>
          <p className="x-lead mt-5 max-w-[28rem]">{t("lead")}</p>
          <p className="mt-6 text-[15px] text-ink/80">{t("trial")}</p>
          {discount !== null && <p className="mt-1 text-[15px] text-ink/80">{t("yearly", { discount: num(discount) })}</p>}
          <Link href="/bang-gia" className="x-btn-dark mt-9">
            {t("all")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="lg:col-span-7">
          <ul className="x-panel bg-white px-6 py-2 ring-1 ring-black/[0.05] sm:px-9">
            {rows.map((r) => (
              <li key={r.key} className="border-b border-line py-6 last:border-0">
                <div className="flex items-baseline gap-3">
                  <span className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">{r.name}</span>
                  {r.hot && <span className="rounded-full bg-blush px-2.5 py-0.5 text-[12.5px] font-medium text-brand-800">{t("popular")}</span>}
                  <span className="mx-1 hidden flex-1 translate-y-[-4px] border-b-2 border-dotted border-ink/15 sm:block" aria-hidden />
                  <span className="ml-auto whitespace-nowrap text-right sm:ml-0">
                    {r.list !== null && r.list > r.price && <s className="mr-2 text-[15px] tabular-nums text-muted">{num(r.list)}</s>}
                    <span className="text-[1.6rem] font-semibold tabular-nums tracking-[-0.03em] text-ink">{num(r.price)}</span>
                    <span className="ml-1 text-[14px] text-muted">{t("month")}</span>
                  </span>
                </div>
                <p className="mt-1 text-[14.5px] text-muted">{r.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
