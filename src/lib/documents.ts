/**
 * Официальные документы детского сада.
 *
 * Пока массив пуст, в разделе «Құжаттар» показывается аккуратное пустое состояние
 * без кнопок скачивания. Чтобы добавить документ, допишите объект:
 *
 *   {
 *     title: { kk: "Жарғы", ru: "Устав" },
 *     url: "/documents/ustav.pdf",          // файл из public/documents/
 *     source: "pdf",
 *   },
 *   {
 *     title: { kk: "Лицензия", ru: "Лицензия" },
 *     url: "https://drive.google.com/file/d/.../view",
 *     source: "cloud",
 *   },
 *
 * source: "pdf" | "cloud" | "link".
 */
export type DocumentSource = "pdf" | "cloud" | "link";

export type DocumentItem = {
  title: { kk: string; ru: string };
  url: string;
  source: DocumentSource;
};

export const documents: DocumentItem[] = [];
