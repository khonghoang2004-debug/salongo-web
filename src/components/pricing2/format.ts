/** Số tiền theo ngôn ngữ web (vi 1.599, cs 1 599, en 1,599). Giá app gửi có thể lẻ haléř: giữ tối đa 2 số lẻ. */
export const NUM_TAG: Record<string, string> = { vi: "vi-VN", cs: "cs-CZ", en: "en-GB", de: "de-DE" };

export function money(locale: string, n: number, digits = 2): string {
  return new Intl.NumberFormat(NUM_TAG[locale] ?? "cs-CZ", { maximumFractionDigits: digits }).format(n);
}

/** Thay {total} trong chuỗi đã lấy bằng t.raw (chuỗi còn giữ chỗ trống cho số tính ở phía client). */
export const withTotal = (template: string, total: string) => template.replace("{total}", total);
