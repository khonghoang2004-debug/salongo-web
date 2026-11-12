// Ánh xạ giá gói từ app (src/lib/plans-core.ts): `npm test` (Node 22.6+, chạy thẳng file .ts nhờ --experimental-strip-types)
import { test } from "node:test";
import assert from "node:assert/strict";
import { FALLBACK_PLANS, mapPlansResponse, maxYearlyDiscount, priceRange } from "../src/lib/plans-core.ts";

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
