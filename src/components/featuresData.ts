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
  UserCog,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";

// Danh sách tính năng cho trang Tính năng: thứ tự, phần (chapter), ảnh màn hình app
export type FeatureId = "booking" | "calendar" | "checkout" | "customers" | "services" | "reports" | "payroll" | "staff";
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
};

export const TAB_ICONS = { BellRing, Globe, LayoutDashboard, LayoutList, ReceiptText, Users, BarChart3, CreditCard, UserRound, Scissors, Wallet };
export type TabIcon = keyof typeof TAB_ICONS;

export type Feature = {
  id: FeatureId;
  anchor: string;
  chapter: ChapterId;
  views: { src: string; icon: TabIcon }[];
};

export const FEATURES: Feature[] = [
  {
    id: "booking",
    anchor: "dat-lich-online",
    chapter: "c1",
    views: [
      { src: "/images/dat-lich-khach.webp", icon: "Globe" },
      { src: "/images/lich-hen-online.webp", icon: "BellRing" },
    ],
  },
  {
    id: "calendar",
    anchor: "lich-hen",
    chapter: "c1",
    views: [
      { src: "/images/lich-hen-nhan-vien.webp", icon: "Users" },
      { src: "/images/lich-hen-danh-sach.webp", icon: "LayoutList" },
    ],
  },
  { id: "checkout", anchor: "tinh-tien", chapter: "c2", views: [{ src: "/images/tinh-tien.webp", icon: "CreditCard" }] },
  { id: "customers", anchor: "khach-hang", chapter: "c2", views: [{ src: "/images/khach-hang.webp", icon: "UserRound" }] },
  { id: "services", anchor: "dich-vu", chapter: "c2", views: [{ src: "/images/dich-vu.webp", icon: "Scissors" }] },
  {
    id: "reports",
    anchor: "bao-cao",
    chapter: "c3",
    views: [
      { src: "/images/tong-quan.webp", icon: "LayoutDashboard" },
      { src: "/images/doanh-thu.webp", icon: "BarChart3" },
      { src: "/images/hoa-don.webp", icon: "ReceiptText" },
    ],
  },
  { id: "payroll", anchor: "tinh-luong", chapter: "c3", views: [{ src: "/images/tinh-luong.webp", icon: "Wallet" }] },
  // Tài khoản nhân viên: không dùng ảnh, vẽ bằng giao diện (StaffAccountVisual)
  { id: "staff", anchor: "nhan-vien", chapter: "c3", views: [] },
];

export const CHAPTERS: ChapterId[] = ["c1", "c2", "c3"];
