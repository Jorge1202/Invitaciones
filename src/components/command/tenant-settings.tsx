"use client";

import { useState } from "react";
import { updateTenant, toggleTenantStatus, deleteTenant } from "@/actions/tenant-actions";
import { Plan } from "@prisma/client";
import { Settings, X, Save, Power, Trash2, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

interface TenantSettingsProps {
  tenant: {
    id: string;
    name: string;
    plan: Plan;
    isActive: boolean;
    slug: string;
  };
}

export function TenantSettings({ tenant }: TenantSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      plan: formData.get("plan") as Plan,
    };

    const result = await updateTenant(tenant.id, data);
    if (result.success) {
      setIsOpen(false);
    } else {
      setError("Error al actualizar");
    }
    setLoading(false);
  }

  async function handleToggleStatus() {
    setLoading(true);
    await toggleTenantStatus(tenant.id, tenant.isActive);
    setLoading(false);
  }

  async function handleDelete() {
    setLoading(true);
    const result = await deleteTenant(tenant.id);
    if (result.success) {
      router.push("/command/tenants");
    } else {
      setError(result.error || "Error al eliminar");
      setShowDeleteConfirm(false);
    }
    setLoading(false);
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-command-surface-hi border border-command-border text-command-text px-4 py-2 rounded-lg hover:bg-command-surface transition-all text-sm"
      >
        <Settings size={18} />
        Configuración
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-command-surface border border-command-border w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
        <header className="p-6 border-b border-command-border flex items-center justify-between">
          <h2 className="text-xl font-fraunces font-bold">Configuración del Tenant</h2>
          <button onClick={() => setIsOpen(false)} className="text-command-text-dim hover:text-command-text">
            <X size={20} />
          </button>
        </header>

        <div className="p-6 space-y-8">
          {/* Update Form */}
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-command-text-dim">Nombre del Negocio</label>
              <input
                name="name"
                defaultValue={tenant.name}
                required
                className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-command-text-dim">Plan</label>
              <select
                name="plan"
                defaultValue={tenant.plan}
                className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2 text-command-text outline-none focus:ring-2 focus:ring-command-accent"
              >
                <option value="basic">Básico</option>
                <option value="deluxe">Deluxe</option>
                <option value="vip">VIP</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full bg-command-accent hover:bg-command-accent-hi text-white py-2 rounded-lg transition-all disabled:opacity-50"
            >
              <Save size={18} />
              Guardar Cambios
            </button>
          </form>

          <div className="border-t border-command-border pt-6 space-y-4">
            <h3 className="text-sm font-bold uppercase text-command-text-dim">Acciones de Control</h3>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Toggle Status */}
              <button
                onClick={handleToggleStatus}
                disabled={loading}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  tenant.isActive 
                  ? 'border-yellow-500/20 text-yellow-500 hover:bg-yellow-500/10' 
                  : 'border-green-500/20 text-green-500 hover:bg-green-500/10'
                }`}
              >
                <Power size={18} />
                {tenant.isActive ? 'Suspender Cuenta' : 'Activar Cuenta'}
              </button>

              {/* Delete Trigger */}
              <button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 border border-red-500/20 text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-all"
              >
                <Trash2 size={18} />
                Eliminar Tenant
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </div>

        {/* Delete Confirmation Overlay */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 bg-command-bg/95 flex items-center justify-center p-6 z-10 animate-in fade-in zoom-in duration-200">
            <div className="text-center space-y-4 max-w-sm">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold">¿Eliminar definitivamente?</h3>
              <p className="text-sm text-command-text-dim">
                Esta acción borrará a <strong>{tenant.name}</strong>, todos sus usuarios y eventos. No se puede deshacer.
              </p>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-command-surface-hi py-2 rounded-lg hover:bg-command-surface"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg disabled:opacity-50"
                >
                  {loading ? "Eliminando..." : "Sí, Eliminar Todo"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
