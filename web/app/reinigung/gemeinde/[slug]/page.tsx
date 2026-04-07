import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getGemeindeBySlug,
  getAllActiveGemeindenSlugs,
  getLocationPhoto,
  getNachbarGemeinden,
} from "@/lib/gemeinden";
import { getServiceBySlug } from "@/lib/services";
import LocationHero from "@/components/sections/location/LocationHero";
import LocationTrustBar from "@/components/sections/location/LocationTrustBar";
import LocationKnowledge from "@/components/sections/location/LocationKnowledge";
import LocationFaq from "@/components/sections/location/LocationFaq";
import LocationNeighbors from "@/components/sections/location/LocationNeighbors";
import UspSection from "@/components/sections/UspSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CtaSection from "@/components/sections/CtaSection";
import SubServiceCard from "@/components/sections/SubServiceCard";
import Link from "next/link";

const SERVICE = "reinigung" as const;

export async function generateStaticParams() {
  return getAllActiveGemeindenSlugs(SERVICE).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const gemeinde = getGemeindeBySlug(slug);
  if (!gemeinde || !gemeinde.services[SERVICE]?.aktiv) return {};

  const sd = gemeinde.services[SERVICE];
  const foto = getLocationPhoto(slug, SERVICE);
  const canonicalUrl = `https://www.sd-umzuege.ch/reinigung/gemeinde/${slug}`;

  return {
    title: `Wohnungsreinigung ${gemeinde.gemeinde} mit Abnahmegarantie | SD-Umzüge`,
    description: `Professionelle Endreinigung in ${gemeinde.gemeinde} ${sd.preisHinweis} — Abnahmegarantie inklusive, Kaution vollständig zurück. Fensterreinigung, Kalkentfernung & Bodenreinigung. Offerte innert 24h.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `Wohnungsreinigung ${gemeinde.gemeinde} mit Abnahmegarantie`,
      description: `Endreinigung in ${gemeinde.gemeinde} ${sd.preisHinweis} — Abnahmegarantie, Kaution zurück, Festpreis.`,
      url: canonicalUrl,
      images: [
        { url: foto.src, width: foto.width, height: foto.height, alt: foto.alt },
      ],
      locale: "de_CH",
      type: "website",
    },
  };
}

export default async function ReinigungGemeindePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gemeinde = getGemeindeBySlug(slug);
  if (!gemeinde || !gemeinde.services[SERVICE]?.aktiv) notFound();

  const sd = gemeinde.services[SERVICE];
  const foto = getLocationPhoto(slug, SERVICE);
  const nachbarn = getNachbarGemeinden(gemeinde, SERVICE);
  const reinigungService = getServiceBySlug("reinigung");
  const baseUrl = "https://www.sd-umzuege.ch";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["HouseCleaning", "LocalBusiness"],
    name: "SD-Umzüge",
    url: baseUrl,
    telephone: "+41765053792",
    email: "info@sd-umzuege.ch",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rüti",
      addressRegion: "ZH",
      addressCountry: "CH",
    },
    areaServed: {
      "@type": "City",
      name: gemeinde.gemeinde,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Kanton Zürich",
      },
    },
    priceRange: `${sd.preisHinweis}+`,
    currenciesAccepted: "CHF",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Wohnungsreinigung ${gemeinde.gemeinde}`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `Wohnungsreinigung mit Abnahmegarantie ${gemeinde.gemeinde}`,
            areaServed: { "@type": "City", name: gemeinde.gemeinde },
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "CHF",
            minPrice: sd.preisHinweis.replace(/[^0-9]/g, ""),
            description: "Festpreis ab",
          },
        },
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Reinigung", item: `${baseUrl}/reinigung` },
      {
        "@type": "ListItem",
        position: 3,
        name: `Reinigung ${gemeinde.gemeinde}`,
        item: `${baseUrl}/reinigung/gemeinde/${slug}`,
      },
    ],
  };

  const faqSchema = sd.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: sd.faq.map((f) => ({
          "@type": "Question",
          name: f.frage,
          acceptedAnswer: { "@type": "Answer", text: f.antwort },
        })),
      }
    : null;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* 1 — Hero */}
      <LocationHero
        h1={sd.h1}
        subtitel={sd.heroSubtitel}
        preisHinweis={sd.preisHinweis}
        gemeinde={gemeinde.gemeinde}
        service={SERVICE}
        foto={foto}
        angebotHref="/reinigung/angebot"
      />

      {/* 2 — Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="bg-white border-b border-gray-100 py-3"
      >
        <ol className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm text-brand-text-muted flex-wrap">
          <li>
            <Link href="/" className="hover:text-brand-primary transition-colors">
              Startseite
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li>
            <Link href="/reinigung" className="hover:text-brand-primary transition-colors">
              Reinigung
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li className="text-brand-primary font-medium" aria-current="page">
            Reinigung {gemeinde.gemeinde}
          </li>
        </ol>
      </nav>

      {/* 3 — Trust Bar */}
      <LocationTrustBar gemeinde={gemeinde.gemeinde} />

      {/* 4 — Sub-Services */}
      {reinigungService && (
        <section className="py-16 md:py-20 bg-white" aria-labelledby="services-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center gap-3 mb-12">
              <span className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent font-semibold text-sm rounded-full px-4 py-1.5">
                🧹 Unsere Leistungen
              </span>
              <h2
                id="services-heading"
                className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight"
              >
                Reinigungsleistungen in {gemeinde.gemeinde}
              </h2>
              <p className="text-brand-text-muted text-lg max-w-2xl leading-relaxed">
                Alle Reinigungen mit Festpreisgarantie und Abnahmegarantie — auch in{" "}
                {gemeinde.gemeinde}.
              </p>
            </div>
            <ul
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              aria-label="Reinigungsleistungen"
            >
              {reinigungService.subServices.map((sub) => (
                <li key={sub.title}>
                  <SubServiceCard {...sub} />
                </li>
              ))}
            </ul>
            <div className="mt-12 flex justify-center">
              <Link
                href="/reinigung/angebot"
                className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-dark text-white rounded-full px-8 py-3.5 font-semibold text-base transition-colors shadow-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
              >
                Jetzt Offerte anfordern für {gemeinde.gemeinde}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 5 — Local Knowledge (E-E-A-T) */}
      <LocationKnowledge
        lokaleFakten={sd.lokaleFakten}
        gemeinde={gemeinde.gemeinde}
        service={SERVICE}
      />

      {/* 6 — USPs */}
      <UspSection />

      {/* 7 — Process */}
      <ProcessSection />

      {/* 8 — FAQ */}
      <LocationFaq faq={sd.faq} gemeinde={gemeinde.gemeinde} />

      {/* 9 — Nachbargemeinden */}
      {nachbarn.length > 0 && (
        <LocationNeighbors
          nachbarn={nachbarn}
          service={SERVICE}
          currentGemeinde={gemeinde.gemeinde}
        />
      )}

      {/* 10 — Final CTA */}
      <CtaSection />
    </main>
  );
}
