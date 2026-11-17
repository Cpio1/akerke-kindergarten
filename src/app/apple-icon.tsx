import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#fff8ec", position: "relative" }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 66,
              top: 10,
              width: 48,
              height: 70,
              borderRadius: 999,
              background: i % 2 ? "#ff8f7e" : "#ffd45c",
              transformOrigin: "24px 80px",
              transform: `rotate(${i * 45}deg)`,
            }}
          />
        ))}
        <div style={{ position: "absolute", left: 42, top: 42, width: 96, height: 96, borderRadius: 999, background: "#fffdf8", display: "flex" }} />
        <svg width="180" height="180" viewBox="0 0 48 48" style={{ position: "absolute", left: 0, top: 0 }}>
          <path d="M18.6 31 24 16.5 29.4 31M20.4 26.4h7.2" fill="none" stroke="#3d8fd1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size,
  );
}
