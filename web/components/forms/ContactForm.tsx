"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      telefon: "",
      nachricht: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "kontakt", ...data }),
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
          Vielen Dank für Ihre Nachricht!
        </h2>
        <p className="text-brand-text-muted max-w-md">
          Wir haben Ihre Anfrage erhalten und melden uns innert 24 Stunden bei
          Ihnen.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-2 text-brand-accent underline underline-offset-4 text-sm font-medium hover:text-brand-accent-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm"
        >
          Neue Nachricht senden
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Kontaktformular"
      className="space-y-6"
    >
      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-name" className="font-medium text-sm">
          Name{" "}
          <span className="text-brand-error" aria-hidden="true">*</span>
          <span className="sr-only">(Pflichtfeld)</span>
        </Label>
        <Input
          id="contact-name"
          type="text"
          placeholder="Vor- und Nachname"
          autoComplete="name"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          {...register("name")}
        />
        {errors.name?.message && (
          <p id="contact-name-error" role="alert" className="text-brand-error text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* E-Mail + Telefon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="contact-email" className="font-medium text-sm">
            E-Mail{" "}
            <span className="text-brand-error" aria-hidden="true">*</span>
            <span className="sr-only">(Pflichtfeld)</span>
          </Label>
          <Input
            id="contact-email"
            type="email"
            placeholder="ihre@email.ch"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email")}
          />
          {errors.email?.message && (
            <p id="contact-email-error" role="alert" className="text-brand-error text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-telefon" className="font-medium text-sm">
            Telefon{" "}
            <span className="text-brand-text-muted text-xs font-normal">(optional)</span>
          </Label>
          <Input
            id="contact-telefon"
            type="tel"
            placeholder="+41 76 505 37 92"
            autoComplete="tel"
            aria-invalid={!!errors.telefon}
            aria-describedby={errors.telefon ? "contact-telefon-error" : undefined}
            {...register("telefon")}
          />
          {errors.telefon?.message && (
            <p id="contact-telefon-error" role="alert" className="text-brand-error text-sm mt-1">
              {errors.telefon.message}
            </p>
          )}
        </div>
      </div>

      {/* Nachricht */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-nachricht" className="font-medium text-sm">
          Nachricht{" "}
          <span className="text-brand-error" aria-hidden="true">*</span>
          <span className="sr-only">(Pflichtfeld)</span>
        </Label>
        <Textarea
          id="contact-nachricht"
          placeholder="Ihr Anliegen, z.B. Umzugsdatum, gewünschte Leistung, Fragen ..."
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.nachricht}
          aria-describedby={errors.nachricht ? "contact-nachricht-error" : undefined}
          {...register("nachricht")}
        />
        {errors.nachricht?.message && (
          <p id="contact-nachricht-error" role="alert" className="text-brand-error text-sm mt-1">
            {errors.nachricht.message}
          </p>
        )}
      </div>

      {/* Datenschutz */}
      <div className="space-y-1.5">
        <div className="flex items-start gap-2.5">
          <Controller
            control={control}
            name="datenschutz"
            render={({ field }) => (
              <Checkbox
                id="contact-datenschutz"
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
                aria-required="true"
                aria-invalid={!!errors.datenschutz}
                aria-describedby={errors.datenschutz ? "contact-datenschutz-error" : undefined}
                className="mt-0.5"
              />
            )}
          />
          <Label
            htmlFor="contact-datenschutz"
            className="text-sm text-brand-text-muted leading-relaxed cursor-pointer"
          >
            Ich akzeptiere die{" "}
            <a
              href="/datenschutz"
              className="text-brand-primary underline underline-offset-2 hover:text-brand-accent transition-colors"
            >
              Datenschutzerklärung
            </a>{" "}
            und bin damit einverstanden, dass meine Daten zur Bearbeitung dieser
            Anfrage verwendet werden.{" "}
            <span className="text-brand-error" aria-hidden="true">*</span>
          </Label>
        </div>
        {errors.datenschutz?.message && (
          <p id="contact-datenschutz-error" role="alert" className="text-brand-error text-sm">
            {errors.datenschutz.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-dark disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full px-8 py-3.5 font-semibold text-base transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          aria-busy={isLoading}
        >
          {isLoading ? "Wird gesendet…" : "Nachricht senden"}
        </button>
      </div>
    </form>
  );
}
