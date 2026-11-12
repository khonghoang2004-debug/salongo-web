import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { APP_URL } from "./app-links";
import { loadPlans, type PlansLoaderState, type SitePlans } from "./plans-core";

export { FALLBACK_PLANS, priceRange, maxYearlyDiscount, type SitePlan, type SitePlans } from "./plans-core";

// PLANS_API_URL chỉ để thử với API giả ở máy local; mặc định là API thật của app
const PLANS_API = process.env.PLANS_API_URL || `${APP_URL}/api/public/plans?currency=CZK`;

const state: PlansLoaderState = { lastGood: null };

/**
 * Giá gói lấy từ app (ISR: làm mới tối đa 10 phút một lần, chờ tối đa 3 s). Quy tắc dự phòng: xem loadPlans.
 * Chưa có endpoint (404) → giá cố định FALLBACK_PLANS; lỗi tạm thời lúc ISR → ném lỗi, Next giữ trang cũ.
 */
export function getPlans(): Promise<SitePlans> {
  return loadPlans(
    () =>
      fetch(PLANS_API, {
        next: { revalidate: 600 },
        signal: AbortSignal.timeout(3000),
        headers: { accept: "application/json" },
      }),
    state,
    process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD,
  );
}
