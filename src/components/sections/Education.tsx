"use client";

import { Backpack, Brush, Footprints, Languages, MessageCircleHeart, Puzzle } from "lucide-react";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Cloud, Deco, Flower, Pencil, Sparkle } from "@/components/decor/Shapes";

const tiles = [
  { icon: Puzzle, bg: "bg-sky", chip: "bg-white text-sky-deep", corner: "rounded-[28px] rounded-tl-[60px]" },
  { icon: MessageCircleHeart, bg: "bg-coral-soft", chip: "bg-white text-coral-deep", corner: "rounded-[28px] rounded-tr-[60px]" },
  { icon: Brush, bg: "bg-lav-soft", chip: "bg-white text-lav-deep", corner: "rounded-[28px] rounded-bl-[60px]" },
  { icon: Footprints, bg: "bg-leaf-soft", chip: "bg-white text-leaf-deep", corner: "rounded-[28px] rounded-br-[60px]" },
  { icon: Backpack, bg: "bg-sun-soft", chip: "bg-white text-sun-deep", corner: "rounded-[28px] rounded-tl-[60px]" },
];

export function Education() {
  const t = useT();
  const e = t.education;

  return (
    <section id="education" aria-labelledby="education-title" className="section">
      <div aria-hidden="true" className="dots-bg absolute inset-0 -z-10 opacity-50" />
      <Deco className="top-8 left-[46%] hidden w-16 motion-safe:animate-drift sm:block">
        <Cloud />
      </Deco>
      <Deco className="right-[3%] bottom-8 w-12 rotate-[20deg] sm:w-16">
        <Pencil />
      </Deco>
      <Deco className="top-14 right-[6%] w-5 motion-safe:animate-twinkle">
        <Sparkle fill="#ffd45c" />
      </Deco>

      <div className="container-x">
        <SectionHeading id="education-title" number="02" eyebrow={e.eyebrow} title={e.title} lead={e.lead} tone="coral" />

        <ul className="mt-7 grid grid-cols-1 gap-2.5 min-[360px]:grid-cols-2 sm:mt-9 sm:gap-4 lg:grid-cols-3">
          {e.items.map((item, i) => {
            const tile = tiles[i];
            const Icon = tile.icon;
            const last = i === e.items.length - 1;
            return (
              <li
                key={item.title}
                className={`reveal ${last ? "min-[360px]:col-span-2 lg:col-span-1" : ""}`}
                style={{ ["--d" as string]: `${i * 70}ms` }}
              >
                <article
                  className={`group relative flex h-full flex-col gap-2.5 p-4 max-[359px]:flex-row max-[359px]:items-center max-[359px]:gap-4 transition-transform duration-300 hover:-translate-y-1 sm:p-6 ${tile.bg} ${tile.corner} ${
                    last ? "max-lg:flex-row max-lg:items-center max-lg:gap-4" : ""
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-[16px] shadow-[0_3px_0_rgba(43,42,58,0.07)] transition-transform group-hover:-rotate-6 sm:h-14 sm:w-14 sm:rounded-[20px] ${tile.chip}`}
                  >
                    <Icon className="h-5.5 w-5.5 sm:h-7 sm:w-7" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[15px] leading-snug font-bold text-ink sm:text-[19px]">{item.title}</h3>
                    <p className="mt-1 text-[13px] leading-snug text-ink-soft sm:text-[15px] sm:leading-relaxed">{item.text}</p>
                  </div>
                  <span aria-hidden="true" className="absolute top-3 right-4 font-display text-[12px] font-bold text-ink/25 sm:top-5 sm:right-6 sm:text-[14px]">
                    0{i + 1}
                  </span>
                </article>
              </li>
            );
          })}

          {/* заметка о языке обучения */}
          <li className="reveal min-[360px]:col-span-2 lg:col-span-1" style={{ ["--d" as string]: "380ms" }}>
            <div className="relative flex h-full items-center gap-3.5 overflow-hidden rounded-[28px] bg-ink p-4 text-white sm:p-6">
              <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sun text-ink sm:h-14 sm:w-14">
                <Languages className="h-5.5 w-5.5 sm:h-7 sm:w-7" />
              </span>
              <p className="pr-8 font-display text-[14.5px] leading-snug font-bold sm:text-[17px]">{e.note}</p>
              <Deco className="-right-2 -bottom-2 w-12 opacity-90">
                <Flower petal="#7c62d8" />
              </Deco>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
