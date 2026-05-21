"use client";

import { useState, useTransition } from "react";
import { createEvent } from "@/actions/event-actions";
import { ArrowLeft, CalendarDays, MapPin, LayoutTemplate, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  name: string;
  componentId: string;
  tier: string;
  category: string | null;
  description: string | null;
}

interface Props {
  templates: Template[];
}

const TIER_COLORS: Record<string, string> = {
  basic: "bg-zinc-100 text-zinc-600 border-zinc-200",
  pro:   "bg-purple-50 text-purple-600 border-purple-200",
  vip:   "bg-amber-50 text-amber-600 border-amber-200",
};

const TIER_LABELS: Record<string, string> = {
  basic: "Básica",
  pro:   "Pro",
  vip:   "VIP",
};

export default function CreateEventForm({ templates }: Props) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    templates[0]?.id ?? ""
  );
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const today = new Date().toISOString().split("T")[0];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!selectedTemplateId) {
      setError("Debes seleccionar una plantilla.");
      return;
    }

    startTransition(async () => {
      const result = await createEvent({
        name,
        date,
        location: location || undefined,
        templateId: selectedTemplateId,
      });
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/studio/events"
          className="p-2 rounded-xl text-studio-text-dim hover:text-studio-text hover:bg-white transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-fraunces font-bold text-studio-text">Nuevo Evento</h1>
          <p className="text-studio-text-dim italic">Completa los datos para crear tu invitación.</p>
        </div>
      </div>

      {/* Template selector */}
      <section className="space-y-4">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-studio-text-dim">
          <LayoutTemplate size={14} />
          Plantilla
        </label>

        {templates.length === 0 ? (
          <div className="py-12 border-2 border-dashed border-studio-border rounded-[2rem] flex flex-col items-center text-center space-y-3">
            <Sparkles size={28} className="text-studio-text-dim" strokeWidth={1.5} />
            <p className="text-studio-text-dim italic text-sm">
              No hay plantillas disponibles para tu plan actual.
            </p>
            <p className="text-xs text-studio-text-dim">
              Contacta a soporte para actualizar tu membresía.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {templates.map((t) => {
              const isSelected = t.id === selectedTemplateId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTemplateId(t.id)}
                  className={cn(
                    "relative text-left p-5 rounded-[1.5rem] border-2 transition-all duration-200",
                    isSelected
                      ? "border-studio-accent bg-studio-accent-soft shadow-md"
                      : "border-studio-border bg-white hover:border-studio-accent/40 hover:shadow-soft"
                  )}
                >
                  {isSelected && (
                    <CheckCircle2
                      size={20}
                      className="absolute top-4 right-4 text-studio-accent"
                    />
                  )}
                  <span
                    className={cn(
                      "inline-block px-2 py-0.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider mb-3",
                      TIER_COLORS[t.tier] ?? TIER_COLORS.basic
                    )}
                  >
                    {TIER_LABELS[t.tier] ?? t.tier}
                  </span>
                  <p className={cn(
                    "font-bold text-base leading-snug",
                    isSelected ? "text-studio-accent" : "text-studio-text"
                  )}>
                    {t.name}
                  </p>
                  {t.category && (
                    <p className="text-xs text-studio-text-dim mt-1 italic">{t.category}</p>
                  )}
                  {t.description && (
                    <p className="text-xs text-studio-text-dim mt-2 line-clamp-2">{t.description}</p>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Fields */}
      <section className="bg-white border border-studio-border rounded-[2rem] p-8 space-y-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-studio-text-dim">
            Nombre del evento <span className="text-studio-accent">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Boda de Ana y Carlos"
            className="w-full bg-studio-bg border border-studio-border rounded-xl px-4 py-3 text-studio-text placeholder:text-studio-text-dim/50 focus:ring-2 focus:ring-studio-accent focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-studio-text-dim">
              <CalendarDays size={13} />
              Fecha <span className="text-studio-accent">*</span>
            </label>
            <input
              type="date"
              required
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-studio-bg border border-studio-border rounded-xl px-4 py-3 text-studio-text focus:ring-2 focus:ring-studio-accent focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-studio-text-dim">
              <MapPin size={13} />
              Lugar (opcional)
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ej. Salón Real, Ciudad de México"
              className="w-full bg-studio-bg border border-studio-border rounded-xl px-4 py-3 text-studio-text placeholder:text-studio-text-dim/50 focus:ring-2 focus:ring-studio-accent focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-4">
        <Link
          href="/studio/events"
          className="px-6 py-3 rounded-2xl border border-studio-border text-studio-text-dim font-semibold hover:bg-white transition-all"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={isPending || templates.length === 0}
          className="px-8 py-3 bg-studio-text text-white rounded-2xl font-bold hover:bg-studio-accent transition-all duration-300 shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Creando evento..." : "Crear Evento"}
        </button>
      </div>
    </form>
  );
}
