/**
 * Web Studio hosting plans (owner prices 2026-11-22). Each plan × cycle has a Stripe Payment Link; the price behind
 * the link is also what the in-page (embedded) checkout charges, so Stripe stays the single source of the amount.
 */
export type HostingPlanKey = "basic" | "pro";
export type HostingCycle = "m" | "y";

export const HOSTING_PRICES: Record<HostingPlanKey, Record<HostingCycle, number>> = {
  basic: { m: 299, y: 2999 },
  pro: { m: 999, y: 9999 },
};

export const HOSTING_LINKS: Record<HostingPlanKey, Record<HostingCycle, string>> = {
  basic: { m: "https://buy.stripe.com/5kQ28j23m6594qKbRw8k803", y: "https://buy.stripe.com/00wcMX4bu8dh1eyg7M8k805" },
  pro: { m: "https://buy.stripe.com/bJefZ9eQ8eBFf5oaNs8k801", y: "https://buy.stripe.com/3cIdR123mdxB4qKg7M8k802" },
};

export const isHostingPlan = (v: unknown): v is HostingPlanKey => v === "basic" || v === "pro";
export const isHostingCycle = (v: unknown): v is HostingCycle => v === "m" || v === "y";

/** In-page checkout needs both keys on Vercel; without them the buttons keep opening the Payment Links. */
export const embeddedCheckoutReady = () => Boolean(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
