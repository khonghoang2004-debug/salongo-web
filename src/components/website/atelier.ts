import { Cormorant_Garamond } from "next/font/google";

// Phong cách riêng của trang /website ("atelier"): trung tính kem đá + espresso, chữ Cormorant Garamond kiểu tạp chí.
// Font biến thiên, có bộ tiếng Việt (trang chạy 4 ngôn ngữ). Màu viết thẳng trong class vì Tailwind cần chuỗi cố định:
// nền #F4F1EB, giấy #FBFAF7, đá #E9E4DB, viền #DCD5CA, chữ #1C1A17, chữ phụ #6B645B, đồng #7A6347, espresso #1F1C19.
export const fontAtelier = Cormorant_Garamond({ subsets: ["latin", "latin-ext", "vietnamese"], style: ["normal", "italic"], display: "swap" });
