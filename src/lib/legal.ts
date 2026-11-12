import { CONTACT_EMAIL, CONTACT_PHONE } from "./contact";

/**
 * Thông tin người vận hành SalonGo, in ở chân trang, trang Liên hệ và đầu mọi văn bản pháp lý
 * (§ 435 občanský zákoník, § 5 zákona 480/2004 Sb.). Ô để trống ("") thì không hiển thị.
 * Theo giấy phép kinh doanh (živnostenský rejstřík, Městský úřad Černošice). Không đăng ngày sinh, quốc tịch.
 */
export const OPERATOR = {
  name: "Nguyen Đuc Hoang Khong",
  brand: "SalonGo",
  ico: "30241464",
  /** Sídlo */
  address: "Svornosti 189, 252 42 Jesenice, Česká republika",
  /** Hình thức: "osvc" = podnikatel – fyzická osoba (živnostenský rejstřík); câu hiển thị lấy theo ngôn ngữ (ui.legalForm) */
  legalForm: "osvc" as "osvc" | "",
  /** DIČ nếu là plátce DPH, ví dụ "CZ12345678"; để trống nếu chưa đăng ký DPH */
  vatId: "",
  /** true = plátce DPH, false = není plátce DPH, null = chưa xác nhận (không ghi gì) */
  vatPayer: null as boolean | null,
  email: CONTACT_EMAIL,
  phone: CONTACT_PHONE,
} as const;

/** Ngày hiệu lực của bộ văn bản hiện tại (YYYY-MM-DD). Đổi khi sửa nội dung. */
export const LEGAL_EFFECTIVE = "2026-11-12";

/** Các văn bản pháp lý: đường dẫn trên web (giống nhau ở 4 ngôn ngữ). */
export const LEGAL_DOCS = [
  { key: "terms", path: "/terms" },
  { key: "privacy", path: "/privacy" },
  { key: "cookies", path: "/cookies" },
  { key: "dpa", path: "/dpa" },
  { key: "websiteTerms", path: "/website-terms" },
] as const;

export type LegalDocKey = (typeof LEGAL_DOCS)[number]["key"];
