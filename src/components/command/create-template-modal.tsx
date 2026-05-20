"use client";

import { useState } from "react";
import { createTemplate } from "@/actions/template-actions";
import { Plus, X, LayoutTemplate, Palette, Code2 } from "lucide-react";

export function CreateTemplateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      mood: formData.get("mood") as string,
      // Default initial config for a template
      config: {
        colors: { primary: "#B8745A", secondary: "#FBF9F6" },
        fonts: { title: "Fraunces", body: "Inter" },
        sections: ["hero", "itinerary", "rsvp"],
        version: "1.0.0"
      },
    };

    const result = await createTemplate(data);

    if (result.success) {
      setIsOpen(false);
    } else {
      setError(result.error || "Ocurrió un error");
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

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-command-surface border border-command-border w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
        <header className="p-6 border-b border-command-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-command-accent">
            <LayoutTemplate size={20} />
            <h2 className="text-xl font-fraunces font-bold text-command-text">Nueva Plantilla Maestra</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-command-text-dim hover:text-command-text">
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-command-text-dim">Nombre del Diseño</label>
            <input
              name="name"
              required
              className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent"
              placeholder="Ej: Minimalist Wedding"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-command-text-dim">Descripción / Concepto</label>
            <textarea
              name="description"
              className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent h-24 resize-none"
              placeholder="Describe el estilo visual y emocional..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-command-text-dim">Categoría</label>
              <select
                name="category"
                className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent"
              >
                <option value="bodas">💍 Bodas</option>
                <option value="xv">👑 XV Años</option>
                <option value="infantil">🧸 Infantil</option>
                <option value="corporativo">💼 Corporativo</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-command-text-dim">Mood</label>
              <select
                name="mood"
                className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent"
              >
                <option value="minimal">Minimalista</option>
                <option value="classic">Clásico</option>
                <option value="modern">Moderno</option>
                <option value="boho">Boho Chic</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-command-accent/5 rounded-lg border border-command-accent/10 flex items-center gap-3">
             <div className="text-command-accent">
                <Palette size={24} />
             </div>
             <div>
                <p className="text-xs font-bold text-command-text uppercase">Configuración Base</p>
                <p className="text-[10px] text-command-text-dim">Se inicializará con el esquema JSON estándar v1.0.</p>
             </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          <div className="pt-4">
            <button
              disabled={loading}
              className="w-full bg-command-accent hover:bg-command-accent-hi text-white font-semibold py-2.5 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Creando..." : (
                <>
                  <Code2 size={18} />
                  Generar Plantilla
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
