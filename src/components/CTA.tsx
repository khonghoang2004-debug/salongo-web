import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type CtaBandProps = {
  title: string;
  subtitle?: string;
  button: string;
  secondaryLabel?: string;
};

// Dải kêu gọi hành động nền đỏ đô đặc, dùng chung cho mọi trang
export function CtaBand({ title, subtitle, button, secondaryLabel }: CtaBandProps) {
  return (
    <section className="sg-section bg-white">
      <div className="sg-dark relative mx-auto max-w-6xl overflow-hidden rounded-[28px] px-6 py-12 text-center shadow-sg-xl sm:rounded-[32px] sm:px-10 sm:py-16 lg:py-20">
        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-display text-[1.875rem] font-bold leading-[1.15] tracking-[-0.025em] text-balance sm:text-[2.25rem] lg:text-[3rem]">
            {title}
          </h2>
          {subtitle && <p className="mx-auto mt-5 max-w-xl text-base text-white/75 sm:text-lg">{subtitle}</p>}
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href="https://app.salongo.eu/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-on-gradient px-7 py-3.5 text-base"
            >
              {button}
              <ArrowRight className="size-[18px]" aria-hidden />
            </a>
            {secondaryLabel && (
              <Link
                href="/lien-he"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export async function CTA() {
  const t = await getTranslations("cta");
  const tNav = await getTranslations("nav");
  return <CtaBand title={t("title")} subtitle={t("subtitle")} button={t("button")} secondaryLabel={tNav("contact")} />;
}
