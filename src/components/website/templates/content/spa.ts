import type { TemplateContent } from "../types";

// Mẫu 3 — Beauty & spa thư giãn. Không ghi công dụng điều trị / sức khoẻ (chỉ mô tả trải nghiệm)
export const spa: TemplateContent = {
  slug: "saluna-spa",
  name: "Saluna",
  motif: "spa",
  card: {
    type: { vi: "Beauty & spa", cs: "Kosmetika a spa", en: "Beauty & spa", de: "Beauty & Spa" },
    style: {
      vi: "Trắng ấm, xanh sage và màu đá tự nhiên. Bố cục thoáng, chữ dễ đọc, cảm giác yên tĩnh.",
      cs: "Teplá bílá, šalvějová zelená a přírodní kámen. Vzdušné rozvržení, čitelné písmo a klid.",
      en: "Warm white, sage and natural stone. An airy layout, easy reading and a calm feel.",
      de: "Warmweiß, Salbei und Naturstein. Luftiges Layout, gut lesbar und ruhig.",
    },
  },
  tagline: { vi: "Beauty & spa · Praha 5", cs: "Kosmetika a spa · Praha 5", en: "Beauty & spa · Prague 5", de: "Beauty & Spa · Prag 5" },
  nav: {
    "": { vi: "Trang chủ", cs: "Úvod", en: "Home", de: "Start" },
    "dich-vu": { vi: "Liệu trình & giá", cs: "Procedury a ceník", en: "Treatments", de: "Behandlungen" },
    "gioi-thieu": { vi: "Không gian", cs: "Náš prostor", en: "Our space", de: "Unser Raum" },
    "bo-suu-tap": { vi: "Hình ảnh", cs: "Galerie", en: "Gallery", de: "Galerie" },
    "dat-lich": { vi: "Liên hệ", cs: "Kontakt", en: "Contact", de: "Kontakt" },
  },
  bookLabel: { vi: "Đặt liệu trình", cs: "Rezervovat proceduru", en: "Book a treatment", de: "Behandlung buchen" },
  home: {
    kicker: { vi: "Chăm sóc da & thư giãn", cs: "Péče o pleť a relaxace", en: "Skin care & relaxation", de: "Hautpflege & Entspannung" },
    title: {
      vi: "Một giờ yên tĩnh, chỉ dành cho bạn",
      cs: "Hodina klidu jen pro vás",
      en: "An hour of quiet, just for you",
      de: "Eine ruhige Stunde, nur für Sie",
    },
    lead: {
      vi: "Chăm sóc da mặt, massage thư giãn và làm đẹp nhẹ nhàng trong phòng riêng, ánh sáng dịu và không vội vàng.",
      cs: "Péče o pleť, relaxační masáže a jemná kosmetika v soukromé místnosti, v tlumeném světle a bez spěchu.",
      en: "Facials, relaxing massages and gentle beauty treatments in a private room, with soft light and no rush.",
      de: "Gesichtsbehandlungen, Entspannungsmassagen und sanfte Kosmetik im eigenen Raum, bei weichem Licht und ohne Eile.",
    },
    hero: { v: 1, alt: { vi: "Minh họa cửa vòm và cành lá", cs: "Ilustrace oblouku a větvičky", en: "Illustration of an arch and leaves", de: "Illustration eines Bogens mit Blättern" } },
    intro: {
      title: { vi: "Mỗi liệu trình bắt đầu bằng trò chuyện", cs: "Každá procedura začíná rozhovorem", en: "Every treatment starts with a conversation", de: "Jede Behandlung beginnt mit einem Gespräch" },
      text: {
        vi: "Chúng tôi hỏi về loại da, thói quen chăm sóc và điều bạn muốn cảm nhận sau buổi hẹn, rồi điều chỉnh liệu trình cho phù hợp.",
        cs: "Zeptáme se na typ pleti, domácí péči a na to, jak se chcete po návštěvě cítit, a proceduru tomu přizpůsobíme.",
        en: "We ask about your skin, your routine and how you want to feel afterwards, then adjust the treatment.",
        de: "Wir fragen nach Hauttyp, Pflegeroutine und Ihrem Wunschgefühl danach und passen die Behandlung an.",
      },
    },
    highlights: [
      {
        title: { vi: "Phòng riêng", cs: "Soukromá místnost", en: "Private room", de: "Eigener Raum" },
        text: { vi: "Không gian kín đáo, nhạc nhẹ.", cs: "Diskrétní prostor a tichá hudba.", en: "A discreet space with quiet music.", de: "Diskreter Raum, leise Musik." },
      },
      {
        title: { vi: "Không vội", cs: "Bez spěchu", en: "No rush", de: "Ohne Eile" },
        text: { vi: "Có 15 phút nghỉ giữa các lịch hẹn.", cs: "Mezi termíny je 15 minut rezerva.", en: "15 minutes between appointments.", de: "15 Minuten Pause zwischen Terminen." },
      },
      {
        title: { vi: "Sản phẩm dịu nhẹ", cs: "Jemná kosmetika", en: "Gentle products", de: "Sanfte Produkte" },
        text: { vi: "Hãy báo nếu bạn có da nhạy cảm hoặc dị ứng.", cs: "Dejte vědět, máte-li citlivou pleť či alergii.", en: "Tell us about sensitive skin or allergies.", de: "Sagen Sie uns Bescheid bei empfindlicher Haut oder Allergien." },
      },
    ],
    featured: [
      [0, 0],
      [0, 1],
      [1, 1],
    ],
    closing: {
      title: { vi: "Dành cho mình một khoảng nghỉ", cs: "Dopřejte si pauzu", en: "Give yourself a pause", de: "Gönnen Sie sich eine Pause" },
      text: { vi: "Chọn liệu trình và giờ hẹn, chúng tôi chuẩn bị phòng cho bạn.", cs: "Vyberte proceduru a čas, místnost připravíme.", en: "Choose a treatment and a time, we will prepare the room.", de: "Wählen Sie Behandlung und Zeit, wir bereiten den Raum vor." },
    },
  },
  services: {
    title: { vi: "Liệu trình & bảng giá", cs: "Procedury a ceník", en: "Treatments & prices", de: "Behandlungen & Preise" },
    lead: {
      vi: "Thời gian đã gồm phần tư vấn ngắn ở đầu buổi.",
      cs: "Čas zahrnuje krátkou konzultaci na začátku.",
      en: "Times include a short consultation at the start.",
      de: "Die Zeit enthält eine kurze Beratung zu Beginn.",
    },
    groups: [
      {
        name: { vi: "Chăm sóc da mặt", cs: "Péče o pleť", en: "Facials", de: "Gesichtsbehandlungen" },
        items: [
          { name: { vi: "Làm sạch & dưỡng da cơ bản", cs: "Základní ošetření pleti", en: "Essential facial", de: "Basis-Gesichtsbehandlung" }, desc: { vi: "Làm sạch, tẩy da chết nhẹ, mặt nạ, massage mặt", cs: "Čištění, jemný peeling, maska, masáž obličeje", en: "Cleanse, gentle exfoliation, mask, face massage", de: "Reinigung, sanftes Peeling, Maske, Gesichtsmassage" }, min: 60, price: 890 },
          { name: { vi: "Liệu trình cấp ẩm", cs: "Hydratační ošetření", en: "Hydrating facial", de: "Feuchtigkeitsbehandlung" }, desc: { vi: "Mặt nạ dưỡng ẩm và massage cổ vai", cs: "Hydratační maska a masáž šíje", en: "Moisture mask and neck massage", de: "Feuchtigkeitsmaske und Nackenmassage" }, min: 75, price: 1290 },
          { name: { vi: "Tạo dáng & nhuộm chân mày", cs: "Úprava a barvení obočí", en: "Brow shape & tint", de: "Augenbrauen formen & färben" }, min: 30, price: 350 },
        ],
      },
      {
        name: { vi: "Massage thư giãn", cs: "Relaxační masáže", en: "Relaxing massage", de: "Entspannungsmassage" },
        items: [
          { name: { vi: "Massage lưng & cổ vai", cs: "Masáž zad a šíje", en: "Back & neck massage", de: "Rücken- & Nackenmassage" }, min: 30, price: 590 },
          { name: { vi: "Massage toàn thân", cs: "Masáž celého těla", en: "Full-body massage", de: "Ganzkörpermassage" }, desc: { vi: "Dầu ấm, nhịp chậm", cs: "Teplý olej, pomalé tempo", en: "Warm oil, slow pace", de: "Warmes Öl, ruhiges Tempo" }, min: 60, price: 990 },
          { name: { vi: "Massage toàn thân 90 phút", cs: "Masáž celého těla 90 min", en: "Full-body massage, 90 min", de: "Ganzkörpermassage, 90 Min." }, min: 90, price: 1390 },
        ],
      },
      {
        name: { vi: "Tay & chân", cs: "Ruce a nohy", en: "Hands & feet", de: "Hände & Füße" },
        items: [
          { name: { vi: "Ủ tay paraffin", cs: "Parafínový zábal rukou", en: "Paraffin hand wrap", de: "Paraffin-Handpackung" }, min: 30, price: 390 },
          { name: { vi: "Chăm sóc chân thư giãn", cs: "Relaxační péče o nohy", en: "Relaxing foot care", de: "Entspannende Fußpflege" }, min: 45, price: 690 },
        ],
      },
    ],
    note: {
      vi: "Các liệu trình mang tính chăm sóc và thư giãn, không thay thế tư vấn hay điều trị y tế.",
      cs: "Procedury slouží k péči a relaxaci, nenahrazují lékařskou péči.",
      en: "Treatments are for care and relaxation and do not replace medical advice.",
      de: "Die Behandlungen dienen Pflege und Entspannung und ersetzen keine ärztliche Beratung.",
    },
  },
  about: {
    title: { vi: "Không gian của Saluna", cs: "Prostor Saluny", en: "The Saluna space", de: "Der Saluna-Raum" },
    lead: {
      vi: "Hai phòng chăm sóc, một góc trà nhỏ và cửa sổ nhìn ra sân trong.",
      cs: "Dvě ošetřovny, malý čajový koutek a okna do vnitrobloku.",
      en: "Two treatment rooms, a small tea corner and windows onto the courtyard.",
      de: "Zwei Behandlungsräume, eine kleine Teeecke und Fenster zum Innenhof.",
    },
    story: [
      {
        vi: "Chúng tôi chọn vật liệu tự nhiên: gỗ sáng màu, vải lanh và đá. Ánh sáng được giữ dịu để bạn dễ thả lỏng.",
        cs: "Vybrali jsme přírodní materiály: světlé dřevo, len a kámen. Světlo je tlumené, abyste se snáz uvolnili.",
        en: "We chose natural materials: pale wood, linen and stone. The light is kept low so it is easier to unwind.",
        de: "Wir haben natürliche Materialien gewählt: helles Holz, Leinen und Stein. Gedämpftes Licht hilft beim Abschalten.",
      },
      {
        vi: "Sau mỗi liệu trình, bạn có thể ngồi lại vài phút với một tách trà thảo mộc.",
        cs: "Po proceduře si můžete chvíli posedět u bylinkového čaje.",
        en: "After your treatment you are welcome to stay a few minutes for herbal tea.",
        de: "Nach der Behandlung können Sie noch bei einem Kräutertee verweilen.",
      },
    ],
    team: [
      { name: "Hana", role: { vi: "Chuyên viên chăm sóc da", cs: "Kosmetička", en: "Skin therapist", de: "Kosmetikerin" }, bio: { vi: "Phụ trách các liệu trình da mặt.", cs: "Stará se o ošetření pleti.", en: "Leads the facial treatments.", de: "Verantwortlich für Gesichtsbehandlungen." }, visual: { v: 0, alt: { vi: "Minh họa đá xếp", cs: "Ilustrace kamenů", en: "Illustration of stacked stones", de: "Illustration gestapelter Steine" } } },
      { name: "Thu", role: { vi: "Massage thư giãn", cs: "Masérka", en: "Massage therapist", de: "Masseurin" }, bio: { vi: "Massage nhịp chậm với dầu ấm.", cs: "Pomalé masáže s teplým olejem.", en: "Slow massages with warm oil.", de: "Ruhige Massagen mit warmem Öl." }, visual: { v: 2, alt: { vi: "Minh họa gợn nước", cs: "Ilustrace vodní hladiny", en: "Illustration of water ripples", de: "Illustration von Wasserringen" } } },
    ],
    values: [
      { title: { vi: "Yên tĩnh", cs: "Klid", en: "Quiet", de: "Ruhe" }, text: { vi: "Điện thoại để im lặng trong phòng.", cs: "Telefony v ošetřovně ztišíme.", en: "Phones stay silent in the rooms.", de: "Telefone bleiben im Raum stumm." } },
      { title: { vi: "Tự nhiên", cs: "Přírodní", en: "Natural", de: "Natürlich" }, text: { vi: "Vật liệu và mùi hương nhẹ nhàng.", cs: "Jemné materiály a vůně.", en: "Soft materials and gentle scents.", de: "Sanfte Materialien und Düfte." } },
      { title: { vi: "Riêng tư", cs: "Soukromí", en: "Private", de: "Privat" }, text: { vi: "Mỗi lúc chỉ một khách trong phòng.", cs: "V místnosti je vždy jen jeden host.", en: "One guest per room at a time.", de: "Immer nur ein Gast pro Raum." } },
    ],
  },
  gallery: {
    title: { vi: "Hình ảnh", cs: "Galerie", en: "Gallery", de: "Galerie" },
    lead: { vi: "Không gian, chất liệu và những chi tiết nhỏ.", cs: "Prostor, materiály a drobné detaily.", en: "The space, the materials and the small details.", de: "Raum, Materialien und kleine Details." },
    items: [
      { v: 1, alt: { vi: "Cửa vòm và cây xanh", cs: "Oblouk a rostliny", en: "Arch and greenery", de: "Bogen und Pflanzen" } },
      { v: 0, alt: { vi: "Đá massage xếp chồng", cs: "Masážní kameny", en: "Stacked massage stones", de: "Gestapelte Massagesteine" } },
      { v: 2, alt: { vi: "Mặt nước tĩnh", cs: "Klidná hladina", en: "Still water", de: "Stilles Wasser" } },
      { v: 3, alt: { vi: "Cành ô liu", cs: "Olivová větvička", en: "Olive branch", de: "Olivenzweig" } },
      { v: 0, alt: { vi: "Góc nghỉ với đá", cs: "Odpočinkový koutek", en: "Resting corner", de: "Ruheecke" } },
      { v: 1, alt: { vi: "Phòng chăm sóc ánh sáng dịu", cs: "Ošetřovna v tlumeném světle", en: "Softly lit treatment room", de: "Behandlungsraum mit sanftem Licht" } },
    ],
  },
  contact: {
    title: { vi: "Liên hệ & đặt liệu trình", cs: "Kontakt a rezervace", en: "Contact & booking", de: "Kontakt & Termin" },
    lead: { vi: "Gửi yêu cầu, chúng tôi xác nhận giờ hẹn với bạn.", cs: "Pošlete žádost, termín vám potvrdíme.", en: "Send a request and we will confirm your time.", de: "Senden Sie eine Anfrage, wir bestätigen den Termin." },
    address: "Ukázková 7, 150 00 Praha 5",
    hours: [
      { days: { vi: "Thứ 2 – Thứ 6", cs: "Po – Pá", en: "Mon – Fri", de: "Mo – Fr" }, time: "10:00 – 20:00" },
      { days: { vi: "Thứ 7 – Chủ nhật", cs: "So – Ne", en: "Sat – Sun", de: "Sa – So" }, time: "10:00 – 16:00" },
    ],
    phone: "+420 123 456 781",
    email: "klid@saluna.example",
  },
};
