// Báo cho Bing, Seznam, Yandex, Naver (giao thức IndexNow) rằng các trang trong sitemap vừa đổi.
// Chạy sau mỗi lần deploy có đổi nội dung:  node scripts/indexnow.mjs
// (hoặc chỉ vài trang:  node scripts/indexnow.mjs https://www.salongo.eu/cs https://www.salongo.eu/vi/bang-gia)
// Khoá = tên file public/ec599f2729fdc5e159dcb95566fede0b.txt (nội dung file phải đúng bằng khoá; đừng xoá file).
// Google không dùng IndexNow: với Google, gửi sitemap / "Request indexing" trong Search Console.
const SITE = "https://www.salongo.eu";
const KEY = "ec599f2729fdc5e159dcb95566fede0b";

let urls = process.argv.slice(2);
if (!urls.length) {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
if (!urls.length) throw new Error("Không đọc được URL nào từ sitemap");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});
// 200/202 = đã nhận; 403 = khoá sai / file khoá không truy cập được; 422 = URL không thuộc host
console.log(`IndexNow: ${res.status} ${res.statusText} (${urls.length} URL)`);
if (!res.ok && res.status !== 202) process.exit(1);
