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

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      ...Object.entries(OLD_IMAGES).map(([from, to]) => ({
        source: `/images/${from}.webp`,
        destination: `/images/app/${to}.webp`,
        permanent: true,
      })),
      { source: "/images/hero-image.png", destination: "/images/app/tong-quan.webp", permanent: true },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withNextIntl(nextConfig);
