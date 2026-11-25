/** Đầu trang con: nhãn nhỏ (tuỳ chọn) + tiêu đề serif + một câu, căn trái, quầng hồng phấn rất nhẹ như trang chủ. */
export function PageHead({ title, lead, eyebrow, children }: { title: string; lead?: string; eyebrow?: string; children?: React.ReactNode }) {
  return (
    <header className="relative overflow-hidden bg-white pb-10 pt-12 sm:pt-16 lg:pb-14 lg:pt-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(55%_60%_at_20%_0%,#F8E9ED_0%,rgba(255,255,255,0)_70%)]"
        aria-hidden
      />
      <div className="x-wrap relative">
        {eyebrow && <p className="x-eyebrow mb-5">{eyebrow}</p>}
        <h1 className="x-display max-w-[52rem] text-ink lg:!text-[clamp(3rem,1.6rem+3vw,4.5rem)]">{title}</h1>
        {lead && <p className="x-lead mt-5 max-w-[40rem]">{lead}</p>}
        {children}
      </div>
    </header>
  );
}
