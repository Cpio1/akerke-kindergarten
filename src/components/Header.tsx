"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { useLang, useT, type Lang } from "@/lib/i18n";
import { site, whatsappLink } from "@/lib/site";
import { LogoMark } from "@/components/ui/Logo";
import { WhatsAppIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { Star } from "@/components/decor/Shapes";

const dotColors = ["#ffd45c", "#a9d3f7", "#ff8f7e", "#c4eabb", "#e4dcff", "#ffd45c", "#ff8f7e"];

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

function LangSwitch({ className = "" }: { className?: string }) {
  const [lang, setLang] = useLang();
  const t = useT();
  const options: { value: Lang; label: string }[] = [
    { value: "kk", label: "KZ" },
    { value: "ru", label: "RU" },
  ];
  return (
    <div role="group" aria-label={t.a11y.lang} className={`relative flex rounded-full bg-cream-deep p-1 ${className}`}>
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0_2px_6px_rgba(43,42,58,0.12)] transition-transform duration-300"
        style={{ transform: lang === "ru" ? "translateX(100%)" : "none" }}
      />
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          lang={o.value === "kk" ? "kk" : "ru"}
          aria-pressed={lang === o.value}
          aria-label={o.value === "kk" ? "Қазақша" : "Русский"}
          onClick={() => setLang(o.value)}
          className={`relative z-10 h-8 min-w-9 rounded-full px-2 font-display text-[13px] font-bold transition-colors ${
            lang === o.value ? "text-ink" : "text-ink-soft hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Тень шапки при прокрутке
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Активный пункт меню
  useEffect(() => {
    const ids = t.nav.map((n) => n.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [t.nav]);

  // Мобильное меню: блокировка прокрутки, Esc, закрытие при переходе на десктоп
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    document.body.dataset.menu = "open";
    panel.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1280px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      root.style.overflow = prev;
      delete document.body.dataset.menu;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // ждём снятия блокировки прокрутки
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)));
  };

  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" });
      history.replaceState(null, "", window.location.pathname);
    });
  };

  return (
    <>
      <a
        href="#main"
        className="fixed top-2 left-2 z-[70] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white focus:translate-y-0"
      >
        {t.a11y.skip}
      </a>

      <header className="fixed inset-x-0 top-0 z-50 lg:top-3">
        <div className="lg:container-x">
          <div
            className={`flex h-16 items-center gap-2 border-b border-line/70 bg-paper/90 px-3 backdrop-blur-md min-[360px]:px-4 transition-shadow duration-300 sm:px-6 lg:h-[68px] lg:rounded-full lg:border lg:px-3 lg:pl-4 ${
              scrolled || open ? "shadow-[0_8px_30px_-12px_rgba(43,42,58,0.25)]" : ""
            }`}
          >
            <a href="#top" onClick={toTop} aria-label={t.a11y.home} className="group flex shrink-0 items-center gap-2.5">
              <LogoMark className="h-9 w-9 transition-transform duration-500 group-hover:rotate-45 sm:h-10 sm:w-10 lg:h-11 lg:w-11" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[17px] font-bold tracking-tight text-ink lg:text-[19px]">С.АҚЕРКЕ</span>
                <span className="mt-1 font-hand text-[16px] leading-none text-ink-soft">{t.brandSub}</span>
              </span>
            </a>

            <nav aria-label={t.a11y.nav} className="mx-auto hidden xl:block">
              <ul className="flex items-center gap-0.5">
                {t.nav.map((item, i) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={go(item.id)}
                        aria-current={isActive ? "true" : undefined}
                        className={`group relative flex h-10 items-center rounded-full px-3 text-[14.5px] font-bold transition-colors ${
                          isActive ? "bg-cream-deep text-ink" : "text-ink-soft hover:bg-cream hover:text-ink"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`mr-1.5 h-2 w-2 rounded-full transition-transform group-hover:scale-125 ${isActive ? "scale-125" : ""}`}
                          style={{ background: dotColors[i] }}
                        />
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="ml-auto flex items-center gap-2 xl:ml-0">
              <LangSwitch />
              <a
                href={whatsappLink(t.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden h-11 items-center gap-2 rounded-full bg-wa px-4 text-[14px] font-extrabold text-white shadow-[0_4px_0_#128c4b] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_#128c4b] sm:flex"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>{t.cta.whatsappShort}</span>
              </a>
              <button
                ref={menuBtn}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? t.a11y.menuClose : t.a11y.menuOpen}
                className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition-transform active:scale-95 xl:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Мобильное / планшетное меню */}
        <div
          id="mobile-menu"
          ref={panel}
          hidden={!open}
          className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto overscroll-contain bg-cream xl:hidden lg:top-[92px]"
        >
          <div className="container-x relative flex min-h-full flex-col pt-4 pb-[max(20px,env(safe-area-inset-bottom))]">
            <Star className="pointer-events-none absolute top-6 right-6 h-6 w-6 animate-twinkle" aria-hidden="true" />
            <nav aria-label={t.a11y.nav}>
              <ul className="grid gap-2 sm:grid-cols-2">
                {t.nav.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={go(item.id)}
                      className="flex min-h-14 items-center gap-3 rounded-2xl bg-paper px-4 font-display text-[17px] font-bold text-ink shadow-[0_2px_0_rgba(43,42,58,0.06)] active:scale-[0.98]"
                    >
                      <span
                        aria-hidden="true"
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-xl font-sans text-[13px] font-extrabold text-ink/70"
                        style={{ background: dotColors[i] }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto grid gap-2 pt-6">
              <a
                href={whatsappLink(t.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-wa font-extrabold text-white"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t.cta.whatsapp}
              </a>
              <div className="grid grid-cols-2 gap-2">
                {site.phones.map((p) => (
                  <a
                    key={p.href}
                    href={p.href}
                    className="flex h-12 items-center justify-center gap-1.5 rounded-2xl bg-paper text-[14px] font-bold text-ink"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-sky-deep" />
                    <span className="whitespace-nowrap">{p.display}</span>
                  </a>
                ))}
              </div>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-lav-soft font-bold text-lav-ink"
              >
                <InstagramIcon className="h-5 w-5" />
                {site.instagramHandle}
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
