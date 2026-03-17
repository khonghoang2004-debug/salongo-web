import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import "./globals.css";

/** Favicon / logo tab & Google kết quả tìm kiếm (SVG trong public/) */
export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/salongo-logo.svg", type: "image/svg+xml", sizes: "any" }],
    shortcut: "/salongo-logo.svg",
    apple: [{ url: "/salongo-logo.svg", type: "image/svg+xml" }],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <svg className="absolute size-0 overflow-hidden" aria-hidden>
          <defs>
            <linearGradient id="gradientPinkPurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
