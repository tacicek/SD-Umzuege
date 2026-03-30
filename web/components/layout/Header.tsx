import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getServiceBySlug } from "@/lib/services";

const rightNavLinks = [
  { href: "/reinigung",         label: "Reinigung" },
  { href: "/raeumung",          label: "Räumung" },
  { href: "/klaviertransport",  label: "Klaviertransport" },
  { href: "/ueber-uns",         label: "Über uns" },
  { href: "/kontakt",           label: "Kontakt" },
];

export default function Header() {
  const umzug = getServiceBySlug("umzug");

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="SD-Umzüge — Startseite">
          <Image
            src="/images/SD-Umzug-Logo.webp"
            alt="S&D Umzüge Logo"
            width={160}
            height={52}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Hauptnavigation">

          {/* Umzug — dropdown with sub-services */}
          <div className="relative group">
            <Link
              href="/umzug"
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-brand-text-muted hover:text-brand-primary transition-colors rounded-md hover:bg-gray-50"
            >
              Umzug
              <svg
                className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            {/* Dropdown */}
            <div
              className="absolute left-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50"
              role="menu"
              aria-label="Umzug Untermenü"
            >
              <div className="p-1.5">
                {umzug?.subServices.map((sub) => (
                  <Link
                    key={sub.title}
                    href={`/umzug/${sub.title.toLowerCase().replace(/\s+/g, "-").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")}`}
                    role="menuitem"
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary transition-colors"
                  >
                    <span aria-hidden="true">{sub.emoji}</span>
                    {sub.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Flat service + page links */}
          {rightNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-brand-text-muted hover:text-brand-primary transition-colors rounded-md hover:bg-gray-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Button
          asChild
          className="bg-brand-accent hover:bg-brand-accent-dark text-white rounded-full"
        >
          <Link href="/angebot">Angebot anfordern</Link>
        </Button>

      </div>
    </header>
  );
}
