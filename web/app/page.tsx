import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import ServicesSection from "@/components/sections/ServicesSection";
import UspSection from "@/components/sections/UspSection";
import InsuranceSection from "@/components/sections/InsuranceSection";
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
    title: `${SITE_NAME} — Umzugsunternehmen Zürich`,
    description:
      "Professionelle Umzüge, Reinigungen & Räumungen in Zürich. Festpreisgarantie, Vollversicherung, über 500 zufriedene Kunden.",
    url: "/",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: SITE_NAME,
  alternateName: "S&D Umzüge",
  url: SITE_URL,
  logo: `${SITE_URL}/images/SD-Umzug-Logo.webp`,
  image: `${SITE_URL}/images/Umzugsfirma-sd-umzuege.webp`,
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
  name: SITE_NAME,
  url: SITE_URL,
  description: "Professionelles Umzugsunternehmen in Zürich",
  inLanguage: "de-CH",
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/SD-Umzug-Logo.webp`,
    },
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
      <InsuranceSection />
      <ProcessSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
