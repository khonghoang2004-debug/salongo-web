import { getTranslations } from "next-intl/server";

const WINDOWS_DOWNLOAD_URL =
  "https://github.com/khonghoang2004-debug/salongo-desktop-releases/releases/latest/download/SalonGo-Setup.exe";
const MAC_DOWNLOAD_URL =
  "https://github.com/khonghoang2004-debug/salongo-desktop-releases/releases/latest/download/SalonGo-Setup.dmg";

const WindowsIcon = () => (
  <svg
    className="size-6 shrink-0"
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
    className="size-6 shrink-0"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

export async function DownloadSection() {
  const t = await getTranslations("download");

  return (
    <section className="border-t border-neutral-100 bg-white px-4 pt-8 pb-12 sm:px-6 sm:pt-12 sm:pb-16 lg:px-8 lg:pt-16 lg:pb-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-lg text-[#6B7280]">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href={WINDOWS_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            download="SalonGo-Setup.exe"
            className="flex items-center justify-center gap-3 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:brightness-105 active:scale-[0.98] sm:min-w-[220px]"
            style={{
              background: "linear-gradient(135deg, rgba(252,231,243,0.95) 0%, rgba(250,240,255,0.95) 100%)",
              border: "1px solid rgba(236,72,153,0.25)",
            }}
          >
            <span className="text-[#EC4899]"><WindowsIcon /></span>
            <span className="btn-glass-text">{t("windows")}</span>
          </a>
          <a
            href={MAC_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            download="SalonGo-Setup.dmg"
            className="flex items-center justify-center gap-3 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:brightness-105 active:scale-[0.98] sm:min-w-[220px]"
            style={{
              background: "linear-gradient(135deg, rgba(252,231,243,0.95) 0%, rgba(250,240,255,0.95) 100%)",
              border: "1px solid rgba(236,72,153,0.25)",
            }}
          >
            <span className="text-[#C084FC]"><AppleIcon /></span>
            <span className="btn-glass-text">{t("mac")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
