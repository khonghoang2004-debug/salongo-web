# Sau khi deploy nhánh `seo/audit-2026-11`

Trạng thái: **đã sửa trong code + đã test trên bản build local. Chưa deploy. Chưa được Google ghi nhận.**

## 1. Kiểm tra ngay sau deploy (5 phút)

```bash
# Bản chính KHÔNG được có X-Robots-Tag (nếu thấy "noindex" ở đây → rollback ngay, xem §2)
curl -sI https://www.salongo.eu/vi | grep -i x-robots-tag
# Bản vercel.app phải có noindex
curl -sI https://salongo-web.vercel.app/vi | grep -i x-robots-tag
# Trang tĩnh từ CDN: lần 2 phải thấy x-vercel-cache: HIT (hoặc PRERENDER)
curl -sI https://www.salongo.eu/cs | grep -iE "x-vercel-cache|cache-control"
# Không còn hreflang trong header Link
curl -sI https://www.salongo.eu/vi/tinh-nang | grep -i hreflang
# Sitemap 40 URL, không lastmod
curl -s https://www.salongo.eu/sitemap.xml | grep -c "<loc>"
# Chạy cả bộ test lên domain thật (phải 9/9; test "domain khác" cần chạy local vì Vercel tự xử lý Host)
BASE_URL=https://www.salongo.eu npm run test:seo
```
Mở thử `/vi`, `/cs`, `/de/bang-gia` trên điện thoại và máy tính: hero, đổi ngôn ngữ, menu, link tải app.

## 2. Rollback

- Nhanh nhất: Vercel → Deployments → bản trước → **Promote to Production** (không cần build lại).
- Trong git: `git revert <commit>` trên `main` rồi push.
- Chỉ lỗi noindex (rất khó xảy ra, đã test host www): xoá khối `headers()` trong `next.config.mjs`.

## 3. Search Console (property `https://www.salongo.eu/`, đã xác minh bằng file `public/googlef4498c62abaef25e.html` — đừng xoá file này)

1. Sitemaps → gửi lại `https://www.salongo.eu/sitemap.xml`.
2. URL Inspection → "Request indexing" cho `/vi`, `/cs`, `/de`, `/en`, `/vi/ve-salongo`, `/cs/phan-mem-quan-ly-salon`.
3. Nên thêm **Domain property** `salongo.eu` (xác minh DNS TXT) để thấy cả `app.salongo.eu` và apex — cần quyền DNS của bạn.
4. Theo dõi 2–4 tuần: Pages (Indexed / "Duplicate, Google chose different canonical"), Core Web Vitals (khi đủ traffic), Enhancements (FAQ, Video, Breadcrumb).
5. Không truy cập được GSC từ phiên này → mọi trạng thái index ở trên **chưa xác minh**.

## 4. Vercel (bạn làm)

- Domains: đặt `salongo.eu` → `www.salongo.eu` là **308 Permanent** (hiện 307).
- (Tuỳ chọn) chuyển `salongo-web.vercel.app` sang redirect 308 về www thay vì chỉ noindex.

## 5. Bing Webmaster Tools

Đăng nhập bing.com/webmasters → Import từ Google Search Console → gửi sitemap. Bing dùng cho cả Copilot/ChatGPT search. Seznam (Séc): seznam đọc sitemap qua robots.txt; có thể đăng ký Seznam Webmaster.

## 6. Google Business Profile

Hồ sơ "SalonGo" (công ty phần mềm, địa chỉ ẩn, vùng phục vụ 20 nước EU) **vẫn chờ xác minh bằng video** — bạn phải tự quay. Lưu ý: GBP dành cho doanh nghiệp có tiếp xúc trực tiếp với khách; phần mềm thuần online có thể bị Google từ chối/tạm ngưng. Không dùng địa chỉ cửa hàng SAPA làm địa chỉ công khai. Không kỳ vọng GBP mang lại traffic chính — SEO chính vẫn là website.

## Kết quả kiểm tra sau deploy (02/11/2026, ~10:15 UTC, commit d67c71c + 02d0f20)

- `BASE_URL=https://www.salongo.eu npm run test:seo`: 8/8 pass (test đổi Host chỉ chạy local, đã kiểm bằng curl bên dưới).
- `www.salongo.eu/vi`: không có X-Robots-Tag ✔ · `salongo-web.vercel.app/vi`: `x-robots-tag: noindex` ✔
- Header Link không còn hreflang ✔ · sitemap 40 URL, không lastmod ✔ · robots.txt giữ nguyên ✔
- Trang tĩnh từ CDN: `x-vercel-cache: HIT`, `x-vercel-id: fra1::…` (trước: `fra1::iad1::…`, MISS). TTFB đo từ máy này: 0,19–0,21 s (trước 0,26–0,35 s; cùng máy, cùng mạng, 3 lần mỗi bên).
- Chưa có: PageSpeed/CrUX, trạng thái trong Search Console (cần bạn gửi lại sitemap).
