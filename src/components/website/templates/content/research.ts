import type { L, TemplateContent } from "../types";

// 6 mẫu dựng theo nghiên cứu 15 website salon Séc (docs/website-templates/RESEARCH-2026-11.md).
// Nội dung demo luôn hiển thị tiếng Séc (DEMO_LOCALE) nên chỉ viết tiếng Séc; thẻ trong thư viện (card) đủ 4 ngôn ngữ.
// Giá minh hoạ theo bảng giá công khai của salon tại Praha (docs/website-templates/PRICE-RESEARCH.md), không phải giá thật.
const cz = (s: string): L => ({ vi: s, cs: s, en: s, de: s });
const t = (vi: string, cs: string, en: string, de: string): L => ({ vi, cs, en, de });
const nav = (a: string, b: string, c: string, d: string, e: string) => ({ "": cz(a), "dich-vu": cz(b), "gioi-thieu": cz(c), "bo-suu-tap": cz(d), "dat-lich": cz(e) });
const pic = (v: number, alt: string) => ({ v, alt: cz(alt) });

// Nail — học từ Dephaus: tên thương hiệu khổng lồ trên ảnh, menu viên thuốc, 4 ô liên hệ
export const marelle: TemplateContent = {
  slug: "marelle-nails",
  name: "Marelle",
  motif: "nail",
  card: {
    type: t("Nail studio", "Nehtové studio", "Nail studio", "Nagelstudio"),
    style: t(
      "Tên thương hiệu cỡ lớn trên ảnh, menu viên thuốc, kem và cam đất. Học từ Dephaus.",
      "Velké logo přes fotku, menu ve tvaru pilulek, krémová a pálená oranž. Inspirace Dephaus.",
      "A huge wordmark over the photo, pill menu, cream and burnt orange. Learned from Dephaus.",
      "Großer Schriftzug über dem Foto, Pillen-Menü, Creme und Terrakotta. Inspiriert von Dephaus."
    ),
  },
  tagline: cz("Nehtové studio · Praha 7"),
  nav: nav("Úvod", "Ceník", "Studio", "Galerie", "Rezervace"),
  bookLabel: cz("Rezervovat"),
  home: {
    kicker: cz("Nehtové studio · Praha 7 – Letná"),
    title: cz("Nehty, které vydrží a sluší vám"),
    lead: cz("Manikúra, pedikúra a gelové nehty. Přijďte se rozmazlit k nám na Letnou."),
    hero: pic(1, "Ilustrace mandlového nehtu"),
    intro: { title: cz("Malé studio, velká péče"), text: cz("Pracujeme ve dvou, bez spěchu a s kvalitními materiály. Každý termín je jen pro vás.") },
    highlights: [
      { title: cz("Gel lak"), text: cz("Výdrž 3–4 týdny.") },
      { title: cz("Sterilní nástroje"), text: cz("Po každé klientce.") },
      { title: cz("Online rezervace"), text: cz("Termín vyberete za minutu.") },
    ],
    featured: [
      [0, 1],
      [1, 0],
      [2, 1],
    ],
    closing: { title: cz("Těšíme se na vás"), text: cz("Vyberte si službu a čas.") },
  },
  services: {
    title: cz("Ceník"),
    lead: cz("Ceny jsou orientační, zdobení účtujeme zvlášť."),
    groups: [
      {
        name: cz("Manikúra"),
        items: [
          { name: cz("Manikúra"), desc: cz("Úprava tvaru a kůžičky"), min: 30, price: 650 },
          { name: cz("Manikúra s gel lakem"), min: 60, price: 850 },
          { name: cz("SPA manikúra"), desc: cz("Peeling, maska, masáž rukou"), min: 90, price: 1100 },
        ],
      },
      {
        name: cz("Gelové nehty"),
        items: [
          { name: cz("Gelová modeláž"), min: 90, price: 1100 },
          { name: cz("Doplnění gelových nehtů"), min: 90, price: 950 },
          { name: cz("Odstranění gelu"), min: 20, price: 200 },
        ],
      },
      {
        name: cz("Pedikúra"),
        items: [
          { name: cz("Pedikúra"), min: 40, price: 800 },
          { name: cz("Pedikúra s gel lakem"), min: 60, price: 1050 },
          { name: cz("SPA pedikúra"), min: 90, price: 1200 },
        ],
      },
    ],
    note: cz("Termín prosím zrušte nejpozději 24 hodin předem."),
  },
  about: {
    title: cz("Studio"),
    lead: cz("Dvě stanice, denní světlo a klidná hudba."),
    story: [cz("Studio jsme otevřely s jednoduchým cílem: nehty, které vydrží, a čas, který si opravdu užijete.")],
    team: [
      { name: "Ema", role: cz("Gelové nehty"), bio: cz("Mandle, ovál a jemné zdobení."), visual: pic(3, "Ilustrace tří nehtů") },
      { name: "Thu", role: cz("Manikúra a pedikúra"), bio: cz("Precizní kůžičky a SPA péče."), visual: pic(0, "Ilustrace vzorníku laků") },
    ],
    values: [
      { title: cz("Kvalita"), text: cz("Ověřené gely a laky.") },
      { title: cz("Klid"), text: cz("Žádné přeplněné termíny.") },
      { title: cz("Čistota"), text: cz("Sterilizace po každé klientce.") },
    ],
  },
  gallery: {
    title: cz("Galerie"),
    lead: cz("Inspirace z našeho studia."),
    items: [pic(1, "Nude mandle"), pic(0, "Podzimní odstíny"), pic(2, "Paleta barev"), pic(3, "Jemné zdobení"), pic(1, "Mléčná růžová"), pic(0, "French")],
  },
  contact: {
    title: cz("Rezervace"),
    lead: cz("Vyberte službu a čas, termín vám potvrdíme."),
    address: "Ukázková 552, 170 00 Praha 7",
    hours: [
      { days: cz("Po – Pá"), time: "9:00 – 20:00" },
      { days: cz("So – Ne"), time: "10:00 – 18:30" },
    ],
    phone: "+420 123 456 801",
    email: "ahoj@marelle.example",
  },
};

// Hair — học từ James Hair + Petra Měchurová: tối giản đen trắng, wordmark chữ thường, giá in hoa hai cột
export const hugo: TemplateContent = {
  slug: "hugo-hair",
  name: "hugo hair",
  motif: "hair",
  card: {
    type: t("Salon tóc", "Kadeřnictví", "Hair salon", "Friseursalon"),
    style: t(
      "Tối giản đen trắng, chữ thường, bảng giá in hoa hai cột, hợp salon một người thợ. Học từ James Hair.",
      "Minimalistické černobílé, malá písmena, ceník velkými písmeny. Pro salon jednoho stylisty. Inspirace James Hair.",
      "Minimal black and white, lowercase wordmark, two-column capital price list. Learned from James Hair.",
      "Minimal in Schwarzweiß, Kleinbuchstaben, zweispaltige Preisliste. Inspiriert von James Hair."
    ),
  },
  tagline: cz("Kadeřnictví · Praha 3 – Žižkov"),
  nav: nav("Úvod", "Služby", "Hugo", "Práce", "Kontakt"),
  bookLabel: cz("Book now"),
  home: {
    kicker: cz("Kadeřnictví na Žižkově"),
    title: cz("S péčí k vašim vlasům"),
    lead: cz("Malý salon, jeden stylista a čas jen pro vás."),
    hero: pic(1, "Ilustrace kulatého zrcadla a vlasů"),
    intro: { title: cz("Hugo"), text: cz("Stříhá přes dvacet let. Dnes ve vlastním malém salonu, kde se věnuje tomu, co ho baví nejvíc: dobrým střihům a spokojeným klientům.") },
    highlights: [
      { title: cz("Jeden stylista"), text: cz("Pokaždé stejné ruce.") },
      { title: cz("Konzultace zdarma"), text: cz("Před každou změnou.") },
      { title: cz("Profesionální péče"), text: cz("Šetrné barvy a masky.") },
    ],
    featured: [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 2],
    ],
    closing: { title: cz("Book now"), text: cz("Zavolejte nebo napište, ozveme se zpět.") },
  },
  services: {
    title: cz("Služby"),
    lead: cz("Ceny podle délky a hustoty vlasů."),
    groups: [
      {
        name: cz("Střih"),
        items: [
          { name: cz("Dámský střih, foukání"), min: 75, price: 1900 },
          { name: cz("Pánský střih, foukání"), min: 45, price: 1400 },
          { name: cz("Foukání"), min: 40, price: 950 },
          { name: cz("Děti do 10 let"), min: 30, price: 900 },
        ],
      },
      {
        name: cz("Barva"),
        items: [
          { name: cz("Barva"), min: 90, price: 1900, from: true },
          { name: cz("Částečný melír"), min: 120, price: 2200, from: true },
          { name: cz("Melír"), min: 150, price: 3900, from: true },
          { name: cz("Toner / maska"), min: 30, price: 800, from: true },
        ],
      },
    ],
    note: cz("Prosíme, zrušte termín alespoň 24 hodin předem."),
  },
  about: {
    title: cz("Hugo"),
    lead: cz("Stylista a majitel salonu."),
    story: [cz("Začínal v Brně, pracoval v několika pražských salonech a dnes stříhá ve vlastním. Věří na jednoduché střihy, které drží tvar i bez fénu.")],
    team: [
      { name: "Hugo", role: cz("Majitel, stylista"), bio: cz("Dámské a pánské střihy, barvy."), visual: pic(1, "Ilustrace zrcadla") },
      { name: "Lenka", role: cz("Koloristka"), bio: cz("Melíry a přirozené odstíny."), visual: pic(0, "Ilustrace pramenů vlasů") },
      { name: "Bao", role: cz("Asistent"), bio: cz("Mytí, péče a foukání."), visual: pic(2, "Ilustrace hřebenu") },
    ],
    values: [
      { title: cz("Jednoduše"), text: cz("Střih, který zvládnete doma.") },
      { title: cz("Upřímně"), text: cz("Řekneme, co vám sluší.") },
      { title: cz("Přesně"), text: cz("Termíny držíme.") },
    ],
  },
  gallery: {
    title: cz("Práce"),
    lead: cz("Několik střihů ze salonu."),
    items: [pic(3, "Dlouhé vlny"), pic(1, "Bob"), pic(0, "Melír"), pic(2, "Rovné vlasy"), pic(0, "Vrstvy"), pic(3, "Přirozená barva")],
  },
  contact: {
    title: cz("Kontakt"),
    lead: cz("Pokud nebudeme zvedat telefon, zavoláme vám zpět."),
    address: "Ukázková 16, 130 00 Praha 3",
    hours: [
      { days: cz("Úterý"), time: "11:00 – 17:00" },
      { days: cz("Středa"), time: "9:00 – 15:00" },
      { days: cz("Čtvrtek"), time: "14:00 – 20:00" },
      { days: cz("Sobota"), time: "9:00 – 15:30" },
    ],
    phone: "+420 123 456 802",
    email: "book@hugohair.example",
  },
};

// Nhiều dịch vụ — học từ Studio Itta: menu viên thuốc màu mận, thẻ từng mảng có "od X Kč" + số điện thoại riêng
export const nova: TemplateContent = {
  slug: "nova-studio",
  name: "Studio Nova",
  motif: "makeup",
  card: {
    type: t("Salon nhiều dịch vụ", "Salon více služeb", "Multi-service salon", "Salon mit mehreren Leistungen"),
    style: t(
      "Tóc, móng, da dưới một mái nhà: thẻ từng mảng có giá từ và số riêng, tông mận và vàng. Học từ Studio Itta.",
      "Vlasy, nehty i pleť pod jednou střechou: karty s cenou od a vlastním telefonem, švestková a zlatá. Inspirace Studio Itta.",
      "Hair, nails and skin under one roof: cards with 'from' prices and their own phone, plum and gold. Learned from Studio Itta.",
      "Haare, Nägel und Haut unter einem Dach: Karten mit Ab-Preis und eigener Nummer, Pflaume und Gold. Inspiriert von Studio Itta."
    ),
  },
  tagline: cz("Kadeřnictví · kosmetika · nehty · Praha 2"),
  nav: nav("Úvod", "Služby", "Studio", "Galerie", "Kontakt"),
  bookLabel: cz("Objednat se"),
  home: {
    kicker: cz("V centru Prahy u náměstí Míru"),
    title: cz("Studio pro vaši přirozenou krásu"),
    lead: cz("Kadeřnictví, kosmetika, manikúra a pedikúra pod jednou střechou."),
    hero: pic(1, "Ilustrace pudřenky"),
    intro: { title: cz("Vše pro vaši krásu pod jednou střechou"), text: cz("Každý obor ve vlastních rukou. Na službu se objednáte přímo u kolegyně, telefon najdete na každé kartě.") },
    highlights: [
      { title: cz("4 obory"), text: cz("Vlasy, pleť, ruce, nohy.") },
      { title: cz("5 specialistek"), text: cz("Každá na svůj obor.") },
      { title: cz("Praha 2"), text: cz("Dvě minuty od metra.") },
    ],
    featured: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    closing: { title: cz("Objednejte se k nám"), text: cz("Zavolejte přímo specialistce.") },
  },
  services: {
    title: cz("Služby"),
    lead: cz("Ceny od, přesnou cenu řekneme předem."),
    groups: [
      {
        name: cz("Kadeřnictví"),
        note: cz("+420 123 456 811"),
        items: [
          { name: cz("Dámský střih"), min: 60, price: 690, from: true },
          { name: cz("Barvení"), min: 90, price: 1290, from: true },
          { name: cz("Regenerační kúra"), min: 30, price: 450 },
        ],
      },
      {
        name: cz("Manikúra"),
        note: cz("+420 123 456 812"),
        items: [
          { name: cz("Manikúra s gel lakem"), min: 60, price: 690, from: true },
          { name: cz("Gelové nehty"), min: 90, price: 1050, from: true },
        ],
      },
      {
        name: cz("Pedikúra"),
        note: cz("+420 123 456 812"),
        items: [
          { name: cz("Mokrá pedikúra"), min: 50, price: 590, from: true },
          { name: cz("Pedikúra s gel lakem"), min: 70, price: 890 },
        ],
      },
      {
        name: cz("Kosmetika"),
        note: cz("+420 123 456 813"),
        items: [
          { name: cz("Ošetření pleti"), min: 60, price: 990, from: true },
          { name: cz("Depilace"), desc: cz("dle partie"), min: 20, price: 250, from: true },
        ],
      },
    ],
    note: cz("Na každou službu se objednáte přímo u specialistky."),
  },
  about: {
    title: cz("Studio"),
    lead: cz("Světlé prostory ve druhém patře, výtah přímo do salonu."),
    story: [cz("Studio jsme založily, aby klientky nemusely běhat po celé Praze. Vlasy, nehty i pleť vyřešíte během jednoho odpoledne.")],
    team: [
      { name: "Iveta", role: cz("Kadeřnice"), bio: cz("Střihy a barvy."), visual: pic(3, "Ilustrace palety") },
      { name: "Yvona", role: cz("Manikúra a pedikúra"), bio: cz("Gel lak a mokrá pedikúra."), visual: pic(0, "Ilustrace rtěnky") },
      { name: "Oxana", role: cz("Kosmetička"), bio: cz("Ošetření pleti a depilace."), visual: pic(2, "Ilustrace štětce") },
    ],
    values: [
      { title: cz("Pod jednou střechou"), text: cz("Méně cestování, víc času.") },
      { title: cz("Specialistky"), text: cz("Každá na svůj obor.") },
      { title: cz("Profesionální kosmetika"), text: cz("Ověřené značky.") },
    ],
  },
  gallery: {
    title: cz("Galerie"),
    lead: cz("Naše prostory a práce."),
    items: [pic(1, "Recepce"), pic(0, "Kadeřnictví"), pic(2, "Kosmetika"), pic(3, "Manikúra"), pic(1, "Pedikúra"), pic(0, "Čekárna")],
  },
  contact: {
    title: cz("Kontakt"),
    lead: cz("Zavolejte přímo do oboru, který potřebujete."),
    address: "Ukázková 28, 120 00 Praha 2",
    hours: [
      { days: cz("Po – Pá"), time: "9:00 – 20:00" },
      { days: cz("So"), time: "na objednávku" },
    ],
    phone: "+420 123 456 810",
    email: "studio@nova.example",
  },
};

// Mi — học từ Lash House (thẻ menu trên nền hoạ tiết) + Řasy Sokolská (2 chi nhánh, mô tả kỹ thuật)
export const iris: TemplateContent = {
  slug: "iris-lash",
  name: "Iris",
  motif: "lash",
  card: {
    type: t("Mi & chân mày", "Řasy a obočí", "Lash & brow", "Wimpern & Brauen"),
    style: t(
      "Kiểu \"quiet luxury\": ảnh tràn màn đầu, chữ serif nghiêng, nền trắng ấm, bảng giá gọn, hai chi nhánh.",
      "Styl quiet luxury: fotka přes celou obrazovku, kurzíva, teplá bílá, přehledný ceník, dvě pobočky.",
      "Quiet luxury: a full-bleed photo, serif italics, warm white, a clean price list, two branches.",
      "Quiet Luxury: Vollbildfoto, Serifen-Kursive, warmes Weiß, klare Preisliste, zwei Filialen."
    ),
  },
  tagline: cz("Prodlužování řas · Praha 1"),
  nav: nav("Úvod", "Ceník", "O nás", "Galerie", "Rezervace"),
  bookLabel: cz("Chci se objednat"),
  home: {
    kicker: cz("Studio prodlužování řas"),
    title: cz("Řasy, které otevřou oči"),
    lead: cz("Prodlužování řas, laminace a obočí. Dvě studia v centru Prahy."),
    hero: pic(0, "Ilustrace oka s řasami"),
    intro: { title: cz("Od přirozeného efektu po objem"), text: cz("Klasika řasa na řasu, objem 2D a 3D nebo Hollywood. Tvar řas ladíme k očím i rysům obličeje.") },
    highlights: [
      { title: cz("Řasa na řasu"), text: cz("Jedna umělá na jednu přírodní.") },
      { title: cz("Objem 2D / 3D"), text: cz("Vějířky pro hustší vzhled.") },
      { title: cz("Laminace"), text: cz("Natočené řasy bez prodloužení.") },
    ],
    featured: [
      [0, 0],
      [0, 2],
      [1, 0],
      [1, 3],
    ],
    closing: { title: cz("Chci se objednat"), text: cz("Vyberte studio a čas.") },
  },
  services: {
    title: cz("Ceník"),
    lead: cz("Doplnění do 3 týdnů. Ceny jsou orientační."),
    groups: [
      {
        name: cz("Prodlužování řas"),
        items: [
          { name: cz("Řasa na řasu"), min: 120, price: 1350 },
          { name: cz("Doplnění řasa na řasu"), min: 75, price: 900 },
          { name: cz("Objem 2D"), min: 150, price: 1500 },
          { name: cz("Objem 3D"), min: 160, price: 1650 },
          { name: cz("Hollywood objem"), min: 180, price: 1900 },
          { name: cz("Odstranění řas"), min: 20, price: 350 },
        ],
      },
      {
        name: cz("Laminace a barvení"),
        items: [
          { name: cz("Laminace řas"), min: 60, price: 990 },
          { name: cz("Laminace obočí"), min: 50, price: 990 },
          { name: cz("Laminace řas a obočí"), min: 100, price: 1700 },
          { name: cz("Úprava a barvení obočí"), min: 30, price: 550 },
          { name: cz("Barvení řas"), min: 20, price: 300 },
        ],
      },
    ],
    note: cz("Při pozdním zrušení (méně než 24 h) účtujeme 50 % ceny."),
  },
  about: {
    title: cz("O nás"),
    lead: cz("Dvě studia, jeden přístup."),
    story: [cz("Specializujeme se jen na řasy a obočí. Díky tomu se můžeme věnovat detailu: tvaru oka, hustotě přírodních řas a tomu, co vám bude sedět.")],
    team: [
      { name: "Linh", role: cz("Lash artist · Studio Centrum"), bio: cz("Objem 2D a 3D."), visual: pic(2, "Ilustrace oválu s řasami") },
      { name: "Klára", role: cz("Lash artist · Studio Náměstí"), bio: cz("Přirozená klasika."), visual: pic(3, "Ilustrace řas") },
      { name: "Petra", role: cz("Brow artist"), bio: cz("Laminace a tvar obočí."), visual: pic(1, "Ilustrace obočí") },
    ],
    values: [
      { title: cz("Studio Centrum"), text: cz("Ukázková 699, Praha 1 · 2 minuty od tramvaje.") },
      { title: cz("Studio Náměstí"), text: cz("Ukázková 807, Praha 1 · přímo u metra.") },
      { title: cz("Voucher"), text: cz("Darujte řasy, platnost 6 měsíců.") },
    ],
  },
  gallery: {
    title: cz("Galerie"),
    lead: cz("Řasy a obočí z obou studií."),
    items: [pic(0, "Objem 2D"), pic(1, "Laminace obočí"), pic(2, "Cat eye"), pic(3, "Řasa na řasu"), pic(0, "Hollywood"), pic(1, "Barvení obočí")],
  },
  contact: {
    title: cz("Rezervace"),
    lead: cz("Vyberte studio, službu a čas."),
    address: "Ukázková 699, 110 00 Praha 1",
    hours: [
      { days: cz("Po – Pá"), time: "9:00 – 20:00" },
      { days: cz("So"), time: "9:00 – 15:00" },
    ],
    phone: "+420 123 456 803",
    email: "rasy@iris.example",
  },
};

// Da & mày — học từ SkinArth: ô danh mục, 4 bước lần đầu, bảng giá có cột thời gian, FAQ lưới
export const kora: TemplateContent = {
  slug: "kora-skin",
  name: "Kora",
  motif: "makeup",
  card: {
    type: t("Da & chân mày", "Pleť a obočí", "Skin & brows", "Haut & Brauen"),
    style: t(
      "Xanh rừng và xám xanh, 4 bước cho lần đầu, bảng giá có thời gian, câu hỏi dạng lưới. Học từ SkinArth.",
      "Lesní zelená a šedá, 4 kroky první návštěvy, ceník s časem, časté dotazy v mřížce. Inspirace SkinArth.",
      "Forest green and grey-green, 4 first-visit steps, prices with durations, FAQ grid. Learned from SkinArth.",
      "Waldgrün und Graugrün, 4 Schritte beim ersten Besuch, Preise mit Dauer, FAQ-Raster. Inspiriert von SkinArth."
    ),
  },
  tagline: cz("Kosmetické studio · Praha 12"),
  nav: nav("Úvod", "Ceník", "Jak to probíhá", "Galerie", "Objednat"),
  bookLabel: cz("Objednat termín"),
  home: {
    kicker: cz("Pleť · obočí · řasy · líčení"),
    title: cz("Kosmetická péče, která zná vaši pleť"),
    lead: cz("Šetrné postupy, viditelný výsledek a čas na konzultaci."),
    hero: pic(1, "Ilustrace pudřenky"),
    intro: { title: cz("Jak probíhá první návštěva"), text: cz("Krátká konzultace, doporučení na míru, ošetření a rady pro péči doma.") },
    highlights: [
      { title: cz("Úvodní konzultace"), text: cz("Probereme, co od péče čekáte.") },
      { title: cz("Diagnostika"), text: cz("Doporučíme vhodné ošetření.") },
      { title: cz("Ošetření"), text: cz("Krok za krokem, s vysvětlením.") },
      { title: cz("Domácí péče"), text: cz("Jak výsledek udržet.") },
    ],
    featured: [
      [0, 1],
      [0, 3],
      [1, 0],
      [2, 0],
    ],
    closing: { title: cz("Chci si objednat termín"), text: cz("Termín potvrdíme zprávou.") },
  },
  services: {
    title: cz("Ceník"),
    lead: cz("Transparentní ceny. Finální cenu doporučíme po konzultaci."),
    groups: [
      {
        name: cz("Obočí a řasy"),
        items: [
          { name: cz("Úprava obočí"), min: 30, price: 390 },
          { name: cz("Úprava a barvení obočí"), min: 40, price: 590 },
          { name: cz("Laminace a úprava obočí"), min: 50, price: 1000 },
          { name: cz("Lash lifting a výživa řas"), min: 60, price: 1300 },
        ],
      },
      {
        name: cz("Kosmetická péče"),
        items: [
          { name: cz("Hydratační ošetření"), min: 90, price: 1590 },
          { name: cz("Hloubkové čištění"), min: 110, price: 1990 },
        ],
      },
      {
        name: cz("Líčení"),
        items: [
          { name: cz("Denní líčení"), min: 40, price: 1290 },
          { name: cz("Večerní líčení"), min: 60, price: 1590 },
          { name: cz("Svatební balíček"), min: 120, price: 7490, from: true },
        ],
      },
    ],
    note: cz("Ošetření je vhodné i pro citlivou pleť, dejte nám vědět předem."),
  },
  about: {
    title: cz("Jak to probíhá"),
    lead: cz("Čtyři kroky první návštěvy."),
    story: [cz("Studio najdete pár minut od metra, parkovat můžete přímo u domu.")],
    team: [
      { name: "Jana", role: cz("Kosmetička"), bio: cz("Péče o citlivou pleť."), visual: pic(3, "Ilustrace palety") },
      { name: "My", role: cz("Brow & lash"), bio: cz("Laminace a lash lifting."), visual: pic(2, "Ilustrace štětce") },
    ],
    values: [
      { title: cz("Jak dlouho vydrží laminace obočí?"), text: cz("Obvykle 4–6 týdnů, podle růstu chloupků.") },
      { title: cz("Je ošetření vhodné v těhotenství?"), text: cz("Dejte nám vědět, doporučíme šetrnou variantu.") },
      { title: cz("Jak často chodit na čištění pleti?"), text: cz("Většinou jednou za 4–8 týdnů.") },
      { title: cz("Můžu přijít s líčením?"), text: cz("Ano, před ošetřením ho šetrně odstraníme.") },
      { title: cz("Jak se objednat?"), text: cz("Přes formulář nebo telefonem.") },
      { title: cz("Mohu darovat voucher?"), text: cz("Ano, na jakoukoli službu.") },
    ],
  },
  gallery: {
    title: cz("Galerie"),
    lead: cz("Naše studio a detaily."),
    items: [pic(1, "Pudřenka"), pic(0, "Rtěnka"), pic(2, "Štětec"), pic(3, "Paleta"), pic(1, "Ošetřovna"), pic(0, "Detail")],
  },
  contact: {
    title: cz("Objednat termín"),
    lead: cz("Vyberte službu a čas, ozveme se zpět."),
    address: "Ukázková 2420, 143 00 Praha 12",
    hours: [{ days: cz("Po – Ne"), time: "na objednávku" }],
    phone: "+420 123 456 804",
    email: "recepce@kora.example",
  },
};

// Spa cao cấp — học từ AVA Spa Four Seasons (dải tối, chữ in hoa giãn, serif, thanh đặt lịch dính đáy mobile) + SPA SPA (lưới khu/phòng)
export const onyx: TemplateContent = {
  slug: "onyx-spa",
  name: "Onyx",
  motif: "spa",
  card: {
    type: t("Spa cao cấp", "Luxusní spa", "Luxury spa", "Luxus-Spa"),
    style: t(
      "Dải than chì, chữ in hoa giãn rộng, chữ thân serif, thanh đặt lịch dính đáy trên điện thoại. Học từ AVA Spa (Four Seasons).",
      "Grafitové pásy, prostrkané verzálky, patkové písmo, rezervační lišta na mobilu. Inspirace AVA Spa (Four Seasons).",
      "Charcoal bands, wide-spaced capitals, serif body, a sticky booking bar on mobile. Learned from AVA Spa (Four Seasons).",
      "Graphitbänder, gesperrte Versalien, Serifenschrift, Buchungsleiste auf dem Handy. Inspiriert von AVA Spa (Four Seasons)."
    ),
  },
  tagline: cz("Spa & wellness · Praha 1"),
  nav: nav("Úvod", "Procedury", "Prostory", "Galerie", "Rezervace"),
  bookLabel: cz("Rezervovat"),
  home: {
    kicker: cz("Spa u řeky"),
    title: cz("Klid uprostřed města"),
    lead: cz("Masáže, péče o pleť a soukromé wellness s výhledem na Vltavu."),
    hero: pic(1, "Ilustrace oblouku a listů"),
    intro: { title: cz("Rituály na míru"), text: cz("Každá procedura začíná krátkým rozhovorem. Délku i intenzitu přizpůsobíme vám.") },
    highlights: [
      { title: cz("Soukromé wellness"), text: cz("Vířivka a sauna jen pro vás.") },
      { title: cz("Párové procedury"), text: cz("Masáž ve dvou, vedle sebe.") },
      { title: cz("Dárkové poukazy"), text: cz("Na procedury i wellness.") },
    ],
    featured: [
      [0, 0],
      [0, 2],
      [1, 0],
      [2, 0],
    ],
    closing: { title: cz("Dopřejte si chvíli klidu"), text: cz("Rezervujte proceduru nebo wellness.") },
  },
  services: {
    title: cz("Procedury"),
    lead: cz("Ceny za osobu, pokud není uvedeno jinak."),
    groups: [
      {
        name: cz("Masáže"),
        items: [
          { name: cz("Relaxační masáž"), min: 60, price: 1490 },
          { name: cz("Relaxační masáž Signature"), desc: cz("delší rituál s horkými ručníky"), min: 90, price: 2090 },
          { name: cz("Masáž lávovými kameny"), min: 75, price: 1890 },
          { name: cz("Párová masáž"), desc: cz("cena za pár"), min: 60, price: 2790 },
        ],
      },
      {
        name: cz("Péče o pleť"),
        items: [
          { name: cz("Ošetření obličeje"), min: 60, price: 1690 },
          { name: cz("Rozjasňující ošetření"), min: 90, price: 2290 },
        ],
      },
      {
        name: cz("Rituály a wellness"),
        items: [
          { name: cz("Tělový peeling a masáž"), min: 100, price: 2490 },
          { name: cz("Soukromé wellness"), desc: cz("vířivka, sauna, pro 2 osoby"), min: 120, price: 2990 },
        ],
      },
    ],
    note: cz("Procedury slouží k relaxaci a péči, nenahrazují lékařskou péči."),
  },
  about: {
    title: cz("Prostory"),
    lead: cz("Tři prostory pro různé chvíle."),
    story: [cz("Klenuté sklepy starého domu jsme proměnili v klidné místo s teplým světlem, kamenem a dřevem.")],
    team: [
      { name: "Řeka", role: cz("Párová suita"), bio: cz("Dvě lehátka s výhledem."), visual: pic(2, "Ilustrace vodní hladiny") },
      { name: "Kámen", role: cz("Masážní místnost"), bio: cz("Teplé kameny a ticho."), visual: pic(0, "Ilustrace kamenů") },
      { name: "Lázně", role: cz("Soukromé wellness"), bio: cz("Vířivka a finská sauna."), visual: pic(3, "Ilustrace větvičky") },
    ],
    values: [
      { title: cz("Klid"), text: cz("Telefony zůstávají v šatně.") },
      { title: cz("Soukromí"), text: cz("Každý prostor jen pro vás.") },
      { title: cz("Péče"), text: cz("Terapeutky s praxí.") },
    ],
  },
  gallery: {
    title: cz("Galerie"),
    lead: cz("Prostory spa."),
    items: [pic(1, "Klenutá chodba"), pic(0, "Masážní kameny"), pic(2, "Vodní hladina"), pic(3, "Olivová větvička"), pic(1, "Párová suita"), pic(0, "Odpočívárna")],
  },
  contact: {
    title: cz("Rezervace"),
    lead: cz("Vyberte proceduru a čas, rezervaci potvrdíme."),
    address: "Ukázková 1, 110 00 Praha 1",
    hours: [{ days: cz("Po – Ne"), time: "8:00 – 21:00" }],
    phone: "+420 123 456 805",
    email: "spa@onyx.example",
  },
};
