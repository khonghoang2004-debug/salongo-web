import type { ReactNode } from "react";
import { Plus } from "lucide-react";

/**
 * Câu hỏi thường gặp: <details> để câu trả lời luôn có trong HTML (khớp JSON-LD FAQPage), mở/đóng không cần JavaScript.
 * Dùng chung cho trang Bảng giá và trang Gói Bàn.
 */
export function FaqList({
  id,
  title,
  items,
  aside,
}: {
  id: string;
  title: string;
  items: { q: string; a: string }[];
  aside?: ReactNode;
}) {
  return (
    <section id={id} className="x-section scroll-mt-20 bg-white" aria-labelledby={`${id}-title`}>
      <div className="x-wrap grid gap-10 lg:grid-cols-12 [&>*]:min-w-0">
        <div className="lg:col-span-4">
          <h2 id={`${id}-title`} className="x-h2 text-ink">{title}</h2>
          {aside}
        </div>
        <div className="border-t border-line lg:col-span-8">
          {items.map((it, i) => (
            <details key={it.q} className="group border-b border-line" open={i === 0}>
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[1.0625rem] font-medium tracking-[-0.01em] text-ink sm:text-[1.15rem]">{it.q}</h3>
                <Plus className="size-5 shrink-0 text-ink/50 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none" aria-hidden />
              </summary>
              <p className="x-body max-w-[42rem] pb-6">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
