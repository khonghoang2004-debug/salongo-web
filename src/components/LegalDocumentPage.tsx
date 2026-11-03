import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/PageShell";
import { getLegalPack } from "@/content/legal";
import { LEGAL_DOCS, LEGAL_EFFECTIVE, OPERATOR, type LegalDocKey } from "@/lib/legal";
import { APP_URL } from "@/lib/app-links";
import { siteConfig } from "@/lib/metadata";
import { WEBSITE_MAX_PAGES, WEBSITE_PRICE_KC, formatKc } from "@/lib/website-offer";

/** Thay {email}, {phone}, {operator}, {app}, {site}, {price}, {pages} trong văn bản. */
export function fillLegal(text: string): string {
  const vars: Record<string, string> = {
    email: OPERATOR.email,
    phone: OPERATOR.phone,
    operator: OPERATOR.name,
    app: APP_URL.replace(/^https:\/\//, ""),
    site: siteConfig.url.replace(/^https:\/\//, ""),
    price: formatKc(WEBSITE_PRICE_KC),
    pages: String(WEBSITE_MAX_PAGES),
  };
  return text.replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);
}

function formatDate(iso: string, locale: string) {
  const tag = { vi: "vi-VN", cs: "cs-CZ", en: "en-GB", de: "de-DE" }[locale] ?? "cs-CZ";
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(tag, { day: "numeric", month: "long", year: "numeric" });
}

/** Đoạn văn: dòng "- " gộp thành danh sách. */
function Body({ lines }: { lines: string[] }) {
  const blocks: (string | string[])[] = [];
  for (const raw of lines) {
    const line = fillLegal(raw);
    if (line.startsWith("- ")) {
      const last = blocks[blocks.length - 1];
      if (Array.isArray(last)) last.push(line.slice(2));
      else blocks.push([line.slice(2)]);
    } else blocks.push(line);
  }
  return (
    <>
      {blocks.map((b, i) =>
        Array.isArray(b) ? (
          <ul key={i} className="mt-2 list-disc space-y-1.5 pl-5 text-ink/80 leading-relaxed">
            {b.map((li, j) => (
              <li key={j}>{li}</li>
            ))}
          </ul>
        ) : (
          <p key={i} className="mt-2 text-ink/80 leading-relaxed">
            {b}
          </p>
        )
      )}
    </>
  );
}

export function OperatorBox({ locale }: { locale: string }) {
  const { ui } = getLegalPack(locale);
  const rows: [string, React.ReactNode][] = [[ui.operatorName, `${OPERATOR.name} (${OPERATOR.brand})`]];
  if (OPERATOR.ico) rows.push([ui.ico, OPERATOR.ico]);
  if (OPERATOR.address) rows.push([ui.address, OPERATOR.address]);
  if (OPERATOR.vatId) rows.push([ui.vatId, OPERATOR.vatId]);
  else if (OPERATOR.vatPayer === false) rows.push([ui.vatId, ui.notVatPayer]);
  rows.push([ui.email, <a key="e" href={`mailto:${OPERATOR.email}`} className="font-medium text-brand-700 hover:underline [overflow-wrap:anywhere]">{OPERATOR.email}</a>]);
  rows.push([ui.phone, <a key="p" href={`tel:${OPERATOR.phone.replace(/\s/g, "")}`} className="font-medium text-brand-700 hover:underline">{OPERATOR.phone}</a>]);
  return (
    <div className="rounded-xl border border-line bg-sand p-4 text-sm sm:p-5">
      <p className="font-semibold text-ink">{ui.operator}</p>
      <dl className="mt-2 grid gap-x-4 gap-y-1 sm:grid-cols-[auto,1fr]">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-muted">{k}</dt>
            <dd className="text-ink/90">{v}</dd>
          </div>
        ))}
      </dl>
      {OPERATOR.legalForm ? <p className="mt-2 text-muted">{ui.legalForm}</p> : null}
    </div>
  );
}

export async function LegalDocumentPage({ locale, docKey }: { locale: string; docKey: LegalDocKey }) {
  const { ui, docs } = getLegalPack(locale);
  const doc = docs[docKey];
  const tNav = await getTranslations("nav");
  const others = LEGAL_DOCS.filter((d) => d.key !== docKey);

  return (
    <PageShell>
      <header className="border-b border-line bg-white px-4 pt-8 pb-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-brand-300 hover:text-brand-700"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {tNav("backHome")}
          </Link>
          <h1 className="sg-h1">{doc.title}</h1>
          <p className="mt-3 text-sm text-muted">
            {ui.effective}: {formatDate(LEGAL_EFFECTIVE, locale)}
          </p>
          {locale !== "cs" ? (
            <p className="mt-2 text-sm text-muted">
              {ui.prevailing}{" "}
              <Link href={LEGAL_DOCS.find((d) => d.key === docKey)!.path} locale="cs" className="font-medium text-brand-700 hover:underline">
                {ui.readCzech}
              </Link>
            </p>
          ) : null}
        </div>
      </header>

      <section className="bg-white px-4 pt-8 pb-12 sm:px-6 sm:pt-10 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <OperatorBox locale={locale} />
          {doc.sections.map((s) => (
            <div key={s.heading} className="mt-8">
              <h2 className="text-lg font-semibold text-ink sm:text-xl">{fillLegal(s.heading)}</h2>
              <Body lines={s.body} />
            </div>
          ))}

          <nav aria-label={ui.otherDocs} className="mt-12 border-t border-line pt-6">
            <p className="text-sm font-semibold text-ink">{ui.otherDocs}</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {others.map((d) => (
                <li key={d.key}>
                  <Link href={d.path} className="font-medium text-brand-700 hover:underline">
                    {docs[d.key].title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </PageShell>
  );
}
