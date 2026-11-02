import type { L, TemplateContent, Visual } from "./types";

// Ảnh thật cho website mẫu: ảnh Unsplash (giấy phép Unsplash, dùng miễn phí, không cần ghi công; chỉ lấy ảnh
// có nhãn "free", không lấy Unsplash+). File nằm ở public/images/website/demo/<mã>.webp; mã ↔ ảnh gốc trong
// docs/website-templates/PHOTO-CREDITS.md. Ảnh chỉ minh hoạ, không phải khách hàng hay tác phẩm của salon nào.
// Mỗi mẫu: [mã ảnh, chú thích tiếng Séc]. Thứ tự gallery / team khớp với nội dung của mẫu.
type P = [string, string];
type Set = { hero: P; gallery: P[]; team: P[] };

export const PHOTOS: Record<string, Set> = {
  "ivelle-nail": {
    hero: ["n7", "Nude manikúra v jemném světle"],
    gallery: [["n6", "Nude odstíny"], ["n8", "Jemná French"], ["n10", "Minimalistická manikúra"], ["n13", "Klasická French"], ["n14", "Jemné zdobení"], ["n5", "Mauve a třpytky"]],
    team: [["n11", "Práce u stolku"], ["n9", "Vzorník laků"], ["n18", "Nástroje na manikúru"]],
  },
  "verra-hair": {
    hero: ["h17", "Účes na zvláštní příležitost"],
    gallery: [["h4", "Vlny kulmou"], ["h13", "Mytí a péče"], ["h6", "Foukaná"], ["h8", "Styling kartáčem"], ["h5", "Vrstvy"], ["h9", "Nástroje stylisty"]],
    team: [["h14", "Střih nůžkami"], ["h11", "Barva a vlny"], ["h16", "Konzultace"]],
  },
  "saluna-spa": {
    hero: ["s19", "Odpočívárna s výhledem"],
    gallery: [["s9", "Vonné tyčinky a svíčky"], ["s1", "Péče a ručníky"], ["s18", "Klidné světlo"], ["s10", "Ošetřovna"], ["s0", "Aromatický olej"], ["s11", "Relaxační zóna"]],
    team: [["s14", "Masáž"], ["s5", "Lávové kameny"]],
  },
  "brass-barber": {
    hero: ["b3", "Barberské křeslo"],
    gallery: [["b2", "Interiér barbershopu"], ["b5", "Detail kontury"], ["b4", "Fade strojkem"], ["b9", "Střih nůžkami"], ["b10", "Úprava hřebenem"], ["b7", "Nástroje barbera"]],
    team: [["b6", "Styling a foukaná"], ["b1", "Úprava vousů"], ["b0", "Holení břitvou"]],
  },
  "lumen-hair": {
    hero: ["h1", "Dlouhé vlny"],
    gallery: [["h3", "Balayage"], ["h5", "Vrstvy"], ["h15", "Blond foukaná"], ["h4", "Vlny kulmou"], ["h14", "Přesný střih"], ["h11", "Barva a lesk"]],
    team: [["h10", "Salon"], ["h2", "Řada křesel"], ["h18", "Prostor salonu"]],
  },
  "velvet-lash": {
    hero: ["l3", "Přirozené řasy"],
    gallery: [["l0", "Přirozený pohled"], ["l1", "Objem"], ["l6", "Hustý objem"], ["l8", "Řasy a pinzeta"], ["l2", "Aplikace řas"], ["l5", "Detail aplikace"]],
    team: [["l9", "Lash artist při práci"], ["l7", "Úprava obočí"]],
  },
  "chroma-nails": {
    hero: ["n1", "Barevný nail art"],
    gallery: [["n15", "Modré ombré"], ["n2", "Želvovina a černá"], ["n9", "Stěna laků"], ["n17", "Mandle s ozdobou"], ["n12", "Chrom"], ["n4", "Růžová na růžové"]],
    team: [["n16", "French s třpytkami"], ["n3", "Podzimní želvovina"], ["n11", "Gel pod UV lampou"]],
  },
  "aurel-beauty": {
    hero: ["m4", "Rozjasněná pleť"],
    gallery: [["m12", "Svatební líčení"], ["m8", "Večerní líčení"], ["m10", "Detail očí"], ["m11", "Paletky"], ["m2", "Zrcadlo se světly"], ["m1", "Štětce"]],
    team: [["m9", "Vizážistka při práci"], ["m0", "Kosmetika"]],
  },
  "marelle-nails": {
    hero: ["n12", "Chromové nehty"],
    gallery: [["n3", "Podzimní želvovina"], ["n7", "Nude manikúra"], ["n9", "Stěna laků"], ["n13", "Klasická French"], ["n5", "Mauve a třpytky"], ["n10", "Minimalistická manikúra"]],
    team: [["n11", "Gel pod UV lampou"], ["n18", "Nástroje"]],
  },
  "hugo-hair": {
    hero: ["h7", "Černobílý portrét vlasů"],
    gallery: [["h1", "Dlouhé vlny"], ["h14", "Střih nůžkami"], ["h3", "Melír"], ["h15", "Rovné vlasy"], ["h5", "Vrstvy"], ["h11", "Přirozená barva"]],
    team: [["h8", "Foukaná"], ["h4", "Kulma"], ["h9", "Nástroje"]],
  },
  "onyx-spa": {
    hero: ["s16", "Parní lázeň"],
    gallery: [["s11", "Relaxační zóna"], ["s12", "Lávové kameny"], ["s8", "Klenutý prostor"], ["s17", "Sauna"], ["s4", "Masáž obličeje"], ["s7", "Koupel"]],
    team: [["s10", "Párová suita"], ["s6", "Masážní místnost"], ["s15", "Soukromé wellness"]],
  },
  "iris-lash": {
    hero: ["l6", "Objemové řasy"],
    gallery: [["l4", "Objem 2D"], ["l3", "Laminace"], ["l7", "Úprava obočí"], ["l0", "Řasa na řasu"], ["l5", "Hollywood"], ["l2", "Aplikace"]],
    team: [["l10", "Lash artist"], ["l9", "Lash artist"], ["l7", "Brow artist"]],
  },
  "kora-skin": {
    hero: ["s13", "Ošetření obličeje"],
    gallery: [["s3", "Pleťová maska"], ["l7", "Laminace obočí"], ["m10", "Líčení"], ["s2", "Olej na masáž"], ["s10", "Ošetřovna"], ["l3", "Lash lifting"]],
    team: [["s4", "Péče o pleť"], ["l9", "Brow & lash"]],
  },
  "nova-studio": {
    hero: ["h12", "Interiér studia"],
    gallery: [["h6", "Kadeřnictví"], ["n11", "Manikúra"], ["n18", "Pedikúra"], ["s3", "Kosmetika"], ["h0", "Recepce"], ["s10", "Čekárna"]],
    team: [["h14", "Kadeřnice"], ["n8", "Manikérka"], ["s13", "Kosmetička"]],
  },
};

const cz = (s: string): L => ({ vi: s, cs: s, en: s, de: s });
const put = (v: Visual, p?: P): Visual => (p ? { ...v, photo: `/images/website/demo/${p[0]}.webp`, alt: cz(p[1]) } : v);

/** Gắn ảnh thật vào hero, gallery và đội ngũ của một mẫu (giữ nguyên hình SVG nếu thiếu ảnh) */
export function withPhotos(t: TemplateContent): TemplateContent {
  const ph = PHOTOS[t.slug];
  if (!ph) return t;
  return {
    ...t,
    home: { ...t.home, hero: put(t.home.hero, ph.hero) },
    gallery: { ...t.gallery, items: t.gallery.items.map((g, i) => put(g, ph.gallery[i])) },
    about: { ...t.about, team: t.about.team.map((m, i) => ({ ...m, visual: put(m.visual, ph.team[i]) })) },
  };
}
