"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { reinigungSchema, type ReinigungFormData } from "@/lib/validations";
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

const ZIMMER_OPTIONS = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+",
];

const BADEZIMMER_OPTIONS = ["1", "2", "3", "4", "5+"];

const ZUSATZLEISTUNGEN = [
  { value: "fensterreinigung", label: "Fensterreinigung" },
  { value: "backofen", label: "Backofen" },
  { value: "kuehlschrank", label: "Kühlschrank" },
  { value: "teppichreinigung", label: "Teppichreinigung" },
  { value: "keller", label: "Keller" },
];

export default function ReinigungForm() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ReinigungFormData>({
    resolver: zodResolver(reinigungSchema),
    defaultValues: {
      zusatzleistungen: [],
      abnahmegarantie: false,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(data: ReinigungFormData) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "reinigung", ...data }),
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
          Wir haben Ihre Reinigungsanfrage erhalten und melden uns innert 24 Stunden
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
      aria-label="Reinigungsanfrage Formular"
      className="space-y-10"
    >
      {/* ── Reinigungsart ─────────────────────────────────────────────── */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-brand-primary">
          Art der Reinigung{" "}
          <span className="text-brand-error" aria-hidden="true">*</span>
        </legend>
        <Controller
          control={control}
          name="reinigungsart"
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              aria-required="true"
              aria-describedby={errors.reinigungsart ? "reinigungsart-error" : undefined}
              className="flex flex-col sm:flex-row gap-3 flex-wrap"
            >
              {[
                { value: "wohnungsreinigung", label: "Wohnungsreinigung (Auszug)" },
                { value: "buerorereinigung", label: "Büroreinigung" },
                { value: "unterhaltsreinigung", label: "Unterhaltsreinigung" },
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
        {errors.reinigungsart && (
          <p id="reinigungsart-error" role="alert" className="text-brand-error text-sm">
            {errors.reinigungsart.message}
          </p>
        )}
      </fieldset>

      {/* ── Adresse ───────────────────────────────────────────────────── */}
      <fieldset className="space-y-4 rounded-2xl border border-border p-5">
        <legend className="text-base font-semibold text-brand-primary px-1">
          Reinigungsadresse
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

      {/* ── Wunschdatum + Fläche ──────────────────────────────────────── */}
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
        <div className="space-y-1.5">
          <Label htmlFor="flaeche" className="font-medium text-sm">
            Fläche (m\u00B2){" "}
            <span className="text-brand-error" aria-hidden="true">*</span>
          </Label>
          <Input
            id="flaeche"
            type="number"
            min={1}
            placeholder="z.B. 85"
            aria-required="true"
            aria-invalid={!!errors.flaeche}
            aria-describedby={errors.flaeche ? "flaeche-error" : undefined}
            {...register("flaeche")}
          />
          {errors.flaeche && (
            <p id="flaeche-error" role="alert" className="text-brand-error text-sm">
              {errors.flaeche.message}
            </p>
          )}
        </div>
      </div>

      {/* ── Zimmer + Badezimmer ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <Label htmlFor="anzahlZimmer" className="font-medium text-sm">
            Anzahl Zimmer{" "}
            <span className="text-brand-error" aria-hidden="true">*</span>
          </Label>
          <Controller
            control={control}
            name="anzahlZimmer"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="anzahlZimmer"
                  aria-invalid={!!errors.anzahlZimmer}
                  aria-describedby={errors.anzahlZimmer ? "zimmer-error" : undefined}
                >
                  <SelectValue placeholder="Zimmer auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {ZIMMER_OPTIONS.map((z) => (
                    <SelectItem key={z} value={z}>
                      {z}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.anzahlZimmer && (
            <p id="zimmer-error" role="alert" className="text-brand-error text-sm">
              {errors.anzahlZimmer.message}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="anzahlBadezimmer" className="font-medium text-sm">
            Anzahl Badezimmer{" "}
            <span className="text-brand-error" aria-hidden="true">*</span>
          </Label>
          <Controller
            control={control}
            name="anzahlBadezimmer"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="anzahlBadezimmer"
                  aria-invalid={!!errors.anzahlBadezimmer}
                  aria-describedby={errors.anzahlBadezimmer ? "bad-error" : undefined}
                >
                  <SelectValue placeholder="Badezimmer auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {BADEZIMMER_OPTIONS.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.anzahlBadezimmer && (
            <p id="bad-error" role="alert" className="text-brand-error text-sm">
              {errors.anzahlBadezimmer.message}
            </p>
          )}
        </div>
      </div>

      {/* ── Zusatzleistungen ──────────────────────────────────────────── */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-brand-primary">
          Zusatzleistungen
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ZUSATZLEISTUNGEN.map((zl) => (
            <Label
              key={zl.value}
              className="flex items-center gap-2.5 border border-border rounded-xl px-4 py-3 cursor-pointer hover:bg-brand-bg-subtle transition-colors"
            >
              <Controller
                control={control}
                name="zusatzleistungen"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value?.includes(zl.value)}
                    onCheckedChange={(checked) => {
                      const current = field.value ?? [];
                      field.onChange(
                        checked
                          ? [...current, zl.value]
                          : current.filter((v) => v !== zl.value)
                      );
                    }}
                  />
                )}
              />
              <span className="text-sm">{zl.label}</span>
            </Label>
          ))}
        </div>
      </fieldset>

      {/* ── Abnahmegarantie ───────────────────────────────────────────── */}
      <Label className="flex items-center gap-2.5 cursor-pointer border border-border rounded-xl px-4 py-3 hover:bg-brand-bg-subtle transition-colors w-fit">
        <Controller
          control={control}
          name="abnahmegarantie"
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              id="abnahmegarantie"
            />
          )}
        />
        <span className="text-sm font-medium">Abnahmegarantie gewünscht</span>
      </Label>

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
