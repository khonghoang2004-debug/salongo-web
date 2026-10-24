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
      },
      boxShadow: {
        "sg-sm": "0 1px 2px rgba(16, 24, 40, 0.05)",
        "sg-md": "0 1px 3px rgba(16, 24, 40, 0.06), 0 4px 12px -2px rgba(16, 24, 40, 0.06)",
        "sg-lg": "0 2px 4px rgba(16, 24, 40, 0.04), 0 12px 24px -6px rgba(16, 24, 40, 0.1)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#7C3AED",
          hover: "#6D28D9",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          strong: "#7C3AED",
        },
        ink: "#111827",
        line: "#E9E8F2",
        muted: "#6B7280",
      },
    },
  },
  plugins: [],
};
export default config;
