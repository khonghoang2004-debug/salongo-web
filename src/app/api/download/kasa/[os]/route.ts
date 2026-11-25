import { NextResponse } from "next/server";
import { KASA_INSTALLERS, KASA_RELEASE_REPO, installerFor, pickLatestInstaller } from "@/lib/release-download";

/**
 * /api/download/kasa/mac-arm64 | mac-x64 | windows → 302 to the NEWEST SalonGo Kasa installer on the public release
 * repository (highest x.y.z, full or pre-release; drafts and beta tags skipped). The target is always a github.com
 * download of that repository (no open redirect). No release yet / GitHub unavailable → back to the Kasa download
 * page with ?soon=1 (never a GitHub 404 page). Cached 5 minutes.
 */
const CACHE = { "Cache-Control": "public, max-age=300, s-maxage=300" };

export async function GET(req: Request, { params }: { params: Promise<{ os: string }> }) {
  const { os } = await params;
  const name = installerFor(os, KASA_INSTALLERS);
  if (!name) return NextResponse.json({ error: "unknown os" }, { status: 404, headers: CACHE });
  const soon = new URL("/kasa/download?soon=1", req.url);
  try {
    const res = await fetch(`https://api.github.com/repos/${KASA_RELEASE_REPO}/releases?per_page=30`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const url = pickLatestInstaller(await res.json(), name, KASA_RELEASE_REPO);
    return NextResponse.redirect(url ?? soon, { status: 302, headers: url ? CACHE : { "Cache-Control": "public, max-age=60, s-maxage=60" } });
  } catch {
    return NextResponse.redirect(soon, { status: 302, headers: { "Cache-Control": "public, max-age=60, s-maxage=60" } });
  }
}
