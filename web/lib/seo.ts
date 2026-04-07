/**
 * Centralized SEO constants.
 *
 * SITE_URL is driven by the NEXT_PUBLIC_SITE_URL env var so Coolify
 * can inject the correct value without code changes.
 *
 * Coolify setup:
 *   NEXT_PUBLIC_SITE_URL=https://sd-umzuege.ch
 *
 * Also configure a redirect in Coolify (or nginx):
 *   www.sd-umzuege.ch  →  sd-umzuege.ch  (301)
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sd-umzuege.ch"
).replace(/\/$/, "");

export const SITE_NAME = "SD-Umzüge";

/** Full URL helper — avoids double slashes */
export function siteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
