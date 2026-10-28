import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PageHero } from "./ui/PageHero";

export async function ContactPageHero() {
  const t = await getTranslations("contact");
  const tNav = await getTranslations("nav");

  return (
    <PageHero
      crumb={tNav("contact")}
      title={t("heroTitle")}
      lead={t("heroSubtext")}
      aside={
        <ul className="divide-y divide-line rounded-[20px] border border-line bg-white">
          {(["heroBadge1", "heroBadge2", "heroBadge3"] as const).map((k) => (
            <li key={k} className="flex items-center gap-3 px-5 py-4 text-[15px] font-medium text-ink">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700" aria-hidden>
                <Check className="size-4" strokeWidth={3} />
              </span>
              {t(k)}
            </li>
          ))}
        </ul>
      }
    />
  );
}
