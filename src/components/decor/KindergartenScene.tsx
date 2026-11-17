/**
 * Иллюстрация «домик детского сада» — показывается в рамке первого экрана,
 * пока в проект не добавлено реальное фото main-page.
 * preserveAspectRatio="xMidYMid slice" — сцена заполняет рамку любых пропорций.
 */
export function KindergartenScene({ label, className = "" }: { label: string; className?: string }) {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label} className={className}>
      <defs>
        <linearGradient id="ks-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe0fb" />
          <stop offset=".75" stopColor="#e8f4ff" />
          <stop offset="1" stopColor="#fff8ec" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#ks-sky)" />

      {/* облака */}
      <g fill="#fff" opacity=".95">
        <g className="motion-safe:animate-drift">
          <ellipse cx="78" cy="96" rx="34" ry="15" />
          <ellipse cx="100" cy="86" rx="22" ry="17" />
          <ellipse cx="62" cy="88" rx="16" ry="12" />
        </g>
        <g className="motion-safe:animate-drift" style={{ animationDelay: "-9s" }}>
          <ellipse cx="300" cy="150" rx="30" ry="12" />
          <ellipse cx="318" cy="141" rx="18" ry="14" />
        </g>
      </g>

      {/* радуга вдали */}
      <g fill="none" strokeLinecap="round" strokeWidth="9" opacity=".55">
        <path d="M232 262a78 78 0 0 1 156 0" stroke="#ff8f7e" />
        <path d="M245 262a65 65 0 0 1 130 0" stroke="#ffd45c" />
        <path d="M258 262a52 52 0 0 1 104 0" stroke="#c4eabb" />
      </g>

      {/* холмы */}
      <path d="M-10 330C60 290 130 300 200 322s150 10 210-20v210H-10Z" fill="#c4eabb" />
      <path d="M-10 372c80-30 160-26 230-4s130 18 190-6v150H-10Z" fill="#a8dd9c" />

      {/* дерево */}
      <rect x="54" y="300" width="10" height="64" rx="5" fill="#b9825a" />
      <circle cx="59" cy="292" r="30" fill="#3ea36a" />
      <circle cx="44" cy="282" r="16" fill="#58b97f" />
      <circle cx="70" cy="276" r="12" fill="#58b97f" />
      <circle cx="48" cy="300" r="4" fill="#ff8f7e" />
      <circle cx="72" cy="294" r="4" fill="#ff8f7e" />
      <circle cx="62" cy="270" r="4" fill="#ff8f7e" />

      {/* домик */}
      <rect x="118" y="244" width="164" height="132" rx="10" fill="#fffdf8" stroke="#2b2a3a" strokeOpacity=".1" strokeWidth="2" />
      <path d="M104 252 200 176l96 76c4 3 2 9-3 9H107c-5 0-7-6-3-9Z" fill="#ff8f7e" />
      <path d="M134 238 200 186l66 52" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="5" strokeLinecap="round" />
      {/* круглое окно на крыше */}
      <circle cx="200" cy="226" r="14" fill="#fff1c2" stroke="#e9a300" strokeWidth="3" />
      <path d="M200 214v24M188 226h24" stroke="#e9a300" strokeWidth="2.5" />
      {/* флажок */}
      <path d="M200 178v-36" stroke="#5d5a6e" strokeWidth="3" strokeLinecap="round" />
      <path d="M201 143c10-4 16 4 26 0v16c-10 4-16-4-26 0Z" fill="#3d8fd1" />
      {/* окна */}
      <g>
        <rect x="136" y="276" width="40" height="38" rx="10" fill="#d7ecff" stroke="#3d8fd1" strokeWidth="3" />
        <path d="M156 276v38M136 295h40" stroke="#3d8fd1" strokeWidth="2.5" />
        <rect x="224" y="276" width="40" height="38" rx="10" fill="#d7ecff" stroke="#3d8fd1" strokeWidth="3" />
        <path d="M244 276v38M224 295h40" stroke="#3d8fd1" strokeWidth="2.5" />
        <path d="M134 318h44M222 318h44" stroke="#ffd45c" strokeWidth="5" strokeLinecap="round" />
      </g>
      {/* дверь */}
      <path d="M182 376v-38a18 18 0 0 1 36 0v38Z" fill="#7c62d8" />
      <circle cx="210" cy="356" r="3" fill="#ffd45c" />
      {/* табличка */}
      <rect x="160" y="252" width="80" height="16" rx="8" fill="#ffd45c" />
      <circle cx="170" cy="260" r="3" fill="#fffdf8" />
      <circle cx="230" cy="260" r="3" fill="#fffdf8" />
      <path d="M182 260h36" stroke="#fffdf8" strokeWidth="3" strokeLinecap="round" />

      {/* дорожка */}
      <path d="M186 376h28l26 130h-80Z" fill="#fbefd9" />
      <path d="M196 396h8M194 424h12M192 456h16" stroke="#efe2c9" strokeWidth="4" strokeLinecap="round" />

      {/* кубики */}
      <g>
        <rect x="300" y="352" width="26" height="26" rx="5" fill="#ffd45c" />
        <rect x="326" y="352" width="26" height="26" rx="5" fill="#a9d3f7" />
        <rect x="313" y="326" width="26" height="26" rx="5" fill="#ff8f7e" />
        <text x="326" y="345" textAnchor="middle" fontFamily="var(--font-comfortaa), sans-serif" fontWeight="700" fontSize="15" fill="#fff">
          Ә
        </text>
      </g>

      {/* цветы */}
      {[
        [112, 410, "#ff8f7e"],
        [138, 430, "#7c62d8"],
        [270, 420, "#ffd45c"],
        [300, 440, "#ff8f7e"],
        [92, 448, "#ffd45c"],
      ].map(([x, y, c], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 0v14" stroke="#3ea36a" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="-4" cy="-2" r="4" fill={c as string} />
          <circle cx="4" cy="-2" r="4" fill={c as string} />
          <circle cx="0" cy="-6" r="4" fill={c as string} />
          <circle cx="0" cy="2" r="4" fill={c as string} />
          <circle cx="0" cy="-2" r="2.6" fill="#fff1c2" />
        </g>
      ))}

      {/* воздушные шарики */}
      <g className="motion-safe:animate-float" style={{ transformBox: "fill-box" }}>
        <path d="M352 236c-2 18 4 30 0 46" stroke="#5d5a6e" strokeOpacity=".5" strokeWidth="1.5" fill="none" />
        <ellipse cx="352" cy="220" rx="13" ry="16" fill="#ff8f7e" />
        <path d="M368 232c-4 18 0 32-12 48" stroke="#5d5a6e" strokeOpacity=".5" strokeWidth="1.5" fill="none" />
        <ellipse cx="372" cy="214" rx="11" ry="14" fill="#7c62d8" opacity=".85" />
      </g>
    </svg>
  );
}
