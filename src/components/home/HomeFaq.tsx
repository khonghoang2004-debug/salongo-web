import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export const HOME_FAQ_KEYS = [1, 2, 3, 4, 5, 6] as const;

// Câu hỏi ngắn ở trang chủ: câu trả lời có sẵn trong HTML (<details>), dùng cho cả JSON-LD FAQPage (AEO / GEO)
export async function HomeFaq() {
  const t = await getTranslations("homeFaq");

  return (
    <section className="sg-section bg-nude" aria-labelledby="home-faq-title">
      <div data-reveal className="sg-container grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 id="home-faq-title" className="sg-h2">
            {t("title")}
          </h2>
          <Link href="/faq" className="sg-arrow mt-5 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-brand-700 hover:underline">
            {t("more")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="border-t border-line lg:col-span-8">
          {HOME_FAQ_KEYS.map((i) => (
            <details key={i} className="group border-b border-line" open={i === 1}>
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-semibold text-ink transition-colors hover:text-brand-700 sm:text-lg [&::-webkit-details-marker]:hidden">
                <h3 className="m-0 text-[inherit] font-[inherit]" style={{ fontFamily: "inherit" }}>
                  {t(`q${i}`)}
                </h3>
                <span
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-transform group-open:rotate-45 group-open:border-brand-700 group-open:bg-brand-700 group-open:text-white"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-muted sm:text-base">{t(`a${i}`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
