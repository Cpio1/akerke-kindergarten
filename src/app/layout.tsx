import type { Metadata, Viewport } from "next";
import { Caveat, Comfortaa, Nunito } from "next/font/google";
import { kk } from "@/lib/i18n/kk";
import { ru } from "@/lib/i18n/ru";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// cyrillic-ext обязателен для казахских букв Ә Ғ Қ Ң Ө Ұ Ү Һ І
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["600", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  // Только домен: Next сам добавляет basePath к путям картинок (opengraph-image, иконки).
  metadataBase: new URL(new URL(SITE_URL).origin),
  title: kk.meta.title,
  description: kk.meta.description,
  applicationName: "С.АҚЕРКЕ",
  keywords: [
    "С.АҚЕРКЕ",
    "Ақерке балабақшасы",
    "балабақша Алматы",
    "балабақша Ақбұлақ",
    "қазақ тілді балабақша",
    "детский сад Акбулак",
    "детский сад Алатауский район",
    "частный детский сад Алматы",
    "Еспаева 80/1",
  ],
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: kk.meta.title,
    description: kk.meta.description,
    siteName: "«С.АҚЕРКЕ» балабақшасы",
    locale: "kk_KZ",
    alternateLocale: ["ru_RU"],
    type: "website",
    url: `${SITE_URL}/`,
  },
  twitter: { card: "summary_large_image", title: kk.meta.title, description: ru.meta.description },
  robots: { index: true, follow: true },
  other: { "geo.region": "KZ-75", "geo.placename": "Алматы", "geo.position": "43.255917;76.827434" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "only light",
  themeColor: "#fff8ec",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="kk"
      className={`${nunito.variable} ${comfortaa.variable} ${caveat.variable} antialiased`}
      style={{ colorScheme: "only light" }}
      suppressHydrationWarning
    >
      <head>
        {/* Анимации появления включаются только при работающем JS */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
