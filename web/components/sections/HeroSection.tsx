import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative bg-brand-primary overflow-hidden"
      aria-label="Willkommen bei SD-Umzüge"
    >
      {/* ── Background photo ── */}
      <Image
        src="/images/Umzugsfirma-sd-umzuege.webp"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        aria-hidden="true"
      />

      {/* ── Overlay — dark left (text readable), fades right (photo visible) ── */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#103590]/95 via-[#103590]/85 to-[#103590]/60"
        aria-hidden="true"
      />

      {/* ── Decorative blobs ── */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-primary-light opacity-20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-accent opacity-10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left column — content ── */}
          <div className="flex flex-col gap-6">
            {/* Location badge */}
            <div className="inline-flex items-center gap-2 self-start bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white/90 font-medium">
              <span aria-hidden="true">📍</span>
              Rüti ZH · Kanton Zürich &amp; Ostschweiz
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-tight text-white tracking-tight">
              Ihr Partner für{" "}
              <span className="text-brand-accent">
                Umzug, Reinigung
              </span>{" "}
              &amp; Räumung
            </h1>

            {/* Lead text */}
            <p className="text-lg text-white/80 leading-relaxed max-w-xl">
              SD-Umzüge steht für zuverlässige Dienstleistungen mit
              Festpreisgarantie — pünktlich, vollversichert und transparent
              in der ganzen Deutschschweiz.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link
                href="/angebot"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold px-7 py-3.5 text-base transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary"
              >
                Kostenlose Offerte
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href="tel:+41765053792"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-3.5 text-base transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary"
                aria-label="Anrufen: +41 76 505 37 92"
              >
                <span aria-hidden="true">📞</span>
                +41 76 505 37 92
              </a>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-3 mt-1" role="list" aria-label="Vertrauensmerkmale">
              <span
                role="listitem"
                className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-sm text-white/90"
              >
                <span aria-hidden="true">✅</span>
                Festpreisgarantie
              </span>
              <span
                role="listitem"
                className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-sm text-white/90"
              >
                <span aria-hidden="true">🛡️</span>
                Vollversichert bis CHF 100&apos;000
              </span>
              <span
                role="listitem"
                className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-sm text-white/90"
              >
                <span aria-hidden="true">⚡</span>
                Offerte innert 24h
              </span>
            </div>
          </div>

          {/* ── Right column — service price cards (desktop only) ── */}
          <div
            className="hidden lg:flex flex-col gap-4"
            aria-label="Unsere Dienstleistungen und Preise"
          >
            {[
              {
                emoji: "🚛",
                title: "Umzug",
                price: "Ab CHF 450",
                badge: "Festpreis",
                desc: "Privat-, Firmen- und Fernumzüge in der ganzen Schweiz",
              },
              {
                emoji: "🧹",
                title: "Reinigung",
                price: "Ab CHF 280",
                badge: "Abnahmegarantie",
                desc: "Wohnungsreinigung bei Auszug, Büroreinigung, Unterhaltsreinigung",
              },
              {
                emoji: "📦",
                title: "Räumung",
                price: "Ab CHF 350",
                badge: "Umweltgerechte Entsorgung",
                desc: "Wohnungsräumung, Kellerräumung, Haushaltsauflösung",
              },
            ].map((card) => (
              <article
                key={card.title}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex items-start gap-4 hover:bg-white/15 transition-colors duration-200"
              >
                <span
                  className="text-3xl flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  {card.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-white font-bold text-lg">{card.title}</h2>
                    <span className="bg-brand-accent/90 text-white text-xs font-semibold rounded-full px-2.5 py-0.5">
                      {card.badge}
                    </span>
                  </div>
                  <p className="text-brand-accent font-extrabold text-xl mt-0.5">
                    {card.price}
                  </p>
                  <p className="text-white/70 text-sm mt-1 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
