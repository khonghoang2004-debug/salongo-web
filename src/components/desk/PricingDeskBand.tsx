import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Check, Minus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getPlans } from "@/lib/plans";
import { DeskPlanCard } from "./DeskPlanCard";

/** Gói Bàn khác 3 gói salon ở đâu: true = có, false = không có. */
const VS_ROWS = [
  { key: "vsCheckout", salon: true, desk: true },
  { key: "vsEet", salon: true, desk: true },
  { key: "vsCalendar", salon: true, desk: false },
  { key: "vsBooking", salon: true, desk: false },
  { key: "vsTeam", salon: true, desk: false },
  { key: "vsMarketing", salon: true, desk: false },
] as const;

function Mark({ on, label }: { on: boolean; label: string }) {
  return on ? (
    <span className="mx-auto flex size-6 items-center justify-center rounded-full bg-brand-50 text-brand-700" aria-label={label}>
      <Check className="size-3.5" strokeWidth={3} aria-hidden />
    </span>
  ) : (
    <span className="mx-auto flex size-6 items-center justify-center text-muted/60" aria-label={label}>
      <Minus className="size-4" aria-hidden />
    </span>
  );
}

// Trang Bảng giá: khu riêng cho gói Bàn (người thuê bàn có IČO riêng), tách hẳn khỏi ba gói salon
export async function PricingDeskBand() {
  const t = await getTranslations("desk");
  const tPage = await getTranslations("pricingPage");
  const { desk } = await getPlans();

  return (
    <section id="goi-ban" className="sg-section scroll-mt-20 !pt-0">
      <div className="sg-container">
        <div className="mx-auto max-w-[1080px] rounded-[28px] bg-nude p-4 sm:p-8 lg:p-10">
          <div className="px-2 text-center sm:px-0">
            <p className="sg-kicker justify-center">
              {desk.live ? t("badgeNew") : t("soon")} · {tPage("deskKicker")}
            </p>
            <h2 className="sg-h2 mt-3">{t("bandTitle")}</h2>
            <p className="sg-lead mx-auto mt-3 max-w-[720px]">{t("bandLead")}</p>
            {!desk.live && <p className="mt-4 text-[15px] leading-relaxed text-muted">{t("soonNote")}</p>}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
            <div data-reveal className="lg:col-span-6">
              <div className="overflow-hidden rounded-[20px] border border-line bg-white">
                <table className="w-full text-left text-sm">
                  <caption className="px-4 pt-4 text-left text-[15px] font-semibold text-ink sm:px-5">{tPage("vsTitle")}</caption>
                  <thead>
                    <tr className="border-b border-line text-[13px] text-muted">
                      <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                        <span className="sr-only">{tPage("compareFeatureCol")}</span>
                      </th>
                      <th scope="col" className="w-[88px] px-2 py-3 text-center font-semibold text-ink sm:w-[110px]">{tPage("vsSalonCol")}</th>
                      <th scope="col" className="w-[88px] px-2 py-3 text-center font-semibold text-brand-700 sm:w-[110px]">{t("name")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VS_ROWS.map((r) => (
                      <tr key={r.key} className="border-b border-line last:border-b-0">
                        <th scope="row" className="px-4 py-3 font-normal text-ink/85 sm:px-5">{tPage(r.key)}</th>
                        <td className="px-2 py-3">
                          <Mark on={r.salon} label={r.salon ? tPage("vsYes") : tPage("vsNo")} />
                        </td>
                        <td className="px-2 py-3">
                          <Mark on={r.desk} label={r.desk ? tPage("vsYes") : tPage("vsNo")} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 px-2 text-sm leading-relaxed text-muted sm:px-0">{tPage("vsNote")}</p>
              <Link href="/goi-ban" className="sg-arrow mt-3 inline-flex min-h-11 items-center gap-1.5 px-2 text-[15px] font-semibold text-brand-700 hover:underline sm:px-0">
                {t("more")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <div data-reveal className="lg:col-span-6" style={{ "--d": "120ms" } as CSSProperties}>
              <DeskPlanCard desk={desk} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
