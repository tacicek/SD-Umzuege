import Link from "next/link";

const faqs = [
  {
    question: "Was kostet ein Umzug mit SD-Umzüge?",
    answer:
      "Ein lokaler Umzug beginnt ab CHF 450 als Festpreis. Regionale Umzüge innerhalb der Deutschschweiz starten ab CHF 650. Nach einer kurzen Bedarfsaufnahme erhalten Sie innert 24 Stunden ein verbindliches Festpreisangebot — ohne versteckte Kosten.",
  },
  {
    question: "Wie schnell erhalte ich eine Offerte?",
    answer:
      "Wir garantieren eine Rückmeldung innert 24 Stunden nach Eingang Ihrer Anfrage. In dringenden Fällen können Sie uns auch direkt unter +41 76 505 37 92 anrufen — wir helfen sofort.",
  },
  {
    question: "Bin ich während des Umzugs versichert?",
    answer:
      "Ja, alle Umzüge sind bis CHF 100'000 vollversichert. Unsere Haftpflichtversicherung deckt etwaige Schäden an Ihren Möbeln und Gegenständen vollständig ab. Sie müssen sich um nichts kümmern.",
  },
  {
    question: "Bieten Sie auch Wohnungsreinigung bei der Übergabe an?",
    answer:
      "Ja, wir übernehmen die professionelle Wohnungsreinigung beim Auszug inklusive Abnahmegarantie. Das bedeutet: Wird die Reinigung nicht beim ersten Mal abgenommen, kommen wir kostenlos nochmals. Ab CHF 280.",
  },
  {
    question: "In welchen Regionen sind Sie tätig?",
    answer:
      "Unser Haupteinsatzgebiet ist der Kanton Zürich und die Ostschweiz — mit Standort in Rüti ZH. Wir sind jedoch in der gesamten Deutschschweiz tätig. Fragen Sie einfach an, wir finden eine Lösung.",
  },
];

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="bg-brand-bg-subtle py-20"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary font-semibold text-sm rounded-full px-4 py-1.5 self-start">
              <span aria-hidden="true">❓</span>
              Häufige Fragen
            </span>
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight"
            >
              Haben Sie Fragen?
            </h2>
            <p className="text-brand-text-muted leading-relaxed">
              Hier finden Sie Antworten auf die häufigsten Fragen rund um
              unsere Leistungen. Wir sind auch persönlich für Sie da.
            </p>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 mt-2">
              <Link
                href="/angebot"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold px-6 py-3 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
              >
                <span aria-hidden="true">📋</span>
                Offerte anfordern
              </Link>
              <a
                href="tel:+41765053792"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary hover:bg-brand-primary-light text-white font-semibold px-6 py-3 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                aria-label="Jetzt anrufen: +41 76 505 37 92"
              >
                <span aria-hidden="true">📞</span>
                +41 76 505 37 92
              </a>
            </div>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-3">
            <dl className="flex flex-col gap-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                >
                  <details className="group">
                    <summary
                      className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-brand-primary hover:text-brand-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary"
                      aria-expanded="false"
                    >
                      <dt className="text-sm sm:text-base">{faq.question}</dt>
                      <span
                        className="flex-shrink-0 text-brand-accent transition-transform duration-200 group-open:rotate-45"
                        aria-hidden="true"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </span>
                    </summary>
                    <dd className="px-6 pb-5 text-sm text-brand-text-muted leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </dd>
                  </details>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
