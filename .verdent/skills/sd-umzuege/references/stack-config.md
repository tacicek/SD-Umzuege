# Stack Configuration — SD-Umzüge

## Core

| Layer        | Choice                        | Version |
|--------------|-------------------------------|---------|
| Framework    | Next.js (App Router)          | 15.x    |
| Language     | TypeScript                    | 5.x     |
| Styling      | Tailwind CSS                  | v4      |
| UI Kit       | shadcn/ui                     | latest  |
| Package Mgr  | pnpm                          | 9.x     |

## Key Dependencies

```json
{
  "next": "^15",
  "react": "^19",
  "react-dom": "^19",
  "typescript": "^5",
  "tailwindcss": "^4",
  "react-hook-form": "^7",
  "zod": "^3",
  "@hookform/resolvers": "^3",
  "lucide-react": "latest",
  "next-themes": "latest"
}
```

## Project Structure

```
app/
  layout.tsx          # Root layout (font, metadata, providers)
  page.tsx            # Homepage (/)
  angebot/page.tsx    # Quote request (/angebot)
  leistungen/page.tsx # Services (/leistungen)
  ueber-uns/page.tsx  # About (/ueber-uns)
  kontakt/page.tsx    # Contact (/kontakt)
  impressum/page.tsx  # Legal notice (/impressum)
  datenschutz/page.tsx# Privacy policy (/datenschutz)
components/
  ui/                 # shadcn/ui primitives
  layout/             # Header, Footer, Nav
  sections/           # Page-level section components
lib/
  utils.ts            # cn() and shared utilities
  validations.ts      # Zod schemas (quote form, contact form)
public/
  images/             # Optimized images
```

## Environment Variables

```
NEXT_PUBLIC_SITE_URL=https://sd-umzuege.de
CONTACT_EMAIL=info@sd-umzuege.de
# Add SMTP / form handler vars here
```

## Commands

```bash
pnpm dev        # Start dev server (localhost:3000)
pnpm build      # Production build
pnpm lint       # ESLint
pnpm type-check # tsc --noEmit
```
