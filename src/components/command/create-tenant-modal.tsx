"use client";

import { useState } from "react";
import { createTenant } from "@/actions/tenant-actions";
import { Plan } from "@prisma/client";
import { Plus, X } from "lucide-react";

export function CreateTenantModal() {
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
      slug: formData.get("slug") as string,
      plan: formData.get("plan") as Plan,
    };

    const result = await createTenant(data);

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
        Nuevo Tenant
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-command-surface border border-command-border w-full max-w-md rounded-xl shadow-2xl">
        <header className="p-6 border-b border-command-border flex items-center justify-between">
          <h2 className="text-xl font-fraunces font-bold">Crear Nuevo Tenant</h2>
          <button onClick={() => setIsOpen(false)} className="text-command-text-dim hover:text-command-text">
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-command-text-dim">Nombre del Negocio</label>
            <input
              name="name"
              required
              className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent"
              placeholder="Ej: Wedding Dreams"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-command-text-dim">Slug (URL)</label>
            <input
              name="slug"
              required
              className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent"
              placeholder="ej-wedding-dreams"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-command-text-dim">Plan Inicial</label>
            <select
              name="plan"
              className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent"
            >
              <option value="basic">🌱 Básico ($400)</option>
              <option value="deluxe">⭐ Deluxe ($600)</option>
              <option value="vip">👑 VIP ($800)</option>
            </select>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          <div className="pt-4">
            <button
              disabled={loading}
              className="w-full bg-command-accent hover:bg-command-accent-hi text-white font-semibold py-2.5 rounded-lg transition-all disabled:opacity-50"
            >
              {loading ? "Creando..." : "Registrar Tenant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
