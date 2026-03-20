"use client";

import dynamic from "next/dynamic";

const SectionPricingFAQ = dynamic(
  () => import("@/components/SectionPricingFAQ").then((m) => ({ default: m.SectionPricingFAQ })),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center py-8">
        <div className="h-8 w-48 animate-pulse rounded bg-neutral-100" />
      </div>
    ),
  }
);

export { SectionPricingFAQ };
