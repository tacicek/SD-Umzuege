import type { Metadata } from "next";
import Link from "next/link";
import ReinigungForm from "@/components/forms/ReinigungForm";

export const metadata: Metadata = {
  title: "Reinigung Offerte anfordern | SD-Umzüge",
  description:
    "Unverbindliche Offerte für Wohnungsreinigung, Büroreinigung oder Unterhaltsreinigung — mit Abnahmegarantie.",
  robots: { index: false, follow: false },
};

export default function ReinigungAngebotPage() {
  return (
    <main className="flex-1 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-brand-text-muted">
            <li><Link href="/" className="hover:text-brand-primary transition-colors">Home</Link></li>
            <li aria-hidden="true" className="opacity-40">/</li>
            <li><Link href="/reinigung" className="hover:text-brand-primary transition-colors">Reinigung</Link></li>
            <li aria-hidden="true" className="opacity-40">/</li>
            <li className="text-brand-primary font-medium" aria-current="page">Offerte anfordern</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent font-semibold text-sm rounded-full px-4 py-1.5 mb-4">
            <span aria-hidden="true">🧹</span> Reinigung
          </span>
          <h1 className="text-4xl font-extrabold text-brand-primary tracking-tight">
            Offerte für Ihre Reinigung
          </h1>
          <p className="mt-3 text-brand-text-muted text-lg leading-relaxed">
            Erhalten Sie innert 24 Stunden ein unverbindliches Angebot — inkl.
            Abnahmegarantie für Wohnungsübergaben.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            "Abnahmegarantie",
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
          <ReinigungForm />
        </div>
      </div>
    </main>
  );
}
