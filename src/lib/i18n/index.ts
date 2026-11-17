"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { kk, type Dict } from "./kk";
import { ru } from "./ru";

export type Lang = "kk" | "ru";

const STORAGE_KEY = "akerke-lang";
const EVENT = "akerke-lang-change";
const dictionaries: Record<Lang, Dict> = { kk, ru };

function read(): Lang {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "ru" ? "ru" : "kk";
  } catch {
    return "kk";
  }
}

let memoryLang: Lang | null = null;

function snapshot(): Lang {
  return memoryLang ?? read();
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** Текущий язык. На сервере всегда казахский; выбор сохраняется в localStorage. */
export function useLang(): [Lang, (lang: Lang) => void] {
  const lang = useSyncExternalStore(subscribe, snapshot, () => "kk" as Lang);
  const setLang = useCallback((next: Lang) => {
    memoryLang = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* приватный режим — язык держится до перезагрузки */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return [lang, setLang];
}

export function useT(): Dict {
  const [lang] = useLang();
  return dictionaries[lang];
}

/** Синхронизирует <html lang> и заголовок вкладки с выбранным языком. */
export function useDocumentLang() {
  const [lang] = useLang();
  useEffect(() => {
    document.documentElement.lang = lang === "ru" ? "ru" : "kk";
    const title = dictionaries[lang].meta.title;
    const apply = () => {
      if (document.title !== title) document.title = title;
    };
    apply();
    // Next.js выставляет <title> из metadata после гидрации — возвращаем заголовок выбранного языка
    const mo = new MutationObserver(apply);
    mo.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => mo.disconnect();
  }, [lang]);
}

export type { Dict };
