"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Minus, Plus } from "lucide-react";
import { PRICING_FAQ_KEYS } from "@/lib/pricing-faq";



export function SectionPricingFAQ() {
  const t = useTranslations("pricingPage");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="sg-section bg-nude">
      <div data-reveal className="sg-container grid gap-8 lg:grid-cols-12 lg:gap-12">
        <h2 className="sg-h2 lg:col-span-4">{t("faqSectionTitle")}</h2>
        <div className="border-t border-line lg:col-span-8">
          {PRICING_FAQ_KEYS.map((i, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={i} className="border-b border-line">
                {/* Câu hỏi là H3; câu trả lời luôn có trong HTML từ server, chỉ ẩn khi đóng */}
                <h3 className="m-0" style={{ fontFamily: "inherit" }}>
                <button
                  type="button"
                  id={`pricing-faq-q${i}`}
                  aria-controls={`pricing-faq-a${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold text-ink transition-colors hover:text-brand-700 sm:py-6 sm:text-lg"
                >
                  <span>{t(`faqQ${i}`)}</span>
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen ? "border-brand-700 bg-brand-700 text-white" : "border-line text-ink"
                    }`}
                    aria-hidden
                  >
                    {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </button>
                </h3>
                <p id={`pricing-faq-a${i}`} hidden={!isOpen} className="max-w-2xl pb-6 text-[15px] leading-relaxed text-muted sm:text-base">{t(`faqA${i}`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
