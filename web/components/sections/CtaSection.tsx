import Link from "next/link";

export default function CtaSection() {
  return (
    <section
      id="offerte"
      className="relative overflow-hidden bg-brand-accent py-20"
      aria-labelledby="cta-heading"
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold text-sm rounded-full px-4 py-1.5">
          <span aria-hidden="true">🚀</span>
          Jetzt starten
        </span>

        {/* Heading */}
        <h2
          id="cta-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
        >
          Bereit für Ihren stressfreien Umzug?
        </h2>

        {/* Lead */}
        <p className="text-white/90 text-lg leading-relaxed max-w-2xl">
          Kontaktieren Sie uns noch heute für eine kostenlose Offerte. Wir
          melden uns innert 24 Stunden mit einem verbindlichen Festpreis.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link
            href="/angebot"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-brand-accent hover:bg-gray-50 font-bold px-8 py-3.5 text-base shadow-[var(--shadow-cta)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-accent"
          >
            <span aria-hidden="true">📋</span>
            Kostenlose Offerte anfordern
          </Link>
          <a
            href="tel:+41765053792"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-3.5 text-base transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-accent"
            aria-label="Anrufen: +41 76 505 37 92"
          >
            <span aria-hidden="true">📞</span>
            +41 76 505 37 92
          </a>
        </div>

        {/* Contact line */}
        <p className="text-white/75 text-sm mt-2">
          Oder schreiben Sie uns:{" "}
          <a
            href="mailto:info@sd-umzuege.ch"
            className="text-white font-medium underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
          >
            info@sd-umzuege.ch
          </a>
          {" "}· Rüti ZH, Kanton Zürich
        </p>
      </div>
    </section>
  );
}
