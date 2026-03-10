"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function PricingToggle() {
  const t = useTranslations("pricingPage");
  const [yearly, setYearly] = useState(false);

  return (
    <div className="flex justify-center">
      <div
        className="inline-flex rounded-full border border-neutral-200 bg-white p-1 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
        role="tablist"
        aria-label="Billing period"
      >
        <button
          type="button"
          role="tab"
          aria-selected={!yearly}
          onClick={() => setYearly(false)}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
            !yearly
              ? "bg-[linear-gradient(135deg,#EC4899,#A855F7)] text-white shadow-md"
              : "text-[#6B7280] hover:text-[#1F2937]"
          }`}
        >
          {t("toggleMonth")}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={yearly}
          onClick={() => setYearly(true)}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
            yearly
              ? "bg-[linear-gradient(135deg,#EC4899,#A855F7)] text-white shadow-md"
              : "text-[#6B7280] hover:text-[#1F2937]"
          }`}
        >
          {t("toggleYear")}
        </button>
      </div>
    </div>
  );
}
