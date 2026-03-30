import servicesData from "@/data/services.json";

export interface SubService {
  title: string;
  emoji: string;
  description: string;
  image: string;
  features: string[];
}

export interface Service {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  heroImage: string;
  price: string;
  subServices: SubService[];
}

export const services: Service[] = servicesData as Service[];

export function getAllServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

/** "Privatumzug" → "privatumzug", "Büroreinigung" → "buroreinigung" */
export function toSubSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ß/g, "ss")
    .replace(/\s+/g, "-");
}

export function getSubServiceBySlug(
  serviceSlug: string,
  subSlug: string
): SubService | undefined {
  const service = getServiceBySlug(serviceSlug);
  return service?.subServices.find((s) => toSubSlug(s.title) === subSlug);
}
