// <!-- Elegba opens the way -->
export default function Logo({ size = 40 }: { size?: number }) {
  const w = Math.round(size * (160 / 72))
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 160 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="NYC Tailblazers — Jiggs and Glo"
    >
      <defs>
        <linearGradient id="silverGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6b7f8a" />
          <stop offset="50%" stopColor="#a8bec8" />
          <stop offset="100%" stopColor="#6b7f8a" />
        </linearGradient>
        <linearGradient id="lgGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c8900a" />
          <stop offset="50%" stopColor="#f5c842" />
          <stop offset="100%" stopColor="#c8900a" />
        </linearGradient>
        <linearGradient id="lgGreen" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e6b30" />
          <stop offset="100%" stopColor="#4caf70" />
        </linearGradient>
        <linearGradient id="fawnGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b8742a" />
          <stop offset="50%" stopColor="#d4936e" />
          <stop offset="100%" stopColor="#b8742a" />
        </linearGradient>
        <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#c8900a" />
          <stop offset="100%" stopColor="#f5c842" />
        </linearGradient>
      </defs>

      {/* ── JIGGS (left, larger, grey/silver, blue eye) ── */}
      <polygon points="14,6 38,4 50,10 48,22 12,24" fill="url(#silverGrad)" />
      <polygon points="14,6 5,2 18,7" fill="url(#lgGreen)" />
      <polygon points="38,4 46,0 50,10" fill="url(#lgGreen)" />
      <polygon points="12,24 48,22 52,34 10,36" fill="url(#silverGrad)" opacity="0.9" />
      <polygon points="10,36 52,34 48,46 12,48" fill="url(#lgGreen)" opacity="0.85" />
      <polygon points="12,48 48,46 32,58" fill="url(#lgGold)" opacity="0.7" />
      <polygon points="2,28 12,10 10,50 0,46" fill="url(#lgGreen)" opacity="0.6" />
      <polygon points="48,22 62,28 58,52 48,46" fill="url(#silverGrad)" opacity="0.7" />
      <polygon points="22,14 30,11 34,17 26,20" fill="#060606" />
      <circle cx="28" cy="16" r="2.5" fill="#4a9fd4" opacity="0.9" />
      <polygon points="28,42 32,38 36,42 34,48 30,48" fill="white" opacity="0.12" />

      {/* ── BLAZER MARK — tails form a shared upward flame ── */}
      <polygon points="58,52 64,36 70,22 74,32 70,48" fill="url(#lgGold)" opacity="0.85" />
      <polygon points="102,52 96,36 90,22 86,32 90,48" fill="url(#lgGold)" opacity="0.85" />
      <polygon points="70,22 80,10 90,22 84,32 76,32" fill="url(#flameGrad)" />

      {/* ── GLO (right, smaller, fawn/gold, purple eye) ── */}
      <polygon points="92,10 114,8 124,14 122,24 90,26" fill="url(#fawnGrad)" />
      <polygon points="92,10 84,4 96,9" fill="url(#lgGreen)" />
      <polygon points="114,8 122,2 126,14" fill="url(#lgGreen)" />
      <polygon points="90,26 122,24 126,36 88,38" fill="url(#fawnGrad)" opacity="0.9" />
      <polygon points="88,38 126,36 122,48 90,50" fill="url(#lgGreen)" opacity="0.85" />
      <polygon points="90,50 122,48 108,60" fill="url(#lgGold)" opacity="0.7" />
      <polygon points="82,28 92,10 90,52 80,48" fill="url(#lgGreen)" opacity="0.6" />
      <polygon points="122,24 134,30 130,52 122,48" fill="url(#fawnGrad)" opacity="0.7" />
      <polygon points="100,18 108,15 112,21 104,24" fill="#060606" />
      <circle cx="106" cy="20" r="2" fill="#9b59d4" opacity="0.9" />
      <polygon points="104,44 108,40 112,44 110,50 106,50" fill="white" opacity="0.12" />

      {/* Elegba crossroads mark — hidden */}
      <line x1="80" y1="66" x2="80" y2="72" stroke="#cc1a1a" strokeWidth="1" opacity="0.35" />
      <line x1="76" y1="69" x2="84" y2="69" stroke="#cc1a1a" strokeWidth="1" opacity="0.35" />
    </svg>
  )
}
