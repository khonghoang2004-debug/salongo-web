import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight, BellRing, Check, Lock } from "lucide-react";

const stats = [
  { value: "stat1Value", label: "stat1Label" },
  { value: "stat2Value", label: "stat2Label" },
  { value: "stat3Value", label: "stat3Label" },
  { value: "stat4Value", label: "stat4Label" },
] as const;

// Hero trang chủ: khối nền lùi vào, chữ bên trái, ảnh app nguyên vẹn bên phải; dải số liệu bên dưới
export async function HomeHero() {
  const t = await getTranslations("hero");
  const h = await getTranslations("home2");

  return (
    <>
      <section className="pt-2 sm:pt-3">
        <div className="sg-panel overflow-hidden">
          <div className="mx-auto grid max-w-[1320px] gap-12 px-5 pb-6 pt-12 sm:px-10 sm:pb-10 sm:pt-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-12 lg:py-20">
            <div className="lg:col-span-6">
              <span className="sg-eyebrow">
                <span className="size-1.5 rounded-full bg-brand-700" aria-hidden />
                {t("badge")}
              </span>
              {/* H1 luôn hiển thị cho SEO */}
              <h1 className="mt-6 font-display text-[2.375rem] font-semibold leading-[1.08] tracking-[-0.035em] text-ink text-balance sm:text-[3.25rem] lg:text-[3.5rem] xl:text-[4rem]">
                {t("titleBefore")} <span className="text-brand-700">{t("titleSalon")}</span>
                {t("titleAfter1").startsWith("-") ? "" : " "}
                {t("titleAfter1")}
                <span className="text-brand-700">{t("heroHighlight2")}</span>
                {t("titleAfter2")}
                <span className="text-brand-700">{t("heroHighlight3")}</span>
                {t("titleAfter3")}
              </h1>
              <p className="sg-lead mt-6 max-w-xl">{t("subtitle")}</p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://app.salongo.eu/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-7 py-4 text-base"
                >
                  {t("cta")}
                  <ArrowUpRight className="size-[18px]" aria-hidden />
                </a>
                <Link href="/tinh-nang" className="btn-secondary px-7 py-4 text-base">
                  {t("ctaSecondary")}
                  <ArrowRight className="size-[18px]" aria-hidden />
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted">{t("trialNote")}</p>
            </div>

            {/* Ảnh app: hiển thị trọn vẹn, không cắt */}
            <div className="relative lg:col-span-6">
              <div className="sg-browser">
                <div className="sg-browser-bar">
                  <span className="sg-browser-dot" />
                  <span className="sg-browser-dot" />
                  <span className="sg-browser-dot" />
                  <span className="mx-auto hidden h-6 w-full max-w-[240px] items-center justify-center gap-1.5 rounded-full border border-line bg-white px-2 text-[11px] text-muted sm:flex">
                    <Lock className="size-3" aria-hidden />
                    app.salongo.eu
                  </span>
                  <span className="hidden w-[42px] sm:block" aria-hidden />
                </div>
                <img
                  src="/images/hero-dashboard.webp"
                  alt={t("imageAlt")}
                  width={2000}
                  height={1150}
                  className="block h-auto w-full"
                  fetchPriority="high"
                />
              </div>

              {/* Thẻ thông báo lịch hẹn mới, nằm dưới ảnh để không che nội dung */}
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-line bg-white p-3.5 sm:absolute sm:-bottom-7 sm:right-6 sm:mt-0 sm:w-[300px] lg:-right-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <BellRing className="size-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{h("notifTitle")}</p>
                  <p className="truncate text-[13px] text-muted">{h("notifText")}</p>
                </div>
                <span className="rounded-full bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white">{h("notifAction")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dải số liệu + cam kết */}
      <section className="px-4 pb-4 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <div className="sg-container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md text-[15px] font-medium text-ink">{h("statsTitle")}</p>
            <ul className="flex flex-col gap-2 text-sm text-muted sm:items-end">
              {(["proof2", "proof3"] as const).map((key) => (
                <li key={key} className="flex items-center gap-2">
                  <Check className="size-4 text-brand-700" strokeWidth={2.5} aria-hidden />
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 border-t border-line lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-line">
            {stats.map(({ value, label }) => (
              <div key={value} className="flex flex-col-reverse border-b border-line py-6 sm:py-8 lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <dt className="mt-2 text-sm text-muted">{t(label)}</dt>
                <dd className="font-display text-[2rem] font-semibold tracking-[-0.04em] text-ink sm:text-[3rem]">{t(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
