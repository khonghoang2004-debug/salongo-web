import { getTranslations } from "next-intl/server";
import { Tablet, Globe, Languages } from "lucide-react";
import { AndroidIcon, AppleIcon, WindowsIcon } from "@/components/site/BrandIcons";
import { PHONE_APPS_LIVE } from "@/lib/app-links";

/** Dải "dùng trên thiết bị nào": chữ thường, không huy hiệu. */
export async function Platforms() {
  const t = await getTranslations("landing.platforms");
  const ico = "size-[18px] shrink-0 text-brand-700";
  const line = (Icon: typeof Globe) => <Icon key="l" className={ico} strokeWidth={1.75} aria-hidden />;
  const items = [
    ...(PHONE_APPS_LIVE
      ? [
          { icons: [<AppleIcon key="a" className={ico} />], label: "iPhone" },
          { icons: [<AndroidIcon key="g" className={ico} />], label: "Android" },
          { icons: [line(Tablet)], label: "iPad" },
        ]
      : []),
    { icons: [<AppleIcon key="a" className={ico} />, <WindowsIcon key="w" className="size-[15px] shrink-0 text-brand-700" />], label: "Mac, Windows" },
    { icons: [line(Globe)], label: t("web") },
    { icons: [line(Languages)], label: t("langs") },
  ];
  return (
    <section aria-label={t("label")} className="border-y border-line bg-white">
      <div className="x-wrap flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:gap-10">
        <p className="shrink-0 text-sm text-muted">{t("label")}</p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:flex lg:flex-1 lg:justify-between">
          {items.map(({ icons, label }) => (
            <li key={label} className="flex items-center gap-2.5 text-[15px] font-medium leading-none text-ink">
              <span className="flex items-center gap-1.5">{icons}</span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
