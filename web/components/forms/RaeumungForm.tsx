"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { raeumungSchema, type RaeumungFormData } from "@/lib/validations";
import { BaseContactFields } from "@/components/forms/BaseContactFields";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";

const ETAGEN = [
  { value: "eg", label: "EG (Erdgeschoss)" },
  { value: "1og", label: "1. OG" },
  { value: "2og", label: "2. OG" },
  { value: "3og", label: "3. OG" },
  { value: "4og", label: "4. OG" },
  { value: "5og-plus", label: "5. OG+" },
];

export default function RaeumungForm() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<RaeumungFormData>({
    resolver: zodResolver(raeumungSchema),
    defaultValues: {
      lift: false,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(data: RaeumungFormData) {
    setIsLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "raeumung", ...data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Unbekannter Fehler");
      setSuccess(true);
      reset();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Unbekannter Fehler");
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
          Wir haben Ihre Räumungsanfrage erhalten und melden uns innert 24 Stunden
          mit einem unverbindlichen Angebot.
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
      aria-label="Räumungsanfrage Formular"
      className="space-y-10"
    >
      {/* ── Räumungsart ───────────────────────────────────────────────── */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-brand-primary">
          Art der Räumung{" "}
          <span className="text-brand-error" aria-hidden="true">*</span>
        </legend>
        <Controller
          control={control}
          name="raeumungsart"
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              aria-required="true"
              aria-describedby={errors.raeumungsart ? "raeumungsart-error" : undefined}
              className="flex flex-col sm:flex-row gap-3 flex-wrap"
            >
              {[
                { value: "wohnungsraeumung", label: "Wohnungsräumung" },
                { value: "kellerraeumung", label: "Kellerräumung" },
                { value: "haushaltsaufloesung", label: "Haushaltsauflösung" },
              ].map((opt) => (
                <Label
                  key={opt.value}
                  className="flex items-center gap-2.5 border border-border rounded-xl px-4 py-3 cursor-pointer has-[[data-state=checked]]:border-brand-accent has-[[data-state=checked]]:bg-brand-accent/5 transition-colors"
                >
                  <RadioGroupItem value={opt.value} />
                  {opt.label}
                </Label>
              ))}
            </RadioGroup>
          )}
        />
        {errors.raeumungsart && (
          <p id="raeumungsart-error" role="alert" className="text-brand-error text-sm">
            {errors.raeumungsart.message}
          </p>
        )}
      </fieldset>

      {/* ── Adresse ───────────────────────────────────────────────────── */}
      <fieldset className="space-y-4 rounded-2xl border border-border p-5">
        <legend className="text-base font-semibold text-brand-primary px-1">
          Räumungsadresse
        </legend>
        <div className="space-y-1.5">
          <Label htmlFor="adresse.strasse" className="font-medium text-sm">
            Strasse{" "}
            <span className="text-brand-error" aria-hidden="true">*</span>
          </Label>
          <Input
            id="adresse.strasse"
            placeholder="Musterstrasse 12"
            aria-required="true"
            aria-invalid={!!errors.adresse?.strasse}
            {...register("adresse.strasse")}
          />
          {errors.adresse?.strasse && (
            <p role="alert" className="text-brand-error text-sm">
              {errors.adresse.strasse.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="adresse.plz" className="font-medium text-sm">
              PLZ <span className="text-brand-error" aria-hidden="true">*</span>
            </Label>
            <Input
              id="adresse.plz"
              placeholder="8000"
              maxLength={6}
              aria-required="true"
              aria-invalid={!!errors.adresse?.plz}
              {...register("adresse.plz")}
            />
            {errors.adresse?.plz && (
              <p role="alert" className="text-brand-error text-sm">
                {errors.adresse.plz.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="adresse.ort" className="font-medium text-sm">
              Ort <span className="text-brand-error" aria-hidden="true">*</span>
            </Label>
            <Input
              id="adresse.ort"
              placeholder="Zürich"
              aria-required="true"
              aria-invalid={!!errors.adresse?.ort}
              {...register("adresse.ort")}
            />
            {errors.adresse?.ort && (
              <p role="alert" className="text-brand-error text-sm">
                {errors.adresse.ort.message}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* ── Wunschdatum ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <Label htmlFor="wunschdatum" className="font-medium text-sm">
            Wunschdatum{" "}
            <span className="text-brand-error" aria-hidden="true">*</span>
          </Label>
          <Input
            id="wunschdatum"
            type="date"
            aria-required="true"
            aria-invalid={!!errors.wunschdatum}
            aria-describedby={errors.wunschdatum ? "wunschdatum-error" : undefined}
            {...register("wunschdatum")}
          />
          {errors.wunschdatum && (
            <p id="wunschdatum-error" role="alert" className="text-brand-error text-sm">
              {errors.wunschdatum.message}
            </p>
          )}
        </div>

        {/* ── Geschätzte Menge ─────────────────────────────────────────── */}
        <div className="space-y-1.5">
          <Label htmlFor="menge" className="font-medium text-sm">
            Geschätzte Menge{" "}
            <span className="text-brand-error" aria-hidden="true">*</span>
          </Label>
          <Controller
            control={control}
            name="menge"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="menge"
                  aria-invalid={!!errors.menge}
                  aria-describedby={errors.menge ? "menge-error" : undefined}
                >
                  <SelectValue placeholder="Menge auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="klein">Klein (1 Zimmer)</SelectItem>
                  <SelectItem value="mittel">Mittel (2–3 Zimmer)</SelectItem>
                  <SelectItem value="gross">Gross (4+ Zimmer)</SelectItem>
                  <SelectItem value="sehr-gross">Sehr gross (Haus)</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.menge && (
            <p id="menge-error" role="alert" className="text-brand-error text-sm">
              {errors.menge.message}
            </p>
          )}
        </div>
      </div>

      {/* ── Etage + Lift ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
        <div className="space-y-1.5">
          <Label htmlFor="etage" className="font-medium text-sm">
            Etage{" "}
            <span className="text-brand-error" aria-hidden="true">*</span>
          </Label>
          <Controller
            control={control}
            name="etage"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="etage"
                  aria-invalid={!!errors.etage}
                  aria-describedby={errors.etage ? "etage-error" : undefined}
                >
                  <SelectValue placeholder="Etage auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {ETAGEN.map((e) => (
                    <SelectItem key={e.value} value={e.value}>
                      {e.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.etage && (
            <p id="etage-error" role="alert" className="text-brand-error text-sm">
              {errors.etage.message}
            </p>
          )}
        </div>
        <Label className="flex items-center gap-2.5 cursor-pointer pb-1">
          <Controller
            control={control}
            name="lift"
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id="lift"
              />
            )}
          />
          <span className="text-sm">Lift vorhanden</span>
        </Label>
      </div>

      {/* ── Wertgegenstände + Sondermüll ─────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <fieldset className="space-y-3">
          <legend className="text-base font-semibold text-brand-primary">
            Wertgegenstände vorhanden?{" "}
            <span className="text-brand-error" aria-hidden="true">*</span>
          </legend>
          <Controller
            control={control}
            name="wertgegenstaende"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                aria-required="true"
                aria-describedby={errors.wertgegenstaende ? "wertgegenstaende-error" : undefined}
                className="flex gap-3"
              >
                {[
                  { value: "ja", label: "Ja" },
                  { value: "nein", label: "Nein" },
                ].map((opt) => (
                  <Label
                    key={opt.value}
                    className="flex items-center gap-2 border border-border rounded-xl px-4 py-3 cursor-pointer has-[[data-state=checked]]:border-brand-accent has-[[data-state=checked]]:bg-brand-accent/5 transition-colors"
                  >
                    <RadioGroupItem value={opt.value} />
                    {opt.label}
                  </Label>
                ))}
              </RadioGroup>
            )}
          />
          {errors.wertgegenstaende && (
            <p id="wertgegenstaende-error" role="alert" className="text-brand-error text-sm">
              {errors.wertgegenstaende.message}
            </p>
          )}
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-base font-semibold text-brand-primary">
            Sondermüll vorhanden?{" "}
            <span className="text-brand-error" aria-hidden="true">*</span>
          </legend>
          <Controller
            control={control}
            name="sondermuell"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                aria-required="true"
                aria-describedby={errors.sondermuell ? "sondermuell-error" : undefined}
                className="flex gap-3"
              >
                {[
                  { value: "ja", label: "Ja" },
                  { value: "nein", label: "Nein" },
                ].map((opt) => (
                  <Label
                    key={opt.value}
                    className="flex items-center gap-2 border border-border rounded-xl px-4 py-3 cursor-pointer has-[[data-state=checked]]:border-brand-accent has-[[data-state=checked]]:bg-brand-accent/5 transition-colors"
                  >
                    <RadioGroupItem value={opt.value} />
                    {opt.label}
                  </Label>
                ))}
              </RadioGroup>
            )}
          />
          {errors.sondermuell && (
            <p id="sondermuell-error" role="alert" className="text-brand-error text-sm">
              {errors.sondermuell.message}
            </p>
          )}
        </fieldset>
      </div>

      {/* ── Kontaktfelder ─────────────────────────────────────────────── */}
      <BaseContactFields form={form} />

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

      {submitError && (
        <p role="alert" className="text-sm text-brand-error bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {submitError}
        </p>
      )}

      {/* ── Submit ────────────────────────────────────────────────────── */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-dark disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full px-8 py-3.5 font-semibold text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          aria-busy={isLoading}
        >
          {isLoading ? "Wird gesendet…" : "Unverbindliche Offerte anfordern"}
        </button>
      </div>
    </form>
  );
}
