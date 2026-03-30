"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { umzugSchema, type UmzugFormData } from "@/lib/validations";
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

const WOHNUNGSGROESSEN = [
  { value: "studio-1-zimmer", label: "Studio / 1 Zimmer" },
  { value: "2-3-zimmer", label: "2–3 Zimmer" },
  { value: "4-5-zimmer", label: "4–5 Zimmer" },
  { value: "6-plus-zimmer", label: "6+ Zimmer" },
  { value: "buero-gewerbe", label: "Büro / Gewerbe" },
];

const ZUSATZLEISTUNGEN = [
  { value: "verpackungsservice", label: "Verpackungsservice" },
  { value: "moebelservice", label: "Möbelmontage & Demontage" },
  { value: "einlagerung", label: "Einlagerung" },
  { value: "klaviertransport", label: "Klaviertransport" },
  { value: "entsorgung", label: "Entsorgung" },
];

export default function UmzugForm() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UmzugFormData>({
    resolver: zodResolver(umzugSchema),
    defaultValues: {
      zusatzleistungen: [],
      liftVon: false,
      liftNach: false,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(data: UmzugFormData) {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    console.log("[UmzugForm] submitted:", data);
    setIsLoading(false);
    setSuccess(true);
    reset();
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
          Wir haben Ihre Umzugsanfrage erhalten und melden uns innert 24 Stunden
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
      aria-label="Umzugsanfrage Formular"
      className="space-y-10"
    >
      {/* ── Umzugsart ─────────────────────────────────────────────────── */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-brand-primary">
          Art des Umzugs{" "}
          <span className="text-brand-error" aria-hidden="true">*</span>
        </legend>
        <Controller
          control={control}
          name="umzugsart"
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              aria-required="true"
              aria-describedby={errors.umzugsart ? "umzugsart-error" : undefined}
              className="flex flex-col sm:flex-row gap-3"
            >
              {[
                { value: "privatumzug", label: "Privatumzug" },
                { value: "firmenumzug", label: "Firmenumzug" },
                { value: "auslandsumzug", label: "Auslandsumzug" },
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
        {errors.umzugsart && (
          <p id="umzugsart-error" role="alert" className="text-brand-error text-sm">
            {errors.umzugsart.message}
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
            <Label htmlFor="etageVon" className="font-medium text-sm">
              Etage <span className="text-brand-error" aria-hidden="true">*</span>
            </Label>
            <Controller
              control={control}
              name="etageVon"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="etageVon" aria-invalid={!!errors.etageVon}>
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
            {errors.etageVon && (
              <p role="alert" className="text-brand-error text-sm">
                {errors.etageVon.message}
              </p>
            )}
          </div>
          <Label className="flex items-center gap-2.5 cursor-pointer">
            <Controller
              control={control}
              name="liftVon"
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="liftVon"
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
            <Label htmlFor="etageNach" className="font-medium text-sm">
              Etage <span className="text-brand-error" aria-hidden="true">*</span>
            </Label>
            <Controller
              control={control}
              name="etageNach"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="etageNach" aria-invalid={!!errors.etageNach}>
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
            {errors.etageNach && (
              <p role="alert" className="text-brand-error text-sm">
                {errors.etageNach.message}
              </p>
            )}
          </div>
          <Label className="flex items-center gap-2.5 cursor-pointer">
            <Controller
              control={control}
              name="liftNach"
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="liftNach"
                />
              )}
            />
            <span className="text-sm">Lift vorhanden</span>
          </Label>
        </fieldset>
      </div>

      {/* ── Umzugsdatum + Wohnungsgrösse ──────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <Label htmlFor="umzugsdatum" className="font-medium text-sm">
            Umzugsdatum{" "}
            <span className="text-brand-error" aria-hidden="true">*</span>
          </Label>
          <Input
            id="umzugsdatum"
            type="date"
            aria-required="true"
            aria-invalid={!!errors.umzugsdatum}
            aria-describedby={errors.umzugsdatum ? "umzugsdatum-error" : undefined}
            {...register("umzugsdatum")}
          />
          {errors.umzugsdatum && (
            <p id="umzugsdatum-error" role="alert" className="text-brand-error text-sm">
              {errors.umzugsdatum.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="wohnungsgroesse" className="font-medium text-sm">
            Wohnungsgrösse{" "}
            <span className="text-brand-error" aria-hidden="true">*</span>
          </Label>
          <Controller
            control={control}
            name="wohnungsgroesse"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="wohnungsgroesse"
                  aria-invalid={!!errors.wohnungsgroesse}
                  aria-describedby={errors.wohnungsgroesse ? "wohnungsgroesse-error" : undefined}
                >
                  <SelectValue placeholder="Grösse auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {WOHNUNGSGROESSEN.map((w) => (
                    <SelectItem key={w.value} value={w.value}>
                      {w.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.wohnungsgroesse && (
            <p id="wohnungsgroesse-error" role="alert" className="text-brand-error text-sm">
              {errors.wohnungsgroesse.message}
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
