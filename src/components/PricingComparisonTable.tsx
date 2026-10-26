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
    <section className="sg-section sg-section-alt">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center sg-h2">
          {t("compareTitle")}
        </h2>

        <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white shadow-sg-lg">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-sand">
                  <th className="px-5 py-4 font-semibold text-ink/80">
                    {t("compareFeatureCol")}
                  </th>
                  {planNames.map((name, i) => (
                    <th
                      key={name}
                      className="px-4 py-4 text-center font-semibold text-ink"
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
                    className="border-b border-line last:border-b-0 hover:bg-sand"
                  >
                    <td className="px-5 py-3.5 font-medium text-ink/80">
                      {t(rowKey)}
                    </td>
                    {MATRIX[rowIndex].map((val, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-4 py-3.5 text-center"
                      >
                        {val ? (
                          <span className="inline-flex size-5 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700" aria-hidden>✓</span>
                        ) : (
                          <span className="text-[#cfc6c8]" aria-hidden>✗</span>
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
