/**
 * Подтверждённые данные детского сада «С.АҚЕРКЕ».
 * Все кнопки, ссылки, карта и SEO берут данные только отсюда.
 */
export const site = {
  name: "С.АҚЕРКЕ",
  legalName: "ТОО «С.АҚЕРКЕ»",
  phones: [
    { display: "+7 771 489 16 15", href: "tel:+77714891615", whatsapp: true },
    { display: "+7 707 282 26 65", href: "tel:+77072822665", whatsapp: false },
  ],
  whatsappNumber: "77714891615",
  hours: "08:00–18:30",
  instagramUrl: "https://www.instagram.com/balabaqsha_akerke/",
  instagramHandle: "@balabaqsha_akerke",
  /**
   * Точка из карточки организации в 2ГИС
   * («Акерке, частный детский сад, ТОО С. Ақерке», ул. Еспаева, 80/1, мкр Акбулак, Алатауский район).
   */
  geo: { lat: 43.255917, lon: 76.827434 },
  twoGisFirmId: "70000001038440091",
} as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Встраиваемый виджет 2ГИС с карточкой организации. */
export function twoGisEmbedUrl() {
  const options = {
    pos: { lat: site.geo.lat, lon: site.geo.lon, zoom: 16 },
    opt: { city: "almaty" },
    org: site.twoGisFirmId,
  };
  return `https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(JSON.stringify(options))}`;
}

export function twoGisFirmUrl(lang: "kk" | "ru") {
  return `https://2gis.kz/${lang === "kk" ? "kk/" : ""}almaty/firm/${site.twoGisFirmId}`;
}

/** Маршрут до детского сада: точка «откуда» выбирается в 2ГИС. */
export function twoGisRouteUrl(lang: "kk" | "ru") {
  return `https://2gis.kz/${lang === "kk" ? "kk/" : ""}almaty/directions/points/%7C${site.geo.lon}%2C${site.geo.lat}%3B${site.twoGisFirmId}`;
}
