import { getTenants } from "@/actions/tenant-actions";
import { CreateTenantModal } from "@/components/command/create-tenant-modal";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default async function TenantsPage() {
  const tenants = await getTenants();

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-fraunces font-bold">Gestión de Tenants</h1>
          <p className="text-command-text-dim">Administra los revendedores y sus planes.</p>
        </div>
        <CreateTenantModal />
      </header>

      <div className="bg-command-surface border border-command-border rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-command-border bg-command-bg/50">
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-command-text-dim">Tenant / Slug</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-command-text-dim">Plan</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-command-text-dim">Estado</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-command-text-dim text-center">Usuarios / Eventos</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-command-text-dim">Registro</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-command-text-dim">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-command-border">
            {tenants.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-command-surface-hi transition-colors group">
                <td className="p-4">
                  <p className="font-semibold">{tenant.name}</p>
                  <p className="text-xs text-command-text-dim">{tenant.slug}.invitaweb.com</p>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    tenant.plan === 'vip' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                    tenant.plan === 'deluxe' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                    'bg-green-500/10 text-green-400 border border-green-500/20'
                  }`}>
                    {tenant.plan}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${tenant.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-sm">{tenant.isActive ? 'Activo' : 'Suspendido'}</span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-4 text-sm font-mono">
                    <div title="Usuarios">👤 {tenant._count.users}</div>
                    <div title="Eventos">🎉 {tenant._count.events}</div>
                  </div>
                </td>
                <td className="p-4 text-sm text-command-text-dim">
                  {format(new Date(tenant.createdAt), "dd MMM yyyy", { locale: es })}
                </td>
                <td className="p-4">
                  <button className="text-xs bg-command-bg border border-command-border px-3 py-1 rounded hover:border-command-accent transition-colors">
                    Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {tenants.length === 0 && (
          <div className="p-12 text-center text-command-text-dim">
            No hay tenants registrados todavía.
          </div>
        )}
      </div>
    </div>
  );
}
