// Ánh xạ giá gói từ app (src/lib/plans-core.ts): `npm test` (Node 22.6+, chạy thẳng file .ts nhờ --experimental-strip-types)
import { test } from "node:test";
import assert from "node:assert/strict";
import { FALLBACK_PLANS, fillPlanMessages, fillPlanText, loadPlans, mapPlansResponse, maxYearlyDiscount, planTokens, priceRange } from "../src/lib/plans-core.ts";

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
  assert.deepEqual(r.plans[0], { code: "BASIC", monthly: 199, yearly: 2149.5, yearlyDiscountPct: 10, staff: 3, branches: 1, highlighted: false });
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

test("trialDays thiếu → 150; gói lạ bị bỏ qua", () => {
  const r = mapPlansResponse({ ...ok, trialDays: undefined, plans: [...ok.plans, { ...ok.plans[0], code: "GOLD" }] });
  assert.equal(r.trialDays, 150);
  assert.equal(r.plans.length, 3);
});

test("giá dự phòng = bảng giá hiện tại trên web", () => {
  assert.equal(FALLBACK_PLANS.source, "fallback");
  assert.equal(FALLBACK_PLANS.trialDays, 150);
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
  assert.equal(fillPlanText("{days} days, from {from} CZK.[[discount: Save {discount}%.]] Pro {staffPro}/{branchesPro}", t), "150 days, from 199 CZK. Save 10%. Pro 8/3");
  const noDisc = mapPlansResponse({ ...ok, plans: ok.plans.map((p) => ({ ...p, yearlyPriceCents: null, yearlyDiscountPct: null })) });
  const t2 = planTokens(noDisc, "cs");
  assert.equal(fillPlanText("Ceník.[[discount: Ročně sleva {discount} %.]] {days} dní", t2), "Ceník. 120 dní");
  assert.deepEqual(fillPlanMessages({ a: { b: ["{from} Kč", "{n} x"] }, c: 1 }, t2), { a: { b: ["199 Kč", "{n} x"] }, c: 1 });
});
