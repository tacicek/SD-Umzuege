const steps = [
  {
    number: "01",
    title: "Offerte anfordern",
    description:
      "Füllen Sie unser einfaches Kontaktformular aus oder rufen Sie uns an. Wir melden uns innert 24 Stunden mit einem Festpreis-Angebot.",
  },
  {
    number: "02",
    title: "Termin vereinbaren",
    description:
      "Nach Annahme der Offerte legen wir gemeinsam einen passenden Termin fest — flexibel und nach Ihren Wünschen.",
  },
  {
    number: "03",
    title: "Professionelle Durchführung",
    description:
      "Unser erfahrenes Team führt den Umzug, die Reinigung oder die Räumung sorgfältig und pünktlich durch.",
  },
  {
    number: "04",
    title: "Abschluss & Übergabe",
    description:
      "Am Ende erfolgt eine gemeinsame Kontrolle. Sie sind rundum zufrieden — das ist unser Qualitätsversprechen.",
  },
];

export default function ProcessSection() {
  return (
    <section
      id="ablauf"
      className="bg-white py-20"
      aria-labelledby="ablauf-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <span className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary font-semibold text-sm rounded-full px-4 py-1.5">
            <span aria-hidden="true">🔄</span>
            So funktioniert es
          </span>
          <h2
            id="ablauf-heading"
            className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight"
          >
            Ihr Weg mit SD-Umzüge
          </h2>
          <p className="text-brand-text-muted text-lg max-w-2xl leading-relaxed">
            Einfach, transparent und stressfrei — in vier Schritten zu Ihrem
            erfolgreichen Umzug.
          </p>
        </div>

        {/* Steps grid */}
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <li key={step.number} className="flex flex-col items-start gap-4">
              {/* Number badge + connector line */}
              <div className="flex items-center gap-3 w-full">
                <span
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-accent text-white font-extrabold text-lg flex-shrink-0"
                  aria-label={`Schritt ${step.number}`}
                >
                  {step.number}
                </span>
                {/* Connector line (not on last item) */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:block flex-1 h-0.5 bg-brand-accent/30"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-base font-bold text-brand-primary mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
