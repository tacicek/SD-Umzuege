---
name: sd-umzuege
description: >
  Project skill for SD-Umzüge, a German moving company website. This skill should be used
  when building, editing, reviewing, or improving any part of the SD-Umzüge project.
  Triggers on tasks involving the homepage, quote form, service pages, contact page,
  moving company branding, German-language UI, Next.js frontend, Tailwind styling,
  design tokens, component architecture, code review, or frontend quality checks.
  Also covers orchestrating the Reviewer subagent and SeniorFrontendAgent subagent
  for this project.
---

# SD-Umzüge Project Skill

SD-Umzüge is a German moving company website. The goal is a clean, professional,
conversion-optimized site that builds trust and drives quote requests.

## Stack

See `references/stack-config.md` for full details. In short:
- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Language**: German (de-DE), no i18n library needed at this stage

## Design

See `references/design-tokens.md` for colors, typography, and spacing. Always use
the defined CSS custom properties — never hard-code hex values.

## Pages

See `references/page-specs.md` for the full page list, routes, and per-page requirements.

## Coding Conventions

- Use App Router file-based routing (`app/` directory).
- All user-facing text is in German.
- Prefer Server Components; use `"use client"` only when interactivity is required.
- Keep components small and focused. Co-locate styles via Tailwind classes.
- Forms: use `react-hook-form` + `zod` for validation.
- Images: use `next/image` with explicit `width`/`height` or `fill`.
- Accessibility: semantic HTML, ARIA labels on interactive elements, keyboard-navigable.

## Subagent Orchestration

### SeniorFrontendAgent
Invoke for: building new pages/components, refactoring UI, fixing layout or responsive issues,
implementing animations, improving accessibility. Always pass the relevant page spec from
`references/page-specs.md` and design tokens from `references/design-tokens.md`.

### Reviewer
Invoke after any non-trivial implementation. Instruct it to check:
1. Adherence to design tokens and coding conventions above
2. German copy accuracy and tone
3. Accessibility (semantic HTML, ARIA, keyboard nav)
4. Performance (unnecessary client components, missing `next/image`, large imports)
5. Security (no exposed env vars, sanitized user inputs)

Always include `<user_language>German</user_language>` in Reviewer instructions.
