import type { L, TemplateContent } from "../types";
import { nail } from "./nail";
import { hair } from "./hair";
import { spa } from "./spa";
import { barber } from "./barber";
import { velvet } from "./velvet";
import { aurel } from "./aurel";

const t = (vi: string, cs: string, en: string, de: string): L => ({ vi, cs, en, de });

type Override = {
  base: TemplateContent;
  slug: string;
  name: string;
  card: TemplateContent["card"];
  tagline: L;
  kicker: L;
  title: L;
  lead: L;
  closing: L;
  team: string[];
  address: string;
  phone: string;
  email: string;
};

// 7 mẫu nhiều màu: dịch vụ, bảng giá, trang giới thiệu lấy từ mẫu cùng ngành; thương hiệu, câu chữ đầu trang,
// tên thợ và liên hệ (minh hoạ) là riêng. Giao diện riêng nằm ở sites/ThemedSite.tsx (THEMES).
function derive(o: Override): TemplateContent {
  // Đổi mọi chỗ nhắc tên thương hiệu gốc (vd. "Về Aurel", "Verra là một studio…") sang tên mới
  const b: TemplateContent = JSON.parse(JSON.stringify(o.base).split(o.base.name).join(o.name));
  return {
    ...b,
    slug: o.slug,
    name: o.name,
    card: o.card,
    tagline: o.tagline,
    home: { ...b.home, kicker: o.kicker, title: o.title, lead: o.lead, closing: { title: o.closing, text: b.home.closing.text } },
    about: { ...b.about, team: b.about.team.map((m, i) => ({ ...m, name: o.team[i] ?? m.name })) },
    contact: { ...b.contact, address: o.address, phone: o.phone, email: o.email },
  };
}

export const tropicana = derive({
  base: nail,
  slug: "tropicana-nails",
  name: "Tropicana",
  card: {
    type: t("Nail studio", "Nehtové studio", "Nail studio", "Nagelstudio"),
    style: t("San hô, xanh ngọc và vàng nắng. Tươi, vui, kiểu poster mùa hè.", "Korálová, tyrkysová a sluneční žlutá. Svěží letní plakát.", "Coral, turquoise and sunshine yellow. A fresh summer poster.", "Koralle, Türkis und Sonnengelb. Ein frisches Sommerplakat."),
  },
  tagline: t("Nails & good vibes · Praha 4", "Nails & good vibes · Praha 4", "Nails & good vibes · Prague 4", "Nails & Good Vibes · Prag 4"),
  kicker: t("Gel · Pedicure · Nail art", "Gel · Pedikúra · Nail art", "Gel · Pedicure · Nail art", "Gel · Pediküre · Nail Art"),
  title: t("Móng xinh như kỳ nghỉ", "Nehty jako na dovolené", "Nails like a holiday", "Nägel wie Urlaub"),
  lead: t("Màu tươi, ngồi thoải mái, nhạc vui.", "Svěží barvy, pohodlí, dobrá hudba.", "Bright colours, comfy seats, good music.", "Frische Farben, bequem, gute Musik."),
  closing: t("Đặt chỗ cho bộ móng mùa hè", "Rezervujte letní nehty", "Book your summer nails", "Sommernägel buchen"),
  team: ["Lan", "Sára", "Ngọc"],
  address: "Ukázková 14, 140 00 Praha 4",
  phone: "+420 123 456 787",
  email: "aloha@tropicana.example",
});

export const lilac = derive({
  base: velvet,
  slug: "lilac-lash",
  name: "Lilac Lab",
  card: {
    type: t("Mi & chân mày", "Řasy a obočí", "Lash & brow", "Wimpern & Brauen"),
    style: t("Tím lilac và xanh bạc hà, bo tròn mềm, hiện đại và trẻ.", "Šeříková a mátová, měkké tvary, moderní a mladé.", "Lilac and mint, soft rounded shapes, modern and young.", "Flieder und Mint, weiche Formen, modern und jung."),
  },
  tagline: t("Lash & brow lab · Praha 5", "Lash & brow lab · Praha 5", "Lash & brow lab · Prague 5", "Lash & Brow Lab · Prag 5"),
  kicker: t("Lash lift · Brow lamination", "Lash lift · Laminace obočí", "Lash lift · Brow lamination", "Lash Lift · Brow Lamination"),
  title: t("Mi cong, mày gọn, sáng nào cũng đẹp", "Natočené řasy, upravené obočí, každé ráno", "Curled lashes, neat brows, every morning", "Geschwungene Wimpern, klare Brauen, jeden Morgen"),
  lead: t("Liệu trình nhanh, kết quả tự nhiên.", "Rychlé ošetření, přirozený výsledek.", "Quick treatments, natural results.", "Schnelle Behandlung, natürliches Ergebnis."),
  closing: t("Thử lash lift lần đầu?", "Poprvé lash lift?", "First lash lift?", "Erster Lash Lift?"),
  team: ["Vy", "Nikola"],
  address: "Ukázková 5, 150 00 Praha 5",
  phone: "+420 123 456 788",
  email: "hey@lilaclab.example",
});

export const cherry = derive({
  base: hair,
  slug: "cherry-hair",
  name: "Cherry Club",
  card: {
    type: t("Salon tóc", "Kadeřnictví", "Hair salon", "Friseursalon"),
    style: t("Đỏ cherry và vàng mù tạt kiểu retro 70s, chữ in hoa đậm.", "Třešňová a hořčicová v retro stylu 70. let, výrazné verzálky.", "Cherry red and mustard, 70s retro, bold capitals.", "Kirschrot und Senf im 70er-Retro-Stil, kräftige Versalien."),
  },
  tagline: t("Hair club · Praha 2", "Hair club · Praha 2", "Hair club · Prague 2", "Hair Club · Prag 2"),
  kicker: t("Cắt · Màu · Uốn", "Střih · Barva · Trvalá", "Cut · Colour · Perm", "Schnitt · Farbe · Dauerwelle"),
  title: t("Tóc đẹp, tâm trạng tốt", "Dobré vlasy, dobrá nálada", "Good hair, good mood", "Gute Haare, gute Laune"),
  lead: t("Salon vui vẻ cho mái tóc có cá tính.", "Veselý salon pro vlasy s charakterem.", "A cheerful salon for hair with character.", "Ein fröhlicher Salon für Haare mit Charakter."),
  closing: t("Ghé Cherry Club", "Zastavte se v Cherry Club", "Drop by Cherry Club", "Komm in den Cherry Club"),
  team: ["Bára", "Tuấn", "Eva"],
  address: "Ukázková 70, 120 00 Praha 2",
  phone: "+420 123 456 789",
  email: "hi@cherryclub.example",
});

export const matcha = derive({
  base: spa,
  slug: "matcha-spa",
  name: "Matcha Room",
  card: {
    type: t("Beauty & spa", "Kosmetika a spa", "Beauty & spa", "Beauty & Spa"),
    style: t("Xanh matcha tươi và cam đất, serif mềm, cảm giác tự nhiên.", "Svěží matcha a terakota, měkké patkové písmo, přírodní pocit.", "Fresh matcha green and terracotta, soft serif, a natural feel.", "Frisches Matcha-Grün und Terrakotta, weiche Serifen, natürlich."),
  },
  tagline: t("Skin & spa · Praha 6", "Skin & spa · Praha 6", "Skin & spa · Prague 6", "Skin & Spa · Prag 6"),
  kicker: t("Da mặt · Massage", "Pleť · Masáže", "Facials · Massage", "Gesicht · Massage"),
  title: t("Một tách trà, một giờ cho da", "Šálek čaje a hodina pro pleť", "A cup of tea, an hour for your skin", "Eine Tasse Tee, eine Stunde für die Haut"),
  lead: t("Chăm sóc nhẹ nhàng trong không gian xanh.", "Jemná péče v zeleném prostoru.", "Gentle care in a green space.", "Sanfte Pflege im grünen Raum."),
  closing: t("Dành một giờ cho mình", "Dopřejte si hodinu", "Take an hour for yourself", "Gönnen Sie sich eine Stunde"),
  team: ["Mai", "Lucie"],
  address: "Ukázková 18, 160 00 Praha 6",
  phone: "+420 123 456 790",
  email: "tea@matcharoom.example",
});

export const azure = derive({
  base: barber,
  slug: "azure-barber",
  name: "Azure Barbers",
  card: {
    type: t("Barbershop", "Barbershop", "Barbershop", "Barbershop"),
    style: t("Xanh navy cổ điển, trắng và đỏ, chữ in hoa sắc nét.", "Klasická námořnická modř, bílá a červená, ostré verzálky.", "Classic navy, white and red, sharp capitals.", "Klassisches Marineblau, Weiß und Rot, klare Versalien."),
  },
  tagline: t("Barbershop · Praha 8", "Barbershop · Praha 8", "Barbershop · Prague 8", "Barbershop · Prag 8"),
  kicker: t("Cắt · Râu · Khăn nóng", "Střih · Vousy · Horký ručník", "Cut · Beard · Hot towel", "Schnitt · Bart · Heißes Tuch"),
  title: t("Gọn gàng như mới ra khỏi tiệm", "Upravený jako z holičství", "Sharp, every single time", "Gepflegt, jedes Mal"),
  lead: t("Barbershop sáng sủa, đặt giờ là có ghế.", "Světlý barbershop, objednáte a sedíte.", "A bright barbershop, book and sit down.", "Heller Barbershop, buchen und hinsetzen."),
  closing: t("Ghế của bạn đã sẵn", "Křeslo je volné", "Your chair is ready", "Dein Stuhl ist frei"),
  team: ["Ondřej", "Minh", "Pavel"],
  address: "Ukázková 2, 180 00 Praha 8",
  phone: "+420 123 456 791",
  email: "chair@azure.example",
});

export const rose = derive({
  base: aurel,
  slug: "rose-bridal",
  name: "Rosé Bridal",
  card: {
    type: t("Makeup cô dâu", "Svatební make-up", "Bridal makeup", "Braut-Make-up"),
    style: t("Hồng rosé đậm và đào, chữ nghiêng lãng mạn, hợp makeup cưới.", "Sytá růžová a broskvová, romantická kurzíva pro svatby.", "Deep rosé and peach, romantic italics for bridal makeup.", "Kräftiges Rosé und Pfirsich, romantische Kursive für Bräute."),
  },
  tagline: t("Bridal & event makeup · Praha 1", "Svatební a večerní líčení · Praha 1", "Bridal & event makeup · Prague 1", "Braut- & Event-Make-up · Prag 1"),
  kicker: t("Cô dâu · Đính hôn · Tiệc", "Nevěsty · Zásnuby · Večírky", "Brides · Engagements · Parties", "Bräute · Verlobung · Feiern"),
  title: t("Rạng rỡ trong ngày trọng đại", "Zářit ve velký den", "Glowing on your big day", "Strahlend am großen Tag"),
  lead: t("Trang điểm cô dâu, thử trước, đúng giờ.", "Svatební líčení se zkouškou, včas.", "Bridal makeup with a trial, on time.", "Braut-Make-up mit Probe, pünktlich."),
  closing: t("Đặt lịch thử trang điểm", "Objednejte zkoušku líčení", "Book your makeup trial", "Probe-Make-up buchen"),
  team: ["Hà", "Tereza"],
  address: "Ukázková 11, 110 00 Praha 1",
  phone: "+420 123 456 792",
  email: "bride@rose.example",
});

export const saffron = derive({
  base: hair,
  slug: "saffron-color",
  name: "Saffron",
  card: {
    type: t("Studio màu tóc", "Studio barev", "Hair colour studio", "Haarfarben-Studio"),
    style: t("Vàng nghệ và tím đậm, bố cục chia đôi mạnh, dành cho salon chuyên màu.", "Šafránová a tmavě fialová, výrazné dělené rozvržení pro barvení.", "Saffron and deep violet, a bold split layout for colour salons.", "Safran und tiefes Violett, kräftiges geteiltes Layout für Coloration."),
  },
  tagline: t("Colour studio · Praha 3", "Colour studio · Praha 3", "Colour studio · Prague 3", "Colour Studio · Prag 3"),
  kicker: t("Balayage · Highlight · Màu thời trang", "Balayage · Melír · Módní barvy", "Balayage · Highlights · Fashion colour", "Balayage · Strähnen · Modefarben"),
  title: t("Màu tóc là chữ ký của bạn", "Barva vlasů je váš podpis", "Your colour is your signature", "Ihre Haarfarbe ist Ihre Signatur"),
  lead: t("Chuyên màu, từ tự nhiên đến táo bạo.", "Specialisté na barvy, od přirozených po odvážné.", "Colour specialists, from natural to bold.", "Farbspezialisten, von natürlich bis mutig."),
  closing: t("Chọn màu tiếp theo", "Vyberte další barvu", "Choose your next colour", "Wählen Sie Ihre nächste Farbe"),
  team: ["Dana", "Hùng", "Iva"],
  address: "Ukázková 40, 130 00 Praha 3",
  phone: "+420 123 456 793",
  email: "colour@saffron.example",
});
