import type { L } from "./types";
import { tr } from "./types";

// Chữ giao diện dùng chung cho cả 4 website mẫu (nút, form, ghi chú demo)
export const UI = {
  disclaimer: {
    vi: "Website mẫu — thương hiệu, thông tin liên hệ và giá dịch vụ chỉ mang tính minh họa.",
    cs: "Ukázkový web — značka, kontakty a ceny služeb jsou pouze ilustrativní.",
    en: "Sample website — the brand, contact details and service prices are for illustration only.",
    de: "Musterwebsite — Marke, Kontaktdaten und Preise dienen nur zur Veranschaulichung.",
  },
  menu: { vi: "Menu", cs: "Menu", en: "Menu", de: "Menü" },
  close: { vi: "Đóng", cs: "Zavřít", en: "Close", de: "Schließen" },
  min: { vi: "phút", cs: "min", en: "min", de: "Min." },
  from: { vi: "từ", cs: "od", en: "from", de: "ab" },
  allServices: { vi: "Xem toàn bộ bảng giá", cs: "Celý ceník", en: "See the full price list", de: "Alle Preise ansehen" },
  aboutUs: { vi: "Về chúng tôi", cs: "O nás", en: "About us", de: "Über uns" },
  viewGallery: { vi: "Xem bộ sưu tập", cs: "Prohlédnout galerii", en: "View the gallery", de: "Galerie ansehen" },
  hours: { vi: "Giờ mở cửa", cs: "Otevírací doba", en: "Opening hours", de: "Öffnungszeiten" },
  address: { vi: "Địa chỉ", cs: "Adresa", en: "Address", de: "Adresse" },
  contact: { vi: "Liên hệ", cs: "Kontakt", en: "Contact", de: "Kontakt" },
  team: { vi: "Đội ngũ", cs: "Náš tým", en: "Our team", de: "Unser Team" },
  openImage: { vi: "Phóng to ảnh", cs: "Zvětšit fotografii", en: "Enlarge image", de: "Bild vergrößern" },
  prev: { vi: "Ảnh trước", cs: "Předchozí", en: "Previous", de: "Zurück" },
  next: { vi: "Ảnh sau", cs: "Další", en: "Next", de: "Weiter" },
  call: { vi: "Gọi điện", cs: "Zavolat", en: "Call", de: "Anrufen" },
  // Form đặt lịch minh hoạ
  form: {
    service: { vi: "Dịch vụ", cs: "Služba", en: "Service", de: "Leistung" },
    choose: { vi: "Chọn dịch vụ", cs: "Vyberte službu", en: "Choose a service", de: "Leistung wählen" },
    date: { vi: "Ngày", cs: "Datum", en: "Date", de: "Datum" },
    time: { vi: "Giờ", cs: "Čas", en: "Time", de: "Uhrzeit" },
    name: { vi: "Họ tên", cs: "Jméno", en: "Name", de: "Name" },
    phone: { vi: "Số điện thoại", cs: "Telefon", en: "Phone", de: "Telefon" },
    note: { vi: "Ghi chú (không bắt buộc)", cs: "Poznámka (nepovinné)", en: "Note (optional)", de: "Hinweis (optional)" },
    staff: { vi: "Người thực hiện", cs: "Kdo vás obslouží", en: "Who would you like?", de: "Wer soll Sie bedienen?" },
    anyone: { vi: "Ai cũng được", cs: "Kdokoli", en: "No preference", de: "Egal" },
    submit: { vi: "Gửi yêu cầu đặt lịch", cs: "Odeslat rezervaci", en: "Send booking request", de: "Termin anfragen" },
    hint: {
      vi: "Đây là form minh họa: thông tin bạn nhập không được lưu hay gửi đi.",
      cs: "Toto je ukázkový formulář: zadané údaje se nikam neukládají ani neodesílají.",
      en: "This is a sample form: nothing you enter is stored or sent.",
      de: "Dies ist ein Musterformular: Ihre Eingaben werden weder gespeichert noch gesendet.",
    },
    done: {
      vi: "Đây là bản demo, thông tin chưa được gửi.",
      cs: "Toto je ukázka, údaje nebyly odeslány.",
      en: "This is a demo, your details were not sent.",
      de: "Dies ist eine Demo, Ihre Angaben wurden nicht gesendet.",
    },
    doneText: {
      vi: "Trên website thật, nút này có thể dẫn đến trang đặt lịch SalonGo của salon.",
      cs: "Na skutečném webu může tlačítko vést na rezervační stránku salonu v SalonGo.",
      en: "On a real website, this button can lead to the salon's SalonGo booking page.",
      de: "Auf einer echten Website kann dieser Button zur SalonGo-Buchungsseite des Salons führen.",
    },
    again: { vi: "Thử lại", cs: "Zkusit znovu", en: "Try again", de: "Erneut versuchen" },
    callDemo: {
      vi: "Số điện thoại mẫu, không gọi được.",
      cs: "Ukázkové číslo, nelze volat.",
      en: "Sample number, it cannot be called.",
      de: "Beispielnummer, nicht erreichbar.",
    },
  },
} satisfies Record<string, L | Record<string, L>>;

/** "45 min", "từ 1 290 Kč" */
export const dur = (min: number, locale: string) => `${min} ${tr(UI.min, locale)}`;
export const price = (n: number, locale: string, from?: boolean) => {
  const v = `${n.toLocaleString("cs-CZ").replace(/\s/g, " ")} Kč`;
  return from ? `${tr(UI.from, locale)} ${v}` : v;
};
