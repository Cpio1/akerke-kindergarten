"use client";

import Image from "next/image";
import { ArrowDown, Clock3, Languages, MapPin, Smile } from "lucide-react";
import { useT } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";
import { heroPhoto } from "@/lib/media";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { KindergartenScene } from "@/components/decor/KindergartenScene";
import { Cloud, Deco, Flower, Pencil, Rainbow, Sparkle, Star, Sun } from "@/components/decor/Shapes";
import { scrollToId } from "@/components/Header";

const chipIcons = [Smile, Clock3, Languages];
const chipTones = ["bg-sun-soft text-sun-ink", "bg-sky text-sky-ink", "bg-leaf-soft text-leaf-ink"];

export function Hero() {
  const t = useT();

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-clip pt-[calc(var(--header-h)+18px)] pb-10 lg:flex lg:min-h-[min(100svh,880px)] lg:items-center lg:pt-[calc(var(--header-h)+28px)] lg:pb-14"
    >
      {/* мягкий фон: небо сверху, точки */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#e9f5ff_0%,#fff8ec_62%)]" />
      <div aria-hidden="true" className="dots-bg absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(180deg,#000,transparent_70%)]" />

      {/* декор по краям — маленький и вне текста */}
      <Deco className="top-[calc(var(--header-h)+10px)] left-[2%] hidden w-14 motion-safe:animate-drift 2xl:block">
        <Cloud />
      </Deco>
      <Deco className="top-[calc(var(--header-h)+40px)] right-[4%] w-7 motion-safe:animate-twinkle lg:right-[46%]">
        <Star />
      </Deco>
      <Deco className="bottom-6 left-[42%] hidden w-16 opacity-80 lg:block">
        <Pencil className="-rotate-12" />
      </Deco>
      <Deco className="bottom-10 left-[2%] hidden w-6 lg:block">
        <Flower petal="#e4dcff" />
      </Deco>

      <div className="container-x grid w-full items-center gap-x-12 gap-y-5 [grid-template-areas:'head'_'visual'_'body'] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-y-6 lg:[grid-template-areas:'head_visual'_'body_visual']">
        {/* Заголовок */}
        <div className="[grid-area:head] lg:self-end">
          <p className="reveal inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-[13px] font-bold text-ink-soft shadow-[0_2px_0_rgba(43,42,58,0.06)] sm:text-[14px]">
            <MapPin className="h-4 w-4 text-coral-deep" aria-hidden="true" />
            {t.hero.badge}
          </p>
          <h1
            id="hero-title"
            className="reveal mt-3 text-[clamp(1.6rem,0.95rem+2.9vw,3.15rem)] leading-[1.14] font-bold text-ink sm:mt-4"
            style={{ ["--d" as string]: "80ms" }}
          >
            <span className="text-sky-deep">«С.АҚЕРКЕ»</span> — {t.hero.titleStart}
            <span className="mark">{t.hero.titleMark}</span>
            {t.hero.titleEnd}
          </h1>
        </div>

        {/* Визуал */}
        <div className="relative mx-auto w-full max-w-[540px] [grid-area:visual] lg:max-w-[460px]">
          <HeroVisual />
        </div>

        {/* Описание и кнопки */}
        <div className="[grid-area:body] lg:self-start">
          <p
            className="reveal max-w-xl text-[15.5px] leading-relaxed text-ink-soft sm:text-[18px]"
            style={{ ["--d" as string]: "140ms" }}
          >
            {t.hero.subtitle}
          </p>

          <ul className="reveal mt-4 flex flex-wrap gap-2" style={{ ["--d" as string]: "200ms" }}>
            {t.hero.chips.map((chip, i) => {
              const Icon = chipIcons[i];
              return (
                <li
                  key={chip}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13.5px] font-extrabold sm:text-[14.5px] ${chipTones[i]}`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {chip}
                </li>
              );
            })}
          </ul>

          <div
            className="reveal mt-5 grid grid-cols-[1fr_auto] gap-2.5 sm:mt-7 sm:flex sm:flex-wrap sm:gap-3"
            style={{ ["--d" as string]: "260ms" }}
          >
            <a
              href={whatsappLink(t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-wa px-5 text-[15.5px] font-extrabold text-white shadow-[0_5px_0_#128c4b] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_#128c4b] sm:h-14 sm:rounded-full sm:px-7 sm:text-[16.5px]"
            >
              <WhatsAppIcon className="h-5.5 w-5.5 transition-transform group-hover:rotate-[-8deg]" />
              {t.cta.whatsapp}
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("about");
              }}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl border-2 border-ink/10 bg-white px-4 text-[15px] font-bold text-ink transition-colors hover:border-sky-mid hover:bg-sky/40 sm:h-14 sm:rounded-full sm:px-6"
            >
              <span className="hidden min-[400px]:inline">{t.cta.groups}</span>
              <ArrowDown className="h-5 w-5 text-sky-deep" aria-hidden="true" />
              <span className="sr-only min-[400px]:hidden">{t.cta.groups}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  const t = useT();
  return (
    <div className="reveal relative px-3 pt-3 pb-4 sm:px-5" style={{ ["--d" as string]: "120ms" }}>
      {/* смещённая цветная подложка */}
      <div
        aria-hidden="true"
        className="absolute inset-x-3 top-6 -bottom-0 translate-x-2.5 rounded-[36px] bg-sky-mid sm:inset-x-5 lg:translate-x-4 lg:rounded-t-[999px] lg:rounded-b-[44px]"
      />
      {/* рамка-арка */}
      <div className="relative aspect-[16/11] max-h-[36svh] w-full overflow-hidden rounded-[30px] sm:max-h-[42svh] border-[6px] border-white bg-sky shadow-[0_24px_50px_-24px_rgba(29,90,143,0.45)] sm:aspect-[16/10] lg:aspect-[4/5] lg:max-h-[min(62svh,560px)] lg:rounded-t-[999px] lg:rounded-b-[40px] lg:border-[8px]">
        {heroPhoto ? (
          <Image
            src={heroPhoto.src}
            alt={t.hero.photoAlt}
            width={heroPhoto.width}
            height={heroPhoto.height}
            priority
            quality={80}
            sizes="(min-width: 1024px) 460px, (min-width: 640px) 540px, 100vw"
            className="h-full w-full object-cover"
          />
        ) : (
          <KindergartenScene label={t.hero.illustrationLabel} className="h-full w-full" />
        )}
      </div>

      {/* стикеры и фигурки вокруг рамки */}
      <span
        aria-hidden="true"
        className="absolute -top-1 right-1 grid h-[68px] w-[68px] rotate-12 place-items-center rounded-full bg-coral text-center font-display text-[13px] leading-tight font-bold text-white shadow-[0_4px_0_#e85a4a] sm:h-20 sm:w-20 sm:text-[15px] lg:top-10 lg:-right-2"
      >
        {t.hero.sticker}
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-1 left-0 -rotate-6 rounded-xl bg-white px-3 py-1 font-hand text-[22px] leading-none font-bold text-lav-deep shadow-[0_3px_0_rgba(43,42,58,0.08)] sm:text-[26px] lg:bottom-12 lg:-left-6"
      >
        {t.hero.note}
      </span>
      <Deco className="-top-3 left-5 w-10 motion-safe:animate-float sm:w-12 lg:top-2 lg:-left-6 lg:w-14">
        <Sun />
      </Deco>
      <Deco className="right-8 -bottom-2 hidden w-14 sm:block lg:right-2 lg:-bottom-3 lg:w-16">
        <Rainbow />
      </Deco>
      <Deco className="top-1/2 -left-1 hidden w-4 motion-safe:animate-twinkle lg:block">
        <Sparkle fill="#ff8f7e" />
      </Deco>
    </div>
  );
}
