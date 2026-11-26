import type { NextConfig } from "next";

/**
 * Сайт публикуется на GitHub Pages как статический экспорт:
 *   https://cpio1.github.io/akerke-kindergarten/
 *
 * - `npm run dev`   → без префикса, http://localhost:3000/
 * - `npm run build` → статическая папка out/ с префиксом /akerke-kindergarten
 *
 * Префикс можно переопределить переменной окружения NEXT_PUBLIC_BASE_PATH
 * (например, пустой строкой для собственного домена).
 */
const isDev = process.env.NODE_ENV === "development";
const basePath = isDev ? "" : (process.env.NEXT_PUBLIC_BASE_PATH ?? "/akerke-kindergarten");

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  poweredByHeader: false,
  // Доступно в клиентском коде как process.env.NEXT_PUBLIC_BASE_PATH (см. src/lib/paths.ts)
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    // На GitHub Pages нет сервера оптимизации изображений — отдаём оригиналы.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
