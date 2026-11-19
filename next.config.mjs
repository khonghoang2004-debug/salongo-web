import createNextIntlPlugin from "next-intl/plugin";

// Ảnh chụp app cũ (SalonGo, trước 29/10/2026) đã chuyển sang /images/app/ — giữ đường dẫn cũ cho link / bộ nhớ đệm bên ngoài
const OLD_IMAGES = {
  "dat-lich-khach": "dat-lich-khach",
  "lich-hen-online": "lich-online-noi-dung",
  "lich-hen-nhan-vien": "lich-hen-nhan-vien-noi-dung",
  "lich-hen-danh-sach": "lich-hen-danh-sach-noi-dung",
  "tinh-tien": "tinh-tien-noi-dung",
  "khach-hang": "khach-hang-noi-dung",
  "dich-vu": "dich-vu-noi-dung",
  "tong-quan": "tong-quan-noi-dung",
  "doanh-thu": "doanh-thu-noi-dung",
  "hoa-don": "hoa-don-noi-dung",
  "tinh-luong": "tinh-luong-noi-dung",
  "hero-dashboard": "tong-quan",
};

// Domain chính duy nhất được index. Bản sao trên domain khác (salongo-web.vercel.app, bản preview…)
// nhận X-Robots-Tag: noindex để Google không lập chỉ mục trùng; trên www.salongo.eu không có header này.
const PRIMARY_HOST = "www.salongo.eu";

// Header bảo mật cho mọi trang (HSTS: Vercel chỉ thêm trên domain *.vercel.app, nên tự đặt cho salongo.eu).
// Không đặt CSP đầy đủ (cần nonce cho script nội tuyến); chỉ cấm nhúng trang vào iframe của site khác.
const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        source: "/:path*",
        missing: [{ type: "host", value: PRIMARY_HOST.replace(/\./g, "\\.") }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      // Ảnh / video trong /public mặc định "max-age=0, must-revalidate": trình duyệt hỏi lại server mỗi lần xem.
      // Cho giữ 1 ngày, sau đó vẫn dùng bản cũ thêm 1 tuần trong lúc tải bản mới ở nền.
      // Thay ảnh mà giữ tên file thì khách quen có thể thấy ảnh cũ tối đa 1 ngày — muốn đổi ngay thì đổi tên (…-v2.webp).
      ...["/images/:path*", "/videos/:path*"].map((source) => ({
        source,
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      })),
    ];
  },
  async redirects() {
    return [
      ...Object.entries(OLD_IMAGES).map(([from, to]) => ({
        source: `/images/${from}.webp`,
        destination: `/images/app/${to}.webp`,
        permanent: true,
      })),
      { source: "/images/hero-image.png", destination: "/images/app/tong-quan.webp", permanent: true },
      { source: "/images/og-image.png", destination: "/images/og-image-v2.png", permanent: false },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withNextIntl(nextConfig);
