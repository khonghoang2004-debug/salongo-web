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
        display: ["var(--font-display)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "sg-sm": "0 1px 2px rgba(41, 17, 25, 0.05)",
        "sg-md": "0 1px 2px rgba(41, 17, 25, 0.06), 0 2px 6px rgba(41, 17, 25, 0.06)",
        "sg-lg": "0 1px 2px rgba(41, 17, 25, 0.06), 0 4px 12px rgba(41, 17, 25, 0.08)",
        "sg-xl": "0 1px 2px rgba(41, 17, 25, 0.06), 0 6px 16px rgba(41, 17, 25, 0.1)",
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
        ink: "#1A1416",
        line: "#ECE6E7",
        muted: "#6E6568",
        sand: "#FAF7F6",
      },
    },
  },
  plugins: [],
};
export default config;
