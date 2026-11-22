import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Check } from "lucide-react";
import { daysUntilEet } from "@/lib/eet";
import { Receipt } from "./Receipt";

/** EET 2.0: khối mận đậm duy nhất giữa trang, hoá đơn in nhiệt là hình chính. */
export async function EetBand() {
  const t = await getTranslations("landing.eet");
  const days = daysUntilEet();
  return (
    <section className="x-section bg-white" aria-labelledby="eet-title">
      <div className="x-wrap">
        <div className="x-panel grid overflow-hidden bg-brand-800 text-white lg:grid-cols-12">
          <div className="p-7 sm:p-10 lg:col-span-7 lg:p-14">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[14px] tabular-nums text-white/85">
              <span className="size-1.5 rounded-full bg-[#9BD3B4]" aria-hidden />
              {days > 0 ? t("countdown", { n: days }) : t("live")}
            </p>
            <h2 id="eet-title" className="x-h2 mt-6">{t("title")}</h2>
            <p className="mt-5 max-w-[34rem] text-[1.0625rem] leading-relaxed text-white/75">{t("lead")}</p>
            <ul className="mt-8 space-y-3">
              {(["p1", "p2", "p3"] as const).map((k) => (
                <li key={k} className="flex gap-3 text-[15.5px] leading-relaxed text-white/90">
                  <Check className="mt-1 size-4 shrink-0 text-[#9BD3B4]" aria-hidden />
                  {t(k)}
                </li>
              ))}
            </ul>
            <Link href="/eet-2-0" className="x-btn-ghostDark mt-7">{t("cta")}</Link>
          </div>
          <div className="relative flex min-h-[420px] items-start justify-center overflow-hidden bg-brand-900/40 pt-12 lg:col-span-5 lg:min-h-0">
            <Receipt className="rotate-[-2deg]" />
          </div>
        </div>
      </div>
    </section>
  );
}
