// Kiểu dữ liệu chung cho 4 website mẫu. Nội dung mẫu nằm trong file TS (không trong messages/*.json)
// để chỉ trang demo đang xem mới tải chữ của mẫu đó, không đẩy vào bundle của mọi trang.

export type Loc = "vi" | "cs" | "en" | "de";
/** Một câu có đủ 4 ngôn ngữ */
export type L = Record<Loc, string>;

export const tr = (x: L, locale: string) => x[locale as Loc] ?? x.en;

/** 5 trang của mỗi mẫu (= gói website tối đa 5 trang). "" = trang chủ */
export const DEMO_PAGES = ["", "dich-vu", "gioi-thieu", "bo-suu-tap", "dat-lich"] as const;
export type DemoPage = (typeof DEMO_PAGES)[number];

export type Motif = "nail" | "hair" | "spa" | "barber";

/** Hình minh hoạ vẽ bằng SVG (thay bằng ảnh thật: điền `photo` = đường dẫn trong /public) */
export type Visual = {
  /** 0–3: chọn bố cục / sắc độ khác nhau trong bảng màu của mẫu */
  v: number;
  photo?: string;
  alt: L;
};

export type ServiceItem = {
  name: L;
  desc?: L;
  /** phút */
  min: number;
  price: number;
  /** giá "từ …" (phụ thuộc độ dài tóc / yêu cầu) */
  from?: boolean;
};

export type ServiceGroup = { name: L; note?: L; items: ServiceItem[] };

export type TeamMember = { name: string; role: L; bio: L; visual: Visual };

export type TemplateContent = {
  slug: string;
  name: string;
  motif: Motif;
  /** Thẻ trong thư viện */
  card: { type: L; style: L };
  tagline: L;
  /** Nhãn 5 trang (mỗi mẫu đặt tên theo ngành) */
  nav: Record<DemoPage, L>;
  bookLabel: L;
  home: {
    kicker: L;
    title: L;
    lead: L;
    hero: Visual;
    intro: { title: L; text: L };
    highlights: { title: L; text: L }[];
    /** chỉ số nhóm dịch vụ / mục hiển thị ở trang chủ: [nhóm, mục] */
    featured: [number, number][];
    closing: { title: L; text: L };
  };
  services: { title: L; lead: L; groups: ServiceGroup[]; note: L };
  about: { title: L; lead: L; story: L[]; team: TeamMember[]; values: { title: L; text: L }[] };
  gallery: { title: L; lead: L; items: Visual[] };
  contact: {
    title: L;
    lead: L;
    address: string;
    hours: { days: L; time: string }[];
    phone: string;
    email: string;
  };
};
