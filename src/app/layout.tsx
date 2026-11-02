import "./globals.css";

// <html lang> nằm ở [locale]/layout.tsx: biết ngôn ngữ từ đường dẫn nên mọi trang được dựng tĩnh
// (trước đây getLocale() ở đây đọc header, khiến mọi trang phải render lại ở server mỗi lượt xem).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
