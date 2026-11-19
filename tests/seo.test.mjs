// Kiểm tra SEO trên bản build thật: `npm run build && npm start`, rồi `npm run test:seo`
// (BASE_URL mặc định http://localhost:3000; có thể trỏ vào bản preview để kiểm tra trước khi deploy).
import { test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import https from "node:https";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const SITE = "https://www.salongo.eu";
const LOCALES = ["vi", "en", "cs", "de"];
const PATHS = ["", "/tinh-nang", "/phan-mem-quan-ly-salon", "/giai-phap", "/bang-gia", "/goi-ban", "/ve-salongo", "/faq", "/lien-he", "/website", "/privacy", "/terms", "/cookies", "/dpa", "/website-terms"];
const PRIMARY = { headers: { host: "www.salongo.eu" } };
// Đổi header Host chỉ có ý nghĩa với server chạy local (trên Vercel, Host chọn project khác)
const LOCAL = /^http:\/\/(localhost|127\.0\.0\.1)/.test(BASE);

// node:http thay cho fetch: fetch không cho đổi header Host (cần để giả lập www.salongo.eu / *.vercel.app)
const get = (path, init = {}) =>
  new Promise((resolve, reject) => {
    const req = (BASE.startsWith("https:") ? https : http).request(BASE + path, { headers: init.headers ?? {} }, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (c) => (body += c));
      res.on("end", () =>
        resolve({ status: res.statusCode, headers: { get: (k) => res.headers[k.toLowerCase()] ?? null }, text: async () => body })
      );
    });
    req.on("error", reject);
    req.end();
  });
const head = async (path) => (await (await get(path, PRIMARY)).text()).split("</head>")[0];
const attr = (html, re) => (html.match(re) || [])[1];

test("sitemap: mọi trang × 4 ngôn ngữ, URL tuyệt đối www, hreflang đủ, không lastmod giả", async () => {
  const xml = await (await get("/sitemap.xml", PRIMARY)).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const expected = LOCALES.flatMap((l) => PATHS.map((p) => `${SITE}/${l}${p}`));
  assert.deepEqual([...locs].sort(), [...expected].sort());
  assert.equal(xml.includes("<lastmod>"), false);
  for (const block of xml.split("<url>").slice(1)) {
    const langs = [...block.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]);
    assert.deepEqual(langs.sort(), [...LOCALES, "x-default"].sort());
  }
});

test("robots.txt: cho phép thu thập, chỉ sitemap của www", async () => {
  const txt = await (await get("/robots.txt", PRIMARY)).text();
  assert.match(txt, /User-Agent: \*\nAllow: \//);
  assert.doesNotMatch(txt, /Disallow: \/\n/);
  assert.match(txt, new RegExp(`Sitemap: ${SITE}/sitemap.xml`));
});

test("mỗi trang: 200, canonical tự trỏ về chính nó, hreflang hai chiều, lang đúng, một H1, không noindex", async () => {
  for (const l of LOCALES) {
    for (const p of PATHS) {
      const res = await get(`/${l}${p}`, PRIMARY);
      assert.equal(res.status, 200, `/${l}${p}`);
      assert.equal(res.headers.get("x-robots-tag"), null, `/${l}${p} x-robots-tag`);
      assert.doesNotMatch(res.headers.get("link") ?? "", /hreflang/, `/${l}${p} Link header hreflang`);
      const html = await res.text();
      const h = html.split("</head>")[0];
      assert.equal(attr(h, /<link rel="canonical" href="([^"]+)"/), `${SITE}/${l}${p}`, `/${l}${p} canonical`);
      for (const other of LOCALES) {
        assert.equal(attr(h, new RegExp(`hrefLang="${other}" href="([^"]+)"`)), `${SITE}/${other}${p}`, `/${l}${p} hreflang ${other}`);
      }
      assert.equal(attr(h, /hrefLang="x-default" href="([^"]+)"/), `${SITE}/vi${p}`);
      assert.equal(attr(html, /<html[^>]*\slang="([^"]+)"/), l);
      assert.doesNotMatch(h, /<meta name="robots" content="[^"]*noindex/);
      assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `/${l}${p} h1`);
      assert.ok(attr(h, /<title>([^<]+)<\/title>/), `/${l}${p} title`);
      assert.ok(attr(h, /<meta name="description" content="([^"]+)"/), `/${l}${p} description`);
    }
  }
});

test("tiêu đề và mô tả không trùng nhau trong cùng ngôn ngữ", async () => {
  for (const l of LOCALES) {
    const titles = new Set(), descs = new Set();
    for (const p of PATHS) {
      const h = await head(`/${l}${p}`);
      titles.add(attr(h, /<title>([^<]+)<\/title>/));
      descs.add(attr(h, /<meta name="description" content="([^"]+)"/));
    }
    assert.equal(titles.size, PATHS.length, `${l} titles`);
    assert.equal(descs.size, PATHS.length, `${l} descriptions`);
  }
});

test("JSON-LD hợp lệ; Organization/WebSite/SoftwareApplication có @id cố định, không có đánh giá giả", async () => {
  for (const l of LOCALES) {
    const html = await (await get(`/${l}`, PRIMARY)).text();
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    const nodes = blocks.flatMap((b) => b["@graph"] ?? [b]);
    const byType = (t) => nodes.find((n) => n["@type"] === t);
    assert.equal(byType("Organization")["@id"], `${SITE}/#organization`);
    assert.equal(byType("SoftwareApplication")["@id"], `${SITE}/#software`);
    assert.ok(byType("WebSite"));
    assert.equal(html.includes("aggregateRating"), false);
  }
});

test("404: trả 404 và chỉ có noindex", async () => {
  const res = await get("/vi/khong-ton-tai", PRIMARY);
  assert.equal(res.status, 404);
  const h = (await res.text()).split("</head>")[0];
  const robots = [...h.matchAll(/<meta name="robots" content="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(robots, ["noindex"]);
  assert.doesNotMatch(h, /rel="canonical"/);
});

test("chuyển hướng: / và trang thiếu ngôn ngữ về /vi, dấu / cuối bị bỏ", async () => {
  const root = await get("/", PRIMARY);
  assert.equal(root.status, 308, "/ phải chuyển hướng vĩnh viễn");
  assert.equal(root.headers.get("location"), "/vi");
  assert.equal((await get("/tinh-nang", PRIMARY)).headers.get("location"), "/vi/tinh-nang");
  const slash = await get("/vi/", PRIMARY);
  assert.equal(slash.status, 308);
  assert.equal(slash.headers.get("location"), "/vi");
});

test("domain khác www.salongo.eu (vd. *.vercel.app) nhận X-Robots-Tag: noindex", { skip: !LOCAL && "chỉ chạy local" }, async () => {
  for (const host of ["salongo-web.vercel.app", "salongo.eu", "www.salongo.eu.example.com"]) {
    for (const p of ["/vi", "/robots.txt", "/sitemap.xml"]) {
      const res = await get(p, { headers: { host } });
      assert.equal(res.headers.get("x-robots-tag"), "noindex", `${host}${p}`);
    }
  }
  assert.equal((await get("/vi", PRIMARY)).headers.get("x-robots-tag"), null);
});

test("trang Về SalonGo có link trong trang (không còn mồ côi)", async () => {
  const html = await (await get("/cs", PRIMARY)).text();
  assert.match(html, /href="\/cs\/ve-salongo"/);
});

test("demo website mẫu: noindex, không canonical, không có trong sitemap", async () => {
  for (const p of ["/vi/website/mau/ivelle-nail", "/cs/website/mau/brass-barber/dich-vu"]) {
    const res = await get(p, PRIMARY);
    assert.equal(res.status, 200, p);
    const h = (await res.text()).split("</head>")[0];
    assert.match(h, /<meta name="robots" content="noindex, follow"/, p);
    assert.doesNotMatch(h, /rel="canonical"/, p);
  }
  const xml = await (await get("/sitemap.xml", PRIMARY)).text();
  assert.equal(xml.includes("/website/mau/"), false);
});

test("FAQ: mọi câu trả lời có sẵn trong HTML (không chỉ khi bấm mở), câu hỏi là H3", async () => {
  // Số câu hỏi đổi theo nội dung: chỉ cần mỗi nút mở (aria-controls) có câu trả lời tương ứng trong HTML
  for (const [path, id] of [["/vi/faq", "faq-a-q"], ["/vi/bang-gia", "pricing-faq-a"]]) {
    const html = await (await get(path, PRIMARY)).text();
    const answers = (html.match(new RegExp(`id="${id}\\d+"`, "g")) ?? []).length;
    const buttons = (html.match(new RegExp(`aria-controls="${id}\\d+"`, "g")) ?? []).length;
    assert.ok(answers >= 5, `${path}: ${answers} câu trả lời`);
    assert.equal(answers, buttons, path);
    assert.match(html, /<h3[^>]*><button[^>]*aria-controls=/, path);
  }
  const ld = await (await get("/vi/bang-gia", PRIMARY)).text();
  assert.match(ld, /"@type":"FAQPage"/);
});

// Trang /cs, /en, /de mà còn chữ tiếng Việt thì Google coi là bản sao của /vi (và người Séc không hiểu):
// H1 và H2 của mỗi ngôn ngữ phải khác bản tiếng Việt, và không chứa dấu chỉ có trong tiếng Việt.
const VI_ONLY = /[ăắằẳẵặđơớờởỡợưứừửữựạảấầẩẫậẹẻẽếềểễệỉịọỏốồổỗộụủỹỳỷỵ]/i;
const headings = (html) =>
  [...html.matchAll(/<h([12])[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => m[2].replace(/<[^>]+>/g, "").replace(/&[a-z#0-9]+;/g, " ").trim());
test("cs/en/de: tiêu đề H1/H2 đã dịch (không còn tiếng Việt)", async () => {
  for (const p of PATHS.filter((x) => !["/privacy", "/terms", "/cookies", "/dpa", "/website-terms"].includes(x))) {
    const vi = headings(await (await get(`/vi${p}`, PRIMARY)).text());
    for (const l of ["cs", "en", "de"]) {
      const hs = headings(await (await get(`/${l}${p}`, PRIMARY)).text());
      assert.notEqual(hs[0], vi[0], `/${l}${p}: H1 giống bản tiếng Việt`);
      const left = hs.filter((h) => VI_ONLY.test(h));
      assert.deepEqual(left, [], `/${l}${p}: còn tiêu đề tiếng Việt`);
    }
  }
});

test("llms.txt: có thông tin thực thể và link tới các trang chính", async () => {
  const res = await get("/llms.txt", PRIMARY);
  assert.equal(res.status, 200);
  const txt = await res.text();
  for (const s of ["# SalonGo", "30241464", "salongosupport@gmail.com", "EET 2.0", `${SITE}/cs`, `${SITE}/vi`, `${SITE}/sitemap.xml`]) {
    assert.ok(txt.includes(s), `llms.txt thiếu ${s}`);
  }
});
