"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Copy } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CONTACT_EMAIL } from "@/lib/contact";

const GROUPS: { titleKey: "group1Title" | "group2Title" | "group3Title" | "group4Title"; items: { qKey: string; aKey: string }[] }[] = [
  { titleKey: "group1Title", items: [{ qKey: "q1", aKey: "a1" }, { qKey: "q2", aKey: "a2" }, { qKey: "q3", aKey: "a3" }] },
  { titleKey: "group2Title", items: [{ qKey: "q4", aKey: "a4" }, { qKey: "q5", aKey: "a5" }] },
  { titleKey: "group3Title", items: [{ qKey: "q6", aKey: "a6" }, { qKey: "q7", aKey: "a7" }] },
  { titleKey: "group4Title", items: [{ qKey: "q8", aKey: "a8" }, { qKey: "q9", aKey: "a9" }] },
];

function useCopyTooltip() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {}
  }, []);
  return { copied, copy };
}

export function SectionFAQ() {
  const t = useTranslations("faq");
  const [openId, setOpenId] = useState<string | null>("q1");
  const { copied, copy } = useCopyTooltip();

  return (
    <section className="sg-section bg-white">
      <div className="mx-auto max-w-3xl">
        {/* Groups */}
        <div className="space-y-8">
          {GROUPS.map((group) => (
            <div key={group.titleKey}>
              <h2 className="mb-3 text-lg font-bold text-ink">
                {t(group.titleKey)}
              </h2>
              <div className="space-y-2.5">
                {group.items.map((item) => {
                  const isOpen = openId === item.qKey;
                  const answerText = t(item.aKey);

                  return (
                    <div
                      key={item.qKey}
                      className="overflow-hidden rounded-2xl border border-line bg-white shadow-sg-md transition-shadow hover:shadow-sg-md"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : item.qKey)}
                        className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold transition-colors ${
                          isOpen
                            ? "bg-brand-50/70 text-ink"
                            : "bg-white text-ink hover:bg-sand"
                        }`}
                      >
                        <span>{t(item.qKey)}</span>
                        <ChevronDown
                          className={`size-5 shrink-0 text-accent-strong transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="border-t-2 border-brand-100/60 bg-white px-5 pb-4 pt-3">
                          <div className="relative">
                            <p className="pr-10 text-ink/80 leading-relaxed" style={{ lineHeight: 1.7 }}>
                              {answerText}
                            </p>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                copy(answerText, `answer-${item.qKey}`);
                              }}
                              className="absolute top-0 right-0 flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-brand-50 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400/50"
                              aria-label={t("copyCopied")}
                              title={t("copyCopied")}
                            >
                              <Copy className="size-4" strokeWidth={2} />
                            </button>
                            {copied === `answer-${item.qKey}` && (
                              <span
                                className="absolute -bottom-1 right-0 rounded-lg bg-ink px-2.5 py-1 text-xs font-medium text-white shadow-sg-md"
                                role="status"
                              >
                                {t("copyCopied")}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-muted leading-relaxed">
          {t("closingParagraph")}
        </p>

        {/* Still not found + Email copy */}
        <div className="mt-10 rounded-2xl border border-line bg-sand p-6 shadow-sg-lg sm:p-8">
          <h3 className="text-lg font-bold text-ink">
            {t("stillNotFound")}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-muted">Email:</span>
            <div className="relative inline-flex items-center">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-accent-strong hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              <button
                type="button"
                onClick={() => copy(CONTACT_EMAIL, "email")}
                className="ml-2 flex size-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-brand-50 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400/50"
                aria-label={t("emailCopied")}
                title={t("copyCopied")}
              >
                <Copy className="size-4" strokeWidth={2} />
              </button>
              {copied === "email" && (
                <span
                  className="absolute -bottom-8 left-0 rounded-lg bg-ink px-3 py-1.5 text-xs font-medium text-white shadow-sg-md"
                  role="status"
                >
                  {t("emailCopied")}
                </span>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/lien-he"
              className="btn-primary px-6 py-3.5 text-base"
            >
              {t("contactSupportCta")}
            </Link>
            <a
              href="https://app.salongo.eu/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-6 py-3.5 text-base"
            >
              {t("tryFreeCta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
