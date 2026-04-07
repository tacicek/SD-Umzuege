interface Props {
  lokaleFakten: string[];
  gemeinde: string;
  service: string;
}

const SERVICE_LABELS: Record<string, string> = {
  umzug: "Umzug",
  reinigung: "Reinigung",
  raeumung: "Räumung",
  klaviertransport: "Klaviertransport",
};

export default function LocationKnowledge({ lokaleFakten, gemeinde, service }: Props) {
  if (!lokaleFakten.length) return null;

  const serviceLabel = SERVICE_LABELS[service] ?? service;

  return (
    <section
      className="py-16 md:py-20 bg-brand-bg-subtle"
      aria-labelledby="local-knowledge-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary font-semibold text-sm rounded-full px-4 py-1.5">
            📍 Lokales Wissen
          </span>
          <h2
            id="local-knowledge-heading"
            className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight"
          >
            {serviceLabel} in {gemeinde} — Was Sie wissen sollten
          </h2>
          <p className="text-brand-text-muted text-lg max-w-2xl leading-relaxed">
            Aus unserer täglichen Praxis: Das sind die wichtigsten Besonderheiten
            bei {serviceLabel.toLowerCase()}en in {gemeinde}.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {lokaleFakten.map((fakt, i) => (
            <li
              key={i}
              className="flex gap-4 bg-white rounded-2xl p-6 shadow-card border border-gray-100"
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent font-bold text-lg"
                aria-hidden="true"
              >
                {i + 1}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{fakt}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
