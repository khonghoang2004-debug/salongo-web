import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Item = { id: string; title: string; text: string; href?: string; link?: string };

/** Các phần nhỏ không cần ảnh: danh sách mở, tiêu đề trái, một câu phải, ngăn bằng đường kẻ mảnh. */
export function FeaturesMore({ title, items }: { title: string; items: Item[] }) {
  return (
    <section aria-labelledby="more-title" className="bg-white">
      <div className="x-wrap">
        <div className="border-t border-line pb-20 pt-14 sm:pt-16 lg:pb-28 lg:pt-24">
          <h2 id="more-title" className="x-h2 max-w-[36rem] text-ink">{title}</h2>
          <ul className="mt-7 border-t border-ink/15 lg:mt-14">
            {items.map((m) => (
              <li key={m.id} id={m.id} className="grid scroll-mt-24 gap-2 border-b border-line py-7 md:grid-cols-12 md:gap-8 lg:py-8">
                <h3 className="text-[1.2rem] font-semibold leading-snug tracking-[-0.015em] text-ink md:col-span-5 lg:text-[1.3rem]">{m.title}</h3>
                <div className="md:col-span-7">
                  <p className="x-body max-w-[36rem]">{m.text}</p>
                  {m.href && m.link && (
                    <Link href={m.href} className="x-link mt-3 min-h-11">
                      {m.link}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
