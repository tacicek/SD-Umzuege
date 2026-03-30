import type { Metadata } from "next";
import Link from "next/link";
import AngebotForm from "@/components/forms/AngebotForm";

export const metadata: Metadata = {
  title: "Angebot anfordern | SD-Umzüge",
  description:
    "Fordern Sie jetzt ein unverbindliches Angebot für Umzug, Reinigung, Räumung oder Klaviertransport an — innert 24 Stunden erhalten Sie Ihre persönliche Offerte.",
};

const SERVICES = [
  {
    slug: "umzug",
    emoji: "\uD83D\uDE9B",
    title: "Umzug",
    desc: "Privat-, Firmen- oder Auslandsumzug",
    href: "/umzug/angebot",
  },
  {
    slug: "reinigung",
    emoji: "\uD83E\uDDF9",
    title: "Reinigung",
    desc: "Wohnungs-, Büro- oder Unterhaltsreinigung",
    href: "/reinigung/angebot",
  },
  {
    slug: "raeumung",
    emoji: "\uD83D\uDCE6",
    title: "Räumung",
    desc: "Wohnungs-, Keller- oder Haushaltsauflösung",
    href: "/raeumung/angebot",
  },
  {
    slug: "klaviertransport",
    emoji: "\uD83C\uDFB9",
    title: "Klaviertransport",
    desc: "Klavier, Flügel oder Digitalpiano",
    href: "/klaviertransport/angebot",
  },
];

export default function AngebotPage() {
  return (
    <main className="flex-1 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent font-semibold text-sm rounded-full px-4 py-1.5 mb-4">
            Kostenlose Offerte
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-primary tracking-tight">
            Angebot anfordern
          </h1>
          <p className="mt-4 text-brand-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Nutzen Sie das allgemeine Formular oder wählen Sie direkt Ihren
            Wunschservice für eine detailliertere Anfrage.
          </p>
        </div>

        {/* Service quick links */}
        <section
          aria-labelledby="service-links-heading"
          className="mb-14"
        >
          <h2
            id="service-links-heading"
            className="text-sm font-semibold text-brand-text-muted uppercase tracking-wider mb-5"
          >
            Direkt zum passenden Formular
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={s.href}
                className="group flex flex-col gap-2 rounded-2xl border border-border bg-white hover:border-brand-accent hover:shadow-card p-5 transition-all"
                aria-label={`${s.title} Offerte anfordern`}
              >
                <span className="text-3xl" aria-hidden="true">
                  {s.emoji}
                </span>
                <span className="font-semibold text-brand-primary text-sm group-hover:text-brand-accent transition-colors">
                  {s.title}
                </span>
                <span className="text-xs text-brand-text-muted leading-relaxed">
                  {s.desc}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="relative mb-14">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-brand-bg-subtle px-4 text-sm text-brand-text-muted">
              oder allgemeine Anfrage stellen
            </span>
          </div>
        </div>

        {/* General form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl border border-border shadow-card p-8 md:p-10">
            <h2 className="text-2xl font-bold text-brand-primary mb-6">
              Allgemeine Anfrage
            </h2>
            <AngebotForm />
          </div>
        </div>
      </div>
    </main>
  );
}
