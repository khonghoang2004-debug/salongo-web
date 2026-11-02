import type { TemplateContent } from "../types";

// Mẫu 2 — Hair salon hiện đại. Giá "từ …" vì phụ thuộc độ dài tóc (khảo sát Praha 11/2026)
export const hair: TemplateContent = {
  slug: "verra-hair",
  name: "Verra",
  motif: "hair",
  card: {
    type: { vi: "Salon tóc", cs: "Kadeřnictví", en: "Hair salon", de: "Friseursalon" },
    style: {
      vi: "Cream, espresso và than chì, điểm nhấn đồng nhẹ. Bố cục thiên về hình ảnh, có cá tính.",
      cs: "Krémová, espresso a grafit s jemným kovovým akcentem. Výrazné rozvržení postavené na fotografiích.",
      en: "Cream, espresso and charcoal with a touch of brass. An image-led layout with character.",
      de: "Creme, Espresso und Anthrazit mit einem Hauch Messing. Bildstarkes Layout mit Charakter.",
    },
  },
  tagline: { vi: "Hair studio · Praha 7", cs: "Hair studio · Praha 7", en: "Hair studio · Prague 7", de: "Hair Studio · Prag 7" },
  nav: {
    "": { vi: "Trang chủ", cs: "Úvod", en: "Home", de: "Start" },
    "dich-vu": { vi: "Dịch vụ", cs: "Služby", en: "Services", de: "Leistungen" },
    "gioi-thieu": { vi: "Đội ngũ", cs: "Tým", en: "Team", de: "Team" },
    "bo-suu-tap": { vi: "Kiểu tóc", cs: "Účesy", en: "Looks", de: "Looks" },
    "dat-lich": { vi: "Tư vấn & đặt lịch", cs: "Konzultace", en: "Consult & book", de: "Beratung" },
  },
  bookLabel: { vi: "Đặt lịch tư vấn", cs: "Objednat konzultaci", en: "Book a consultation", de: "Beratung buchen" },
  home: {
    kicker: { vi: "Cắt · Màu · Tạo kiểu", cs: "Střih · Barva · Styling", en: "Cut · Colour · Styling", de: "Schnitt · Farbe · Styling" },
    title: {
      vi: "Kiểu tóc hợp với bạn, không chỉ hợp xu hướng",
      cs: "Účes, který sedí vám, ne jen trendu",
      en: "Hair that suits you, not just the trend",
      de: "Eine Frisur, die zu Ihnen passt, nicht nur zum Trend",
    },
    lead: {
      vi: "Mỗi lần cắt hoặc nhuộm đều bắt đầu bằng một buổi trao đổi ngắn về nếp tóc, thói quen và cách bạn chăm tóc ở nhà.",
      cs: "Každý střih i barvení začíná krátkým rozhovorem o vašich vlasech, zvycích a domácí péči.",
      en: "Every cut or colour starts with a short talk about your hair, your routine and how you style it at home.",
      de: "Jeder Schnitt und jede Farbe beginnt mit einem kurzen Gespräch über Haar, Alltag und Pflege zu Hause.",
    },
    hero: { v: 3, alt: { vi: "Minh họa mái tóc dài uốn sóng", cs: "Ilustrace dlouhých vlnitých vlasů", en: "Illustration of long wavy hair", de: "Illustration langer, welliger Haare" } },
    intro: {
      title: { vi: "Màu tóc sống động, bền đẹp", cs: "Barva, která vydrží", en: "Colour that lasts", de: "Farbe, die hält" },
      text: {
        vi: "Từ balayage tự nhiên đến phủ bạc, chúng tôi chọn công thức theo nền tóc của bạn và chỉ cho bạn cách giữ màu lâu hơn.",
        cs: "Od přirozeného balayage po krytí šedin: recepturu volíme podle vašeho základu a poradíme, jak barvu udržet déle.",
        en: "From soft balayage to grey coverage, we choose the formula for your base and show you how to keep it longer.",
        de: "Von sanftem Balayage bis Grauabdeckung: Wir wählen die Rezeptur nach Ihrer Basis und zeigen, wie die Farbe länger hält.",
      },
    },
    highlights: [
      {
        title: { vi: "Tư vấn trước khi làm", cs: "Konzultace předem", en: "Consultation first", de: "Erst beraten" },
        text: { vi: "Biết trước kết quả và chi phí dự kiến.", cs: "Předem víte výsledek i orientační cenu.", en: "Know the result and expected price first.", de: "Ergebnis und Preisrahmen vorab klar." },
      },
      {
        title: { vi: "Cắt theo nếp tóc", cs: "Střih podle vlasů", en: "Cut for your hair", de: "Schnitt nach Haartyp" },
        text: { vi: "Dễ tạo kiểu lại ở nhà mỗi sáng.", cs: "Snadná úprava doma každé ráno.", en: "Easy to restyle at home every morning.", de: "Jeden Morgen leicht selbst zu stylen." },
      },
      {
        title: { vi: "Sản phẩm chuyên nghiệp", cs: "Profesionální péče", en: "Professional care", de: "Professionelle Pflege" },
        text: { vi: "Dùng dòng chăm sóc phù hợp tóc đã nhuộm.", cs: "Péče vhodná pro barvené vlasy.", en: "Care suited to coloured hair.", de: "Pflege für coloriertes Haar." },
      },
    ],
    featured: [
      [0, 0],
      [1, 1],
      [1, 0],
    ],
    closing: {
      title: { vi: "Chưa biết nên đổi kiểu gì?", cs: "Nevíte, jakou změnu zvolit?", en: "Not sure what to change?", de: "Unsicher, was sich ändern soll?" },
      text: { vi: "Đặt lịch tư vấn, mang theo ảnh kiểu bạn thích.", cs: "Objednejte se na konzultaci a vezměte fotky inspirace.", en: "Book a consultation and bring photos you like.", de: "Buchen Sie eine Beratung und bringen Sie Inspirationsfotos mit." },
    },
  },
  services: {
    title: { vi: "Dịch vụ", cs: "Služby a ceny", en: "Services", de: "Leistungen" },
    lead: {
      vi: "Giá cắt và nhuộm phụ thuộc độ dài, độ dày tóc. Giá chính xác được báo sau khi tư vấn.",
      cs: "Cena střihu a barvení závisí na délce a hustotě vlasů. Přesnou cenu řekneme po konzultaci.",
      en: "Cut and colour prices depend on length and thickness. You get the exact price after the consultation.",
      de: "Preise für Schnitt und Farbe hängen von Länge und Dichte ab. Den genauen Preis nennen wir nach der Beratung.",
    },
    groups: [
      {
        name: { vi: "Cắt & tạo kiểu", cs: "Střih a styling", en: "Cut & styling", de: "Schnitt & Styling" },
        items: [
          { name: { vi: "Cắt tóc nữ", cs: "Dámský střih", en: "Women's cut", de: "Damenhaarschnitt" }, desc: { vi: "Gội, cắt, sấy tạo kiểu", cs: "Mytí, střih, foukaná", en: "Wash, cut, blow-dry", de: "Waschen, Schneiden, Föhnen" }, min: 60, price: 890, from: true },
          { name: { vi: "Cắt tóc nam", cs: "Pánský střih", en: "Men's cut", de: "Herrenhaarschnitt" }, min: 45, price: 590 },
          { name: { vi: "Sấy tạo kiểu", cs: "Foukaná", en: "Blow-dry", de: "Föhnen" }, min: 40, price: 590, from: true },
        ],
      },
      {
        name: { vi: "Màu tóc", cs: "Barvení", en: "Colour", de: "Farbe" },
        items: [
          { name: { vi: "Nhuộm một màu", cs: "Barvení jednou barvou", en: "Single colour", de: "Einfache Coloration" }, min: 90, price: 1490, from: true },
          { name: { vi: "Balayage", cs: "Balayage", en: "Balayage", de: "Balayage" }, desc: { vi: "Gồm toner và sấy", cs: "Včetně tónování a foukané", en: "Includes toner and blow-dry", de: "Inklusive Toner und Föhnen" }, min: 180, price: 3290, from: true },
          { name: { vi: "Tẩy & nhuộm chân tóc", cs: "Odrosty", en: "Root touch-up", de: "Ansatzfarbe" }, min: 75, price: 1290, from: true },
        ],
      },
      {
        name: { vi: "Chăm sóc", cs: "Péče", en: "Care", de: "Pflege" },
        items: [
          { name: { vi: "Phục hồi chuyên sâu", cs: "Regenerační kúra", en: "Repair treatment", de: "Intensivkur" }, min: 30, price: 490 },
          { name: { vi: "Gội & massage da đầu", cs: "Mytí s masáží hlavy", en: "Wash & scalp massage", de: "Waschen & Kopfmassage" }, min: 20, price: 290 },
        ],
      },
    ],
    note: {
      vi: "Với lần nhuộm đầu tiên, chúng tôi có thể đề nghị thử màu trên một lọn tóc nhỏ trước.",
      cs: "Při prvním barvení můžeme doporučit test na malém pramenu.",
      en: "For a first colour we may suggest a strand test beforehand.",
      de: "Bei der ersten Coloration empfehlen wir eventuell einen Strähnentest.",
    },
  },
  about: {
    title: { vi: "Ba người thợ, một cách làm", cs: "Tři stylisté, jeden přístup", en: "Three stylists, one approach", de: "Drei Stylisten, ein Ansatz" },
    lead: {
      vi: "Verra là một studio nhỏ ở Praha 7, nơi mỗi khách được một người thợ theo từ đầu đến cuối.",
      cs: "Verra je malé studio v Praze 7, kde vás jeden stylista provede od začátku do konce.",
      en: "Verra is a small studio in Prague 7 where one stylist looks after you from start to finish.",
      de: "Verra ist ein kleines Studio in Prag 7, in dem Sie ein Stylist von Anfang bis Ende betreut.",
    },
    story: [
      {
        vi: "Chúng tôi tin một kiểu tóc đẹp là kiểu bạn tự chăm được. Vì vậy mỗi buổi làm đều kèm vài phút hướng dẫn tạo kiểu.",
        cs: "Věříme, že dobrý účes je ten, o který se zvládnete postarat sami. Proto ke každé návštěvě patří pár minut stylingových tipů.",
        en: "We think good hair is hair you can manage yourself, so every visit ends with a few minutes of styling tips.",
        de: "Gutes Haar ist Haar, das man selbst pflegen kann. Darum gibt es bei jedem Besuch ein paar Minuten Styling-Tipps.",
      },
    ],
    team: [
      { name: "Klára", role: { vi: "Cắt tóc & tạo form", cs: "Střihy", en: "Cuts", de: "Schnitte" }, bio: { vi: "Chuyên tóc ngắn và bob hiện đại.", cs: "Specialistka na krátké vlasy a moderní bob.", en: "Specialises in short hair and modern bobs.", de: "Spezialistin für Kurzhaar und moderne Bobs." }, visual: { v: 2, alt: { vi: "Minh họa lược và tóc", cs: "Ilustrace hřebenu a vlasů", en: "Illustration of a comb and hair", de: "Illustration von Kamm und Haar" } } },
      { name: "Adam", role: { vi: "Màu tóc", cs: "Koloristika", en: "Colour", de: "Coloration" }, bio: { vi: "Balayage tự nhiên và màu lạnh.", cs: "Přirozený balayage a studené tóny.", en: "Natural balayage and cool tones.", de: "Natürliches Balayage und kühle Töne." }, visual: { v: 1, alt: { vi: "Minh họa gương tròn và tóc", cs: "Ilustrace kulatého zrcadla", en: "Illustration of a round mirror", de: "Illustration eines runden Spiegels" } } },
      { name: "Vy", role: { vi: "Tạo kiểu & tóc cưới", cs: "Styling a svatby", en: "Styling & bridal", de: "Styling & Braut" }, bio: { vi: "Búi, tết và kiểu tóc cho dịp đặc biệt.", cs: "Drdoly, copy a účesy na zvláštní příležitosti.", en: "Updos, braids and occasion hair.", de: "Hochsteckfrisuren, Zöpfe und Anlassfrisuren." }, visual: { v: 0, alt: { vi: "Minh họa lọn tóc", cs: "Ilustrace pramenů vlasů", en: "Illustration of hair strands", de: "Illustration von Haarsträhnen" } } },
    ],
    values: [
      { title: { vi: "Lắng nghe", cs: "Nasloucháme", en: "We listen", de: "Zuhören" }, text: { vi: "Bạn quyết định, chúng tôi gợi ý.", cs: "Rozhodujete vy, my radíme.", en: "You decide, we advise.", de: "Sie entscheiden, wir beraten." } },
      { title: { vi: "Thẳng thắn", cs: "Upřímnost", en: "Honest", de: "Ehrlich" }, text: { vi: "Nói rõ khi một kiểu không hợp tóc bạn.", cs: "Řekneme, když něco vašim vlasům neprospěje.", en: "We say so when a look won't suit your hair.", de: "Wir sagen es, wenn etwas nicht passt." } },
      { title: { vi: "Tỉ mỉ", cs: "Precizní", en: "Precise", de: "Präzise" }, text: { vi: "Kiểm tra form tóc khô trước khi bạn về.", cs: "Střih kontrolujeme i nasucho.", en: "We check the cut dry before you leave.", de: "Wir prüfen den Schnitt auch trocken." } },
    ],
  },
  gallery: {
    title: { vi: "Kiểu tóc", cs: "Účesy", en: "Looks", de: "Looks" },
    lead: { vi: "Một số kiểu cắt và màu gợi ý cho mùa này.", cs: "Několik střihů a barev pro tuto sezónu.", en: "A few cuts and colours for this season.", de: "Einige Schnitte und Farben für diese Saison." },
    items: [
      { v: 3, alt: { vi: "Tóc dài uốn sóng nâu espresso", cs: "Dlouhé vlny v odstínu espresso", en: "Long espresso waves", de: "Lange Wellen in Espresso" } },
      { v: 0, alt: { vi: "Balayage ánh đồng", cs: "Balayage s měděným odleskem", en: "Copper-toned balayage", de: "Balayage mit Kupferschimmer" } },
      { v: 1, alt: { vi: "Bob ngắn cổ điển", cs: "Klasický krátký bob", en: "Classic short bob", de: "Klassischer kurzer Bob" } },
      { v: 2, alt: { vi: "Tóc thẳng mượt", cs: "Hladké rovné vlasy", en: "Sleek straight hair", de: "Glattes Haar" } },
      { v: 0, alt: { vi: "Tóc lớp nhẹ", cs: "Lehce stupňovaný střih", en: "Soft layers", de: "Weicher Stufenschnitt" } },
      { v: 3, alt: { vi: "Màu nâu lạnh", cs: "Studená hnědá", en: "Cool brunette", de: "Kühles Braun" } },
    ],
  },
  contact: {
    title: { vi: "Tư vấn & đặt lịch", cs: "Konzultace a rezervace", en: "Consultation & booking", de: "Beratung & Termin" },
    lead: { vi: "Cho chúng tôi biết bạn muốn làm gì, chúng tôi gọi lại để chốt giờ.", cs: "Napište, co si přejete, ozveme se kvůli termínu.", en: "Tell us what you have in mind, we will call back to confirm a time.", de: "Sagen Sie uns, was Sie sich wünschen, wir melden uns für den Termin." },
    address: "Ukázková 48, 170 00 Praha 7",
    hours: [
      { days: { vi: "Thứ 3 – Thứ 6", cs: "Út – Pá", en: "Tue – Fri", de: "Di – Fr" }, time: "10:00 – 20:00" },
      { days: { vi: "Thứ 7", cs: "So", en: "Sat", de: "Sa" }, time: "9:00 – 15:00" },
    ],
    phone: "+420 123 456 780",
    email: "ahoj@verra.example",
  },
};
