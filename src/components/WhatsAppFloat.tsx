"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/**
 * Плавающая кнопка WhatsApp.
 * Скрыта на первом экране (там своя кнопка), при открытом меню/галерее
 * над галереей (элементы с data-float-avoid) и над подвалом — чтобы ничего не перекрывать.
 */
export function WhatsAppFloat() {
  const t = useT();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      // в «Байланыс» и подвале есть свои кнопки — плавающая там не нужна и не перекрывает их
      const contacts = document.getElementById("contacts");
      const nearFooter = contacts ? contacts.getBoundingClientRect().top < window.innerHeight * 0.55 : false;
      const overlay = document.body.dataset.menu === "open" || document.body.dataset.lightbox === "open";
      // не перекрываем фотографии и элементы управления галереи
      const zoneTop = window.innerHeight - 96;
      const zoneLeft = window.innerWidth - 96;
      const overPhotos = Array.from(document.querySelectorAll<HTMLElement>("[data-float-avoid]")).some((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.bottom > zoneTop && r.top < window.innerHeight && r.right > zoneLeft;
      });
      setShow(pastHero && !nearFooter && !overlay && !overPhotos);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const mo = new MutationObserver(update);
    mo.observe(document.body, { attributes: true, attributeFilter: ["data-menu", "data-lightbox"] });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mo.disconnect();
    };
  }, []);

  return (
    <a
      href={whatsappLink(t.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.a11y.whatsapp}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed right-[max(14px,env(safe-area-inset-right))] bottom-[calc(14px+env(safe-area-inset-bottom))] z-40 grid h-[52px] w-[52px] place-items-center sm:h-14 sm:w-14 rounded-full bg-wa text-white shadow-[0_10px_24px_-8px_rgba(18,140,75,0.7)] transition-all duration-300 hover:scale-105 sm:right-6 sm:bottom-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span aria-hidden="true" className="absolute inset-0 rounded-full bg-wa opacity-40 motion-safe:animate-ping [animation-duration:2.6s]" />
      <WhatsAppIcon className="relative h-6.5 w-6.5 sm:h-7 sm:w-7" />
    </a>
  );
}
