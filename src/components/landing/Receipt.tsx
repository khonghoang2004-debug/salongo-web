/**
 * Hoá đơn mẫu (giấy in nhiệt 80 mm) có mã EET, vẽ bằng HTML để chữ sắc nét ở mọi cỡ màn hình.
 * Dữ liệu mẫu, không phải hoá đơn thật; chữ trên hoá đơn luôn bằng tiếng Séc như hoá đơn in ra ở tiệm.
 */
export function Receipt({ className = "" }: { className?: string }) {
  const rows = [
    ["Gel nehty", "650,00"],
    ["Úprava obočí", "250,00"],
    ["Spropitné", "100,00"],
  ];
  return (
    <div className={`x-receipt w-[290px] px-6 pt-7 shadow-[0_30px_60px_-30px_rgba(42,15,23,0.45)] ${className}`} role="img" aria-label="Účtenka s kódem FIK (ukázka)">
      <p className="text-center text-[14px] font-semibold">Lotus Nails &amp; Beauty</p>
      <p className="text-center text-ink/60">Nuselská 18, Praha 4</p>
      <p className="text-center text-ink/60">IČO 12345678</p>
      <div className="my-3 border-t border-dashed border-ink/30" />
      <div className="flex justify-between text-ink/70"><span>Účtenka 2026-0418</span><span>14:32</span></div>
      <div className="my-3 border-t border-dashed border-ink/30" />
      {rows.map(([n, p]) => (
        <div key={n} className="flex justify-between"><span>{n}</span><span className="tabular-nums">{p}</span></div>
      ))}
      <div className="my-3 border-t border-ink" />
      <div className="flex justify-between text-[15px] font-semibold"><span>CELKEM</span><span className="tabular-nums">1 000,00 Kč</span></div>
      <div className="flex justify-between text-ink/70"><span>Platba</span><span>karta</span></div>
      <div className="my-3 border-t border-dashed border-ink/30" />
      <p className="break-all text-[11.5px] text-ink/75">FIK: 3a7f1c2e-9b4d-41a8-8c55-0e6d2f9b17a4-ff</p>
      <p className="break-all text-[11.5px] text-ink/75">BKP: 8F3C2A19-77D04E1B-9A2C5F60-3B81D7E4-0C9A6F12</p>
      <p className="mt-3 text-center text-ink/60">Děkujeme, těšíme se příště</p>
    </div>
  );
}
