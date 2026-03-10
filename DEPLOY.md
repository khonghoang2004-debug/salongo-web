# Hướng dẫn Deploy SalonGo Web

Bạn đã có **domain** – dưới đây là những gì cần có và các bước deploy.

---

## 1. Những gì bạn cần có

| Thứ | Ghi chú |
|-----|--------|
| **Tài khoản Git** | GitHub / GitLab / Bitbucket (code đẩy lên đây) |
| **Domain** | Bạn đã có – ví dụ: `salongo.vn`, `salongo.com` |
| **Tài khoản hosting** | Khuyến nghị: **Vercel** (miễn phí, hợp Next.js) |

---

## 2. Chuẩn bị code

### 2.1 Đẩy code lên GitHub (nếu chưa có)

```bash
cd "c:\Users\khong hoang\Desktop\salongo-web"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TEN_USER/TEN_REPO.git
git push -u origin main
```

Thay `TEN_USER` và `TEN_REPO` bằng tên user GitHub và tên repo của bạn.

### 2.2 Kiểm tra build chạy được trên máy

```bash
npm run build
npm run start
```

Mở `http://localhost:3000` (hoặc port hiển thị). Nếu chạy bình thường thì deploy sẽ ổn.

---

## 3. Deploy lên Vercel (khuyến nghị)

### Bước 1: Tạo tài khoản Vercel

- Vào [vercel.com](https://vercel.com) → Sign up (dùng GitHub cho tiện).

### Bước 2: Import project

1. **Add New** → **Project**.
2. Chọn **Import Git Repository** → chọn repo **salongo-web**.
3. **Framework Preset:** Next.js (Vercel tự nhận).
4. **Root Directory:** để trống (project ở root).
5. **Build Command:** `npm run build` (mặc định).
6. **Output Directory:** mặc định (Next.js tự xử lý).
7. Bấm **Deploy**.

Đợi build xong, bạn sẽ có link dạng: `https://salongo-web-xxx.vercel.app`.

### Bước 3: Gắn domain của bạn

1. Vào project vừa deploy → tab **Settings** → **Domains**.
2. Thêm domain: ví dụ `salongo.vn` hoặc `www.salongo.vn`.
3. Làm theo hướng dẫn **DNS** trên Vercel:
   - **A record** trỏ `@` (hoặc `www`) tới IP Vercel, **hoặc**
   - **CNAME** trỏ `www` tới `cname.vercel-dns.com`.
4. Vercel sẽ cấp **SSL (HTTPS)** tự động.

Chi tiết: [Vercel – Add domain](https://vercel.com/docs/concepts/projects/domains).

---

## 4. Các lựa chọn hosting khác

| Nền tảng | Ghi chú |
|----------|--------|
| **Vercel** | Tối ưu cho Next.js, miễn phí tier rộng, dễ gắn domain. |
| **Netlify** | Cũng hỗ trợ Next.js, có plan miễn phí. |
| **VPS (DigitalOcean, AWS, v.v.)** | Tự cài Node, chạy `npm run build` + `npm run start`, cấu hình Nginx + domain + SSL (phức tạp hơn). |

---

## 5. Sau khi deploy

- **Đa ngôn ngữ:** Đã cấu hình (vi, en, cs, de), URL dạng: `https://domain-cua-ban.com/vi`, `/en`, ...
- **Ảnh trong `public/`:** Tự có trên production, không cần cấu hình thêm.
- **Nếu đổi domain trong code:** Sửa `siteConfig.url` trong `src/lib/metadata.ts` cho đúng domain thật.

Nếu bạn gửi thêm tên domain (ví dụ `salongo.vn` hay `www.salongo.vn`), có thể viết giúp bạn từng bước DNS chi tiết hơn.
