import { getLocale } from "next-intl/server";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Bật chuyển động trước khi vẽ trang để nội dung không bị nháy */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('sg-js')" }} />
      </head>
      <body>
        <svg className="absolute size-0 overflow-hidden" aria-hidden>
          <defs>
            <linearGradient id="gradientPinkPurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6b1532" />
              <stop offset="50%" stopColor="#800020" />
              <stop offset="100%" stopColor="#c04a6e" />
            </linearGradient>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
