import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Check } from "lucide-react";

export async function HomePricingTeaser() {
  const h = await getTranslations("home2");

  return (
    <section className="sg-section bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-[28px] bg-brand-50 p-7 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:p-14">
        <div>
          <p className="sg-kicker">{h("priceEyebrow")}</p>
          <h2 className="sg-h2 mt-4">{h("priceTitle")}</h2>
          <p className="sg-lead mt-4">{h("priceLead")}</p>
        </div>
        <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sg-sm sm:p-7">
          <ul className="space-y-3.5">
            {(["price1", "price2", "price3"] as const).map((k) => (
              <li key={k} className="flex items-center gap-3 text-[15px] font-medium text-ink/85">
                <Check className="size-5 shrink-0 text-brand-700" strokeWidth={2.5} aria-hidden />
                {h(k)}
              </li>
            ))}
          </ul>
          <Link href="/bang-gia" className="btn-primary mt-7 w-full px-6 py-3.5 text-base">
            {h("priceCta")}
            <ArrowRight className="size-[18px]" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
