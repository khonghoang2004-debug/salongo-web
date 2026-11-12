import { APP_URL } from "./app-links";
import { FALLBACK_PLANS, mapPlansResponse, type SitePlans } from "./plans-core";

export { FALLBACK_PLANS, priceRange, maxYearlyDiscount, type SitePlan, type SitePlans } from "./plans-core";

const PLANS_API = `${APP_URL}/api/public/plans?currency=CZK`;

/**
 * Giá gói lấy từ app (ISR: làm mới tối đa 10 phút một lần, chờ tối đa 3 s).
 * Mọi lỗi (mạng, timeout, 404 khi endpoint chưa có, JSON sai hợp đồng) → giá cố định FALLBACK_PLANS.
 */
export async function getPlans(): Promise<SitePlans> {
  try {
    const res = await fetch(PLANS_API, {
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(3000),
      headers: { accept: "application/json" },
    });
    if (!res.ok) return FALLBACK_PLANS;
    return mapPlansResponse(await res.json()) ?? FALLBACK_PLANS;
  } catch {
    return FALLBACK_PLANS;
  }
}
