import Link from "next/link";
import { getAllServices } from "@/lib/services";

export default function ServicesSection() {
  const services = getAllServices();

  return (
    <section
      id="leistungen"
      className="bg-white py-20"
      aria-labelledby="leistungen-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <span className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent font-semibold text-sm rounded-full px-4 py-1.5">
            <span aria-hidden="true">⭐</span>
            Unsere Leistungen
          </span>
          <h2
            id="leistungen-heading"
            className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight"
          >
            Was wir für Sie tun
          </h2>
          <p className="text-brand-text-muted text-lg max-w-2xl leading-relaxed">
            Von der ersten Planung bis zur finalen Übergabe — wir begleiten
            Sie mit Fachkompetenz, Pünktlichkeit und einem festen Preis.
          </p>
        </div>

        {/* Cards grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <li key={service.slug}>
              <article className="flex flex-col h-full bg-white border border-gray-200 rounded-2xl p-7 shadow-[var(--shadow-card)] hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                {/* Icon */}
                <span
                  className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-primary/10 text-3xl mb-5"
                  aria-hidden="true"
                >
                  {service.emoji}
                </span>

                {/* Title + price */}
                <h3 className="text-xl font-bold text-brand-primary mb-1">
                  {service.title}
                </h3>
                <p className="text-brand-accent font-semibold text-sm mb-3">
                  {service.price}
                </p>

                {/* Description */}
                <p className="text-brand-text-muted text-sm leading-relaxed mb-5 flex-1">
                  {service.description}
                </p>

                {/* Sub-service list */}
                <ul
                  className="flex flex-col gap-2 mb-7"
                  aria-label={`Teilleistungen: ${service.title}`}
                >
                  {service.subServices.map((sub) => (
                    <li
                      key={sub.title}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span
                        className="text-brand-success mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      {sub.title}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={`/${service.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold text-sm px-5 py-2.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                  aria-label={`Mehr zu ${service.title}`}
                >
                  Mehr erfahren
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
