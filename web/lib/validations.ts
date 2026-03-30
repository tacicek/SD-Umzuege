import { z } from "zod";

// ---------------------------------------------------------------------------
// Shared base fields (used across all service forms)
// ---------------------------------------------------------------------------

export const baseContactSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen enthalten"),
  email: z.string().email("Bitte eine gueltige E-Mail-Adresse eingeben"),
  telefon: z.string().min(6, "Bitte eine gueltige Telefonnummer eingeben"),
  nachricht: z.string().optional(),
  datenschutz: z
    .boolean()
    .refine((v) => v === true, {
      message: "Bitte akzeptieren Sie die Datenschutzerklaerung",
    }),
});

// ---------------------------------------------------------------------------
// Address sub-schema
// ---------------------------------------------------------------------------

const adresseSchema = z.object({
  strasse: z.string().min(2, "Bitte Strasse angeben"),
  plz: z.string().min(4, "Bitte PLZ angeben"),
  ort: z.string().min(2, "Bitte Ort angeben"),
});

const adresseMitEtageSchema = adresseSchema.extend({
  etage: z.string().min(1, "Bitte Etage auswaehlen"),
  lift: z.boolean().optional(),
});

// ---------------------------------------------------------------------------
// Future date validation
// ---------------------------------------------------------------------------

const futureDateSchema = z
  .string()
  .min(1, "Bitte ein Datum auswaehlen")
  .refine((val) => new Date(val) > new Date(), {
    message: "Das Datum muss in der Zukunft liegen",
  });

// ---------------------------------------------------------------------------
// 1. Umzug
// ---------------------------------------------------------------------------

export const umzugSchema = baseContactSchema.extend({
  umzugsart: z.enum(["privatumzug", "firmenumzug", "auslandsumzug"], {
    message: "Bitte Umzugsart auswaehlen",
  }),
  von: adresseSchema,
  nach: adresseSchema,
  etageVon: z.string().min(1, "Bitte Etage auswaehlen"),
  liftVon: z.boolean().optional(),
  etageNach: z.string().min(1, "Bitte Etage auswaehlen"),
  liftNach: z.boolean().optional(),
  umzugsdatum: futureDateSchema,
  wohnungsgroesse: z.enum(
    [
      "studio-1-zimmer",
      "2-3-zimmer",
      "4-5-zimmer",
      "6-plus-zimmer",
      "buero-gewerbe",
    ],
    { message: "Bitte Wohnungsgroesse auswaehlen" }
  ),
  zusatzleistungen: z.array(z.string()).optional(),
});

export type UmzugFormData = z.infer<typeof umzugSchema>;

// ---------------------------------------------------------------------------
// 2. Reinigung
// ---------------------------------------------------------------------------

export const reinigungSchema = baseContactSchema.extend({
  reinigungsart: z.enum(
    ["wohnungsreinigung", "buerorereinigung", "unterhaltsreinigung"],
    { message: "Bitte Reinigungsart auswaehlen" }
  ),
  adresse: adresseSchema,
  wunschdatum: futureDateSchema,
  flaeche: z
    .string()
    .min(1, "Bitte Flaeche angeben")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
      message: "Bitte eine gueltige Flaeche in m\u00B2 angeben",
    }),
  anzahlZimmer: z.string().min(1, "Bitte Anzahl Zimmer auswaehlen"),
  anzahlBadezimmer: z.string().min(1, "Bitte Anzahl Badezimmer auswaehlen"),
  zusatzleistungen: z.array(z.string()).optional(),
  abnahmegarantie: z.boolean().optional(),
});

export type ReinigungFormData = z.infer<typeof reinigungSchema>;

// ---------------------------------------------------------------------------
// 3. Raeumung
// ---------------------------------------------------------------------------

export const raeumungSchema = baseContactSchema.extend({
  raeumungsart: z.enum(
    ["wohnungsraeumung", "kellerraeumung", "haushaltsaufloesung"],
    { message: "Bitte Raeumungsart auswaehlen" }
  ),
  adresse: adresseSchema,
  wunschdatum: futureDateSchema,
  menge: z.enum(
    ["klein", "mittel", "gross", "sehr-gross"],
    { message: "Bitte geschaetzte Menge auswaehlen" }
  ),
  etage: z.string().min(1, "Bitte Etage auswaehlen"),
  lift: z.boolean().optional(),
  wertgegenstaende: z.enum(["ja", "nein"], {
    message: "Bitte auswaehlen",
  }),
  sondermuell: z.enum(["ja", "nein"], {
    message: "Bitte auswaehlen",
  }),
});

export type RaeumungFormData = z.infer<typeof raeumungSchema>;

// ---------------------------------------------------------------------------
// 4. Klaviertransport
// ---------------------------------------------------------------------------

export const klaviertransportSchema = baseContactSchema.extend({
  instrumentenart: z.enum(
    ["klavier", "fluegel", "digitalpiano", "keyboard-orgel"],
    { message: "Bitte Instrumentenart auswaehlen" }
  ),
  von: adresseMitEtageSchema,
  nach: adresseMitEtageSchema,
  transportdatum: futureDateSchema,
  markeModell: z.string().optional(),
  besonderheiten: z.array(z.string()).optional(),
});

export type KlaviertransportFormData = z.infer<typeof klaviertransportSchema>;

// ---------------------------------------------------------------------------
// 5. Allgemeines Angebotsformular
// ---------------------------------------------------------------------------

export const angebotSchema = baseContactSchema.extend({
  leistung: z.enum(
    ["umzug", "reinigung", "raeumung", "klaviertransport", "andere"],
    { message: "Bitte Leistung auswaehlen" }
  ),
  nachricht: z
    .string()
    .min(10, "Nachricht muss mindestens 10 Zeichen enthalten"),
});

export type AngebotFormData = z.infer<typeof angebotSchema>;

// ---------------------------------------------------------------------------
// Legacy contact schema (kept for backward compatibility)
// ---------------------------------------------------------------------------

export const contactSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen enthalten"),
  email: z.string().email("Bitte eine gueltige E-Mail-Adresse eingeben"),
  telefon: z.string().optional(),
  nachricht: z.string().min(10, "Nachricht muss mindestens 10 Zeichen enthalten"),
  datenschutz: z
    .boolean()
    .refine((v) => v === true, {
      message: "Bitte akzeptieren Sie die Datenschutzerklarung",
    }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
