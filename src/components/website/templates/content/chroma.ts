import type { L, TemplateContent } from "../types";

const t = (vi: string, cs: string, en: string, de: string): L => ({ vi, cs, en, de });

// Mẫu 7 — Chroma: nail bar trẻ trung. Xanh cobalt / vàng bơ / trắng ngà, chữ Unbounded, viền đậm
export const chroma: TemplateContent = {
  slug: "chroma-nails",
  name: "Chroma",
  motif: "nail",
  card: {
    type: t("Nail bar", "Nail bar", "Nail bar", "Nail Bar"),
    style: t(
      "Lưới bento ảnh lớn bo tròn, kem ấm, mocha và vàng bơ, chữ grotesk hiện đại. Trẻ và đang thịnh hành.",
      "Bento mřížka s velkými fotkami, teplá krémová, mocha a máslově žlutá, moderní grotesk. Mladé a v trendu.",
      "A bento grid of big rounded photos, warm cream, mocha and butter yellow, modern grotesk type.",
      "Bento-Raster mit großen runden Fotos, warmes Creme, Mocha und Buttergelb, moderne Grotesk."
    ),
  },
  tagline: t("Nail bar · Praha 7", "Nail bar · Praha 7", "Nail bar · Prague 7", "Nail Bar · Prag 7"),
  nav: {
    "": t("Trang chủ", "Úvod", "Home", "Start"),
    "dich-vu": t("Menu", "Menu", "Menu", "Menü"),
    "gioi-thieu": t("Team", "Tým", "Team", "Team"),
    "bo-suu-tap": t("Mẫu móng", "Inspirace", "Nail art", "Nail Art"),
    "dat-lich": t("Đặt lịch", "Rezervace", "Book", "Termin"),
  },
  bookLabel: t("Đặt chỗ", "Rezervovat", "Book a seat", "Platz buchen"),
  home: {
    kicker: t("Gel · Biab · Nail art", "Gel · BIAB · Nail art", "Gel · BIAB · Nail art", "Gel · BIAB · Nail Art"),
    title: t("Màu mới cho mỗi tuần", "Nová barva každý týden", "A new colour every week", "Jede Woche eine neue Farbe"),
    lead: t("Ghé nhanh, làm đẹp, đi tiếp.", "Zastavte se, nechte se nalakovat, jděte dál.", "Drop in, get polished, go.", "Reinkommen, lackieren, weiter."),
    hero: { v: 0, alt: t("Minh họa dải màu sơn móng", "Ilustrace vzorníku laků", "Illustration of polish swatches", "Illustration von Lackmustern") },
    intro: {
      title: t("Chọn màu của bạn", "Vyberte si barvu", "Pick your colour", "Wählen Sie Ihre Farbe"),
      text: t("Bấm vào màu để xem thử.", "Klikněte na barvu a podívejte se.", "Tap a colour to preview it.", "Farbe antippen und ansehen."),
    },
    highlights: [
      { title: t("Nhanh", "Rychle", "Quick", "Schnell"), text: t("Gel trong 45 phút.", "Gel za 45 minut.", "Gel in 45 minutes.", "Gel in 45 Minuten.") },
      { title: t("100+ màu", "100+ barev", "100+ shades", "100+ Farben"), text: t("Đổi theo mùa.", "Mění se se sezónou.", "Updated each season.", "Wechselt saisonal.") },
      { title: t("Nail art", "Nail art", "Nail art", "Nail Art"), text: t("Từ chấm bi đến chrome.", "Od puntíků po chrom.", "From dots to chrome.", "Von Punkten bis Chrom.") },
    ],
    featured: [
      [0, 0],
      [0, 1],
      [1, 0],
      [2, 0],
    ],
    closing: { title: t("Ghế trống hôm nay", "Volné místo ještě dnes", "Seats open today", "Heute noch frei"), text: t("Đặt chỗ trong một phút.", "Rezervace za minutu.", "Book in a minute.", "In einer Minute gebucht.") },
  },
  services: {
    title: t("Menu", "Menu", "Menu", "Menü"),
    lead: t("Giá đã gồm sơn một màu.", "Cena zahrnuje jednu barvu.", "Prices include one colour.", "Preise inklusive einer Farbe."),
    groups: [
      {
        name: t("Tay", "Ruce", "Hands", "Hände"),
        items: [
          { name: t("Gel express", "Gel express", "Gel express", "Gel Express"), min: 45, price: 650 },
          { name: t("Manicure + gel", "Manikúra + gel", "Manicure + gel", "Maniküre + Gel"), min: 70, price: 790 },
          { name: t("BIAB", "BIAB", "BIAB", "BIAB"), desc: t("Gia cố móng thật", "Zpevnění vlastních nehtů", "Strengthens natural nails", "Stärkt Naturnägel"), min: 80, price: 990 },
        ],
      },
      {
        name: t("Móng dài", "Prodloužení", "Extensions", "Verlängerung"),
        items: [
          { name: t("Đắp gel mới", "Nová modeláž", "New gel set", "Neues Gel-Set"), min: 110, price: 1190 },
          { name: t("Fill", "Doplnění", "Refill", "Auffüllen"), min: 90, price: 950 },
        ],
      },
      {
        name: t("Thêm", "Extra", "Add-ons", "Extras"),
        items: [
          { name: t("Chrome / mắt mèo", "Chrom / cat eye", "Chrome / cat eye", "Chrom / Cat Eye"), min: 10, price: 150 },
          { name: t("Nail art", "Nail art", "Nail art", "Nail Art"), desc: t("Mỗi móng", "Za nehet", "Per nail", "Pro Nagel"), min: 5, price: 40, from: true },
          { name: t("Tháo gel", "Odstranění gelu", "Gel removal", "Gel entfernen"), min: 15, price: 150 },
        ],
      },
    ],
    note: t("Đến muộn 10 phút, lịch có thể bị rút ngắn.", "Při zpoždění 10 min se může termín zkrátit.", "If you are 10 min late, the slot may be shorter.", "Bei 10 Min. Verspätung wird der Termin kürzer."),
  },
  about: {
    title: t("Team Chroma", "Tým Chroma", "Team Chroma", "Team Chroma"),
    lead: t("Ba bàn, ba người, rất nhiều màu.", "Tři stoly, tři lidi, spousta barev.", "Three desks, three people, lots of colour.", "Drei Tische, drei Leute, viel Farbe."),
    story: [t("Nail bar mở, ngồi cạnh cửa kính, nhạc vui.", "Otevřený nail bar u výlohy, dobrá hudba.", "An open nail bar by the window, good music.", "Offene Nail Bar am Fenster, gute Musik.")],
    team: [
      { name: "Linh", role: t("Nail art", "Nail art", "Nail art", "Nail Art"), bio: t("Vẽ tay, chrome, đá.", "Malba, chrom, kamínky.", "Hand-painting, chrome, gems.", "Malerei, Chrom, Steine."), visual: { v: 2, alt: t("Minh họa bảng màu", "Ilustrace palety", "Illustration of a palette", "Illustration einer Palette") } },
      { name: "Bára", role: t("Gel & BIAB", "Gel a BIAB", "Gel & BIAB", "Gel & BIAB"), bio: t("Form móng gọn, bền.", "Čistý a pevný tvar.", "Clean, strong shapes.", "Saubere, stabile Form."), visual: { v: 3, alt: t("Minh họa ba móng", "Ilustrace tří nehtů", "Illustration of three nails", "Illustration dreier Nägel") } },
      { name: "My", role: t("Móng dài", "Prodloužení", "Extensions", "Verlängerung"), bio: t("Almond, coffin, square.", "Mandle, balerína, hranaté.", "Almond, coffin, square.", "Mandel, Ballerina, eckig."), visual: { v: 1, alt: t("Minh họa móng hạnh nhân", "Ilustrace mandlového nehtu", "Illustration of an almond nail", "Illustration eines Mandelnagels") } },
    ],
    values: [
      { title: t("Vui", "Zábava", "Fun", "Spaß"), text: t("Làm móng phải vui.", "Nehty mají bavit.", "Nails should be fun.", "Nägel sollen Spaß machen.") },
      { title: t("Sạch", "Čistota", "Clean", "Sauber"), text: t("Tiệt trùng sau mỗi khách.", "Sterilizace po každém klientovi.", "Sterilised after every client.", "Nach jedem Kunden sterilisiert.") },
      { title: t("Rõ giá", "Jasné ceny", "Clear prices", "Klare Preise"), text: t("Không phụ phí bất ngờ.", "Bez skrytých příplatků.", "No surprise extras.", "Keine Überraschungen.") },
    ],
  },
  gallery: {
    title: t("Mẫu móng", "Inspirace", "Nail art", "Nail Art"),
    lead: t("Ý tưởng cho lần tới.", "Nápady na příště.", "Ideas for next time.", "Ideen für das nächste Mal."),
    items: [
      { v: 0, alt: t("Dải màu cobalt", "Kobaltové odstíny", "Cobalt swatches", "Kobalt-Töne") },
      { v: 1, alt: t("Móng hạnh nhân bóng", "Lesklá mandle", "Glossy almond", "Glänzende Mandel") },
      { v: 2, alt: t("Bảng màu chấm bi", "Puntíková paleta", "Polka-dot palette", "Punkte-Palette") },
      { v: 3, alt: t("Ba móng vàng bơ", "Tři máslově žluté", "Three butter-yellow nails", "Drei buttergelbe Nägel") },
      { v: 0, alt: t("French màu", "Barevná francouzská", "Colour French", "Farbiges French") },
      { v: 1, alt: t("Chrome", "Chrom", "Chrome", "Chrom") },
    ],
  },
  contact: {
    title: t("Đặt chỗ", "Rezervace", "Book a seat", "Platz buchen"),
    lead: t("Chọn dịch vụ, thợ và giờ.", "Vyberte službu, kosmetičku a čas.", "Pick a service, artist and time.", "Leistung, Artist und Zeit wählen."),
    address: "Ukázková 66, 170 00 Praha 7",
    hours: [
      { days: t("Thứ 2 – Thứ 7", "Po – So", "Mon – Sat", "Mo – Sa"), time: "10:00 – 20:00" },
      { days: t("Chủ nhật", "Ne", "Sun", "So"), time: "12:00 – 18:00" },
    ],
    phone: "+420 123 456 785",
    email: "hi@chroma.example",
  },
};
