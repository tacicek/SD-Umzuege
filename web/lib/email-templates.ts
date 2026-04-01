const BRAND_COLOR = "#1A3C6E";
const ACCENT_COLOR = "#F97316";

function baseLayout(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:${BRAND_COLOR};padding:24px 32px;">
              <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">SD-Umzüge</p>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">Neue Anfrage über sd-umzuege.ch</p>
            </td>
          </tr>
          <!-- Title bar -->
          <tr>
            <td style="background:${ACCENT_COLOR};padding:12px 32px;">
              <p style="margin:0;color:#ffffff;font-size:15px;font-weight:600;">${title}</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              ${body}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f8f9fc;border-top:1px solid #e5e7eb;padding:20px 32px;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">Diese E-Mail wurde automatisch über das Kontaktformular auf sd-umzuege.ch generiert.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string | undefined | null): string {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:8px 0;vertical-align:top;width:40%;">
        <span style="color:#6b7280;font-size:13px;font-weight:500;">${label}</span>
      </td>
      <td style="padding:8px 0;vertical-align:top;">
        <span style="color:#111827;font-size:14px;">${value}</span>
      </td>
    </tr>`;
}

function section(heading: string, rows: string): string {
  return `
    <p style="margin:24px 0 8px;color:${BRAND_COLOR};font-size:15px;font-weight:700;border-bottom:2px solid #e5e7eb;padding-bottom:6px;">${heading}</p>
    <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>`;
}

function messageBox(text: string): string {
  return `<div style="background:#f8f9fc;border-left:4px solid ${ACCENT_COLOR};border-radius:4px;padding:16px;margin-top:16px;">
    <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;white-space:pre-wrap;">${text}</p>
  </div>`;
}

// ── Template: Kontakt ──────────────────────────────────────────────────────

export function kontaktEmailHtml(data: {
  name: string;
  email: string;
  telefon?: string;
  nachricht: string;
}): string {
  const body = `
    ${section("Kontaktdaten", `
      ${row("Name", data.name)}
      ${row("E-Mail", `<a href="mailto:${data.email}" style="color:${ACCENT_COLOR};">${data.email}</a>`)}
      ${row("Telefon", data.telefon || "—")}
    `)}
    <p style="margin:24px 0 8px;color:${BRAND_COLOR};font-size:15px;font-weight:700;border-bottom:2px solid #e5e7eb;padding-bottom:6px;">Nachricht</p>
    ${messageBox(data.nachricht)}
  `;
  return baseLayout("Kontaktanfrage", body);
}

export function kontaktEmailText(data: {
  name: string;
  email: string;
  telefon?: string;
  nachricht: string;
}): string {
  return `Neue Kontaktanfrage\n\nName: ${data.name}\nE-Mail: ${data.email}\nTelefon: ${data.telefon || "—"}\n\nNachricht:\n${data.nachricht}`;
}

// ── Template: Allgemeines Angebot ─────────────────────────────────────────

export function angebotEmailHtml(data: {
  leistung: string;
  name: string;
  email: string;
  telefon?: string;
  nachricht: string;
}): string {
  const leistungLabels: Record<string, string> = {
    umzug: "Umzug",
    reinigung: "Reinigung",
    raeumung: "Räumung",
    klaviertransport: "Klaviertransport",
    andere: "Andere",
  };
  const body = `
    ${section("Gewünschte Leistung", `
      ${row("Leistung", leistungLabels[data.leistung] ?? data.leistung)}
    `)}
    ${section("Kontaktdaten", `
      ${row("Name", data.name)}
      ${row("E-Mail", `<a href="mailto:${data.email}" style="color:${ACCENT_COLOR};">${data.email}</a>`)}
      ${row("Telefon", data.telefon || "—")}
    `)}
    <p style="margin:24px 0 8px;color:${BRAND_COLOR};font-size:15px;font-weight:700;border-bottom:2px solid #e5e7eb;padding-bottom:6px;">Nachricht</p>
    ${messageBox(data.nachricht)}
  `;
  return baseLayout("Angebotsanfrage", body);
}

export function angebotEmailText(data: {
  leistung: string;
  name: string;
  email: string;
  telefon?: string;
  nachricht: string;
}): string {
  return `Neue Angebotsanfrage\n\nLeistung: ${data.leistung}\nName: ${data.name}\nE-Mail: ${data.email}\nTelefon: ${data.telefon || "—"}\n\nNachricht:\n${data.nachricht}`;
}

// ── Template: Umzug ───────────────────────────────────────────────────────

export function umzugEmailHtml(data: {
  umzugsart: string;
  von: { strasse: string; plz: string; ort: string };
  nach: { strasse: string; plz: string; ort: string };
  etageVon: string;
  etageNach: string;
  liftVon: boolean;
  liftNach: boolean;
  umzugsdatum: string;
  wohnungsgroesse: string;
  zusatzleistungen: string[];
  name: string;
  email: string;
  telefon?: string;
  nachricht?: string;
}): string {
  const umzugsartLabels: Record<string, string> = {
    privatumzug: "Privatumzug",
    firmenumzug: "Firmenumzug",
    auslandsumzug: "Auslandsumzug",
  };
  const groesseLabels: Record<string, string> = {
    "studio-1-zimmer": "Studio / 1 Zimmer",
    "2-3-zimmer": "2–3 Zimmer",
    "4-5-zimmer": "4–5 Zimmer",
    "6-plus-zimmer": "6+ Zimmer",
    "buero-gewerbe": "Büro / Gewerbe",
  };
  const etageLabels: Record<string, string> = {
    eg: "EG (Erdgeschoss)",
    "1og": "1. OG", "2og": "2. OG", "3og": "3. OG", "4og-plus": "4. OG+",
  };
  const zusatzLabels: Record<string, string> = {
    verpackungsservice: "Verpackungsservice",
    moebelservice: "Möbelmontage & Demontage",
    einlagerung: "Einlagerung",
    klaviertransport: "Klaviertransport",
    entsorgung: "Entsorgung",
  };

  const body = `
    ${section("Umzugsdetails", `
      ${row("Art des Umzugs", umzugsartLabels[data.umzugsart] ?? data.umzugsart)}
      ${row("Umzugsdatum", data.umzugsdatum)}
      ${row("Wohnungsgrösse", groesseLabels[data.wohnungsgroesse] ?? data.wohnungsgroesse)}
      ${row("Zusatzleistungen", data.zusatzleistungen.length ? data.zusatzleistungen.map(z => zusatzLabels[z] ?? z).join(", ") : "Keine")}
    `)}
    ${section("Abholadresse", `
      ${row("Adresse", `${data.von.strasse}, ${data.von.plz} ${data.von.ort}`)}
      ${row("Etage", etageLabels[data.etageVon] ?? data.etageVon)}
      ${row("Lift", data.liftVon ? "Ja" : "Nein")}
    `)}
    ${section("Zieladresse", `
      ${row("Adresse", `${data.nach.strasse}, ${data.nach.plz} ${data.nach.ort}`)}
      ${row("Etage", etageLabels[data.etageNach] ?? data.etageNach)}
      ${row("Lift", data.liftNach ? "Ja" : "Nein")}
    `)}
    ${section("Kontaktdaten", `
      ${row("Name", data.name)}
      ${row("E-Mail", `<a href="mailto:${data.email}" style="color:${ACCENT_COLOR};">${data.email}</a>`)}
      ${row("Telefon", data.telefon || "—")}
    `)}
    ${data.nachricht ? `<p style="margin:24px 0 8px;color:${BRAND_COLOR};font-size:15px;font-weight:700;border-bottom:2px solid #e5e7eb;padding-bottom:6px;">Bemerkungen</p>${messageBox(data.nachricht)}` : ""}
  `;
  return baseLayout("Umzugsanfrage", body);
}

export function umzugEmailText(data: Record<string, unknown>): string {
  return `Neue Umzugsanfrage\n\n${JSON.stringify(data, null, 2)}`;
}

// ── Template: Reinigung ───────────────────────────────────────────────────

export function reinigungEmailHtml(data: {
  reinigungsart: string;
  adresse: { strasse: string; plz: string; ort: string };
  wunschdatum: string;
  flaeche: string;
  anzahlZimmer: string;
  anzahlBadezimmer: string;
  zusatzleistungen: string[];
  abnahmegarantie: boolean;
  name: string;
  email: string;
  telefon?: string;
  nachricht?: string;
}): string {
  const artLabels: Record<string, string> = {
    wohnungsreinigung: "Wohnungsreinigung (Auszug)",
    buerorereinigung: "Büroreinigung",
    unterhaltsreinigung: "Unterhaltsreinigung",
  };
  const zusatzLabels: Record<string, string> = {
    fensterreinigung: "Fensterreinigung",
    backofen: "Backofen",
    kuehlschrank: "Kühlschrank",
    teppichreinigung: "Teppichreinigung",
    keller: "Keller",
  };

  const body = `
    ${section("Reinigungsdetails", `
      ${row("Art der Reinigung", artLabels[data.reinigungsart] ?? data.reinigungsart)}
      ${row("Adresse", `${data.adresse.strasse}, ${data.adresse.plz} ${data.adresse.ort}`)}
      ${row("Wunschdatum", data.wunschdatum)}
      ${row("Fläche", `${data.flaeche} m²`)}
      ${row("Zimmer", data.anzahlZimmer)}
      ${row("Badezimmer", data.anzahlBadezimmer)}
      ${row("Abnahmegarantie", data.abnahmegarantie ? "Ja, gewünscht" : "Nein")}
      ${row("Zusatzleistungen", data.zusatzleistungen.length ? data.zusatzleistungen.map(z => zusatzLabels[z] ?? z).join(", ") : "Keine")}
    `)}
    ${section("Kontaktdaten", `
      ${row("Name", data.name)}
      ${row("E-Mail", `<a href="mailto:${data.email}" style="color:${ACCENT_COLOR};">${data.email}</a>`)}
      ${row("Telefon", data.telefon || "—")}
    `)}
    ${data.nachricht ? `<p style="margin:24px 0 8px;color:${BRAND_COLOR};font-size:15px;font-weight:700;border-bottom:2px solid #e5e7eb;padding-bottom:6px;">Bemerkungen</p>${messageBox(data.nachricht)}` : ""}
  `;
  return baseLayout("Reinigungsanfrage", body);
}

export function reinigungEmailText(data: Record<string, unknown>): string {
  return `Neue Reinigungsanfrage\n\n${JSON.stringify(data, null, 2)}`;
}

// ── Template: Räumung ─────────────────────────────────────────────────────

export function raeumungEmailHtml(data: {
  raeumungsart: string;
  adresse: { strasse: string; plz: string; ort: string };
  wunschdatum: string;
  menge: string;
  etage: string;
  lift: boolean;
  wertgegenstaende: string;
  sondermuell: string;
  name: string;
  email: string;
  telefon?: string;
  nachricht?: string;
}): string {
  const artLabels: Record<string, string> = {
    wohnungsraeumung: "Wohnungsräumung",
    kellerraeumung: "Kellerräumung",
    haushaltsaufloesung: "Haushaltsauflösung",
  };
  const mengeLabels: Record<string, string> = {
    klein: "Klein (1 Zimmer)",
    mittel: "Mittel (2–3 Zimmer)",
    gross: "Gross (4+ Zimmer)",
    "sehr-gross": "Sehr gross (Haus)",
  };
  const etageLabels: Record<string, string> = {
    eg: "EG", "1og": "1. OG", "2og": "2. OG", "3og": "3. OG", "4og": "4. OG", "5og-plus": "5. OG+",
  };

  const body = `
    ${section("Räumungsdetails", `
      ${row("Art der Räumung", artLabels[data.raeumungsart] ?? data.raeumungsart)}
      ${row("Adresse", `${data.adresse.strasse}, ${data.adresse.plz} ${data.adresse.ort}`)}
      ${row("Wunschdatum", data.wunschdatum)}
      ${row("Geschätzte Menge", mengeLabels[data.menge] ?? data.menge)}
      ${row("Etage", etageLabels[data.etage] ?? data.etage)}
      ${row("Lift", data.lift ? "Ja" : "Nein")}
      ${row("Wertgegenstände", data.wertgegenstaende === "ja" ? "Ja" : "Nein")}
      ${row("Sondermüll", data.sondermuell === "ja" ? "Ja" : "Nein")}
    `)}
    ${section("Kontaktdaten", `
      ${row("Name", data.name)}
      ${row("E-Mail", `<a href="mailto:${data.email}" style="color:${ACCENT_COLOR};">${data.email}</a>`)}
      ${row("Telefon", data.telefon || "—")}
    `)}
    ${data.nachricht ? `<p style="margin:24px 0 8px;color:${BRAND_COLOR};font-size:15px;font-weight:700;border-bottom:2px solid #e5e7eb;padding-bottom:6px;">Bemerkungen</p>${messageBox(data.nachricht)}` : ""}
  `;
  return baseLayout("Räumungsanfrage", body);
}

export function raeumungEmailText(data: Record<string, unknown>): string {
  return `Neue Räumungsanfrage\n\n${JSON.stringify(data, null, 2)}`;
}

// ── Template: Klaviertransport ────────────────────────────────────────────

export function klaviertransportEmailHtml(data: {
  instrumentenart: string;
  von: { strasse: string; plz: string; ort: string; etage: string; lift: boolean };
  nach: { strasse: string; plz: string; ort: string; etage: string; lift: boolean };
  transportdatum: string;
  markeModell?: string;
  besonderheiten: string[];
  name: string;
  email: string;
  telefon?: string;
  nachricht?: string;
}): string {
  const instrumentLabels: Record<string, string> = {
    klavier: "Klavier",
    fluegel: "Flügel",
    digitalpiano: "Digitalpiano",
    "keyboard-orgel": "Keyboard / Orgel",
  };
  const etageLabels: Record<string, string> = {
    eg: "EG", "1og": "1. OG", "2og": "2. OG", "3og": "3. OG", "4og-plus": "4. OG+",
  };
  const besonderheitenLabels: Record<string, string> = {
    "enge-treppe": "Enge Treppe",
    kran: "Kran nötig",
    aussenaufzug: "Aussenaufzug",
    wertvoll: "Sehr wertvolles Instrument",
  };

  const body = `
    ${section("Transportdetails", `
      ${row("Instrument", instrumentLabels[data.instrumentenart] ?? data.instrumentenart)}
      ${row("Marke / Modell", data.markeModell || "—")}
      ${row("Transportdatum", data.transportdatum)}
      ${row("Besonderheiten", data.besonderheiten.length ? data.besonderheiten.map(b => besonderheitenLabels[b] ?? b).join(", ") : "Keine")}
    `)}
    ${section("Abholadresse", `
      ${row("Adresse", `${data.von.strasse}, ${data.von.plz} ${data.von.ort}`)}
      ${row("Etage", etageLabels[data.von.etage] ?? data.von.etage)}
      ${row("Lift", data.von.lift ? "Ja" : "Nein")}
    `)}
    ${section("Zieladresse", `
      ${row("Adresse", `${data.nach.strasse}, ${data.nach.plz} ${data.nach.ort}`)}
      ${row("Etage", etageLabels[data.nach.etage] ?? data.nach.etage)}
      ${row("Lift", data.nach.lift ? "Ja" : "Nein")}
    `)}
    ${section("Kontaktdaten", `
      ${row("Name", data.name)}
      ${row("E-Mail", `<a href="mailto:${data.email}" style="color:${ACCENT_COLOR};">${data.email}</a>`)}
      ${row("Telefon", data.telefon || "—")}
    `)}
    ${data.nachricht ? `<p style="margin:24px 0 8px;color:${BRAND_COLOR};font-size:15px;font-weight:700;border-bottom:2px solid #e5e7eb;padding-bottom:6px;">Bemerkungen</p>${messageBox(data.nachricht)}` : ""}
  `;
  return baseLayout("Klaviertransport-Anfrage", body);
}

export function klaviertransportEmailText(data: Record<string, unknown>): string {
  return `Neue Klaviertransport-Anfrage\n\n${JSON.stringify(data, null, 2)}`;
}
