/**
 * Chọn bản cài SalonGo Desktop mới nhất từ danh sách release của GitHub (logic thuần, test bằng `node --test`).
 * Dùng bởi src/app/api/download/[os]/route.ts.
 */

export const RELEASE_REPO = "khonghoang2004-debug/salongo-desktop-releases";
export const INSTALLERS: Record<string, string> = { windows: "SalonGo-Setup.exe", mac: "SalonGo-Setup.dmg" };
const DOWNLOAD_PREFIX = `https://github.com/${RELEASE_REPO}/releases/download/`;
const DOWNLOAD_PATH = `/${RELEASE_REPO}/releases/download/`;

/** "Latest full release" link: always valid, used when the API is unavailable. */
export const fallbackDownloadUrl = (name: string) => `https://github.com/${RELEASE_REPO}/releases/latest/download/${name}`;

/** Tên file cài cho một hệ điều hành; undefined nếu lạ (kể cả "toString", "constructor"… của Object.prototype). */
export const installerFor = (os: string): string | undefined => (Object.hasOwn(INSTALLERS, os) ? INSTALLERS[os] : undefined);

const parse = (tag: unknown) => {
  const m = typeof tag === "string" ? /^v?(\d+)\.(\d+)\.(\d+)$/.exec(tag.trim()) : null;
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
};
const newer = (a: number[], b: number[]) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];

/**
 * Chỉ nhận https://github.com/<repo>/releases/download/<tag>/<name>: route chuyển hướng tới URL này,
 * nên URL lạ trong phản hồi API (domain khác, "..", query) không bao giờ thành open redirect.
 */
export function isReleaseDownloadUrl(url: unknown, name: string): url is string {
  if (typeof url !== "string" || !url.startsWith(DOWNLOAD_PREFIX)) return false;
  try {
    const u = new URL(url);
    return u.origin === "https://github.com" && u.pathname.startsWith(DOWNLOAD_PATH) && u.pathname.endsWith(`/${name}`) && !u.search && !u.hash;
  } catch {
    return false;
  }
}

/**
 * Bản x.y.z cao nhất trong các release không phải nháp (bản chính thức hoặc pre-release) có file `name`;
 * bỏ qua tag beta (x.y.z-beta.n) và dữ liệu sai dạng. null = không có bản nào phù hợp.
 */
export function pickLatestInstaller(releases: unknown, name: string): string | null {
  if (!Array.isArray(releases)) return null;
  let best: { v: number[]; url: string } | null = null;
  for (const r of releases) {
    if (typeof r !== "object" || r === null || r.draft !== false || !Array.isArray(r.assets)) continue;
    const v = parse(r.tag_name);
    const asset = r.assets.find((a: unknown) => typeof a === "object" && a !== null && (a as { name?: unknown }).name === name);
    const url = (asset as { browser_download_url?: unknown } | undefined)?.browser_download_url;
    if (!v || !isReleaseDownloadUrl(url, name)) continue;
    if (!best || newer(v, best.v) > 0) best = { v, url };
  }
  return best?.url ?? null;
}
