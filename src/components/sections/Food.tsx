"use client";

import type { ReactNode } from "react";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Deco, Heart, Leaf, Moon, Star, Sun } from "@/components/decor/Shapes";

/* ---------- маленькие иллюстрации еды (без конкретных блюд) ---------- */
function Bowl() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
      <path d="M24 14c-3 4 3 6 0 10M32 10c-3 4 3 7 0 12M40 14c-3 4 3 6 0 10" stroke="#a9d3f7" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M8 32h48a24 24 0 0 1-48 0Z" fill="#ffd45c" />
      <path d="M8 32h48" stroke="#e9a300" strokeWidth="3" strokeLinecap="round" />
      <path d="M17 41c4 4 9 6 15 6" stroke="#fff" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="26" cy="29" r="3" fill="#ff8f7e" />
      <circle cx="36" cy="28" r="3" fill="#3ea36a" />
    </svg>
  );
}
function Plate() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
      <circle cx="32" cy="34" r="22" fill="#fff" stroke="#a9d3f7" strokeWidth="3" />
      <circle cx="32" cy="34" r="14" fill="#d7ecff" />
      <circle cx="27" cy="31" r="4" fill="#3ea36a" />
      <circle cx="37" cy="36" r="5" fill="#ffd45c" />
      <circle cx="30" cy="40" r="3" fill="#ff8f7e" />
      <path d="M6 18v10M3 18v6a3 3 0 0 0 6 0v-6M6 30v22" stroke="#5d5a6e" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M58 52V30c-4-2-5-12 0-14v36" stroke="#5d5a6e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
function Apple() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
      <path d="M32 18c-6-5-20-4-20 12 0 14 10 26 20 22 10 4 20-8 20-22 0-16-14-17-20-12Z" fill="#ff8f7e" />
      <path d="M20 28c0-4 2-7 6-8" stroke="#fff" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M32 18c0-5 1-8 4-11" stroke="#8a5a00" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M35 12c4-6 12-6 14-3-3 5-10 6-14 3Z" fill="#3ea36a" />
    </svg>
  );
}
function Cloche() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
      <path d="M48 10a8 8 0 1 0 6 13 6.5 6.5 0 0 1-6-13Z" fill="#e4dcff" stroke="#7c62d8" strokeWidth="2" />
      <path d="M10 46a22 22 0 0 1 44 0Z" fill="#e4dcff" />
      <path d="M17 40a15 15 0 0 1 10-10" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="32" cy="22" r="3.5" fill="#7c62d8" />
      <rect x="6" y="46" width="52" height="6" rx="3" fill="#7c62d8" />
    </svg>
  );
}

const meals: { art: ReactNode; tone: string; num: string; time: ReactNode }[] = [
  { art: <Bowl />, tone: "bg-sun-soft", num: "bg-sun text-sun-ink", time: <Sun className="h-6 w-6" /> },
  { art: <Plate />, tone: "bg-sky", num: "bg-sky-mid text-sky-ink", time: <Sun className="h-6 w-6" /> },
  { art: <Apple />, tone: "bg-coral-soft", num: "bg-coral text-white", time: <Star className="h-5 w-5" fill="#ff8f7e" /> },
  { art: <Cloche />, tone: "bg-lav-soft", num: "bg-lav text-lav-ink", time: <Moon className="h-5 w-5" /> },
];

export function Food() {
  const t = useT();
  const f = t.food;

  return (
    <section id="food" aria-labelledby="food-title" className="section bg-paper">
      <Deco className="top-10 right-[5%] w-7 rotate-12 sm:w-9">
        <Leaf />
      </Deco>
      <Deco className="bottom-8 left-[3%] hidden w-6 motion-safe:animate-float md:block">
        <Heart />
      </Deco>

      <div className="container-x">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading id="food-title" number="03" eyebrow={f.eyebrow} title={f.title} lead={f.lead} tone="leaf" />
          {/* «тарелка» с количеством приёмов пищи */}
          <div
            aria-hidden="true"
            className="reveal hidden shrink-0 sm:grid sm:h-28 sm:w-28 sm:place-items-center sm:rounded-full sm:border-[10px] sm:border-white sm:bg-sun sm:text-center sm:shadow-[0_0_0_3px_#ffd45c,0_14px_30px_-14px_rgba(138,90,0,0.5)] lg:h-32 lg:w-32"
          >
            <span className="font-display text-[15px] leading-tight font-bold text-sun-ink lg:text-[16px]">{f.badge}</span>
          </div>
        </div>

        {/* «скатерть-меню» */}
        <div className="gingham reveal mt-7 rounded-[34px] p-2.5 sm:mt-9 sm:rounded-[44px] sm:p-4">
          <div className="relative rounded-[26px] border-2 border-dashed border-coral/50 bg-paper p-4 sm:rounded-[34px] sm:p-7">
            <p className="mb-4 flex items-center justify-center gap-2 text-center font-hand text-[24px] leading-none font-bold text-coral-deep sm:mb-6 sm:text-[28px]">
              <Star className="h-4 w-4" aria-hidden="true" />
              {f.menuLabel}
              <span className="rounded-full bg-sun px-2 py-0.5 font-sans text-[13px] font-extrabold text-sun-ink sm:hidden">{f.badge}</span>
              <Star className="h-4 w-4" aria-hidden="true" />
            </p>

            {/* дорожка дня (десктоп) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 40"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-[12%] top-[118px] hidden h-10 w-[76%] lg:block"
            >
              <path d="M0 20C125 0 250 40 375 20s250-20 375 0 250 20 250 0" fill="none" stroke="#efe2c9" strokeWidth="4" strokeDasharray="2 14" strokeLinecap="round" />
            </svg>

            <ol className="relative grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
              {f.meals.map((m, i) => {
                const meal = meals[i];
                return (
                  <li key={m.title} className="reveal" style={{ ["--d" as string]: `${i * 90}ms` }}>
                    <article
                      className={`group relative flex h-full flex-col items-center rounded-[24px] px-3 pt-4 pb-4 text-center transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-1deg] sm:rounded-[30px] sm:px-4 sm:pt-6 ${meal.tone}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute top-2.5 left-2.5 grid h-7 w-7 place-items-center rounded-full font-display text-[13px] font-bold sm:top-3.5 sm:left-3.5 sm:h-8 sm:w-8 ${meal.num}`}
                      >
                        {i + 1}
                      </span>
                      <span aria-hidden="true" className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5">
                        {meal.time}
                      </span>
                      <div className="h-14 w-14 transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">{meal.art}</div>
                      <h3 className="mt-2 text-[16px] leading-tight font-bold text-ink sm:mt-3 sm:text-[20px]">{m.title}</h3>
                      <p className="mt-1 font-hand text-[18px] leading-none font-semibold text-ink-soft sm:text-[21px]">{m.sub}</p>
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
