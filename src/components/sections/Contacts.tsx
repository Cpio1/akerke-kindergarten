"use client";

import type { ReactNode } from "react";
import { Clock3, MapPin, Navigation, Phone, ExternalLink } from "lucide-react";
import { useLang, useT } from "@/lib/i18n";
import { site, twoGisEmbedUrl, twoGisFirmUrl, twoGisRouteUrl, whatsappLink } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Balloon, Cloud, Deco, Flower, Star, Sun } from "@/components/decor/Shapes";

function Row({ icon, tone, label, children }: { icon: ReactNode; tone: string; label: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3.5 rounded-[22px] bg-paper p-3.5 ring-1 ring-line sm:p-4">
      <span aria-hidden="true" className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${tone}`}>
        {icon}
      </span>
      <div className="min-w-0 pt-0.5">
        <p className="font-hand text-[19px] leading-none font-bold text-ink-soft">{label}</p>
        <div className="mt-1 text-[15px] leading-snug font-bold text-ink sm:text-[16px]">{children}</div>
      </div>
    </li>
  );
}

export function Contacts() {
  const t = useT();
  const [lang] = useLang();
  const c = t.contacts;

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="section bg-[linear-gradient(180deg,#fff8ec,#e9f5ff)]">
      <Deco className="top-10 right-[4%] w-10 motion-safe:animate-float sm:w-12">
        <Sun />
      </Deco>
      <Deco className="top-[30%] left-[1.5%] hidden w-7 motion-safe:animate-float lg:block" style={{ animationDelay: "-3s" }}>
        <Balloon fill="#e4dcff" />
      </Deco>
      <Deco className="bottom-6 left-[40%] hidden w-16 motion-safe:animate-drift md:block">
        <Cloud />
      </Deco>

      <div className="container-x">
        <SectionHeading id="contacts-title" number="07" eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="coral" />

        <div className="mt-7 grid gap-5 sm:mt-9 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8">
          {/* контакты */}
          <div className="reveal flex flex-col gap-3">
            <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              <Row icon={<MapPin className="h-5 w-5" />} tone="bg-coral-soft text-coral-deep" label={c.addressLabel}>
                <address className="not-italic">{c.address}</address>
              </Row>
              <Row icon={<Phone className="h-5 w-5" />} tone="bg-sky text-sky-deep" label={c.phonesLabel}>
                <span className="flex flex-col gap-1">
                  {site.phones.map((p) => (
                    <a key={p.href} href={p.href} className="w-fit whitespace-nowrap underline decoration-sky-mid decoration-2 underline-offset-4 hover:text-sky-deep">
                      {p.display}
                    </a>
                  ))}
                </span>
              </Row>
              <Row icon={<Clock3 className="h-5 w-5" />} tone="bg-sun-soft text-sun-ink" label={c.hoursLabel}>
                {site.hours}
              </Row>
              <Row icon={<InstagramIcon className="h-5 w-5" />} tone="bg-lav-soft text-lav-deep" label={c.instagramLabel}>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all underline decoration-lav decoration-2 underline-offset-4 hover:text-lav-deep"
                >
                  {site.instagramHandle}
                  <span className="sr-only"> ({t.a11y.newTab})</span>
                </a>
              </Row>
            </ul>

            <div className="grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2">
              <a
                href={whatsappLink(t.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-wa px-4 text-[15px] font-extrabold text-white shadow-[0_4px_0_#128c4b] transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp
              </a>
              <a
                href={site.phones[0].href}
                className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-ink px-4 text-[15px] font-extrabold text-white shadow-[0_4px_0_#000] transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                {t.cta.call}
              </a>
            </div>
          </div>

          {/* карта 2GIS */}
          <div className="reveal relative" style={{ ["--d" as string]: "120ms" }}>
            <Deco className="-top-3 -left-2 z-10 w-7 -rotate-12">
              <Flower />
            </Deco>
            <Deco className="-right-1 -bottom-3 z-10 w-6 motion-safe:animate-twinkle">
              <Star />
            </Deco>
            <div className="flex h-full flex-col overflow-hidden rounded-[30px] border-[6px] border-white bg-white shadow-[0_24px_50px_-28px_rgba(29,90,143,0.5)]">
              <div className="relative h-[300px] w-full bg-sky sm:h-[360px] lg:h-auto lg:min-h-[380px] lg:flex-1">
                <iframe
                  title={c.mapTitle}
                  src={twoGisEmbedUrl()}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full rounded-[24px] border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="grid grid-cols-1 gap-2 p-2.5 pt-3 min-[400px]:grid-cols-2">
                <a
                  href={twoGisRouteUrl(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-sun px-4 text-[14.5px] font-extrabold text-ink transition-colors hover:bg-sun-deep hover:text-white"
                >
                  <Navigation className="h-4.5 w-4.5" aria-hidden="true" />
                  {c.route}
                </a>
                <a
                  href={twoGisFirmUrl(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-cream-deep px-4 text-[14.5px] font-bold text-ink transition-colors hover:bg-sky"
                >
                  <ExternalLink className="h-4.5 w-4.5" aria-hidden="true" />
                  {c.openMap}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
