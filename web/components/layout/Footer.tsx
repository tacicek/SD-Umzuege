import Link from "next/link";
import Image from "next/image";

const leistungen = [
  { href: "/umzug",            label: "Umzug" },
  { href: "/umzug/privatumzug",   label: "Privatumzug" },
  { href: "/umzug/firmenumzug",   label: "Firmenumzug" },
  { href: "/umzug/auslandsumzug", label: "Auslandsumzug" },
  { href: "/reinigung",        label: "Reinigung" },
  { href: "/raeumung",         label: "Räumung" },
  { href: "/klaviertransport", label: "Klaviertransport" },
];

const unternehmen = [
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt",   label: "Kontakt" },
  { href: "/angebot",   label: "Offerte anfordern" },
];

const rechtliches = [
  { href: "/impressum",   label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-white">
      {/* Top CTA bar */}
      <div className="border-b border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/80 text-sm font-medium">
            Bereit für Ihren stressfreien Umzug?
          </p>
          <Link
            href="/angebot"
            className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold rounded-full px-6 py-2.5 text-sm transition-colors flex-shrink-0"
          >
            Kostenlose Offerte anfordern →
          </Link>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link href="/" aria-label="SD-Umzüge — Startseite">
              <Image
                src="/images/SD-Umzug-Logo.webp"
                alt="S&D Umzüge Logo"
                width={160}
                height={52}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Professionelle Umzugs-, Reinigungs- und Räumungsdienstleistungen
              in Rüti ZH und der ganzen Deutschschweiz.
            </p>
            {/* Trust badges */}
            <div className="flex flex-col gap-2">
              {[
                "✅ Festpreisgarantie",
                "🛡️ Vollversichert bis CHF 100'000",
                "⚡ Offerte innert 24h",
              ].map((badge) => (
                <span key={badge} className="text-xs text-white/60 flex items-center gap-1.5">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Leistungen column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Leistungen
            </h3>
            <ul className="flex flex-col gap-2.5">
              {leistungen.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Unternehmen column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Unternehmen
            </h3>
            <ul className="flex flex-col gap-2.5">
              {unternehmen.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Kontakt
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="tel:+41765053792"
                  className="flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors"
                  aria-label="Anrufen"
                >
                  <span aria-hidden="true">📞</span>
                  +41 76 505 37 92
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@sd-umzuege.ch"
                  className="flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors"
                  aria-label="E-Mail senden"
                >
                  <span aria-hidden="true">✉️</span>
                  info@sd-umzuege.ch
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm text-white/65">
                  <span aria-hidden="true" className="mt-0.5">📍</span>
                  <span>Rüti ZH<br />Kanton Zürich, Schweiz</span>
                </span>
              </li>
              <li>
                <span className="flex items-center gap-2 text-sm text-white/65">
                  <span aria-hidden="true">🕐</span>
                  Mo–Fr 08:00–18:00, Sa 09:00–14:00
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} S&amp;D Umzüge. Alle Rechte vorbehalten.
          </p>
          <nav className="flex items-center gap-4" aria-label="Rechtliches">
            {rechtliches.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/45 hover:text-white/80 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
