import { NextResponse } from "next/server";
import { RELEASE_REPO, fallbackDownloadUrl, installerFor, pickLatestInstaller } from "@/lib/release-download";

/**
 * /api/download/windows | /api/download/mac → 302 to the installer of the NEWEST published SalonGo Desktop version.
 *
 * GitHub's ".../releases/latest/download/…" only sees full releases, so builds published as pre-releases (unsigned
 * builds: download only, not pushed to the auto-update feed) were never offered. This picks the highest x.y.z among
 * all non-draft releases that carry the installer, full or pre-release; beta tags (x.y.z-beta.n) are skipped.
 * Cached for 5 minutes (GitHub API: 60 unauthenticated requests per hour per IP).
 * The redirect target is always a github.com download of this repository (see src/lib/release-download.ts).
 */

const CACHE = { "Cache-Control": "public, max-age=300, s-maxage=300" };

export async function GET(_req: Request, { params }: { params: Promise<{ os: string }> }) {
  const { os } = await params;
  const name = installerFor(os);
  if (!name) return NextResponse.json({ error: "unknown os" }, { status: 404, headers: CACHE });

  try {
    const res = await fetch(`https://api.github.com/repos/${RELEASE_REPO}/releases?per_page=30`, {
      // GITHUB_TOKEN (tuỳ chọn, biến môi trường trên Vercel): nâng giới hạn từ 60 lên 5000 lượt/giờ
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: 300 },
      // GitHub treo không được giữ người bấm "Tải về" mãi: hết 5 s thì dùng link bản chính thức mới nhất
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const url = pickLatestInstaller(await res.json(), name);
    return NextResponse.redirect(url ?? fallbackDownloadUrl(name), { status: 302, headers: CACHE });
  } catch {
    // GitHub down / rate-limited: the "latest full release" link still works; cache briefly so it is retried soon
    return NextResponse.redirect(fallbackDownloadUrl(name), { status: 302, headers: { "Cache-Control": "public, max-age=60, s-maxage=60" } });
  }
}
