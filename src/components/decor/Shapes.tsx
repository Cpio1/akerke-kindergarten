/**
 * Небольшие декоративные фигурки (собственные SVG).
 * Все фигурки — aria-hidden и pointer-events-none через <Deco>.
 */
import type { CSSProperties, ReactNode, SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export function Cloud(props: P) {
  return (
    <svg viewBox="0 0 64 40" fill="none" {...props}>
      <path
        d="M14 38h38a11 11 0 0 0 1.6-21.9A15 15 0 0 0 25 11.6 10.5 10.5 0 0 0 14 38Z"
        fill="#fff"
        stroke="#a9d3f7"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M22 30c3 1.6 6 1.6 9 0" stroke="#d7ecff" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function Star({ fill = "#ffd45c", ...props }: P & { fill?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M16 2.5c1.1 0 1.7 4.8 3.4 7.6 1.6 2.6 9.6 3.1 9.6 5.1s-6.5 3.7-7.6 6.2c-1.3 2.9.1 8.1-1.6 8.1-1.6 0-2.4-4.5-3.8-4.5s-2.2 4.5-3.8 4.5c-1.7 0-.3-5.2-1.6-8.1C9.5 18.9 3 17.2 3 15.2s8-2.5 9.6-5.1C14.3 7.3 14.9 2.5 16 2.5Z"
        fill={fill}
        stroke="#2b2a3a"
        strokeOpacity=".12"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ fill = "#7c62d8", ...props }: P & { fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 1.5c.7 5.6 4.9 9.8 10.5 10.5-5.6.7-9.8 4.9-10.5 10.5C11.3 16.9 7.1 12.7 1.5 12 7.1 11.3 11.3 7.1 12 1.5Z" fill={fill} />
    </svg>
  );
}

export function Sun(props: P) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <g stroke="#e9a300" strokeWidth="3.2" strokeLinecap="round">
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i * Math.PI * 2) / 10;
          const x1 = 32 + Math.cos(a) * 21;
          const y1 = 32 + Math.sin(a) * 21;
          const x2 = 32 + Math.cos(a) * 28;
          const y2 = 32 + Math.sin(a) * 28;
          return <line key={i} x1={x1.toFixed(2)} y1={y1.toFixed(2)} x2={x2.toFixed(2)} y2={y2.toFixed(2)} />;
        })}
      </g>
      <circle cx="32" cy="32" r="15" fill="#ffd45c" stroke="#e9a300" strokeWidth="2.4" />
      <circle cx="27" cy="30" r="1.8" fill="#2b2a3a" />
      <circle cx="37" cy="30" r="1.8" fill="#2b2a3a" />
      <path d="M27 36c3 2.6 7 2.6 10 0" stroke="#2b2a3a" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="35" r="2.2" fill="#ff8f7e" opacity=".6" />
      <circle cx="40" cy="35" r="2.2" fill="#ff8f7e" opacity=".6" />
    </svg>
  );
}

export function Rainbow(props: P) {
  return (
    <svg viewBox="0 0 72 40" fill="none" {...props}>
      <path d="M6 38a30 30 0 0 1 60 0" stroke="#ff8f7e" strokeWidth="6" strokeLinecap="round" />
      <path d="M14 38a22 22 0 0 1 44 0" stroke="#ffd45c" strokeWidth="6" strokeLinecap="round" />
      <path d="M22 38a14 14 0 0 1 28 0" stroke="#3ea36a" strokeOpacity=".7" strokeWidth="6" strokeLinecap="round" />
      <path d="M30 38a6 6 0 0 1 12 0" stroke="#7c62d8" strokeOpacity=".7" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export function Flower({ petal = "#ff8f7e", ...props }: P & { petal?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={i} cx="20" cy="10.5" rx="5.6" ry="8" fill={petal} transform={`rotate(${i * 60} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="5.5" fill="#ffd45c" stroke="#e9a300" strokeWidth="1.6" />
    </svg>
  );
}

export function Pencil(props: P) {
  return (
    <svg viewBox="0 0 64 20" fill="none" {...props}>
      <rect x="10" y="3" width="40" height="14" rx="2" fill="#ffd45c" stroke="#e9a300" strokeWidth="1.6" />
      <path d="M10 8h40M10 12h40" stroke="#e9a300" strokeOpacity=".45" strokeWidth="1.2" />
      <rect x="4" y="3" width="8" height="14" rx="3" fill="#ff8f7e" />
      <rect x="10" y="3" width="4" height="14" fill="#c9c2d9" />
      <path d="M50 3l11 7-11 7V3Z" fill="#f6dcb6" stroke="#e9a300" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M57.5 7.8 61 10l-3.5 2.2V7.8Z" fill="#2b2a3a" />
    </svg>
  );
}

export function Balloon({ fill = "#ff8f7e", ...props }: P & { fill?: string }) {
  return (
    <svg viewBox="0 0 30 56" fill="none" {...props}>
      <path d="M15 34c-7.2 0-12-7.1-12-14.4C3 11.6 8.4 4 15 4s12 7.6 12 15.6C27 26.9 22.2 34 15 34Z" fill={fill} />
      <path d="M9.5 13.5c1-3 3-4.6 5-5.3" stroke="#fff" strokeOpacity=".7" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M13 34h4l-2 3-2-3Z" fill={fill} />
      <path d="M15 37c-3 4 3 7 0 11s2 5 0 7" stroke="#5d5a6e" strokeOpacity=".5" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function Leaf({ fill = "#3ea36a", ...props }: P & { fill?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <path d="M6 34C6 16 18 6 34 6c0 16-10 28-28 28Z" fill={fill} fillOpacity=".85" />
      <path d="M8 32C16 24 22 18 30 10" stroke="#fff" strokeOpacity=".7" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Heart({ fill = "#ff8f7e", ...props }: P & { fill?: string }) {
  return (
    <svg viewBox="0 0 32 30" fill="none" {...props}>
      <path d="M16 28S2.5 19.6 2.5 10.2A7 7 0 0 1 16 7.4a7 7 0 0 1 13.5 2.8C29.5 19.6 16 28 16 28Z" fill={fill} />
    </svg>
  );
}

export function Squiggle({ stroke = "#7c62d8", ...props }: P & { stroke?: string }) {
  return (
    <svg viewBox="0 0 80 16" fill="none" {...props}>
      <path
        d="M2 8c6-8 12-8 18 0s12 8 18 0 12-8 18 0 12 8 18 0"
        stroke={stroke}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Ring({ stroke = "#3d8fd1", ...props }: P & { stroke?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke={stroke} strokeWidth="3.4" />
    </svg>
  );
}

export function Triangle({ fill = "#3ea36a", ...props }: P & { fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3.5 21 19a1 1 0 0 1-.9 1.5H3.9A1 1 0 0 1 3 19L12 3.5Z" fill={fill} />
    </svg>
  );
}

export function Moon(props: P) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <path d="M21 3.5A13 13 0 1 0 28.5 22 10.5 10.5 0 0 1 21 3.5Z" fill="#e4dcff" stroke="#7c62d8" strokeWidth="2" />
    </svg>
  );
}

/**
 * Обёртка для позиционирования декора.
 * Только абсолютная позиция внутри секции с overflow: clip — не влияет на ширину/высоту страницы.
 */
export function Deco({
  className = "",
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute select-none ${className}`} style={style}>
      {children}
    </span>
  );
}
