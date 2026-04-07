"use client";

import { useState } from "react";
import type { FaqEntry } from "@/lib/gemeinden";

interface Props {
  faq: FaqEntry[];
  gemeinde: string;
}

export default function LocationFaq({ faq, gemeinde }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  if (!faq.length) return null;

  return (
    <section
      className="py-16 md:py-20 bg-white"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent font-semibold text-sm rounded-full px-4 py-1.5">
            ❓ FAQ
          </span>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight"
          >
            Häufige Fragen zu unserem Service in {gemeinde}
          </h2>
        </div>

        <dl className="space-y-3">
          {faq.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <dt>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-brand-primary hover:bg-gray-50 transition-colors"
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span>{item.frage}</span>
                  <svg
                    className={`flex-shrink-0 w-5 h-5 text-brand-accent transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </dt>
              <dd
                id={`faq-answer-${i}`}
                className={`px-6 text-gray-600 text-sm leading-relaxed transition-all duration-200 ${open === i ? "pb-5 pt-0" : "max-h-0 overflow-hidden py-0"}`}
              >
                {item.antwort}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
