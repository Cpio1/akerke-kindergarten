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
const captions: Record<string, Record<Lang, string>> = {};

export function photoCaption(photo: Photo, lang: Lang): string | null {
  return captions[photo.name]?.[lang] ?? null;
}
