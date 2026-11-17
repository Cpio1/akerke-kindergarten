import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { RevealObserver } from "@/components/RevealObserver";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Food } from "@/components/sections/Food";
import { Clubs } from "@/components/sections/Clubs";
import { Gallery } from "@/components/sections/Gallery";
import { Documents } from "@/components/sections/Documents";
import { Contacts } from "@/components/sections/Contacts";
import { site, SITE_URL } from "@/lib/site";
import { kk } from "@/lib/i18n/kk";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Preschool",
  name: "«С.АҚЕРКЕ» балабақшасы",
  alternateName: ["С.АҚЕРКЕ", "Детский сад С.АҚЕРКЕ", site.legalName],
  description: kk.meta.description,
  url: SITE_URL,
  telephone: site.phones.map((p) => p.href.replace("tel:", "")),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Еспаев көшесі, 80/1, Ақбұлақ шағынауданы",
    addressLocality: "Алматы",
    addressRegion: "Алатау ауданы",
    addressCountry: "KZ",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lon },
  sameAs: [site.instagramUrl],
  availableLanguage: ["kk"],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RevealObserver />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Education />
        <Food />
        <Clubs />
        <Gallery />
        <Documents />
        <Contacts />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
