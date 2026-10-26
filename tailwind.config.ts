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
        "sg-md": "0 1px 3px rgba(41, 17, 25, 0.06), 0 6px 16px -4px rgba(41, 17, 25, 0.08)",
        "sg-lg": "0 2px 4px rgba(41, 17, 25, 0.04), 0 18px 40px -12px rgba(41, 17, 25, 0.18)",
        "sg-xl": "0 4px 8px rgba(41, 17, 25, 0.04), 0 32px 64px -20px rgba(74, 14, 34, 0.28)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        /* Đỏ đô (burgundy) — màu chủ đạo */
        brand: {
          50: "#FCF4F6",
          100: "#F8E6EB",
          200: "#F0CAD5",
          300: "#E3A0B3",
          400: "#CF6E8A",
          500: "#B34366",
          600: "#97274A",
          700: "#7D1A3A",
          800: "#64152F",
          900: "#4E1126",
          950: "#2C0814",
        },
        primary: {
          DEFAULT: "#7D1A3A",
          hover: "#64152F",
        },
        accent: {
          DEFAULT: "#97274A",
          strong: "#7D1A3A",
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
