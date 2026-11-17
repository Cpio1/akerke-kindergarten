"use client";

import { ArrowUp } from "lucide-react";
import { useT } from "@/lib/i18n";
import { site } from "@/lib/site";
import { LogoMark } from "@/components/ui/Logo";
import { InstagramIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  const t = useT();
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-ink pt-10 pb-[calc(96px+env(safe-area-inset-bottom))] text-white/80 sm:pb-10">
      {/* волнистый край */}
      <svg aria-hidden="true" viewBox="0 0 1440 24" preserveAspectRatio="none" className="absolute inset-x-0 -top-[23px] h-6 w-full">
        <path d="M0 24V12C120 0 240 0 360 12s240 12 360 0 240-12 360 0 240 12 360 0v12Z" fill="#2b2a3a" />
      </svg>
      <div className="container-x grid gap-6 md:grid-cols-[1.2fr_1fr_auto] md:items-start">
        <div className="flex items-start gap-3">
          <LogoMark className="h-11 w-11 shrink-0" />
          <div>
            <p className="font-display text-[18px] font-bold text-white">«{site.name}» {t.brandSub}</p>
            <p className="mt-1 text-[14px]">{site.legalName}</p>
            <p className="mt-1 text-[14px]">{t.contacts.addressShort}</p>
          </div>
        </div>
        <nav aria-label={t.a11y.nav}>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[14px] font-semibold">
            {t.nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="inline-block py-1 hover:text-sun">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-2 text-[14px] font-bold">
          {site.phones.map((p) => (
            <a key={p.href} href={p.href} className="whitespace-nowrap hover:text-sun">
              {p.display}
            </a>
          ))}
          <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-sun">
            <InstagramIcon className="h-4.5 w-4.5" />
            {site.instagramHandle}
          </a>
        </div>
      </div>
      <div className="container-x mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-[13px]">
        <p>
          © {year} {site.legalName}. {t.footer.rights}
        </p>
        <a href="#top" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-bold hover:bg-white/20">
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
          {t.footer.up}
        </a>
      </div>
    </footer>
  );
}
