import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import gemeindenData from "@/data/gemeinden.json";
import { getServiceBySlug, toSubSlug } from "@/lib/services";

const SERVICES = ["umzug", "reinigung", "raeumung", "klaviertransport"] as const;
type ServiceSlug = (typeof SERVICES)[number];

interface GemeindeEntry {
  slug: string;
  einwohner: number;
  services: Record<string, { aktiv: boolean }>;
}

const gemeinden = gemeindenData as GemeindeEntry[];

/** Static pages — date reflects when content was last meaningfully updated */
const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`,                 lastModified: new Date("2025-01-15"), changeFrequency: "weekly",  priority: 1.0 },
  { url: `${SITE_URL}/leistungen`,       lastModified: new Date("2025-01-15"), changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/umzug`,            lastModified: new Date("2025-01-15"), changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/reinigung`,        lastModified: new Date("2025-01-15"), changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/raeumung`,         lastModified: new Date("2025-01-15"), changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/klaviertransport`, lastModified: new Date("2025-01-15"), changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/angebot`,          lastModified: new Date("2025-01-15"), changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/kontakt`,          lastModified: new Date("2025-01-15"), changeFrequency: "monthly", priority: 0.7 },
  { url: `${SITE_URL}/ueber-uns`,        lastModified: new Date("2025-01-15"), changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_URL}/impressum`,        lastModified: new Date("2025-01-15"), changeFrequency: "yearly",  priority: 0.3 },
  { url: `${SITE_URL}/datenschutz`,      lastModified: new Date("2025-01-15"), changeFrequency: "yearly",  priority: 0.3 },
];

/** /umzug/privatumzug, /umzug/firmenumzug, /umzug/auslandsumzug etc. */
function subServiceUrls(): MetadataRoute.Sitemap {
  const umzug = getServiceBySlug("umzug");
  if (!umzug) return [];
  return umzug.subServices.map((sub) => ({
    url: `${SITE_URL}/umzug/${toSubSlug(sub.title)}`,
    lastModified: new Date("2025-01-15"),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));
}

/** /{service}/gemeinde/{slug} — location landing pages */
function locationUrls(): MetadataRoute.Sitemap {
  return gemeinden.flatMap((g) =>
    SERVICES.filter((s: ServiceSlug) => g.services[s]?.aktiv).map((s) => ({
      url: `${SITE_URL}/${s}/gemeinde/${g.slug}`,
      lastModified: new Date("2025-04-01"),
      changeFrequency: "monthly" as const,
      priority: g.einwohner > 50000 ? 0.9 : g.einwohner > 20000 ? 0.85 : 0.8,
    }))
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_PAGES,
    ...subServiceUrls(),
    ...locationUrls(),
  ];
}
