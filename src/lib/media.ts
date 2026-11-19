// Ảnh chụp app dùng trên site mới. Một nơi duy nhất để đổi ảnh: mỗi màn hình có bản máy tính (16:10) và bản điện thoại (390 × 844 pt).
// Ảnh nằm trong /public/media (chụp từ app hiện tại, dữ liệu mẫu "Lotus Nails & Beauty").
export type Shot = { desktop: string; phone: string; dw: number; dh: number; pw: number; ph: number };

const D = { dw: 1600, dh: 1000, pw: 780, ph: 1688 };
const s = (desktop: string, phone: string, size: Partial<Shot> = {}): Shot => ({ desktop, phone, ...D, ...size });

export const SHOTS = {
  calendar: s("/images/app/lich-hen-nhan-vien.webp", "/images/app/m-lich-hen.webp"),
  booking: s("/images/app/dat-lich-khach.webp", "/images/app/m-dat-lich-gio.webp"),
  checkout: s("/images/app/tinh-tien.webp", "/images/app/m-tinh-tien.webp"),
  thuchi: s("/images/app/doanh-thu.webp", "/images/app/m-doanh-thu.webp"),
  payroll: s("/images/app/tinh-luong.webp", "/images/app/m-tinh-luong.webp"),
  customers: s("/images/app/khach-hang.webp", "/images/app/m-khach-hang.webp"),
  marketing: s("/images/app/marketing-8-3-v2.webp", "/images/app/m-marketing-8-3.webp"),
  branches: s("/images/app/tat-ca-salon.webp", "/images/app/m-tat-ca-salon.webp"),
  staff: s("/images/app/tong-quan.webp", "/images/app/m-nv-hom-nay.webp"),
  invoices: s("/images/app/hoa-don.webp", "/images/app/m-hoa-don.webp"),
  desk: s("/images/app/tinh-tien.webp", "/images/app/m-tinh-tien.webp"),
} as const;

export type ShotId = keyof typeof SHOTS;
