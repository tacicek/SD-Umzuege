"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { angebotSchema, type AngebotFormData } from "@/lib/validations";
import { BaseContactFields } from "@/components/forms/BaseContactFields";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";

const LEISTUNGEN = [
  { value: "umzug", label: "Umzug" },
  { value: "reinigung", label: "Reinigung" },
  { value: "raeumung", label: "Räumung" },
  { value: "klaviertransport", label: "Klaviertransport" },
  { value: "andere", label: "Andere" },
];

export default function AngebotForm() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AngebotFormData>({
    resolver: zodResolver(angebotSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(data: AngebotFormData) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "angebot", ...data }),
      });
      if (!res.ok) throw new Error("send failed");
      setSuccess(true);
      reset();
    } catch {
      alert("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.");
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center gap-4 rounded-2xl bg-green-50 border border-green-200 px-8 py-12 text-center"
      >
        <CheckCircle2 className="size-12 text-brand-success" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-brand-primary">
          Vielen Dank für Ihre Anfrage!
        </h2>
        <p className="text-brand-text-muted max-w-md">
          Wir haben Ihre Nachricht erhalten und melden uns innert 24 Stunden
          mit einem unverbindlichen Angebot bei Ihnen.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-2 text-brand-accent underline underline-offset-4 text-sm font-medium hover:text-brand-accent-dark transition-colors"
        >
          Neue Anfrage stellen
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Angebotsanfrage Formular"
      className="space-y-8"
    >
      {/* ── Leistung ──────────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        <Label htmlFor="leistung" className="font-medium text-sm">
          Gewünschte Leistung{" "}
          <span className="text-brand-error" aria-hidden="true">*</span>
          <span className="sr-only">(Pflichtfeld)</span>
        </Label>
        <Controller
          control={control}
          name="leistung"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="leistung"
                aria-required="true"
                aria-invalid={!!errors.leistung}
                aria-describedby={errors.leistung ? "leistung-error" : undefined}
                className="w-full sm:max-w-xs"
              >
                <SelectValue placeholder="Leistung auswählen" />
              </SelectTrigger>
              <SelectContent>
                {LEISTUNGEN.map((l) => (
                  <SelectItem key={l.value} value={l.value}>
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.leistung && (
          <p id="leistung-error" role="alert" className="text-brand-error text-sm">
            {errors.leistung.message}
          </p>
        )}
      </div>

      {/* ── Kontaktfelder (without nachricht — we render it below with required) */}
      <BaseContactFields form={form} showNachricht={false} />

      {/* ── Nachricht (required in this form) ────────────────────────── */}
      <div className="space-y-1.5">
        <Label htmlFor="nachricht" className="font-medium text-sm">
          Nachricht{" "}
          <span className="text-brand-error" aria-hidden="true">*</span>
          <span className="sr-only">(Pflichtfeld)</span>
        </Label>
        <Textarea
          id="nachricht"
          placeholder="Beschreiben Sie Ihr Anliegen, z.B. Umzugsdatum, Adressen, besondere Wünsche ..."
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.nachricht}
          aria-describedby={errors.nachricht ? "nachricht-error" : undefined}
          {...register("nachricht")}
        />
        {errors.nachricht && (
          <p id="nachricht-error" role="alert" className="text-brand-error text-sm">
            {errors.nachricht.message}
          </p>
        )}
      </div>

      {/* ── Datenschutz ───────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        <Label className="flex items-start gap-2.5 cursor-pointer">
          <Controller
            control={control}
            name="datenschutz"
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id="datenschutz"
                aria-required="true"
                aria-describedby={errors.datenschutz ? "datenschutz-error" : undefined}
                aria-invalid={!!errors.datenschutz}
                className="mt-0.5"
              />
            )}
          />
          <span className="text-sm text-brand-text-muted leading-relaxed">
            Ich akzeptiere die{" "}
            <a
              href="/datenschutz"
              className="text-brand-primary underline underline-offset-2 hover:text-brand-accent transition-colors"
            >
              Datenschutzerklärung
            </a>{" "}
            und erkläre mich damit einverstanden, dass meine Daten zur
            Bearbeitung dieser Anfrage verwendet werden.{" "}
            <span className="text-brand-error" aria-hidden="true">*</span>
          </span>
        </Label>
        {errors.datenschutz && (
          <p id="datenschutz-error" role="alert" className="text-brand-error text-sm">
            {errors.datenschutz.message}
          </p>
        )}
      </div>

      {/* ── Submit ────────────────────────────────────────────────────── */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-dark disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full px-8 py-3.5 font-semibold text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          aria-busy={isLoading}
        >
          {isLoading ? "Wird gesendet…" : "Jetzt Offerte anfordern"}
        </button>
      </div>
    </form>
  );
}
