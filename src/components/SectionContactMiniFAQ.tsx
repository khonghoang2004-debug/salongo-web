"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

const FAQ_KEYS = [1, 2, 3] as const;

export function SectionContactMiniFAQ() {
  const t = useTranslations("contact");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-neutral-100 bg-white px-4 pt-6 pb-8 sm:px-6 sm:pt-8 sm:pb-10 lg:px-8 lg:pt-10 lg:pb-12">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center text-xl font-bold tracking-tight text-[#1F2937] sm:text-2xl">
          {t("faqTitle")}
        </h2>
        <div className="mt-6 space-y-3">
          {FAQ_KEYS.map((i) => {
            const isOpen = openIndex === i - 1;
            return (
              <div
                key={i}
                className="rounded-2xl border border-neutral-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i - 1)}
                  className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold transition-colors ${
                    isOpen
                      ? "bg-gradient-to-r from-pink-50/80 to-violet-50/60 text-[#1F2937]"
                      : "bg-white text-[#1F2937] hover:bg-neutral-50/50"
                  }`}
                >
                  <span>{t(`faqQ${i}`)}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-[#EC4899] transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t-2 border-pink-100/60 bg-gradient-to-br from-white to-neutral-50/40 px-5 pb-4 pt-3 text-sm text-[#374151] leading-relaxed">
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
