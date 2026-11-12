import type { PlanCode } from "./plans-core";

export type { PlanCode };

/** Đường dẫn vào app SalonGo (web app, cũng mở được trong app desktop). */
export const APP_URL = "https://app.salongo.eu";

export const SIGNUP_URL = `${APP_URL}/signup`;
export const LOGIN_URL = `${APP_URL}/login`;

export type BillingCycle = "month" | "year";

/**
 * "Gia hạn / Mua gói": trang /renew của app. Không dùng /dashboard/subscription: trên iPhone có app SalonGo,
 * link đó mở app từ App Store (không mua gói được trong app), còn /renew luôn mở trong trình duyệt.
 * Chưa đăng nhập thì app tự chuyển sang đăng nhập rồi quay lại. Giá luôn do app tính khi thanh toán.
 */
export const RENEW_URL = `${APP_URL}/renew`;

/** Link Gia hạn / Mua gói theo ngôn ngữ web; trên thẻ gói thêm plan + cycle (tháng/năm) đang chọn. */
export function renewLink(locale: string, plan?: PlanCode, cycle?: BillingCycle): string {
  const u = new URL(RENEW_URL);
  u.searchParams.set("lang", locale);
  if (plan) u.searchParams.set("plan", plan);
  if (plan && cycle) u.searchParams.set("cycle", cycle);
  return u.toString();
}

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
