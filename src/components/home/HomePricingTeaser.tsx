import type { CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { RENEW_URL } from "@/lib/app-links";
import { DownloadCard } from "../DownloadSection";

// Giá + tải app: hai khối cạnh nhau
export async function HomePricingTeaser() {
  const h = await getTranslations("home2");

  return (
    <section className="sg-section pt-0 sm:pt-0 lg:pt-0">
      <div className="sg-container grid gap-4 lg:grid-cols-12 lg:gap-5">
        <div data-reveal className="flex flex-col rounded-[28px] bg-brand-50 p-5 sm:p-8 lg:p-10 lg:col-span-7 lg:p-12">
          <p className="sg-kicker">{h("priceEyebrow")}</p>
          <h2 className="sg-h2 mt-4">{h("priceTitle")}</h2>
          <p className="sg-lead mt-4">{h("priceLead")}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {(["price1", "price2", "price3"] as const).map((k) => (
              <li key={k} className="flex items-start gap-2.5 text-[15px] font-medium leading-snug text-ink/85">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-700" strokeWidth={3} aria-hidden />
                {h(k)}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row sm:items-center">
            <Link href="/bang-gia" className="btn-primary sg-arrow w-full px-7 py-4 text-base sm:w-auto">
              {h("priceCta")}
              <ArrowRight className="size-[18px]" aria-hidden />
            </Link>
            <a
              href={RENEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sg-arrow sg-arrow-up inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-4 text-[15px] font-semibold text-brand-700 hover:text-brand-800"
            >
              {h("priceRenew")}
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
        <div data-reveal className="lg:col-span-5" style={{ "--d": "150ms" } as CSSProperties}>
          <DownloadCard />
        </div>
      </div>
    </section>
  );
}
