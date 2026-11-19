// Gộp văn bản của bản thiết kế mới: messages/parts/<nhóm>/<ngôn ngữ>.json → messages/<ngôn ngữ>.json (khoá <nhóm>).
// Mỗi trang/nhóm một thư mục riêng để nhiều người sửa song song không đụng nhau. Chạy: npm run messages
// Kiểm tra: mọi nhóm phải có đủ 4 ngôn ngữ và cùng bộ khoá.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const LOCALES = ["vi", "en", "cs", "de"];
const root = new URL("..", import.meta.url).pathname;
const partsDir = join(root, "messages", "parts");
const check = process.argv.includes("--check");

const keys = (o, p = "") =>
  Object.entries(o).flatMap(([k, v]) => (v && typeof v === "object" && !Array.isArray(v) ? keys(v, `${p}${k}.`) : [`${p}${k}`]));

let problems = 0;
const groups = existsSync(partsDir) ? readdirSync(partsDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort() : [];
const parts = {};
for (const g of groups) {
  parts[g] = {};
  for (const l of LOCALES) {
    const f = join(partsDir, g, `${l}.json`);
    if (!existsSync(f)) { console.error(`missing ${g}/${l}.json`); problems++; continue; }
    parts[g][l] = JSON.parse(readFileSync(f, "utf8"));
  }
  const ref = new Set(keys(parts[g].vi ?? {}));
  for (const l of LOCALES) {
    if (!parts[g][l]) continue;
    const ks = new Set(keys(parts[g][l]));
    for (const k of ref) if (!ks.has(k)) { console.error(`${g}/${l}: missing ${k}`); problems++; }
    for (const k of ks) if (!ref.has(k)) { console.error(`${g}/${l}: extra ${k}`); problems++; }
  }
}

for (const l of LOCALES) {
  const f = join(root, "messages", `${l}.json`);
  const base = JSON.parse(readFileSync(f, "utf8"));
  for (const g of groups) if (parts[g][l]) base[g] = parts[g][l];
  const out = JSON.stringify(base, null, 2) + "\n";
  if (check) {
    if (readFileSync(f, "utf8") !== out) { console.error(`messages/${l}.json is out of date: run npm run messages`); problems++; }
  } else writeFileSync(f, out);
}
if (problems) { console.error(`${problems} problem(s)`); process.exit(1); }
console.log(`ok: ${groups.length} group(s) × ${LOCALES.length} locales${check ? " (check)" : ""}`);
