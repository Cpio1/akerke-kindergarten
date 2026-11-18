import manifest from "@/generated/media.json";
import type { Lang } from "@/lib/i18n";

/**
 * Фотографии подключаются автоматически:
 *  - public/hero/main-page.(jpg|jpeg|png|webp) или public/main-page.* — главное фото первого экрана;
 *  - public/gallery/* — фотографии галереи (сортировка по имени файла);
 *  - main-page2.(mp4|webm|mov) — видео, показывается первым в галерее.
 * Список пересобирается командой `node scripts/media-manifest.mjs` (запускается перед dev и build).
 */
export type Photo = { name: string; src: string; width: number; height: number };
export type Video = { src: string; poster: string | null };

export const heroPhoto = manifest.hero as Photo | null;
export const heroVideo = manifest.video as Video | null;
export const galleryPhotos = manifest.gallery as Photo[];

/** Подписи к фотографиям по имени файла (необязательно). */
const captions: Record<string, Record<Lang, string>> = {
  "main-page.jpeg": { kk: "«Қош бол, балабақша!» мерекесі", ru: "Выпускной праздник «Қош бол, балабақша!»" },
  "image1.jpeg": { kk: "Балшықпен шығармашылық", ru: "Творчество с глиной" },
  "image2.jpeg": { kk: "Тақырыптық мереке: шай үстелінде", ru: "Тематический праздник: чаепитие" },
  "image3.jpeg": { kk: "Эйфель мұнарасының жанында", ru: "У Эйфелевой башни" },
  "image4.jpeg": { kk: "«Алтын күз!» мерекесі", ru: "Праздник «Алтын күз!» (Золотая осень)" },
  "image5.jpeg": { kk: "Ағаш текшелерден биік мұнара", ru: "Высокая башня из деревянных кубиков" },
  "image6.jpeg": { kk: "Дамытушы ойын", ru: "Развивающая игра" },
  "image7.jpeg": { kk: "Мамандықтармен танысу", ru: "Знакомство с профессиями" },
  "image8.jpeg": { kk: "Ұлттық киімдер, Қазақстан туының аясында", ru: "В национальных костюмах на фоне флага Казахстана" },
  "image9.jpeg": { kk: "Жаңа жыл мерекесі", ru: "Новогодний праздник" },
};

export function photoCaption(photo: Photo, lang: Lang): string | null {
  return captions[photo.name]?.[lang] ?? null;
}
