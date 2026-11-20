/** Đầu trang con: tiêu đề + một câu, căn trái, không khối màu. */
export function PageHead({ title, lead, children }: { title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <header className="bg-white pb-10 pt-12 sm:pt-16 lg:pb-14 lg:pt-20">
      <div className="x-wrap">
        <h1 className="x-display max-w-[52rem] text-ink lg:!text-[clamp(3rem,1.6rem+3vw,4.5rem)]">{title}</h1>
        {lead && <p className="x-lead mt-5 max-w-[40rem]">{lead}</p>}
        {children}
      </div>
    </header>
  );
}
