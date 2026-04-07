import { MetadataRoute } from "next";
import gemeindenData from "@/data/gemeinden.json";

const BASE_URL = "https://www.sd-umzuege.ch";
const SERVICES = ["umzug", "reinigung", "raeumung", "klaviertransport"] as const;

type ServiceSlug = (typeof SERVICES)[number];

interface GemeindeEntry {
  slug: string;
  einwohner: number;
  services: Record<string, { aktiv: boolean }>;
}

const gemeinden = gemeindenData as GemeindeEntry[];

function locationUrls(): MetadataRoute.Sitemap {
  const now = new Date();
  return gemeinden.flatMap((g) =>
    SERVICES.filter((s: ServiceSlug) => g.services[s]?.aktiv).map((s) => ({
      url: `${BASE_URL}/${s}/gemeinde/${g.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: g.einwohner > 50000 ? 0.9 : g.einwohner > 20000 ? 0.85 : 0.8,
    }))
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/leistungen`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzug`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigung`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/raeumung`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/klaviertransport`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/angebot`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/kontakt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ueber-uns`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/impressum`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/datenschutz`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...locationUrls(),
  ];
}
