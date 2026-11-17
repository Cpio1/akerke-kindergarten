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

const items: Item[] = [
  ...(heroVideo ? [{ kind: "video" as const, video: heroVideo }] : []),
  ...galleryPhotos.map((photo) => ({ kind: "photo" as const, photo })),
];

/** Десктоп: крупное фото 2×2 + 4 маленьких = ровно два ряда; остальное — по кнопке. */
const DESKTOP_LIMIT = 5;

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

  const visible = expanded ? items : items.slice(0, DESKTOP_LIMIT);

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
            {/* Мобильная лента со свайпом */}
            <MobileStrip onOpen={open} />

            {/* Десктоп/планшет: компактная мозаика */}
            <ul className="mt-9 hidden auto-rows-[clamp(130px,14vw,196px)] grid-cols-4 gap-3 md:grid lg:gap-4">
              {visible.map((item, i) => (
                <li
                  key={tileKey(item)}
                  className={`reveal ${i === 0 ? "col-span-2 row-span-2" : ""}`}
                  style={{ ["--d" as string]: `${(i % 5) * 60}ms` }}
                >
                  <Tile item={item} index={i} onOpen={open(i)} big={i === 0} />
                </li>
              ))}
            </ul>
            {items.length > DESKTOP_LIMIT ? (
              <div className="mt-5 hidden justify-center md:flex">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  className="h-12 rounded-full border-2 border-ink/10 bg-white px-6 font-bold text-ink transition-colors hover:border-sun hover:bg-sun-soft"
                >
                  {expanded ? g.showLess : `${g.showMore} (${items.length - DESKTOP_LIMIT})`}
                </button>
              </div>
            ) : null}
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
  big,
}: {
  item: Item;
  index: number;
  onOpen: (e: React.MouseEvent<HTMLElement>) => void;
  big: boolean;
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
      className="group relative block h-full w-full overflow-hidden rounded-[22px] bg-cream-deep ring-4 ring-white shadow-[0_10px_24px_-16px_rgba(43,42,58,0.45)] transition-transform duration-300 hover:-translate-y-1"
    >
      {item.kind === "photo" ? (
        <Image
          src={item.photo.src}
          alt={label}
          fill
          quality={70}
          sizes={big ? "(min-width: 1240px) 600px, 50vw" : "(min-width: 1240px) 300px, 25vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <VideoPoster video={item.video} fill />
      )}
      <span className="pointer-events-none absolute right-2.5 bottom-2.5 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <Expand className="h-4 w-4" aria-hidden="true" />
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

  const onScroll = () => {
    const el = strip.current;
    if (!el || !el.firstElementChild) return;
    const w = (el.firstElementChild as HTMLElement).offsetWidth + 12;
    setCurrent(Math.min(items.length - 1, Math.round(el.scrollLeft / w)));
  };
  const scrollBy = (dir: 1 | -1) => {
    const el = strip.current;
    if (!el || !el.firstElementChild) return;
    const w = (el.firstElementChild as HTMLElement).offsetWidth + 12;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div className="mt-6 md:hidden">
      <ul
        ref={strip}
        onScroll={onScroll}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 [scroll-padding-inline:16px] sm:-mx-6 sm:px-6"
      >
        {items.map((item, i) => {
          const label =
            item.kind === "photo"
              ? (photoCaption(item.photo, lang) ?? `${t.gallery.photo} ${i + 1}`)
              : t.gallery.video;
          return (
            <li key={tileKey(item)} className="w-[78%] max-w-[340px] shrink-0 snap-start">
              <button
                type="button"
                onClick={onOpen(i)}
                aria-label={`${t.gallery.open}: ${label}`}
                className="relative block aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-cream-deep ring-4 ring-white"
              >
                {item.kind === "photo" ? (
                  <Image
                    src={item.photo.src}
                    alt={label}
                    fill
                    quality={70}
                    sizes="80vw"
                    className="object-cover"
                  />
                ) : (
                  <VideoPoster video={item.video} fill />
                )}
              </button>
            </li>
          );
        })}
      </ul>
      {items.length > 1 ? (
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="font-hand text-[20px] leading-none font-bold text-ink-soft">
            {current + 1} {t.gallery.of} {items.length} · {t.gallery.swipeHint}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={current === 0}
              aria-label={t.gallery.prev}
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-sm disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
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
              priority
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
