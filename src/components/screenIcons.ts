import { BarChart3, BellRing, Globe, Crown, ReceiptText, Scissors, Wallet, LayoutDashboard, LayoutList, UserRound, Users } from "lucide-react";

// Icon cho từng màn hình app (dùng chung cho tab ảnh và thẻ mô tả)
export const SCREEN_ICONS = { staff: Users, list: LayoutList, overview: LayoutDashboard, revenue: BarChart3, customers: UserRound, loyalty: Crown, services: Scissors, invoices: ReceiptText, payroll: Wallet, booking: Globe, requests: BellRing };
export type ScreenIcon = keyof typeof SCREEN_ICONS;
