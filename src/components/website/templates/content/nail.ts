import type { TemplateContent } from "../types";

// Mẫu 1 — Nail studio thanh lịch. Giá minh hoạ theo khảo sát Praha 11/2026 (docs/website-templates/PRICE-RESEARCH.md)
export const nail: TemplateContent = {
  slug: "ivelle-nail",
  name: "Ivelle",
  motif: "nail",
  card: {
    type: { vi: "Nail studio", cs: "Nehtové studio", en: "Nail studio", de: "Nagelstudio" },
    style: {
      vi: "Ivory, nude và champagne, chữ serif mảnh, nhiều khoảng trắng. Hợp tiệm nail chuộng sự chỉn chu.",
      cs: "Slonová kost, nude a šampaň, jemné patkové písmo a hodně prostoru. Pro studia, která si zakládají na preciznosti.",
      en: "Ivory, nude and champagne, a fine serif and generous white space. For studios that care about detail.",
      de: "Elfenbein, Nude und Champagner, feine Serifenschrift, viel Weißraum. Für Studios mit Liebe zum Detail.",
    },
  },
  tagline: { vi: "Nail atelier · Praha 2", cs: "Nehtový atelier · Praha 2", en: "Nail atelier · Prague 2", de: "Nagelatelier · Prag 2" },
  nav: {
    "": { vi: "Trang chủ", cs: "Úvod", en: "Home", de: "Start" },
    "dich-vu": { vi: "Dịch vụ & giá", cs: "Služby a ceník", en: "Services & prices", de: "Leistungen & Preise" },
    "gioi-thieu": { vi: "Về studio", cs: "O studiu", en: "The studio", de: "Das Studio" },
    "bo-suu-tap": { vi: "Bộ sưu tập", cs: "Kolekce", en: "Collection", de: "Kollektion" },
    "dat-lich": { vi: "Đặt lịch", cs: "Rezervace", en: "Book", de: "Termin" },
  },
  bookLabel: { vi: "Đặt lịch hẹn", cs: "Rezervovat termín", en: "Book an appointment", de: "Termin buchen" },
  home: {
    kicker: { vi: "Nail atelier ở Praha 2", cs: "Nehtový atelier v Praze 2", en: "A nail atelier in Prague 2", de: "Ein Nagelatelier in Prag 2" },
    title: {
      vi: "Bộ móng tinh tế, làm chậm rãi và chuẩn xác",
      cs: "Jemné nehty, dělané v klidu a s přesností",
      en: "Refined nails, done slowly and precisely",
      de: "Feine Nägel, in Ruhe und mit Präzision",
    },
    lead: {
      vi: "Manicure, sơn gel và đắp móng trong không gian yên tĩnh. Mỗi lịch hẹn dành trọn cho một khách.",
      cs: "Manikúra, gel lak a modeláž v klidném prostředí. Každý termín patří jen jedné klientce.",
      en: "Manicures, gel polish and extensions in a quiet space. Every appointment is for one client only.",
      de: "Maniküre, Gellack und Modellage in ruhiger Atmosphäre. Jeder Termin gehört nur einer Kundin.",
    },
    hero: { v: 1, alt: { vi: "Minh họa móng sơn gel tông nude", cs: "Ilustrace nehtů s nude gel lakem", en: "Illustration of nude gel nails", de: "Illustration von Nägeln mit Nude-Gellack" } },
    intro: {
      title: { vi: "Ít màu hơn, chăm chút hơn", cs: "Méně barev, více péče", en: "Fewer colours, more care", de: "Weniger Farben, mehr Sorgfalt" },
      text: {
        vi: "Chúng tôi chọn một bảng màu nhỏ, hợp nhiều tông da, và dành thời gian cho phần quan trọng nhất: da quanh móng, form móng và lớp sơn mỏng đều.",
        cs: "Pracujeme s menší paletou odstínů, která sedí většině tónů pleti, a čas věnujeme tomu podstatnému: kůžičkám, tvaru nehtu a tenké, rovnoměrné vrstvě.",
        en: "We keep a small palette that suits most skin tones and spend the time on what matters: cuticles, nail shape and a thin, even coat.",
        de: "Wir arbeiten mit einer kleinen Farbpalette für fast jeden Hautton und nehmen uns Zeit für das Wesentliche: Nagelhaut, Form und eine dünne, gleichmäßige Schicht.",
      },
    },
    highlights: [
      {
        title: { vi: "Một khách mỗi lịch", cs: "Jedna klientka na termín", en: "One client per slot", de: "Eine Kundin pro Termin" },
        text: { vi: "Không làm chồng lịch, bạn không phải chờ.", cs: "Termíny se nepřekrývají, nečekáte.", en: "No overlapping bookings, no waiting.", de: "Keine Überschneidungen, keine Wartezeit." },
      },
      {
        title: { vi: "Dụng cụ tiệt trùng", cs: "Sterilní nástroje", en: "Sterilised tools", de: "Sterile Instrumente" },
        text: { vi: "Dụng cụ kim loại được tiệt trùng sau mỗi khách.", cs: "Kovové nástroje sterilizujeme po každé klientce.", en: "Metal tools are sterilised after every client.", de: "Metallinstrumente werden nach jeder Kundin sterilisiert." },
      },
      {
        title: { vi: "Tư vấn màu", cs: "Poradíme s odstínem", en: "Shade advice", de: "Farbberatung" },
        text: { vi: "Chưa chọn được màu? Chúng tôi gợi ý theo tông da và trang phục.", cs: "Nevíte, jaký odstín? Poradíme podle pleti i šatníku.", en: "Not sure which shade? We suggest one for your skin tone and wardrobe.", de: "Unsicher bei der Farbe? Wir beraten passend zu Hautton und Garderobe." },
      },
    ],
    featured: [
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 0],
    ],
    closing: {
      title: { vi: "Sẵn sàng cho bộ móng mới?", cs: "Připravená na nové nehty?", en: "Ready for new nails?", de: "Bereit für neue Nägel?" },
      text: { vi: "Chọn dịch vụ và giờ phù hợp, chúng tôi giữ chỗ cho bạn.", cs: "Vyberte službu a čas, místo vám podržíme.", en: "Pick a service and a time, we will keep the slot for you.", de: "Wählen Sie Leistung und Uhrzeit, wir halten den Platz frei." },
    },
  },
  services: {
    title: { vi: "Dịch vụ & bảng giá", cs: "Služby a ceník", en: "Services & prices", de: "Leistungen & Preise" },
    lead: {
      vi: "Thời gian là ước tính. Trang trí móng tính thêm theo từng móng.",
      cs: "Časy jsou orientační. Zdobení účtujeme za každý nehet zvlášť.",
      en: "Times are approximate. Nail art is charged per nail.",
      de: "Zeiten sind Richtwerte. Nageldesign wird pro Nagel berechnet.",
    },
    groups: [
      {
        name: { vi: "Manicure", cs: "Manikúra", en: "Manicure", de: "Maniküre" },
        items: [
          { name: { vi: "Manicure cổ điển", cs: "Klasická manikúra", en: "Classic manicure", de: "Klassische Maniküre" }, desc: { vi: "Tạo form, chăm sóc da, dưỡng tay", cs: "Tvar, péče o kůžičku, krém na ruce", en: "Shaping, cuticle care, hand cream", de: "Formen, Nagelhautpflege, Handcreme" }, min: 45, price: 490 },
          { name: { vi: "Manicure + sơn gel", cs: "Manikúra s gel lakem", en: "Manicure with gel polish", de: "Maniküre mit Gellack" }, desc: { vi: "Bền màu 2–3 tuần", cs: "Výdrž 2–3 týdny", en: "Lasts 2–3 weeks", de: "Hält 2–3 Wochen" }, min: 75, price: 790 },
          { name: { vi: "Manicure Nhật (P-Shine)", cs: "Japonská manikúra (P-Shine)", en: "Japanese manicure (P-Shine)", de: "Japanische Maniküre (P-Shine)" }, desc: { vi: "Đánh bóng tự nhiên, không sơn", cs: "Přirozený lesk bez laku", en: "Natural shine, no polish", de: "Natürlicher Glanz ohne Lack" }, min: 50, price: 590 },
        ],
      },
      {
        name: { vi: "Móng gel", cs: "Gelové nehty", en: "Gel nails", de: "Gelnägel" },
        items: [
          { name: { vi: "Đắp móng gel mới", cs: "Nová modeláž gel", en: "New gel set", de: "Neumodellage Gel" }, desc: { vi: "Gồm sơn một màu", cs: "Včetně jedné barvy", en: "Includes one colour", de: "Inklusive einer Farbe" }, min: 120, price: 1290 },
          { name: { vi: "Fill móng gel", cs: "Doplnění gelových nehtů", en: "Gel refill", de: "Gel-Auffüllen" }, desc: { vi: "Sau 3–4 tuần", cs: "Po 3–4 týdnech", en: "After 3–4 weeks", de: "Nach 3–4 Wochen" }, min: 100, price: 990 },
          { name: { vi: "Tháo gel", cs: "Odstranění gelu", en: "Gel removal", de: "Gel entfernen" }, min: 20, price: 190 },
        ],
      },
      {
        name: { vi: "Chân & trang trí", cs: "Pedikúra a zdobení", en: "Feet & nail art", de: "Füße & Nageldesign" },
        items: [
          { name: { vi: "Pedicure + sơn gel", cs: "Pedikúra s gel lakem", en: "Pedicure with gel polish", de: "Pediküre mit Gellack" }, min: 75, price: 890 },
          { name: { vi: "Pedicure cổ điển", cs: "Klasická pedikúra", en: "Classic pedicure", de: "Klassische Pediküre" }, min: 60, price: 690 },
          { name: { vi: "Trang trí móng", cs: "Zdobení", en: "Nail art", de: "Nageldesign" }, desc: { vi: "Mỗi móng", cs: "Za nehet", en: "Per nail", de: "Pro Nagel" }, min: 5, price: 30, from: true },
        ],
      },
    ],
    note: {
      vi: "Vui lòng báo trước 24 giờ nếu bạn cần đổi hoặc hủy lịch.",
      cs: "Změnu nebo zrušení termínu prosíme hlaste 24 hodin předem.",
      en: "Please let us know 24 hours ahead if you need to change or cancel.",
      de: "Bitte sagen Sie Termine 24 Stunden vorher ab oder verschieben Sie sie.",
    },
  },
  about: {
    title: { vi: "Một studio nhỏ, ba người thợ", cs: "Malé studio, tři nehtové designérky", en: "A small studio, three nail artists", de: "Ein kleines Studio, drei Nageldesignerinnen" },
    lead: {
      vi: "Ivelle được mở với một ý tưởng đơn giản: làm ít khách hơn để làm mỗi bộ móng kỹ hơn.",
      cs: "Ivelle vzniklo z jednoduché myšlenky: méně klientek denně, aby každé nehty byly pečlivější.",
      en: "Ivelle started with a simple idea: fewer clients a day, so every set gets more care.",
      de: "Ivelle entstand aus einer einfachen Idee: weniger Kundinnen am Tag, dafür mehr Sorgfalt.",
    },
    story: [
      {
        vi: "Studio nằm trên tầng một của một tòa nhà cũ, ánh sáng tự nhiên chiếu vào bàn làm móng suốt buổi sáng.",
        cs: "Studio je v prvním patře starého domu a pracovní stoly mají celé dopoledne denní světlo.",
        en: "The studio is on the first floor of an old building, with daylight on the tables all morning.",
        de: "Das Studio liegt im ersten Stock eines Altbaus, die Arbeitstische haben den ganzen Vormittag Tageslicht.",
      },
      {
        vi: "Chúng tôi dùng gel và sơn từ các hãng chuyên nghiệp, giải thích rõ từng bước và không bán thêm dịch vụ bạn không cần.",
        cs: "Používáme profesionální gely a laky, vysvětlíme každý krok a nenabízíme služby, které nepotřebujete.",
        en: "We use professional gels and polishes, explain each step and never upsell what you do not need.",
        de: "Wir verwenden professionelle Gele und Lacke, erklären jeden Schritt und verkaufen nichts, was Sie nicht brauchen.",
      },
    ],
    team: [
      { name: "Linh", role: { vi: "Nail artist, gel & form móng", cs: "Modeláž a tvar nehtů", en: "Gel & nail shaping", de: "Gel & Nagelform" }, bio: { vi: "Thích form hạnh nhân và những bộ móng tối giản.", cs: "Má ráda mandlový tvar a minimalistické nehty.", en: "Loves almond shapes and minimal sets.", de: "Liebt Mandelform und minimalistische Nägel." }, visual: { v: 3, alt: { vi: "Minh họa móng form hạnh nhân", cs: "Ilustrace mandlových nehtů", en: "Illustration of almond nails", de: "Illustration von Mandelnägeln" } } },
      { name: "Tereza", role: { vi: "Manicure & chăm sóc da tay", cs: "Manikúra a péče o ruce", en: "Manicure & hand care", de: "Maniküre & Handpflege" }, bio: { vi: "Kỹ lưỡng với phần da quanh móng.", cs: "Pečlivá na kůžičku do posledního detailu.", en: "Meticulous about cuticle work.", de: "Sehr genau bei der Nagelhaut." }, visual: { v: 0, alt: { vi: "Minh họa bảng màu sơn", cs: "Ilustrace vzorníku laků", en: "Illustration of polish swatches", de: "Illustration von Lackmustern" } } },
      { name: "Mai", role: { vi: "Trang trí móng", cs: "Zdobení nehtů", en: "Nail art", de: "Nageldesign" }, bio: { vi: "Vẽ tay chi tiết nhỏ, tông màu nhẹ.", cs: "Jemná ruční malba v tlumených tónech.", en: "Fine hand-painted details in soft tones.", de: "Feine Handmalerei in sanften Tönen." }, visual: { v: 2, alt: { vi: "Minh họa bảng màu tròn", cs: "Ilustrace palety barev", en: "Illustration of a colour palette", de: "Illustration einer Farbpalette" } } },
    ],
    values: [
      { title: { vi: "Đúng giờ", cs: "Dochvilnost", en: "On time", de: "Pünktlich" }, text: { vi: "Lịch hẹn bắt đầu đúng giờ đã đặt.", cs: "Termín začíná v rezervovaný čas.", en: "Appointments start at the booked time.", de: "Termine beginnen zur gebuchten Zeit." } },
      { title: { vi: "Rõ giá", cs: "Jasné ceny", en: "Clear prices", de: "Klare Preise" }, text: { vi: "Báo giá trước khi làm nếu có phát sinh.", cs: "Případné příplatky řekneme předem.", en: "Any extras are quoted before we start.", de: "Aufpreise nennen wir vorher." } },
      { title: { vi: "Sạch sẽ", cs: "Čistota", en: "Clean", de: "Sauber" }, text: { vi: "Bàn và dụng cụ được vệ sinh sau mỗi khách.", cs: "Stůl i nástroje čistíme po každé klientce.", en: "Tables and tools are cleaned after every client.", de: "Tisch und Werkzeug werden nach jeder Kundin gereinigt." } },
    ],
  },
  gallery: {
    title: { vi: "Bộ sưu tập", cs: "Kolekce", en: "Collection", de: "Kollektion" },
    lead: { vi: "Một vài tông màu và kiểu móng được yêu thích theo mùa.", cs: "Oblíbené odstíny a tvary podle sezóny.", en: "A few seasonal favourite shades and shapes.", de: "Einige saisonale Lieblingsfarben und -formen." },
    items: [
      { v: 1, alt: { vi: "Móng hạnh nhân màu nude", cs: "Mandlové nehty v nude", en: "Almond nails in nude", de: "Mandelnägel in Nude" } },
      { v: 0, alt: { vi: "Bảng màu sơn mùa thu", cs: "Podzimní vzorník laků", en: "Autumn polish swatches", de: "Herbstliche Lackmuster" } },
      { v: 3, alt: { vi: "Ba móng tông champagne", cs: "Tři nehty v šampaňské", en: "Three champagne nails", de: "Drei Nägel in Champagner" } },
      { v: 2, alt: { vi: "Bảng màu taupe và kem", cs: "Paleta taupe a krémová", en: "Taupe and cream palette", de: "Palette in Taupe und Creme" } },
      { v: 0, alt: { vi: "Mẫu màu French hiện đại", cs: "Moderní French odstíny", en: "Modern French shades", de: "Moderne French-Töne" } },
      { v: 1, alt: { vi: "Móng dài sơn bóng", cs: "Dlouhé lesklé nehty", en: "Long glossy nails", de: "Lange glänzende Nägel" } },
    ],
  },
  contact: {
    title: { vi: "Đặt lịch & liên hệ", cs: "Rezervace a kontakt", en: "Booking & contact", de: "Termin & Kontakt" },
    lead: { vi: "Chọn dịch vụ và giờ mong muốn, chúng tôi sẽ xác nhận lại với bạn.", cs: "Vyberte službu a čas, termín vám potvrdíme.", en: "Choose a service and a time, we will confirm it with you.", de: "Wählen Sie Leistung und Uhrzeit, wir bestätigen den Termin." },
    address: "Ukázková 12, 120 00 Praha 2",
    hours: [
      { days: { vi: "Thứ 2 – Thứ 6", cs: "Po – Pá", en: "Mon – Fri", de: "Mo – Fr" }, time: "9:00 – 19:00" },
      { days: { vi: "Thứ 7", cs: "So", en: "Sat", de: "Sa" }, time: "9:00 – 14:00" },
    ],
    phone: "+420 123 456 789",
    email: "studio@ivelle.example",
  },
};
