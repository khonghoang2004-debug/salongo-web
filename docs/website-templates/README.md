# Ưu đãi làm website 999 Kč + thư viện website mẫu

## Có gì ở đâu

| Phần | URL | File |
|---|---|---|
| Khu ưu đãi trên trang chủ (ngay dưới hero) | `/{locale}` | `src/components/home/HomeWebsiteOffer.tsx` |
| Trang dịch vụ + thư viện mẫu (được index, có trong sitemap) | `/{locale}/website` | `src/app/[locale]/website/page.tsx` |
| Demo 8 mẫu × 5 trang (noindex, không có trong sitemap) | `/{locale}/website/mau/{mẫu}/{trang}` | `src/app/[locale]/website/mau/[template]/[[...page]]/page.tsx` |
| Thanh "Website mẫu / Quay lại thư viện / Chọn mẫu này" | trên mọi trang demo | `src/components/website/DemoBar.tsx` |
| Hộp liên hệ (sao chép nội dung, gọi, Facebook, Instagram) | thư viện + demo | `src/components/website/WebsiteContact.tsx` |

Mẫu (font riêng trong `sites/shared.tsx`):

| Mẫu | Loại | Phong cách | Font |
|---|---|---|---|
| `ivelle-nail` | Nail studio | ivory/nude, khung vòm | Cormorant Garamond |
| `verra-hair` | Salon tóc | cream/espresso, số thứ tự lớn | Space Grotesk |
| `saluna-spa` | Beauty & spa | sage/đá, bo tròn | Lora |
| `brass-barber` | Barbershop | than chì/óc chó/đồng | Oswald |
| `lumen-hair` | Hair couture | tạp chí thời trang, bảng giá 3 cấp thợ | Noto Serif Display + Inter Tight |
| `velvet-lash` | Mi & chân mày | blush/mận, khung oval | Playfair Display + Josefin Sans |
| `chroma-nails` | Nail bar | cobalt/vàng bơ, viền đậm, ô chọn màu sơn | Unbounded + Manrope |
| `aurel-beauty` | Makeup & beauty | lục bảo/kem/vàng, monogram | Fraunces + Montserrat |
Trang trong mỗi mẫu: `""` trang chủ, `dich-vu`, `gioi-thieu`, `bo-suu-tap`, `dat-lich`.

## Sửa thường gặp

- **Giá / số trang của ưu đãi**: `src/lib/website-offer.ts` (`WEBSITE_PRICE_KC`, `WEBSITE_MAX_PAGES`). Mọi câu chữ dùng `{price}` / `{pages}` nên chỉ cần đổi ở đây. Không có thông tin VAT, đừng thêm "đã/chưa gồm VAT" khi chưa xác nhận.
- **Câu chữ ưu đãi, FAQ, tin nhắn mẫu, tiêu đề "Liên hệ ngay để nhận tư vấn miễn phí"**: `messages/{vi,cs,en,de}.json` → nhóm `webOffer`; tiêu đề/mô tả SEO của `/website`: `pages.websiteTitle`, `pages.websiteDesc`.
- **Số điện thoại, Facebook, Instagram**: `src/lib/contact.ts` (dùng chung với chân trang, trang Liên hệ). Nút gọi tự tạo `tel:` từ số này.
- **Nội dung một mẫu** (tên, dịch vụ, giá minh hoạ, đội ngũ, giờ mở cửa…): `src/components/website/templates/content/*.ts`, đủ 4 ngôn ngữ. Giá dịch vụ là số (Kč), `from: true` hiện "từ …", `tiers` = giá theo cấp thợ (Maison Lumen).
- **Chữ chung của demo** (ghi chú "Website mẫu…", nhãn form, thông báo form demo): `src/components/website/templates/common.ts`.
- **Bố cục / màu / chữ từng mẫu**: `src/components/website/sites/*Site.tsx`; font riêng trong `sites/shared.tsx` (next/font: tham số phải viết thẳng, dùng font biến thiên, không liệt kê độ đậm).
- **Thêm mẫu mới**: thêm file nội dung + component site, rồi khai báo trong `templates/registry.ts` và `sites/index.ts`; chụp lại ảnh xem trước.

## Ảnh

- Ảnh trong demo hiện là **hình minh hoạ vẽ bằng SVG** (`templates/Art.tsx`), không lấy ảnh của salon thật hay ảnh trên mạng.
- Muốn dùng ảnh thật (ảnh có bản quyền phù hợp hoặc ảnh tạo mới): chép file vào `public/images/website/demo/…` rồi điền `photo: "/images/website/demo/…"` vào mục tương ứng trong file nội dung (hero, gallery, team). Ghi nguồn/giấy phép vào file này.
- **Ảnh xem trước trong thư viện / trang chủ** (`public/images/website/{mẫu}-{pc|m}-{locale}.webp`) được chụp từ chính demo. Chụp lại sau khi sửa mẫu:

```bash
npm i -D --no-save playwright && npx playwright install chromium   # một lần
npm run dev -- -p 3200                                              # cửa sổ khác
node docs/website-templates/shoot-previews.mjs http://localhost:3200 public/images/website
```
(cần `ffmpeg` có libwebp)

## SEO

Theo `docs/seo/AUDIT-2026-11.md`: `/website` được index (canonical, hreflang, sitemap). Demo: `noindex, follow`, không canonical, không có trong sitemap; không đưa thông tin salon giả vào JSON-LD. `npm run test:seo` kiểm tra cả hai.
