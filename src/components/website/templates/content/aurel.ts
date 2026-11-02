import type { L, TemplateContent } from "../types";

const t = (vi: string, cs: string, en: string, de: string): L => ({ vi, cs, en, de });

// Mẫu 8 — Aurel: makeup & beauty boutique. Xanh ngọc lục bảo / kem / vàng ánh kim, Prata + Montserrat
export const aurel: TemplateContent = {
  slug: "aurel-beauty",
  name: "Aurel",
  motif: "makeup",
  card: {
    type: t("Makeup & beauty", "Make-up a kosmetika", "Makeup & beauty", "Make-up & Beauty"),
    style: t(
      "Boutique sang trọng: xanh lục bảo, kem và vàng, chữ serif cổ điển, bố cục đối xứng.",
      "Luxusní butik: smaragdová, krémová a zlatá, klasické patkové písmo, symetrie.",
      "A luxury boutique: emerald, cream and gold, classic serif, symmetrical layout.",
      "Luxus-Boutique: Smaragd, Creme und Gold, klassische Serifen, symmetrisch."
    ),
  },
  tagline: t("Makeup & beauty boutique · Praha 2", "Make-up & beauty butik · Praha 2", "Makeup & beauty boutique · Prague 2", "Make-up & Beauty Boutique · Prag 2"),
  nav: {
    "": t("Trang chủ", "Úvod", "Home", "Start"),
    "dich-vu": t("Dịch vụ", "Služby", "Services", "Leistungen"),
    "gioi-thieu": t("Về Aurel", "O nás", "About", "Über uns"),
    "bo-suu-tap": t("Dịp đặc biệt", "Příležitosti", "Occasions", "Anlässe"),
    "dat-lich": t("Đặt lịch", "Rezervace", "Book", "Termin"),
  },
  bookLabel: t("Đặt lịch", "Rezervovat", "Book now", "Jetzt buchen"),
  home: {
    kicker: t("Trang điểm · Chăm sóc da · Cô dâu", "Make-up · Péče o pleť · Svatby", "Makeup · Skin · Bridal", "Make-up · Haut · Braut"),
    title: t("Vẻ đẹp cho những dịp đáng nhớ", "Krása pro výjimečné chvíle", "Beauty for the moments that matter", "Schönheit für besondere Momente"),
    lead: t("Trang điểm cô dâu, dạ tiệc và chụp ảnh.", "Svatební, večerní a foto make-up.", "Bridal, evening and photo makeup.", "Braut-, Abend- und Foto-Make-up."),
    hero: { v: 1, alt: t("Minh họa hộp phấn", "Ilustrace pudřenky", "Illustration of a compact", "Illustration einer Puderdose") },
    intro: {
      title: t("Chậm rãi và chỉn chu", "S klidem a pečlivostí", "Unhurried and precise", "In Ruhe und präzise"),
      text: t("Thử trang điểm trước ngày quan trọng.", "Zkouška líčení před velkým dnem.", "A makeup trial before the big day.", "Probe-Make-up vor dem großen Tag."),
    },
    highlights: [
      { title: t("Thử trước", "Zkouška", "Trial", "Probe"), text: t("Chốt phong cách trước.", "Styl doladíme předem.", "We agree the look first.", "Look vorab festlegen.") },
      { title: t("Tận nơi", "Výjezd", "On location", "Vor Ort"), text: t("Liên hệ để được tư vấn.", "Domluvíme individuálně.", "Ask us about it.", "Auf Anfrage.") },
      { title: t("Sản phẩm cao cấp", "Prémiová kosmetika", "Premium products", "Premium-Produkte"), text: t("Bền màu cả ngày.", "Vydrží celý den.", "Lasts all day.", "Hält den ganzen Tag.") },
    ],
    featured: [
      [0, 0],
      [0, 1],
      [1, 0],
    ],
    closing: { title: t("Ngày của bạn, vẻ đẹp của bạn", "Váš den, vaše krása", "Your day, your beauty", "Ihr Tag, Ihre Schönheit"), text: t("Đặt lịch thử trang điểm.", "Objednejte se na zkoušku.", "Book a trial.", "Probe buchen.") },
  },
  services: {
    title: t("Dịch vụ", "Služby", "Services", "Leistungen"),
    lead: t("Giá cho một người.", "Ceny za osobu.", "Prices per person.", "Preise pro Person."),
    groups: [
      {
        name: t("Trang điểm", "Make-up", "Makeup", "Make-up"),
        items: [
          { name: t("Trang điểm cô dâu", "Svatební líčení", "Bridal makeup", "Braut-Make-up"), desc: t("Gồm buổi thử", "Včetně zkoušky", "Includes a trial", "Inklusive Probe"), min: 150, price: 3490 },
          { name: t("Trang điểm dạ tiệc", "Večerní líčení", "Evening makeup", "Abend-Make-up"), min: 60, price: 1290 },
          { name: t("Trang điểm chụp ảnh", "Líčení na focení", "Photo makeup", "Foto-Make-up"), min: 75, price: 1490 },
          { name: t("Lớp học tự trang điểm", "Kurz líčení", "Makeup lesson", "Schminkkurs"), min: 90, price: 1690 },
        ],
      },
      {
        name: t("Chăm sóc da", "Péče o pleť", "Skin", "Haut"),
        items: [
          { name: t("Chăm sóc da trước sự kiện", "Ošetření před akcí", "Pre-event facial", "Gesichtspflege vor dem Event"), min: 60, price: 1190 },
          { name: t("Làm sạch sâu", "Hloubkové čištění", "Deep cleanse", "Tiefenreinigung"), min: 75, price: 1290 },
        ],
      },
    ],
    note: t("Trang điểm ngoài studio: liên hệ để được tư vấn.", "Líčení mimo studio: ozvěte se nám.", "Makeup away from the studio: contact us.", "Make-up außerhalb des Studios: bitte anfragen."),
  },
  about: {
    title: t("Về Aurel", "O Aurel", "About Aurel", "Über Aurel"),
    lead: t("Một phòng trang điểm, ánh sáng chuẩn.", "Jedno studio, správné světlo.", "One studio, the right light.", "Ein Studio, das richtige Licht."),
    story: [t("Gương đèn, ghế cao, không gian riêng cho cô dâu và người thân.", "Zrcadla se světlem, vysoká křesla, soukromí pro nevěstu i doprovod.", "Lit mirrors, tall chairs and privacy for the bride and family.", "Beleuchtete Spiegel, hohe Stühle, Ruhe für Braut und Familie.")],
    team: [
      { name: "Thảo", role: t("Makeup artist", "Vizážistka", "Makeup artist", "Visagistin"), bio: t("Cô dâu và tông da tự nhiên.", "Nevěsty a přirozený tón pleti.", "Brides and natural skin.", "Bräute und natürlicher Teint."), visual: { v: 0, alt: t("Minh họa thỏi son", "Ilustrace rtěnky", "Illustration of a lipstick", "Illustration eines Lippenstifts") } },
      { name: "Petra", role: t("Chăm sóc da", "Kosmetička", "Skin therapist", "Kosmetikerin"), bio: t("Chuẩn bị da trước sự kiện.", "Příprava pleti před akcí.", "Prepares skin before events.", "Hautvorbereitung vor Events."), visual: { v: 3, alt: t("Minh họa bảng phấn", "Ilustrace paletky", "Illustration of a palette", "Illustration einer Palette") } },
    ],
    values: [
      { title: t("Tinh tế", "Jemnost", "Refined", "Fein"), text: t("Đẹp mà vẫn là bạn.", "Krásná, a pořád vy.", "Beautiful, still you.", "Schön und trotzdem Sie.") },
      { title: t("Đúng giờ", "Dochvilnost", "On time", "Pünktlich"), text: t("Ngày cưới không được trễ.", "Na svatbu se nečeká.", "Weddings don't wait.", "Hochzeiten warten nicht.") },
      { title: t("Riêng tư", "Soukromí", "Private", "Privat"), text: t("Một khách mỗi lúc.", "Vždy jen jedna klientka.", "One client at a time.", "Immer eine Kundin.") },
    ],
  },
  gallery: {
    title: t("Dịp đặc biệt", "Příležitosti", "Occasions", "Anlässe"),
    lead: t("Cô dâu, dạ tiệc, chụp ảnh.", "Svatby, večery, focení.", "Bridal, evening, photo.", "Braut, Abend, Foto."),
    items: [
      { v: 1, alt: t("Cô dâu · tông tự nhiên", "Nevěsta · přirozený tón", "Bridal · natural", "Braut · natürlich") },
      { v: 0, alt: t("Dạ tiệc · môi đỏ", "Večer · červené rty", "Evening · red lip", "Abend · rote Lippen") },
      { v: 2, alt: t("Chụp ảnh · da sáng", "Focení · rozjasněná pleť", "Photo · glowing skin", "Foto · strahlende Haut") },
      { v: 3, alt: t("Bảng màu mùa thu", "Podzimní paleta", "Autumn palette", "Herbstpalette") },
      { v: 1, alt: t("Lễ đính hôn", "Zásnuby", "Engagement", "Verlobung") },
      { v: 0, alt: t("Sinh nhật", "Narozeniny", "Birthday", "Geburtstag") },
    ],
  },
  contact: {
    title: t("Đặt lịch", "Rezervace", "Booking", "Termin"),
    lead: t("Cho chúng tôi biết dịp của bạn.", "Napište nám, o jakou příležitost jde.", "Tell us about your occasion.", "Erzählen Sie uns vom Anlass."),
    address: "Ukázková 30, 120 00 Praha 2",
    hours: [
      { days: t("Thứ 3 – Chủ nhật", "Út – Ne", "Tue – Sun", "Di – So"), time: "9:00 – 19:00" },
    ],
    phone: "+420 123 456 786",
    email: "salon@aurel.example",
  },
};
