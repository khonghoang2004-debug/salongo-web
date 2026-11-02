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
import { hugo, iris, kora, marelle, nova, onyx } from "./content/research";
import { withPhotos } from "./photos";

// Danh sách mẫu website. Thêm mẫu mới: tạo file nội dung trong content/, một component trong sites/,
// rồi thêm vào đây (thư viện, trang demo và ảnh xem trước đều đọc từ danh sách này).
export const TEMPLATES: TemplateContent[] = [
  marelle, hugo, onyx, iris, kora, nova, // dựng theo nghiên cứu 15 website salon Séc
  nail, hair, spa, barber, lumen, velvet, chroma, aurel,
].map(withPhotos);

/** Nhóm loại salon cho bộ lọc thư viện */
export type Category = "nail" | "hair" | "spa" | "lash" | "makeup" | "barber";
export const CATEGORY: Record<string, Category> = {
  "marelle-nails": "nail", "ivelle-nail": "nail", "chroma-nails": "nail", "nova-studio": "nail",
  "hugo-hair": "hair", "verra-hair": "hair", "lumen-hair": "hair",
  "onyx-spa": "spa", "saluna-spa": "spa", "kora-skin": "spa",
  "iris-lash": "lash", "velvet-lash": "lash",
  "aurel-beauty": "makeup",
  "brass-barber": "barber",
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
  "marelle-nails": [
    ["#DCE8E6", "#8FB0AD", "#F3D3BF", "#B8470B"],
    ["#C8DAD7", "#7FA3A0", "#FFF9E8", "#C76A3A"],
    ["#FFF9E8", "#E9DFC6", "#E2A27F", "#B8470B"],
    ["#E9DFC6", "#D7C8A6", "#B8470B", "#2B211C"],
  ],
  "hugo-hair": [
    ["#3A3A3A", "#222222", "#C9B400", "#EBEBEB"],
    ["#DDE4EC", "#B9C6D3", "#4A4A4A", "#111111"],
    ["#EBEBEB", "#D9D9D9", "#8A6A4F", "#1A1A1A"],
    ["#2E2E2E", "#1A1A1A", "#9E9E9E", "#EBEBEB"],
  ],
  "onyx-spa": [
    ["#3A342E", "#2A2622", "#C9B99E", "#E8DCC8"],
    ["#4A433B", "#2A2622", "#8C7A5E", "#E8DCC8"],
    ["#2F2B27", "#1E1B18", "#C9B99E", "#8C7A5E"],
    ["#EFE8DE", "#D8CEC0", "#8C7A5E", "#3A342E"],
  ],
  "iris-lash": [
    ["#F6E3DA", "#E7B9A8", "#C76B7E", "#1F4E4F"],
    ["#F6EFE7", "#E3D6C8", "#8E3A55", "#1F4E4F"],
    ["#E7B9A8", "#D99A8A", "#5A1E33", "#2B2226"],
    ["#F6EFE7", "#E7CDBF", "#2E6B6A", "#5A1E33"],
  ],
  "kora-skin": [
    ["#C7CDC9", "#8E9B94", "#E4E8E5", "#1E352B"],
    ["#E4E8E5", "#C7CDC9", "#566A60", "#1E352B"],
    ["#8E9B94", "#566A60", "#C7CDC9", "#E4E8E5"],
    ["#E4E8E5", "#B8C2BC", "#1E352B", "#566A60"],
  ],
  "nova-studio": [
    ["#E6DDD3", "#D2C5B5", "#D2AE62", "#33243A"],
    ["#F2EFEA", "#E6DDD3", "#7B4A7C", "#33243A"],
    ["#4A3654", "#33243A", "#D2AE62", "#E6DDD3"],
    ["#E9E2D8", "#D9CCBC", "#33243A", "#D2AE62"],
  ],
};

export const artPalette = (slug: string, v: number) => {
  const list = ART_PALETTES[slug] ?? ART_PALETTES["ivelle-nail"];
  return list[v % list.length];
};
