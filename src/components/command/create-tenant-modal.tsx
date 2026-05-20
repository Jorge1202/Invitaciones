"use client";

import { useState } from "react";
import { createTenant } from "@/actions/tenant-actions";
import { Plan } from "@prisma/client";
import { Plus, X, Building2, UserCircle2, ShieldCheck } from "lucide-react";

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
      tenantName: formData.get("tenantName") as string,
      slug: formData.get("slug") as string,
      plan: formData.get("plan") as Plan,
      adminName: formData.get("adminName") as string,
      adminEmail: formData.get("adminEmail") as string,
      adminPassword: formData.get("adminPassword") as string,
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
        Nuevo Revendedor
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-command-surface border border-command-border w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden">
        <header className="p-6 border-b border-command-border flex items-center justify-between bg-command-bg/50">
          <div className="flex items-center gap-2 text-command-accent">
            <ShieldCheck size={24} />
            <h2 className="text-xl font-fraunces font-bold text-command-text">Alta de Nuevo Revendedor</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-command-text-dim hover:text-command-text">
            <X size={24} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sección 1: El Negocio */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-command-accent flex items-center gap-2">
                <Building2 size={16} />
                Datos del Negocio
              </h3>
              
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-command-text-dim uppercase">Nombre Comercial</label>
                <input
                  name="tenantName"
                  required
                  className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent"
                  placeholder="Ej: Wedding Dreams"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-command-text-dim uppercase">Slug (URL personalizada)</label>
                <input
                  name="slug"
                  required
                  className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent"
                  placeholder="ej-wedding-dreams"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-command-text-dim uppercase">Plan de Membresía</label>
                <select
                  name="plan"
                  className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent"
                >
                  <option value="basic">🌱 Básico ($400/mes)</option>
                  <option value="deluxe">⭐ Deluxe ($600/mes)</option>
                  <option value="vip">👑 VIP ($800/mes)</option>
                </select>
              </div>
            </div>

            {/* Sección 2: El Administrador */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-command-accent flex items-center gap-2">
                <UserCircle2 size={16} />
                Cuenta Administradora
              </h3>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-command-text-dim uppercase">Nombre del Dueño</label>
                <input
                  name="adminName"
                  required
                  className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent"
                  placeholder="Ej: María Pérez"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-command-text-dim uppercase">Email de Acceso</label>
                <input
                  name="adminEmail"
                  type="email"
                  required
                  className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent"
                  placeholder="maria@ejemplo.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-command-text-dim uppercase">Contraseña Temporal</label>
                <input
                  name="adminPassword"
                  type="password"
                  required
                  minLength={8}
                  className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center">
              {error}
            </p>
          )}

          <div className="pt-4 border-t border-command-border flex justify-end">
            <button
              disabled={loading}
              className="w-full md:w-auto bg-command-accent hover:bg-command-accent-hi text-white font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-command-accent/20"
            >
              {loading ? "Procesando Alta..." : "Crear y Activar Revendedor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
