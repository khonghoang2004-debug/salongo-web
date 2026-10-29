import {
  BarChart3,
  BellRing,
  CalendarDays,
  CreditCard,
  Globe,
  LayoutDashboard,
  LayoutList,
  ReceiptText,
  Scissors,
  Store,
  UserCog,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";

// Danh sách tính năng cho trang Tính năng: thứ tự, phần (chapter), ảnh màn hình app
export type FeatureId = "booking" | "calendar" | "checkout" | "customers" | "services" | "reports" | "payroll" | "staff" | "branches";
export type ChapterId = "c1" | "c2" | "c3";

export const FEATURE_ICONS = {
  booking: Globe,
  calendar: CalendarDays,
  checkout: CreditCard,
  customers: UserRound,
  services: Scissors,
  reports: BarChart3,
  payroll: Wallet,
  staff: UserCog,
  branches: Store,
};

export const TAB_ICONS = { BellRing, Globe, LayoutDashboard, LayoutList, ReceiptText, Users, BarChart3, CreditCard, UserRound, Scissors, Wallet, Store };
export type TabIcon = keyof typeof TAB_ICONS;

// Ảnh chụp màn hình app (PC: vùng nội dung, bỏ menu bên trái; 1600 × 1165). mobile: ảnh điện thoại 780 × 1688
export const SHOT = { w: 1600, h: 1165 };

export type FeatureView = { src: string; icon: TabIcon; mobile?: string };

export type Feature = {
  id: FeatureId;
  anchor: string;
  chapter: ChapterId;
  views: FeatureView[];
  /** Chỉ có giao diện điện thoại (tài khoản nhân viên): hiện dãy ảnh điện thoại thay cho khung PC */
  phones?: string[];
};

const A = "/images/app/";

export const FEATURES: Feature[] = [
  {
    id: "booking",
    anchor: "dat-lich-online",
    chapter: "c1",
    views: [
      { src: A + "dat-lich-khach.webp", icon: "Globe", mobile: A + "m-dat-lich-gio.webp" },
      { src: A + "lich-online-noi-dung.webp", icon: "BellRing", mobile: A + "m-lich-online.webp" },
    ],
  },
  {
    id: "calendar",
    anchor: "lich-hen",
    chapter: "c1",
    views: [
      { src: A + "lich-hen-nhan-vien-noi-dung.webp", icon: "Users", mobile: A + "m-lich-hen.webp" },
      { src: A + "lich-hen-danh-sach-noi-dung.webp", icon: "LayoutList", mobile: A + "m-lich-hen.webp" },
    ],
  },
  { id: "checkout", anchor: "tinh-tien", chapter: "c2", views: [{ src: A + "tinh-tien-noi-dung.webp", icon: "CreditCard", mobile: A + "m-tinh-tien.webp" }] },
  {
    id: "customers",
    anchor: "khach-hang",
    chapter: "c2",
    views: [
      { src: A + "khach-hang-noi-dung.webp", icon: "Users", mobile: A + "m-khach-hang.webp" },
      { src: A + "khach-hang-chi-tiet-noi-dung.webp", icon: "UserRound", mobile: A + "m-khach-hang.webp" },
    ],
  },
  { id: "services", anchor: "dich-vu", chapter: "c2", views: [{ src: A + "dich-vu-noi-dung.webp", icon: "Scissors", mobile: A + "m-dich-vu.webp" }] },
  {
    id: "reports",
    anchor: "bao-cao",
    chapter: "c3",
    views: [
      { src: A + "tong-quan-30-ngay-noi-dung.webp", icon: "LayoutDashboard", mobile: A + "m-tong-quan.webp" },
      { src: A + "doanh-thu-noi-dung.webp", icon: "BarChart3", mobile: A + "m-doanh-thu.webp" },
      { src: A + "hoa-don-noi-dung.webp", icon: "ReceiptText", mobile: A + "m-hoa-don.webp" },
    ],
  },
  { id: "payroll", anchor: "tinh-luong", chapter: "c3", views: [{ src: A + "tinh-luong-noi-dung.webp", icon: "Wallet", mobile: A + "m-tinh-luong.webp" }] },
  {
    id: "branches",
    anchor: "da-chi-nhanh",
    chapter: "c3",
    views: [
      { src: A + "chi-nhanh-chon-noi-dung.webp", icon: "Store", mobile: A + "m-chi-nhanh-menu.webp" },
      { src: A + "tat-ca-salon-noi-dung.webp", icon: "LayoutDashboard", mobile: A + "m-tat-ca-salon.webp" },
    ],
  },
  { id: "staff", anchor: "nhan-vien", chapter: "c3", views: [], phones: [A + "m-nv-ngay-mai.webp", A + "m-nv-hom-nay.webp", A + "m-nv-menu.webp"] },
];

export const CHAPTERS: ChapterId[] = ["c1", "c2", "c3"];
