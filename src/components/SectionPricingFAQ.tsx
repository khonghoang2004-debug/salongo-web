"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

const FAQ_KEYS = [1, 2, 3, 4, 7, 8] as const;

export function SectionPricingFAQ() {
  const t = useTranslations("pricingPage");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-neutral-100 bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl">
          {t("faqSectionTitle")}
        </h2>

        <div className="mt-10 space-y-3">
          {FAQ_KEYS.map((i, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={i}
                className="rounded-2xl border border-neutral-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-[#1F2937]"
                >
                  <span>{t(`faqQ${i}`)}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-[#6B7280] transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-neutral-100 px-6 pb-5 pt-2 text-[#6B7280] leading-relaxed">
                    {t(`faqA${i}`)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
