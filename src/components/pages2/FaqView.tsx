import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Plus } from "lucide-react";
import { PageHead } from "./PageHead";

export const FAQ_GROUPS: { title: "group1Title" | "group2Title" | "group3Title" | "group4Title"; qs: string[] }[] = [
  { title: "group1Title", qs: ["1", "2", "3"] },
  { title: "group2Title", qs: ["4", "5", "10", "11", "12"] },
  { title: "group3Title", qs: ["16", "17", "6", "7", "15", "13", "14"] },
  { title: "group4Title", qs: ["8", "9"] },
];
export const FAQ_ORDER = FAQ_GROUPS.flatMap((g) => g.qs);

/** Trang câu hỏi: nhóm bên trái (dính khi cuộn trên máy tính), câu hỏi mở/đóng bên phải. Câu trả lời có sẵn trong HTML. */
export async function FaqView() {
  const t = await getTranslations("faq");
  const p = await getTranslations("pages2.faq");
  return (
    <>
      <PageHead title={p("title")} lead={p("lead")}>
        <Link href="/lien-he" className="x-btn-light mt-8">{p("contact")}</Link>
      </PageHead>
      <section className="bg-white pb-24 lg:pb-32">
        <div className="x-wrap space-y-16">
          {FAQ_GROUPS.map((g) => (
            <div key={g.title} className="grid gap-6 lg:grid-cols-12 lg:gap-12 [&>*]:min-w-0">
              <h2 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink lg:col-span-4">
                <span className="lg:sticky lg:top-28">{t(g.title)}</span>
              </h2>
              <div className="border-t border-line lg:col-span-8">
                {g.qs.map((n) => (
                  <details key={n} id={`q${n}`} className="group scroll-mt-24 border-b border-line">
                    <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                      <h3 className="text-[1.0625rem] font-medium tracking-[-0.01em] text-ink sm:text-[1.15rem]">{t(`q${n}`)}</h3>
                      <Plus className="size-5 shrink-0 text-ink/50 transition-transform duration-200 group-open:rotate-45" aria-hidden />
                    </summary>
                    <p className="x-body max-w-[42rem] whitespace-pre-line pb-6">{t(`a${n}`)}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
