"use client";

import { type UseFormReturn, type FieldValues, type Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BaseContactFieldsProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  showNachricht?: boolean;
}

/**
 * Reusable contact fields: Name, E-Mail, Telefon, Nachricht (optional).
 * Generic over form schema so it works with all service-specific forms.
 */
export function BaseContactFields<T extends FieldValues>({
  form,
  showNachricht = true,
}: BaseContactFieldsProps<T>) {
  const {
    register,
    formState: { errors },
  } = form;

  // Cast helpers — the parent schema always has these keys
  const nameError = (errors as Record<string, { message?: string }>)["name"];
  const emailError = (errors as Record<string, { message?: string }>)["email"];
  const telefonError = (errors as Record<string, { message?: string }>)["telefon"];
  const nachrichtError = (errors as Record<string, { message?: string }>)["nachricht"];

  return (
    <fieldset className="space-y-5">
      <legend className="text-lg font-semibold text-brand-primary mb-4">
        Ihre Kontaktangaben
      </legend>

      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="name" className="font-medium text-sm">
          Name <span className="text-brand-error" aria-hidden="true">*</span>
          <span className="sr-only">(Pflichtfeld)</span>
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Vor- und Nachname"
          autoComplete="name"
          aria-required="true"
          aria-describedby={nameError ? "name-error" : undefined}
          aria-invalid={!!nameError}
          {...register("name" as Path<T>)}
        />
        {nameError?.message && (
          <p id="name-error" role="alert" className="text-brand-error text-sm mt-1">
            {nameError.message}
          </p>
        )}
      </div>

      {/* E-Mail + Telefon side-by-side on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="font-medium text-sm">
            E-Mail <span className="text-brand-error" aria-hidden="true">*</span>
            <span className="sr-only">(Pflichtfeld)</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="ihre@email.ch"
            autoComplete="email"
            aria-required="true"
            aria-describedby={emailError ? "email-error" : undefined}
            aria-invalid={!!emailError}
            {...register("email" as Path<T>)}
          />
          {emailError?.message && (
            <p id="email-error" role="alert" className="text-brand-error text-sm mt-1">
              {emailError.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="telefon" className="font-medium text-sm">
            Telefon <span className="text-brand-error" aria-hidden="true">*</span>
            <span className="sr-only">(Pflichtfeld)</span>
          </Label>
          <Input
            id="telefon"
            type="tel"
            placeholder="+41 79 000 00 00"
            autoComplete="tel"
            aria-required="true"
            aria-describedby={telefonError ? "telefon-error" : undefined}
            aria-invalid={!!telefonError}
            {...register("telefon" as Path<T>)}
          />
          {telefonError?.message && (
            <p id="telefon-error" role="alert" className="text-brand-error text-sm mt-1">
              {telefonError.message}
            </p>
          )}
        </div>
      </div>

      {/* Nachricht (optional unless overridden by parent schema) */}
      {showNachricht && (
        <div className="space-y-1.5">
          <Label htmlFor="nachricht" className="font-medium text-sm">
            Nachricht
          </Label>
          <Textarea
            id="nachricht"
            placeholder="Weitere Informationen, Besonderheiten, Fragen ..."
            rows={4}
            aria-describedby={nachrichtError ? "nachricht-error" : undefined}
            aria-invalid={!!nachrichtError}
            {...register("nachricht" as Path<T>)}
          />
          {nachrichtError?.message && (
            <p id="nachricht-error" role="alert" className="text-brand-error text-sm mt-1">
              {nachrichtError.message}
            </p>
          )}
        </div>
      )}
    </fieldset>
  );
}
