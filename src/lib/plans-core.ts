/**
 * Giá gói cho website: ánh xạ thuần (không fetch, không import alias) để test được bằng `node --test`.
 * Nguồn: GET https://app.salongo.eu/api/public/plans?currency=CZK. Lỗi / chưa có endpoint → FALLBACK_PLANS.
 */

export type PlanCode = "BASIC" | "PRO" | "PREMIUM";

export type SitePlan = {
  code: PlanCode;
  /** Giá niêm yết / tháng (CZK) */
  monthly: number;
  /** Tổng trả theo năm (CZK); null = gói không bán theo năm */
  yearly: number | null;
  /** % giảm khi trả theo năm (để hiện nhãn "-10%"); null = không có */
  yearlyDiscountPct: number | null;
  /** Nhân viên mỗi chi nhánh; null = không giới hạn */
  staff: number | null;
  /** Số chi nhánh; null = không giới hạn */
  branches: number | null;
  highlighted: boolean;
};

export type SitePlans = {
  trialDays: number;
  plans: SitePlan[];
  source: "api" | "fallback";
};

const CODES: readonly PlanCode[] = ["BASIC", "PRO", "PREMIUM"];

// Khớp với các gói đang bán trong app (SubscriptionPlan, đối chiếu 29/10/2026). Trả theo năm giảm 10%.
const FALLBACK_DISCOUNT = 10;
const fb = (code: PlanCode, monthly: number, staff: number | null, branches: number | null, highlighted: boolean): SitePlan => ({
  code,
  monthly,
  yearly: Math.round(monthly * 12 * (1 - FALLBACK_DISCOUNT / 100)), // như màn Nâng cấp gói trong app
  yearlyDiscountPct: FALLBACK_DISCOUNT,
  staff,
  branches,
  highlighted,
});

export const FALLBACK_PLANS: SitePlans = {
  trialDays: 150,
  plans: [fb("BASIC", 199, 3, 1, false), fb("PRO", 499, 8, 3, true), fb("PREMIUM", 799, null, null, false)],
  source: "fallback",
};

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;
const posInt = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v) && v > 0;
const limit = (v: unknown): number | null | undefined => (v === null ? null : posInt(v) ? v : undefined);

/**
 * Đọc JSON của /api/public/plans. Trả null khi sai hợp đồng (người gọi dùng FALLBACK_PLANS).
 * yearlyPriceCents dùng nguyên giá app gửi (không tự làm tròn).
 */
export function mapPlansResponse(json: unknown): SitePlans | null {
  if (!isObj(json) || json.ok !== true || json.currency !== "CZK" || !Array.isArray(json.plans)) return null;
  const plans: SitePlan[] = [];
  for (const raw of json.plans) {
    if (!isObj(raw)) return null;
    const code = raw.code as PlanCode;
    if (!CODES.includes(code)) continue; // gói lạ: website chưa có nhãn cho nó
    if (!posInt(raw.monthlyPriceCents)) return null;
    const yearlyCents = raw.yearlyPriceCents;
    if (yearlyCents !== null && yearlyCents !== undefined && !posInt(yearlyCents)) return null;
    const pct = raw.yearlyDiscountPct;
    const staff = limit(raw.maxStaff);
    const branches = limit(raw.maxLocations);
    if (staff === undefined || branches === undefined) return null;
    plans.push({
      code,
      monthly: raw.monthlyPriceCents / 100,
      yearly: posInt(yearlyCents) ? yearlyCents / 100 : null,
      yearlyDiscountPct: typeof pct === "number" && pct > 0 && pct < 100 ? pct : null,
      staff,
      branches,
      highlighted: raw.isPopular === true,
    });
  }
  if (plans.length === 0) return null;
  plans.sort((a, b) => CODES.indexOf(a.code) - CODES.indexOf(b.code));
  return {
    trialDays: posInt(json.trialDays) ? json.trialDays : FALLBACK_PLANS.trialDays,
    plans,
    source: "api",
  };
}

/** Giá thấp nhất / cao nhất theo tháng (JSON-LD AggregateOffer). */
export function priceRange(p: SitePlans): { low: number; high: number; count: number } {
  const m = p.plans.map((x) => x.monthly);
  return { low: Math.min(...m), high: Math.max(...m), count: m.length };
}

/** % giảm theo năm để hiện trên nút chuyển tháng/năm: lớn nhất trong các gói (null nếu không gói nào có). */
export function maxYearlyDiscount(p: SitePlans): number | null {
  const v = p.plans.map((x) => x.yearlyDiscountPct).filter((x): x is number => x !== null);
  return v.length ? Math.max(...v) : null;
}
