import { NextResponse } from "next/server";

/**
 * /api/download/windows | /api/download/mac → 302 to the installer of the NEWEST published Salora Desktop version.
 *
 * GitHub's ".../releases/latest/download/…" only sees full releases, so builds published as pre-releases (unsigned
 * builds: download only, not pushed to the auto-update feed) were never offered. This picks the highest x.y.z among
 * all non-draft releases that carry the installer, full or pre-release; beta tags (x.y.z-beta.n) are skipped.
 * Cached for 5 minutes (GitHub API: 60 unauthenticated requests per hour per IP).
 */

const REPO = "khonghoang2004-debug/salongo-desktop-releases";
const ASSET = { windows: "SalonGo-Setup.exe", mac: "SalonGo-Setup.dmg" } as const;
const FALLBACK = (name: string) => `https://github.com/${REPO}/releases/latest/download/${name}`;

type Release = { tag_name: string; draft: boolean; assets: { name: string; browser_download_url: string }[] };

const parse = (tag: string) => {
  const m = /^v?(\d+)\.(\d+)\.(\d+)$/.exec(tag.trim());
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
};
const newer = (a: number[], b: number[]) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];

export async function GET(_req: Request, { params }: { params: Promise<{ os: string }> }) {
  const { os } = await params;
  const name = ASSET[os as keyof typeof ASSET];
  if (!name) return NextResponse.json({ error: "unknown os" }, { status: 404 });

  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=30`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const releases = (await res.json()) as Release[];
    let best: { v: number[]; url: string } | null = null;
    for (const r of releases) {
      const v = parse(r.tag_name);
      const asset = r.assets.find((a) => a.name === name);
      if (r.draft || !v || !asset) continue;
      if (!best || newer(v, best.v) > 0) best = { v, url: asset.browser_download_url };
    }
    return NextResponse.redirect(best?.url ?? FALLBACK(name), { status: 302, headers: { "Cache-Control": "public, max-age=300" } });
  } catch {
    return NextResponse.redirect(FALLBACK(name), 302);
  }
}
