import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next 16: "proxy" thay cho quy ước middleware cũ (cùng chức năng: chuyển / → /vi, kiểm tra ngôn ngữ)
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
