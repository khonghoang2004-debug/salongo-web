"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Minus, Plus } from "lucide-react";
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
    <section className="sg-section">
      <div className="sg-container">
        <div className="space-y-14 lg:space-y-16">
          {GROUPS.map((group, gi) => (
            <div key={group.titleKey} className="grid gap-6 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <span className="font-display text-sm font-semibold text-brand-700">0{gi + 1}</span>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-ink">{t(group.titleKey)}</h2>
              </div>
              <div className="border-t border-line lg:col-span-8">
                {group.items.map((item) => {
                  const isOpen = openId === item.qKey;
                  const answerText = t(item.aKey);

                  return (
                    <div key={item.qKey} className="border-b border-line">
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : item.qKey)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold text-ink transition-colors hover:text-brand-700 sm:py-6 sm:text-lg"
                      >
                        <span>{t(item.qKey)}</span>
                        <span
                          className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            isOpen ? "border-brand-700 bg-brand-700 text-white" : "border-line text-ink"
                          }`}
                          aria-hidden
                        >
                          {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="relative pb-6 pr-12">
                          <p className="max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">{answerText}</p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              copy(answerText, `answer-${item.qKey}`);
                            }}
                            className="absolute right-0 top-0 flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-brand-50 hover:text-brand-700"
                            aria-label={t("copyCopied")}
                            title={t("copyCopied")}
                          >
                            <Copy className="size-4" strokeWidth={2} />
                          </button>
                          {copied === `answer-${item.qKey}` && (
                            <span className="absolute -bottom-1 right-0 rounded-lg bg-ink px-2.5 py-1 text-xs font-medium text-white" role="status">
                              {t("copyCopied")}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Chưa tìm thấy câu trả lời */}
        <div className="mt-16 grid gap-8 rounded-[28px] bg-brand-50 p-7 sm:p-10 lg:mt-20 lg:grid-cols-12 lg:items-center lg:p-12">
          <div className="lg:col-span-7">
            <h3 className="sg-h2-sm">{t("stillNotFound")}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{t("closingParagraph")}</p>
            <div className="relative mt-5 inline-flex items-center gap-2">
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand-700 hover:underline">
                {CONTACT_EMAIL}
              </a>
              <button
                type="button"
                onClick={() => copy(CONTACT_EMAIL, "email")}
                className="flex size-10 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-white hover:text-brand-700"
                aria-label={t("emailCopied")}
                title={t("copyCopied")}
              >
                <Copy className="size-4" strokeWidth={2} />
              </button>
              {copied === "email" && (
                <span className="absolute -bottom-8 left-0 rounded-lg bg-ink px-3 py-1.5 text-xs font-medium text-white" role="status">
                  {t("emailCopied")}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:flex-col">
            <Link href="/lien-he" className="btn-primary px-7 py-4 text-base">
              {t("contactSupportCta")}
            </Link>
            <a
              href="https://app.salongo.eu/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-7 py-4 text-base"
            >
              {t("tryFreeCta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
