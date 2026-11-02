import type { ArtPalette } from "./Art";
import type { TemplateContent } from "./types";
import { nail } from "./content/nail";
import { hair } from "./content/hair";
import { spa } from "./content/spa";
import { barber } from "./content/barber";
import { lumen } from "./content/lumen";
import { velvet } from "./content/velvet";
import { chroma } from "./content/chroma";
import { aurel } from "./content/aurel";
import { azure, cherry, lilac, matcha, rose, saffron, tropicana } from "./content/vivid";

// Danh sách mẫu website. Thêm mẫu mới: tạo file nội dung trong content/, một component trong sites/,
// rồi thêm vào đây (thư viện, trang demo và ảnh xem trước đều đọc từ danh sách này).
export const TEMPLATES: TemplateContent[] = [
  nail, hair, spa, barber, lumen, velvet, chroma, aurel,
  tropicana, cherry, lilac, matcha, azure, rose, saffron,
];

/** Nhóm loại salon cho bộ lọc thư viện */
export type Category = "nail" | "hair" | "spa" | "lash" | "makeup" | "barber";
export const CATEGORY: Record<string, Category> = {
  "ivelle-nail": "nail", "chroma-nails": "nail", "tropicana-nails": "nail",
  "verra-hair": "hair", "lumen-hair": "hair", "cherry-hair": "hair", "saffron-color": "hair",
  "saluna-spa": "spa", "matcha-spa": "spa",
  "velvet-lash": "lash", "lilac-lash": "lash",
  "aurel-beauty": "makeup", "rose-bridal": "makeup",
  "brass-barber": "barber", "azure-barber": "barber",
};

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
  "lumen-hair": [
    ["#F6F2EA", "#E6DED0", "#6E1F2A", "#141414"],
    ["#EFE8DC", "#D9CEBD", "#8A6A4F", "#1E1E1E"],
    ["#F3EEE6", "#E2D8C8", "#B39F86", "#2A2422"],
    ["#E9E2D6", "#CFC3B1", "#6E1F2A", "#3A3330"],
  ],
  "velvet-lash": [
    ["#F7E6E1", "#EBCFC7", "#C98A8A", "#4A2236"],
    ["#F3E1DB", "#E2C2BA", "#B36F7D", "#3F1D2E"],
    ["#FAEFEB", "#EED8D1", "#D6A1A1", "#5B2C43"],
    ["#F1DCD6", "#DDB9B0", "#A65F73", "#3F1D2E"],
  ],
  "chroma-nails": [
    ["#F4F1EA", "#E8E2D3", "#2340D8", "#121212"],
    ["#FFF4C7", "#F6D86B", "#2340D8", "#121212"],
    ["#E6ECFF", "#C3CFFF", "#F6D86B", "#2340D8"],
    ["#F4F1EA", "#F6D86B", "#FF6B4A", "#2340D8"],
  ],
  "aurel-beauty": [
    ["#F5EFE4", "#E7DCC8", "#B8955A", "#1E3A32"],
    ["#2A4A40", "#1E3A32", "#D9BC85", "#B8955A"],
    ["#F1E9DA", "#E0D2B8", "#C9A66B", "#24443A"],
    ["#EFE6D6", "#DCCDB2", "#1E3A32", "#B8955A"],
  ],
  "tropicana-nails": [
    ["#FFF6EC", "#FFD9C2", "#FF5A5F", "#00A79D"],
    ["#E0FFF9", "#9BE7DE", "#FFD23F", "#FF5A5F"],
    ["#FFF4CC", "#FFD23F", "#00A79D", "#FF5A5F"],
    ["#FFE5E0", "#FFB8AE", "#00A79D", "#1B1B1B"],
  ],
  "cherry-hair": [
    ["#FFF3E4", "#F8D9B5", "#F2A541", "#D7263D"],
    ["#FFE3D6", "#F5B7A0", "#D7263D", "#2B0F10"],
    ["#FCEBC9", "#F2A541", "#D7263D", "#7A1420"],
    ["#FFF3E4", "#EFC7A3", "#2B0F10", "#D7263D"],
  ],
  "lilac-lash": [
    ["#F6F2FF", "#DDD1FF", "#9FF0D0", "#6D4AFF"],
    ["#ECFFF7", "#BFF5DF", "#B69CFF", "#2A1B4A"],
    ["#F1EAFF", "#CBB8FF", "#6D4AFF", "#2A1B4A"],
    ["#F6F2FF", "#E6DCFF", "#9FF0D0", "#4B2FD1"],
  ],
  "matcha-spa": [
    ["#F3F5E9", "#D9E6BE", "#D9663C", "#4D7A26"],
    ["#FBEFE6", "#F2C9AE", "#7FA650", "#4D7A26"],
    ["#EEF4DF", "#C6DBA0", "#4D7A26", "#23301A"],
    ["#F3F5E9", "#E5D8C3", "#D9663C", "#23301A"],
  ],
  "azure-barber": [
    ["#F2F6FB", "#D3E0EE", "#C1121F", "#0F4C81"],
    ["#E6EEF7", "#B9CDE3", "#0F4C81", "#0B1F33"],
    ["#FFFFFF", "#DCE6F1", "#C1121F", "#0B1F33"],
    ["#0F4C81", "#0B3A63", "#F2F6FB", "#C1121F"],
  ],
  "rose-bridal": [
    ["#FFF0F3", "#FAD0DB", "#F7C59F", "#C42E63"],
    ["#FFF4EC", "#F9D7C2", "#C42E63", "#3B0D1E"],
    ["#FFE8EE", "#F4B6C7", "#E0457B", "#3B0D1E"],
    ["#FFF0F3", "#F7C59F", "#C42E63", "#7A1E40"],
  ],
  "saffron-color": [
    ["#FFF8E6", "#FDE3A2", "#5B2A86", "#F4A300"],
    ["#F3EAFF", "#D9C2F2", "#F4A300", "#5B2A86"],
    ["#FFF1CC", "#F4A300", "#5B2A86", "#1F1033"],
    ["#FFF8E6", "#EBD9FF", "#F4A300", "#1F1033"],
  ],
};

export const artPalette = (slug: string, v: number) => {
  const list = ART_PALETTES[slug] ?? ART_PALETTES["ivelle-nail"];
  return list[v % list.length];
};
