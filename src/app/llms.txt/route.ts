import { getPlans, type DeskPlan, type SitePlan } from "@/lib/plans";

// llms.txt (https://llmstxt.org): tóm tắt cho trợ lý AI. Giá và giới hạn gói lấy từ app như trang Bảng giá,
// nên không còn lệch với giá đang bán (trước đây là file tĩnh trong public/).
export const revalidate = 3600;

const HEAD = `# SalonGo

> SalonGo is salon management software for nail, hair, lash and beauty salons in Europe, built for Vietnamese-run salons (app in Vietnamese, Czech, Slovak, English, German and French). It runs in the browser, as a desktop app for Windows and macOS (Mac build signed), and in the phone browser. An iPhone app for signing in is coming to the App Store. Client booking page languages: Czech, Slovak, English, German, French. Every plan has every feature; plans differ only by staff per location and number of locations.

Website: https://www.salongo.eu (languages: /vi, /cs, /de, /en). App: https://app.salongo.eu. Support in Vietnamese and Czech: salongosupport@gmail.com, +420 728 568 807. Operator: Nguyen Đuc Hoang Khong (sole trader), IČO 30241464, Svornosti 189, 252 42 Jesenice, Czech Republic.

## Features
- Online booking page for each salon (client picks service, staff and a free time; the salon confirms in the app).
- Appointment calendar per staff member and as a list, on computer and phone; auto-assign (on by default) gives unassigned bookings to the free staff member with the least work that day; email confirmations and a reminder to clients 1 h before.
- Checkout (POS): cash, card, bank transfer with a payment QR code (QR Platba / EPC), tips recorded on the invoice; receipts for 80 mm printers; invoices exported to PDF.
- Clients: profiles, visit history, VIP / new / lapsed filters, VIP rules, membership/points program, birthdays.
- Email marketing: 10 occasion templates (sale, new service, Christmas, New Year, Valentine's, Women's Day, Easter, Mother's Day, summer, Black Friday), sent only to clients who agreed, with one-click unsubscribe; birthday reminders for the owner 2 days ahead, to send a birthday offer.
- Reports: overview, revenue by staff/service/payment method, invoices.
- Payroll: each staff member is paid a percentage of their own revenue (optionally per service) or a fixed monthly salary; tips go to the staff member the client tipped or are split equally, as the owner chooses.
- Staff accounts on the phone: staff see only their own schedule for today and the coming days (view only); their own revenue is on a separate page only if the owner allows it. Push notifications in each user's app language.
- Multiple locations in one owner account, with an "All salons" overview; each location has its own plan.

`;

const PAGES = `- [Home (Vietnamese)](https://www.salongo.eu/vi)
- [Features](https://www.salongo.eu/en/tinh-nang)
- [Pricing](https://www.salongo.eu/en/bang-gia)
- [Chair / desk renter plan](https://www.salongo.eu/en/goi-ban)
- [FAQ](https://www.salongo.eu/en/faq)
- [Contact](https://www.salongo.eu/en/lien-he)
- [Facebook page](https://www.facebook.com/people/SalonGo/61583765805698/)
- [Salon websites](https://www.salongo.eu/en/website): offer for SalonGo customers, a website with up to 5 pages for a one-time design fee of 999 Kč; hosting is quoted separately. 35+ sample templates (nail, hair, spa, barber, lash & brow, makeup); their demo pages are illustrations only.
- [Czech site](https://www.salongo.eu/cs) · [German site](https://www.salongo.eu/de) · [English site](https://www.salongo.eu/en)
`;

const limits = (p: SitePlan) => {
  const staff = p.staff === null ? "unlimited staff" : `up to ${p.staff} staff per location`;
  const branches = p.branches === null ? "unlimited locations" : p.branches === 1 ? "1 location" : `up to ${p.branches} locations`;
  return `${staff}, ${branches}`;
};

const NAMES = { BASIC: "Basic", PRO: "Pro", PREMIUM: "Premium" } as const;

// Gói Bàn (DESK): cho người thuê bàn / ghế có IČO riêng; "planned" khi app chưa bán
const desk = (p: DeskPlan) =>
  `- Chair / desk renter plan ("Bàn", code DESK) ${p.monthly}${p.yearly ? `; yearly ${p.yearly} CZK` : ""}${p.live ? "" : " (planned, not on sale yet)"}: for people who rent a chair or desk in a salon and work on their own IČO. Only checkout, receipts, revenue and Czech EET 2.0 with their own certificate; no appointments, staff or payroll. The salon owner cannot see the renter's revenue. Details: https://www.salongo.eu/en/goi-ban`;

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
  const body = `${HEAD}${pricing}\n\n## Pages\n${PAGES}`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=0, s-maxage=3600" },
  });
}
