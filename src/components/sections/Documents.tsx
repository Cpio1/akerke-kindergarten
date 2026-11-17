"use client";

import { ArrowUpRight, Cloud as CloudIcon, FileText, FolderOpen, Link2, Phone } from "lucide-react";
import { useLang, useT } from "@/lib/i18n";
import { documents, type DocumentSource } from "@/lib/documents";
import { site, whatsappLink } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Deco, Leaf, Ring, Sparkle } from "@/components/decor/Shapes";

const sourceStyle: Record<DocumentSource, { icon: typeof FileText; tone: string }> = {
  pdf: { icon: FileText, tone: "bg-coral-soft text-coral-deep" },
  cloud: { icon: CloudIcon, tone: "bg-sky text-sky-deep" },
  link: { icon: Link2, tone: "bg-lav-soft text-lav-deep" },
};

export function Documents() {
  const t = useT();
  const [lang] = useLang();
  const d = t.documents;
  const sourceLabel: Record<DocumentSource, string> = { pdf: d.pdf, cloud: d.cloud, link: d.link };

  return (
    <section id="documents" aria-labelledby="documents-title" className="section">
      <Deco className="top-12 right-[6%] w-5 motion-safe:animate-twinkle">
        <Sparkle fill="#3d8fd1" />
      </Deco>
      <Deco className="bottom-10 right-[3%] hidden w-8 -rotate-12 md:block">
        <Leaf fill="#7c62d8" />
      </Deco>
      <Deco className="bottom-14 left-[2%] hidden w-5 lg:block">
        <Ring stroke="#ffd45c" />
      </Deco>

      <div className="container-x">
        <SectionHeading id="documents-title" number="06" eyebrow={d.eyebrow} title={d.title} lead={d.lead} tone="sky" />

        {documents.length > 0 ? (
          <ul className="mt-7 grid gap-3 sm:mt-9 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc, i) => {
              const s = sourceStyle[doc.source];
              const Icon = s.icon;
              const external = !doc.url.startsWith("/");
              return (
                <li key={doc.url} className="reveal" style={{ ["--d" as string]: `${i * 60}ms` }}>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-center gap-4 rounded-[24px] bg-paper p-4 shadow-[0_2px_0_rgba(43,42,58,0.05)] ring-1 ring-line transition-transform hover:-translate-y-0.5 sm:p-5"
                  >
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${s.tone}`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[16px] leading-snug font-bold text-ink">{doc.title[lang]}</span>
                      <span className="mt-0.5 block text-[13px] font-semibold text-ink-soft">{sourceLabel[doc.source]}</span>
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-cream-deep px-3 py-1.5 text-[13px] font-bold text-ink transition-colors group-hover:bg-sun">
                      {d.open}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {external ? <span className="sr-only">({t.a11y.newTab})</span> : null}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="reveal mt-7 flex flex-col items-center gap-5 rounded-[30px] bg-paper p-5 text-center ring-1 ring-line sm:mt-9 sm:flex-row sm:p-7 sm:text-left">
            {/* папка с пустыми листами — без фиктивных документов */}
            <div aria-hidden="true" className="relative h-20 w-24 shrink-0">
              <span className="absolute top-0 left-4 h-16 w-14 rotate-[-8deg] rounded-lg bg-white ring-1 ring-line" />
              <span className="absolute top-1 left-8 h-16 w-14 rotate-[6deg] rounded-lg bg-white ring-1 ring-line" />
              <span className="absolute inset-x-0 bottom-0 grid h-14 place-items-center rounded-2xl bg-sun shadow-[0_4px_0_#e9a300]">
                <FolderOpen className="h-7 w-7 text-sun-ink" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[18px] leading-snug font-bold text-ink sm:text-[20px]">{d.emptyTitle}</h3>
              <p className="mt-1.5 max-w-xl text-[14.5px] leading-relaxed text-ink-soft sm:text-[15px]">{d.emptyText}</p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto">
              <a
                href={whatsappLink(t.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-wa px-5 font-extrabold text-white transition-transform hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp
              </a>
              <a
                href={site.phones[0].href}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cream-deep px-5 font-bold whitespace-nowrap text-ink transition-colors hover:bg-sun-soft"
              >
                <Phone className="h-4.5 w-4.5 text-sky-deep" aria-hidden="true" />
                {site.phones[0].display}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
