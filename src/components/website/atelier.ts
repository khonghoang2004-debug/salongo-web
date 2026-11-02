import { Newsreader } from "next/font/google";

// Phong cách riêng của trang /website ("atelier"): trung tính kem đá + espresso, chữ có chân kiểu tạp chí.
// Newsreader (thay Cormorant 02/11: người dùng muốn dễ đọc hơn): nét dày hơn, chữ x cao, có bộ tiếng Việt, font biến thiên.
// Màu viết thẳng trong class vì Tailwind cần chuỗi cố định:
// nền #F4F1EB, giấy #FBFAF7, đá #E9E4DB, viền #DCD5CA, chữ #1C1A17, chữ phụ #6B645B, đồng #7A6347, espresso #1F1C19.
export const fontAtelier = Newsreader({ subsets: ["latin", "latin-ext", "vietnamese"], style: ["normal", "italic"], display: "swap" });
