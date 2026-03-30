const stats = [
  {
    value: "500+",
    label: "Erfolgreiche Umzüge",
    icon: "🚛",
  },
  {
    value: "100%",
    label: "Festpreisgarantie",
    icon: "🏷️",
  },
  {
    value: "24h",
    label: "Offerte-Rückmeldung",
    icon: "⚡",
  },
  {
    value: "CHF 100K",
    label: "Vollversicherung",
    icon: "🛡️",
  },
];

export default function StatsBar() {
  return (
    <section
      className="bg-white shadow-sm border-b border-gray-100"
      aria-label="Unsere Kennzahlen"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col items-center text-center gap-1"
            >
              <span className="text-2xl" aria-hidden="true">
                {stat.icon}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-brand-primary leading-tight">
                {stat.value}
              </span>
              <span className="text-sm text-brand-text-muted font-medium">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
