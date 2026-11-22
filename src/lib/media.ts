// Ảnh chụp app dùng trên site mới. Một nơi duy nhất để đổi ảnh: mỗi màn hình có bản máy tính (16:10) và bản điện thoại (390 × 844 pt).
// Ảnh nằm trong /public/media (chụp lại 22/11/2026 từ app hiện tại, dữ liệu mẫu "Lotus Nails & Beauty").
export type Shot = { desktop: string; phone: string; dw: number; dh: number; pw: number; ph: number };

const D = { dw: 2880, dh: 1800, pw: 780, ph: 1688 };
const M = "/media/";
const s = (id: string, size: Partial<Shot> = {}): Shot => ({ desktop: `${M}${id}-desktop.webp`, phone: `${M}${id}-phone.webp`, ...D, ...size });

export const SHOTS = {
  calendar: s("calendar"),
  booking: s("booking-page-time"),
  checkout: s("checkout"),
  thuchi: s("thu-chi-thu"),
  payroll: s("payroll"),
  customers: s("customers"),
  marketing: s("marketing"),
  branches: s("branches"),
  staff: s("staff"),
  invoices: s("invoices"),
  desk: s("desk-pos"),
  overview: s("overview"),
} as const;

export type ShotId = keyof typeof SHOTS;
