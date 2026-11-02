# Nghiên cứu 15 website salon tại Séc (02/11/2026)

Cách xem: mở bằng Chromium (Playwright) ở 1440×900 và 390×844, chụp màn đầu và cả trang sau khi cuộn hết trang (để ảnh lazy tải), đóng banner cookie nếu có. Đọc font/màu bằng `getComputedStyle`. Four Seasons chặn trình duyệt tự động (403) nên mình mở lại bằng trình duyệt trong app. Ảnh chụp chỉ để nghiên cứu, **không** dùng lại ảnh, chữ, logo hay mã nguồn của các website này.

Ký hiệu: **[thấy]** = nhìn trực tiếp trên ảnh chụp / trình duyệt · **[suy luận]** = rút ra từ nội dung hoặc mã, chưa kiểm chứng bằng mắt.

| # | Website | Đã xem | Điểm đáng học | Hạn chế | Áp dụng vào mẫu |
|---|---|---|---|---|---|
| 1 | EstetBeauty (estetbeauty.cz) | Trang chủ + Kontakty, PC/mobile | [thấy] Ảnh studio phủ cả màn đầu, chữ in hoa giãn rộng (Tenor Sans), nền đá ấm #ECE9E2, khối ảnh chân dung xen khối chữ theo nhịp trái/phải | [thấy] Đoạn chữ dài, chữ thân 13 px hơi nhỏ; banner cookie che nút | Ivelle (nail thanh lịch): giữ nhịp ảnh/chữ xen kẽ, tăng cỡ chữ |
| 2 | Dephaus (dephaus.com/cs) | Trang chủ PC/mobile; `/cs/cenik` trả 404 | [thấy] Tên thương hiệu serif rất lớn tràn đáy ảnh hero, menu dạng viên thuốc nổi giữa trên cùng, nút "Rezervovat" màu cam đất nổi bật, thông tin liên hệ thành 4 ô gọn | [thấy] Trang chủ ngắn, phần đánh giá chiếm chỗ; [suy luận] bảng giá nằm ở hệ thống đặt lịch ngoài | **Marelle** (nail mới): wordmark khổng lồ + menu viên thuốc + 4 ô liên hệ |
| 3 | Maison Studio (maisonstudio.cz) | Trang chủ PC/mobile (lần đầu lỗi chứng chỉ SSL, lần hai mở được) | [thấy] Hero chữ serif in hoa cỡ lớn trên ảnh, danh mục dịch vụ dạng danh sách có dòng mô tả nhỏ, hàng "giá trị" có icon nét mảnh, lưới Instagram | [thấy] Ảnh có vẻ ảnh tạo/stock; nhiều khối giống template | Brass & Walnut (barber): danh mục có dòng mô tả |
| 4 | Studio Fleur (studiofleur.cz) | Trang chủ PC/mobile; `/rezervace/` 404 | [thấy] Hướng dẫn "Jak se k nám dostat" bằng ảnh lối vào, giờ mở cửa dạng bảng, nút đặt lịch theo từng thợ | [thấy] Logo chữ ký hồng đậm, đánh giá Google + popup cookie che màn đầu, bố cục cũ | Ý "cách tìm đến salon" + nút đặt theo thợ (Hugo, Iris) |
| 5 | LUXE Esthétique (luxebeautyprague.cz) | Trang chủ + Ceník | [thấy] Tông caramel/nâu đồng nhất, Playfair + Montserrat, khung viên thuốc lớn quanh tên | [thấy] Toàn trang một màu nâu, chữ trắng trên nâu nhạt khó đọc, trang dài trống phía dưới | Tránh: không dùng nền màu trung bình cho đoạn chữ dài |
| 6 | Lash House (lashhouse.cz) | Trang chủ + Ceník | [thấy] Nền hoạ tiết lá xanh ngọc/hồng, bảng giá thành các "thẻ menu" màu kem đặt trên hoạ tiết, tên dịch vụ in hoa serif, giá căn phải | [thấy] Ảnh lỗi tải ở mobile, chữ menu nhỏ; nhiều nhóm dịch vụ không liên quan (kurzy) | **Iris** (mi mới): thẻ menu trên nền hoạ tiết |
| 7 | SkinArth (skinarth.cz) | Trang chủ + Ceník | [thấy] 4 bước "lần đầu đến salon" có số, bảng giá theo nhóm có cột thời gian + giá, FAQ dạng lưới, màu xanh rừng #1E352B + xám | [thấy] Đường cong trang trí nhiều, đánh giá khách chiếm chỗ | **Kora** (da & mày mới): 4 bước + bảng giá có thời gian |
| 8 | Řasy Sokolská (rasy-sokolska.cz) | Trang chủ + Ceník | [thấy] Hai chi nhánh thành hai thẻ địa chỉ, bảng giá dạng bảng có nền gradient hồng nhạt, mô tả kỹ thuật theo từng dịch vụ | [thấy] Dải khuyến mãi chạy (carousel) đầu trang, link xanh mặc định, chữ thân nhiều | **Iris**: phần "2 chi nhánh"; tránh carousel khuyến mãi |
| 9 | Salon Petra Měchurová (petramechurova.cz) | Trang chủ + Tým | [thấy] Tiêu đề in hoa "S LÁSKOU K VLASŮM" cạnh 1 ảnh chân dung, đội ngũ ảnh tròn, ảnh không gian salon lớn | [thấy] Màn đầu PC trống khi ảnh/video chưa tải | **Hugo** (tóc tối giản): tiêu đề in hoa + chân dung, đội ngũ ảnh tròn |
| 10 | TONI&GUY CZ (toniandguy.cz/salony) | Trang Salony + trang chủ | [thấy] Mỗi chi nhánh: ảnh + địa chỉ + giờ + nút "Book online" ngay trên ảnh; chữ đen đậm kiểu thời trang | [thấy] Nhiều khoảng trắng chết, cookie che, phông chữ web riêng | Phần chi nhánh cho Iris; chữ đậm thời trang cho Maison Lumen |
| 11 | James Hair (jameshair.cz) | James + Kontakt | [thấy] Tối giản: chữ thường "james hair" ở giữa, giá in hoa hai cột trên dải xám, bảng giờ mở cửa, form ngắn ngay dưới | [thấy] Chữ rất mảnh (Futura light), menu ẩn sau hamburger cả trên PC | **Hugo**: wordmark chữ thường + bảng giá hai cột in hoa |
| 12 | Studio Itta (studio-itta.cz) | Trang chủ + Galerie | [thấy] Menu viên thuốc màu mận, nút vàng, tiêu đề sans mảnh + chữ nghiêng serif, thẻ dịch vụ có nhãn + "od X Kč" + số điện thoại riêng từng mảng, hàng số liệu | [thấy] Dải chữ chạy ngang (marquee), nhiều thẻ bo góc | **Nova** (nhiều dịch vụ mới): thẻ dịch vụ có giá "od" + số điện thoại từng mảng; dải chữ tĩnh thay marquee |
| 13 | Carlo IV Spa (carloivspa.com) | Trang chủ + Treatments | [thấy] Hàng ảnh/chữ xen kẽ trái phải, tiêu đề in hoa xanh mint #A3C1B1, khối giờ mở cửa nền mint | [thấy] Slider ảnh tự chuyển, chữ mint nhạt trên trắng tương phản thấp, popup cookie | Saluna (spa): hàng xen kẽ + khối giờ mở cửa; tránh chữ mint nhạt |
| 14 | AVA Spa – Four Seasons (fourseasons.com/prague/spa) | Trang Spa, xem bằng trình duyệt trong app (Playwright bị 403) | [thấy] Dải đen với tiêu đề in hoa giãn rộng, chữ thân serif lớn, ảnh rộng, thanh "Check rates" dính đáy màn hình trên mobile | [thấy] Trang rất dài; [suy luận] phụ thuộc hệ thống đặt phòng khách sạn | **Onyx** (spa mới): dải tối + serif + thanh đặt lịch dính đáy trên mobile |
| 15 | SPA SPA (spaspa.cz/en) | Trang chủ + Wellness zones | [thấy] Lưới địa điểm có ảnh + tên quận, hai nút đặt lịch to ở hero, voucher | [thấy] Ảnh neon tím rất đậm, nhiều địa điểm "sắp mở" | Lưới "phòng / chi nhánh" cho Onyx |

## Kết luận dùng cho thiết kế

- Salon Séc làm tốt: bảng giá rõ (nhóm + thời gian + giá), địa chỉ/chi nhánh và giờ mở cửa dễ thấy, nút "Rezervovat" luôn trong tầm mắt.
- Thường làm chưa tốt: popup cookie và đánh giá che màn đầu, chữ quá nhỏ/nhạt, carousel/marquee tự chạy, trang chủ dài một màu.
- Vì vậy các mẫu: không carousel tự chạy, không đánh giá giả, chữ thân ≥ 15 px, nút đặt lịch ở header + cuối mỗi trang (và thanh đáy trên mobile ở Onyx, không che nội dung vì có khoảng đệm).

## Hướng thiết kế từng mẫu (sau nâng cấp)

| Mẫu | Ngành | Học từ | Màu | Font | Hero | Bảng giá | Gallery |
|---|---|---|---|---|---|---|---|
| Ivelle | Nail | EstetBeauty | ivory/nude/taupe | Cormorant + Be Vietnam Pro | chữ trái, ảnh vòm phải | dòng chấm dẫn | lưới vòm |
| **Marelle** | Nail | Dephaus | kem/cam đất/xanh xám | Fraunces đậm + Plus Jakarta Sans | ảnh tràn, wordmark khổng lồ đè đáy, menu viên thuốc | danh sách theo nhóm, giá trong viên thuốc | lưới 3 cột vuông |
| Chroma | Nail bar | (tự thiết kế trước đó) | cobalt/vàng bơ | Unbounded + Manrope | chữ to + ô chọn màu | thẻ sticker | lưới viền đậm |
| Verra | Hair | — | cream/espresso | Space Grotesk | chia đôi ảnh/khối nâu | bảng nhóm đánh số | lưới tạp chí |
| Maison Lumen | Hair couture | TONI&GUY (chữ thời trang) | ngà/đen/đỏ rượu | Noto Serif Display + Inter Tight | chữ khổng lồ + drop cap | 3 cột giá theo cấp thợ | lookbook so le |
| **Hugo** | Hair (1 stylist) | James Hair + Měchurová | trắng/xám/đen, điểm vàng | Jost | wordmark chữ thường, tiêu đề in hoa + chân dung | hai cột in hoa trên dải xám | lưới ảnh vuông + avatar tròn |
| **Nova** | Nhiều dịch vụ | Studio Itta | kem ấm/mận/vàng | Inter Tight mảnh + Newsreader nghiêng | căn giữa, menu viên thuốc màu mận | thẻ theo mảng, "od X Kč" + điện thoại từng mảng | dải ảnh ngang tĩnh |
| Velvet | Mi & mày | — | blush/mận | Playfair + Josefin | chữ nghiêng + oval | menu nghiêng | oval |
| **Iris** | Mi | Lash House + Sokolská | xanh ngọc đậm/hồng/kem | Spectral + Hanken Grotesk | nền hoạ tiết lá SVG + thẻ kem | thẻ menu kem trên hoạ tiết | lưới + 2 chi nhánh |
| **Kora** | Da & mày | SkinArth | xanh rừng/xám xanh/trắng | Geologica | ô danh mục + tiêu đề trái | bảng nhóm có cột thời gian | 4 bước lần đầu + FAQ |
| Aurel | Makeup | — | lục bảo/kem/vàng | Fraunces mảnh + Montserrat | đối xứng + monogram | 2 cột căn giữa | khung vàng |
| Saluna | Spa | Carlo IV | trắng ấm/sage | Lora | căn giữa + ba vòm | thẻ liệu trình | vòm |
| **Onyx** | Spa cao cấp | AVA Four Seasons + SPA SPA | than chì/đá/đồng nhạt | Tenor Sans + EB Garamond | dải tối, tiêu đề in hoa giãn, ảnh rộng | danh sách serif có thời gian | lưới phòng/khu |
| Brass & Walnut | Barber | Maison Studio | than chì/óc chó/đồng | Oswald | chữ hẹp + khung đồng | bảng menu viền | vuông |

7 mẫu dựng trên cùng một khung đổi màu (Tropicana, Cherry Club, Lilac Lab, Matcha Room, Azure Barbers, Rosé Bridal, Saffron) đã **bỏ**: chúng chỉ khác màu/font trên một bố cục, trái yêu cầu "mỗi mẫu một bố cục riêng".
