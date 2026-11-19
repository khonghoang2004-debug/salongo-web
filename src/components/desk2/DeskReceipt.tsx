/**
 * Hoá đơn mẫu của người thuê bàn (giấy in nhiệt 80 mm): tên và IČO của chính thợ, tên salon chỉ là nơi làm.
 * Dữ liệu mẫu, không phải hoá đơn thật; chữ trên hoá đơn bằng tiếng Séc như hoá đơn in ra ở tiệm.
 */
export function DeskReceipt({ alt, className = "" }: { alt: string; className?: string }) {
  const rows = [
    ["Gelové nehty", "650,00"],
    ["Nail art", "120,00"],
    ["Spropitné", "50,00"],
  ];
  return (
    <div className={`x-receipt pt-7 shadow-[0_30px_60px_-30px_rgba(42,15,23,0.45)] ${className}`} role="img" aria-label={alt}>
      <p className="text-center text-[1.12em] font-semibold">Mai Tran</p>
      <p className="text-center text-ink/60">IČO 87654321</p>
      <p className="text-center text-ink/60">Lotus Nails, místo 2</p>
      <div className="my-3 border-t border-dashed border-ink/30" />
      <div className="flex justify-between text-ink/70"><span>Účtenka 2027-0112</span><span>15:05</span></div>
      <div className="my-3 border-t border-dashed border-ink/30" />
      {rows.map(([n, p]) => (
        <div key={n} className="flex justify-between"><span>{n}</span><span className="tabular-nums">{p}</span></div>
      ))}
      <div className="my-3 border-t border-ink" />
      <div className="flex justify-between text-[1.2em] font-semibold"><span>CELKEM</span><span className="tabular-nums">820,00 Kč</span></div>
      <div className="flex justify-between text-ink/70"><span>Platba</span><span>hotovost</span></div>
      <div className="my-3 border-t border-dashed border-ink/30" />
      <p className="break-all text-[0.92em] text-ink/75">FIK: 7c1e4b90-2f3a-4d6e-9a18-5b0c3e7d21f4-0a</p>
      <p className="break-all text-[0.92em] text-ink/75">BKP: 2B9E41C7-0D5A8F33-6E17C2B4-91A0D5E8-47F3B6C2</p>
    </div>
  );
}
