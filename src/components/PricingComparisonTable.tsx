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
    <section className="sg-section bg-[#FBF7F7]">
      <div className="sg-container">
        <h2 className="sg-h2">{t("compareTitle")}</h2>

        <div className="mt-10 overflow-hidden rounded-[20px] border border-line bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-[13px] sm:text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-3 py-4 font-semibold text-muted sm:px-5 sm:py-5">
                    {t("compareFeatureCol")}
                  </th>
                  {planNames.map((name, i) => (
                    <th
                      key={name}
                      className="px-1 py-4 text-center font-semibold text-ink sm:px-4 sm:py-5"
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
                    className="border-b border-line last:border-b-0 hover:bg-[#FBF7F7]"
                  >
                    <td className="px-3 py-3.5 font-medium text-ink/85 sm:px-5 sm:py-4">
                      {t(rowKey)}
                    </td>
                    {MATRIX[rowIndex].map((val, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-1 py-3.5 text-center sm:px-4 sm:py-4"
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
