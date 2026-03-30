import type { Metadata } from "next";
import Link from "next/link";
import CtaSection from "@/components/sections/CtaSection";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt | SD-Umzüge",
  description:
    "Kontaktieren Sie SD-Umzüge — kostenlose Offerte, Fragen oder Terminvereinbarung. Wir antworten innert 24 Stunden.",
};

const contactItems = [
  {
    id: "phone",
    icon: "📞",
    label: "Telefon",
    value: "+41 76 505 37 92",
    href: "tel:+41765053792",
    ariaLabel: "Anrufen: +41 76 505 37 92",
  },
  {
    id: "email",
    icon: "✉️",
    label: "E-Mail",
    value: "info@sd-umzuege.ch",
    href: "mailto:info@sd-umzuege.ch",
    ariaLabel: "E-Mail senden an info@sd-umzuege.ch",
  },
  {
    id: "address",
    icon: "📍",
    label: "Adresse",
    value: "Rüti ZH, Kanton Zürich, Schweiz",
    href: null,
    ariaLabel: null,
  },
  {
    id: "hours",
    icon: "🕐",
    label: "Öffnungszeiten",
    value: "Mo–Fr 08:00–18:00 / Sa 09:00–14:00",
    href: null,
    ariaLabel: null,
  },
];

export default function KontaktPage() {
  return (
    <main className="flex-1">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="bg-brand-bg-subtle border-b border-gray-200"
        aria-labelledby="kontakt-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-brand-text-muted">
              <li>
                <Link
                  href="/"
                  className="hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-400">/</li>
              <li
                className="text-brand-primary font-medium"
                aria-current="page"
              >
                Kontakt
              </li>
            </ol>
          </nav>

          <h1
            id="kontakt-heading"
            className="text-4xl sm:text-5xl font-extrabold text-brand-primary tracking-tight"
          >
            Kontakt
          </h1>
          <p className="mt-3 text-lg text-brand-text-muted max-w-xl">
            Haben Sie Fragen oder möchten Sie eine kostenlose Offerte anfragen?
            Wir freuen uns auf Ihre Nachricht.
          </p>
        </div>
      </section>

      {/* ── Two-column content ───────────────────────────────────────── */}
      <section
        className="py-16 md:py-24"
        aria-label="Kontaktinformationen und Kontaktformular"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-14 items-start">
            {/* ── Left column — contact info ─────────────────────────── */}
            <aside
              className="lg:col-span-2 flex flex-col gap-5"
              aria-label="Kontaktinformationen"
            >
              {/* Response time badge */}
              <div className="inline-flex items-center gap-2 self-start bg-green-50 border border-green-200 text-green-700 text-sm font-semibold rounded-full px-4 py-2">
                <span aria-hidden="true">✅</span>
                Wir antworten innert 24 Stunden
              </div>

              {/* Contact cards */}
              {contactItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-[var(--shadow-card)] flex items-start gap-4"
                >
                  <span
                    className="text-2xl mt-0.5 shrink-0"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        aria-label={item.ariaLabel ?? undefined}
                        className="text-brand-primary font-semibold text-base hover:text-brand-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-brand-primary font-semibold text-base">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-[var(--shadow-card)] flex flex-col gap-2"
                aria-label="Standort Rüti ZH"
              >
                <span className="text-2xl" aria-hidden="true">🗺️</span>
                <p className="text-sm text-brand-text-muted leading-relaxed">
                  Wir sind in der Region Zürich und der ganzen Deutschschweiz
                  für Sie im Einsatz.
                </p>
                <a
                  href="https://maps.google.com/?q=Rüti+ZH,+Schweiz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent font-medium text-sm underline underline-offset-2 hover:text-brand-accent-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm self-start"
                  aria-label="Rüti ZH auf Google Maps anzeigen (öffnet in neuem Tab)"
                >
                  Auf Google Maps ansehen →
                </a>
              </div>
            </aside>

            {/* ── Right column — contact form ────────────────────────── */}
            <div
              className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-[var(--shadow-card)]"
              aria-label="Kontaktformular"
            >
              <h2 className="text-2xl font-bold text-brand-primary mb-1">
                Schreiben Sie uns
              </h2>
              <p className="text-brand-text-muted text-sm mb-7">
                Felder mit{" "}
                <span className="text-brand-error font-semibold" aria-hidden="true">
                  *
                </span>{" "}
                sind Pflichtfelder.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ─────────────────────────────────────────────── */}
      <CtaSection />
    </main>
  );
}
