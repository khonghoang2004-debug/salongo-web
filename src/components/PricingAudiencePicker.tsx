import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import { ArrowDown, Armchair, Store } from "lucide-react";
import { getPlans } from "@/lib/plans";

const fmt = (n: number) => new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 }).format(Math.round(n));

/**
 * Trang Bảng giá: hai lựa chọn rõ ràng ngay dưới tiêu đề (cùng chữ với màn đăng ký trong app), để khách không
 * nhầm gói Bàn với ba gói salon: "Tôi là chủ salon" → 3 gói salon (#pricing), "Tôi thuê bàn, có IČO riêng" →
 * gói Bàn (#goi-ban). Giá lấy từ app.
 */
export async function PricingAudiencePicker() {
  const t = await getTranslations("pricingPage");
  const { plans, desk } = await getPlans();
  const from = plans.length ? Math.min(...plans.map((p) => p.monthly)) : null;

  const cards = [
    {
      href: "#pricing",
      icon: Store,
      tag: t("pickSalonTag"),
      title: t("pickSalon"),
      price: from !== null ? t("pickFrom", { price: fmt(from) }) : null,
      cta: t("pickSalonCta"),
      tone: "brand" as const,
    },
    {
      href: "#goi-ban",
      icon: Armchair,
      tag: t("pickDeskTag"),
      title: t("pickDesk"),
      price: t("pickPrice", { price: fmt(desk.monthly) }),
      cta: t("pickDeskCta"),
      tone: "nude" as const,
    },
  ];

  return (
    <section aria-labelledby="pick-title" className="sg-section !pb-0">
      <div className="sg-container">
        <div className="mx-auto max-w-[1080px]">
          <h2 id="pick-title" className="text-center text-[1.35rem] font-semibold tracking-[-0.01em] text-ink sm:text-2xl">
            {t("pickTitle")}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
            {cards.map(({ href, icon: Icon, tag, title, price, cta, tone }, i) => (
              <a
                key={href}
                href={href}
                data-reveal
                style={{ "--d": `${i * 100}ms` } as CSSProperties}
                className={`group flex flex-col rounded-[24px] border-2 p-5 transition-colors sm:p-7 ${
                  tone === "brand"
                    ? "border-brand-100 bg-white hover:border-brand-700"
                    : "border-transparent bg-nude hover:border-ink/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full ${
                      tone === "brand" ? "bg-brand-50 text-brand-700" : "bg-white text-ink"
                    }`}
                    aria-hidden
                  >
                    <Icon className="size-5" />
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-[12px] font-semibold ${
                      tone === "brand" ? "bg-brand-50 text-brand-700" : "bg-white text-ink"
                    }`}
                  >
                    {tag}
                  </span>
                </div>
                <h3 className="mb-5 mt-5 text-[1.2rem] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[1.35rem]">{title}</h3>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
                  {price && <span className="text-[15px] font-semibold tabular-nums text-ink">{price}</span>}
                  <span className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-[15px] font-semibold text-brand-700">
                    {cta}
                    <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
                  </span>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-muted">{t("pickStaffHint")}</p>
        </div>
      </div>
    </section>
  );
}
