import "./globals.css";

// Đường dẫn ngoài mọi ngôn ngữ (middleware thường đã chuyển sang /vi/…): trang 404 tối giản
export default function GlobalNotFound() {
  return (
    <html lang="vi">
      <body>
        <main style={{ padding: "4rem 1rem", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
          <h1>404</h1>
          <p>
            <a href="/vi">SalonGo</a>
          </p>
        </main>
      </body>
    </html>
  );
}
