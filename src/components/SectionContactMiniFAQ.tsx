"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

const FAQ_KEYS = [1, 2, 3] as const;

export function SectionContactMiniFAQ() {
  const t = useTranslations("contact");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="sg-section bg-white">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center sg-h2-sm">
          {t("faqTitle")}
        </h2>
        <div className="mt-6 space-y-3">
          {FAQ_KEYS.map((i) => {
            const isOpen = openIndex === i - 1;
            return (
              <div
                key={i}
                className="rounded-2xl border border-line bg-white shadow-sg-md transition-shadow hover:shadow-sg-md"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i - 1)}
                  className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold transition-colors ${
                    isOpen
                      ? "bg-gradient-to-r from-brand-50/80 to-brand-50/60 text-ink"
                      : "bg-white text-ink hover:bg-sand"
                  }`}
                >
                  <span>{t(`faqQ${i}`)}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-accent-strong transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t-2 border-brand-100/60 bg-gradient-to-br from-white to-neutral-50/40 px-5 pb-4 pt-3 text-sm text-ink/80 leading-relaxed">
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
