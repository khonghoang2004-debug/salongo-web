"use client";

import { useCallback, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) : null;

/** Stripe Embedded Checkout inside salongo.eu; if the session cannot be created, falls back to the Payment Link. */
export function HostingCheckout({ plan, cycle, locale, fallbackUrl, errorText }: { plan: string; cycle: string; locale: string; fallbackUrl: string; errorText: string }) {
  const [failed, setFailed] = useState(false);
  const fetchClientSecret = useCallback(async () => {
    const r = await fetch("/api/hosting-checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ plan, cycle, locale }) });
    const j = (await r.json().catch(() => ({}))) as { clientSecret?: string };
    if (!r.ok || !j.clientSecret) {
      setFailed(true);
      window.location.assign(fallbackUrl);
      throw new Error("checkout_unavailable");
    }
    return j.clientSecret;
  }, [plan, cycle, locale, fallbackUrl]);

  if (!stripePromise || failed) {
    return (
      <p className="text-center text-[15px] text-muted">
        <a href={fallbackUrl} className="font-semibold text-brand-700 underline underline-offset-4">{errorText}</a>
      </p>
    );
  }
  return (
    <div id="checkout" className="min-h-[520px]">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
