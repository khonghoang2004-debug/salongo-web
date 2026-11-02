# Ưu đãi làm website 999 Kč + thư viện website mẫu

## Có gì ở đâu

| Phần | URL | File |
|---|---|---|
| Khu ưu đãi trên trang chủ (ngay dưới hero) | `/{locale}` | `src/components/home/HomeWebsiteOffer.tsx` |
| Trang dịch vụ + thư viện mẫu (được index, có trong sitemap) | `/{locale}/website` | `src/app/[locale]/website/page.tsx` |
| Demo 38 mẫu × 5 trang (noindex, không có trong sitemap) | `/{locale}/website/mau/{mẫu}/{trang}` | `src/app/[locale]/website/mau/[template]/[[...page]]/page.tsx` |
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
| `marelle-nails` | Nail (học Dephaus) | kem/cam đất, wordmark khổng lồ, menu viên thuốc | Fraunces đậm + Plus Jakarta Sans |
| `hugo-hair` | Tóc, 1 stylist (James Hair, Měchurová) | đen trắng, giá in hoa 2 cột | Jost |
| `onyx-spa` | Spa cao cấp (AVA, SPA SPA) | than chì/đá, thanh đặt lịch đáy mobile | Tenor Sans + EB Garamond |
| `iris-lash` | Mi (Lash House, Sokolská) | hoạ tiết lá, thẻ menu, 2 chi nhánh | Spectral + Hanken Grotesk |
| `kora-skin` | Da & mày (SkinArth) | xanh rừng, 4 bước, FAQ lưới | Geologica |
| `nova-studio` | Nhiều dịch vụ (Studio Itta) | mận/vàng, thẻ có điện thoại từng mảng | Inter Tight + Newsreader |

Nghiên cứu 15 website và lý do chọn hướng: `RESEARCH-2026-11.md`. 6 mẫu này chỉ viết nội dung tiếng Séc (`content/research.ts`).
Trang trong mỗi mẫu: `""` trang chủ, `dich-vu`, `gioi-thieu`, `bo-suu-tap`, `dat-lich`.

## Ngôn ngữ

Nội dung các website mẫu **luôn bằng tiếng Séc** (`DEMO_LOCALE` trong trang demo), vì khách của salon ở Séc; thanh SalonGo phía trên, thư viện và trang chủ theo ngôn ngữ trang. File nội dung vẫn giữ đủ 4 ngôn ngữ, đổi `DEMO_LOCALE` nếu cần.

## Sửa thường gặp

- **Giá / số trang của ưu đãi**: `src/lib/website-offer.ts` (`WEBSITE_PRICE_KC`, `WEBSITE_MAX_PAGES`). Mọi câu chữ dùng `{price}` / `{pages}` nên chỉ cần đổi ở đây. Không có thông tin VAT, đừng thêm "đã/chưa gồm VAT" khi chưa xác nhận.
- **Câu chữ ưu đãi, FAQ, tin nhắn mẫu, tiêu đề "Liên hệ ngay để nhận tư vấn miễn phí"**: `messages/{vi,cs,en,de}.json` → nhóm `webOffer`; tiêu đề/mô tả SEO của `/website`: `pages.websiteTitle`, `pages.websiteDesc`.
- **Số điện thoại, Facebook, Instagram**: `src/lib/contact.ts` (dùng chung với chân trang, trang Liên hệ). Nút gọi tự tạo `tel:` từ số này.
- **Nội dung một mẫu** (tên, dịch vụ, giá minh hoạ, đội ngũ, giờ mở cửa…): `src/components/website/templates/content/*.ts`, đủ 4 ngôn ngữ. Giá dịch vụ là số (Kč), `from: true` hiện "từ …", `tiers` = giá theo cấp thợ (Maison Lumen).
- **Chữ chung của demo** (ghi chú "Website mẫu…", nhãn form, thông báo form demo): `src/components/website/templates/common.ts`.
- **Bố cục / màu / chữ từng mẫu**: `src/components/website/sites/*Site.tsx`; font riêng trong `sites/shared.tsx` (next/font: tham số phải viết thẳng, dùng font biến thiên, không liệt kê độ đậm).
- **Thêm mẫu mới**: thêm file nội dung + component site, rồi khai báo trong `templates/registry.ts` và `sites/index.ts`; chụp lại ảnh xem trước.
- **24 mẫu dựng từ khối (kit)**: `src/components/website/kit/`. Mỗi mẫu là một mục trong `kit/specs.ts` (nội dung tiếng Séc, ceník theo ngành, ảnh, màu `theme.c`, font `KIT_FONTS`, bố cục `layout`: kiểu đầu trang, bảng giá, bộ sưu tập, đội ngũ, menu, chân trang, thứ tự khối trang chủ). Một renderer chung `kit/KitSite.tsx`. Thêm mẫu kit = thêm một mục vào `SPECS` (tự vào thư viện, bộ lọc, demo), chuyển ảnh sang `public/images/website/demo/` và chụp ảnh xem trước. Nếu `accent` nhạt (vàng đồng), đặt `accentInk` đậm hơn cho chữ nhấn trên nền sáng.

## Ảnh

- Ảnh trong demo là **ảnh Unsplash miễn phí** (giấy phép Unsplash), lưu trong `public/images/website/demo/`. Nguồn từng ảnh: `PHOTO-CREDITS.md`.
- Ảnh nào ở mẫu nào (hero, gallery, đội ngũ) + chú thích: `src/components/website/templates/photos.ts`. Đổi ảnh: chép file WebP vào thư mục demo rồi sửa mã ở đây. Mẫu nào không có ảnh sẽ tự dùng hình minh hoạ SVG (`Art.tsx`).
- **Ảnh xem trước trong thư viện / trang chủ** (`public/images/website/{mẫu}-{pc|m}.webp`, tiếng Séc) được chụp từ chính demo. Chụp lại sau khi sửa mẫu:

```bash
npm i -D --no-save playwright && npx playwright install chromium   # một lần
npm run dev -- -p 3200                                              # cửa sổ khác
node docs/website-templates/shoot-previews.mjs http://localhost:3200 public/images/website
```
(cần `ffmpeg` có libwebp)

## SEO

Theo `docs/seo/AUDIT-2026-11.md`: `/website` được index (canonical, hreflang, sitemap). Demo: `noindex, follow`, không canonical, không có trong sitemap; không đưa thông tin salon giả vào JSON-LD. `npm run test:seo` kiểm tra cả hai.
