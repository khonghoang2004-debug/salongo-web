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
        ink: "#1F2937",
        muted: "#6B7280",
      },
    },
  },
  plugins: [],
};
export default config;
