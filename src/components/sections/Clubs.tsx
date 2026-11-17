"use client";

import type { ReactNode } from "react";
import { Music, PersonStanding, Speech } from "lucide-react";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Balloon, Deco, Rainbow, Squiggle, Star } from "@/components/decor/Shapes";

/** Пояс каратэ — собственная иконка. */
function BeltIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M3 13h26v6H3z" fill="currentColor" opacity=".25" />
      <path d="M3 13h26M3 19h26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M13 12h6v8h-6z" fill="currentColor" />
      <path d="M14 20l-4 9M18 20l4 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** «ABC» — иконка английского языка. */
function AbcIcon({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-bold tracking-tight ${className}`} aria-hidden="true">
      ABC
    </span>
  );
}

type Style = { icon: ReactNode; card: string; chip: string; pattern: string; span: string };

const styles: Record<string, Style> = {
  karate: {
    icon: <BeltIcon className="h-7 w-7 sm:h-8 sm:w-8" />,
    card: "bg-coral-soft",
    chip: "bg-coral text-white",
    pattern: "#ff8f7e",
    span: "lg:col-span-2",
  },
  speech: {
    icon: <Speech className="h-6.5 w-6.5 sm:h-7.5 sm:w-7.5" />,
    card: "bg-sky",
    chip: "bg-sky-deep text-white",
    pattern: "#3d8fd1",
    span: "lg:col-span-2",
  },
  afk: {
    icon: <PersonStanding className="h-7 w-7 sm:h-8 sm:w-8" />,
    card: "bg-leaf-soft",
    chip: "bg-leaf-deep text-white",
    pattern: "#3ea36a",
    span: "lg:col-span-2",
  },
  dance: {
    icon: <Music className="h-6.5 w-6.5 sm:h-7.5 sm:w-7.5" />,
    card: "bg-lav-soft",
    chip: "bg-lav-deep text-white",
    pattern: "#7c62d8",
    span: "lg:col-span-3",
  },
  english: {
    icon: <AbcIcon className="text-[14px] sm:text-[16px]" />,
    card: "bg-sun-soft",
    chip: "bg-sun text-sun-ink",
    pattern: "#e9a300",
    span: "sm:col-span-2 lg:col-span-3",
  },
};

export function Clubs() {
  const t = useT();
  const c = t.clubs;

  return (
    <section id="clubs" aria-labelledby="clubs-title" className="section">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-2/3 bg-[linear-gradient(180deg,#eef7ff,transparent)]" />
      <Deco className="top-10 right-[4%] w-14 sm:w-20">
        <Rainbow />
      </Deco>
      <Deco className="bottom-10 left-[2%] hidden w-8 motion-safe:animate-float lg:block">
        <Balloon fill="#a9d3f7" />
      </Deco>
      <Deco className="top-[46%] right-[1%] hidden w-14 opacity-70 lg:block">
        <Squiggle stroke="#ffd45c" />
      </Deco>

      <div className="container-x">
        <SectionHeading id="clubs-title" number="04" eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="lav" />

        <ul className="mt-7 grid gap-2.5 sm:mt-9 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6">
          {c.items.map((item, i) => {
            const s = styles[item.key];
            return (
              <li key={item.key} className={`reveal ${s.span}`} style={{ ["--d" as string]: `${i * 70}ms` }}>
                <article
                  className={`group relative flex h-full items-center gap-3.5 overflow-hidden rounded-[24px] p-3.5 pr-4 transition-transform duration-300 hover:-translate-y-1 sm:items-start sm:gap-4 sm:rounded-[30px] sm:p-6 ${s.card}`}
                >
                  {/* декоративный фон карточки */}
                  <svg aria-hidden="true" viewBox="0 0 120 120" className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 opacity-[0.16] transition-transform duration-700 group-hover:rotate-45 sm:h-36 sm:w-36">
                    {Array.from({ length: 12 }, (_, k) => (
                      <rect key={k} x="56" y="6" width="8" height="30" rx="4" fill={s.pattern} transform={`rotate(${k * 30} 60 60)`} />
                    ))}
                  </svg>

                  <span
                    className={`relative grid h-13 w-13 shrink-0 place-items-center rounded-[18px] shadow-[0_4px_0_rgba(43,42,58,0.1)] transition-transform group-hover:rotate-[-8deg] sm:h-16 sm:w-16 sm:rounded-[22px] ${s.chip}`}
                  >
                    {s.icon}
                  </span>
                  <div className="relative min-w-0">
                    <h3 className="text-[16.5px] leading-tight font-bold text-ink sm:text-[20px]">{item.title}</h3>
                    <p className="mt-1 text-[13.5px] leading-snug text-ink-soft sm:mt-1.5 sm:text-[15px] sm:leading-relaxed">{item.text}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      <Deco className="bottom-6 left-[50%] hidden w-5 motion-safe:animate-twinkle sm:block">
        <Star fill="#e4dcff" />
      </Deco>
    </section>
  );
}
