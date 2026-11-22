import Stripe from "stripe";
import { HOSTING_LINKS, isHostingCycle, isHostingPlan } from "@/lib/hosting-plans";
import { routing } from "@/i18n/routing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Payment Link URL → its recurring price id (looked up once per server instance). */
const priceByUrl = new Map<string, string>();

async function priceForLink(stripe: Stripe, url: string): Promise<string | null> {
  const hit = priceByUrl.get(url);
  if (hit) return hit;
  for await (const link of stripe.paymentLinks.list({ active: true, limit: 100 })) {
    if (link.url !== url) continue;
    const items = await stripe.paymentLinks.listLineItems(link.id, { limit: 1 });
    const price = items.data[0]?.price?.id;
    if (price) priceByUrl.set(url, price);
    return price ?? null;
  }
  return null;
}

/**
 * POST { plan: "basic"|"pro", cycle: "m"|"y", locale } → { clientSecret } for Stripe Embedded Checkout, so the customer
 * pays inside salongo.eu. Same price, card-only CZK (no currency switcher), name + billing address + optional tax id.
 */
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return Response.json({ error: "not_configured" }, { status: 503 });

  const body = (await req.json().catch(() => ({}))) as { plan?: unknown; cycle?: unknown; locale?: unknown };
  if (!isHostingPlan(body.plan) || !isHostingCycle(body.cycle)) return Response.json({ error: "bad_plan" }, { status: 400 });
  const locale = routing.locales.includes(body.locale as never) ? (body.locale as (typeof routing.locales)[number]) : routing.defaultLocale;

  const stripe = new Stripe(key);
  try {
    const price = await priceForLink(stripe, HOSTING_LINKS[body.plan][body.cycle]);
    if (!price) return Response.json({ error: "price_not_found" }, { status: 500 });
    const origin = new URL(req.url).origin;
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      return_url: `${origin}/${locale}/website/cam-on?session_id={CHECKOUT_SESSION_ID}`,
      locale,
      billing_address_collection: "required",
      name_collection: { individual: { enabled: true }, business: { enabled: true, optional: true } },
      tax_id_collection: { enabled: true },
      adaptive_pricing: { enabled: false },
      metadata: { source: "salongo.eu/website", plan: body.plan, cycle: body.cycle },
    });
    return Response.json({ clientSecret: session.client_secret });
  } catch (e) {
    console.error("hosting-checkout", e instanceof Error ? e.message : e);
    return Response.json({ error: "stripe_error" }, { status: 502 });
  }
}
