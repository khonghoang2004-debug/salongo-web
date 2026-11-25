// Ánh xạ giá gói từ app (src/lib/plans-core.ts): `npm test` (Node 22.6+, chạy thẳng file .ts nhờ --experimental-strip-types)
import { test } from "node:test";
import assert from "node:assert/strict";
import { FALLBACK_PLANS, fillPlanMessages, formatNumber, fillPlanText, loadPlans, mapPlansResponse, maxYearlyDiscount, planTokens, priceRange } from "../src/lib/plans-core.ts";

const ok = {
  ok: true,
  currency: "CZK",
  trialDays: 120,
  updatedAt: "2026-11-12T10:00:00.000Z",
  plans: [
    { code: "PREMIUM", name: "Premium", isPopular: false, monthlyPriceCents: 89900, yearlyPriceCents: 970920, yearlyDiscountPct: 10, maxStaff: null, maxLocations: null },
    { code: "BASIC", name: "Basic", isPopular: false, monthlyPriceCents: 19900, yearlyPriceCents: 214950, yearlyDiscountPct: 10, maxStaff: 3, maxLocations: 1 },
    { code: "PRO", name: "Pro", isPopular: true, monthlyPriceCents: 49900, yearlyPriceCents: null, yearlyDiscountPct: null, maxStaff: 8, maxLocations: 3 },
  ],
};

test("API hợp lệ: CZK từ cents, yearly dùng nguyên giá app, sắp xếp BASIC→PREMIUM", () => {
  const r = mapPlansResponse(ok);
  assert.equal(r.source, "api");
  assert.equal(r.trialDays, 120);
  assert.deepEqual(r.plans.map((p) => p.code), ["BASIC", "PRO", "PREMIUM"]);
  assert.deepEqual(r.plans[0], { code: "BASIC", monthly: 199, listMonthly: null, monthlyDiscountPct: null, yearly: 2149.5, yearlyDiscountPct: 10, staff: 3, branches: 1, highlighted: false });
  assert.equal(r.plans[1].yearly, null);
  assert.equal(r.plans[1].highlighted, true);
  assert.equal(r.plans[2].staff, null);
  assert.deepEqual(priceRange(r), { low: 199, high: 899, count: 3 });
  assert.equal(maxYearlyDiscount(r), 10);
});

test("sai hợp đồng → null (dùng giá dự phòng)", () => {
  for (const bad of [
    null,
    "x",
    { ok: false },
    { ...ok, currency: "EUR" },
    { ...ok, plans: [] },
    { ...ok, plans: "x" },
    { ...ok, plans: [{ ...ok.plans[0], monthlyPriceCents: -1 }] },
    { ...ok, plans: [{ ...ok.plans[0], monthlyPriceCents: "199" }] },
    { ...ok, plans: [{ ...ok.plans[0], maxStaff: "3" }] },
    { ...ok, plans: [{ ...ok.plans[0], code: "GOLD" }] },
  ]) {
    assert.equal(mapPlansResponse(bad), null, JSON.stringify(bad));
  }
});

test("trialDays thiếu → 60; gói lạ bị bỏ qua", () => {
  const r = mapPlansResponse({ ...ok, trialDays: undefined, plans: [...ok.plans, { ...ok.plans[0], code: "GOLD" }] });
  assert.equal(r.trialDays, 60);
  assert.equal(r.plans.length, 3);
});

test("giá dự phòng = bảng giá hiện tại trên web", () => {
  assert.equal(FALLBACK_PLANS.source, "fallback");
  assert.equal(FALLBACK_PLANS.trialDays, 60);
  assert.deepEqual(FALLBACK_PLANS.plans.map((p) => [p.code, p.monthly, p.yearly, p.staff, p.branches, p.highlighted]), [
    ["BASIC", 199, 2149, 3, 1, false],
    ["PRO", 499, 5389, 8, 3, true],
    ["PREMIUM", 799, 8629, null, null, false],
  ]);
});

test("mã gói trùng: giữ bản đầu tiên", () => {
  const r = mapPlansResponse({ ...ok, plans: [...ok.plans, { ...ok.plans[1], monthlyPriceCents: 99900 }] });
  assert.equal(r.plans.length, 3);
  assert.equal(r.plans.find((p) => p.code === "BASIC").monthly, 199);
});

const reply = (status, body) => async () => ({ status, ok: status >= 200 && status < 300, json: async () => body });
const boom = async () => { throw new Error("timeout"); };

test("loadPlans: 404 → dự phòng; thành công được nhớ; lỗi sau đó → lần tốt gần nhất", async () => {
  const st = { lastGood: null };
  assert.equal(await loadPlans(reply(404, null), st, false), FALLBACK_PLANS);
  const good = await loadPlans(reply(200, ok), st, false);
  assert.equal(good.source, "api");
  assert.equal(await loadPlans(boom, st, false), good);
  assert.equal(await loadPlans(reply(503, null), st, false), good);
  assert.equal(await loadPlans(reply(200, { ok: false }), st, false), good);
});

test("loadPlans: chưa từng tải được — lúc build dùng dự phòng, lúc ISR ném lỗi", async () => {
  assert.equal(await loadPlans(boom, { lastGood: null }, true), FALLBACK_PLANS);
  assert.equal(await loadPlans(reply(500, null), { lastGood: null }, true), FALLBACK_PLANS);
  await assert.rejects(loadPlans(boom, { lastGood: null }, false));
  await assert.rejects(loadPlans(reply(502, null), { lastGood: null }, false));
  await assert.rejects(loadPlans(reply(200, { ok: true }), { lastGood: null }, false));
});

test("điền số liệu vào văn bản; không có giảm giá năm thì bỏ đoạn [[discount:…]]", () => {
  const t = planTokens(FALLBACK_PLANS, "en");
  assert.equal(fillPlanText("{days} days, from {from} CZK.[[discount: Save {discount}%.]] Pro {staffPro}/{branchesPro}", t), "60 days, from 199 CZK. Save 10%. Pro 8/3");
  const noDisc = mapPlansResponse({ ...ok, plans: ok.plans.map((p) => ({ ...p, yearlyPriceCents: null, yearlyDiscountPct: null })) });
  const t2 = planTokens(noDisc, "cs");
  assert.equal(fillPlanText("Ceník.[[discount: Ročně sleva {discount} %.]] {days} dní", t2), "Ceník. 120 dní");
  assert.deepEqual(fillPlanMessages({ a: { b: ["{from} Kč", "{n} x"] }, c: 1 }, t2), { a: { b: ["199 Kč", "{n} x"] }, c: 1 });
});

test("giảm giá theo tháng: giá gốc + % khi app gửi monthlyListPriceCents", () => {
  const sale = { ...ok, plans: [{ ...ok.plans[1], monthlyPriceCents: 15900, monthlyListPriceCents: 19900, monthlyDiscountPct: 20 }] };
  const p = mapPlansResponse(sale).plans[0];
  assert.equal(p.monthly, 159);
  assert.equal(p.listMonthly, 199);
  assert.equal(p.monthlyDiscountPct, 20);
  const noPct = mapPlansResponse({ ...ok, plans: [{ ...ok.plans[1], monthlyPriceCents: 15000, monthlyListPriceCents: 20000 }] }).plans[0];
  assert.equal(noPct.monthlyDiscountPct, 25);
  const same = mapPlansResponse({ ...ok, plans: [{ ...ok.plans[1], monthlyListPriceCents: 19900 }] }).plans[0];
  assert.equal(same.listMonthly, null);
});

test("giới hạn Premium thành chữ theo số liệu app (không ghi 'không giới hạn' khi app đặt giới hạn)", () => {
  const unlimited = planTokens(FALLBACK_PLANS, "vi");
  assert.equal(unlimited.premiumLimitsCap, "Không giới hạn thợ và chi nhánh");
  const limited = mapPlansResponse({
    ...ok,
    plans: ok.plans.map((p) => (p.code === "PREMIUM" ? { ...p, maxStaff: null, maxLocations: 10 } : p)),
  });
  assert.equal(planTokens(limited, "vi").premiumLimits, "không giới hạn thợ, tối đa 10 chi nhánh");
  assert.equal(planTokens(limited, "en").premiumLimitsCap, "Unlimited staff, up to 10 locations");
  assert.equal(planTokens(limited, "cs").premiumLimits, "neomezený personál, až 10 poboček");
  assert.equal(planTokens(limited, "de").premiumLimits, "unbegrenzt Mitarbeiter, bis zu 10 Filialen");
  assert.equal(fillPlanText("{premiumLimitsCap} cho salon lớn.", planTokens(limited, "vi")), "Không giới hạn thợ, tối đa 10 chi nhánh cho salon lớn.");
});

test("gói Bàn (DESK): tách khỏi các gói salon, live khi app trả về", () => {
  const desk = { code: "DESK", name: "Bàn", isPopular: false, monthlyPriceCents: 14900, yearlyPriceCents: 160920, yearlyDiscountPct: 10, maxStaff: 1, maxLocations: 1 };
  const r = mapPlansResponse({ ...ok, plans: [desk, ...ok.plans] });
  assert.deepEqual(r.plans.map((p) => p.code), ["BASIC", "PRO", "PREMIUM"]);
  assert.deepEqual(r.desk, { monthly: 149, listMonthly: null, monthlyDiscountPct: null, yearly: 1609.2, yearlyDiscountPct: 10, live: true });
  // "giá từ …" của salon không đổi vì gói Bàn
  assert.equal(priceRange(r).low, 199);
  assert.equal(planTokens(r, "cs").priceDesk, "149");
  assert.equal(fillPlanText("Bàn {priceDesk} Kč", planTokens(r, "vi")), "Bàn 149 Kč");
});

test("gói Bàn: app chưa có / dữ liệu sai → giá dự kiến, live=false, không làm hỏng bảng giá", () => {
  const none = mapPlansResponse(ok);
  assert.equal(none.desk.live, false);
  assert.equal(none.desk.monthly, 149);
  const bad = mapPlansResponse({ ...ok, plans: [...ok.plans, { code: "DESK", monthlyPriceCents: "149" }] });
  assert.equal(bad.plans.length, 3);
  assert.equal(bad.desk.live, false);
  assert.equal(FALLBACK_PLANS.desk.live, false);
  // Chỉ có gói Bàn mà không có gói salon nào → sai hợp đồng
  assert.equal(mapPlansResponse({ ...ok, plans: [{ code: "DESK", monthlyPriceCents: 14900 }] }), null);
  // Mã chữ thường vẫn nhận
  assert.equal(mapPlansResponse({ ...ok, plans: [...ok.plans, { code: "desk", monthlyPriceCents: 19900 }] }).desk.monthly, 199);
});

test("loadPlans: 404 sau khi đã tải được → giữ lần tốt gần nhất (không quay về giá dự phòng)", async () => {
  const st = { lastGood: null };
  const good = await loadPlans(reply(200, ok), st, false);
  assert.equal(await loadPlans(reply(404, null), st, false), good);
  // chưa từng tải được: 404 = endpoint chưa có → giá dự phòng (cả lúc build lẫn ISR)
  assert.equal(await loadPlans(reply(404, null), { lastGood: null }, false), FALLBACK_PLANS);
});

test("loadPlans: JSON hỏng / json() ném lỗi không làm sập, dùng lần tốt gần nhất", async () => {
  const st = { lastGood: null };
  const good = await loadPlans(reply(200, ok), st, false);
  const badJson = async () => ({ status: 200, ok: true, json: async () => { throw new SyntaxError("Unexpected token <"); } });
  assert.equal(await loadPlans(badJson, st, false), good);
  for (const body of [[], { ok: true, currency: "CZK", plans: [null] }, { ok: true, currency: "CZK", plans: [{ code: 5 }] }]) {
    assert.equal(await loadPlans(reply(200, body), st, false), good, JSON.stringify(body));
  }
});

test("formatNumber: theo ngôn ngữ trang, giống số trong văn bản", () => {
  const n = (s) => s.replace(/\u00a0|\u202f/g, " ");
  assert.equal(formatNumber(1599, "en"), "1,599");
  assert.equal(n(formatNumber(1599, "cs")), "1 599");
  assert.equal(formatNumber(1599, "de"), "1.599");
  assert.equal(formatNumber(1599, "vi"), "1.599");
  assert.equal(formatNumber(2149.5, "en"), "2,149.5");
  assert.equal(formatNumber(179.08, "en", 0), "179");
  assert.equal(n(formatNumber(1599, "xx")), "1 599");
  const lim = mapPlansResponse({ ...ok, plans: ok.plans.map((p) => (p.code === "PREMIUM" ? { ...p, monthlyPriceCents: 159900 } : p)) });
  assert.equal(planTokens(lim, "en").pricePremium, formatNumber(1599, "en"));
});

test("giảm giá theo năm: % ngoài (0, 100) bị bỏ, tổng năm lấy nguyên từ app", () => {
  for (const pct of [0, 100, -5, "10", null]) {
    const r = mapPlansResponse({ ...ok, plans: [{ ...ok.plans[1], yearlyDiscountPct: pct }] });
    assert.equal(r.plans[0].yearlyDiscountPct, null, String(pct));
    assert.equal(r.plans[0].yearly, 2149.5);
  }
  assert.equal(maxYearlyDiscount(mapPlansResponse({ ...ok, plans: ok.plans.map((p) => ({ ...p, yearlyDiscountPct: null })) })), null);
});
