"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, Expand, Play, Sparkles, X } from "lucide-react";
import { useLang, useT } from "@/lib/i18n";
import { galleryPhotos, heroVideo, photoCaption, type Photo, type Video } from "@/lib/media";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Cloud, Deco, Flower, Sparkle, Star } from "@/components/decor/Shapes";

type Item = { kind: "photo"; photo: Photo } | { kind: "video"; video: Video };
type Shape = "wide" | "tall";

const isWide = (item: Item) => item.kind === "photo" && item.photo.width / item.photo.height >= 1.15;

/**
 * Bento-раскладка для десктопа: сетка 6 колонок, блоки по 9 фото
 *   [ш ш][в][в][ш ш]
 *   [в][в][ш ш][в][в]
 * ш — горизонтальное фото 2×2, в — вертикальное 1×2. Блок заполняет 6×4 ячейки без пустот.
 * Фото раскладываются по форме, чтобы обрезка была минимальной.
 */
const PATTERN: Shape[] = ["wide", "tall", "tall", "wide", "tall", "tall", "wide", "tall", "tall"];

function arrange(list: Item[]): { item: Item; shape: Shape }[] {
  const wide = list.filter(isWide);
  const tall = list.filter((i) => !isWide(i));
  const out: { item: Item; shape: Shape }[] = [];
  let k = 0;
  while (wide.length || tall.length) {
    const shape = PATTERN[k % PATTERN.length];
    const item = (shape === "wide" ? wide.shift() ?? tall.shift() : tall.shift() ?? wide.shift()) as Item;
    out.push({ item, shape });
    k++;
  }
  return out;
}

const tiles = arrange([
  ...(heroVideo ? [{ kind: "video" as const, video: heroVideo }] : []),
  ...galleryPhotos.map((photo) => ({ kind: "photo" as const, photo })),
]);
/** Порядок просмотра в лайтбоксе и на телефоне совпадает с порядком мозаики. */
const items: Item[] = tiles.map((t) => t.item);

/** Десктоп: один полный блок (9 фото), остальное — по кнопке. Планшет: 6 фото. */
const DESKTOP_LIMIT = PATTERN.length;
const TABLET_LIMIT = 6;

export function Gallery() {
  const t = useT();
  const g = t.gallery;
  const [index, setIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const opener = useRef<HTMLElement | null>(null);

  const open = (i: number) => (e: React.MouseEvent<HTMLElement>) => {
    opener.current = e.currentTarget;
    setIndex(i);
  };
  const close = useCallback(() => {
    setIndex(null);
    requestAnimationFrame(() => opener.current?.focus());
  }, []);

  // полные блоки по 9 — без пустых ячеек; «хвост» показывается отдельным рядом
  const fullBlocks = Math.floor(tiles.length / PATTERN.length) * PATTERN.length;
  const desktopTiles = expanded ? tiles.slice(0, Math.max(fullBlocks, DESKTOP_LIMIT)) : tiles.slice(0, DESKTOP_LIMIT);
  const desktopTail = expanded ? tiles.slice(Math.max(fullBlocks, DESKTOP_LIMIT)) : [];
  const tabletTiles = expanded ? tiles : tiles.slice(0, TABLET_LIMIT);

  const moreButton = (limit: number, className: string) =>
    items.length > limit ? (
      <div className={`mt-5 justify-center ${className}`}>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="h-12 rounded-full border-2 border-ink/10 bg-white px-6 font-bold text-ink transition-colors hover:border-sun hover:bg-sun-soft"
        >
          {expanded ? g.showLess : `${g.showMore} (${items.length - limit})`}
        </button>
      </div>
    ) : null;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section bg-paper">
      <Deco className="top-10 right-[5%] w-14 motion-safe:animate-drift sm:w-16">
        <Cloud />
      </Deco>
      <Deco className="bottom-10 left-[3%] hidden w-7 md:block">
        <Flower petal="#a9d3f7" />
      </Deco>

      <div className="container-x">
        <SectionHeading id="gallery-title" number="05" eyebrow={g.eyebrow} title={g.title} lead={g.lead} tone="sun" />

        {items.length === 0 ? (
          <EmptyGallery />
        ) : (
          <>
            {/* Телефон: лента со свайпом */}
            <MobileStrip onOpen={open} />

            {/* Планшет: аккуратная сетка 3 колонки */}
            <ul data-float-avoid className="mt-8 hidden grid-cols-3 gap-3 md:grid lg:hidden">
              {tabletTiles.map(({ item }, i) => (
                <li key={tileKey(item)} className="reveal aspect-[4/5]" style={{ ["--d" as string]: `${(i % 3) * 60}ms` }}>
                  <Tile item={item} index={i} onOpen={open(i)} size="(min-width: 768px) 240px, 33vw" />
                </li>
              ))}
            </ul>
            {moreButton(TABLET_LIMIT, "hidden md:flex lg:hidden")}

            {/* Десктоп: bento-мозаика */}
            <ul data-float-avoid className="mt-7 hidden auto-rows-[clamp(88px,min(7.8vw,calc((100svh_-_320px)_/_4)),112px)] grid-cols-6 gap-3 lg:grid xl:gap-4">
              {desktopTiles.map(({ item, shape }, i) => (
                <li
                  key={tileKey(item)}
                  className={`reveal ${shape === "wide" ? "col-span-2 row-span-2" : "row-span-2"}`}
                  style={{ ["--d" as string]: `${(i % 9) * 50}ms` }}
                >
                  <Tile
                    item={item}
                    index={i}
                    onOpen={open(i)}
                    wide={shape === "wide"}
                    size={shape === "wide" ? "(min-width: 1240px) 400px, 32vw" : "(min-width: 1240px) 200px, 16vw"}
                  />
                </li>
              ))}
              {desktopTail.map(({ item }, j) => {
                const i = desktopTiles.length + j;
                return (
                  <li key={tileKey(item)} className="reveal row-span-2">
                    <Tile item={item} index={i} onOpen={open(i)} size="(min-width: 1240px) 200px, 16vw" />
                  </li>
                );
              })}
            </ul>
            {moreButton(DESKTOP_LIMIT, "hidden lg:flex")}
          </>
        )}
      </div>

      {index !== null ? <Lightbox index={index} setIndex={setIndex} onClose={close} /> : null}
    </section>
  );
}

function tileKey(item: Item) {
  return item.kind === "photo" ? item.photo.src : item.video.src;
}

function Tile({
  item,
  index,
  onOpen,
  size,
  wide = false,
}: {
  item: Item;
  index: number;
  onOpen: (e: React.MouseEvent<HTMLElement>) => void;
  size: string;
  wide?: boolean;
}) {
  const t = useT();
  const [lang] = useLang();
  const label =
    item.kind === "photo"
      ? (photoCaption(item.photo, lang) ?? `${t.gallery.photo} ${index + 1}`)
      : t.gallery.video;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${t.gallery.open}: ${label}`}
      className={`group relative block h-full w-full overflow-hidden bg-cream-deep ring-4 ring-white shadow-[0_12px_26px_-18px_rgba(43,42,58,0.55)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-0.6deg] ${
        wide ? "rounded-[28px]" : "rounded-[22px]"
      }`}
    >
      {item.kind === "photo" ? (
        <Image
          src={item.photo.src}
          alt={label}
          fill
          quality={70}
          sizes={size}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
      ) : (
        <VideoPoster video={item.video} fill />
      )}
      {/* подпись: на широких карточках всегда, на остальных — при наведении/фокусе */}
      <span
        className={`pointer-events-none absolute inset-x-2 bottom-2 flex items-end justify-between gap-2 transition-opacity duration-300 ${
          wide ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        }`}
      >
        <span className="line-clamp-2 rounded-2xl bg-white/92 px-3 py-1.5 text-left text-[12.5px] leading-snug font-bold text-ink shadow-sm">
          {label}
        </span>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sun text-ink shadow-sm">
          <Expand className="h-4 w-4" aria-hidden="true" />
        </span>
      </span>
    </button>
  );
}

function VideoPoster({ video, fill = false }: { video: Video; fill?: boolean }) {
  return (
    <span className={`relative block w-full ${fill ? "h-full" : "aspect-[4/5]"} bg-[linear-gradient(135deg,#d7ecff,#e4dcff)]`}>
      {video.poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={video.poster} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      ) : null}
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-coral-deep shadow-lg">
          <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true" />
        </span>
      </span>
    </span>
  );
}

/* ---------- мобильная лента ---------- */
function MobileStrip({ onOpen }: { onOpen: (i: number) => (e: React.MouseEvent<HTMLElement>) => void }) {
  const t = useT();
  const [lang] = useLang();
  const strip = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);

  // активный слайд — тот, чей центр ближе к центру ленты
  const onScroll = () => {
    const el = strip.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let dist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const li = c as HTMLElement;
      const d = Math.abs(li.offsetLeft + li.offsetWidth / 2 - mid);
      if (d < dist) {
        dist = d;
        best = i;
      }
    });
    setCurrent(best);
  };
  const goTo = (i: number) => {
    const el = strip.current;
    const li = el?.children[i] as HTMLElement | undefined;
    if (!el || !li) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: li.offsetLeft - (el.clientWidth - li.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div data-float-avoid className="mt-6 md:hidden">
      {/* одинаковая высота, ширина — по пропорциям фото (не шире экрана) */}
      <ul
        ref={strip}
        onScroll={onScroll}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto overscroll-x-contain px-4 py-1 sm:-mx-6 sm:px-6"
      >
        {items.map((item, i) => {
          const label =
            item.kind === "photo"
              ? (photoCaption(item.photo, lang) ?? `${t.gallery.photo} ${i + 1}`)
              : t.gallery.video;
          const ratio = item.kind === "photo" ? item.photo.width / item.photo.height : 4 / 5;
          return (
            <li
              key={tileKey(item)}
              className="h-[clamp(240px,min(46svh,88vw),360px)] max-w-[calc(100vw-48px)] shrink-0 snap-center"
              style={{ aspectRatio: String(ratio) }}
            >
              <button
                type="button"
                onClick={onOpen(i)}
                aria-label={`${t.gallery.open}: ${label}`}
                className="relative block h-full w-full overflow-hidden rounded-[24px] bg-cream-deep ring-4 ring-white"
              >
                {item.kind === "photo" ? (
                  <Image src={item.photo.src} alt={label} fill quality={70} sizes="(max-width: 767px) 90vw, 1px" className="object-cover" />
                ) : (
                  <VideoPoster video={item.video} fill />
                )}
                <span className="pointer-events-none absolute inset-x-2 bottom-2 flex">
                  <span className="line-clamp-2 rounded-2xl bg-white/92 px-2.5 py-1 text-left text-[12px] leading-snug font-bold text-ink shadow-sm">
                    {label}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {items.length > 1 ? (
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-hand text-[20px] leading-none font-bold text-ink-soft" aria-live="polite">
              {current + 1} {t.gallery.of} {items.length}
              <span className="max-[359px]:hidden"> · {t.gallery.swipeHint}</span>
            </p>
            <div aria-hidden="true" className="mt-2 flex flex-wrap gap-1.5">
              {items.map((item, i) => (
                <span
                  key={tileKey(item)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-5 bg-sun-deep" : "w-1.5 bg-line"}`}
                />
              ))}
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              aria-label={t.gallery.prev}
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-sm disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              disabled={current >= items.length - 1}
              aria-label={t.gallery.next}
              className="grid h-11 w-11 place-items-center rounded-full bg-sun text-ink shadow-sm disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ---------- полноэкранный просмотр ---------- */
function Lightbox({
  index,
  setIndex,
  onClose,
}: {
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
}) {
  const t = useT();
  const [lang] = useLang();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const [dx, setDx] = useState(0);
  const total = items.length;
  const item = items[index];

  const go = useCallback((dir: 1 | -1) => setIndex((index + dir + total) % total), [index, setIndex, total]);

  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    document.body.dataset.lightbox = "open";
    closeBtn.current?.focus();
    return () => {
      root.style.overflow = prev;
      delete document.body.dataset.lightbox;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && total > 1) go(1);
      else if (e.key === "ArrowLeft" && total > 1) go(-1);
      else if (e.key === "Tab" && dialog.current) {
        // удерживаем фокус внутри окна
        const f = dialog.current.querySelectorAll<HTMLElement>("button, video, a[href]");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose, total]);

  const caption =
    item.kind === "photo" ? (photoCaption(item.photo, lang) ?? `${t.gallery.photo} ${index + 1}`) : t.gallery.video;

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`${t.gallery.title}: ${caption}`}
      className="fixed inset-0 z-[90] flex flex-col bg-[#1d1c29]/95 text-white backdrop-blur-sm"
    >
      {/* верхняя панель */}
      <div className="flex shrink-0 items-center justify-between gap-3 px-4 pt-[max(12px,env(safe-area-inset-top))] pb-2 sm:px-6">
        <span className="font-display text-[15px] font-bold tabular-nums">
          {index + 1} {t.gallery.of} {total}
        </span>
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label={t.gallery.close}
          className="grid h-12 w-12 place-items-center rounded-full bg-white/12 transition-colors hover:bg-white/20"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* изображение: всегда целиком в доступной области */}
      <div
        className="relative min-h-0 flex-1 touch-pan-y select-none"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") return;
          start.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerMove={(e) => {
          if (!start.current) return;
          setDx(e.clientX - start.current.x);
        }}
        onPointerUp={(e) => {
          if (!start.current) return;
          const ddx = e.clientX - start.current.x;
          const ddy = e.clientY - start.current.y;
          start.current = null;
          setDx(0);
          if (total > 1 && Math.abs(ddx) > 50 && Math.abs(ddx) > Math.abs(ddy)) go(ddx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => {
          start.current = null;
          setDx(0);
        }}
      >
        <div
          className="absolute inset-x-3 inset-y-2 transition-transform duration-200 sm:inset-x-20 md:inset-x-24"
          style={{ transform: dx ? `translateX(${dx}px)` : undefined, transitionDuration: dx ? "0ms" : undefined }}
        >
          {item.kind === "photo" ? (
            <Image
              key={item.photo.src}
              src={item.photo.src}
              alt={caption}
              fill
              quality={80}
              sizes="100vw"
              className="object-contain"
              draggable={false}
              loading="eager"
            />
          ) : (
            <video
              key={item.video.src}
              src={item.video.src}
              poster={item.video.poster ?? undefined}
              controls
              playsInline
              preload="metadata"
              className="absolute inset-0 m-auto max-h-full max-w-full rounded-xl"
            />
          )}
        </div>

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t.gallery.prev}
              className="absolute top-1/2 left-4 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/12 transition-colors hover:bg-white/25 sm:grid md:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t.gallery.next}
              className="absolute top-1/2 right-4 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/12 transition-colors hover:bg-white/25 sm:grid md:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        ) : null}
      </div>

      {/* нижняя панель (на телефоне — стрелки здесь, в безопасной зоне) */}
      <div className="flex shrink-0 items-center justify-between gap-3 px-4 pt-2 pb-[max(14px,env(safe-area-inset-bottom))] sm:justify-center sm:px-6">
        {total > 1 ? (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t.gallery.prev}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/12 sm:hidden"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        ) : null}
        <p className="line-clamp-2 min-w-0 text-center text-[14px] text-white/80">{caption}</p>
        {total > 1 ? (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t.gallery.next}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/12 sm:hidden"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

/* ---------- пустое состояние (реальных фото пока нет) ---------- */
function EmptyGallery() {
  const t = useT();
  const g = t.gallery;
  const frames = [
    { bg: "bg-sky", rot: "-rotate-6", icon: <Camera className="h-7 w-7 text-sky-deep" /> },
    { bg: "bg-sun-soft", rot: "rotate-3", icon: <Star className="h-8 w-8" /> },
    { bg: "bg-coral-soft", rot: "-rotate-2", icon: <Sparkles className="h-7 w-7 text-coral-deep" /> },
  ];
  return (
    <div className="reveal mt-7 grid items-center gap-6 rounded-[32px] border-2 border-dashed border-line bg-cream p-5 sm:mt-9 sm:p-8 md:grid-cols-[auto_1fr] md:gap-10 lg:p-10">
      <div aria-hidden="true" className="relative mx-auto flex h-36 w-[250px] items-center justify-center sm:h-44 sm:w-[300px]">
        {frames.map((f, i) => (
          <div
            key={i}
            className={`absolute grid h-28 w-24 place-items-start rounded-[14px] bg-white p-2 pb-6 shadow-[0_10px_20px_-12px_rgba(43,42,58,0.4)] sm:h-36 sm:w-30 ${f.rot}`}
            style={{ left: `${i * 30}%`, zIndex: i === 1 ? 2 : 1, top: i === 1 ? 0 : 14 }}
          >
            <div className={`grid h-full w-full place-items-center rounded-[10px] ${f.bg}`}>{f.icon}</div>
          </div>
        ))}
        <Sparkle className="absolute -top-2 right-0 h-5 w-5 motion-safe:animate-twinkle" fill="#7c62d8" />
      </div>
      <div className="text-center md:text-left">
        <h3 className="text-[19px] leading-snug font-bold text-ink sm:text-[22px]">{g.emptyTitle}</h3>
        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-ink-soft md:mx-0">{g.emptyText}</p>
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex h-12 items-center gap-2 rounded-full bg-[linear-gradient(135deg,#7c62d8,#e85a4a_60%,#e9a300)] px-6 font-extrabold text-white shadow-[0_6px_18px_-8px_rgba(124,98,216,0.7)] transition-transform hover:-translate-y-0.5"
        >
          <InstagramIcon className="h-5 w-5" />
          {g.emptyCta}
          <span className="sr-only">({t.a11y.newTab})</span>
        </a>
      </div>
    </div>
  );
}
