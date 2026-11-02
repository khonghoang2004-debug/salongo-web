import type { TemplateContent } from "../types";

// Mẫu 4 — Barbershop cao cấp. Giá theo mặt bằng barbershop tầm trung–cao ở Praha (khảo sát 11/2026)
export const barber: TemplateContent = {
  slug: "brass-barber",
  name: "Brass & Walnut",
  motif: "barber",
  card: {
    type: { vi: "Barbershop", cs: "Barbershop", en: "Barbershop", de: "Barbershop" },
    style: {
      vi: "Than chì, gỗ óc chó và kem, điểm nhấn đồng trầm. Chữ mạnh, rõ, không tối đặc.",
      cs: "Grafit, ořech a krémová s bronzovým akcentem. Výrazné, čitelné písmo, žádná černá tma.",
      en: "Charcoal, walnut and cream with a bronze accent. Strong, readable type, never pitch black.",
      de: "Anthrazit, Nussbaum und Creme mit Bronze-Akzent. Kräftige, gut lesbare Schrift, nie tiefschwarz.",
    },
  },
  tagline: { vi: "Barbershop · Praha 1", cs: "Barbershop · Praha 1", en: "Barbershop · Prague 1", de: "Barbershop · Prag 1" },
  nav: {
    "": { vi: "Trang chủ", cs: "Úvod", en: "Home", de: "Start" },
    "dich-vu": { vi: "Dịch vụ", cs: "Ceník", en: "Services", de: "Leistungen" },
    "gioi-thieu": { vi: "Thợ cắt", cs: "Barbeři", en: "Barbers", de: "Barbiere" },
    "bo-suu-tap": { vi: "Phong cách", cs: "Styly", en: "Styles", de: "Styles" },
    "dat-lich": { vi: "Đặt lịch", cs: "Rezervace", en: "Book", de: "Termin" },
  },
  bookLabel: { vi: "Đặt lịch cắt", cs: "Rezervovat", en: "Book a chair", de: "Platz buchen" },
  home: {
    kicker: { vi: "Cắt tóc & râu nam", cs: "Pánské střihy a vousy", en: "Men's cuts & beards", de: "Herrenschnitte & Bärte" },
    title: {
      vi: "Cắt gọn. Râu sắc nét. Không vội vàng.",
      cs: "Čistý střih. Ostré vousy. Bez spěchu.",
      en: "Clean cuts. Sharp beards. No rush.",
      de: "Saubere Schnitte. Klare Bärte. Ohne Eile.",
    },
    lead: {
      vi: "Barbershop ba ghế ở trung tâm Praha. Fade, cắt kéo cổ điển, cạo khăn nóng và tư vấn kiểu tóc hợp khuôn mặt.",
      cs: "Barbershop se třemi křesly v centru Prahy. Fade, klasické střihy nůžkami, holení s horkým ručníkem a rada, co vám sedne.",
      en: "A three-chair barbershop in central Prague. Fades, classic scissor cuts, hot-towel shaves and advice on what suits you.",
      de: "Ein Barbershop mit drei Stühlen im Zentrum von Prag. Fades, klassische Scherenschnitte, Heißtuchrasur und Beratung.",
    },
    hero: { v: 0, alt: { vi: "Minh họa cột barber", cs: "Ilustrace barberského sloupu", en: "Illustration of a barber pole", de: "Illustration einer Barber-Säule" } },
    intro: {
      title: { vi: "Mỗi khách một thợ, từ đầu đến cuối", cs: "Jeden barber od začátku do konce", en: "One barber, start to finish", de: "Ein Barbier von Anfang bis Ende" },
      text: {
        vi: "Bạn chọn thợ khi đặt lịch. Thợ đó gội, cắt, chỉnh râu và chỉ cho bạn cách vuốt sáp ở nhà.",
        cs: "Barbera si vyberete při rezervaci. Umyje, ostříhá, upraví vousy a ukáže, jak se doma učesat.",
        en: "You choose your barber when booking. They wash, cut, shape the beard and show you how to style it at home.",
        de: "Sie wählen Ihren Barbier bei der Buchung. Er wäscht, schneidet, formt den Bart und zeigt das Styling für zu Hause.",
      },
    },
    highlights: [
      {
        title: { vi: "Chọn thợ khi đặt", cs: "Výběr barbera", en: "Pick your barber", de: "Barbier wählen" },
        text: { vi: "Mỗi lần quay lại vẫn là người quen.", cs: "Pokaždé ke stejnému člověku.", en: "The same barber every visit.", de: "Jedes Mal derselbe Barbier." },
      },
      {
        title: { vi: "Khăn nóng", cs: "Horký ručník", en: "Hot towel", de: "Heißes Tuch" },
        text: { vi: "Cạo râu theo cách truyền thống.", cs: "Holení po staru.", en: "A traditional shave.", de: "Klassische Rasur." },
      },
      {
        title: { vi: "Đúng giờ", cs: "Na čas", en: "On time", de: "Pünktlich" },
        text: { vi: "Đặt giờ nào, ngồi ghế giờ đó.", cs: "Kdy se objednáte, tehdy sedíte v křesle.", en: "Book a time, sit down at that time.", de: "Gebucht ist gebucht, ohne Warten." },
      },
    ],
    featured: [
      [0, 0],
      [0, 1],
      [1, 0],
      [2, 0],
    ],
    closing: {
      title: { vi: "Ghế đang chờ bạn", cs: "Křeslo je připravené", en: "Your chair is ready", de: "Ihr Stuhl ist bereit" },
      text: { vi: "Chọn dịch vụ, chọn thợ, chọn giờ.", cs: "Vyberte službu, barbera a čas.", en: "Choose a service, a barber and a time.", de: "Leistung, Barbier und Uhrzeit wählen." },
    },
  },
  services: {
    title: { vi: "Dịch vụ", cs: "Ceník", en: "Services", de: "Leistungen" },
    lead: {
      vi: "Mọi dịch vụ cắt đều gồm gội và tạo kiểu.",
      cs: "Každý střih zahrnuje mytí a styling.",
      en: "Every cut includes a wash and styling.",
      de: "Jeder Schnitt inklusive Waschen und Styling.",
    },
    groups: [
      {
        name: { vi: "Tóc", cs: "Vlasy", en: "Hair", de: "Haare" },
        items: [
          { name: { vi: "Cắt tóc nam", cs: "Pánský střih", en: "Men's haircut", de: "Herrenschnitt" }, desc: { vi: "Kéo hoặc tông đơ", cs: "Nůžky nebo strojek", en: "Scissors or clippers", de: "Schere oder Maschine" }, min: 45, price: 690 },
          { name: { vi: "Skin fade", cs: "Skin fade", en: "Skin fade", de: "Skin Fade" }, min: 50, price: 750 },
          { name: { vi: "Cắt cho bé (dưới 12 tuổi)", cs: "Dětský střih (do 12 let)", en: "Kids' cut (under 12)", de: "Kinderschnitt (unter 12)" }, min: 30, price: 450 },
        ],
      },
      {
        name: { vi: "Râu", cs: "Vousy", en: "Beard", de: "Bart" },
        items: [
          { name: { vi: "Tỉa & tạo form râu", cs: "Úprava vousů", en: "Beard trim & shape", de: "Bart trimmen & formen" }, min: 30, price: 450 },
          { name: { vi: "Cạo khăn nóng", cs: "Holení s horkým ručníkem", en: "Hot-towel shave", de: "Heißtuchrasur" }, desc: { vi: "Dao cạo, dưỡng sau cạo", cs: "Břitva, péče po holení", en: "Straight razor, aftercare", de: "Rasiermesser, Pflege danach" }, min: 40, price: 590 },
        ],
      },
      {
        name: { vi: "Combo", cs: "Kombinace", en: "Combos", de: "Kombis" },
        items: [
          { name: { vi: "Tóc + râu", cs: "Střih + vousy", en: "Haircut + beard", de: "Haare + Bart" }, min: 75, price: 1050 },
          { name: { vi: "Combo đầy đủ", cs: "Kompletní péče", en: "The full service", de: "Komplettpaket" }, desc: { vi: "Tóc, râu khăn nóng, đắp mặt nạ", cs: "Střih, holení s ručníkem, maska", en: "Cut, hot-towel beard, face mask", de: "Schnitt, Heißtuch-Bart, Maske" }, min: 90, price: 1390 },
        ],
      },
    ],
    note: {
      vi: "Đến trễ hơn 15 phút, chúng tôi có thể phải dời lịch.",
      cs: "Při zpoždění nad 15 minut může být nutné termín přesunout.",
      en: "If you are more than 15 minutes late we may need to reschedule.",
      de: "Bei mehr als 15 Minuten Verspätung müssen wir eventuell verschieben.",
    },
  },
  about: {
    title: { vi: "Thợ cắt", cs: "Barbeři", en: "The barbers", de: "Die Barbiere" },
    lead: {
      vi: "Ba người thợ, mỗi người một thế mạnh. Bạn chọn khi đặt lịch.",
      cs: "Tři barbeři, každý se svou specializací. Vyberete si při rezervaci.",
      en: "Three barbers, each with a speciality. Choose one when you book.",
      de: "Drei Barbiere mit eigenen Stärken. Sie wählen bei der Buchung.",
    },
    story: [
      {
        vi: "Brass & Walnut là một tiệm nhỏ: ghế da, gương lớn, đèn ấm và nhạc vừa đủ nghe.",
        cs: "Brass & Walnut je malý podnik: kožená křesla, velká zrcadla, teplé světlo a hudba akorát nahlas.",
        en: "Brass & Walnut is a small shop: leather chairs, big mirrors, warm light and music at the right volume.",
        de: "Brass & Walnut ist ein kleiner Laden: Ledersessel, große Spiegel, warmes Licht und Musik in angenehmer Lautstärke.",
      },
    ],
    team: [
      { name: "Tomáš", role: { vi: "Fade & tóc ngắn", cs: "Fade a krátké střihy", en: "Fades & short cuts", de: "Fades & Kurzhaar" }, bio: { vi: "Đường fade mượt, chân tóc gọn.", cs: "Plynulé přechody a čisté kontury.", en: "Smooth fades and clean lines.", de: "Weiche Übergänge, saubere Konturen." }, visual: { v: 3, alt: { vi: "Minh họa khung đồng", cs: "Ilustrace bronzového rámu", en: "Illustration of a bronze frame", de: "Illustration eines Bronzerahmens" } } },
      { name: "Duc", role: { vi: "Râu & cạo khăn nóng", cs: "Vousy a holení", en: "Beards & shaves", de: "Bärte & Rasur" }, bio: { vi: "Cạo dao cổ điển, tạo form râu theo khuôn mặt.", cs: "Klasická břitva a tvar vousů podle obličeje.", en: "Straight razor work and face-led beard shapes.", de: "Rasiermesser und Bartform nach Gesichtsform." }, visual: { v: 1, alt: { vi: "Minh họa dao cạo", cs: "Ilustrace břitvy", en: "Illustration of a razor", de: "Illustration eines Rasiermessers" } } },
      { name: "Marek", role: { vi: "Cắt kéo cổ điển", cs: "Klasické střihy nůžkami", en: "Classic scissor cuts", de: "Klassische Scherenschnitte" }, bio: { vi: "Tóc dài vừa, rẽ ngôi, kiểu công sở.", cs: "Střední délky, pěšinky, business styl.", en: "Mid-length, side parts, business looks.", de: "Mittellang, Seitenscheitel, Business-Look." }, visual: { v: 2, alt: { vi: "Minh họa vòng cung đồng", cs: "Ilustrace bronzových oblouků", en: "Illustration of bronze arcs", de: "Illustration von Bronzebögen" } } },
    ],
    values: [
      { title: { vi: "Gọn", cs: "Čistota", en: "Clean", de: "Sauber" }, text: { vi: "Dụng cụ vệ sinh sau mỗi khách.", cs: "Nástroje čistíme po každém klientovi.", en: "Tools cleaned after every client.", de: "Werkzeug nach jedem Kunden gereinigt." } },
      { title: { vi: "Thẳng", cs: "Přímost", en: "Straight", de: "Direkt" }, text: { vi: "Nói rõ kiểu nào hợp, kiểu nào không.", cs: "Řekneme, co vám sedne a co ne.", en: "We tell you what suits you and what doesn't.", de: "Wir sagen, was passt und was nicht." } },
      { title: { vi: "Đúng hẹn", cs: "Dochvilnost", en: "Punctual", de: "Pünktlich" }, text: { vi: "Lịch được giữ theo phút.", cs: "Termíny držíme na minutu.", en: "Bookings are kept to the minute.", de: "Termine auf die Minute." } },
    ],
  },
  gallery: {
    title: { vi: "Phong cách", cs: "Styly", en: "Styles", de: "Styles" },
    lead: { vi: "Một số kiểu tóc và râu khách hay chọn.", cs: "Střihy a vousy, které si klienti často vybírají.", en: "Cuts and beards our clients often choose.", de: "Schnitte und Bärte, die oft gewählt werden." },
    items: [
      { v: 0, alt: { vi: "Cột barber sọc đồng", cs: "Barberský sloup", en: "Barber pole", de: "Barber-Säule" } },
      { v: 1, alt: { vi: "Dao cạo cổ điển", cs: "Klasická břitva", en: "Classic straight razor", de: "Klassisches Rasiermesser" } },
      { v: 3, alt: { vi: "Kiểu tóc rẽ ngôi", cs: "Střih s pěšinkou", en: "Side-part cut", de: "Seitenscheitel" } },
      { v: 2, alt: { vi: "Skin fade", cs: "Skin fade", en: "Skin fade", de: "Skin Fade" } },
      { v: 1, alt: { vi: "Râu tỉa gọn", cs: "Upravené vousy", en: "Trimmed beard", de: "Getrimmter Bart" } },
      { v: 0, alt: { vi: "Crop có texture", cs: "Texturovaný crop", en: "Textured crop", de: "Texturierter Crop" } },
    ],
  },
  contact: {
    title: { vi: "Đặt lịch", cs: "Rezervace", en: "Booking", de: "Termin" },
    lead: { vi: "Chọn dịch vụ, thợ và giờ. Chúng tôi xác nhận qua tin nhắn.", cs: "Vyberte službu, barbera a čas. Potvrdíme zprávou.", en: "Choose a service, a barber and a time. We confirm by text.", de: "Leistung, Barbier und Zeit wählen. Wir bestätigen per SMS." },
    address: "Ukázková 3, 110 00 Praha 1",
    hours: [
      { days: { vi: "Thứ 2 – Thứ 6", cs: "Po – Pá", en: "Mon – Fri", de: "Mo – Fr" }, time: "10:00 – 21:00" },
      { days: { vi: "Thứ 7", cs: "So", en: "Sat", de: "Sa" }, time: "10:00 – 18:00" },
    ],
    phone: "+420 123 456 782",
    email: "kreslo@brasswalnut.example",
  },
};
