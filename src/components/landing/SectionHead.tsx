/**
 * Tiêu đề section kiểu biên tập: nhãn nhỏ in hoa + tiêu đề serif. Phần sau dấu "|" trong văn bản là vế thứ hai,
 * in nghiêng màu thương hiệu (xuống dòng trên máy tính, chảy tiếp trên điện thoại).
 */
export function splitTitle(text: string, onDark = false) {
  const [a, b] = text.split("|");
  if (!b) return a;
  return (
    <>
      {a} <em className={`lg:block ${onDark ? "on-dark" : ""}`}>{b.trim()}</em>
    </>
  );
}

export function SectionHead({
  id,
  eyebrow,
  title,
  lead,
  onDark = false,
  className = "",
  as: Tag = "h2",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  onDark?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={className}>
      {eyebrow && <p className={`x-eyebrow ${onDark ? "!text-[#f1c9d3]" : ""}`}>{eyebrow}</p>}
      <Tag id={id} className={`${Tag === "h1" ? "x-display" : "x-h2"} ${eyebrow ? "mt-4" : ""} ${onDark ? "text-white" : "text-ink"}`}>
        {splitTitle(title, onDark)}
      </Tag>
      {lead && <p className={`x-lead mt-5 max-w-[36rem] ${onDark ? "!text-white/70" : ""}`}>{lead}</p>}
    </div>
  );
}
