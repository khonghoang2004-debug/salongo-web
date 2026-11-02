# Từ khoá tiếng Séc & đo chuyển đổi

## 1. Nhóm từ khoá cho chủ salon (tiếng Séc)

Không có số liệu lượng tìm kiếm (chưa có quyền Google Ads Keyword Planner / Sklik). Kiểm tra lượng tìm kiếm trong **Sklik** (Seznam) và Keyword Planner trước khi viết nội dung mới; sau 4–8 tuần dùng báo cáo Queries trong GSC.

| Nhóm ý định | Ví dụ cụm từ | Trang đích hiện có |
|---|---|---|
| Rezervace | rezervační systém pro salon · online rezervace nehtové studio · rezervační systém kadeřnictví · objednávkový systém salon | `/cs/phan-mem-quan-ly-salon`, `/cs` |
| Software tổng quát | software pro salon · program pro nehtové studio · aplikace pro kosmetický salon · správa salonu | `/cs`, `/cs/tinh-nang` |
| Pokladna | pokladní systém pro salon · pokladna nehtové studio · účtenky salon | `/cs/tinh-nang` |
| Mzdy / provize | výpočet mezd kadeřnictví · provize zaměstnanci salon | `/cs/tinh-nang` |
| Klienti & marketing | evidence klientů salon · věrnostní program salon · e-mailové připomínky rezervace | `/cs/tinh-nang`, `/cs/giai-phap` |
| Více poboček | software pro více poboček salonu | `/cs/tinh-nang` |
| Cena | rezervační systém cena · software pro salon zdarma vyzkoušet | `/cs/bang-gia` |
| Tiếng Việt (chủ tiệm người Việt ở Séc) | phần mềm quản lý tiệm nail · app đặt lịch tiệm nail · phần mềm tính lương thợ nail | `/vi`, `/vi/phan-mem-quan-ly-salon` |

Tránh nhắm từ khoá cho tính năng **không có**: SMS připomínky, hodnocení/recenze, platba online předem, mobilní aplikace v App Store (app chạy trình duyệt + desktop).

Từ khoá cho **khách đặt lịch** (vd. "manikúra Praha rezervace"): không áp dụng — website không có trang salon cho khách; trang `/book/<salon>` thuộc về từng salon trong app.

## 2. Đo chuyển đổi (hiện site chưa có analytics, chưa có banner cookie)

Mục tiêu: tách **chủ salon đăng ký** khỏi **khách đặt lịch**.

1. **Chủ salon (website → app)**: thêm tham số nguồn vào link `SIGNUP_URL` theo vị trí, vd. `https://app.salongo.eu/signup?ref=web-hero-vi`, `ref=web-pricing-cs`. App lưu `ref` khi tạo tài khoản salon (cookie phiên hoặc localStorage → gửi kèm form onboarding). Đếm trong DB app: số salon tạo mới theo `ref`, số salon kích hoạt gói trả phí.
2. **Khách đặt lịch**: đã nằm trong app (`/book/[salon]` → bản ghi online booking). Đếm theo salon trong DB; không gộp vào số đăng ký chủ salon. Nếu muốn biết khách đến từ đâu: thêm `?src=instagram|google|qr` vào link đặt lịch mà salon chia sẻ.
3. **Analytics website**: ưu tiên công cụ **không cookie** (Vercel Web Analytics hoặc Plausible/Umami) → không cần banner đồng ý theo GDPR/ePrivacy, đo được lượt xem trang + sự kiện click "Dùng thử", "Tải app". Nếu dùng GA4/Meta Pixel thì **bắt buộc** banner đồng ý (Consent Mode v2) trước khi tải script.
4. Sự kiện nên có: `signup_click` (vị trí, ngôn ngữ), `download_click` (windows/mac), `video_play`, `contact_click` (email/điện thoại/WhatsApp).
