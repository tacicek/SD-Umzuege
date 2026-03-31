import type { Metadata } from "next";
import Link from "next/link";
import RaeumungForm from "@/components/forms/RaeumungForm";

export const metadata: Metadata = {
  title: "Räumung Offerte anfordern | SD-Umzüge",
  description:
    "Unverbindliche Offerte für Wohnungsräumung, Kellerräumung oder Haushaltsauflösung — schnell und zuverlässig.",
  robots: { index: false, follow: false },
};

export default function RaeumungAngebotPage() {
  return (
    <main className="flex-1 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-brand-text-muted">
            <li><Link href="/" className="hover:text-brand-primary transition-colors">Home</Link></li>
            <li aria-hidden="true" className="opacity-40">/</li>
            <li><Link href="/raeumung" className="hover:text-brand-primary transition-colors">Räumung</Link></li>
            <li aria-hidden="true" className="opacity-40">/</li>
            <li className="text-brand-primary font-medium" aria-current="page">Offerte anfordern</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent font-semibold text-sm rounded-full px-4 py-1.5 mb-4">
            <span aria-hidden="true">📦</span> Räumung
          </span>
          <h1 className="text-4xl font-extrabold text-brand-primary tracking-tight">
            Offerte für Ihre Räumung
          </h1>
          <p className="mt-3 text-brand-text-muted text-lg leading-relaxed">
            Erhalten Sie innert 24 Stunden ein unverbindliches Angebot für Ihre
            Räumung — umweltgerecht und professionell.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            "Umweltgerechte Entsorgung",
            "Festpreisgarantie",
            "Innert 24h Antwort",
          ].map((badge) => (
            <span
              key={badge}
              className="text-xs font-medium bg-brand-bg-subtle text-brand-primary rounded-full px-3 py-1.5 border border-border"
            >
              ✓ {badge}
            </span>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl border border-border shadow-card p-8 md:p-10">
          <RaeumungForm />
        </div>
      </div>
    </main>
  );
}
