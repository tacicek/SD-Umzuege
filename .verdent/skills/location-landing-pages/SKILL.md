# Location Landing Pages — SD-Umzüge

Dieses Skill definiert den vollständigen Standard für die Erstellung von standortspezifischen
Landing-Pages (Gemeinde-Seiten) für SD-Umzüge. Es ist für alle Services anwendbar:
**Umzug**, **Reinigung**, **Räumung**, **Klaviertransport**.

---

## Inhaltsverzeichnis

1. [Ziel & SEO-Strategie](#1-ziel--seo-strategie)
2. [URL-Struktur](#2-url-struktur)
3. [Dateiarchitektur](#3-dateiarchitektur)
4. [Gemeinden-JSON-Schema](#4-gemeinden-json-schema)
5. [Fotos-JSON-Schema](#5-fotos-json-schema)
6. [Ziel-Gemeinden (Prioritätsliste)](#6-ziel-gemeinden-prioritätsliste)
7. [Seitenabschnitte (Page Sections)](#7-seitenabschnitte-page-sections)
8. [SEO-Spezifikationen](#8-seo-spezifikationen)
9. [E-E-A-T-Anforderungen](#9-e-e-a-t-anforderungen)
10. [Topical Authority Strategie](#10-topical-authority-strategie)
11. [Schema.org Markup](#11-schemaorg-markup)
12. [Implementierungs-Checkliste](#12-implementierungs-checkliste)
13. [Code-Vorlagen](#13-code-vorlagen)

---

## 1. Ziel & SEO-Strategie

### Primäres Ziel
Für jede wichtige Zürcher Gemeinde eine dedizierte Landing-Page erstellen, die bei Google
für Suchanfragen wie **"Umzug Zürich"**, **"Umzugsfirma Winterthur"** etc. rankt und
in AI-Antworten (Google AI Overviews, ChatGPT, Perplexity) zitiert wird.

### Suchanfragen-Typen pro Seite
Jede Seite soll mehrere Suchintentionen abdecken:

| Intent | Beispiele |
|--------|-----------|
| **Navigational** | "Umzugsfirma Zürich", "Umzug Firma Winterthur" |
| **Informational** | "Wie viel kostet ein Umzug in Zürich?", "Umzug Zürich Preise" |
| **Commercial** | "Umzug Zürich Offerte", "Umzug Zürich günstig" |
| **Transactional** | "Umzug Zürich buchen", "Umzug Zürich Festpreis" |

### Topical Authority Cluster
Jede Gemeinde-Seite ist Teil eines Clusters:
```
/umzug (Hub)
  ├── /umzug/privatumzug (Sub-Service)
  ├── /umzug/firmenumzug (Sub-Service)
  ├── /umzug/gemeinde/zuerich (Location)
  ├── /umzug/gemeinde/winterthur (Location)
  └── /umzug/gemeinde/[weitere] (Location)
```

---

## 2. URL-Struktur

**Muster:** `/{service}/gemeinde/{slug}`

| Service | Beispiel-URL |
|---------|-------------|
| Umzug | `/umzug/gemeinde/zuerich` |
| Reinigung | `/reinigung/gemeinde/zuerich` |
| Räumung | `/raeumung/gemeinde/zuerich` |
| Klaviertransport | `/klaviertransport/gemeinde/zuerich` |

**Slug-Regeln:**
- Kleinbuchstaben
- Umlaute ersetzen: ä→ae, ö→oe, ü→ue, ß→ss
- Leerzeichen → Bindestrich
- Beispiele: `zuerich`, `winterthur`, `waedenswil`, `illnau-effretikon`

---

## 3. Dateiarchitektur

```
web/
├── app/
│   ├── umzug/
│   │   ├── gemeinde/
│   │   │   └── [slug]/
│   │   │       └── page.tsx          ← Dynamische Route
│   ├── reinigung/
│   │   ├── gemeinde/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   ├── raeumung/
│   │   ├── gemeinde/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   └── klaviertransport/
│       ├── gemeinde/
│       │   └── [slug]/
│       │       └── page.tsx
├── components/
│   └── sections/
│       └── location/
│           ├── LocationHero.tsx          ← Hero mit Ortsfoto
│           ├── LocationTrustBar.tsx      ← Lokale Statistiken
│           ├── LocationKnowledge.tsx     ← Lokales Wissen (E-E-A-T)
│           ├── LocationServices.tsx      ← Service-Übersicht
│           ├── LocationFaq.tsx           ← Standort-spezifische FAQs
│           └── LocationNeighbors.tsx     ← Nachbargemeinden-Links
├── data/
│   ├── gemeinden.json                    ← Hauptdaten aller Gemeinden
│   └── gemeinden-fotos.json              ← Fotos (separat für einfache Pflege)
└── lib/
    └── gemeinden.ts                      ← Hilfsfunktionen
```

---

## 4. Gemeinden-JSON-Schema

**Datei:** `web/data/gemeinden.json`

```json
[
  {
    "gemeinde": "Zürich",
    "slug": "zuerich",
    "kanton": "ZH",
    "bezirk": "Zürich",
    "einwohner": 440000,
    "plz": ["8001", "8002", "8003", "8004", "8005", "8006", "8008", "8032", "8037", "8044", "8048", "8050", "8051", "8052", "8053"],
    "koordinaten": { "lat": 47.3769, "lng": 8.5417 },
    "stadtteile": ["Altstadt", "Wiedikon", "Langstrasse", "Aussersihl", "Seefeld", "Schwamendingen", "Affoltern", "Höngg"],
    "nachbargemeinden": ["duebelsdorf", "schlieren", "adliswil", "kueesnacht", "opfikon"],
    "beschreibung": "Zürich ist die grösste Stadt der Schweiz und wirtschaftliches Zentrum mit über 440'000 Einwohnern.",
    "services": {
      "umzug": {
        "aktiv": true,
        "h1": "Umzug Zürich — Festpreisgarantie & Vollversicherung",
        "heroSubtitel": "Professionelle Umzüge in alle 12 Stadtkreise — ab CHF 550, pünktlich und vollversichert.",
        "preisHinweis": "Ab CHF 550",
        "lokaleFakten": [
          "Halteverbotszone: SD-Umzüge koordiniert die Parkbewilligung direkt mit der Stadtpolizei Zürich (ca. CHF 100–150 Zusatzkosten)",
          "Kenntnis aller 12 Stadtkreise und typischer Zufahrtsherausforderungen (Altbauten, Innenhöfe, Tiefgaragen)",
          "Enge Treppenhäuser in Zürcher Altbauten: Wir haben Spezialausrüstung für schwierige Zugänge",
          "Über 200 erfolgreiche Umzüge allein in der Stadt Zürich durchgeführt"
        ],
        "faq": [
          {
            "frage": "Brauche ich eine Halteverbotszone für meinen Umzug in Zürich?",
            "antwort": "In der Stadt Zürich ist für grössere Umzugsfahrzeuge in der Regel eine Halteverbotszone erforderlich. SD-Umzüge koordiniert die Bewilligung auf Wunsch direkt mit der Stadtpolizei Zürich. Die Kosten betragen ca. CHF 100–150 und werden separat abgerechnet."
          },
          {
            "frage": "Wie lange dauert ein Umzug innerhalb von Zürich?",
            "antwort": "Ein Privatumzug innerhalb von Zürich dauert je nach Grösse 4–8 Stunden: Eine 2-Zimmer-Wohnung ist typischerweise in 4–5 Stunden erledigt, eine 4-Zimmer-Wohnung in 6–8 Stunden. Bei engen Zugängen (Altbau, kein Lift) kalkulieren wir etwas mehr Zeit ein."
          },
          {
            "frage": "Macht SD-Umzüge auch Umzüge am Wochenende in Zürich?",
            "antwort": "Ja, wir führen Umzüge in Zürich auch an Samstagen durch. Beachten Sie, dass in bestimmten Zürcher Wohnquartieren an Samstagen Lärmbeschränkungen gelten. Wir informieren Sie vorab über mögliche Einschränkungen."
          },
          {
            "frage": "Was kostet ein Umzug in Zürich?",
            "antwort": "Ein Privatumzug in Zürich kostet ab CHF 550 für eine 2-Zimmer-Wohnung. Der genaue Preis hängt von der Wohnungsgrösse, der Etage, dem Lift und möglichen Zusatzleistungen ab. Wir erstellen innert 24 Stunden eine kostenlose Offerte."
          }
        ]
      },
      "reinigung": {
        "aktiv": true,
        "h1": "Wohnungsreinigung Zürich mit Abnahmegarantie",
        "heroSubtitel": "Endreinigung in Zürich ab CHF 280 — Abnahmegarantie inklusive, Kaution zurück.",
        "preisHinweis": "Ab CHF 280",
        "lokaleFakten": [
          "Kenntnis der Abnahmepraktiken der wichtigsten Zürcher Verwaltungen und Hausverwaltungen",
          "Erfahrung mit Zürcher Altbauten (Parkett, Naturstein, historische Bäder)",
          "Koordination mit Umzugstermin möglich — Reinigung nach dem Auszug"
        ],
        "faq": [
          {
            "frage": "Was bedeutet Abnahmegarantie bei einer Endreinigung in Zürich?",
            "antwort": "SD-Umzüge garantiert, dass die Wohnung bei der Übergabe an den Vermieter abgenommen wird. Falls die Hausverwaltung Mängel feststellt, kommen wir kostenlos zur Nachbesserung. Diese Garantie gilt für 30 Tage nach der Reinigung."
          }
        ]
      },
      "raeumung": {
        "aktiv": true,
        "h1": "Wohnungsräumung Zürich — Schnell & Zuverlässig",
        "heroSubtitel": "Professionelle Räumungen in Zürich ab CHF 350 — umweltgerecht, diskret, Festpreis.",
        "preisHinweis": "Ab CHF 350",
        "lokaleFakten": [],
        "faq": []
      },
      "klaviertransport": {
        "aktiv": true,
        "h1": "Klaviertransport Zürich — Fachgerechter Instrumententransport",
        "heroSubtitel": "Sicherer Klavier- und Flügeltransport in Zürich ab CHF 350 — mit Vollversicherung.",
        "preisHinweis": "Ab CHF 350",
        "lokaleFakten": [],
        "faq": []
      }
    }
  }
]
```

> **Hinweis:** Jede neue Gemeinde bekommt einen eigenen Eintrag in diesem Array.
> Kopiere den Zürich-Eintrag und passe alle Werte an.

---

## 5. Fotos-JSON-Schema

**Datei:** `web/data/gemeinden-fotos.json`

Fotos sind **bewusst in einer separaten Datei**, damit sie ohne Code-Änderungen ausgetauscht
werden können (z.B. wenn echte Fotos verfügbar sind).

```json
{
  "zuerich": {
    "umzug": {
      "hero": {
        "src": "/images/locations/zuerich-umzug-hero.webp",
        "alt": "Umzugsteam von SD-Umzüge beim Beladen des LKW in Zürich",
        "width": 1200,
        "height": 630
      },
      "galerie": [
        {
          "src": "/images/locations/zuerich-umzug-1.webp",
          "alt": "Umzug in Zürich Kreis 4 — enge Treppe, kein Lift",
          "caption": "Wir meistern auch schwierige Zugänge in Zürcher Altbauten"
        },
        {
          "src": "/images/locations/zuerich-umzug-2.webp",
          "alt": "Umzugswagen von SD-Umzüge am Zürichsee",
          "caption": "Unsere Fahrzeuge sind für jeden Zürich-Umzug bereit"
        }
      ]
    },
    "reinigung": {
      "hero": {
        "src": "/images/locations/zuerich-reinigung-hero.webp",
        "alt": "Professionelle Endreinigung einer Zürcher Wohnung",
        "width": 1200,
        "height": 630
      },
      "galerie": []
    },
    "raeumung": {
      "hero": {
        "src": "/images/locations/zuerich-raeumung-hero.webp",
        "alt": "Wohnungsräumung in Zürich durch SD-Umzüge",
        "width": 1200,
        "height": 630
      },
      "galerie": []
    },
    "klaviertransport": {
      "hero": {
        "src": "/images/locations/zuerich-klaviertransport-hero.webp",
        "alt": "Klaviertransport in Zürich — SD-Umzüge",
        "width": 1200,
        "height": 630
      },
      "galerie": []
    }
  },
  "winterthur": {
    "umzug": {
      "hero": {
        "src": "/images/locations/winterthur-umzug-hero.webp",
        "alt": "Umzug in Winterthur — SD-Umzüge",
        "width": 1200,
        "height": 630
      },
      "galerie": []
    }
  }
}
```

**Fallback-Regel:** Wenn kein spezifisches Foto für eine Gemeinde vorhanden ist, wird das
Service-Standard-Foto aus `data/services.json` (`heroImage`) verwendet.

```typescript
// lib/gemeinden.ts — Foto-Fallback-Logik
export function getLocationPhoto(slug: string, service: string, fotos: FotosData): FotoEntry {
  return (
    fotos[slug]?.[service]?.hero ??
    DEFAULT_FOTOS[service]
  );
}

const DEFAULT_FOTOS: Record<string, FotoEntry> = {
  umzug:          { src: "/images/Umzugsfirma-sd-umzuege.webp", alt: "SD-Umzüge Umzug", width: 1200, height: 630 },
  reinigung:      { src: "https://qzmyqkolzrckgaxaypxc.supabase.co/storage/v1/object/public/Offerio%20Media/Reinigung/Reinigung-Hero.webp", alt: "SD-Umzüge Reinigung", width: 1200, height: 630 },
  raeumung:       { src: "/images/Reaumung-sd-umzuege.webp", alt: "SD-Umzüge Räumung", width: 1200, height: 630 },
  klaviertransport: { src: "/images/Pianotransport-sd-umzuege.webp", alt: "SD-Umzüge Klaviertransport", width: 1200, height: 630 },
};
```

---

## 6. Ziel-Gemeinden (Prioritätsliste)

### Priorität A — Höchste Suchvolumen (sofort umsetzen)

| # | Gemeinde | Slug | Einwohner | Bezirk |
|---|----------|------|-----------|--------|
| 1 | Zürich | `zuerich` | 440'000 | Zürich |
| 2 | Winterthur | `winterthur` | 115'000 | Winterthur |
| 3 | Uster | `uster` | 36'000 | Uster |
| 4 | Dübendorf | `duebendorf` | 30'000 | Uster |
| 5 | Wetzikon | `wetzikon` | 27'000 | Hinwil |

### Priorität B — Wichtige Agglomerationsgemeinden

| # | Gemeinde | Slug | Einwohner | Bezirk |
|---|----------|------|-----------|--------|
| 6 | Dietikon | `dietikon` | 28'000 | Dietikon |
| 7 | Horgen | `horgen` | 23'000 | Horgen |
| 8 | Wädenswil | `waedenswil` | 24'000 | Horgen |
| 9 | Bülach | `buelach` | 22'000 | Bülach |
| 10 | Kloten | `kloten` | 22'000 | Bülach |
| 11 | Opfikon | `opfikon` | 22'000 | Bülach |
| 12 | Schlieren | `schlieren` | 19'000 | Dietikon |
| 13 | Regensdorf | `regensdorf` | 20'000 | Dielsdorf |
| 14 | Volketswil | `volketswil` | 18'000 | Uster |
| 15 | Illnau-Effretikon | `illnau-effretikon` | 19'000 | Pfäffikon |

### Priorität C — Heimgebiet & Nachbarschaft (organische Stärke)

| # | Gemeinde | Slug | Einwohner | Bezirk |
|---|----------|------|-----------|--------|
| 16 | Rüti ZH *(Homebase)* | `rueti` | 12'000 | Hinwil |
| 17 | Pfäffikon ZH | `pfaeffikon` | 12'000 | Pfäffikon |
| 18 | Thalwil | `thalwil` | 18'000 | Horgen |
| 19 | Adliswil | `adliswil` | 18'000 | Horgen |
| 20 | Küsnacht | `kueesnacht` | 14'000 | Meilen |
| 21 | Männedorf | `maennedorf` | 7'000 | Meilen |
| 22 | Meilen | `meilen` | 12'000 | Meilen |
| 23 | Zollikon | `zollikon` | 13'000 | Meilen |
| 24 | Kilchberg ZH | `kilchberg` | 8'000 | Horgen |
| 25 | Gossau ZH | `gossau` | 9'000 | Hinwil |

---

## 7. Seitenabschnitte (Page Sections)

Jede Location Landing-Page muss **exakt diese Abschnitte** in dieser Reihenfolge enthalten:

### Abschnitt 1: LocationHero
**Zweck:** Hauptkeyword verankern, Vertrauen sofort aufbauen, Klick auf CTA auslösen.

**Inhalt:**
- `<h1>`: Exakt das `services.[service].h1` aus der JSON (z.B. "Umzug Zürich — Festpreisgarantie & Vollversicherung")
- Untertitel: `services.[service].heroSubtitel`
- Hero-Bild: Aus `gemeinden-fotos.json` (mit Fallback)
- Preis-Badge: "Ab CHF XXX — Festpreis"
- Standort-Badge: "📍 [Gemeinde], Kanton Zürich"
- CTA primär: "Kostenlose Offerte" → `/[service]/angebot`
- CTA sekundär: Telefonnummer `+41 76 505 37 92`
- USP-Chips (3–4 Stück): "✓ Festpreisgarantie", "✓ Vollversichert", "✓ Offerte in 24h"

**SEO-Anforderungen:**
- H1 enthält: [Service] + [Gemeindename]
- Hero-Bild hat korrektes `alt`-Attribut mit Keyword
- Kein Text im Bild (Accessibility)

---

### Abschnitt 2: BreadcrumbNav
**Zweck:** Interne Verlinkung stärken, Kontextverständnis für AI und Google.

```
Startseite > Umzug > Umzug Zürich
```

- Schemaorg `BreadcrumbList` muss inline mit ausgegeben werden
- Links: `/ → /umzug → /umzug/gemeinde/zuerich`

---

### Abschnitt 3: LocalTrustBar
**Zweck:** Sofortige lokale Glaubwürdigkeit — "Die kennen unsere Stadt".

**Inhalt (4 Kennzahlen):**
- "200+ Umzüge in [Gemeinde]" *(oder "im Raum [Gemeinde]")*
- "Ø 4.9★ Bewertung"
- "Offerte innert 24h"
- "Seit 2018 im Kanton Zürich"

**Hinweis:** Keine erfundenen Zahlen. Wenn keine exakten lokalen Zahlen vorliegen,
verallgemeinern ("im Kanton Zürich" statt Gemeindename).

---

### Abschnitt 4: LocalServices
**Zweck:** Zeigt alle relevanten Sub-Services für diese Gemeinde. Interne Verlinkung
zu Sub-Service-Seiten.

**Inhalt:**
- Sektion-Heading: "Unsere Umzugs-Leistungen in [Gemeinde]"
- Cards für jeden Sub-Service aus `services.json` (Privatumzug, Firmenumzug, Auslandsumzug)
- Jede Card: Emoji, Titel, 3 Features, Link zu `/umzug/privatumzug` etc.

---

### Abschnitt 5: LocalKnowledge *(E-E-A-T Kernabschnitt)*
**Zweck:** Demonstriert echtes Ortswissen — wichtigster Abschnitt für E-E-A-T und AI-Zitierbarkeit.

**Inhalt:**
- Heading: "Umzug in [Gemeinde] — Was Sie wissen sollten"
- 3–4 lokale Fakten aus `services.[service].lokaleFakten` der JSON
- Jeder Fakt als eigene visuell hervorgehobene Karte (Icon + Text)
- Lokale Informationen wie: Parkbewilligungen, typische Gebäudetypen, besondere Regelungen,
  Erfahrungen aus der Praxis

**Wichtig für E-E-A-T:**
- Fakten müssen *spezifisch* und *verifizierbar* sein
- Beispiel SCHLECHT: "Wir kennen Zürich gut"
- Beispiel GUT: "In Zürich ist für Umzugsfahrzeuge in Tempo-30-Zonen oft eine
  Halteverbotsgenehmigung (HV-Zone) erforderlich. Diese beantragen wir auf Wunsch direkt
  bei der Stadtpolizei Zürich. Kosten: ca. CHF 100–150."

---

### Abschnitt 6: UspSection *(bestehende Komponente wiederverwenden)*
**Zweck:** Allgemeine Vertrauenssignale — direkt die bestehende `UspSection`-Komponente.

---

### Abschnitt 7: ProcessSection *(bestehende Komponente wiederverwenden)*
**Zweck:** Prozess erklären — direkt die bestehende `ProcessSection`-Komponente.

---

### Abschnitt 8: LocationFaq *(E-E-A-T + AI-Zitierbarkeit)*
**Zweck:** Beantwortet die häufigsten lokalen Fragen direkt. Wird von AI-Systemen häufig
als Zitat-Quelle verwendet.

**Inhalt:**
- 4–6 Fragen aus `services.[service].faq` der JSON
- Jede Antwort: 40–80 Wörter, direkt und präzise, standalone verständlich
- FAQPage Schema.org Markup inline ausgeben

**Fragen-Typen pro Service:**

*Umzug:*
- "Was kostet ein Umzug in [Gemeinde]?"
- "Brauche ich eine Halteverbotszone?"
- "Macht [Firma] auch Umzüge am Wochenende?"
- "Wie lange dauert ein Umzug in [Gemeinde]?"
- "Ist der Umzug vollversichert?"

*Reinigung:*
- "Was bedeutet Abnahmegarantie in [Gemeinde]?"
- "Was kostet eine Endreinigung in [Gemeinde]?"
- "Bis wann muss die Wohnung sauber sein?"

*Räumung:*
- "Was kostet eine Wohnungsräumung in [Gemeinde]?"
- "Was passiert mit verwertbaren Gegenständen?"
- "Wie schnell kann SD-Umzüge die Räumung durchführen?"

---

### Abschnitt 9: LocationNeighbors
**Zweck:** Interne Verlinkung stärken, Crawl-Budget optimal nutzen, Topical Authority ausbauen.

**Inhalt:**
- Heading: "Auch in Ihrer Nähe verfügbar"
- Links zu 3–5 Nachbargemeinden (aus `nachbargemeinden` in der JSON)
- Jeder Link: Gemeindename + Service (z.B. "Umzug Winterthur")
- Als Chip-Grid oder Card-Liste dargestellt

---

### Abschnitt 10: CtaSection *(bestehende Komponente wiederverwenden)*
**Zweck:** Finaler Call-to-Action — direkt die bestehende `CtaSection`-Komponente.

---

## 8. SEO-Spezifikationen

### Metadata-Muster

```typescript
// Umzug
title: "Umzug [Gemeinde] — Festpreisgarantie & Vollversicherung | SD-Umzüge"
description: "Professioneller Umzug in [Gemeinde] ab CHF [preis] — Privatumzug, Firmenumzug & Auslandsumzug mit Festpreisgarantie, Vollversicherung bis CHF 100'000. Offerte innert 24h."

// Reinigung
title: "Wohnungsreinigung [Gemeinde] mit Abnahmegarantie | SD-Umzüge"
description: "Professionelle Endreinigung in [Gemeinde] ab CHF 280 — Abnahmegarantie, Kaution vollständig zurück. Fensterreinigung, Kalkentfernung & Bodenreinigung inklusive."

// Räumung
title: "Wohnungsräumung [Gemeinde] — Festpreis & Schnelle Abwicklung | SD-Umzüge"
description: "Professionelle Räumung in [Gemeinde] ab CHF 350 — Wohnungsräumung, Kellerräumung & Haushaltsauflösung. Umweltgerechte Entsorgung, Festpreis, kurze Reaktionszeit."

// Klaviertransport
title: "Klaviertransport [Gemeinde] — Sicher & Vollversichert | SD-Umzüge"
description: "Fachgerechter Klavier- & Flügeltransport in [Gemeinde] ab CHF 350 — mit Spezialmaterial, Vollversicherung & erfahrenem Team. Terminbestätigung innert 48h."
```

**Regeln:**
- Title: max. 60 Zeichen
- Description: max. 155 Zeichen
- Canonical: Absolute URL `https://www.sd-umzuege.ch/[service]/gemeinde/[slug]`
- `alternates.canonical` immer setzen

### Open Graph
```typescript
openGraph: {
  title: "[gleich wie title ohne | SD-Umzüge]",
  description: "[gleich wie description, darf kürzer sein]",
  url: "https://www.sd-umzuege.ch/[service]/gemeinde/[slug]",
  images: [{ url: "[hero-foto-url]", width: 1200, height: 630, alt: "[foto-alt]" }],
  type: "website",
  locale: "de_CH",
}
```

---

## 9. E-E-A-T-Anforderungen

E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) ist für lokale
Dienstleistungsseiten besonders wichtig. Jede Location-Page muss folgende Signale enthalten:

### Experience (Erfahrung)
- [ ] Spezifische Anzahl durchgeführter Umzüge in der Region angeben
- [ ] Konkrete lokale Herausforderungen beschreiben (z.B. Altbau-Treppenhäuser, Tiefgaragen)
- [ ] Lokale Behörden/Verwaltungen namentlich nennen wenn relevant (z.B. "Stadtpolizei Zürich")

### Expertise (Fachkenntnisse)
- [ ] Service-spezifische Fachbegriffe korrekt verwenden
- [ ] Preise transparent und realistisch angeben
- [ ] Rechtliche Grundlagen erwähnen wo relevant (z.B. OR Art. 267 bei Endreinigung)
- [ ] Technische Details (z.B. Spezialausrüstung für Klaviertransport)

### Authoritativeness (Autorität)
- [ ] LocalBusiness Schema mit vollständigen Angaben
- [ ] NAP-Konsistenz (Name, Adresse, Telefon — identisch auf allen Seiten)
- [ ] Verlinkung zur Hauptservice-Seite (Bread-crumb + interner Link im Text)
- [ ] Verlinkung zu Kontakt/Über-uns-Seite

### Trustworthiness (Vertrauenswürdigkeit)
- [ ] Echte Preisangaben (keine irreführenden "ab CHF"-Werte)
- [ ] Datenschutzerklärung verlinkt (im Footer, nicht auf dieser Seite nötig)
- [ ] Vollversicherung klar kommuniziert mit Betrag (bis CHF 100'000)
- [ ] Festpreisgarantie explizit erwähnen
- [ ] Kontaktmöglichkeiten klar sichtbar

---

## 10. Topical Authority Strategie

### Content Cluster Aufbau

Für maximale topische Autorität müssen die Location-Pages untereinander und mit den
Service-Hub-Seiten vernetzt sein:

```
Hub:    /umzug                              → verlinkt auf alle Gemeinden
         ├── /umzug/privatumzug             → verlinkt auf Gemeinde-Seiten
         ├── /umzug/firmenumzug             → verlinkt auf Gemeinde-Seiten
         └── /umzug/gemeinde/[slug]         → verlinkt zurück auf Hub + Nachbarn
```

### Interne Verlinkungsregeln

1. **Hub → Gemeinde:** Die Hauptservice-Seite (`/umzug`) soll am Ende eine Sektion
   "Wir sind in Ihrer Gemeinde aktiv" mit Links zu allen Priority-A-Gemeinden haben.

2. **Gemeinde → Hub:** Jede Gemeinde-Seite verlinkt via Breadcrumb auf den Hub.

3. **Gemeinde → Nachbargemeinde:** Abschnitt 9 (LocationNeighbors) verlinkt auf 3–5
   umliegende Gemeinden des gleichen Services.

4. **Gemeinde → Sub-Service:** Abschnitt 4 (LocalServices) verlinkt auf alle Sub-Service-
   Seiten (z.B. `/umzug/privatumzug`).

5. **Cross-Service:** Am Ende der Seite optionaler Hinweis auf andere Services
   (z.B. "Benötigen Sie auch eine Endreinigung in Zürich? → /reinigung/gemeinde/zuerich")

### Sitemap-Einbindung

Die `sitemap.ts` muss automatisch alle aktiven Gemeinde-Seiten einschliessen:

```typescript
// web/app/sitemap.ts — Erweiterung
import gemeinden from "@/data/gemeinden.json";

const services = ["umzug", "reinigung", "raeumung", "klaviertransport"];

const locationUrls = gemeinden.flatMap((g) =>
  services
    .filter((s) => g.services[s]?.aktiv)
    .map((s) => ({
      url: `https://www.sd-umzuege.ch/${s}/gemeinde/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: g.einwohner > 50000 ? 0.9 : 0.8,
    }))
);
```

---

## 11. Schema.org Markup

Jede Location-Page benötigt **drei** Schema.org-Blöcke als JSON-LD:

### 1. LocalBusiness + Service

```json
{
  "@context": "https://schema.org",
  "@type": ["MovingCompany", "LocalBusiness"],
  "name": "SD-Umzüge",
  "url": "https://www.sd-umzuege.ch",
  "telephone": "+41765053792",
  "email": "info@sd-umzuege.ch",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Rüti",
    "addressRegion": "ZH",
    "addressCountry": "CH"
  },
  "areaServed": {
    "@type": "City",
    "name": "[Gemeinde]",
    "containedInPlace": {
      "@type": "AdministrativeArea",
      "name": "Kanton Zürich"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Umzug [Gemeinde]",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Privatumzug [Gemeinde]",
          "description": "...",
          "areaServed": { "@type": "City", "name": "[Gemeinde]" }
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "550",
          "priceCurrency": "CHF",
          "minPrice": "550",
          "description": "Festpreis ab"
        }
      }
    ]
  }
}
```

### 2. BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://www.sd-umzuege.ch" },
    { "@type": "ListItem", "position": 2, "name": "Umzug",      "item": "https://www.sd-umzuege.ch/umzug" },
    { "@type": "ListItem", "position": 3, "name": "Umzug [Gemeinde]", "item": "https://www.sd-umzuege.ch/umzug/gemeinde/[slug]" }
  ]
}
```

### 3. FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Frage]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Antwort — 40-80 Wörter]"
      }
    }
  ]
}
```

---

## 12. Implementierungs-Checkliste

Für **jede neue Gemeinde-Seite** (unabhängig vom Service) diese Checkliste abarbeiten:

### Datenvorbereitung
- [ ] Eintrag in `data/gemeinden.json` erstellt
- [ ] H1, heroSubtitel, preisHinweis ausgefüllt
- [ ] Mindestens 3 `lokaleFakten` geschrieben (spezifisch, nicht generisch)
- [ ] Mindestens 3 `faq`-Einträge mit lokalem Bezug
- [ ] `nachbargemeinden`-Liste auf korrekte Slugs geprüft
- [ ] `aktiv: true` für den jeweiligen Service gesetzt

### Fotos
- [ ] Eintrag in `data/gemeinden-fotos.json` erstellt
- [ ] Hero-Foto: 1200×630px, WebP, unter `/images/locations/`
- [ ] Alt-Text enthält Keyword + Ortsname
- [ ] Falls kein eigenes Foto: Fallback auf Service-Standard prüfen

### Code
- [ ] Route `/[service]/gemeinde/[slug]/page.tsx` existiert
- [ ] `generateStaticParams()` gibt alle aktiven Gemeinden zurück
- [ ] `generateMetadata()` erzeugt korrekte title/description/canonical
- [ ] Alle 3 Schema.org-Blöcke werden gerendert
- [ ] `notFound()` wird aufgerufen wenn Gemeinde nicht in JSON

### SEO-Checks
- [ ] Title ≤ 60 Zeichen
- [ ] Description ≤ 155 Zeichen
- [ ] Canonical-URL korrekt gesetzt
- [ ] H1 enthält Service + Gemeindename
- [ ] Breadcrumb sichtbar + Schema korrekt
- [ ] Interne Links zu Hub, Sub-Services und Nachbargemeinden vorhanden
- [ ] Sitemap aktualisiert (automatisch via `generateStaticParams`)

### Qualitätskontrolle
- [ ] Alle Preisangaben korrekt und konsistent mit `services.json`
- [ ] Keine erfundenen Statistiken
- [ ] FAQ-Antworten standalone verständlich (ohne Kontext)
- [ ] Mobile Darstellung geprüft
- [ ] PageSpeed ≥ 90 (Bilder optimiert, kein JS-Blocking)

---

## 13. Code-Vorlagen

### `lib/gemeinden.ts`

```typescript
import gemeindenData from "@/data/gemeinden.json";
import fotosData from "@/data/gemeinden-fotos.json";

export interface FotoEntry {
  src: string;
  alt: string;
  width: number;
  height: number;
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

export const gemeinden: Gemeinde[] = gemeindenData as Gemeinde[];

export function getGemeindeBySlug(slug: string): Gemeinde | undefined {
  return gemeinden.find((g) => g.slug === slug);
}

export function getActiveGemeindenForService(service: string): Gemeinde[] {
  return gemeinden.filter((g) => g.services[service]?.aktiv === true);
}

export function getAllActiveGemeindenSlugs(service: string): string[] {
  return getActiveGemeindenForService(service).map((g) => g.slug);
}

export function getLocationPhoto(slug: string, service: string): FotoEntry {
  const fotos = fotosData as Record<string, Record<string, { hero: FotoEntry }>>;
  const defaultFotos: Record<string, FotoEntry> = {
    umzug:            { src: "/images/Umzugsfirma-sd-umzuege.webp",      alt: "SD-Umzüge Umzug",            width: 1200, height: 630 },
    reinigung:        { src: "https://qzmyqkolzrckgaxaypxc.supabase.co/storage/v1/object/public/Offerio%20Media/Reinigung/Reinigung-Hero.webp", alt: "SD-Umzüge Reinigung", width: 1200, height: 630 },
    raeumung:         { src: "/images/Reaumung-sd-umzuege.webp",          alt: "SD-Umzüge Räumung",          width: 1200, height: 630 },
    klaviertransport: { src: "/images/Pianotransport-sd-umzuege.webp",   alt: "SD-Umzüge Klaviertransport", width: 1200, height: 630 },
  };
  return fotos[slug]?.[service]?.hero ?? defaultFotos[service];
}

export function getNachbarGemeinden(gemeinde: Gemeinde, service: string, limit = 5): Gemeinde[] {
  return gemeinde.nachbargemeinden
    .map((slug) => getGemeindeBySlug(slug))
    .filter((g): g is Gemeinde => g !== undefined && g.services[service]?.aktiv === true)
    .slice(0, limit);
}
```

### `app/umzug/gemeinde/[slug]/page.tsx` (Vorlage)

```typescript
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getGemeindeBySlug,
  getAllActiveGemeindenSlugs,
  getLocationPhoto,
  getNachbarGemeinden,
} from "@/lib/gemeinden";
import LocationHero from "@/components/sections/location/LocationHero";
import LocationTrustBar from "@/components/sections/location/LocationTrustBar";
import LocationServices from "@/components/sections/location/LocationServices";
import LocationKnowledge from "@/components/sections/location/LocationKnowledge";
import LocationFaq from "@/components/sections/location/LocationFaq";
import LocationNeighbors from "@/components/sections/location/LocationNeighbors";
import UspSection from "@/components/sections/UspSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CtaSection from "@/components/sections/CtaSection";

const SERVICE = "umzug";

export async function generateStaticParams() {
  return getAllActiveGemeindenSlugs(SERVICE).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const gemeinde = getGemeindeBySlug(slug);
  if (!gemeinde || !gemeinde.services[SERVICE]?.aktiv) return {};

  const sd = gemeinde.services[SERVICE];
  const foto = getLocationPhoto(slug, SERVICE);

  return {
    title: `Umzug ${gemeinde.gemeinde} — Festpreisgarantie & Vollversicherung | SD-Umzüge`,
    description: `Professioneller Umzug in ${gemeinde.gemeinde} ${sd.preisHinweis} — Privatumzug, Firmenumzug & Auslandsumzug mit Festpreisgarantie, Vollversicherung bis CHF 100'000. Offerte innert 24h.`,
    alternates: { canonical: `https://www.sd-umzuege.ch/${SERVICE}/gemeinde/${slug}` },
    openGraph: {
      title: `Umzug ${gemeinde.gemeinde} — Festpreisgarantie & Vollversicherung`,
      description: `Professioneller Umzug in ${gemeinde.gemeinde} ${sd.preisHinweis} — Festpreisgarantie, Vollversicherung, Offerte in 24h.`,
      url: `https://www.sd-umzuege.ch/${SERVICE}/gemeinde/${slug}`,
      images: [{ url: foto.src, width: foto.width, height: foto.height, alt: foto.alt }],
    },
  };
}

export default async function UmzugGemeindeePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gemeinde = getGemeindeBySlug(slug);
  if (!gemeinde || !gemeinde.services[SERVICE]?.aktiv) notFound();

  const sd = gemeinde.services[SERVICE];
  const foto = getLocationPhoto(slug, SERVICE);
  const nachbarn = getNachbarGemeinden(gemeinde, SERVICE);

  // Schema.org JSON-LD
  const localBusinessSchema = { /* ... siehe Abschnitt 11 ... */ };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://www.sd-umzuege.ch" },
      { "@type": "ListItem", "position": 2, "name": "Umzug",      "item": "https://www.sd-umzuege.ch/umzug" },
      { "@type": "ListItem", "position": 3, "name": `Umzug ${gemeinde.gemeinde}`, "item": `https://www.sd-umzuege.ch/umzug/gemeinde/${slug}` },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": sd.faq.map((f) => ({
      "@type": "Question",
      "name": f.frage,
      "acceptedAnswer": { "@type": "Answer", "text": f.antwort },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <LocationHero
        h1={sd.h1}
        subtitel={sd.heroSubtitel}
        preisHinweis={sd.preisHinweis}
        gemeinde={gemeinde.gemeinde}
        service={SERVICE}
        foto={foto}
        angebotHref="/umzug/angebot"
      />
      <LocationTrustBar gemeinde={gemeinde.gemeinde} />
      <LocationServices service={SERVICE} gemeinde={gemeinde.gemeinde} />
      <LocationKnowledge lokaleFakten={sd.lokaleFakten} gemeinde={gemeinde.gemeinde} service={SERVICE} />
      <UspSection />
      <ProcessSection />
      <LocationFaq faq={sd.faq} gemeinde={gemeinde.gemeinde} />
      {nachbarn.length > 0 && (
        <LocationNeighbors nachbarn={nachbarn} service={SERVICE} currentGemeinde={gemeinde.gemeinde} />
      )}
      <CtaSection />
    </main>
  );
}
```

---

## Neue Gemeinde hinzufügen — Kurzanleitung

1. **`data/gemeinden.json`** — Neuen Eintrag hinzufügen (Zürich-Eintrag kopieren & anpassen)
2. **`data/gemeinden-fotos.json`** — Foto-Eintrag hinzufügen (oder Fallback nutzen)
3. **`aktiv: true`** für den gewünschten Service setzen
4. **Lokalefakten & FAQ** anpassen (mindestens 3 Fakten, 3 FAQ)
5. Dev-Server neu starten → Seite ist automatisch gebaut

**Das war's.** Kein neuer Code nötig.

---

*Letzte Aktualisierung: April 2026 | SD-Umzüge — Rüti ZH*
