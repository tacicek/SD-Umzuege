import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import ServicesSection from "@/components/sections/ServicesSection";
import UspSection from "@/components/sections/UspSection";
import ProcessSection from "@/components/sections/ProcessSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaSection from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Umzugsunternehmen Zürich — Umzug, Reinigung & Räumung",
  description:
    "SD-Umzüge: Ihr Umzugsunternehmen in Zürich & Deutschschweiz. Privatumzug ab CHF 450, Endreinigung mit Abnahmegarantie, Räumung & Klaviertransport. Festpreisgarantie & Vollversicherung. Jetzt Offerte anfordern.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SD-Umzüge — Umzugsunternehmen Zürich",
    description:
      "Professionelle Umzüge, Reinigungen & Räumungen in Zürich. Festpreisgarantie, Vollversicherung, über 500 zufriedene Kunden.",
    url: "/",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: "SD-Umzüge",
  alternateName: "S&D Umzüge",
  url: "https://www.sd-umzuege.ch",
  logo: "https://www.sd-umzuege.ch/images/SD-Umzug-Logo.webp",
  image: "https://www.sd-umzuege.ch/images/SD-Umzug-Logo.webp",
  description:
    "Professionelles Umzugsunternehmen in Zürich. Umzug, Reinigung, Räumung & Klaviertransport mit Festpreisgarantie und Vollversicherung.",
  telephone: "+41765053792",
  email: "info@sd-umzuege.ch",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rüti",
    addressRegion: "ZH",
    addressCountry: "CH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.2587,
    longitude: 8.8456,
  },
  areaServed: [
    { "@type": "City", name: "Zürich" },
    { "@type": "AdministrativeArea", name: "Kanton Zürich" },
    { "@type": "Country", name: "Schweiz" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
  priceRange: "CHF 280 – CHF 2000+",
  currenciesAccepted: "CHF",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Umzugsdienstleistungen",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Privatumzug" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Firmenumzug" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wohnungsreinigung mit Abnahmegarantie" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wohnungsräumung" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Klaviertransport" } },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SD-Umzüge",
  url: "https://www.sd-umzuege.ch",
  description: "Professionelles Umzugsunternehmen in Zürich",
  inLanguage: "de-CH",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.sd-umzuege.ch/leistungen",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <UspSection />
      <ProcessSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
