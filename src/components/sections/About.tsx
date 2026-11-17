"use client";

import { Blocks, GraduationCap, Palette, Quote } from "lucide-react";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Balloon, Deco, Leaf, Ring, Star, Triangle } from "@/components/decor/Shapes";

const groupStyles = [
  { icon: Blocks, card: "bg-leaf-soft", tab: "bg-leaf text-leaf-ink", ring: "#3ea36a", lift: "lg:mt-20" },
  { icon: Palette, card: "bg-sun-soft", tab: "bg-sun text-sun-ink", ring: "#e9a300", lift: "lg:mt-10" },
  { icon: GraduationCap, card: "bg-lav-soft", tab: "bg-lav text-lav-ink", ring: "#7c62d8", lift: "lg:mt-0" },
];

const statTones = ["bg-sky text-sky-ink", "bg-sun-soft text-sun-ink", "bg-leaf-soft text-leaf-ink", "bg-coral-soft text-coral-ink"];

export function About() {
  const t = useT();
  const a = t.about;

  return (
    <section id="about" aria-labelledby="about-title" className="section bg-paper">
      <Deco className="top-10 right-[4%] w-6 motion-safe:animate-twinkle sm:w-8">
        <Star fill="#a9d3f7" />
      </Deco>
      <Deco className="bottom-16 left-[2%] hidden w-8 motion-safe:animate-float md:block">
        <Balloon fill="#ffd45c" />
      </Deco>
      <Deco className="top-[38%] right-[1.5%] hidden w-5 lg:block">
        <Ring stroke="#ff8f7e" />
      </Deco>

      <div className="container-x">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-12">
          <SectionHeading id="about-title" number="01" eyebrow={a.eyebrow} title={a.title} tone="sky" />
          <div className="reveal relative rounded-[28px] bg-sky/60 p-4 pl-12 sm:p-6 sm:pl-16" style={{ ["--d" as string]: "100ms" }}>
            <Quote className="absolute top-4 left-4 h-6 w-6 text-sky-deep sm:top-6 sm:left-6 sm:h-7 sm:w-7" aria-hidden="true" />
            <p className="text-[14.5px] leading-relaxed font-semibold text-ink sm:text-[17px]">{a.lead}</p>
            <Deco className="-right-2 -bottom-3 w-8 rotate-12">
              <Leaf />
            </Deco>
          </div>
        </div>

        <h3 className="sr-only">{a.groupsTitle}</h3>
        <ol className="mt-8 grid gap-3 sm:mt-10 md:grid-cols-3 md:gap-5 lg:mt-6 lg:items-start">
          {a.groups.map((g, i) => {
            const s = groupStyles[i];
            const Icon = s.icon;
            return (
              <li
                key={g.name}
                className={`reveal group relative ${s.lift}`}
                style={{ ["--d" as string]: `${i * 110}ms` }}
              >
                <article
                  className={`relative flex h-full items-start gap-4 overflow-hidden rounded-[26px] p-4 transition-transform duration-300 hover:-translate-y-1 sm:p-5 md:flex-col md:gap-3 md:rounded-[32px] md:p-6 ${s.card}`}
                >
                  {/* возраст */}
                  <div
                    className={`relative grid h-16 w-16 shrink-0 place-items-center rounded-[22px] md:h-[76px] md:w-[76px] md:rounded-[26px] ${s.tab} rotate-[-4deg] transition-transform group-hover:rotate-3`}
                  >
                    <span className="font-display text-[30px] leading-none font-bold md:text-[34px]">{g.age}</span>
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white px-2 py-0.5 text-[11.5px] leading-none font-extrabold whitespace-nowrap text-ink-soft shadow-sm">
                      {g.age} {a.ageSuffix}
                    </span>
                  </div>

                  <div className="min-w-0 md:mt-2">
                    <h4 className="font-display text-[17px] leading-snug font-bold text-ink sm:text-[19px]">{g.name}</h4>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft sm:text-[15px]">{g.text}</p>
                  </div>

                  <Icon
                    aria-hidden="true"
                    className="absolute top-4 right-4 hidden h-7 w-7 opacity-70 transition-transform group-hover:scale-110 md:block"
                    style={{ color: s.ring }}
                  />
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 100"
                    className="pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 opacity-25"
                  >
                    <circle cx="50" cy="50" r="40" fill="none" stroke={s.ring} strokeWidth="10" strokeDasharray="4 14" strokeLinecap="round" />
                  </svg>
                </article>
              </li>
            );
          })}
        </ol>

        {/* компактные показатели */}
        <ul className="reveal mt-6 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:justify-center sm:gap-3">
          {a.stats.map((s, i) => (
            <li
              key={s.label}
              className={`flex items-center gap-2.5 rounded-2xl px-3 py-2.5 sm:rounded-full sm:py-2 sm:pr-5 sm:pl-2 ${statTones[i]}`}
            >
              <span className="grid h-9 min-w-9 shrink-0 place-items-center rounded-full bg-white px-1.5 font-display text-[15px] font-bold">
                {s.value}
              </span>
              <span className="text-[13.5px] leading-tight font-extrabold sm:text-[14.5px]">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <Deco className="bottom-5 left-[48%] hidden w-4 lg:block">
        <Triangle fill="#c4eabb" />
      </Deco>
    </section>
  );
}
