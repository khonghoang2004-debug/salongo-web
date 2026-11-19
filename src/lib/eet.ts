// EET 2.0 bắt buộc ở Séc từ 1.1.2027: 00:00 giờ Praha = 23:00 UTC ngày 31.12.2026
const EET_START = Date.UTC(2026, 11, 31, 23, 0, 0);
const DAY = 86_400_000;

/** Số ngày còn lại tới khi EET 2.0 bắt buộc (làm tròn lên); 0 = đã áp dụng. */
export function daysUntilEet(now = Date.now()): number {
  return Math.max(0, Math.ceil((EET_START - now) / DAY));
}
