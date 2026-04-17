export const Sparkline = ({ accent }: { accent: string }) => {
  const pts = [20, 32, 24, 44, 38, 56, 48, 72, 65, 88, 80, 100];
  const w = 120, h = 44;
  const coords = pts.map((v, i) => `${(i / (pts.length - 1)) * w},${h - (v / 100) * h}`);
  const path = `M${coords.join(" L")}`;
  const fill = `M0,${h} L${coords.join(" L")} L${w},${h} Z`;
  
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 40 }}>
      <defs>
        <linearGradient id={`sg-${accent.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#sg-${accent.replace("#","")})`} />
      <path d={path} fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};