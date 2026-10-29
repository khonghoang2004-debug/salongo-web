import { getTranslations } from "next-intl/server";

// Plans differ only in limits; every feature is in every plan. Cols: Basic, Pro, Premium.
// A string is a value key in "pricingPage"; true = included.
type Cell = string | true;
const ROWS: readonly { key: string; cells: readonly [Cell, Cell, Cell] }[] = [
  { key: "compareStaff", cells: ["limitStaff3", "limitStaff8", "limitUnlimited"] },
  { key: "compareBranches", cells: ["limitBranch1", "limitBranch3", "limitUnlimited"] },
  { key: "compareRow1", cells: [true, true, true] },
  { key: "compareRow2", cells: [true, true, true] },
  { key: "compareRow3", cells: [true, true, true] },
  { key: "compareRow4", cells: [true, true, true] },
  { key: "compareRow5", cells: [true, true, true] },
  { key: "compareRow6", cells: [true, true, true] },
];

export async function PricingComparisonTable() {
  const t = await getTranslations("pricingPage");
  const tPricing = await getTranslations("pricing");

  const planNames = [
    tPricing("plan1Name"),
    tPricing("plan2Name"),
    tPricing("plan3Name"),
  ];

  return (
    <section className="sg-section bg-[#FBF7F7]">
      <div className="sg-container">
        <h2 className="sg-h2">{t("compareTitle")}</h2>

        <div data-reveal className="mt-10 overflow-hidden rounded-[20px] border border-line bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-[13px] sm:text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-3 py-4 font-semibold text-muted sm:px-5 sm:py-5">
                    {t("compareFeatureCol")}
                  </th>
                  {planNames.map((name) => (
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
                {ROWS.map((row) => (
                  <tr
                    key={row.key}
                    className="border-b border-line last:border-b-0 hover:bg-[#FBF7F7]"
                  >
                    <td className="px-3 py-3.5 font-medium text-ink/85 sm:px-5 sm:py-4">
                      {t(row.key)}
                    </td>
                    {row.cells.map((val, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-1 py-3.5 text-center sm:px-4 sm:py-4"
                      >
                        {val === true ? (
                          <span className="inline-flex size-5 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700" aria-hidden>✓</span>
                        ) : (
                          <span className="font-semibold text-ink">{t(val)}</span>
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
