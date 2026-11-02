import type { Motif } from "./types";

/** Bảng màu cho hình minh hoạ: nền sáng, nền đậm, màu nhấn, màu sâu nhất */
export type ArtPalette = [string, string, string, string];

type Props = {
  motif: Motif;
  v: number;
  palette: ArtPalette;
  className?: string;
  /** Ảnh thật (nếu có) thay cho hình vẽ */
  photo?: string;
  alt: string;
  /** Ảnh đầu trang: tải ngay */
  priority?: boolean;
};

// Hình minh hoạ vẽ bằng SVG cho website mẫu (không dùng ảnh của salon thật). Phủ kín khung như object-cover.
// Khi có ảnh có bản quyền phù hợp: điền `photo` trong file nội dung của mẫu, component tự đổi sang <img>.
export function Art({ motif, v, palette, className = "", photo, alt, priority }: Props) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`block size-full object-cover ${className}`}
      />
    );
  }
  const [a, b, c, d] = palette;
  const id = `art-${motif}-${v}-${palette.join("").replace(/#/g, "")}`;
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={alt}
      className={`block size-full ${className}`}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
        <linearGradient id={`${id}-fg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c} />
          <stop offset="1" stopColor={d} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.3" cy="0.25" r="0.8">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${id}-bg)`} />
      <rect width="400" height="400" fill={`url(#${id}-glow)`} />
      {MOTIFS[motif](v % 4, id, palette)}
    </svg>
  );
}

// Làm tròn toạ độ: Math.sin/cos ở Node và trình duyệt có thể lệch chữ số cuối → lệch hydration
const rd = (n: number) => Math.round(n * 100) / 100;

const MOTIFS: Record<Motif, (v: number, id: string, p: ArtPalette) => React.ReactNode> = {
  // Móng: dải mẫu sơn, móng hạnh nhân lớn, bảng màu tròn
  nail: (v, id, [a, , c, d]) => {
    if (v === 0)
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => {
            const h = [150, 190, 210, 180, 140][i];
            const x = 78 + i * 52;
            return (
              <g key={i}>
                <rect x={x} y={300 - h} width="40" height={h} rx="20" fill={i % 2 ? d : `url(#${id}-fg)`} opacity={0.75 + i * 0.05} />
                <rect x={x + 8} y={300 - h + 14} width="7" height={h * 0.38} rx="3.5" fill="#fff" opacity="0.45" />
              </g>
            );
          })}
          <rect x="60" y="306" width="280" height="2" fill={d} opacity="0.25" />
        </g>
      );
    if (v === 1)
      return (
        <g>
          <path d="M200 70 C262 70 286 150 286 230 C286 300 250 336 200 336 C150 336 114 300 114 230 C114 150 138 70 200 70Z" fill={`url(#${id}-fg)`} />
          <path d="M168 110 C182 96 196 96 204 104 C186 116 176 150 174 196 C164 170 160 132 168 110Z" fill="#fff" opacity="0.45" />
          <circle cx="318" cy="96" r="10" fill={c} opacity="0.7" />
          <circle cx="338" cy="128" r="5" fill={d} opacity="0.5" />
          <circle cx="82" cy="318" r="7" fill={c} opacity="0.6" />
        </g>
      );
    if (v === 2)
      return (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const ang = Math.PI * (0.15 + i * 0.14);
            return (
              <circle key={i} cx={rd(200 - Math.cos(ang) * 150)} cy={rd(320 - Math.sin(ang) * 170)} r={30 - i * 1.5} fill={i % 2 ? d : c} opacity={0.55 + i * 0.07} />
            );
          })}
          <circle cx="200" cy="300" r="54" fill={a} stroke={d} strokeOpacity="0.25" />
          <path d="M184 268 h32 v44 a16 16 0 0 1 -32 0z" fill={`url(#${id}-fg)`} />
        </g>
      );
    return (
      <g>
        <rect x="70" y="70" width="260" height="260" rx="130" fill="none" stroke={d} strokeOpacity="0.25" strokeWidth="1.5" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`rotate(${-24 + i * 24} 200 300)`}>
            <rect x="182" y="110" width="36" height="150" rx="18" fill={i === 1 ? `url(#${id}-fg)` : c} opacity={i === 1 ? 1 : 0.6} />
            <rect x="189" y="124" width="6" height="56" rx="3" fill="#fff" opacity="0.45" />
          </g>
        ))}
      </g>
    );
  },
  // Tóc: những lọn tóc uốn lượn, gương tròn
  hair: (v, id, [, b, c, d]) => {
    const strands = (n: number, amp: number, y0: number, rot: number) => (
      <g transform={`rotate(${rot} 200 200)`} fill="none" strokeLinecap="round">
        {Array.from({ length: n }, (_, i) => {
          const y = y0 + i * 9;
          const k = amp + (i % 3) * 6;
          return (
            <path
              key={i}
              d={`M-20 ${y} C 80 ${y - k}, 140 ${y + k}, 220 ${y} S 360 ${y - k}, 430 ${y}`}
              stroke={i % 4 === 0 ? c : d}
              strokeOpacity={0.35 + (i % 5) * 0.12}
              strokeWidth={i % 4 === 0 ? 3 : 1.6}
            />
          );
        })}
      </g>
    );
    if (v === 0) return strands(16, 40, 130, -12);
    if (v === 1)
      return (
        <g>
          <circle cx="230" cy="180" r="120" fill={b} stroke={c} strokeWidth="2" />
          <circle cx="230" cy="180" r="104" fill={`url(#${id}-fg)`} opacity="0.85" />
          {strands(10, 50, 230, 18)}
        </g>
      );
    if (v === 2)
      return (
        <g>
          {strands(12, 30, 60, 0)}
          <rect x="70" y="250" width="260" height="22" rx="6" fill={d} />
          {Array.from({ length: 22 }, (_, i) => (
            <rect key={i} x={78 + i * 11.4} y="270" width="4" height="48" rx="2" fill={d} />
          ))}
          <rect x="70" y="250" width="260" height="4" rx="2" fill={c} opacity="0.8" />
        </g>
      );
    return (
      <g>
        <path d="M120 360 C110 250 150 120 250 90 C320 70 360 130 330 200 C300 270 230 260 210 330 L205 360Z" fill={`url(#${id}-fg)`} />
        {strands(8, 60, 150, 60)}
      </g>
    );
  },
  // Spa: đá xếp, cửa vòm và lá, gợn nước
  spa: (v, id, [a, b, c, d]) => {
    if (v === 0)
      return (
        <g>
          <ellipse cx="200" cy="320" rx="120" ry="26" fill={d} opacity="0.18" />
          <ellipse cx="200" cy="292" rx="96" ry="34" fill={`url(#${id}-fg)`} />
          <ellipse cx="206" cy="238" rx="72" ry="28" fill={c} />
          <ellipse cx="198" cy="194" rx="52" ry="22" fill={d} opacity="0.85" />
          <ellipse cx="202" cy="160" rx="34" ry="15" fill={b} stroke={d} strokeOpacity="0.2" />
          <path d="M290 170 C320 120 350 110 370 100 C366 140 340 170 290 170Z" fill={c} opacity="0.8" />
        </g>
      );
    if (v === 1)
      return (
        <g>
          <path d="M110 380 V190 a90 90 0 0 1 180 0 V380Z" fill={a} stroke={d} strokeOpacity="0.2" />
          <path d="M130 380 V196 a70 70 0 0 1 140 0 V380Z" fill={`url(#${id}-fg)`} opacity="0.55" />
          <path d="M200 360 C200 300 200 250 200 180" stroke={d} strokeWidth="2" fill="none" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <path d={`M200 ${330 - i * 40} C ${170 - i * 2} ${320 - i * 40}, ${150} ${300 - i * 40}, ${140 + i * 4} ${280 - i * 40} C ${172} ${282 - i * 40}, ${194} ${300 - i * 40}, 200 ${330 - i * 40}Z`} fill={d} opacity="0.7" />
              <path d={`M200 ${310 - i * 40} C ${230 + i * 2} ${300 - i * 40}, ${250} ${280 - i * 40}, ${260 - i * 4} ${260 - i * 40} C ${228} ${262 - i * 40}, ${206} ${280 - i * 40}, 200 ${310 - i * 40}Z`} fill={c} opacity="0.8" />
            </g>
          ))}
        </g>
      );
    if (v === 2)
      return (
        <g fill="none">
          {[40, 80, 120, 160, 200].map((r, i) => (
            <ellipse key={r} cx="200" cy="230" rx={r} ry={r * 0.42} stroke={i % 2 ? c : d} strokeOpacity={0.5 - i * 0.07} strokeWidth="2" />
          ))}
          <ellipse cx="200" cy="230" rx="22" ry="9" fill={d} opacity="0.6" />
        </g>
      );
    return (
      <g>
        <path d="M40 330 C140 300 240 250 360 120" stroke={d} strokeWidth="2.5" fill="none" />
        {[0, 1, 2, 3, 4].map((i) => {
          const x = 90 + i * 55;
          const y = 312 - i * 40;
          return (
            <g key={i}>
              <ellipse cx={x} cy={y - 24} rx="13" ry="30" transform={`rotate(-30 ${x} ${y - 24})`} fill={i % 2 ? c : `url(#${id}-fg)`} />
              <ellipse cx={x + 24} cy={y + 6} rx="12" ry="28" transform={`rotate(60 ${x + 24} ${y + 6})`} fill={c} opacity="0.75" />
            </g>
          );
        })}
      </g>
    );
  },
  // Barber: sọc cột barber, dao cạo, khung đồng
  barber: (v, id, [a, b, c, d]) => {
    if (v === 0)
      return (
        <g>
          <rect x="160" y="40" width="80" height="320" rx="40" fill={a} stroke={c} strokeWidth="3" />
          <clipPath id={`${id}-pole`}>
            <rect x="166" y="46" width="68" height="308" rx="34" />
          </clipPath>
          <g clipPath={`url(#${id}-pole)`}>
            {Array.from({ length: 12 }, (_, i) => (
              <path key={i} d={`M140 ${i * 40 - 40} L260 ${i * 40 + 20} L260 ${i * 40 + 42} L140 ${i * 40 - 18}Z`} fill={i % 2 ? d : c} opacity="0.85" />
            ))}
          </g>
          <rect x="150" y="30" width="100" height="16" rx="8" fill={c} />
          <rect x="150" y="354" width="100" height="16" rx="8" fill={c} />
        </g>
      );
    if (v === 1)
      return (
        <g>
          <path d="M70 230 L270 170 C300 162 320 176 318 196 L316 210 L80 262 Z" fill={`url(#${id}-fg)`} />
          <path d="M80 262 L316 210" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
          <rect x="280" y="196" width="100" height="26" rx="13" transform="rotate(-14 280 196)" fill={d} />
          <circle cx="292" cy="206" r="5" fill={c} />
        </g>
      );
    if (v === 2)
      return (
        <g fill="none">
          {[70, 100, 130, 160].map((r, i) => (
            <path key={r} d={`M${200 - r} 320 A ${r} ${r} 0 0 1 ${200 + r} 320`} stroke={i % 2 ? c : d} strokeWidth={i === 0 ? 10 : 3} strokeOpacity={0.9 - i * 0.15} />
          ))}
          <rect x="120" y="320" width="160" height="10" fill={c} />
        </g>
      );
    // kéo cắt tóc
    return (
      <g>
        <rect x="80" y="80" width="240" height="240" fill="none" stroke={c} strokeWidth="2" />
        <g transform="rotate(-35 200 200)">
          <path d="M196 196 L206 60 L214 60 L206 200Z" fill={d} />
          <path d="M204 204 L194 60 L186 60 L194 200Z" fill={d} opacity="0.7" />
          <circle cx="200" cy="200" r="6" fill={c} />
          <circle cx="178" cy="268" r="30" fill="none" stroke={c} strokeWidth="10" />
          <circle cx="222" cy="268" r="30" fill="none" stroke={c} strokeWidth="10" />
          <path d="M194 206 L184 240 M206 206 L216 240" stroke={c} strokeWidth="9" strokeLinecap="round" />
        </g>
        <rect x="80" y="80" width="240" height="240" fill={`url(#${id}-fg)`} opacity="0.12" />
      </g>
    );
  },
  // Mi & mày: đường mi cong, vòm mày, ánh mắt
  lash: (v, id, [a, , c, d]) => {
    const lashes = (cx: number, cy: number, r: number, n: number, w: number) => (
      <g fill="none" strokeLinecap="round">
        <path d={`M${cx - r} ${cy} Q ${cx} ${cy - r * 0.9} ${cx + r} ${cy}`} stroke={d} strokeWidth={w * 1.6} />
        {Array.from({ length: n }, (_, i) => {
          const tt = (i + 1) / (n + 1);
          const x = cx - r + 2 * r * tt;
          const y = cy - Math.sin(Math.PI * tt) * r * 0.45;
          const ang = -Math.PI / 2 + (tt - 0.5) * 1.6;
          const L = r * (0.28 + Math.sin(Math.PI * tt) * 0.22);
          return <path key={i} d={`M${rd(x)} ${rd(y)} q ${rd(Math.cos(ang) * L * 0.4)} ${rd(Math.sin(ang) * L * 0.7)} ${rd(Math.cos(ang) * L)} ${rd(Math.sin(ang) * L)}`} stroke={d} strokeWidth={w} />;
        })}
      </g>
    );
    if (v === 0)
      return (
        <g>
          <ellipse cx="200" cy="230" rx="140" ry="70" fill={a} opacity="0.7" />
          <circle cx="200" cy="230" r="46" fill={`url(#${id}-fg)`} />
          <circle cx="214" cy="216" r="9" fill="#fff" opacity="0.7" />
          {lashes(200, 228, 150, 22, 3)}
        </g>
      );
    if (v === 1)
      return (
        <g>
          <path d="M70 210 C 140 120, 260 110, 340 170" fill="none" stroke={d} strokeWidth="18" strokeLinecap="round" />
          <path d="M70 210 C 140 120, 260 110, 340 170" fill="none" stroke={c} strokeWidth="4" strokeLinecap="round" strokeDasharray="2 9" />
          {lashes(200, 300, 120, 16, 2.5)}
        </g>
      );
    if (v === 2)
      return (
        <g>
          <rect x="120" y="60" width="160" height="280" rx="80" fill={`url(#${id}-fg)`} opacity="0.85" />
          <rect x="140" y="80" width="120" height="240" rx="60" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
          {lashes(200, 214, 70, 12, 2.5)}
        </g>
      );
    return (
      <g>
        {[0, 1, 2].map((k) => (
          <g key={k} transform={`translate(0 ${k * 90 - 60})`}>{lashes(200, 230, 110 - k * 14, 14, 2.2)}</g>
        ))}
        <circle cx="320" cy="90" r="16" fill={c} opacity="0.6" />
      </g>
    );
  },
  // Trang điểm: thỏi son, hộp phấn, cọ
  makeup: (v, id, [a, b, c, d]) => {
    if (v === 0)
      return (
        <g>
          <rect x="160" y="200" width="80" height="140" rx="8" fill={d} />
          <rect x="166" y="190" width="68" height="20" rx="4" fill={c} />
          <path d="M172 190 V120 L228 96 V190Z" fill={`url(#${id}-fg)`} />
          <rect x="160" y="250" width="80" height="4" fill={c} opacity="0.8" />
        </g>
      );
    if (v === 1)
      return (
        <g>
          <circle cx="200" cy="210" r="120" fill={d} />
          <circle cx="200" cy="210" r="104" fill={c} opacity="0.35" />
          <circle cx="200" cy="210" r="92" fill={`url(#${id}-fg)`} />
          <circle cx="170" cy="180" r="30" fill="#fff" opacity="0.25" />
          <path d="M200 90 A120 120 0 0 1 320 210" fill="none" stroke={a} strokeOpacity="0.6" strokeWidth="2" />
        </g>
      );
    if (v === 2)
      return (
        <g transform="rotate(-28 200 200)">
          <rect x="190" y="180" width="20" height="190" rx="10" fill={d} />
          <rect x="186" y="160" width="28" height="30" rx="4" fill={c} />
          <path d="M186 160 C 176 110, 186 60, 200 40 C 214 60, 224 110, 214 160Z" fill={`url(#${id}-fg)`} />
          <circle cx="300" cy="300" r="40" fill={b} opacity="0.6" />
        </g>
      );
    return (
      <g>
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={110 + (i % 2) * 180} cy={130 + Math.floor(i / 2) * 150} r="62" fill={i % 2 ? c : `url(#${id}-fg)`} opacity={0.65 + i * 0.08} />
        ))}
        <rect x="60" y="60" width="280" height="280" rx="24" fill="none" stroke={d} strokeOpacity="0.4" strokeWidth="2" />
      </g>
    );
  },
};
