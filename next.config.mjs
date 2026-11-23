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

// Content-Security-Policy. Trang dựng tĩnh (ISR) nên không dùng nonce (nonce bắt mọi trang render động, mất cache CDN):
// script nội tuyến của Next (dữ liệu RSC self.__next_f), JSON-LD và script bật "sg-js" cần 'unsafe-inline'.
// Không có 'unsafe-eval' ở bản production (React chỉ cần eval khi `next dev`). Mọi tài nguyên đều cùng domain:
// font của next/font/google được tự host trong /_next/static, video và ảnh trong /public; không có script bên thứ ba,
// không Vercel Analytics, không iframe. Link sang app / Facebook / WhatsApp là <a>, CSP không chặn điều hướng.
// Bản preview trên Vercel có thanh công cụ Vercel (vercel.live): chỉ cho phép ở VERCEL_ENV=preview.
const isDev = process.env.NODE_ENV === "development";
const isPreview = process.env.VERCEL_ENV === "preview";
const onVercel = Boolean(process.env.VERCEL);
const preview = (...src) => (isPreview ? src : []);
// Stripe Embedded Checkout (hosting payment on /website/thanh-toan): js.stripe.com script + iframes, api.stripe.com calls.
const STRIPE = { script: ["https://js.stripe.com"], frame: ["https://js.stripe.com", "https://checkout.stripe.com", "https://hooks.stripe.com"], connect: ["https://api.stripe.com", "https://checkout.stripe.com"] };
// SalonGo Kasa installers + auto-update feed: static files in public/kasa/updates/<mac|win>/ (see the README there).
// Short stable links /kasa/download/mac|win → newest installer (302, so the target can change with each release).
const KASA_INSTALLER = { mac: "/kasa/updates/mac/SalonGo-Kasa-latest.dmg", win: "/kasa/updates/win/SalonGo-Kasa-latest.exe" };
const HOSTING_SHORT = { 299: "plan=basic&cycle=m", 2999: "plan=basic&cycle=y", 999: "plan=pro&cycle=m", 9999: "plan=pro&cycle=y" };
const CSP = [
  ["default-src", "'self'"],
  ["script-src", "'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : []), ...STRIPE.script, ...preview("https://vercel.live")],
  ["style-src", "'self'", "'unsafe-inline'", ...preview("https://vercel.live")],
  ["img-src", "'self'", "data:", "blob:", "https://*.stripe.com", ...preview("https://vercel.live", "https://vercel.com")],
  ["font-src", "'self'", "data:", ...preview("https://vercel.live", "https://assets.vercel.com")],
  ["media-src", "'self'"],
  ["connect-src", "'self'", ...(isDev ? ["ws:"] : []), ...STRIPE.connect, ...preview("https://vercel.live", "wss://ws-us3.pusher.com")],
  ["frame-src", ...STRIPE.frame, ...preview("https://vercel.live")],
  ["worker-src", "'self'", "blob:"],
  ["manifest-src", "'self'"],
  ["form-action", "'self'"],
  ["frame-ancestors", "'none'"],
  ["base-uri", "'self'"],
  ["object-src", "'none'"],
  // Chỉ trên Vercel (luôn HTTPS); ở máy local `next start` chạy http, nâng cấp sẽ làm hỏng mọi file /_next
  ...(onVercel ? [["upgrade-insecure-requests"]] : []),
]
  .map((d) => d.join(" "))
  .join("; ");

// Header bảo mật cho mọi trang (HSTS: Vercel chỉ thêm trên domain *.vercel.app, nên tự đặt cho salongo.eu).
const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: CSP },
  // Mọi link ra ngoài đã có rel="noopener"; COOP chặn thêm trang khác giữ window.opener tới trang này
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // clipboard-write vẫn được phép (nút "Sao chép email"); chỉ tắt các quyền trang không bao giờ dùng
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), hid=(), bluetooth=(), midi=(), magnetometer=(), gyroscope=(), accelerometer=(), display-capture=(), browsing-topics=()",
  },
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
      // Kasa update feed: electron-updater must always see the newest latest*.yml (no cache); installers are files
      // to save (correct type + attachment), never pages to index.
      {
        source: "/kasa/updates/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
      { source: "/kasa/updates/:path*.yml", headers: [{ key: "Content-Type", value: "text/yaml; charset=utf-8" }] },
      {
        source: "/kasa/updates/:path*.dmg",
        headers: [{ key: "Content-Type", value: "application/x-apple-diskimage" }, { key: "Content-Disposition", value: "attachment" }],
      },
      {
        source: "/kasa/updates/:path*.exe",
        headers: [{ key: "Content-Type", value: "application/vnd.microsoft.portable-executable" }, { key: "Content-Disposition", value: "attachment" }],
      },
      ...["/images/:path*", "/videos/:path*"].map((source) => ({
        source,
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      })),
    ];
  },
  async redirects() {
    return [
      // Short hosting links the owner sends to customers: salongo.eu/hosting-999 (or /cs/hosting-999) opens the
      // in-page checkout of that exact plan (299 / 2999 = Hosting month / year, 999 / 9999 = + content edits).
      ...Object.entries(HOSTING_SHORT).flatMap(([price, q]) => [
        { source: `/hosting-${price}`, destination: `/vi/website/thanh-toan?${q}`, permanent: false },
        { source: `/:locale(vi|cs|en|de)/hosting-${price}`, destination: `/:locale/website/thanh-toan?${q}`, permanent: false },
      ]),
      ...Object.entries(KASA_INSTALLER).flatMap(([os, destination]) => [
        { source: `/kasa/download/${os}`, destination, permanent: false },
        { source: `/:locale(vi|cs|en|de)/kasa/download/${os}`, destination, permanent: false },
      ]),
      ...Object.entries(OLD_IMAGES).map(([from, to]) => ({
        source: `/images/${from}.webp`,
        destination: `/images/app/${to}.webp`,
        permanent: true,
      })),
      { source: "/images/hero-image.png", destination: "/images/app/tong-quan.webp", permanent: true },
      // Ảnh màn Nâng cấp gói cập nhật giá Pro (499 CZK, tối đa 8 thợ / 3 chi nhánh): đổi tên để khách quen thấy ngay bản mới
      { source: "/images/app/m-nang-cap-goi.webp", destination: "/images/app/m-nang-cap-goi-v2.webp", permanent: true },
      { source: "/images/app/nang-cap-goi-noi-dung.webp", destination: "/images/app/nang-cap-goi-noi-dung-v2.webp", permanent: true },
      { source: "/images/og-image.png", destination: "/images/og-image-v3.png", permanent: false },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withNextIntl(nextConfig);
