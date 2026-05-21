"use client";

import { useState } from "react";
import { createTemplate } from "@/actions/template-actions";
import { Plus, X, LayoutTemplate, Code2, Check } from "lucide-react";
import { TIER_LIST, type TemplateTierKey } from "@/lib/tier-features";
import { REGISTERED_TEMPLATE_COMPONENTS } from "@/templates/registry";
import { cn } from "@/lib/utils";

const TIER_COLORS: Record<TemplateTierKey, { border: string; bg: string; text: string; badge: string }> = {
  basic: {
    border: "border-command-border",
    bg:     "bg-command-bg",
    text:   "text-command-text-dim",
    badge:  "bg-command-surface-hi text-command-text-dim",
  },
  pro: {
    border: "border-purple-500/60",
    bg:     "bg-purple-500/10",
    text:   "text-purple-300",
    badge:  "bg-purple-500/20 text-purple-300",
  },
  vip: {
    border: "border-amber-500/60",
    bg:     "bg-amber-500/10",
    text:   "text-amber-300",
    badge:  "bg-amber-500/20 text-amber-300",
  },
};

export function CreateTemplateModal() {
  const [isOpen,  setIsOpen]  = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [tier,    setTier]    = useState<TemplateTierKey>("vip");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const result = await createTemplate({
      name:        fd.get("name")        as string,
      description: fd.get("description") as string,
      category:    fd.get("category")    as string,
      mood:        fd.get("mood")        as string,
      componentId: fd.get("componentId") as string,
      tier,
    });
    if (result.success) {
      setIsOpen(false);
      setTier("vip");
    } else {
      setError(result.error || "Ocurrio un error");
    }
    setLoading(false);
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-command-accent hover:bg-command-accent-hi text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
      >
        <Plus size={18} />
        Nueva Plantilla
      </button>
    );
  }

  const activeTier = TIER_LIST.find(t => t.key === tier);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-command-surface border border-command-border w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

        <header className="px-6 py-5 border-b border-command-border flex items-center justify-between sticky top-0 bg-command-surface z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-command-accent/20 flex items-center justify-center">
              <LayoutTemplate size={16} className="text-command-accent" />
            </div>
            <h2 className="text-lg font-bold text-command-text">Nueva Plantilla Maestra</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1.5 text-command-text-dim hover:text-command-text hover:bg-command-bg rounded-lg transition-all">
            <X size={18} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* ── Tier selector ── */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-command-text-dim uppercase tracking-widest">Tier</label>
            <div className="grid grid-cols-3 gap-2">
              {TIER_LIST.map(t => {
                const c = TIER_COLORS[t.key];
                const active = tier === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTier(t.key)}
                    className={cn(
                      "relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center",
                      active ? c.border + " " + c.bg : "border-command-border bg-command-bg hover:border-command-border/80",
                    )}
                  >
                    {active && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-command-accent flex items-center justify-center">
                        <Check size={9} className="text-white" />
                      </span>
                    )}
                    <span className="text-xl">{t.emoji}</span>
                    <div>
                      <p className={cn("text-sm font-bold", active ? c.text : "text-command-text-dim")}>{t.label}</p>
                      <p className="text-[10px] text-command-text-dim mt-0.5">{t.tagline}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feature summary */}
            <div className={cn("rounded-xl p-3 border text-xs space-y-1.5 transition-all", TIER_COLORS[tier].bg, TIER_COLORS[tier].border)}>
              <p className={cn("font-bold", TIER_COLORS[tier].text)}>
                Secciones en {activeTier?.label}:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {activeTier?.sections.map(sec => (
                  <span key={sec} className={cn("px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide", TIER_COLORS[tier].badge)}>
                    {sec}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                {Object.entries(activeTier?.features ?? {})
                  .filter(([, v]) => v === true)
                  .map(([k]) => (
                    <span key={k} className="flex items-center gap-1 text-[10px] text-command-text-dim">
                      <Check size={9} className="text-emerald-400" />
                      {k.replace("has", "")}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-command-border" />

          {/* ── Nombre + Componente ── */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-command-text-dim uppercase tracking-widest">Nombre del diseno</label>
              <input
                name="name"
                required
                className="w-full bg-command-bg border border-command-border rounded-lg px-3 py-2 text-sm text-command-text outline-none focus:ring-1 focus:ring-command-accent focus:border-command-accent transition-all"
                placeholder="Ej: Boda Diamante"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-command-text-dim uppercase tracking-widest">Componente visual</label>
              <select
                name="componentId"
                required
                className="w-full bg-command-bg border border-command-border rounded-lg px-3 py-2 text-sm text-command-text outline-none focus:ring-1 focus:ring-command-accent focus:border-command-accent transition-all"
              >
                <option value="">-- Selecciona --</option>
                {REGISTERED_TEMPLATE_COMPONENTS.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
              <p className="text-[10px] text-command-text-dim">Componente React que renderiza la plantilla.</p>
            </div>
          </div>

          {/* ── Descripcion ── */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-command-text-dim uppercase tracking-widest">Descripcion</label>
            <textarea
              name="description"
              className="w-full bg-command-bg border border-command-border rounded-lg px-3 py-2 text-sm text-command-text outline-none focus:ring-1 focus:ring-command-accent focus:border-command-accent transition-all h-16 resize-none"
              placeholder="Describe el estilo visual y emocional..."
            />
          </div>

          {/* ── Categoria + Mood ── */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-command-text-dim uppercase tracking-widest">Categoria</label>
              <select name="category" className="w-full bg-command-bg border border-command-border rounded-lg px-3 py-2 text-sm text-command-text outline-none focus:ring-1 focus:ring-command-accent transition-all">
                <option value="bodas">Bodas</option>
                <option value="xv">XV Anos</option>
                <option value="infantil">Infantil</option>
                <option value="corporativo">Corporativo</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-command-text-dim uppercase tracking-widest">Mood</label>
              <select name="mood" className="w-full bg-command-bg border border-command-border rounded-lg px-3 py-2 text-sm text-command-text outline-none focus:ring-1 focus:ring-command-accent transition-all">
                <option value="minimal">Minimalista</option>
                <option value="classic">Clasico</option>
                <option value="modern">Moderno</option>
                <option value="boho">Boho Chic</option>
                <option value="cinematic">Cinematico</option>
              </select>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-command-accent hover:bg-command-accent-hi text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-command-accent/20"
          >
            {loading ? "Registrando..." : (
              <>
                <Code2 size={16} />
                Registrar plantilla {activeTier?.label}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
