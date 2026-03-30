import Image from "next/image";
import type { SubService } from "@/lib/services";

export default function SubServiceCard({ title, emoji, description, image, features }: SubService) {
  return (
    <article className="flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      {/* Image */}
      <div className="relative w-full aspect-[3/2] flex-shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-brand-primary/10 text-2xl flex-shrink-0"
            aria-hidden="true"
          >
            {emoji}
          </span>
          <h3 className="text-lg font-bold text-brand-primary leading-tight">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-brand-text-muted text-sm leading-relaxed mb-4">{description}</p>

        {/* Features */}
        <ul className="flex flex-col gap-2 flex-1" aria-label={`Leistungsmerkmale: ${title}`}>
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-brand-success mt-0.5 flex-shrink-0 font-bold" aria-hidden="true">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
