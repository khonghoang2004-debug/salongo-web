import { getTranslations } from "next-intl/server";
import { Apple, Smartphone, Tablet, Monitor, Globe, Languages } from "lucide-react";

/** Dải "dùng trên thiết bị nào": chữ thường, không huy hiệu. */
export async function Platforms() {
  const t = await getTranslations("landing.platforms");
  const items = [
    { icon: Apple, label: "iPhone" },
    { icon: Smartphone, label: "Android" },
    { icon: Tablet, label: "iPad" },
    { icon: Monitor, label: "Mac, Windows" },
    { icon: Globe, label: t("web") },
    { icon: Languages, label: t("langs") },
  ];
  return (
    <section aria-label={t("label")} className="border-y border-line bg-white">
      <div className="x-wrap flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:gap-10">
        <p className="shrink-0 text-sm text-muted">{t("label")}</p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:flex lg:flex-1 lg:justify-between">
          {items.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2.5 text-[15px] font-medium text-ink">
              <Icon className="size-[18px] text-brand-700" strokeWidth={1.75} aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
