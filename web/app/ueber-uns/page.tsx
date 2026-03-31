import type { Metadata } from "next";
import Link from "next/link";
import CtaSection from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Über SD-Umzüge — Ihr Umzugsunternehmen in Zürich",
  description:
    "Lernen Sie SD-Umzüge kennen — über 10 Jahre Erfahrung und 500+ erfolgreiche Umzüge in Zürich & Deutschschweiz. Festpreisgarantie, Vollversicherung, persönliche Betreuung vom ersten Telefonat bis zur Übergabe.",
  alternates: { canonical: "/ueber-uns" },
  openGraph: {
    title: "Über SD-Umzüge — Ihr Umzugsunternehmen in Zürich",
    description:
      "10+ Jahre Erfahrung, 500+ erfolgreiche Umzüge. SD-Umzüge — Festpreisgarantie und Vollversicherung inklusive.",
    url: "/ueber-uns",
  },
};

// ── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: "500+", label: "Erfolgreiche Umzüge" },
  { value: "100%", label: "Festpreisgarantie" },
  { value: "10+", label: "Jahre Erfahrung" },
  { value: "CHF 100'000", label: "Vollversicherung" },
];

const values = [
  {
    icon: "🤝",
    title: "Zuverlässigkeit",
    description:
      "Wir erscheinen pünktlich, halten Abmachungen ein und bringen jeden Auftrag sorgfältig zu Ende. Auf uns ist Verlass — von der Planung bis zur letzten Kiste.",
  },
  {
    icon: "💡",
    title: "Transparenz",
    description:
      "Keine versteckten Kosten, keine bösen Überraschungen. Sie erhalten vorab einen verbindlichen Festpreis, damit Sie sicher planen können.",
  },
  {
    icon: "⭐",
    title: "Qualität",
    description:
      "Wir behandeln Ihr Hab und Gut so, als wäre es unser eigenes. Professionelles Material, erfahrene Mitarbeitende und sorgfältige Ausführung sind unser Standard.",
  },
  {
    icon: "❤️",
    title: "Kundenorientierung",
    description:
      "Jeder Umzug ist einzigartig. Wir hören zu, passen uns Ihren Wünschen an und begleiten Sie persönlich durch den gesamten Prozess.",
  },
];

const whyPoints = [
  "Festpreisgarantie ohne Überraschungen",
  "Vollversicherung inklusive",
  "Erfahrenes & freundliches Team",
  "Pünktliche Durchführung",
  "Umweltbewusstes Arbeiten",
  "Regionale Expertise im Kanton Zürich",
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function UeberUnsPage() {
  return (
    <main className="flex-1">
      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
      <section
        className="relative bg-brand-primary overflow-hidden"
        aria-labelledby="ueber-uns-heading"
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary-light to-[#0f2547] opacity-90"
          aria-hidden="true"
        />
        {/* Decorative blobs */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-primary-light opacity-20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-accent opacity-10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/40">/</li>
              <li className="text-white/90" aria-current="page">
                Über uns
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-5 max-w-2xl">
            <h1
              id="ueber-uns-heading"
              className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight"
            >
              Über uns
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
              S&amp;D Umzüge — Ihr zuverlässiger Partner für Umzug, Reinigung
              und Räumung in der Region Zürich und der ganzen Deutschschweiz.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Story ─────────────────────────────────────────────────── */}
      <section
        className="bg-white py-16 md:py-24"
        aria-labelledby="story-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">
            {/* Left — text */}
            <div className="flex flex-col gap-6">
              <h2
                id="story-heading"
                className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight"
              >
                Unsere Geschichte
              </h2>
              <div className="flex flex-col gap-4 text-brand-text-muted leading-relaxed">
                <p>
                  S&amp;D Umzüge wurde vor über zehn Jahren von zwei
                  leidenschaftlichen Unternehmern in Rüti ZH gegründet. Was als
                  kleiner Familienbetrieb mit einem Lieferwagen begann, hat sich
                  seither zu einem der verlässlichsten Umzugsunternehmen im
                  Kanton Zürich entwickelt. Unser Antrieb war damals wie heute
                  derselbe: Umzüge so unkompliziert und stressfrei wie möglich
                  zu gestalten.
                </p>
                <p>
                  Über 500 Umzüge, zahlreiche Reinigungen und Räumungen später
                  sind wir stolz auf unser gewachsenes Team aus erfahrenen Fach­
                  kräften. Wir kennen die Region, kennen die besonderen
                  Anforderungen schweizer Mietverhältnisse — und wir wissen, wie
                  wichtig Vertrauen und Transparenz bei einem Umzug sind. Jeder
                  Auftrag wird mit demselben Engagement ausgeführt: persönlich,
                  pünktlich und zu einem fairen Festpreis.
                </p>
              </div>
            </div>

            {/* Right — stats grid */}
            <div
              className="grid grid-cols-2 gap-5"
              aria-label="Kennzahlen S&amp;D Umzüge"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-brand-bg-subtle border border-gray-200 rounded-2xl p-6 shadow-[var(--shadow-card)] flex flex-col gap-2 items-center text-center"
                >
                  <span className="text-2xl sm:text-3xl font-extrabold text-brand-accent leading-none">
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium text-brand-text-muted leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Values ────────────────────────────────────────────────── */}
      <section
        className="bg-brand-bg-subtle py-16 md:py-24"
        aria-labelledby="values-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="values-heading"
              className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight"
            >
              Unsere Werte
            </h2>
            <p className="mt-3 text-brand-text-muted text-lg max-w-xl mx-auto">
              Diese Grundsätze leiten uns bei jedem Auftrag — vom ersten
              Telefonat bis zur abgeschlossenen Übergabe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <article
                key={v.title}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-[var(--shadow-card)] flex flex-col gap-4"
                aria-labelledby={`value-${v.title.toLowerCase()}-title`}
              >
                <span className="text-4xl" aria-hidden="true">
                  {v.icon}
                </span>
                <h3
                  id={`value-${v.title.toLowerCase()}-title`}
                  className="text-lg font-bold text-brand-primary"
                >
                  {v.title}
                </h3>
                <p className="text-brand-text-muted text-sm leading-relaxed">
                  {v.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Why us ────────────────────────────────────────────────── */}
      <section
        className="bg-white py-16 md:py-24"
        aria-labelledby="why-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="why-heading"
              className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight"
            >
              Warum S&amp;D Umzüge?
            </h2>
            <p className="mt-3 text-brand-text-muted text-lg max-w-xl mx-auto">
              Wir machen den Unterschied — mit klaren Versprechen, die wir auch
              einhalten.
            </p>
          </div>

          <ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
            aria-label="Vorteile von S&amp;D Umzüge"
          >
            {whyPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 bg-brand-bg-subtle border border-gray-200 rounded-2xl px-5 py-4 shadow-[var(--shadow-card)]"
              >
                <span
                  className="shrink-0 mt-0.5 size-5 rounded-full bg-brand-accent flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 12 10"
                    fill="none"
                    className="size-3"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 5l3.5 3.5L11 1"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-brand-primary font-medium text-sm sm:text-base leading-snug">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 5. CTA ───────────────────────────────────────────────────── */}
      <CtaSection />
    </main>
  );
}
