import { getTranslations } from "next-intl/server";
import { Download } from "lucide-react";

import { DOWNLOAD_LINKS } from "@/lib/app-links";

const WINDOWS_DOWNLOAD_URL = DOWNLOAD_LINKS.windows;
const MAC_DOWNLOAD_URL = DOWNLOAD_LINKS.mac;

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

// Thẻ "dùng ở đâu": nút tải app máy tính (Windows, macOS) và các cách dùng trên điện thoại.
// iPhone: app chỉ để đăng nhập, chưa phát hành trên App Store (không ghi là đã có).
export async function DownloadCard() {
  const t = await getTranslations("download");

  const items = [
    { href: WINDOWS_DOWNLOAD_URL, file: "SalonGo-Setup.exe", label: t("windows"), platform: "Windows", Icon: WindowsIcon },
    { href: MAC_DOWNLOAD_URL, file: "SalonGo-Setup.dmg", label: t("mac"), platform: "macOS", Icon: AppleIcon },
  ];

  return (
    <div className="flex h-full flex-col rounded-[28px] border border-line bg-white p-6 sm:p-10">
      <p className="text-[15px] font-medium text-brand-700">{t("eyebrow")}</p>
      <h2 className="mt-3 font-display text-[2rem] font-semibold leading-[1.14] tracking-[-0.015em] text-ink text-balance sm:text-[2.5rem]">
        {t("title")}
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{t("subtitle")}</p>
      <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-ink/80">
        {(["macSigned", "phone", "ios"] as const).map((k) => (
          <li key={k} className="flex items-start gap-2.5">
            <span className="mt-[7px] h-2.5 w-[7px] shrink-0 rounded-t-full rounded-b-[2px] bg-brand-700" aria-hidden />
            {t(k)}
          </li>
        ))}
      </ul>
      <div className="mt-8 grid gap-3 border-t border-line pt-8 sm:grid-cols-2 lg:mt-auto lg:grid-cols-1 xl:grid-cols-2">
        {items.map(({ href, file, label, platform, Icon }) => (
          <a
            key={file}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            download={file}
            aria-label={label}
            className="group flex min-h-[60px] items-center gap-3.5 rounded-full bg-ink pl-5 pr-6 text-white transition-colors duration-200 hover:bg-brand-800"
          >
            <Icon />
            <span className="min-w-0 flex-1 leading-none">
              <span className="block text-[11px] font-medium text-white/65">{t("for")}</span>
              <span className="mt-1 block text-[1.125rem] font-semibold tracking-[-0.01em]">{platform}</span>
            </span>
            <Download className="size-[18px] shrink-0 text-white/50 transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-white motion-reduce:transition-none" aria-hidden />
          </a>
        ))}
      </div>
    </div>
  );
}
