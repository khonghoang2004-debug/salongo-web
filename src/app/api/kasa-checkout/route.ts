import Stripe from "stripe";
import { routing } from "@/i18n/routing";
import { isEmail, isValidIco, normalizeIco } from "@/lib/kasa";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST { ico, email, company?, locale } → { clientSecret } for Stripe Embedded Checkout of one SalonGo Kasa licence
 * (one-time payment, price = env STRIPE_KASA_PRICE_ID). metadata { product: "kasa", ico, email } on the session and
 * the PaymentIntent, so the licence tooling / webhook can issue the key. Without env → 503 not_configured and the
 * buy page shows "coming soon" (it already hides the card option then). No e-mails are sent from here.
 */
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  const price = process.env.STRIPE_KASA_PRICE_ID;
  if (!key || !price) return Response.json({ error: "not_configured" }, { status: 503 });

  const body = (await req.json().catch(() => ({}))) as { ico?: unknown; email?: unknown; company?: unknown; locale?: unknown };
  const ico = typeof body.ico === "string" && isValidIco(body.ico) ? normalizeIco(body.ico)! : null;
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!ico) return Response.json({ error: "bad_ico" }, { status: 400 });
  if (!isEmail(email)) return Response.json({ error: "bad_email" }, { status: 400 });
  const company = typeof body.company === "string" ? body.company.trim().slice(0, 200) : "";
  const locale = routing.locales.includes(body.locale as never) ? (body.locale as (typeof routing.locales)[number]) : routing.defaultLocale;

  const metadata = { product: "kasa", ico, email, ...(company ? { company } : {}), locale };
  const stripe = new Stripe(key);
  try {
    const origin = new URL(req.url).origin;
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: "payment",
      line_items: [{ price, quantity: 1 }],
      customer_email: email,
      return_url: `${origin}/${locale}/kasa/cam-on?session_id={CHECKOUT_SESSION_ID}`,
      locale,
      billing_address_collection: "required",
      adaptive_pricing: { enabled: false },
      metadata,
      payment_intent_data: { metadata },
    });
    return Response.json({ clientSecret: session.client_secret });
  } catch (e) {
    console.error("kasa-checkout", e instanceof Error ? e.message : e);
    return Response.json({ error: "stripe_error" }, { status: 502 });
  }
}
