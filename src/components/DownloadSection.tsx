import { getTranslations } from "next-intl/server";
import { Download } from "lucide-react";

const WINDOWS_DOWNLOAD_URL =
  "https://github.com/khonghoang2004-debug/salongo-desktop-releases/releases/latest/download/SalonGo-Setup.exe";
const MAC_DOWNLOAD_URL =
  "https://github.com/khonghoang2004-debug/salongo-desktop-releases/releases/latest/download/SalonGo-Setup.dmg";

const WindowsIcon = () => (
  <svg
    className="size-5 shrink-0"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <rect x="1" y="1" width="10" height="10" rx="1.5" />
    <rect x="13" y="1" width="10" height="10" rx="1.5" />
    <rect x="1" y="13" width="10" height="10" rx="1.5" />
    <rect x="13" y="13" width="10" height="10" rx="1.5" />
  </svg>
);

const AppleIcon = () => (
  <svg
    className="size-5 shrink-0"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

export async function DownloadSection() {
  const t = await getTranslations("download");

  const items = [
    { href: WINDOWS_DOWNLOAD_URL, file: "SalonGo-Setup.exe", label: t("windows"), Icon: WindowsIcon, ext: ".exe" },
    { href: MAC_DOWNLOAD_URL, file: "SalonGo-Setup.dmg", label: t("mac"), Icon: AppleIcon, ext: ".dmg" },
  ];

  return (
    <section className="sg-section bg-white pt-0 sm:pt-0 lg:pt-0">
      <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-[28px] border border-line bg-sand p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:gap-12 lg:p-12">
        <div className="text-center lg:text-left">
          <p className="sg-kicker">{t("eyebrow")}</p>
          <h2 className="sg-h2 mt-4">{t("title")}</h2>
          <p className="sg-lead mt-3">{t("subtitle")}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:w-[380px] lg:grid-cols-1">
          {items.map(({ href, file, label, Icon, ext }) => (
            <a
              key={file}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              download={file}
              className="sg-card sg-card-hover group flex items-center gap-4 p-4 sm:p-5"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-ink text-white">
                <Icon />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block whitespace-nowrap font-semibold text-ink">{label}</span>
                <span className="mt-0.5 block text-xs text-muted">{ext}</span>
              </span>
              <Download className="size-5 shrink-0 text-muted transition-colors group-hover:text-brand-700" aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
