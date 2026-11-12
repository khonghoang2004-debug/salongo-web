import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * POST /api/revalidate — app.salongo.eu gọi sau khi admin lưu gói (giá, giảm giá, giới hạn), để mọi trang
 * có giá dựng lại ngay ở lượt xem tiếp theo thay vì chờ tối đa 1 phút.
 * Header: Authorization: Bearer <REVALIDATE_SECRET> (biến môi trường trên Vercel, đặt giống bên app).
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: "not configured" }, { status: 503 });
  if (req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, revalidated: new Date().toISOString() });
}
