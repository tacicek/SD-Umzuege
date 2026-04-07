import gemeindenData from "@/data/gemeinden.json";
import fotosData from "@/data/gemeinden-fotos.json";

export interface FotoEntry {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface GalerieEntry extends FotoEntry {
  caption?: string;
}

export interface FaqEntry {
  frage: string;
  antwort: string;
}

export interface ServiceData {
  aktiv: boolean;
  h1: string;
  heroSubtitel: string;
  preisHinweis: string;
  lokaleFakten: string[];
  faq: FaqEntry[];
}

export interface Gemeinde {
  gemeinde: string;
  slug: string;
  kanton: string;
  bezirk: string;
  einwohner: number;
  plz: string[];
  koordinaten: { lat: number; lng: number };
  stadtteile?: string[];
  nachbargemeinden: string[];
  beschreibung: string;
  services: Record<string, ServiceData>;
}

export type ServiceSlug = "umzug" | "reinigung" | "raeumung" | "klaviertransport";

const DEFAULT_FOTOS: Record<ServiceSlug, FotoEntry> = {
  umzug: {
    src: "/images/Umzugsfirma-sd-umzuege.webp",
    alt: "SD-Umzüge professionelle Umzugsfirma",
    width: 1200,
    height: 630,
  },
  reinigung: {
    src: "https://qzmyqkolzrckgaxaypxc.supabase.co/storage/v1/object/public/Offerio%20Media/Reinigung/Reinigung-Hero.webp",
    alt: "SD-Umzüge professionelle Reinigung mit Abnahmegarantie",
    width: 1200,
    height: 630,
  },
  raeumung: {
    src: "/images/Reaumung-sd-umzuege.webp",
    alt: "SD-Umzüge professionelle Wohnungsräumung",
    width: 1200,
    height: 630,
  },
  klaviertransport: {
    src: "/images/Pianotransport-sd-umzuege.webp",
    alt: "SD-Umzüge fachgerechter Klaviertransport",
    width: 1200,
    height: 630,
  },
};

export const gemeinden: Gemeinde[] = gemeindenData as Gemeinde[];

export function getGemeindeBySlug(slug: string): Gemeinde | undefined {
  return gemeinden.find((g) => g.slug === slug);
}

export function getActiveGemeindenForService(service: ServiceSlug): Gemeinde[] {
  return gemeinden.filter((g) => g.services[service]?.aktiv === true);
}

export function getAllActiveGemeindenSlugs(service: ServiceSlug): string[] {
  return getActiveGemeindenForService(service).map((g) => g.slug);
}

export function getLocationPhoto(slug: string, service: ServiceSlug): FotoEntry {
  const fotos = fotosData as unknown as Record<string, Record<string, { hero?: FotoEntry }>>;
  const hero = fotos[slug]?.[service]?.hero;
  if (hero && hero.src && !hero.src.includes("PLACEHOLDER")) return hero;
  return DEFAULT_FOTOS[service];
}

export function getLocationGalerie(slug: string, service: ServiceSlug): GalerieEntry[] {
  const fotos = fotosData as unknown as Record<string, Record<string, { galerie?: GalerieEntry[] }>>;
  return fotos[slug]?.[service]?.galerie ?? [];
}

export function getNachbarGemeinden(
  gemeinde: Gemeinde,
  service: ServiceSlug,
  limit = 5
): Gemeinde[] {
  return gemeinde.nachbargemeinden
    .map((slug) => getGemeindeBySlug(slug))
    .filter(
      (g): g is Gemeinde => g !== undefined && g.services[service]?.aktiv === true
    )
    .slice(0, limit);
}

export const SERVICE_LABELS: Record<ServiceSlug, string> = {
  umzug: "Umzug",
  reinigung: "Reinigung",
  raeumung: "Räumung",
  klaviertransport: "Klaviertransport",
};

export const ANGEBOT_HREFS: Record<ServiceSlug, string> = {
  umzug: "/umzug/angebot",
  reinigung: "/reinigung/angebot",
  raeumung: "/raeumung/angebot",
  klaviertransport: "/klaviertransport/angebot",
};

export const SERVICE_HUB_HREFS: Record<ServiceSlug, string> = {
  umzug: "/umzug",
  reinigung: "/reinigung",
  raeumung: "/raeumung",
  klaviertransport: "/klaviertransport",
};
