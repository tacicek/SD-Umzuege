import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Leistungen — Umzug, Reinigung, Räumung & Klaviertransport Zürich",
  description:
    "Alle Leistungen von SD-Umzüge in Zürich: Privatumzug, Firmenumzug, Wohnungsreinigung mit Abnahmegarantie, Räumung & Klaviertransport — alle mit Festpreisgarantie und Vollversicherung.",
  alternates: { canonical: "/leistungen" },
  openGraph: {
    title: "Leistungen — Umzug, Reinigung, Räumung & Klaviertransport | SD-Umzüge Zürich",
    description:
      "Alle Dienstleistungen aus einer Hand: Umzug, Reinigung, Räumung & Klaviertransport in Zürich. Festpreisgarantie auf alle Leistungen.",
    url: "/leistungen",
  },
};

export default function LeistungenPage() {
  const services = getAllServices();

  return (
    <main>
      {/* Page hero */}
      <section className="bg-brand-bg-subtle border-b border-gray-200 py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent font-semibold text-sm rounded-full px-4 py-1.5 mb-4">
            <span aria-hidden="true">⭐</span>
            Unsere Leistungen
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-primary tracking-tight mb-4">
            Alles aus einer Hand
          </h1>
          <p className="text-brand-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Von Umzug über Reinigung bis Klaviertransport — professionell, pünktlich
            und zum verbindlichen Festpreis in der ganzen Deutschschweiz.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 md:py-24 bg-white" aria-labelledby="services-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="services-heading" className="sr-only">Alle Leistungen</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/${service.slug}`}
                  className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full"
                  aria-label={`${service.title} — mehr erfahren`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-[16/7] flex-shrink-0">
                    <Image
                      src={service.heroImage}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary/10 text-2xl flex-shrink-0"
                        aria-hidden="true"
                      >
                        {service.emoji}
                      </span>
                      <div>
                        <h2 className="text-xl font-bold text-brand-primary leading-tight">
                          {service.title}
                        </h2>
                        <span className="text-brand-accent font-semibold text-sm">
                          {service.price}
                        </span>
                      </div>
                    </div>
                    <p className="text-brand-text-muted text-sm leading-relaxed mb-5 flex-1">
                      {service.description}
                    </p>
                    {/* Sub-service pills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {service.subServices.map((sub) => (
                        <span
                          key={sub.title}
                          className="inline-flex items-center gap-1 bg-brand-bg-subtle text-brand-primary text-xs font-medium rounded-full px-3 py-1"
                        >
                          <span aria-hidden="true">{sub.emoji}</span>
                          {sub.title}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-brand-accent font-semibold text-sm group-hover:gap-2.5 transition-all duration-200">
                      Mehr erfahren
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
