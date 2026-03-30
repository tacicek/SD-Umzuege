# Design Tokens — SD-Umzüge

## Color Palette

Brand colors live in `app/globals.css` under `@theme` with a `--brand-*` prefix
(to avoid collision with shadcn/ui's `--color-primary` / `--color-accent` namespace).
shadcn's `:root` semantic vars (`--primary`, `--accent`) are pointed to our brand values.

```css
/* @theme block — generates Tailwind utilities: bg-brand-primary, text-brand-accent, etc. */
--color-brand-primary:       #1A3C6E;   /* deep navy */
--color-brand-primary-light: #2A5298;
--color-brand-accent:        #F97316;   /* orange — CTAs */
--color-brand-accent-dark:   #EA6B0A;
--color-brand-bg-subtle:     #F8F9FA;
--color-brand-text-muted:    #64748B;
--color-brand-success:       #16A34A;
--color-brand-error:         #DC2626;

/* shadcn semantic vars (in :root) — used by shadcn components */
--primary:            #1A3C6E;
--primary-foreground: #FFFFFF;
--accent:             #F97316;
--accent-foreground:  #FFFFFF;
```

### Tailwind Usage
```html
<!-- Brand colors (direct) -->
<div class="bg-brand-primary text-white">...</div>
<button class="bg-brand-accent hover:bg-brand-accent-dark text-white">CTA</button>

<!-- shadcn semantic (via components) -->
<Button variant="default">...</Button>   <!-- uses --primary (navy) -->
<Button variant="outline">...</Button>
```

## Typography

| Role          | Font  | Weight | Size (mobile → desktop) |
|---------------|-------|--------|--------------------------|
| Heading 1     | Inter | 700    | 2rem → 3.5rem            |
| Heading 2     | Inter | 600    | 1.5rem → 2.25rem         |
| Heading 3     | Inter | 600    | 1.25rem → 1.5rem         |
| Body          | Inter | 400    | 1rem                     |
| Small / Label | Inter | 500    | 0.875rem                 |
| CTA Button    | Inter | 600    | 1rem                     |

Load Inter via `next/font/google`. CSS var: `--font-inter`.

## Spacing Scale

Use Tailwind's default scale. Key values:
- Section vertical padding: `py-16 md:py-24`
- Container max-width: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- Card padding: `p-6 md:p-8`
- Button padding: `px-6 py-3`

## Border Radius

- Cards / containers: `rounded-2xl`
- Buttons: `rounded-full`
- Inputs: `rounded-lg`

## Shadows

```css
--shadow-card: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
--shadow-cta:  0 4px 20px 0 rgba(249, 115, 22, 0.3);
```

## CTA Button

Primary CTA: `bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold rounded-full px-6 py-3 shadow-cta transition-colors`

## Imagery Style

- Real photos preferred: trucks, professional movers, happy families
- Warm, trustworthy tone — avoid stock-photo clichés
- Hero image: full-width, with dark overlay for text legibility
