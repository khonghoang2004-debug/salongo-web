import { getTranslations } from "next-intl/server";
import { ArrowUpRight, CreditCard, LogIn, MousePointerClick, Store } from "lucide-react";
import { renewUrl } from "@/lib/app-links";
import { DemoNote, PhoneShot } from "./ui/AppShot";

const STEPS = [
  { i: 1, Icon: MousePointerClick },
  { i: 2, Icon: LogIn },
  { i: 3, Icon: Store },
  { i: 4, Icon: CreditCard },
] as const;

// "Gia hạn gói": nút trên website mở thẳng màn Nâng cấp gói của salon trong app (app.salongo.eu/renew)
export async function SectionRenew() {
  const t = await getTranslations("renew");

  return (
    <section id="gia-han" className="sg-section scroll-mt-24">
      <div className="sg-container grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div data-reveal className="lg:col-span-5">
          <p className="sg-kicker">{t("eyebrow")}</p>
          <h2 className="sg-h2 mt-4">{t("title")}</h2>
          <p className="sg-lead mt-5">{t("lead")}</p>
          <ol className="mt-8 space-y-5">
            {STEPS.map(({ i, Icon }) => (
              <li key={i} className="flex gap-4">
                <span className="sg-icon-tile size-10 shrink-0 rounded-xl" aria-hidden>
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{t(`step${i}Title`)}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{t(`step${i}Text`)}</p>
                </div>
              </li>
            ))}
          </ol>
          <a href={renewUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary sg-arrow sg-arrow-up mt-9 w-full px-7 py-4 text-base sm:w-auto">
            {t("cta")}
            <ArrowUpRight className="size-[18px]" aria-hidden />
          </a>
          <p className="mt-4 text-sm text-muted">{t("note")}</p>
        </div>

        <div data-reveal="scale" className="lg:col-span-7">
          <div className="sg-browser max-sm:hidden">
            <div className="sg-browser-bar">
              <span className="sg-browser-dot" />
              <span className="sg-browser-dot" />
              <span className="sg-browser-dot" />
              <span className="ml-2 truncate text-xs font-medium text-muted">app.salongo.eu · {t("shotLabel")}</span>
            </div>
            <img src="/images/app/nang-cap-goi-noi-dung.webp" alt={t("shotLabel")} width={1600} height={1165} loading="lazy" className="block h-auto w-full" />
          </div>
          <PhoneShot src="/images/app/m-nang-cap-goi.webp" alt={t("shotLabel")} className="mx-auto max-w-[280px] sm:hidden" />
          <DemoNote text={t("demoNote")} className="mt-3 justify-center lg:justify-end" />
        </div>
      </div>
    </section>
  );
}
