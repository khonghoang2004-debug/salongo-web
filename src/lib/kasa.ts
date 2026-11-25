/**
 * SalonGo Kasa: one-time-purchase desktop POS (Windows + macOS) for Czech salons.
 * Checkout / receipts, EET 2.0, Thu & Chi, services, staff revenue, lite customers; data stays on the salon's computer.
 * No appointments / online booking / phones: that is SalonGo (cloud subscription).
 *
 * Price: SalonGo (the seller) is not a VAT payer, and the site shows every price without a VAT caption
 * (see src/lib/website-offer.ts), so Kasa does the same: "5 999 Kč" is the final price.
 */
export const KASA_PRICE_CZK = 5999;

/** "5 999 Kč" (vi / cs) or "5 999 CZK" (en / de), as /website/thanh-toan formats prices. Non-breaking space. */
export function kasaPrice(locale: string, n = KASA_PRICE_CZK): string {
  const num = n.toLocaleString("cs-CZ").replace(/\s/g, " ");
  return locale === "en" || locale === "de" ? `${num} CZK` : `${num} Kč`;
}

/**
 * Installer links (stable short URLs). next.config.mjs redirects them (302) to /api/download/kasa/<os>, which sends
 * the newest installer from the public GitHub release repository (src/lib/release-download.ts, KASA_RELEASE_REPO).
 * Relative, so the buttons stay on the host serving the page.
 */
export const KASA_DOWNLOAD = {
  mac: "/kasa/download/mac",
  macIntel: "/kasa/download/mac-intel",
  win: "/kasa/download/win",
} as const;

/**
 * Bank transfer for a Kasa licence: variable symbol = the buyer's IČO, message = "KASA <e-mail>" so the owner can
 * match the payment and send the licence key.
 * TODO(owner): fill in SalonGo's receiving account. While `account` is empty the buy page shows the bank option as
 * "coming soon" instead of payment details (never show a made-up account number).
 */
export const KASA_BANK = {
  /** Czech format, e.g. "123456789/0800". TODO: set before launch. */
  account: "",
  /** e.g. "CZ65 0800 0000 1920 0014 5399". TODO: set before launch. */
  iban: "",
} as const;
export const kasaBankReady = () => Boolean(KASA_BANK.account);

/** Message for the payee on the transfer (Czech banks: up to 140 characters). */
export const kasaTransferMessage = (email: string) => `KASA ${email}`.slice(0, 140);

/** Card payment needs the Stripe secret + publishable key and the Kasa price id (env, set on Vercel). */
export const kasaCardReady = () =>
  Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_KASA_PRICE_ID && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

/* ---------- IČO (Czech company id) + ARES, same rules as the app (salon-go src/lib/company-lookup/ares.ts) ---------- */

export type KasaCompany = { ico: string; name: string; dic: string | null; address: string | null };

/** 8 digits (shorter numbers are left-padded), or null. */
export function normalizeIco(raw: string): string | null {
  const digits = (raw ?? "").replace(/\s+/g, "");
  if (!/^\d{1,8}$/.test(digits)) return null;
  return digits.padStart(8, "0");
}

/** Weights 8..2, check digit = (11 - sum % 11) % 10. */
export function isValidIco(raw: string): boolean {
  const ico = normalizeIco(raw);
  if (!ico || ico === "00000000") return false;
  let sum = 0;
  for (let i = 0; i < 7; i++) sum += Number(ico[i]) * (8 - i);
  return (11 - (sum % 11)) % 10 === Number(ico[7]);
}

export const isEmail = (s: string) => /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/.test(s) && s.length <= 254;

type AresAddress = {
  textovaAdresa?: string;
  nazevObce?: string;
  nazevCastiObce?: string;
  nazevUlice?: string;
  cisloDomovni?: number;
  cisloOrientacni?: number;
  cisloOrientacniPismeno?: string;
  psc?: number | string;
};
type AresSubject = { ico?: string; obchodniJmeno?: string; dic?: string; sidlo?: AresAddress };

/** "Jankovcova 1522/53, 170 00 Praha" (ARES's own one-line address when present). */
function formatAddress(a: AresAddress): string | null {
  if (a.textovaAdresa?.trim()) return a.textovaAdresa.trim();
  const orient = a.cisloOrientacni ? `${a.cisloOrientacni}${a.cisloOrientacniPismeno ?? ""}` : "";
  const no = a.cisloDomovni ? (orient ? `${a.cisloDomovni}/${orient}` : String(a.cisloDomovni)) : orient;
  const base = a.nazevUlice ?? (a.nazevCastiObce && a.nazevCastiObce !== a.nazevObce ? a.nazevCastiObce : a.nazevObce);
  const street = base ? (no ? `${base} ${no}` : base) : null;
  const psc = a.psc ? String(a.psc).replace(/\s+/g, "").padStart(5, "0") : "";
  const city = [psc ? `${psc.slice(0, 3)} ${psc.slice(3)}` : "", a.nazevObce ?? ""].filter(Boolean).join(" ");
  return [street, city].filter(Boolean).join(", ") || null;
}

export function mapAres(json: unknown): KasaCompany | null {
  const s = (json ?? {}) as AresSubject;
  const ico = normalizeIco(s.ico ?? "");
  const name = s.obchodniJmeno?.trim();
  if (!ico || !name) return null;
  return { ico, name, dic: s.dic?.trim() || null, address: formatAddress(s.sidlo ?? {}) };
}
