import Image from "next/image";
import Link from "next/link";
import type { FotoEntry, ServiceSlug } from "@/lib/gemeinden";

interface Props {
  h1: string;
  subtitel: string;
  preisHinweis: string;
  gemeinde: string;
  service: ServiceSlug;
  foto: FotoEntry;
  angebotHref: string;
}

export default function LocationHero({
  h1,
  subtitel,
  preisHinweis,
  gemeinde,
  foto,
  angebotHref,
}: Props) {
  return (
    <section className="relative bg-brand-primary text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/90 to-brand-primary/60" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl">
          {/* Location badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <svg className="w-4 h-4 text-brand-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {gemeinde} · Kanton Zürich
          </div>

          {/* H1 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            {h1}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8">
            {subtitel}
          </p>

          {/* USP chips */}
          <div className="flex flex-wrap gap-2 mb-8" aria-label="Unsere Garantien">
            {[
              "✓ Festpreisgarantie",
              "✓ Vollversichert bis CHF 100'000",
              "✓ Offerte innert 24h",
              `✓ ${preisHinweis}`,
            ].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center bg-brand-accent/20 border border-brand-accent/40 text-white text-sm font-medium rounded-full px-3 py-1"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={angebotHref}
              className="inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accent-dark text-white rounded-full px-8 py-3.5 font-semibold text-base transition-colors shadow-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary"
            >
              Kostenlose Offerte →
            </Link>
            <a
              href="tel:+41765053792"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full px-8 py-3.5 font-semibold text-base transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +41 76 505 37 92
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
