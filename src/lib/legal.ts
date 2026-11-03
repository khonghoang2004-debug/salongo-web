import { CONTACT_EMAIL, CONTACT_PHONE } from "./contact";

/**
 * Thông tin người vận hành SalonGo, in ở chân trang, trang Liên hệ và đầu mọi văn bản pháp lý
 * (§ 435 občanský zákoník, § 5 zákona 480/2004 Sb.). Ô để trống ("") thì không hiển thị.
 * Điền IČO và địa chỉ ngay khi có: luật Séc bắt buộc ghi trên website.
 */
export const OPERATOR = {
  name: "Khong Nguyen Duc Hoang",
  brand: "SalonGo",
  /** IČO, ví dụ "12345678" */
  ico: "",
  /** Místo podnikání, ví dụ "Václavské náměstí 1, 110 00 Praha 1" */
  address: "",
  /** Hình thức: "osvc" = fyzická osoba podnikající (OSVČ); câu hiển thị lấy theo ngôn ngữ (ui.legalForm) */
  legalForm: "osvc" as "osvc" | "",
  /** DIČ nếu là plátce DPH, ví dụ "CZ12345678"; để trống nếu chưa đăng ký DPH */
  vatId: "",
  /** true = plátce DPH, false = není plátce DPH, null = chưa xác nhận (không ghi gì) */
  vatPayer: null as boolean | null,
  email: CONTACT_EMAIL,
  phone: CONTACT_PHONE,
} as const;

/** Ngày hiệu lực của bộ văn bản hiện tại (YYYY-MM-DD). Đổi khi sửa nội dung. */
export const LEGAL_EFFECTIVE = "2026-11-03";

/** Các văn bản pháp lý: đường dẫn trên web (giống nhau ở 4 ngôn ngữ). */
export const LEGAL_DOCS = [
  { key: "terms", path: "/terms" },
  { key: "privacy", path: "/privacy" },
  { key: "cookies", path: "/cookies" },
  { key: "dpa", path: "/dpa" },
  { key: "websiteTerms", path: "/website-terms" },
] as const;

export type LegalDocKey = (typeof LEGAL_DOCS)[number]["key"];
