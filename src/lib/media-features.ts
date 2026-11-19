// Màn hình app cho trang Tính năng / Giải pháp / Hướng dẫn mà src/lib/media.ts (SHOTS) chưa có id.
// Cùng dạng Shot với SHOTS; khi media.ts có id tương ứng thì chuyển sang dùng SHOTS.
import type { Shot } from "./media";

const D = { dw: 1600, dh: 1000, pw: 780, ph: 1688 };
const s = (desktop: string, phone: string, size: Partial<Shot> = {}): Shot => ({ desktop, phone, ...D, ...size });
const A = "/images/app/";

export const FEATURE_SHOTS = {
  /** Duyệt lịch online trong app */
  approve: s(A + "lich-online.webp", A + "m-lich-online.webp"),
  services: s(A + "dich-vu.webp", A + "m-dich-vu.webp"),
  overview: s(A + "tong-quan.webp", A + "m-tong-quan.webp"),
  birthday: s(A + "sinh-nhat-noi-dung.webp", A + "m-sinh-nhat.webp", { dh: 1165 }),
  /** Điện thoại của thợ: lịch hôm nay, doanh thu của tôi, chủ chọn thợ xem gì */
  staffToday: s(A + "nhan-vien-noi-dung.webp", A + "m-nv-hom-nay.webp", { dh: 1165 }),
  staffRevenue: s(A + "nhan-vien-noi-dung.webp", A + "m-nv-doanh-thu.webp", { dh: 1165 }),
  staffAccess: s(A + "nhan-vien-noi-dung.webp", A + "m-quyen-doanh-thu.webp", { dh: 1165 }),
} satisfies Record<string, Shot>;
