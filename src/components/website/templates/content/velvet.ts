import type { L, TemplateContent } from "../types";

const t = (vi: string, cs: string, en: string, de: string): L => ({ vi, cs, en, de });

// Mẫu 6 — Velvet: lash & brow studio. Blush / mận / ngà, Playfair nghiêng + Josefin Sans
export const velvet: TemplateContent = {
  slug: "velvet-lash",
  name: "Velvet",
  motif: "lash",
  card: {
    type: t("Mi & chân mày", "Řasy a obočí", "Lash & brow", "Wimpern & Brauen"),
    style: t(
      "Blush và mận, serif nghiêng kiểu thời trang, khung oval mềm.",
      "Pudrová a švestková, módní kurzíva, jemné oválné rámy.",
      "Blush and plum, fashion italics, soft oval frames.",
      "Blush und Pflaume, Mode-Kursive, weiche ovale Rahmen."
    ),
  },
  tagline: t("Lash & brow studio · Praha 3", "Lash & brow studio · Praha 3", "Lash & brow studio · Prague 3", "Lash & Brow Studio · Prag 3"),
  nav: {
    "": t("Trang chủ", "Úvod", "Home", "Start"),
    "dich-vu": t("Dịch vụ", "Služby", "Services", "Leistungen"),
    "gioi-thieu": t("Studio", "Studio", "Studio", "Studio"),
    "bo-suu-tap": t("Hình ảnh", "Galerie", "Gallery", "Galerie"),
    "dat-lich": t("Đặt lịch", "Rezervace", "Book", "Termin"),
  },
  bookLabel: t("Đặt lịch", "Rezervovat", "Book now", "Jetzt buchen"),
  home: {
    kicker: t("Nối mi · Lash lift · Chân mày", "Prodlužování · Lash lift · Obočí", "Extensions · Lash lift · Brows", "Extensions · Lash Lift · Brauen"),
    title: t("Ánh nhìn, chỉ cần thêm một chút", "Pohled, jen o kousek výraznější", "Your look, just a little more", "Ihr Blick, nur ein bisschen mehr"),
    lead: t("Mi và mày tự nhiên, hợp khuôn mặt bạn.", "Přirozené řasy a obočí podle tvaru obličeje.", "Natural lashes and brows, shaped to your face.", "Natürliche Wimpern und Brauen, passend zum Gesicht."),
    hero: { v: 0, alt: t("Minh họa đôi mắt và hàng mi", "Ilustrace oka a řas", "Illustration of an eye and lashes", "Illustration eines Auges mit Wimpern") },
    intro: {
      title: t("Nhẹ, tự nhiên, bền", "Lehké, přirozené, odolné", "Light, natural, lasting", "Leicht, natürlich, haltbar"),
      text: t("Chọn độ dày và độ cong theo dáng mắt.", "Hustotu i zatočení volíme podle tvaru oka.", "Volume and curl chosen for your eye shape.", "Dichte und Schwung passend zur Augenform."),
    },
    highlights: [
      { title: t("Mapping trước", "Mapping předem", "Mapping first", "Erst Mapping"), text: t("Phác dáng trước khi làm.", "Tvar navrhneme předem.", "We sketch the shape first.", "Form wird vorgezeichnet.") },
      { title: t("Keo dịu nhẹ", "Jemné lepidlo", "Gentle glue", "Sanfter Kleber"), text: t("Có lựa chọn cho mắt nhạy cảm.", "Varianta pro citlivé oči.", "Option for sensitive eyes.", "Option für empfindliche Augen.") },
      { title: t("Nằm thư giãn", "V klidu", "Lie back", "Entspannt"), text: t("Ghế êm, nhạc nhẹ.", "Pohodlné lehátko, tichá hudba.", "Comfy bed, quiet music.", "Bequeme Liege, leise Musik.") },
    ],
    featured: [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    closing: { title: t("Sẵn sàng cho ánh nhìn mới?", "Připravená na nový pohled?", "Ready for a new look?", "Bereit für einen neuen Blick?"), text: t("Chọn dịch vụ và giờ hẹn.", "Vyberte službu a čas.", "Pick a service and a time.", "Leistung und Zeit wählen.") },
  },
  services: {
    title: t("Dịch vụ & giá", "Služby a ceník", "Services & prices", "Leistungen & Preise"),
    lead: t("Thời gian là ước tính.", "Časy jsou orientační.", "Times are approximate.", "Zeiten sind Richtwerte."),
    groups: [
      {
        name: t("Mi", "Řasy", "Lashes", "Wimpern"),
        items: [
          { name: t("Nối mi classic", "Klasické prodlužování", "Classic extensions", "Klassische Extensions"), desc: t("1:1, tự nhiên", "1:1, přirozené", "1:1, natural", "1:1, natürlich"), min: 120, price: 1390 },
          { name: t("Nối mi volume", "Objemové řasy", "Volume extensions", "Volumen-Extensions"), desc: t("2D – 4D", "2D – 4D", "2D – 4D", "2D – 4D"), min: 150, price: 1690 },
          { name: t("Lash lift & nhuộm", "Lash lift s barvením", "Lash lift & tint", "Lash Lift & Färben"), min: 60, price: 990 },
          { name: t("Dặm mi (2–3 tuần)", "Doplnění (2–3 týdny)", "Refill (2–3 weeks)", "Auffüllen (2–3 Wochen)"), min: 75, price: 890, from: true },
        ],
      },
      {
        name: t("Chân mày", "Obočí", "Brows", "Brauen"),
        items: [
          { name: t("Brow lamination", "Laminace obočí", "Brow lamination", "Brow Lamination"), min: 60, price: 890 },
          { name: t("Tạo dáng & nhuộm mày", "Úprava a barvení obočí", "Brow shape & tint", "Brauen formen & färben"), min: 30, price: 390 },
          { name: t("Nhuộm mi", "Barvení řas", "Lash tint", "Wimpern färben"), min: 20, price: 250 },
        ],
      },
    ],
    note: t("Báo trước 24 giờ nếu cần đổi lịch.", "Změnu termínu hlaste 24 h předem.", "Please reschedule 24 h ahead.", "Bitte 24 h vorher verschieben."),
  },
  about: {
    title: t("Studio Velvet", "Studio Velvet", "Studio Velvet", "Studio Velvet"),
    lead: t("Hai giường, một tách trà, không vội.", "Dvě lehátka, šálek čaje, žádný spěch.", "Two beds, a cup of tea, no rush.", "Zwei Liegen, eine Tasse Tee, keine Eile."),
    story: [t("Không gian nhỏ màu hồng phấn, ánh sáng dịu cho mắt.", "Malý pudrový prostor s jemným světlem.", "A small blush-toned room with soft light.", "Ein kleiner Raum in Blush, sanftes Licht.")],
    team: [
      { name: "Anh", role: t("Lash artist", "Lash artist", "Lash artist", "Lash Artist"), bio: t("Volume nhẹ, dáng mắt mèo.", "Lehký objem, cat eye.", "Light volume, cat-eye shapes.", "Leichtes Volumen, Cat Eye."), visual: { v: 2, alt: t("Minh họa khung oval và mi", "Ilustrace oválu s řasami", "Illustration of an oval with lashes", "Illustration eines Ovals mit Wimpern") } },
      { name: "Klára", role: t("Brow artist", "Brow artist", "Brow artist", "Brow Artist"), bio: t("Lamination và dáng mày tự nhiên.", "Laminace a přirozený tvar.", "Lamination and natural shapes.", "Lamination und natürliche Formen."), visual: { v: 1, alt: t("Minh họa dáng chân mày", "Ilustrace obočí", "Illustration of a brow", "Illustration einer Braue") } },
    ],
    values: [
      { title: t("Tự nhiên", "Přirozenost", "Natural", "Natürlich"), text: t("Hợp khuôn mặt, không quá tay.", "Podle obličeje, bez přehánění.", "Suited to you, never overdone.", "Passend, nie übertrieben.") },
      { title: t("Vệ sinh", "Hygiena", "Hygiene", "Hygiene"), text: t("Dụng cụ dùng một lần.", "Jednorázové pomůcky.", "Single-use tools.", "Einwegmaterial.") },
      { title: t("Hướng dẫn", "Péče doma", "Aftercare", "Pflege"), text: t("Cách giữ mi lâu hơn.", "Jak řasy udržet déle.", "How to make them last.", "So halten sie länger.") },
    ],
  },
  gallery: {
    title: t("Hình ảnh", "Galerie", "Gallery", "Galerie"),
    lead: t("Mi, mày và không gian.", "Řasy, obočí a prostor.", "Lashes, brows and the space.", "Wimpern, Brauen und Raum."),
    items: [
      { v: 0, alt: t("Mi volume tự nhiên", "Přirozený objem", "Natural volume lashes", "Natürliches Volumen") },
      { v: 1, alt: t("Chân mày lamination", "Laminované obočí", "Laminated brows", "Laminierte Brauen") },
      { v: 2, alt: t("Dáng mắt mèo", "Cat eye", "Cat-eye shape", "Cat-Eye-Form") },
      { v: 3, alt: t("Mi classic", "Klasické řasy", "Classic lashes", "Klassische Wimpern") },
      { v: 1, alt: t("Mày tự nhiên", "Přirozené obočí", "Natural brows", "Natürliche Brauen") },
      { v: 0, alt: t("Lash lift", "Lash lift", "Lash lift", "Lash Lift") },
    ],
  },
  contact: {
    title: t("Đặt lịch", "Rezervace", "Booking", "Termin"),
    lead: t("Chọn dịch vụ và giờ, chúng tôi xác nhận lại.", "Vyberte službu a čas, potvrdíme.", "Pick a service and time, we will confirm.", "Leistung und Zeit wählen, wir bestätigen."),
    address: "Ukázková 9, 130 00 Praha 3",
    hours: [
      { days: t("Thứ 2 – Thứ 6", "Po – Pá", "Mon – Fri", "Mo – Fr"), time: "9:00 – 19:00" },
      { days: t("Thứ 7", "So", "Sat", "Sa"), time: "9:00 – 14:00" },
    ],
    phone: "+420 123 456 784",
    email: "hello@velvet.example",
  },
};
