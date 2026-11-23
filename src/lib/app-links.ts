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

/**
 * Giá trị hợp lệ trong hợp đồng link với app (không đổi): lang ∈ 4 ngôn ngữ của web (giống src/i18n/routing.ts),
 * plan ∈ BASIC|PRO|PREMIUM|DESK, cycle ∈ month|year. Giá trị khác không bao giờ được đưa vào URL:
 * lang lạ → ngôn ngữ mặc định "vi", plan / cycle lạ → bỏ tham số (app mở màn chọn gói bình thường).
 */
export const APP_LOCALES = ["vi", "en", "cs", "de"] as const;
export const APP_PLANS = ["BASIC", "PRO", "PREMIUM", "DESK"] as const;
export const BILLING_CYCLES = ["month", "year"] as const;

const oneOf = <T extends string>(list: readonly T[], v: unknown): v is T => typeof v === "string" && (list as readonly string[]).includes(v);
const appLang = (locale: string) => (oneOf(APP_LOCALES, locale) ? locale : APP_LOCALES[0]);

/** Link Gia hạn / Mua gói theo ngôn ngữ web; trên thẻ gói thêm plan + cycle (tháng/năm) đang chọn. */
export function renewLink(locale: string, plan?: PlanCode | "DESK", cycle?: BillingCycle): string {
  const u = new URL(RENEW_URL);
  u.searchParams.set("lang", appLang(locale));
  if (oneOf(APP_PLANS, plan)) {
    u.searchParams.set("plan", plan);
    if (oneOf(BILLING_CYCLES, cycle)) u.searchParams.set("cycle", cycle);
  }
  return u.toString();
}

/** SalonGo for iPhone and iPad on the App Store (listed 2026-11, bundle eu.salongo.app). No country in the link: Apple opens the visitor's own store. */
export const APP_STORE_URL = "https://apps.apple.com/app/salongo/id6831757876";

export const DOWNLOAD_LINKS = {
  ios: APP_STORE_URL,
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
  // Chỉ gắn ngôn ngữ cho link vào chính app (không biến hàm này thành chỗ dựng link ra domain lạ)
  if (u.origin !== APP_URL) throw new Error(`appLink: not an app URL: ${url}`);
  u.searchParams.set("lang", appLang(locale));
  return u.toString();
}

/**
 * "Tạo tài khoản Bàn": đăng ký với ?plan=DESK để app mở thẳng luồng gói Bàn (người thuê bàn có IČO riêng).
 * App chưa đọc plan thì vẫn ra màn đăng ký bình thường.
 */
export function deskSignupLink(locale: string): string {
  const u = new URL(SIGNUP_URL);
  u.searchParams.set("plan", "DESK");
  u.searchParams.set("lang", appLang(locale));
  return u.toString();
}

/** iPhone / iPad app is public on the App Store (owner 2026-11-23): shown on the site. */
export const IOS_APP_LIVE = true;
/** Android app on Google Play: hidden on the site until it is publicly listed (owner 2026-11-22). */
export const ANDROID_APP_LIVE = false;
