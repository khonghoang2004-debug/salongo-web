// Màn hình app cho trang Tính năng / Giải pháp / Hướng dẫn mà src/lib/media.ts (SHOTS) chưa có id.
// Cùng dạng Shot với SHOTS; khi media.ts có id tương ứng thì chuyển sang dùng SHOTS.
import type { Shot } from "./media";

const D = { dw: 2880, dh: 1800, pw: 780, ph: 1688 };
const M = "/media/";
const s = (desktop: string, phone: string, size: Partial<Shot> = {}): Shot => ({ desktop: `${M}${desktop}.webp`, phone: `${M}${phone}.webp`, ...D, ...size });

export const FEATURE_SHOTS = {
  /** Duyệt lịch online trong app */
  approve: s("online-requests-desktop", "online-requests-phone"),
  services: s("services-desktop", "services-phone"),
  overview: s("overview-desktop", "overview-phone"),
  birthday: s("customer-detail-desktop", "customer-detail-phone"),
  /** Điện thoại của thợ: lịch hôm nay, doanh thu của tôi, chủ chọn thợ xem gì */
  staffToday: s("staff-desktop", "calendar-phone"),
  staffRevenue: s("staff-desktop", "payroll-phone"),
  staffAccess: s("staff-desktop", "staff-phone"),
} satisfies Record<string, Shot>;
