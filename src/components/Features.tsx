import { getTranslations } from "next-intl/server";

const iconColor = "currentColor";
const Icon1 = () => (
  <svg className="size-6" fill="none" stroke={iconColor} viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
const Icon2 = () => (
  <svg className="size-6" fill="none" stroke={iconColor} viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);
const Icon3 = () => (
  <svg className="size-6" fill="none" stroke={iconColor} viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const Icon4 = () => (
  <svg className="size-6" fill="none" stroke={iconColor} viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const Icon5 = () => (
  <svg className="size-6" fill="none" stroke={iconColor} viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const Icon6 = () => (
  <svg className="size-6" fill="none" stroke={iconColor} viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const items = [
  { icon: Icon1, titleKey: "item1Title" as const, descKey: "item1Desc" as const },
  { icon: Icon2, titleKey: "item2Title" as const, descKey: "item2Desc" as const },
  { icon: Icon3, titleKey: "item3Title" as const, descKey: "item3Desc" as const },
  { icon: Icon4, titleKey: "item4Title" as const, descKey: "item4Desc" as const },
  { icon: Icon5, titleKey: "item5Title" as const, descKey: "item5Desc" as const },
  { icon: Icon6, titleKey: "item6Title" as const, descKey: "item6Desc" as const },
];

export async function Features() {
  const t = await getTranslations("features");

  return (
    <section id="features" className="sg-section bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="sg-h2">
            {t("title")}
          </h2>
          <p className="sg-lead mx-auto mt-3 max-w-2xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {items.map(({ icon: Icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="sg-card sg-card-hover p-6 sm:p-8"
            >
              <div
                className="flex size-12 shrink-0 items-center justify-center sg-icon-tile rounded-2xl"
              >
                <Icon />
              </div>
              <h3 className="mt-6 text-lg font-bold text-ink">
                {t(titleKey)}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
