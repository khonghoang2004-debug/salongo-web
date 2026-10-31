import { getTranslations } from "next-intl/server";
import { Download } from "lucide-react";

import { DOWNLOAD_LINKS } from "@/lib/app-links";

const WINDOWS_DOWNLOAD_URL = DOWNLOAD_LINKS.windows;
const MAC_DOWNLOAD_URL = DOWNLOAD_LINKS.mac;

const WindowsIcon = () => (
  <svg
    className="size-7 shrink-0"
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
    className="size-7 shrink-0"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

// Thẻ tải ứng dụng máy tính (dùng trong khối giá trên trang chủ). Nút tải kiểu huy hiệu cửa hàng ứng dụng:
// nền tối, logo hệ điều hành, dòng nhỏ "Tải về cho" + tên nền tảng.
export async function DownloadCard() {
  const t = await getTranslations("download");

  const items = [
    { href: WINDOWS_DOWNLOAD_URL, file: "SalonGo-Setup.exe", label: t("windows"), platform: "Windows", Icon: WindowsIcon },
    { href: MAC_DOWNLOAD_URL, file: "SalonGo-Setup.dmg", label: t("mac"), platform: "macOS", Icon: AppleIcon },
  ];

  return (
    <div className="flex h-full flex-col rounded-[28px] border border-line bg-white p-6 sm:p-8 lg:p-10">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">{t("eyebrow")}</p>
      <h2 className="mt-4 font-display text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.125rem]">
        {t("title")}
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{t("subtitle")}</p>
      <div className="mt-6 lg:mt-auto lg:pt-8">
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map(({ href, file, label, platform, Icon }) => (
            <a
              key={file}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              download={file}
              aria-label={label}
              className="group relative flex h-[64px] items-center gap-3.5 overflow-hidden rounded-2xl bg-ink pl-4 pr-5 text-white shadow-[0_14px_30px_-16px_rgba(20,8,12,0.75)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#2b2226] hover:shadow-[0_18px_36px_-16px_rgba(20,8,12,0.8)]"
            >
              {/* ánh sáng nhẹ phía trên cho cảm giác nổi khối */}
              <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.07] to-transparent" />
              <Icon />
              <span className="min-w-0 flex-1 leading-none">
                <span className="block text-[11px] font-medium text-white/60">{t("for")}</span>
                <span className="mt-1 block font-display text-[1.25rem] font-semibold tracking-[-0.02em]">{platform}</span>
              </span>
              <Download
                className="hidden size-[18px] shrink-0 text-white/45 transition max-sm:block xl:block duration-200 group-hover:translate-y-0.5 group-hover:text-white"
                aria-hidden
              />
            </a>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-2 text-xs text-muted">
          <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
          {t("note")}
        </p>
      </div>
    </div>
  );
}
