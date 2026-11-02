/** Đường dẫn vào app SalonGo (web app, cũng mở được trong app desktop). */
export const APP_URL = "https://app.salongo.eu";

export const SIGNUP_URL = `${APP_URL}/signup`;
export const LOGIN_URL = `${APP_URL}/login`;

export type PlanCode = "BASIC" | "PRO" | "PREMIUM";

/**
 * "Gia hạn gói": màn Nâng cấp gói hiện có trong app (/dashboard/subscription) của chi nhánh đang mở.
 * Chưa đăng nhập: app chuyển sang /login?callbackUrl=/dashboard/subscription rồi quay lại màn này.
 * Giá luôn lấy từ app; không có thanh toán nào bắt đầu khi chỉ bấm link.
 */
export const RENEW_URL = `${APP_URL}/dashboard/subscription`;

export const DOWNLOAD_LINKS = {
  // Our own redirect: newest published version (full or pre-release), see src/app/api/download/[os]/route.ts
  windows: "/api/download/windows",
  mac: "/api/download/mac",
};

/**
 * Link into the app that opens it in the website's language: the app saves `?lang=` as its own language
 * (salon-go src/app/layout.tsx), so a visitor reading the Czech site lands in the Czech app.
 */
export function appLink(url: string, locale: string): string {
  const u = new URL(url);
  u.searchParams.set("lang", locale);
  return u.toString();
}
