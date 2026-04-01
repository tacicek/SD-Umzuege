"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { klaviertransportSchema, type KlaviertransportFormData } from "@/lib/validations";
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
  { value: "4og-plus", label: "4. OG+" },
];

const BESONDERHEITEN = [
  { value: "enge-treppe", label: "Enge Treppe" },
  { value: "kran", label: "Kran nötig" },
  { value: "aussenaufzug", label: "Aussenaufzug" },
  { value: "wertvoll", label: "Sehr wertvolles Instrument" },
];

export default function KlaviertransportForm() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<KlaviertransportFormData>({
    resolver: zodResolver(klaviertransportSchema),
    defaultValues: {
      besonderheiten: [],
      von: { lift: false },
      nach: { lift: false },
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(data: KlaviertransportFormData) {
    setIsLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "klaviertransport", ...data }),
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
          Wir haben Ihre Klaviertransport-Anfrage erhalten und melden uns innert
          24 Stunden mit einem unverbindlichen Angebot.
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
      aria-label="Klaviertransport Anfrage Formular"
      className="space-y-10"
    >
      {/* ── Instrumentenart ───────────────────────────────────────────── */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-brand-primary">
          Instrumentenart{" "}
          <span className="text-brand-error" aria-hidden="true">*</span>
        </legend>
        <Controller
          control={control}
          name="instrumentenart"
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              aria-required="true"
              aria-describedby={errors.instrumentenart ? "instrumentenart-error" : undefined}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {[
                { value: "klavier", label: "Klavier" },
                { value: "fluegel", label: "Flügel" },
                { value: "digitalpiano", label: "Digitalpiano" },
                { value: "keyboard-orgel", label: "Keyboard / Orgel" },
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
        {errors.instrumentenart && (
          <p id="instrumentenart-error" role="alert" className="text-brand-error text-sm">
            {errors.instrumentenart.message}
          </p>
        )}
      </fieldset>

      {/* ── Adressen ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Von */}
        <fieldset className="space-y-4 rounded-2xl border border-border p-5">
          <legend className="text-base font-semibold text-brand-primary px-1">
            Abholadresse
          </legend>
          <div className="space-y-1.5">
            <Label htmlFor="von.strasse" className="font-medium text-sm">
              Strasse{" "}
              <span className="text-brand-error" aria-hidden="true">*</span>
            </Label>
            <Input
              id="von.strasse"
              placeholder="Musterstrasse 12"
              aria-required="true"
              aria-invalid={!!errors.von?.strasse}
              {...register("von.strasse")}
            />
            {errors.von?.strasse && (
              <p role="alert" className="text-brand-error text-sm">
                {errors.von.strasse.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="von.plz" className="font-medium text-sm">
                PLZ <span className="text-brand-error" aria-hidden="true">*</span>
              </Label>
              <Input
                id="von.plz"
                placeholder="8000"
                maxLength={6}
                aria-required="true"
                aria-invalid={!!errors.von?.plz}
                {...register("von.plz")}
              />
              {errors.von?.plz && (
                <p role="alert" className="text-brand-error text-sm">
                  {errors.von.plz.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="von.ort" className="font-medium text-sm">
                Ort <span className="text-brand-error" aria-hidden="true">*</span>
              </Label>
              <Input
                id="von.ort"
                placeholder="Zürich"
                aria-required="true"
                aria-invalid={!!errors.von?.ort}
                {...register("von.ort")}
              />
              {errors.von?.ort && (
                <p role="alert" className="text-brand-error text-sm">
                  {errors.von.ort.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="von.etage" className="font-medium text-sm">
              Etage{" "}
              <span className="text-brand-error" aria-hidden="true">*</span>
            </Label>
            <Controller
              control={control}
              name="von.etage"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="von.etage" aria-invalid={!!errors.von?.etage}>
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
            {errors.von?.etage && (
              <p role="alert" className="text-brand-error text-sm">
                {errors.von.etage.message}
              </p>
            )}
          </div>
          <Label className="flex items-center gap-2.5 cursor-pointer">
            <Controller
              control={control}
              name="von.lift"
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="von.lift"
                />
              )}
            />
            <span className="text-sm">Lift vorhanden</span>
          </Label>
        </fieldset>

        {/* Nach */}
        <fieldset className="space-y-4 rounded-2xl border border-border p-5">
          <legend className="text-base font-semibold text-brand-primary px-1">
            Zieladresse
          </legend>
          <div className="space-y-1.5">
            <Label htmlFor="nach.strasse" className="font-medium text-sm">
              Strasse{" "}
              <span className="text-brand-error" aria-hidden="true">*</span>
            </Label>
            <Input
              id="nach.strasse"
              placeholder="Musterstrasse 12"
              aria-required="true"
              aria-invalid={!!errors.nach?.strasse}
              {...register("nach.strasse")}
            />
            {errors.nach?.strasse && (
              <p role="alert" className="text-brand-error text-sm">
                {errors.nach.strasse.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="nach.plz" className="font-medium text-sm">
                PLZ <span className="text-brand-error" aria-hidden="true">*</span>
              </Label>
              <Input
                id="nach.plz"
                placeholder="8000"
                maxLength={6}
                aria-required="true"
                aria-invalid={!!errors.nach?.plz}
                {...register("nach.plz")}
              />
              {errors.nach?.plz && (
                <p role="alert" className="text-brand-error text-sm">
                  {errors.nach.plz.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="nach.ort" className="font-medium text-sm">
                Ort <span className="text-brand-error" aria-hidden="true">*</span>
              </Label>
              <Input
                id="nach.ort"
                placeholder="Bern"
                aria-required="true"
                aria-invalid={!!errors.nach?.ort}
                {...register("nach.ort")}
              />
              {errors.nach?.ort && (
                <p role="alert" className="text-brand-error text-sm">
                  {errors.nach.ort.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="nach.etage" className="font-medium text-sm">
              Etage{" "}
              <span className="text-brand-error" aria-hidden="true">*</span>
            </Label>
            <Controller
              control={control}
              name="nach.etage"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="nach.etage" aria-invalid={!!errors.nach?.etage}>
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
            {errors.nach?.etage && (
              <p role="alert" className="text-brand-error text-sm">
                {errors.nach.etage.message}
              </p>
            )}
          </div>
          <Label className="flex items-center gap-2.5 cursor-pointer">
            <Controller
              control={control}
              name="nach.lift"
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="nach.lift"
                />
              )}
            />
            <span className="text-sm">Lift vorhanden</span>
          </Label>
        </fieldset>
      </div>

      {/* ── Transportdatum + Marke/Modell ────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <Label htmlFor="transportdatum" className="font-medium text-sm">
            Transportdatum{" "}
            <span className="text-brand-error" aria-hidden="true">*</span>
          </Label>
          <Input
            id="transportdatum"
            type="date"
            aria-required="true"
            aria-invalid={!!errors.transportdatum}
            aria-describedby={errors.transportdatum ? "transportdatum-error" : undefined}
            {...register("transportdatum")}
          />
          {errors.transportdatum && (
            <p id="transportdatum-error" role="alert" className="text-brand-error text-sm">
              {errors.transportdatum.message}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="markeModell" className="font-medium text-sm">
            Marke / Modell
          </Label>
          <Input
            id="markeModell"
            type="text"
            placeholder="z.B. Steinway & Sons B-211"
            {...register("markeModell")}
          />
        </div>
      </div>

      {/* ── Besonderheiten ────────────────────────────────────────────── */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-brand-primary">
          Besonderheiten
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BESONDERHEITEN.map((b) => (
            <Label
              key={b.value}
              className="flex items-center gap-2.5 border border-border rounded-xl px-4 py-3 cursor-pointer hover:bg-brand-bg-subtle transition-colors"
            >
              <Controller
                control={control}
                name="besonderheiten"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value?.includes(b.value)}
                    onCheckedChange={(checked) => {
                      const current = field.value ?? [];
                      field.onChange(
                        checked
                          ? [...current, b.value]
                          : current.filter((v) => v !== b.value)
                      );
                    }}
                  />
                )}
              />
              <span className="text-sm">{b.label}</span>
            </Label>
          ))}
        </div>
      </fieldset>

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
