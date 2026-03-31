import { getServiceBySlug } from "@/lib/services";
import { notFound } from "next/navigation";
import ServiceHero from "@/components/sections/ServiceHero";
import SubServiceCard from "@/components/sections/SubServiceCard";
import CtaSection from "@/components/sections/CtaSection";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wohnungsreinigung Zürich mit Abnahmegarantie — Endreinigung",
  description:
    "Professionelle Endreinigung in Zürich ab CHF 280 — Abnahmegarantie, Kalkentfernung, Fenster- & Bodenreinigung. Kaution vollständig zurück. Büroreinigung & Unterhaltsreinigung ebenfalls verfügbar.",
  alternates: { canonical: "/reinigung" },
  openGraph: {
    title: "Wohnungsreinigung Zürich mit Abnahmegarantie | SD-Umzüge",
    description:
      "Endreinigung ab CHF 280 mit Abnahmegarantie — Ihre Kaution ist sicher. Professionell, zuverlässig, pünktlich.",
    url: "/reinigung",
  },
};

export default function ReinigungPage() {
  const service = getServiceBySlug("reinigung");
  if (!service) notFound();

  return (
    <main>
      {/* Hero with photo */}
      <ServiceHero
        title={service.title}
        emoji={service.emoji}
        description={service.description}
        heroImage={service.heroImage}
        price={service.price}
      />

      {/* Sub-services */}
      <section
        className="py-16 md:py-24 bg-white"
        aria-labelledby="sub-services-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col items-center text-center gap-3 mb-12">
            <span className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent font-semibold text-sm rounded-full px-4 py-1.5">
              <span aria-hidden="true">{service.emoji}</span>
              {service.title}
            </span>
            <h2
              id="sub-services-heading"
              className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight"
            >
              Unsere {service.title}-Leistungen
            </h2>
            <p className="text-brand-text-muted text-lg max-w-2xl leading-relaxed">
              Wählen Sie die passende Lösung — alle Leistungen mit Festpreisgarantie
              und Abnahmegarantie.
            </p>
          </div>

          {/* Cards grid */}
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            aria-label={`${service.title} Unterleistungen`}
          >
            {service.subServices.map((sub) => (
              <li key={sub.title}>
                <SubServiceCard {...sub} />
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/reinigung/angebot"
              className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-dark text-white rounded-full px-8 py-3.5 font-semibold text-base transition-colors shadow-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
              aria-label="Jetzt Offerte für Reinigung anfordern"
            >
              Jetzt Offerte anfordern
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
