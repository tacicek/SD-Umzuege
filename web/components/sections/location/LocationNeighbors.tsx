import Link from "next/link";
import type { Gemeinde, ServiceSlug } from "@/lib/gemeinden";

interface Props {
  nachbarn: Gemeinde[];
  service: ServiceSlug;
  currentGemeinde: string;
}

const SERVICE_LABELS: Record<ServiceSlug, string> = {
  umzug: "Umzug",
  reinigung: "Reinigung",
  raeumung: "Räumung",
  klaviertransport: "Klaviertransport",
};

export default function LocationNeighbors({ nachbarn, service, currentGemeinde }: Props) {
  if (!nachbarn.length) return null;

  const serviceLabel = SERVICE_LABELS[service];

  return (
    <section
      className="py-12 bg-brand-bg-subtle border-t border-gray-100"
      aria-labelledby="neighbors-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="neighbors-heading"
          className="text-xl font-bold text-brand-primary mb-6 text-center"
        >
          {serviceLabel} auch in Ihrer Nähe verfügbar
        </h2>
        <p className="text-center text-brand-text-muted text-sm mb-8">
          SD-Umzüge ist in der gesamten Region {currentGemeinde} und im Kanton Zürich aktiv.
        </p>
        <ul className="flex flex-wrap justify-center gap-3">
          {nachbarn.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/${service}/gemeinde/${g.slug}`}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-accent hover:text-brand-accent text-gray-700 rounded-full px-5 py-2.5 text-sm font-medium transition-colors shadow-sm"
              >
                <svg className="w-3.5 h-3.5 opacity-60" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {serviceLabel} {g.gemeinde}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
