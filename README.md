# «С.АҚЕРКЕ» балабақшасы — лендинг

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Lucide. Публикуется на GitHub Pages: https://cpio1.github.io/akerke-kindergarten/

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # продакшн-сборка
```

## Где что менять

| Что | Файл |
| --- | --- |
| Телефоны, WhatsApp, Instagram, часы, точка 2GIS | `src/lib/site.ts` |
| Тексты (KZ / RU) | `src/lib/i18n/kk.ts`, `src/lib/i18n/ru.ts` |
| Документы | `src/lib/documents.ts` (+ PDF в `public/documents/`) |
| Подписи к фото | `src/lib/media.ts` → `captions` |

## Фотографии и видео

Подключаются автоматически при `npm run dev` / `npm run build` (скрипт `scripts/media-manifest.mjs`):

- `public/hero/main-page.jpg` (или `public/main-page.*`) — главное фото первого экрана. Пока его нет, показывается иллюстрация.
- `public/gallery/*.jpg|png|webp` — галерея (порядок по имени файла). Пока папка пуста, показывается аккуратная заглушка со ссылкой на Instagram.
- `main-page2.mp4|webm|mov` (+ необязательный `main-page2-poster.jpg`) — видео, первым элементом галереи.

## Документы

Пока массив `documents` пуст — раздел показывает «Құжаттар дайындалуда» без кнопок скачивания.
Добавьте объект `{ title: { kk, ru }, url, source: "pdf" | "cloud" | "link" }` — карточка появится сама.

## Карта

Точка взята из карточки организации в 2ГИС: «Акерке, частный детский сад, ТОО С. Ақерке»,
ул. Еспаева, 80/1, мкр Акбулак (43.255917, 76.827434, firm id `70000001038440091`).

## GitHub Pages

Каждый `git push` в `main` запускает `.github/workflows/deploy.yml`: сборка `npm run build`
→ статическая папка `out/` → публикация через `actions/deploy-pages`.

- `npm run dev` — локально без префикса: http://localhost:3000/
- `npm run build` — статический экспорт с префиксом `/akerke-kindergarten` в `out/`.
- Пути к файлам из `public/` формируются только через `asset()` из `src/lib/paths.ts`
  (фото из `src/lib/media.ts` уже префиксованы).
- Для собственного домена: `NEXT_PUBLIC_BASE_PATH=""` и `NEXT_PUBLIC_SITE_URL=https://домен`
  в шаге сборки workflow.
