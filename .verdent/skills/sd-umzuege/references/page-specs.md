# Page Specifications — SD-Umzüge

## Site-Wide

- **Header**: Logo left, nav links center/right, sticky on scroll, CTA button "Angebot anfordern"
- **Footer**: Logo, nav links, contact info, social links, legal links (Impressum / Datenschutz)
- **Meta**: Every page has unique `<title>` and `<meta name="description">` in German

---

## 1. Homepage `/`

**Goal**: Build trust immediately, drive visitors to the quote form.

**Sections**:
1. **Hero** — Full-width image, H1: "Ihr zuverlässiger Umzugspartner in [Stadt]", subline, CTA button "Jetzt Angebot anfordern"
2. **Trust Bar** — 3–4 icon + text tiles: years of experience, satisfied customers, licensed & insured, free quote
3. **Services Overview** — Card grid linking to `/leistungen` (Privatumzug, Firmenumzug, Einlagerung, Montageservice)
4. **How It Works** — 3-step visual: Angebot anfragen → Termin vereinbaren → Umzug stressfrei genießen
5. **Testimonials** — 3 customer reviews with star rating
6. **Coverage Area** — Map or text list of served cities/regions
7. **CTA Banner** — "Bereit für Ihren Umzug? Kostenloses Angebot in 24h." + button

---

## 2. Services `/leistungen`

**Goal**: Detail all services offered, build confidence.

**Sections**:
1. **Page Hero** — Title "Unsere Leistungen", breadcrumb
2. **Service Cards** (each expandable or separate anchor section):
   - Privatumzug
   - Firmenumzug / Büroumzug
   - Einlagerung & Lagerung
   - Möbelmontage & -demontage
   - Verpackungsservice
   - Klaviertransport / Schwertransport
3. **FAQ** — 5–8 common questions

---

## 3. Quote Request `/angebot`

**Goal**: Convert visitors into leads.

**Form Fields**:
| Field             | Type     | Validation           |
|-------------------|----------|----------------------|
| Name              | text     | required, min 2      |
| E-Mail            | email    | required, valid email|
| Telefon           | tel      | required             |
| Umzugsdatum       | date     | required, future     |
| Von (PLZ/Stadt)   | text     | required             |
| Nach (PLZ/Stadt)  | text     | required             |
| Wohnungsgröße     | select   | required             |
| Zusatzleistungen  | checkbox | optional (multi)     |
| Nachricht         | textarea | optional             |

**Behavior**: `react-hook-form` + `zod`. On submit: show success message, send email via API route.
**Note**: No redirect on success — show inline confirmation.

---

## 4. About `/ueber-uns`

**Goal**: Humanize the company, build trust.

**Sections**:
1. **Story** — Founding story, mission, values
2. **Team** — Photo cards with name & role
3. **Certifications / Memberships** — Logos + text
4. **Stats** — Years active, moves completed, cities served

---

## 5. Contact `/kontakt`

**Goal**: Provide multiple contact channels.

**Content**:
- Contact form (Name, E-Mail, Telefon, Nachricht) — same `react-hook-form`/`zod` pattern
- Address, phone, email displayed prominently
- Google Maps embed (or static map image as fallback)
- Business hours

---

## 6. Legal Pages

### Impressum `/impressum`
Static page. Required by German law. Include: company name, address, managing director, register entry, VAT ID, contact.

### Datenschutzerklärung `/datenschutz`
Static page. DSGVO-compliant privacy policy. Cover: data collected, cookies, third-party services, user rights, contact for data requests.
