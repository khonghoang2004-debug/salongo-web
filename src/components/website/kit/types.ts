import type { KitFont } from "./fonts";

// Một mẫu kit = bảng màu + chữ + hình dạng (theme) và cách ghép khối (layout). Ghép khác nhau → bố cục khác nhau thật,
// không chỉ đổi màu: 8 kiểu đầu trang × 5 kiểu bảng giá × 4 kiểu bộ sưu tập × 3 kiểu đội ngũ × 3 kiểu menu/chân trang.
export type KitTheme = {
  display: KitFont;
  body: KitFont;
  c: {
    bg: string;
    surface: string;
    ink: string;
    muted: string;
    accent: string;
    onAccent: string;
    dark: string;
    onDark: string;
    line: string;
    tint: string;
  };
  /** bo góc ảnh / thẻ */
  radius: "none" | "sm" | "lg" | "xl" | "arch";
  btn: "pill" | "square" | "soft";
  /** tiêu đề in hoa giãn chữ */
  caps?: boolean;
  /** phần nhấn của tiêu đề in nghiêng */
  italic?: boolean;
  /** độ đậm tiêu đề */
  weight?: "light" | "normal" | "bold";
};

export type HeroKind = "full" | "split" | "center" | "giant" | "collage" | "card" | "minimal" | "quote";
export type ServicesKind = "list" | "cards" | "accordion" | "tabs" | "numbered";
export type GalleryKind = "masonry" | "grid" | "strip" | "mosaic";
export type TeamKind = "portraits" | "circles" | "rows";
export type HomeBlock = "intro" | "services" | "gallery" | "team" | "steps" | "quote" | "cta" | "visit";

export type KitLayout = {
  nav: "light" | "dark" | "pill";
  hero: HeroKind;
  /** đầu trang con: dải tối, chữ trơn, hoặc ảnh mờ */
  head: "band" | "plain" | "image";
  services: ServicesKind;
  gallery: GalleryKind;
  team: TeamKind;
  footer: "dark" | "light" | "big";
  /** thứ tự khối trên trang chủ (sau đầu trang) */
  home: HomeBlock[];
  /** đảo trái/phải ở đầu trang chia đôi */
  flip?: boolean;
};
