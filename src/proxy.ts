import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

// Next 16: "proxy" thay cho quy ước middleware cũ (cùng chức năng: chuyển / → /vi, kiểm tra ngôn ngữ)
const intl = createMiddleware(routing);

export default function proxy(req: NextRequest) {
  const res = intl(req);
  // SEO: "/" luôn về /vi (localeDetection tắt, không phụ thuộc người xem) → chuyển hướng vĩnh viễn 308
  // thay cho 307 của next-intl, để Google dồn tín hiệu của trang gốc (link ngoài trỏ tới salongo.eu) vào /vi.
  if (req.nextUrl.pathname === "/" && res.status === 307 && res.headers.get("location")) {
    return new NextResponse(null, { status: 308, headers: res.headers });
  }
  return res;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
