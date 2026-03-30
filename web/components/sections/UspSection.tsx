const usps = [
  {
    emoji: "🏷️",
    title: "Festpreisgarantie",
    description:
      "Keine bösen Überraschungen. Sie erhalten vorab einen fixen Preis — und zahlen genau diesen Betrag. Transparent und fair.",
  },
  {
    emoji: "🛡️",
    title: "Vollversichert",
    description:
      "Alle Umzüge sind bis CHF 100'000 vollversichert. Ihr Eigentum ist bei uns in sicheren Händen.",
  },
  {
    emoji: "📍",
    title: "Lokale Expertise",
    description:
      "Als lokales Unternehmen aus Rüti ZH kennen wir den Kanton Zürich und die Ostschweiz wie unsere Westentasche.",
  },
  {
    emoji: "⏰",
    title: "Pünktlichkeit",
    description:
      "Wir erscheinen zum vereinbarten Termin — immer. Zuverlässigkeit ist unser Versprechen an jeden Kunden.",
  },
];

export default function UspSection() {
  return (
    <section
      id="vorteile"
      className="bg-brand-bg-subtle py-20"
      aria-labelledby="vorteile-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <span className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary font-semibold text-sm rounded-full px-4 py-1.5">
            <span aria-hidden="true">💎</span>
            Warum SD-Umzüge?
          </span>
          <h2
            id="vorteile-heading"
            className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight"
          >
            Ihre Vorteile auf einen Blick
          </h2>
        </div>

        {/* USP cards */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {usps.map((usp) => (
            <li key={usp.title}>
              <article className="flex flex-col h-full bg-white border border-gray-200 rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <span
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-accent/10 text-2xl mb-4"
                  aria-hidden="true"
                >
                  {usp.emoji}
                </span>
                <h3 className="text-base font-bold text-brand-primary mb-2">
                  {usp.title}
                </h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">
                  {usp.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
