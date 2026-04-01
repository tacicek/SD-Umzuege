import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  kontaktEmailHtml, kontaktEmailText,
  angebotEmailHtml, angebotEmailText,
  umzugEmailHtml, umzugEmailText,
  reinigungEmailHtml, reinigungEmailText,
  raeumungEmailHtml, raeumungEmailText,
  klaviertransportEmailHtml, klaviertransportEmailText,
} from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = "info@sd-umzuege.ch";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "anfragen@sd-umzuege.ch";

const SUBJECT_MAP: Record<string, string> = {
  kontakt: "Neue Kontaktanfrage — sd-umzuege.ch",
  angebot: "Neue Angebotsanfrage — sd-umzuege.ch",
  umzug: "Neue Umzugsanfrage — sd-umzuege.ch",
  reinigung: "Neue Reinigungsanfrage — sd-umzuege.ch",
  raeumung: "Neue Räumungsanfrage — sd-umzuege.ch",
  klaviertransport: "Neue Klaviertransport-Anfrage — sd-umzuege.ch",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...data } = body as { type: string; [key: string]: unknown };

    if (!type || !SUBJECT_MAP[type]) {
      return NextResponse.json({ error: "Ungültiger Formulartyp." }, { status: 400 });
    }

    let html: string;
    let text: string;

    switch (type) {
      case "kontakt":
        html = kontaktEmailHtml(data as Parameters<typeof kontaktEmailHtml>[0]);
        text = kontaktEmailText(data as Parameters<typeof kontaktEmailText>[0]);
        break;
      case "angebot":
        html = angebotEmailHtml(data as Parameters<typeof angebotEmailHtml>[0]);
        text = angebotEmailText(data as Parameters<typeof angebotEmailText>[0]);
        break;
      case "umzug":
        html = umzugEmailHtml(data as Parameters<typeof umzugEmailHtml>[0]);
        text = umzugEmailText(data as Record<string, unknown>);
        break;
      case "reinigung":
        html = reinigungEmailHtml(data as Parameters<typeof reinigungEmailHtml>[0]);
        text = reinigungEmailText(data as Record<string, unknown>);
        break;
      case "raeumung":
        html = raeumungEmailHtml(data as Parameters<typeof raeumungEmailHtml>[0]);
        text = raeumungEmailText(data as Record<string, unknown>);
        break;
      case "klaviertransport":
        html = klaviertransportEmailHtml(data as Parameters<typeof klaviertransportEmailHtml>[0]);
        text = klaviertransportEmailText(data as Record<string, unknown>);
        break;
      default:
        return NextResponse.json({ error: "Ungültiger Formulartyp." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: typeof data.email === "string" ? data.email : undefined,
      subject: SUBJECT_MAP[type],
      html,
      text,
    });

    if (error) {
      console.error("[send] Resend error:", error);
      return NextResponse.json({ error: "E-Mail konnte nicht gesendet werden." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[send] Unexpected error:", err);
    return NextResponse.json({ error: "Serverfehler." }, { status: 500 });
  }
}
