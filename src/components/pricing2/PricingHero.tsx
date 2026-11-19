import { getLocale, getTranslations } from "next-intl/server";
import { ArrowDown, ArrowRight } from "lucide-react";
import { renewLink } from "@/lib/app-links";

/** Đầu trang Bảng giá: H1, hai lối vào theo người đọc (chủ salon / thợ thuê bàn) và lối Gia hạn cho khách đang dùng. */
export async function PricingHero() {
  const t = await getTranslations("pricing2.hero");
  const locale = await getLocale();
  const jumps = [
    { href: "#salon", label: t("salon"), price: t("salonPrice") },
    { href: "#goi-ban", label: t("desk"), price: t("deskPrice") },
  ];
  return (
    <section className="bg-white pb-16 pt-10 sm:pt-14 lg:pb-20 lg:pt-20" aria-labelledby="pricing-title">
      <div className="x-wrap grid gap-12 lg:grid-cols-12 lg:gap-8 [&>*]:min-w-0">
        <div className="lg:col-span-7">
          <h1 id="pricing-title" className="x-display text-ink">{t("title")}</h1>
          <p className="x-lead mt-6 max-w-[32rem]">{t("lead")}</p>
          <nav aria-label={t("jump")} className="mt-10 max-w-[36rem]">
            <ul className="border-t border-line">
              {jumps.map((j) => (
                <li key={j.href} className="border-b border-line">
                  <a href={j.href} className="group flex min-h-[64px] items-center gap-4 py-4 text-ink">
                    <span className="text-[1.0625rem] font-medium tracking-[-0.01em] sm:text-[1.15rem]">{j.label}</span>
                    <span className="ml-auto shrink-0 whitespace-nowrap text-[15px] tabular-nums text-muted">{j.price}</span>
                    <ArrowDown className="size-4 shrink-0 text-ink/40 transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-brand-700 motion-reduce:transition-none" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="mt-5 max-w-[36rem] text-[14.5px] leading-relaxed text-muted">{t("staffHint")}</p>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9 lg:self-end" aria-label={t("renewTitle")}>
          <div className="border-t-2 border-ink pt-6">
            <p className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">{t("renewTitle")}</p>
            <p className="x-body mt-2 max-w-[22rem]">{t("renewLead")}</p>
            <a href={renewLink(locale)} className="x-btn-dark mt-6">
              {t("renewCta")}
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
