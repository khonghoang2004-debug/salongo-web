import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getPlans } from "@/lib/plans";
import { DeskPlanCard } from "./DeskPlanCard";

// Trang Bảng giá: gói Bàn cho người thuê bàn có IČO riêng, tách khỏi ba gói salon (không có lịch hẹn)
export async function PricingDeskBand() {
  const t = await getTranslations("desk");
  const { desk } = await getPlans();

  return (
    <section id="goi-ban" className="sg-section !pt-0">
      <div className="sg-container">
        <div className="mx-auto grid max-w-[1080px] gap-6 rounded-[28px] bg-nude p-4 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-10 lg:p-10">
          <div data-reveal className="px-2 sm:px-0 lg:col-span-6">
            <p className="sg-kicker">
              {desk.live ? t("badgeNew") : t("soon")} · {t("audience")}
            </p>
            <h2 className="sg-h2 mt-4">{t("bandTitle")}</h2>
            <p className="sg-lead mt-4">{t("bandLead")}</p>
            {!desk.live && <p className="mt-4 text-[15px] leading-relaxed text-muted">{t("soonNote")}</p>}
            <Link href="/goi-ban" className="sg-arrow mt-6 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-brand-700 hover:underline">
              {t("more")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div data-reveal className="lg:col-span-6" style={{ "--d": "120ms" } as CSSProperties}>
            <DeskPlanCard desk={desk} />
          </div>
        </div>
      </div>
    </section>
  );
}
