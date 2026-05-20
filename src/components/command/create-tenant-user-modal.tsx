"use client";

import { useState } from "react";
import { createTenantUser } from "@/actions/tenant-actions";
import { Plus, X, ShieldCheck } from "lucide-react";

export function CreateTenantUserModal({ tenantId }: { tenantId: string }) {
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
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = await createTenantUser(tenantId, data);

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
        className="flex items-center gap-2 bg-command-accent/10 hover:bg-command-accent text-command-accent hover:text-white px-4 py-2 rounded-lg transition-all font-medium text-sm border border-command-accent/20"
      >
        <Plus size={18} />
        Agregar Administrador
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-command-surface border border-command-border w-full max-w-md rounded-xl shadow-2xl">
        <header className="p-6 border-b border-command-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-command-accent">
            <ShieldCheck size={20} />
            <h2 className="text-xl font-fraunces font-bold text-command-text">Nuevo Administrador</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-command-text-dim hover:text-command-text">
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-command-text-dim">Nombre Completo</label>
            <input
              name="name"
              required
              className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent"
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-command-text-dim">Correo Electrónico</label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent"
              placeholder="juan@ejemplo.com"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-command-text-dim">Contraseña Temporal</label>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent"
              placeholder="••••••••"
            />
            <p className="text-[10px] text-command-text-dim italic">Mínimo 8 caracteres.</p>
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
              {loading ? "Creando Usuario..." : "Crear Administrador"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
