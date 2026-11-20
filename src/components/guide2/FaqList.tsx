export type Qa = { q: string; a: string };

/**
 * Câu hỏi và câu trả lời hiện sẵn (không gập lại), để người đọc, Google và trợ lý AI đều thấy;
 * đúng nội dung FAQPage JSON-LD của trang.
 */
export function FaqList({ id = "hoi-dap", title, items }: { id?: string; title: string; items: Qa[] }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 bg-white lg:scroll-mt-24">
      <div className="x-wrap">
        <div className="grid gap-10 border-t border-line py-16 lg:grid-cols-12 lg:gap-12 lg:py-24 [&>*]:min-w-0">
          <h2 id={`${id}-title`} className="x-h2 text-ink lg:col-span-4 lg:!text-[clamp(2rem,1.3rem+1.6vw,2.8rem)]">{title}</h2>
          <div className="border-t border-ink/15 lg:col-span-8">
            {items.map(({ q, a }) => (
              <div key={q} className="border-b border-line py-6">
                <h3 className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[1.15rem]">{q}</h3>
                <p className="x-body mt-2 max-w-[42rem]">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
