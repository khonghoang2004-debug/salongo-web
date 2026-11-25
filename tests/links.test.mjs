// Hợp đồng link với app (src/lib/app-links.ts) và chọn bản cài desktop (src/lib/release-download.ts): `npm test`
import { test } from "node:test";
import assert from "node:assert/strict";
import { APP_LOCALES, LOGIN_URL, SIGNUP_URL, appLink, deskSignupLink, renewLink } from "../src/lib/app-links.ts";
import { fallbackDownloadUrl, installerFor, isReleaseDownloadUrl, pickLatestInstaller } from "../src/lib/release-download.ts";
import { jsonLdString } from "../src/lib/json-ld.ts";

test("link vào app: đúng hợp đồng /signup, /login, /renew, ?plan=DESK", () => {
  for (const l of ["vi", "en", "cs", "de"]) {
    assert.equal(appLink(SIGNUP_URL, l), `https://app.salongo.eu/signup?lang=${l}`);
    assert.equal(appLink(LOGIN_URL, l), `https://app.salongo.eu/login?lang=${l}`);
    assert.equal(renewLink(l), `https://app.salongo.eu/renew?lang=${l}`);
    assert.equal(deskSignupLink(l), `https://app.salongo.eu/signup?plan=DESK&lang=${l}`);
    for (const plan of ["BASIC", "PRO", "PREMIUM", "DESK"]) {
      for (const cycle of ["month", "year"]) {
        assert.equal(renewLink(l, plan, cycle), `https://app.salongo.eu/renew?lang=${l}&plan=${plan}&cycle=${cycle}`);
      }
      assert.equal(renewLink(l, plan), `https://app.salongo.eu/renew?lang=${l}&plan=${plan}`);
    }
  }
  assert.deepEqual([...APP_LOCALES], ["vi", "en", "cs", "de"]);
});

test("link vào app: giá trị ngoài danh sách không lọt vào URL", () => {
  assert.equal(appLink(SIGNUP_URL, "fr"), "https://app.salongo.eu/signup?lang=vi");
  assert.equal(appLink(SIGNUP_URL, "en&plan=PREMIUM"), "https://app.salongo.eu/signup?lang=vi");
  assert.equal(renewLink("de", "GOLD", "year"), "https://app.salongo.eu/renew?lang=de");
  assert.equal(renewLink("de", "basic", "month"), "https://app.salongo.eu/renew?lang=de");
  assert.equal(renewLink("cs", "PRO", "week"), "https://app.salongo.eu/renew?lang=cs&plan=PRO");
  assert.equal(renewLink("cs", undefined, "year"), "https://app.salongo.eu/renew?lang=cs");
  assert.equal(deskSignupLink("<x>"), "https://app.salongo.eu/signup?plan=DESK&lang=vi");
  assert.throws(() => appLink("https://evil.example/signup", "en"));
  assert.throws(() => appLink("https://app.salongo.eu.evil.example/signup", "en"));
});

test("routing và app-links dùng cùng 4 ngôn ngữ", async () => {
  const { routing } = await import("../src/i18n/routing.ts");
  assert.deepEqual([...routing.locales].sort(), [...APP_LOCALES].sort());
  assert.equal(routing.defaultLocale, APP_LOCALES[0]);
});

const REL = "https://github.com/khonghoang2004-debug/salongo-desktop-releases/releases/download";
const rel = (tag, extra = {}) => ({
  tag_name: tag,
  draft: false,
  assets: [
    { name: "SalonGo-Setup.exe", browser_download_url: `${REL}/${tag}/SalonGo-Setup.exe` },
    { name: "SalonGo-Setup.dmg", browser_download_url: `${REL}/${tag}/SalonGo-Setup.dmg` },
  ],
  ...extra,
});

test("tải bản cài: chỉ windows / mac; không nhận thuộc tính của Object.prototype", () => {
  assert.equal(installerFor("windows"), "SalonGo-Setup.exe");
  assert.equal(installerFor("mac"), "SalonGo-Setup.dmg");
  for (const os of ["linux", "toString", "constructor", "__proto__", "hasOwnProperty", ""]) assert.equal(installerFor(os), undefined, os);
});

test("tải bản cài: chọn x.y.z cao nhất, bỏ nháp / beta / dữ liệu sai", () => {
  const list = [rel("v1.2.3"), rel("v1.10.0"), rel("v2.0.0", { draft: true }), rel("v1.11.0-beta.1"), rel("1.9.9"), { tag_name: "v9.9.9" }, null, "x"];
  assert.equal(pickLatestInstaller(list, "SalonGo-Setup.exe"), `${REL}/v1.10.0/SalonGo-Setup.exe`);
  assert.equal(pickLatestInstaller(list, "SalonGo-Setup.dmg"), `${REL}/v1.10.0/SalonGo-Setup.dmg`);
  assert.equal(pickLatestInstaller({ message: "API rate limit exceeded" }, "SalonGo-Setup.exe"), null);
  assert.equal(pickLatestInstaller([], "SalonGo-Setup.exe"), null);
  assert.equal(fallbackDownloadUrl("SalonGo-Setup.exe"), "https://github.com/khonghoang2004-debug/salongo-desktop-releases/releases/latest/download/SalonGo-Setup.exe");
});

test("tải bản cài: URL lạ trong phản hồi API không thành open redirect", () => {
  const evil = [
    "https://evil.example/SalonGo-Setup.exe",
    "http://github.com/khonghoang2004-debug/salongo-desktop-releases/releases/download/v1/SalonGo-Setup.exe",
    "https://github.com/other/repo/releases/download/v1/SalonGo-Setup.exe",
    `${REL}/../../../../other/repo/releases/download/v1/SalonGo-Setup.exe`,
    `${REL}/v1/SalonGo-Setup.exe?x=https://evil.example`,
    `${REL}/v1/other.exe`,
    `https://github.com.evil.example/khonghoang2004-debug/salongo-desktop-releases/releases/download/v1/SalonGo-Setup.exe`,
    42,
  ];
  for (const u of evil) assert.equal(isReleaseDownloadUrl(u, "SalonGo-Setup.exe"), false, String(u));
  const list = [rel("v1.0.0"), { ...rel("v5.0.0"), assets: [{ name: "SalonGo-Setup.exe", browser_download_url: evil[0] }] }];
  assert.equal(pickLatestInstaller(list, "SalonGo-Setup.exe"), `${REL}/v1.0.0/SalonGo-Setup.exe`);
});

test("JSON-LD: không thể đóng thẻ <script>, JSON.parse cho lại đúng dữ liệu", () => {
  const data = { name: "</script><script>alert(1)</script>", text: "a <!-- b --> & \u2028\u2029 c" };
  const s = jsonLdString(data);
  assert.equal(/[<>]/.test(s), false);
  assert.equal(s.includes("\u2028"), false);
  assert.deepEqual(JSON.parse(s), data);
});

test("Kasa installers: own repo, stable names, only that repo's downloads accepted", async () => {
  const { KASA_INSTALLERS, KASA_RELEASE_REPO } = await import("../src/lib/release-download.ts");
  assert.equal(installerFor("mac-arm64", KASA_INSTALLERS), "SalonGo-Kasa-arm64.dmg");
  assert.equal(installerFor("windows", KASA_INSTALLERS), "SalonGo-Kasa-Setup.exe");
  assert.equal(installerFor("mac", KASA_INSTALLERS), undefined);
  const ok = `https://github.com/${KASA_RELEASE_REPO}/releases/download/v1.3.0/SalonGo-Kasa-arm64.dmg`;
  assert.ok(isReleaseDownloadUrl(ok, "SalonGo-Kasa-arm64.dmg", KASA_RELEASE_REPO));
  assert.ok(!isReleaseDownloadUrl(ok, "SalonGo-Kasa-arm64.dmg"), "SalonGo desktop repo must not accept Kasa assets");
  const rel = [
    { draft: false, tag_name: "v1.2.0", assets: [{ name: "SalonGo-Kasa-arm64.dmg", browser_download_url: ok.replace("v1.3.0", "v1.2.0") }] },
    { draft: false, tag_name: "v1.3.0", assets: [{ name: "SalonGo-Kasa-arm64.dmg", browser_download_url: ok }] },
  ];
  assert.equal(pickLatestInstaller(rel, "SalonGo-Kasa-arm64.dmg", KASA_RELEASE_REPO), ok);
});
