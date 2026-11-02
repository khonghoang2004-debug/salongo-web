// Chụp ảnh xem trước từ demo thật: node docs/website-templates/shoot-previews.mjs <baseUrl> <outDir>  (mọi mẫu × PC/điện thoại; nội dung demo là tiếng Séc; SLUGS=a,b để chụp vài mẫu)
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const [base, out] = process.argv.slice(2);
const slugs = (process.env.SLUGS ?? "ivelle-nail,verra-hair,saluna-spa,brass-barber,lumen-hair,velvet-lash,chroma-nails,aurel-beauty,tropicana-nails,cherry-hair,lilac-lash,matcha-spa,azure-barber,rose-bridal,saffron-color").split(",");
const tmp = path.join(os.tmpdir(), "salongo-previews/");
fs.mkdirSync(tmp, { recursive: true });
const browser = await chromium.launch();
for (const [kind, vp, dsf] of [["pc", { width: 1440, height: 900 }, 1], ["m", { width: 390, height: 760 }, 2]]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: dsf, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  for (const loc of ["cs"]) for (const slug of slugs) {
    await page.goto(`${base}/${loc}/website/mau/${slug}`, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "[data-demobar],nextjs-portal{display:none!important}" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(600);
    const png = `${tmp}${slug}-${kind}-${loc}.png`;
    await page.screenshot({ path: png });
    const w = kind === "pc" ? 1200 : 780;
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", png, "-vf", `scale=${w}:-1:flags=lanczos`, "-c:v", "libwebp", "-quality", "82", `${out}/${slug}-${kind}.webp`]);
    console.log(slug, kind, fs.statSync(`${out}/${slug}-${kind}.webp`).size);
  }
  await ctx.close();
}
await browser.close();
