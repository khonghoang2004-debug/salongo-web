import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import { ArrowRight, UserPlus, Settings2, CalendarCheck } from "lucide-react";
import { SectionHead } from "./ui/SectionHead";

const steps = [
  { titleKey: "step1Title" as const, descKey: "step1Desc" as const, Icon: UserPlus },
  { titleKey: "step2Title" as const, descKey: "step2Desc" as const, Icon: Settings2 },
  { titleKey: "step3Title" as const, descKey: "step3Desc" as const, Icon: CalendarCheck },
];

// 3 bước bắt đầu: số lớn, đường kẻ nối các bước
export async function HowItWorks() {
  const t = await getTranslations("howItWorks");

  return (
    <section className="sg-section pt-0 sm:pt-0 lg:pt-0">
      <div className="sg-container">
        <div className="rounded-[28px] border border-line p-6 sm:p-10 lg:p-14">
          <SectionHead kicker={t("eyebrow")} title={t("title")} lead={t("subtitle")} />

          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-16">
            {steps.map(({ titleKey, descKey, Icon }, index) => (
              <li key={titleKey} data-reveal className="relative pt-6" style={{ "--d": `${index * 160}ms` } as CSSProperties}>
                <span className="absolute inset-x-0 top-0 h-0.5 bg-line" aria-hidden />
                <span
                  data-reveal="line"
                  className="absolute inset-x-0 top-0 h-0.5 bg-brand-700"
                  style={{ "--d": `${200 + index * 260}ms` } as CSSProperties}
                  aria-hidden
                />
                <div className="flex items-center justify-between">
                  <span className="font-display text-[2.5rem] font-semibold leading-none tracking-[-0.04em] text-brand-700">
                    0{index + 1}
                  </span>
                  <Icon className="size-6 text-ink/40" aria-hidden />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-ink">{t(titleKey)}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{t(descKey)}</p>
              </li>
            ))}
          </ol>

          <div data-reveal className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-muted">{t("closingLine")}</p>
            <a
              href="https://app.salongo.eu/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary sg-arrow shrink-0 px-7 py-3.5 text-base"
            >
              {t("ctaButton")}
              <ArrowRight className="size-[18px]" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
