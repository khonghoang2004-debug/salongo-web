import { getTranslations } from "next-intl/server";

// Rows: 6 features. Cols: Basic, Pro, Premium, Enterprise. 1 = yes, 0 = no
const MATRIX: readonly (readonly number[])[] = [
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [0, 1, 1, 1],
  [0, 1, 1, 1],
  [0, 1, 1, 1],
  [0, 0, 1, 1],
];

const ROW_KEYS = [
  "compareRow1",
  "compareRow2",
  "compareRow3",
  "compareRow4",
  "compareRow5",
  "compareRow8",
] as const;

export async function PricingComparisonTable() {
  const t = await getTranslations("pricingPage");
  const tPricing = await getTranslations("pricing");

  const planNames = [
    tPricing("plan1Name"),
    tPricing("plan2Name"),
    tPricing("plan3Name"),
    tPricing("plan4Name"),
  ];

  return (
    <section className="border-t border-neutral-100 bg-neutral-50/40 px-4 pt-6 pb-8 sm:px-6 sm:pt-8 sm:pb-10 lg:px-8 lg:pt-10 lg:pb-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl">
          {t("compareTitle")}
        </h2>

        <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/80">
                  <th className="px-5 py-4 font-semibold text-[#374151]">
                    {t("compareFeatureCol")}
                  </th>
                  {planNames.map((name, i) => (
                    <th
                      key={name}
                      className="px-4 py-4 text-center font-semibold text-[#1F2937]"
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROW_KEYS.map((rowKey, rowIndex) => (
                  <tr
                    key={rowKey}
                    className="border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/50"
                  >
                    <td className="px-5 py-3.5 font-medium text-[#374151]">
                      {t(rowKey)}
                    </td>
                    {MATRIX[rowIndex].map((val, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-4 py-3.5 text-center"
                      >
                        {val ? (
                          <span className="text-emerald-600" aria-hidden>✓</span>
                        ) : (
                          <span className="text-neutral-300" aria-hidden>✗</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
