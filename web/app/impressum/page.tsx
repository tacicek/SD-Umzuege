import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | SD-Umzüge",
  description: "Impressum von SD-Umzüge — Angaben gemäss Schweizer Recht.",
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
  return (
    <main className="flex-1 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-brand-primary">Impressum</h1>
        <p className="mt-4 text-brand-text-muted">Angaben gemäß § 5 TMG — Seite in Bearbeitung.</p>
      </div>
    </main>
  );
}
