import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, FileCheck2, CheckCircle } from "lucide-react";

const cards = [
  {
    icon: ShieldCheck,
    iconColor: "#103590",
    iconBg: "bg-[#103590]/10",
    title: "Haftpflichtversicherung",
    description:
      "AXA deckt Personen- und Sachschäden bis CHF 10'000'000 ab. Alle Schäden durch Dritte sind vollversichert.",
  },
  {
    icon: CheckCircle2,
    iconColor: "#10b981",
    iconBg: "bg-[#10b981]/10",
    title: "Doppelte Sicherheit",
    description:
      "Im Schadensfall werden alle in einem Versicherungsjahr entstandenen Schäden bis zum Doppelten der Versicherungssumme bezahlt.",
  },
  {
    icon: FileCheck2,
    iconColor: "#103590",
    iconBg: "bg-[#103590]/10",
    title: "Umfassender Schutz",
    description:
      "Rechtsschutz, Produktrückruf, Warenlieferungen ins Ausland — alles vollständig abgedeckt, ohne Ausnahmen.",
  },
];

const checklist = [
  "Personen- und Sachschäden bis CHF 100'000",
  "Rechtsschutz in Straf-, Disziplinar- und Verwaltungsverfahren",
  "Produktrückruf- und Benachrichtigungskosten",
  "Unbewusste Warenlieferungen in USA und Kanada",
  "Schäden an gemieteten Grundstücken und Räumlichkeiten",
];

export default function InsuranceSection() {
  return (
    <section
      id="versicherung"
      className="bg-slate-50 py-16 md:py-20"
      aria-labelledby="insurance-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="inline-flex items-center gap-2 bg-[#103590]/10 text-[#103590] font-semibold text-sm rounded-full px-4 py-1.5">
            <span aria-hidden="true">🛡️</span>
            Versicherung & Sicherheit
          </span>
          <h2
            id="insurance-heading"
            className="text-3xl sm:text-4xl font-extrabold text-[#103590] tracking-tight"
          >
            Vollversichert bis CHF 100&apos;000
          </h2>
          <p className="text-slate-500 text-base sm:text-lg font-medium">
            Ihre Sicherheit ist unsere Priorität
          </p>
        </div>

        {/* ── AXA Banner ── */}
        <div className="rounded-2xl overflow-hidden mb-10 shadow-lg">
          <div className="bg-[#103590] px-6 py-7 flex flex-col sm:flex-row items-center gap-6">
            {/* AXA Logo */}
            <div className="flex-shrink-0 flex items-center justify-center w-28 h-14 relative">
              <Image
                src="/images/Axa-Logo.svg"
                alt="AXA Versicherung"
                fill
                className="object-contain drop-shadow-md"
                sizes="112px"
              />
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px self-stretch bg-white/20" aria-hidden="true" />

            {/* Intro text */}
            <p className="text-white/90 text-sm sm:text-base leading-relaxed text-center sm:text-left">
              Ihre Einrichtung und Ihr Eigentum sind bei uns sicher. Alle Umzüge und
              Dienstleistungen von SD-Umzüge sind bis{" "}
              <strong className="text-white font-semibold">CHF 100&apos;000 vollversichert</strong>.
              Mit <strong className="text-white font-semibold">AXA</strong> als Partner haben Sie
              maximale Sicherheit — damit Ihr Umzug ohne Sorgen verläuft.
            </p>
          </div>
        </div>

        {/* ── 3-Card Grid ── */}
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <li key={card.title}>
                <article className="flex flex-col h-full bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <span
                    className={`flex items-center justify-center w-12 h-12 rounded-xl ${card.iconBg} mb-4 flex-shrink-0`}
                    aria-hidden="true"
                  >
                    <Icon size={22} color={card.iconColor} strokeWidth={2} />
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{card.description}</p>
                </article>
              </li>
            );
          })}
        </ul>

        {/* ── Checklist + CTA ── */}
        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-8 shadow-sm flex flex-col lg:flex-row gap-8 items-start lg:items-center">
          {/* Checklist */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-5">
              Was ist versichert?
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle
                    size={18}
                    color="#10b981"
                    strokeWidth={2.5}
                    className="flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-slate-700 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px self-stretch bg-slate-200" aria-hidden="true" />

          {/* CTA */}
          <div className="flex flex-col items-center lg:items-start gap-3 lg:w-52 flex-shrink-0">
            <p className="text-sm text-slate-500 text-center lg:text-left leading-snug">
              Profitieren Sie von unserer Vollversicherung ab dem ersten Tag.
            </p>
            <Link
              href="/angebot"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#103590] hover:bg-[#0c2870] text-white font-semibold px-6 py-3 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#103590] focus-visible:ring-offset-2 w-full lg:w-auto"
            >
              <span aria-hidden="true">📋</span>
              Jetzt Offerte anfordern
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
