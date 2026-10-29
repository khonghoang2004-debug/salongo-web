/** Đường dẫn vào app Salora (web app, cũng mở được trong app desktop). */
export const APP_URL = "https://app.salongo.eu";

export const SIGNUP_URL = `${APP_URL}/signup`;
export const LOGIN_URL = `${APP_URL}/login`;

export type PlanCode = "BASIC" | "PRO" | "PREMIUM";

/**
 * "Gia hạn gói": app tự xử lý đăng nhập, chọn salon (khi có nhiều salon) và quyền chủ salon,
 * rồi mở màn Nâng cấp gói với gói / chu kỳ được đánh dấu. Chỉ là gợi ý: giá luôn lấy từ app,
 * không có thanh toán nào bắt đầu khi chỉ bấm link.
 */
export function renewUrl(plan?: PlanCode, cycle?: "month" | "year"): string {
  const q = new URLSearchParams();
  if (plan) q.set("plan", plan);
  if (cycle) q.set("cycle", cycle);
  const s = q.toString();
  return `${APP_URL}/renew${s ? `?${s}` : ""}`;
}

export const DOWNLOAD_LINKS = {
  windows: "https://github.com/khonghoang2004-debug/salongo-desktop-releases/releases/latest/download/SalonGo-Setup.exe",
  mac: "https://github.com/khonghoang2004-debug/salongo-desktop-releases/releases/latest/download/SalonGo-Setup.dmg",
};
