import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";

// So sánh không lộ thời gian (băm trước để hai chuỗi luôn cùng độ dài)
const digest = (s: string) => createHash("sha256").update(s).digest();
const safeEqual = (a: string, b: string) => timingSafeEqual(digest(a), digest(b));

// Phản hồi của route này không bao giờ được CDN / trình duyệt giữ lại
const NO_STORE = { "Cache-Control": "no-store" };

/**
 * POST /api/revalidate — app.salongo.eu gọi sau khi admin lưu gói (giá, giảm giá, giới hạn), để mọi trang
 * có giá dựng lại ngay ở lượt xem tiếp theo thay vì chờ tối đa 1 phút.
 * Header: Authorization: Bearer <REVALIDATE_SECRET> (biến môi trường trên Vercel, đặt giống bên app).
 * Không cần giới hạn số lần gọi: không có secret thì chỉ nhận 401, và secret dài (≥ 32 ký tự) không đoán được.
 */
export async function POST(req: Request) {
  // trim: giá trị dán vào Vercel hay dính xuống dòng ở cuối, làm mọi lần gọi đúng đều bị 401
  const secret = process.env.REVALIDATE_SECRET?.trim();
  if (!secret) return NextResponse.json({ ok: false, error: "not configured" }, { status: 503, headers: NO_STORE });
  if (!safeEqual(req.headers.get("authorization") ?? "", `Bearer ${secret}`)) {
    return NextResponse.json({ ok: false }, { status: 401, headers: { ...NO_STORE, "WWW-Authenticate": "Bearer" } });
  }
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, revalidated: new Date().toISOString() }, { headers: NO_STORE });
}
