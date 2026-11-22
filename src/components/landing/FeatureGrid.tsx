import { getTranslations } from "next-intl/server";
import { ArrowRight, CalendarDays, Globe, Layers, MonitorSmartphone, Receipt, Users, Wallet, PiggyBank } from "lucide-react";
import { Link } from "@/i18n/navigation";

/**
 * Home: one short feature grid (owner 2026-11-22: "Một ngày ở tiệm" + long texts were too long to read).
 * Eight tiles, title only (owner 2026-11-22: no small descriptions); details live on /tinh-nang.
 */
const ITEMS = [
  { key: "online", icon: Globe, tone: "bg-sky-50 text-sky-700" },
  { key: "calendar", icon: CalendarDays, tone: "bg-violet-50 text-violet-700" },
  { key: "checkout", icon: Receipt, tone: "bg-[#F8EEF1] text-brand-700" },
  { key: "thuchi", icon: PiggyBank, tone: "bg-emerald-50 text-emerald-700" },
  { key: "payroll", icon: Wallet, tone: "bg-amber-50 text-amber-700" },
  { key: "customers", icon: Users, tone: "bg-rose-50 text-rose-700" },
  { key: "branches", icon: Layers, tone: "bg-indigo-50 text-indigo-700" },
  { key: "devices", icon: MonitorSmartphone, tone: "bg-teal-50 text-teal-700" },
] as const;

export async function FeatureGrid() {
  const t = await getTranslations("landing.features");
  return (
    <section className="x-section bg-white" aria-labelledby="features-title">
      <div className="x-wrap">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="features-title" className="x-h2 max-w-[40rem] text-ink">{t("title")}</h2>
          <Link href="/tinh-nang" className="x-link shrink-0">
            {t("all")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {ITEMS.map(({ key, icon: Icon, tone }) => (
            <li key={key} className="rounded-2xl bg-porcelain/60 p-4 ring-1 ring-black/[0.05] sm:p-5">
              <span className={`grid size-10 place-items-center rounded-xl ${tone}`}>
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-3 text-[15.5px] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[1.0625rem]">{t(`${key}.title`)}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
