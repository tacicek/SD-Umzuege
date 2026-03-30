import Image from "next/image";
import Link from "next/link";

interface ServiceHeroProps {
  title: string;
  emoji: string;
  description: string;
  heroImage: string;
  price: string;
}

export default function ServiceHero({
  title,
  emoji,
  description,
  heroImage,
  price,
}: ServiceHeroProps) {
  return (
    <section
      className="relative bg-brand-primary overflow-hidden"
      aria-label={`${title} — SD-Umzüge`}
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
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left — content */}
          <div className="flex flex-col gap-5 order-2 lg:order-1">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-white/60">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-white/40">/</li>
                <li className="text-white/90" aria-current="page">{title}</li>
              </ol>
            </nav>

            {/* Emoji + Title */}
            <div className="flex items-center gap-3">
              <span className="text-4xl" aria-hidden="true">{emoji}</span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
                {title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-white/80 leading-relaxed max-w-xl">
              {description}
            </p>

            {/* Price badge */}
            <div className="inline-flex items-center gap-2 self-start bg-brand-accent/20 border border-brand-accent/40 rounded-full px-4 py-2">
              <span className="text-brand-accent font-extrabold text-xl">{price}</span>
              <span className="text-white/70 text-sm">· Festpreis</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mt-1">
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
          </div>

          {/* Right — hero image */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2">
            <Image
              src={heroImage}
              alt={`${title} — SD-Umzüge`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-brand-primary/10 rounded-2xl" aria-hidden="true" />
          </div>

        </div>
      </div>
    </section>
  );
}
