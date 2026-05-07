// <!-- Elegba opens the way — Jiggs leads, Glo follows, tails become fire -->
export default function Logo({ size = 40 }: { size?: number }) {
  const w = Math.round(size * (240 / 95))
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 240 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="NYC Tailblazers — Jiggs and Glo"
    >
      <defs>
        <linearGradient id="lgJiggs" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7a8fa0" />
          <stop offset="50%" stopColor="#b0c5d0" />
          <stop offset="100%" stopColor="#6b7f8a" />
        </linearGradient>
        <linearGradient id="lgGlo" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c08040" />
          <stop offset="50%" stopColor="#d9a570" />
          <stop offset="100%" stopColor="#b07030" />
        </linearGradient>
        <linearGradient id="lgFlameOut" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#c8900a" />
          <stop offset="50%" stopColor="#f5c842" />
          <stop offset="100%" stopColor="#fff5cc" />
        </linearGradient>
        <linearGradient id="lgFlameIn" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ff6600" />
          <stop offset="60%" stopColor="#ffcc00" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="lgJiggsTail" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#7a8fa0" />
          <stop offset="100%" stopColor="#c8900a" />
        </linearGradient>
        <linearGradient id="lgGloTail" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#c08040" />
          <stop offset="100%" stopColor="#c8900a" />
        </linearGradient>
      </defs>

      {/* ── TORCH FLAME (center top — where tails meet) ── */}
      <path
        d="M113,47 C107,39 105,26 113,13 C116,7 120,3 120,3 C120,3 124,7 127,13 C135,26 133,39 127,47 Z"
        fill="url(#lgFlameOut)"
      />
      <path
        d="M117,45 C113,38 113,29 117,19 C118,14 120,10 120,10 C120,10 122,14 123,19 C127,29 127,38 123,45 Z"
        fill="url(#lgFlameIn)"
        opacity="0.85"
      />

      {/* ── JIGGS — left dog, facing right, grey/silver, blue collar ── */}

      {/* Body */}
      <ellipse cx="60" cy="66" rx="34" ry="19" fill="url(#lgJiggs)" />

      {/* Shoulder/neck bridge */}
      <ellipse cx="85" cy="57" rx="11" ry="9" fill="url(#lgJiggs)" />

      {/* Head */}
      <circle cx="88" cy="47" r="16" fill="url(#lgJiggs)" />

      {/* Snout/muzzle */}
      <ellipse cx="101" cy="53" rx="9" ry="6" fill="url(#lgJiggs)" opacity="0.88" />

      {/* Nose */}
      <ellipse cx="107" cy="51" rx="4" ry="3" fill="#111827" />
      <circle cx="106" cy="50" r="1" fill="white" opacity="0.55" />

      {/* Ear — floppy, hangs beside head */}
      <path
        d="M78,37 C72,28 67,31 67,42 C67,51 75,53 80,48 Z"
        fill="url(#lgJiggs)"
        opacity="0.9"
      />

      {/* Eye — blue (blue-collar dog) */}
      <circle cx="90" cy="43" r="4.5" fill="#0a1628" />
      <circle cx="90" cy="43" r="2.8" fill="#4a9fd4" />
      <circle cx="89" cy="42" r="0.9" fill="white" />

      {/* Blue collar */}
      <path d="M76,58 Q88,64 100,59" stroke="#3a8fc4" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Collar tag */}
      <circle cx="88" cy="65" r="2.2" fill="#f5c842" />

      {/* Front legs */}
      <rect x="75" y="80" width="9" height="14" rx="4.5" fill="url(#lgJiggs)" />
      <rect x="86" y="82" width="9" height="12" rx="4.5" fill="url(#lgJiggs)" opacity="0.82" />

      {/* Back legs */}
      <rect x="36" y="80" width="9" height="14" rx="4.5" fill="url(#lgJiggs)" />
      <rect x="48" y="82" width="9" height="12" rx="4.5" fill="url(#lgJiggs)" opacity="0.82" />

      {/* Tail — curves from back of body up and over to join the flame */}
      <path
        d="M28,57 C14,43 20,24 52,14 C78,6 98,6 113,43"
        stroke="url(#lgJiggsTail)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />

      {/* ── GLO — right dog, facing left, fawn/gold, purple collar ── */}

      {/* Body */}
      <ellipse cx="180" cy="69" rx="29" ry="17" fill="url(#lgGlo)" />

      {/* Shoulder/neck bridge */}
      <ellipse cx="157" cy="62" rx="10" ry="8" fill="url(#lgGlo)" />

      {/* Head */}
      <circle cx="153" cy="53" r="14" fill="url(#lgGlo)" />

      {/* Snout/muzzle */}
      <ellipse cx="141" cy="58" rx="8" ry="5.5" fill="url(#lgGlo)" opacity="0.88" />

      {/* Nose */}
      <ellipse cx="136" cy="56" rx="3.5" ry="2.5" fill="#111827" />
      <circle cx="135" cy="55" r="0.8" fill="white" opacity="0.55" />

      {/* Ear — floppy, hangs beside head */}
      <path
        d="M163,43 C169,34 175,38 173,49 C171,57 163,58 160,53 Z"
        fill="url(#lgGlo)"
        opacity="0.9"
      />

      {/* Eye — purple (purple-collar dog) */}
      <circle cx="151" cy="50" r="4" fill="#0d0820" />
      <circle cx="151" cy="50" r="2.5" fill="#9b59d4" />
      <circle cx="150" cy="49" r="0.8" fill="white" />

      {/* Purple collar */}
      <path d="M143,62 Q153,67 166,62" stroke="#7c2da8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Collar tag */}
      <circle cx="153" cy="68" r="1.9" fill="#f5c842" />

      {/* Front legs */}
      <rect x="144" y="82" width="8" height="12" rx="4" fill="url(#lgGlo)" />
      <rect x="154" y="84" width="8" height="11" rx="4" fill="url(#lgGlo)" opacity="0.82" />

      {/* Back legs */}
      <rect x="195" y="82" width="8" height="12" rx="4" fill="url(#lgGlo)" />
      <rect x="206" y="84" width="8" height="11" rx="4" fill="url(#lgGlo)" opacity="0.82" />

      {/* Tail — curves from back of body up and over to join the flame */}
      <path
        d="M207,60 C222,44 216,26 186,16 C162,8 142,8 127,43"
        stroke="url(#lgGloTail)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}
