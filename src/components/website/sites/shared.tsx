import { Cormorant_Garamond, Lora, Oswald, Space_Grotesk } from "next/font/google";
import { UI, dur, price } from "../templates/common";
import { artPalette, ART_PALETTES } from "../templates/registry";
import { Art } from "../templates/Art";
import { DEMO_PAGES, tr, type DemoPage, type L, type TemplateContent, type Visual } from "../templates/types";

// Chữ riêng từng mẫu. preload: false → trình duyệt chỉ tải file font khi trang demo thật sự dùng tới
export const fontNail = Cormorant_Garamond({ subsets: ["latin", "latin-ext", "vietnamese"], weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap", preload: false });
export const fontHair = Space_Grotesk({ subsets: ["latin", "latin-ext", "vietnamese"], weight: ["400", "500", "700"], display: "swap", preload: false });
export const fontSpa = Lora({ subsets: ["latin", "latin-ext", "vietnamese"], weight: ["400", "500"], style: ["normal", "italic"], display: "swap", preload: false });
export const fontBarber = Oswald({ subsets: ["latin", "latin-ext", "vietnamese"], display: "swap", preload: false }); // font biến thiên (bản chia độ đậm làm Turbopack build lỗi)

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
