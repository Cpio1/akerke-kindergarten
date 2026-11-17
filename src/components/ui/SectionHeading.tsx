import { Sparkle } from "@/components/decor/Shapes";

type Props = {
  id?: string;
  number: string;
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "sun" | "sky" | "coral" | "leaf" | "lav";
};

const tones = {
  sun: "bg-sun text-sun-ink",
  sky: "bg-sky-mid text-sky-ink",
  coral: "bg-coral text-white",
  leaf: "bg-leaf text-leaf-ink",
  lav: "bg-lav text-lav-ink",
} as const;

/** Заголовок секции: номер-наклейка, рукописная подпись, H2 и короткий лид. */
export function SectionHeading({ id, number, eyebrow, title, lead, align = "left", tone = "sun" }: Props) {
  const center = align === "center";
  return (
    <header className={`reveal ${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      <div className={`mb-2 flex items-center gap-2.5 ${center ? "justify-center" : ""}`}>
        <span
          aria-hidden="true"
          className={`grid h-8 w-8 -rotate-6 place-items-center rounded-[10px] font-display text-[13px] font-bold shadow-[0_3px_0_rgba(43,42,58,0.12)] ${tones[tone]}`}
        >
          {number}
        </span>
        <span className="font-hand text-[22px] leading-none font-semibold text-ink-soft sm:text-[24px]">{eyebrow}</span>
        <Sparkle className="h-3.5 w-3.5" fill="#ff8f7e" aria-hidden="true" />
      </div>
      <h2 id={id} className="text-[clamp(1.6rem,1.15rem+2vw,2.6rem)] leading-[1.15] font-bold text-ink">
        {title}
      </h2>
      {lead ? (
        <p className={`mt-3 text-[15px] leading-relaxed text-ink-soft sm:text-[17px] ${center ? "mx-auto" : ""} max-w-xl`}>
          {lead}
        </p>
      ) : null}
    </header>
  );
}
