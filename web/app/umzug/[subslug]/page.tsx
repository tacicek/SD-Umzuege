import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getServiceBySlug,
  getSubServiceBySlug,
  toSubSlug,
} from "@/lib/services";
import CtaSection from "@/components/sections/CtaSection";

export function generateStaticParams() {
  const umzug = getServiceBySlug("umzug");
  if (!umzug) return [];
  return umzug.subServices.map((sub) => ({ subslug: toSubSlug(sub.title) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subslug: string }>;
}): Promise<Metadata> {
  const { subslug } = await params;
  const sub = getSubServiceBySlug("umzug", subslug);
  if (!sub) return {};
  return {
    title: `${sub.title} | SD-Umzüge`,
    description: sub.description,
  };
}

export default async function UmzugSubPage({
  params,
}: {
  params: Promise<{ subslug: string }>;
}) {
  const { subslug } = await params;
  const sub = getSubServiceBySlug("umzug", subslug);
  if (!sub) notFound();

  return (
    <main>
      {/* Hero */}
      <section
        className="relative bg-brand-primary overflow-hidden"
        aria-label={`${sub.title} — SD-Umzüge`}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary-light to-[#0f2547] opacity-90"
          aria-hidden="true"
        />
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-primary-light opacity-20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left — content */}
            <div className="flex flex-col gap-5 order-2 lg:order-1">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center gap-2 text-sm text-white/60">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-white/40">/</li>
                  <li>
                    <Link href="/umzug" className="hover:text-white transition-colors">
                      Umzug
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-white/40">/</li>
                  <li className="text-white/90" aria-current="page">
                    {sub.title}
                  </li>
                </ol>
              </nav>

              {/* Emoji + Title */}
              <div className="flex items-center gap-3">
                <span className="text-4xl" aria-hidden="true">{sub.emoji}</span>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  {sub.title}
                </h1>
              </div>

              {/* Description */}
              <p className="text-lg text-white/80 leading-relaxed max-w-xl">
                {sub.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-1">
                <Link
                  href="/umzug/angebot"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold px-7 py-3.5 text-base transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary"
                >
                  Kostenlose Offerte
                  <span aria-hidden="true">→</span>
                </Link>
                <a
                  href="tel:+41765053792"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-3.5 text-base transition-colors duration-200"
                  aria-label="Anrufen: +41 76 505 37 92"
                >
                  <span aria-hidden="true">📞</span>
                  +41 76 505 37 92
                </a>
              </div>
            </div>

            {/* Right — image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2">
              <Image
                src={sub.image}
                alt={`${sub.title} — SD-Umzüge`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-brand-primary/10 rounded-2xl" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-white" aria-labelledby="features-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="features-heading"
            className="text-2xl sm:text-3xl font-extrabold text-brand-primary mb-10 text-center"
          >
            Was ist im {sub.title} enthalten?
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sub.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 bg-brand-bg-subtle rounded-xl px-5 py-4 border border-gray-100"
              >
                <span className="text-brand-success font-bold text-lg mt-0.5 flex-shrink-0" aria-hidden="true">
                  ✓
                </span>
                <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Back to Umzug + CTA */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/umzug/angebot"
              className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-dark text-white rounded-full px-8 py-3.5 font-semibold text-base transition-colors shadow-[var(--shadow-cta)]"
            >
              Jetzt Offerte anfordern →
            </Link>
            <Link
              href="/umzug"
              className="inline-flex items-center gap-2 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white rounded-full px-8 py-3.5 font-semibold text-base transition-colors"
            >
              Alle Umzugsleistungen
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
