import { getPlans, priceRange, type DeskPlan, type SitePlan } from "@/lib/plans";

const SITE = "https://www.salongo.eu";

// llms.txt (https://llmstxt.org): tóm tắt cho trợ lý AI. Giá và giới hạn gói lấy từ app như trang Bảng giá,
// nên không còn lệch với giá đang bán (trước đây là file tĩnh trong public/).
export const revalidate = 60;

const HEAD = `# SalonGo

> SalonGo is salon management software for nail, hair, lash and beauty salons in Europe, built for Vietnamese-run salons (app in Vietnamese, Czech, Slovak, English, German and French). It runs in the browser, as a desktop app for Windows and macOS (Mac build signed), and in the phone browser. An iPhone and iPad app for signing in to existing accounts is on the App Store: https://apps.apple.com/app/salongo/id6831757876 Client booking page languages: Czech, Slovak, English, German, French. Plans differ by staff per location, number of locations and email marketing (none on Basic, 50 clients a day on Pro, unlimited on Premium).

Website: https://www.salongo.eu (languages: /vi, /cs, /de, /en). App: https://app.salongo.eu. Support in Vietnamese and Czech: salongosupport@gmail.com, +420 728 568 807. Operator: Nguyen Đuc Hoang Khong (sole trader), IČO 30241464, Svornosti 189, 252 42 Jesenice, Czech Republic.

## Features
- Online booking page for each salon (client picks service, staff and a free time; the salon confirms in the app).
- Appointment calendar per staff member and as a list, on computer and phone; auto-assign (on by default) gives unassigned bookings to the free staff member with the least work that day; email confirmations and a reminder to clients 1 h before.
- Checkout (POS): cash, card, bank transfer with a payment QR code (QR Platba / EPC), tips recorded on the invoice; receipts for 80 mm printers; invoices exported to PDF.
- Czech EET 2.0 (mandatory from 1 January 2027): set up in 2 steps (upload the DIS+ certificate, enter its password and the sales unit ID); every payment is then reported automatically. Included in every plan at no extra cost.
- Clients: profiles, visit history, VIP / new / lapsed filters, VIP rules, membership/points program, birthdays.
- Email marketing: 10 occasion templates (sale, new service, Christmas, New Year, Valentine's, Women's Day, Easter, Mother's Day, summer, Black Friday), sent only to clients who agreed, with one-click unsubscribe (Pro plan: up to 50 clients a day, Premium: unlimited, not in Basic); birthday reminders for the owner 2 days ahead, to send a birthday offer.
- Reports: overview, revenue by staff/service/payment method, invoices.
- Payroll: each staff member is paid a percentage of their own revenue (optionally per service) or a fixed monthly salary; tips go to the staff member the client tipped or are split equally, as the owner chooses.
- Staff accounts on the phone: staff see only their own schedule for today and the coming days (view only); their own revenue is on a separate page only if the owner allows it. Push notifications in each user's app language.
- Multiple locations in one owner account, with an "All salons" overview; each location has its own plan.

`;

// Trang chính theo từng ngôn ngữ (URL giống nhau, chỉ khác tiền tố). Trợ lý AI trả lời bằng ngôn ngữ người hỏi,
// nên đưa link đúng ngôn ngữ: chủ tiệm người Việt → /vi, chủ salon người Séc → /cs.
const SECTIONS = [
  ["", "Home"],
  ["/tinh-nang", "Features"],
  ["/phan-mem-quan-ly-salon", "Salon software guide"],
  ["/giai-phap", "Solutions by salon type"],
  ["/bang-gia", "Pricing"],
  ["/goi-ban", "Chair / desk renter plan"],
  ["/eet-2-0", "Czech EET 2.0 for salons: what to do by 1 Jan 2027"],
  ["/faq", "FAQ"],
  ["/ve-salongo", "About SalonGo"],
  ["/lien-he", "Contact"],
  ["/website", "Salon websites"],
] as const;
const LANGS = [
  ["vi", "Vietnamese (main language, for Vietnamese salon owners)"],
  ["cs", "Czech"],
  ["en", "English"],
  ["de", "German"],
] as const;
const PAGES = LANGS.map(
  ([l, name]) => `### ${name}\n${SECTIONS.map(([p, t]) => `- [${t}](${SITE}/${l}${p})`).join("\n")}`
).join("\n\n");

const OTHER = `- [Facebook page](https://www.facebook.com/people/SalonGo/61583765805698/)
- [App sign-in / sign-up](https://app.salongo.eu)
- [Sitemap](${SITE}/sitemap.xml)
- Salon websites: a website with up to 5 pages for a one-time design fee from 4 999 Kč; hosting is quoted separately. 35+ sample templates (nail, hair, spa, barber, lash & brow, makeup); their demo pages are illustrations only.`;

// Câu trả lời ngắn cho các câu hỏi người dùng hay hỏi trợ lý AI (AEO). Chỉ ghi điều có thật trên website.
const answers = (low: number, trialDays: number) => `## Quick answers
- What is SalonGo? Salon management software (booking, calendar, checkout, Czech EET 2.0, payroll, reports) for nail, hair, lash and beauty salons in Europe, made for Vietnamese-run salons in Czechia.
- Who makes it? SalonGo, operated by Nguyen Đuc Hoang Khong (sole trader, IČO 30241464), Svornosti 189, 252 42 Jesenice, Czech Republic.
- How much does it cost? From ${low} CZK per month; ${trialDays}-day free trial, no card needed. Plans differ in staff, locations and email marketing.
- Does it support Czech EET 2.0 (mandatory from 1 January 2027)? Yes, included in every plan at no extra cost; set up in 2 steps with the DIS+ certificate. No extra cash register hardware is needed.
- Is the app in Vietnamese? Yes. The salon app is in Vietnamese, Czech, Slovak, English, German and French; the client booking page is in Czech, Slovak, English, German and French. Support by phone/email in Vietnamese and Czech.
- Does it work on a phone? Yes, in the phone browser; desktop apps for Windows and macOS; an iPhone and iPad sign-in app is on the App Store (https://apps.apple.com/app/salongo/id6831757876).
- Does it do SMS reminders or online prepayment? No: confirmations and reminders are by email; payments are taken in the salon.
- Vietnamese: SalonGo là app quản lý tiệm nail, salon tóc, mi, spa cho người Việt ở Séc và châu Âu: đặt lịch online, tính tiền, EET 2.0, tính lương thợ, báo cáo doanh thu.
- Czech: SalonGo je rezervační systém a pokladna pro nehtová studia, kadeřnictví a kosmetické salony, s EET 2.0, mzdami a přehledy tržeb, česky i vietnamsky.

`;

const limits = (p: SitePlan) => {
  const staff = p.staff === null ? "unlimited staff" : `up to ${p.staff} staff per location`;
  const branches = p.branches === null ? "unlimited locations" : p.branches === 1 ? "1 location" : `up to ${p.branches} locations`;
  return `${staff}, ${branches}`;
};

const NAMES = { BASIC: "Basic", PRO: "Pro", PREMIUM: "Premium" } as const;

// Gói Bàn (DESK): cho người thuê bàn / ghế có IČO riêng; "planned" khi app chưa bán
const desk = (p: DeskPlan) =>
  `- Chair / desk renter plan ("Bàn", code DESK) ${p.monthly}${p.yearly ? `; yearly ${p.yearly} CZK` : ""}${p.live ? "" : " (planned, not on sale yet)"}: for people who rent a chair or desk in a salon and work on their own IČO. Only checkout, receipts, revenue and Czech EET 2.0 with their own certificate; no appointments, staff or payroll. 1-month free trial for a new desk account. The salon owner cannot see the renter's revenue. Details: https://www.salongo.eu/en/goi-ban`;

export async function GET() {
  const plans = await getPlans();
  const lines = plans.plans.map((p) => {
    const list = p.listMonthly ? ` (regular price ${p.listMonthly}, now ${p.monthlyDiscountPct}% off)` : "";
    const yearly = p.yearly ? `; yearly ${p.yearly} CZK` : "";
    return `- ${NAMES[p.code]} ${p.monthly}${list}${yearly}: ${limits(p)}.`;
  });
  const discount = Math.max(0, ...plans.plans.map((p) => p.yearlyDiscountPct ?? 0));
  const pricing = [
    "## Pricing (CZK per month, live from the app)",
    ...lines,
    `- ${discount ? `Paying yearly saves up to ${discount}%. ` : ""}New salons get a ${plans.trialDays}-day free trial, no card needed. Plans are renewed in the app (Plan screen).`,
    desk(plans.desk),
  ].join("\n");
  const body = `${HEAD}${answers(priceRange(plans).low, plans.trialDays)}${pricing}\n\n## Pages\n${PAGES}\n\n## Other\n${OTHER}\n`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300" },
  });
}
