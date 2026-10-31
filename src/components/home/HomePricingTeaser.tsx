import type { CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { RENEW_URL } from "@/lib/app-links";
import { DownloadCard } from "../DownloadSection";

// Giá + tải app: hai thẻ bằng nhau, cùng bố cục (nhãn, tiêu đề, mô tả, nội dung, nút ở đáy)
export async function HomePricingTeaser() {
  const h = await getTranslations("home2");

  return (
    <section className="sg-section pt-0 sm:pt-0 lg:pt-0">
      <div className="sg-container grid gap-4 lg:grid-cols-2 lg:gap-5">
        <div data-reveal className="flex flex-col rounded-[28px] bg-brand-700 p-6 text-white sm:p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">{h("priceEyebrow")}</p>
          <h2 className="mt-4 font-display text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.125rem]">
            {h("priceTitle")}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/80">{h("priceLead")}</p>
          <ul className="mt-6 space-y-3 border-t border-white/15 pt-6">
            {(["price1", "price2", "price3"] as const).map((k) => (
              <li key={k} className="flex items-center gap-3 text-[15px] font-medium text-white">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/15" aria-hidden>
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {h(k)}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-2 pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
            <Link
              href="/bang-gia"
              className="sg-arrow inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              {h("priceCta")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href={RENEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sg-arrow sg-arrow-up inline-flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap px-2 text-[15px] font-semibold text-white/90 hover:text-white"
            >
              {h("priceRenew")}
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
        <div data-reveal style={{ "--d": "150ms" } as CSSProperties}>
          <DownloadCard />
        </div>
      </div>
    </section>
  );
}
