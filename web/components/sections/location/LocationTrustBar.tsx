interface Props {
  gemeinde: string;
}

const stats = [
  { value: "500+", label: "Umzüge im Kanton Zürich" },
  { value: "Ø 4.9★", label: "Kundenbewertung" },
  { value: "24h", label: "Offerte innert" },
  { value: "CHF 100'000", label: "Vollversicherung bis" },
];

export default function LocationTrustBar({ gemeinde }: Props) {
  return (
    <section
      className="bg-white border-b border-gray-100 py-6"
      aria-label={`SD-Umzüge Kennzahlen für ${gemeinde}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {stats.map((stat) => (
            <div key={stat.value} className="flex flex-col gap-0.5">
              <dt className="text-2xl font-extrabold text-brand-primary">{stat.value}</dt>
              <dd className="text-sm text-brand-text-muted">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
