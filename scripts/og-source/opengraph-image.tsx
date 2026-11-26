import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "«С.АҚЕРКЕ» балабақшасы — Алматы, Ақбұлақ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const dir = path.join(process.cwd(), "src/app/_og");
  const [comfortaa, nunito] = await Promise.all([
    readFile(path.join(dir, "Comfortaa-700.ttf")),
    readFile(path.join(dir, "Nunito-700.ttf")),
  ]);

  const petals = Array.from({ length: 8 }, (_, i) => i);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(180deg, #e9f5ff 0%, #fff8ec 70%)",
          padding: "0 80px",
          fontFamily: "Nunito",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 740 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "#ffffff",
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 28,
              color: "#5d5a6e",
            }}
          >
            Алматы · Ақбұлақ шағынауданы
          </div>
          <div style={{ display: "flex", fontFamily: "Comfortaa", fontSize: 84, color: "#3d8fd1", marginTop: 26 }}>
            «С.АҚЕРКЕ»
          </div>
          <div style={{ display: "flex", fontFamily: "Comfortaa", fontSize: 46, color: "#2b2a3a", marginTop: 6 }}>
            балабақшасы
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#5d5a6e", marginTop: 26, lineHeight: 1.35 }}>
            3–5 жас аралығындағы балаларға арналған қазақ тіліндегі балабақша
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 30 }}>
            {[
              ["3 топ", "#fff1c2", "#8a5a00"],
              ["4 мезгіл тамақтану", "#e8f7e3", "#22704a"],
              ["08:00–18:30", "#d7ecff", "#1d5a8f"],
            ].map(([label, bg, fg]) => (
              <div key={label} style={{ display: "flex", background: bg, color: fg, borderRadius: 999, padding: "10px 22px", fontSize: 28 }}>
                {label}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", position: "absolute", right: 90, top: 155, width: 320, height: 320 }}>
          {petals.map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 120,
                top: 0,
                width: 80,
                height: 130,
                borderRadius: 999,
                background: i % 2 ? "#ff8f7e" : "#ffd45c",
                transformOrigin: "40px 160px",
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              left: 75,
              top: 75,
              width: 170,
              height: 170,
              borderRadius: 999,
              background: "#fffdf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Comfortaa",
              fontSize: 110,
              color: "#3d8fd1",
            }}
          >
            А
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Comfortaa", data: comfortaa, weight: 700, style: "normal" },
        { name: "Nunito", data: nunito, weight: 700, style: "normal" },
      ],
    },
  );
}

export const dynamic = "force-static";
