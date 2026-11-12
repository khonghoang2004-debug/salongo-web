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
  const seen = new Set<PlanCode>();
  for (const raw of json.plans) {
    if (!isObj(raw)) return null;
    const code = raw.code as PlanCode;
    if (!CODES.includes(code)) continue; // gói lạ: website chưa có nhãn cho nó
    if (seen.has(code)) continue; // mã trùng: giữ bản đầu tiên
    seen.add(code);
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

// ---------------------------------------------------------------------------------------------
// Tải giá (logic thuần, fetch truyền vào để test được)

export type PlansFetcher = () => Promise<{ status: number; ok: boolean; json: () => Promise<unknown> }>;
export type PlansLoaderState = { lastGood: SitePlans | null };

/**
 * - 404: endpoint chưa có trên app → giá dự phòng (bình thường cho tới khi app deploy endpoint).
 * - Lỗi mạng / timeout / 5xx / JSON sai: dùng lần tải tốt gần nhất trong bộ nhớ; nếu chưa có thì
 *   lúc build → giá dự phòng (build không được hỏng), lúc chạy (ISR) → ném lỗi để Next giữ trang tốt cũ
 *   thay vì lưu trang có giá dự phòng 10 phút.
 */
export async function loadPlans(fetcher: PlansFetcher, state: PlansLoaderState, isBuild: boolean): Promise<SitePlans> {
  const failed = (err: unknown): SitePlans => {
    if (state.lastGood) return state.lastGood;
    if (isBuild) return FALLBACK_PLANS;
    throw err instanceof Error ? err : new Error(String(err));
  };
  let res: Awaited<ReturnType<PlansFetcher>>;
  try {
    res = await fetcher();
  } catch (e) {
    return failed(e);
  }
  if (res.status === 404) return FALLBACK_PLANS;
  if (!res.ok) return failed(new Error(`plans API HTTP ${res.status}`));
  let mapped: SitePlans | null = null;
  try {
    mapped = mapPlansResponse(await res.json());
  } catch (e) {
    return failed(e);
  }
  if (!mapped) return failed(new Error("plans API: response does not match the contract"));
  state.lastGood = mapped;
  return mapped;
}

// ---------------------------------------------------------------------------------------------
// Số liệu trong văn bản (messages/*.json): {days}, {from}, {discount}, {priceBasic|Pro|Premium},
// {staffBasic|Pro}, {branchesBasic|Pro}. Đoạn "[[discount:…]]" chỉ hiện khi có giảm giá theo năm.

export function planTokens(p: SitePlans, locale: string): Record<string, string> {
  const tag = { vi: "vi-VN", cs: "cs-CZ", en: "en-GB", de: "de-DE" }[locale] ?? "cs-CZ";
  const num = (n: number) => new Intl.NumberFormat(tag, { maximumFractionDigits: 2 }).format(n);
  const by = (code: PlanCode) => p.plans.find((x) => x.code === code) ?? FALLBACK_PLANS.plans.find((x) => x.code === code)!;
  const lim = (n: number | null) => (n === null ? "∞" : num(n));
  const discount = maxYearlyDiscount(p);
  return {
    days: num(p.trialDays),
    from: num(priceRange(p).low),
    discount: discount === null ? "" : num(discount),
    priceBasic: num(by("BASIC").monthly),
    pricePro: num(by("PRO").monthly),
    pricePremium: num(by("PREMIUM").monthly),
    staffBasic: lim(by("BASIC").staff),
    staffPro: lim(by("PRO").staff),
    branchesBasic: lim(by("BASIC").branches),
    branchesPro: lim(by("PRO").branches),
  };
}

const TOKEN = /\{(days|from|discount|priceBasic|pricePro|pricePremium|staffBasic|staffPro|branchesBasic|branchesPro)\}/g;
const DISCOUNT_PART = /\[\[discount:([\s\S]*?)\]\]/g;

export function fillPlanText(text: string, tokens: Record<string, string>): string {
  if (!text.includes("{") && !text.includes("[[")) return text;
  const withDiscount = text.replace(DISCOUNT_PART, (_, inner: string) => (tokens.discount ? inner : ""));
  return withDiscount.replace(TOKEN, (_, k: string) => tokens[k]);
}

/** Điền số liệu vào toàn bộ messages (giữ nguyên cấu trúc; chỉ tạo object mới khi cần). */
export function fillPlanMessages<T>(messages: T, tokens: Record<string, string>): T {
  const walk = (v: unknown): unknown => {
    if (typeof v === "string") return fillPlanText(v, tokens);
    if (Array.isArray(v)) return v.map(walk);
    if (isObj(v)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]));
    return v;
  };
  return walk(messages) as T;
}
