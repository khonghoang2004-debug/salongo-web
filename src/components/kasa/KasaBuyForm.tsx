"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { CreditCard, Landmark, Loader2, Lock, Search } from "lucide-react";
import { isEmail, isValidIco, kasaTransferMessage, normalizeIco, type KasaCompany } from "@/lib/kasa";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) : null;

type Text = Record<
  | "ico" | "icoPlaceholder" | "lookup" | "looking" | "found" | "invalid" | "notFound" | "unavailable" | "company" | "address" | "email"
  | "pay" | "card" | "bank" | "next" | "fillFirst" | "soon" | "secure" | "edit" | "account" | "iban" | "amount" | "vs" | "message"
  | "bankNote" | "fallback",
  string
>;
type Method = "card" | "bank";
type Lookup = "idle" | "loading" | "found" | "invalid" | "notFound" | "unavailable";

const input =
  "block h-12 w-full rounded-xl border border-line bg-white px-3.5 text-[16px] text-ink placeholder:text-ink/35 focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/15";
const label = "block text-[14px] font-medium text-ink";

/**
 * Kasa buy form: IČO (ARES fills company + address), e-mail, consent; then card (Stripe Embedded Checkout) or bank
 * transfer (VS = IČO). Card / bank show a "coming soon" note while env / the account number are not set.
 */
export function KasaBuyForm({
  text,
  consent,
  locale,
  price,
  cardReady,
  bank,
}: {
  text: Text;
  consent: ReactNode;
  locale: string;
  price: string;
  cardReady: boolean;
  bank: { account: string; iban: string } | null;
}) {
  const [ico, setIco] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [method, setMethod] = useState<Method>("card");
  const [lookup, setLookup] = useState<Lookup>("idle");
  const [tried, setTried] = useState(false);
  const [step, setStep] = useState<"form" | "pay">("form");
  const [checkoutFailed, setCheckoutFailed] = useState(false);
  const lastLookup = useRef("");

  const runLookup = useCallback(async (raw: string) => {
    const n = normalizeIco(raw);
    if (!n || !isValidIco(n)) {
      setLookup("invalid");
      return;
    }
    if (lastLookup.current === n) return;
    lastLookup.current = n;
    setLookup("loading");
    try {
      const r = await fetch(`/api/ares/${n}`);
      const j = (await r.json().catch(() => ({}))) as { company?: KasaCompany; error?: string };
      if (r.ok && j.company) {
        setCompany(j.company.name);
        setAddress(j.company.address ?? "");
        setIco(j.company.ico);
        setLookup("found");
      } else {
        lastLookup.current = "";
        setLookup(r.status === 404 ? "notFound" : r.status === 400 ? "invalid" : "unavailable");
      }
    } catch {
      lastLookup.current = "";
      setLookup("unavailable");
    }
  }, []);

  const valid = isValidIco(ico) && isEmail(email.trim()) && agreed;
  const cleanIco = normalizeIco(ico) ?? ico;
  const cleanEmail = email.trim().toLowerCase();

  const fetchClientSecret = useCallback(async () => {
    const r = await fetch("/api/kasa-checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ico: cleanIco, email: cleanEmail, company, locale }),
    });
    const j = (await r.json().catch(() => ({}))) as { clientSecret?: string };
    if (!r.ok || !j.clientSecret) {
      setCheckoutFailed(true);
      throw new Error("checkout_unavailable");
    }
    return j.clientSecret;
  }, [cleanIco, cleanEmail, company, locale]);

  const status: Partial<Record<Lookup, { text: string; tone: string }>> = {
    found: { text: text.found, tone: "text-emerald-700" },
    invalid: { text: text.invalid, tone: "text-brand-700" },
    notFound: { text: text.notFound, tone: "text-brand-700" },
    unavailable: { text: text.unavailable, tone: "text-muted" },
  };

  if (step === "pay") {
    const ready = method === "card" ? cardReady && stripePromise && !checkoutFailed : Boolean(bank);
    return (
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-porcelain px-4 py-3 text-[14.5px] text-ink/80">
          <span className="min-w-0 truncate">
            {company || cleanIco} · {cleanEmail}
          </span>
          <button type="button" onClick={() => setStep("form")} className="x-link">
            {text.edit}
          </button>
        </div>
        {!ready ? (
          <p className="mt-6 rounded-2xl border border-line bg-white p-5 text-[15.5px] text-ink" role="status">
            {method === "card" && checkoutFailed ? text.fallback : text.soon}
          </p>
        ) : method === "card" ? (
          <>
            <p className="mt-4 flex items-center gap-1.5 text-[13.5px] text-muted">
              <Lock className="size-3.5" aria-hidden />
              {text.secure}
            </p>
            <div id="checkout" className="mt-3 min-h-[520px] rounded-[22px] bg-white py-2 ring-1 ring-line">
              <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          </>
        ) : (
          <>
            <dl className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white">
              {(
                [
                  [text.account, bank!.account],
                  ...(bank!.iban ? [[text.iban, bank!.iban]] : []),
                  [text.amount, price],
                  [text.vs, cleanIco],
                  [text.message, kasaTransferMessage(cleanEmail)],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 px-4 py-3.5">
                  <dt className="text-[14px] text-muted">{k}</dt>
                  <dd className="break-all font-mono text-[15.5px] font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[14px] text-muted">{text.bankNote}</p>
          </>
        )}
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setTried(true);
        if (valid) {
          setCheckoutFailed(false);
          setStep("pay");
        }
      }}
      className="space-y-5"
    >
      <div>
        <label htmlFor="kasa-ico" className={label}>
          {text.ico}
        </label>
        <div className="mt-1.5 flex gap-2">
          <input
            id="kasa-ico"
            inputMode="numeric"
            autoComplete="off"
            maxLength={10}
            placeholder={text.icoPlaceholder}
            value={ico}
            onChange={(e) => {
              const v = e.target.value.replace(/[^\d\s]/g, "");
              setIco(v);
              if (lookup !== "loading") setLookup("idle");
              const n = v.replace(/\s/g, "");
              if (n.length === 8 && isValidIco(n)) void runLookup(n);
            }}
            onBlur={() => ico && void runLookup(ico)}
            aria-invalid={tried && !isValidIco(ico) ? true : undefined}
            aria-describedby="kasa-ico-status"
            className={`${input} tabular-nums`}
          />
          <button type="button" onClick={() => void runLookup(ico)} className="x-btn-light !min-h-12 shrink-0 !px-4" disabled={lookup === "loading"}>
            {lookup === "loading" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Search className="size-4" aria-hidden />}
            {lookup === "loading" ? text.looking : text.lookup}
          </button>
        </div>
        <p id="kasa-ico-status" className={`mt-1.5 min-h-5 text-[13.5px] ${status[lookup]?.tone ?? ""}`} aria-live="polite">
          {status[lookup]?.text ?? ""}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="kasa-company" className={label}>
            {text.company}
          </label>
          <input id="kasa-company" autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} className={`${input} mt-1.5`} />
        </div>
        <div>
          <label htmlFor="kasa-address" className={label}>
            {text.address}
          </label>
          <input id="kasa-address" autoComplete="street-address" value={address} onChange={(e) => setAddress(e.target.value)} className={`${input} mt-1.5`} />
        </div>
      </div>

      <div>
        <label htmlFor="kasa-email" className={label}>
          {text.email}
        </label>
        <input
          id="kasa-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={tried && !isEmail(email.trim()) ? true : undefined}
          className={`${input} mt-1.5`}
        />
      </div>

      <fieldset>
        <legend className={label}>{text.pay}</legend>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          {(
            [
              ["card", CreditCard, text.card],
              ["bank", Landmark, text.bank],
            ] as const
          ).map(([m, Icon, l]) => (
            <label
              key={m}
              className={`flex min-h-12 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border px-2 text-[15px] font-medium transition-colors ${
                method === m ? "border-brand-700 bg-brand-50 text-brand-800" : "border-line bg-white text-ink hover:border-ink/30"
              } has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-700/30`}
            >
              <input type="radio" name="kasa-method" value={m} checked={method === m} onChange={() => setMethod(m)} className="sr-only" />
              <Icon className="size-4" aria-hidden />
              {l}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-start gap-3 text-[14.5px] leading-snug text-ink/85">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded border-line accent-brand-700"
        />
        <span>{consent}</span>
      </label>

      <div>
        <button type="submit" className="x-btn-primary !min-h-[52px] w-full text-base sm:w-auto sm:!px-10">
          {text.next}
        </button>
        {tried && !valid && (
          <p className="mt-2 text-[13.5px] text-brand-700" role="alert">
            {text.fillFirst}
          </p>
        )}
      </div>
    </form>
  );
}
