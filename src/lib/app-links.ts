/** Đường dẫn vào app Salora (web app, cũng mở được trong app desktop). */
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
