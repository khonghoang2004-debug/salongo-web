import type { ArtPalette } from "./Art";
import type { TemplateContent } from "./types";
import { nail } from "./content/nail";
import { hair } from "./content/hair";
import { spa } from "./content/spa";
import { barber } from "./content/barber";

// Danh sách mẫu website. Thêm mẫu mới: tạo file nội dung trong content/, một component trong sites/,
// rồi thêm vào đây (thư viện, trang demo và ảnh xem trước đều đọc từ danh sách này).
export const TEMPLATES: TemplateContent[] = [nail, hair, spa, barber];

export const getTemplate = (slug: string) => TEMPLATES.find((t) => t.slug === slug);

/** Màu hình minh hoạ của từng mẫu (cũng dùng cho thẻ xem trước trong thư viện) */
export const ART_PALETTES: Record<string, ArtPalette[]> = {
  "ivelle-nail": [
    ["#F8F3EC", "#EADBCB", "#D9BE97", "#9A8270"],
    ["#F3EADF", "#E2CFBC", "#C8A57C", "#7E6A5B"],
    ["#FBF8F3", "#EEE3D6", "#E3C9B4", "#B08E74"],
    ["#F1E7DC", "#DCC6B0", "#BFA078", "#6F5D50"],
  ],
  "verra-hair": [
    ["#EFE7DB", "#D9CCBA", "#B49A6A", "#3B2A22"],
    ["#E7DED1", "#CDBFAE", "#8C6B4F", "#2B2421"],
    ["#F3EDE4", "#DED2C1", "#A88B5E", "#4A3A30"],
    ["#E3D8C8", "#C8B8A2", "#7A5A42", "#2B2B2B"],
  ],
  "saluna-spa": [
    ["#FAF7F1", "#ECE5D8", "#A9B39A", "#6B7457"],
    ["#F5F1E8", "#E3DACB", "#C2B8A6", "#7C846A"],
    ["#F7F4EC", "#E6E1D2", "#B9C2AA", "#8A8F79"],
    ["#F2EDE3", "#DCD3C2", "#9EA88E", "#5E664D"],
  ],
  "brass-barber": [
    ["#F1E9DC", "#E0D3BF", "#A7743F", "#3A3330"],
    ["#4A3F38", "#3A322D", "#B9844B", "#1F1B19"],
    ["#EDE3D3", "#D8C8B0", "#8E5F33", "#5C3F2C"],
    ["#3E3632", "#2F2A27", "#C08B52", "#F1E9DC"],
  ],
};

export const artPalette = (slug: string, v: number) => {
  const list = ART_PALETTES[slug] ?? ART_PALETTES["ivelle-nail"];
  return list[v % list.length];
};
