import { isValidIco, mapAres, normalizeIco } from "@/lib/kasa";

export const runtime = "nodejs";

const ARES_URL = "https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/";

/**
 * GET /api/ares/{ico} → { company: { ico, name, dic, address } } from the Czech business register (public, no key).
 * Used by the Kasa buy form to fill in company name + address. 4 s timeout so a slow ARES never blocks the form
 * (the buyer can still type the details). Errors: 400 invalid_ico, 404 not_found, 503 unavailable.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ ico: string }> }) {
  const { ico: raw } = await params;
  if (!isValidIco(raw)) return Response.json({ error: "invalid_ico" }, { status: 400 });
  const ico = normalizeIco(raw)!;
  try {
    const res = await fetch(ARES_URL + ico, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 86400 },
    });
    if (res.status === 404 || res.status === 400) return Response.json({ error: "not_found" }, { status: 404 });
    if (!res.ok) return Response.json({ error: "unavailable" }, { status: 503 });
    const company = mapAres(await res.json());
    if (!company) return Response.json({ error: "not_found" }, { status: 404 });
    return Response.json({ company }, { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
  } catch {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}
