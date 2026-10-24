"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function PricingToggle() {
  const t = useTranslations("pricingPage");
  const [yearly, setYearly] = useState(false);

  return (
    <div className="flex justify-center">
      <div
        className="inline-flex rounded-full border border-neutral-200 bg-white p-1 shadow-sg-md"
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
              ? "sg-gradient text-white shadow-sg-md [text-shadow:var(--sg-on-gradient-shadow)]"
              : "text-muted hover:text-ink"
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
              ? "sg-gradient text-white shadow-sg-md [text-shadow:var(--sg-on-gradient-shadow)]"
              : "text-muted hover:text-ink"
          }`}
        >
          {t("toggleYear")}
        </button>
      </div>
    </div>
  );
}
