/** Знак сада: солнышко-цветок с буквой «А». */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx="24" cy="9" rx="6" ry="8" fill={i % 2 ? "#ff8f7e" : "#ffd45c"} transform={`rotate(${i * 45} 24 24)`} />
      ))}
      <circle cx="24" cy="24" r="12.5" fill="#fffdf8" stroke="#2b2a3a" strokeOpacity=".12" />
      <text
        x="24"
        y="29.6"
        textAnchor="middle"
        fontFamily="var(--font-comfortaa), sans-serif"
        fontWeight="700"
        fontSize="16"
        fill="#3d8fd1"
      >
        А
      </text>
    </svg>
  );
}
