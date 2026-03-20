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
    <section className="border-t border-neutral-100 bg-white px-4 pt-6 pb-8 sm:px-6 sm:pt-8 sm:pb-10 lg:px-8 lg:pt-10 lg:pb-12">
      <div className="mx-auto max-w-3xl">
        {/* Groups */}
        <div className="space-y-8">
          {GROUPS.map((group) => (
            <div key={group.titleKey}>
              <h2 className="mb-3 text-lg font-bold text-[#1F2937]">
                {t(group.titleKey)}
              </h2>
              <div className="space-y-2.5">
                {group.items.map((item) => {
                  const isOpen = openId === item.qKey;
                  const answerText = t(item.aKey);

                  return (
                    <div
                      key={item.qKey}
                      className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : item.qKey)}
                        className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold transition-colors ${
                          isOpen
                            ? "bg-gradient-to-r from-pink-50/80 to-violet-50/60 text-[#1F2937]"
                            : "bg-white text-[#1F2937] hover:bg-neutral-50/50"
                        }`}
                      >
                        <span>{t(item.qKey)}</span>
                        <ChevronDown
                          className={`size-5 shrink-0 text-[#EC4899] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="border-t-2 border-pink-100/60 bg-gradient-to-br from-white to-neutral-50/40 px-5 pb-4 pt-3">
                          <div className="relative">
                            <p className="pr-10 text-[#374151] leading-relaxed" style={{ lineHeight: 1.7 }}>
                              {answerText}
                            </p>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                copy(answerText, `answer-${item.qKey}`);
                              }}
                              className="absolute top-0 right-0 flex size-9 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-pink-50 hover:text-[#EC4899] focus:outline-none focus:ring-2 focus:ring-[#EC4899]/50"
                              aria-label={t("copyCopied")}
                              title={t("copyCopied")}
                            >
                              <Copy className="size-4" strokeWidth={2} />
                            </button>
                            {copied === `answer-${item.qKey}` && (
                              <span
                                className="absolute -bottom-1 right-0 rounded-lg bg-[#1F2937] px-2.5 py-1 text-xs font-medium text-white shadow-lg"
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

        <p className="mt-8 text-center text-[#6B7280] leading-relaxed">
          {t("closingParagraph")}
        </p>

        {/* Still not found + Email copy */}
        <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50/60 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:p-8">
          <h3 className="text-lg font-bold text-[#1F2937]">
            {t("stillNotFound")}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-[#6B7280]">Email:</span>
            <div className="relative inline-flex items-center">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-[#EC4899] hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              <button
                type="button"
                onClick={() => copy(CONTACT_EMAIL, "email")}
                className="ml-2 flex size-9 shrink-0 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-pink-50 hover:text-[#EC4899] focus:outline-none focus:ring-2 focus:ring-[#EC4899]/50"
                aria-label={t("emailCopied")}
                title={t("copyCopied")}
              >
                <Copy className="size-4" strokeWidth={2} />
              </button>
              {copied === "email" && (
                <span
                  className="absolute -bottom-8 left-0 rounded-lg bg-[#1F2937] px-3 py-1.5 text-xs font-medium text-white shadow-lg"
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
              className="inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,#EC4899,#A855F7)] px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
            >
              {t("contactSupportCta")}
            </Link>
            <a
              href="https://app.salongo.eu/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border-2 border-[#EC4899] bg-white px-6 py-3.5 text-base font-semibold text-[#EC4899] transition-all duration-300 hover:bg-pink-50 active:scale-[0.98]"
            >
              {t("tryFreeCta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
