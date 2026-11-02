import { Cormorant_Garamond, EB_Garamond, Fraunces, Geologica, Hanken_Grotesk, Jost, Newsreader, Plus_Jakarta_Sans, Source_Serif_4, Tenor_Sans, Inter_Tight, Josefin_Sans, Lora, Manrope, Montserrat, Noto_Serif_Display, Oswald, Playfair_Display, Space_Grotesk, Unbounded } from "next/font/google";
import { UI, dur, price } from "../templates/common";
import { artPalette, ART_PALETTES } from "../templates/registry";
import { Art } from "../templates/Art";
import { DEMO_PAGES, tr, type DemoPage, type L, type TemplateContent, type Visual } from "../templates/types";

// Chữ riêng từng mẫu. Chỉ dùng font biến thiên (không liệt kê độ đậm): bản chia độ đậm thỉnh thoảng làm Turbopack
// build lỗi ("next/font/google queries have exactly one entry"). preload: false → trình duyệt chỉ tải file font khi trang demo thật sự dùng tới
export const fontNail = Cormorant_Garamond({ subsets: ["latin", "latin-ext", "vietnamese"], style: ["normal", "italic"], display: "swap", preload: false });
export const fontHair = Space_Grotesk({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false });
export const fontSpa = Lora({ subsets: ["latin", "latin-ext", "vietnamese"], style: ["normal", "italic"], display: "swap", preload: false });
export const fontBarber = Oswald({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false }); // font biến thiên (bản chia độ đậm làm Turbopack build lỗi)
// 4 mẫu thời trang: font biến thiên (không liệt kê độ đậm). next/font cần tham số viết thẳng, không dùng biến
export const fontLumen = Noto_Serif_Display({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false, style: ["normal", "italic"] });
export const fontLumenSans = Inter_Tight({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false });
export const fontVelvet = Playfair_Display({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false, style: ["normal", "italic"] });
export const fontVelvetSans = Josefin_Sans({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false });
export const fontChroma = Unbounded({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false });
export const fontChromaSans = Manrope({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false });
export const fontAurel = Fraunces({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false, style: ["normal", "italic"] });
export const fontAurelSans = Montserrat({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false });

// 6 mẫu dựng theo nghiên cứu 15 website salon Séc (docs/website-templates/RESEARCH-2026-11.md)
export const fontMarelle = Fraunces({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false, axes: ["SOFT", "opsz"] });
export const fontMarelleSans = Plus_Jakarta_Sans({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false });
export const fontHugo = Jost({ subsets: ["latin", "latin-ext"], display: "swap", preload: false }); // Jost không có bộ tiếng Việt; demo luôn tiếng Séc
export const fontNova = Newsreader({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false, style: ["normal", "italic"] });
export const fontIris = Source_Serif_4({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false });
export const fontIrisSans = Hanken_Grotesk({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false });
export const fontKora = Geologica({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false });
export const fontOnyx = Tenor_Sans({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, weight: "400" });
export const fontOnyxSerif = EB_Garamond({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false, style: ["normal", "italic"] });

export type SiteProps = { t: TemplateContent; page: DemoPage; locale: string };

/** Hàm tiện ích cho một trang demo: dịch chữ, link nội bộ, ảnh, dữ liệu form */
export function site({ t, page, locale }: SiteProps) {
  const l = (x: L) => tr(x, locale);
  const href = (p: DemoPage) => `/website/mau/${t.slug}${p ? `/${p}` : ""}`;
  const nav = DEMO_PAGES.map((p) => ({ href: href(p), label: l(t.nav[p]), active: p === page }));
  const art = (vis: Visual, className = "", priority = false) => (
    <Art motif={t.motif} v={vis.v} palette={artPalette(t.slug, vis.v)} photo={vis.photo} alt={l(vis.alt)} className={className} priority={priority} />
  );
  const featured = t.home.featured.map(([g, i]) => t.services.groups[g].items[i]);
  const form = {
    services: t.services.groups.map((g) => ({ group: l(g.name), items: g.items.map((s) => l(s.name)) })),
    labels: Object.fromEntries(Object.entries(UI.form).map(([k, v]) => [k, l(v)])) as Record<keyof typeof UI.form, string>,
  };
  const gallery = {
    items: t.gallery.items.map((g) => ({ v: g.v, alt: l(g.alt), photo: g.photo })),
    palettes: ART_PALETTES[t.slug],
    labels: { open: l(UI.openImage), close: l(UI.close), prev: l(UI.prev), next: l(UI.next) },
  };
  return {
    l,
    href,
    nav,
    art,
    featured,
    form,
    gallery,
    ui: (k: keyof typeof UI) => l(UI[k] as L),
    dur: (m: number) => dur(m, locale),
    price: (n: number, from?: boolean) => price(n, locale, from),
  };
}
