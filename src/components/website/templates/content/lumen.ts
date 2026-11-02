import type { L, TemplateContent } from "../types";

const t = (vi: string, cs: string, en: string, de: string): L => ({ vi, cs, en, de });

// Mẫu 5 — Maison Lumen: hair couture kiểu tạp chí thời trang. Bảng giá theo cấp thợ (giá "từ", minh hoạ)
export const lumen: TemplateContent = {
  slug: "lumen-hair",
  name: "Maison Lumen",
  motif: "hair",
  card: {
    type: t("Hair couture", "Kadeřnický atelier", "Hair couture", "Hair Couture"),
    style: t(
      "Phong cách tạp chí thời trang: serif tương phản cao, đen trên ngà, bảng giá theo cấp thợ.",
      "Styl módního magazínu: kontrastní patkové písmo, černá na slonové kosti, ceník podle úrovně stylisty.",
      "Fashion-magazine style: high-contrast serif, black on ivory, prices by stylist level.",
      "Im Stil eines Modemagazins: kontrastreiche Serifen, Schwarz auf Elfenbein, Preise nach Stylist-Level."
    ),
  },
  tagline: t("Hair couture · Praha 1", "Hair couture · Praha 1", "Hair couture · Prague 1", "Hair Couture · Prag 1"),
  nav: {
    "": t("Trang chủ", "Úvod", "Home", "Start"),
    "dich-vu": t("Bảng giá", "Ceník", "Prices", "Preise"),
    "gioi-thieu": t("Nhà tạo mẫu", "Stylisté", "Stylists", "Stylisten"),
    "bo-suu-tap": t("Lookbook", "Lookbook", "Lookbook", "Lookbook"),
    "dat-lich": t("Đặt lịch", "Rezervace", "Book", "Termin"),
  },
  bookLabel: t("Đặt lịch", "Rezervovat", "Book now", "Jetzt buchen"),
  home: {
    kicker: t("Bộ sưu tập Thu – Đông", "Kolekce podzim – zima", "Autumn – Winter collection", "Kollektion Herbst – Winter"),
    title: t("Tóc là trang phục bạn mặc mỗi ngày", "Vlasy jsou outfit, který nosíte každý den", "Hair is the outfit you wear every day", "Haare sind das Outfit, das Sie täglich tragen"),
    lead: t("Cắt, màu và tạo kiểu theo tinh thần thời trang.", "Střih, barva a styling v duchu módy.", "Cut, colour and styling with a fashion eye.", "Schnitt, Farbe und Styling mit Mode-Blick."),
    hero: { v: 3, alt: t("Minh họa mái tóc dài uốn lượn", "Ilustrace dlouhých vlnitých vlasů", "Illustration of long flowing hair", "Illustration langer, fließender Haare") },
    intro: {
      title: t("Một kiểu tóc, một câu chuyện", "Jeden účes, jeden příběh", "One cut, one story", "Ein Schnitt, eine Geschichte"),
      text: t(
        "Mỗi buổi hẹn bắt đầu bằng vài phút trao đổi: bạn mặc gì, sống thế nào, muốn được nhìn ra sao.",
        "Každá návštěva začíná pár minutami rozhovoru: co nosíte, jak žijete a jak chcete působit.",
        "Every visit starts with a few minutes of talk: what you wear, how you live, how you want to look.",
        "Jeder Termin beginnt mit ein paar Minuten Gespräch: was Sie tragen, wie Sie leben, wie Sie wirken möchten."
      ),
    },
    highlights: [
      { title: t("Ba cấp thợ", "Tři úrovně", "Three levels", "Drei Level"), text: t("Chọn theo ngân sách và kinh nghiệm.", "Podle rozpočtu a zkušeností.", "Choose by budget and experience.", "Nach Budget und Erfahrung." ) },
      { title: t("Màu theo mùa", "Sezónní barvy", "Seasonal colour", "Saisonfarben"), text: t("Bảng màu đổi theo từng bộ sưu tập.", "Paleta se mění s kolekcí.", "The palette changes each collection.", "Die Palette wechselt mit der Kollektion.") },
      { title: t("Tạo kiểu sự kiện", "Styling na akce", "Event styling", "Event-Styling"), text: t("Cưới, chụp ảnh, dạ tiệc.", "Svatby, focení, večery.", "Weddings, shoots, evenings.", "Hochzeit, Shooting, Abend.") },
    ],
    featured: [
      [0, 0],
      [1, 1],
      [2, 1],
    ],
    closing: { title: t("Hẹn bạn ở ghế số một", "Uvidíme se v křesle", "See you in the chair", "Wir sehen uns im Stuhl"), text: t("Chọn dịch vụ, thợ và giờ.", "Vyberte službu, stylistu a čas.", "Choose a service, stylist and time.", "Leistung, Stylist und Zeit wählen.") },
  },
  services: {
    title: t("Bảng giá", "Ceník", "Price list", "Preisliste"),
    lead: t("Giá từ, theo độ dài tóc và cấp thợ.", "Ceny od, podle délky vlasů a úrovně stylisty.", "Prices from, by hair length and stylist level.", "Preise ab, nach Haarlänge und Stylist-Level."),
    tiers: [t("Stylist", "Stylista", "Stylist", "Stylist"), t("Senior", "Senior", "Senior", "Senior"), t("Art director", "Art director", "Art director", "Art Director")],
    groups: [
      {
        name: t("Cắt", "Střih", "Cut", "Schnitt"),
        items: [
          { name: t("Cắt nữ & sấy", "Dámský střih a foukaná", "Women's cut & blow-dry", "Damenschnitt & Föhnen"), min: 75, price: 990, from: true, tiers: [990, 1290, 1690] },
          { name: t("Cắt nam", "Pánský střih", "Men's cut", "Herrenschnitt"), min: 45, price: 690, from: true, tiers: [690, 890, 1190] },
          { name: t("Tỉa mái", "Zastřižení ofiny", "Fringe trim", "Pony schneiden"), min: 15, price: 250, tiers: [250, 290, 350] },
        ],
      },
      {
        name: t("Màu", "Barva", "Colour", "Farbe"),
        items: [
          { name: t("Nhuộm một màu", "Barvení jednou barvou", "Single colour", "Einfache Coloration"), min: 100, price: 1690, from: true, tiers: [1690, 1990, 2490] },
          { name: t("Balayage", "Balayage", "Balayage", "Balayage"), min: 200, price: 3490, from: true, tiers: [3490, 3990, 4790] },
          { name: t("Gloss / toner", "Gloss / tónování", "Gloss / toner", "Glossing / Toner"), min: 40, price: 790, from: true, tiers: [790, 890, 990] },
        ],
      },
      {
        name: t("Tạo kiểu", "Styling", "Styling", "Styling"),
        items: [
          { name: t("Sấy tạo kiểu", "Foukaná", "Blow-dry", "Föhnen"), min: 45, price: 690, from: true, tiers: [690, 790, 990] },
          { name: t("Búi / tóc sự kiện", "Účes na akci", "Updo / event hair", "Hochsteckfrisur"), min: 75, price: 1490, from: true, tiers: [1490, 1690, 1990] },
        ],
      },
    ],
    note: t("Giá cuối cùng báo trước khi làm.", "Konečnou cenu řekneme předem.", "You get the final price before we start.", "Den Endpreis nennen wir vorher."),
  },
  about: {
    title: t("Nhà tạo mẫu", "Stylisté", "Stylists", "Stylisten"),
    lead: t("Ba người, ba gu thẩm mỹ.", "Tři lidé, tři rukopisy.", "Three people, three signatures.", "Drei Menschen, drei Handschriften."),
    story: [
      t("Studio nhỏ, ánh sáng tự nhiên, gương lớn và nhạc nhẹ.", "Malé studio, denní světlo, velká zrcadla, tichá hudba.", "A small studio, daylight, big mirrors, quiet music.", "Kleines Studio, Tageslicht, große Spiegel, leise Musik."),
    ],
    team: [
      { name: "Eliška", role: t("Art director", "Art director", "Art director", "Art Director"), bio: t("Cắt bob và tóc ngắn có cấu trúc.", "Strukturované boby a krátké střihy.", "Structured bobs and short cuts.", "Strukturierte Bobs und Kurzhaar."), visual: { v: 1, alt: t("Minh họa gương tròn", "Ilustrace zrcadla", "Illustration of a mirror", "Illustration eines Spiegels") } },
      { name: "Hoa", role: t("Senior · màu", "Senior · barvy", "Senior · colour", "Senior · Farbe"), bio: t("Balayage mềm, tông lạnh.", "Jemný balayage, studené tóny.", "Soft balayage, cool tones.", "Sanftes Balayage, kühle Töne."), visual: { v: 0, alt: t("Minh họa lọn tóc", "Ilustrace pramenů", "Illustration of strands", "Illustration von Strähnen") } },
      { name: "Jan", role: t("Stylist", "Stylista", "Stylist", "Stylist"), bio: t("Tóc nam và tạo kiểu sự kiện.", "Pánské střihy a styling na akce.", "Men's cuts and event styling.", "Herrenschnitte und Event-Styling."), visual: { v: 2, alt: t("Minh họa lược", "Ilustrace hřebenu", "Illustration of a comb", "Illustration eines Kamms") } },
    ],
    values: [
      { title: t("Chính xác", "Přesnost", "Precision", "Präzision"), text: t("Từng milimet.", "Na milimetr.", "To the millimetre.", "Auf den Millimeter.") },
      { title: t("Thẳng thắn", "Upřímnost", "Honesty", "Ehrlichkeit"), text: t("Nói rõ điều hợp với bạn.", "Řekneme, co vám sluší.", "We tell you what suits you.", "Wir sagen, was Ihnen steht.") },
      { title: t("Theo mùa", "Sezónnost", "Seasonal", "Saisonal"), text: t("Cập nhật xu hướng mỗi mùa.", "Trendy každou sezónu.", "New ideas every season.", "Neue Ideen jede Saison.") },
    ],
  },
  gallery: {
    title: t("Lookbook", "Lookbook", "Lookbook", "Lookbook"),
    lead: t("Thu – Đông", "Podzim – zima", "Autumn – Winter", "Herbst – Winter"),
    items: [
      { v: 3, alt: t("Look 01 · tóc dài uốn lượn", "Look 01 · dlouhé vlny", "Look 01 · long waves", "Look 01 · lange Wellen") },
      { v: 1, alt: t("Look 02 · bob cấu trúc", "Look 02 · strukturovaný bob", "Look 02 · structured bob", "Look 02 · strukturierter Bob") },
      { v: 0, alt: t("Look 03 · balayage lạnh", "Look 03 · studený balayage", "Look 03 · cool balayage", "Look 03 · kühles Balayage") },
      { v: 2, alt: t("Look 04 · thẳng mượt", "Look 04 · hladké vlasy", "Look 04 · sleek", "Look 04 · glatt") },
      { v: 0, alt: t("Look 05 · tóc lớp", "Look 05 · vrstvy", "Look 05 · layers", "Look 05 · Stufen") },
      { v: 3, alt: t("Look 06 · búi thấp", "Look 06 · nízký drdol", "Look 06 · low chignon", "Look 06 · tiefer Dutt") },
    ],
  },
  contact: {
    title: t("Đặt lịch", "Rezervace", "Booking", "Termin"),
    lead: t("Chọn dịch vụ, thợ và giờ.", "Vyberte službu, stylistu a čas.", "Choose a service, stylist and time.", "Leistung, Stylist und Zeit wählen."),
    address: "Ukázková 21, 110 00 Praha 1",
    hours: [
      { days: t("Thứ 3 – Thứ 7", "Út – So", "Tue – Sat", "Di – Sa"), time: "10:00 – 20:00" },
    ],
    phone: "+420 123 456 783",
    email: "atelier@lumen.example",
  },
};
