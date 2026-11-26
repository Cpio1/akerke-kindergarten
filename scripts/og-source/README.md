Исходники картинок `src/app/apple-icon.png` и `src/app/opengraph-image.png`.

Статический экспорт для GitHub Pages сохраняет динамические `apple-icon`/`opengraph-image`
без расширения файла (и без basePath в ссылке apple-icon), поэтому в `src/app` лежат готовые PNG.
Чтобы перерисовать: временно скопируйте `.tsx` и папку `_og` из этой папки в `src/app/`, удалите там PNG,
запустите `npm run build`, возьмите `out/apple-icon` и `out/opengraph-image` как новые PNG и верните всё обратно.
