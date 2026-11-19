import { formatNumber } from "@/lib/plans-core";

/**
 * Số tiền theo ngôn ngữ web (vi 1.599, cs 1 599, en 1,599), cùng hàm với văn bản (planTokens).
 * digits 2: giá app gửi có thể lẻ haléř, in đúng số đó; digits 0: số tự tính (giá năm chia 12).
 */
export const money = (locale: string, n: number, digits = 2) => formatNumber(n, locale, digits);

/** Thay {total} trong chuỗi đã lấy bằng t.raw (chuỗi còn giữ chỗ trống cho số tính ở phía client). */
export const withTotal = (template: string, total: string) => template.replace("{total}", total);
