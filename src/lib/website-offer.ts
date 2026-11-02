import { CONTACT_FACEBOOK, CONTACT_INSTAGRAM, CONTACT_PHONE } from "./contact";

/**
 * Ưu đãi làm website cho khách dùng SalonGo (đã chốt 02/11/2026).
 * Sửa giá / số trang ở đây: mọi chữ trên trang lấy số từ hai hằng này (messages dùng {price}, {pages}).
 * Chưa có dữ liệu VAT → không ghi "đã gồm" hay "chưa gồm" VAT ở bất kỳ đâu.
 */
export const WEBSITE_PRICE_KC = 999;
export const WEBSITE_MAX_PAGES = 5;

/** "999 Kč", "1 290 Kč": khoảng trắng không ngắt giữa số và Kč (cách viết tiếng Séc) */
export const formatKc = (n: number) => `${n.toLocaleString("cs-CZ").replace(/\s/g, " ")} Kč`;

/** Kênh liên hệ để đặt làm website: lấy từ cấu hình liên hệ chính thức của SalonGo (src/lib/contact.ts) */
export const WEBSITE_CONTACT = {
  phone: CONTACT_PHONE,
  tel: `tel:${CONTACT_PHONE.replace(/\s/g, "")}`,
  facebook: CONTACT_FACEBOOK,
  instagram: CONTACT_INSTAGRAM,
};
