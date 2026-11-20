/**
 * Chuỗi JSON an toàn để đặt trong <script type="application/ld+json" dangerouslySetInnerHTML>.
 * JSON.stringify không thoát "<", nên một câu hỏi / mô tả chứa "</script>" (hoặc "<!--") sẽ đóng thẻ script
 * và phần sau chạy như HTML. Thoát <, >, & và U+2028 / U+2029 thành \uXXXX: JSON.parse cho ra đúng dữ liệu cũ.
 */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
