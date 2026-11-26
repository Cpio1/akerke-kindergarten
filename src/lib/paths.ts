/**
 * Единая точка формирования путей к файлам из public/.
 *
 * next/image с `unoptimized: true`, <img>, <video> и обычные ссылки НЕ добавляют
 * basePath сами, поэтому все локальные пути пропускаются через `asset()`.
 * Внешние ссылки (https://, tel:, mailto:, #якоря) возвращаются без изменений,
 * а уже префиксованный путь повторно не меняется.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (BASE_PATH && (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`))) return path;
  return `${BASE_PATH}${path}`;
}
