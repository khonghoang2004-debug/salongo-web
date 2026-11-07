import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        /* Tiêu đề: Noto Serif Display (chữ có chân tương phản cao), dự phòng serif hệ thống */
        display: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        "sg-sm": "0 1px 2px rgba(34, 22, 26, 0.05)",
        "sg-md": "0 1px 2px rgba(34, 22, 26, 0.05), 0 8px 20px -12px rgba(34, 22, 26, 0.18)",
        "sg-lg": "0 1px 2px rgba(34, 22, 26, 0.06), 0 18px 40px -22px rgba(34, 22, 26, 0.28)",
        "sg-xl": "0 1px 2px rgba(34, 22, 26, 0.06), 0 30px 60px -28px rgba(34, 22, 26, 0.35)",
      },
      /* Tiêu đề chỉ đậm hơn chữ thường một chút */
      fontWeight: {
        bold: "600",
        extrabold: "600",
        black: "700",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        /* Đỏ đô (burgundy) — màu chủ đạo */
        brand: {
          50: "#F8EEF1",
          100: "#F1DCE2",
          200: "#E3B6C1",
          300: "#CF8396",
          400: "#B34A65",
          500: "#99183A",
          600: "#800020",
          700: "#800020",
          800: "#66001A",
          900: "#4D0014",
          950: "#2E000C",
        },
        primary: {
          DEFAULT: "#800020",
          hover: "#66001A",
        },
        accent: {
          DEFAULT: "#800020",
          strong: "#66001A",
        },
        /* Mực: nâu mận rất đậm (không dùng đen pha) */
        ink: "#22161A",
        /* Viền trung tính */
        line: "#E6E1E0",
        muted: "#6B5F62",
        /* Nude: màu sơn móng nude rất nhạt, nền các dải phụ */
        sand: "#F7F1EF",
        nude: {
          DEFAULT: "#F7F1EF",
          deep: "#EDE2DF",
        },
      },
    },
  },
  plugins: [],
};
export default config;
