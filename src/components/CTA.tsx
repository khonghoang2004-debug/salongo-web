import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type CtaBandProps = {
  title: string;
  subtitle?: string;
  button: string;
  secondaryLabel?: string;
};

// Dải kêu gọi hành động: khối đỏ đô đặc, chữ bên trái, nút bên phải (PC)
export function CtaBand({ title, subtitle, button, secondaryLabel }: CtaBandProps) {
  return (
    <section className="py-2 sm:py-3">
      <div className="sg-dark mx-2 rounded-[24px] px-6 py-14 sm:mx-3 sm:rounded-[32px] sm:px-10 sm:py-20 lg:mx-4 lg:px-12 lg:py-24">
        <div className="sg-container grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="max-w-3xl font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-balance sm:text-[2.75rem] lg:text-[3.5rem]">
              {title}
            </h2>
            {subtitle && <p className="mt-5 max-w-xl text-base text-white/75 sm:text-lg">{subtitle}</p>}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
            <a
              href="https://app.salongo.eu/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-on-gradient px-7 py-4 text-base"
            >
              {button}
              <ArrowRight className="size-[18px]" aria-hidden />
            </a>
            {secondaryLabel && (
              <Link
                href="/lien-he"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-4 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
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
