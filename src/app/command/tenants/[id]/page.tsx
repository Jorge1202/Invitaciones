import { getTenantById } from "@/actions/tenant-actions";
import { TenantSettings } from "@/components/command/tenant-settings";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, Building2, Users, Calendar, ShieldCheck, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function TenantDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tenant = await getTenantById(id);

  if (!tenant) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumbs / Back */}
      <nav>
        <Link 
          href="/command/tenants" 
          className="flex items-center gap-2 text-command-text-dim hover:text-command-accent transition-colors text-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Volver a Tenants
        </Link>
      </nav>

      {/* Header Info */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-fraunces font-bold">{tenant.name}</h1>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
              tenant.plan === 'vip' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
              tenant.plan === 'deluxe' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
              'bg-green-500/10 text-green-400 border border-green-500/20'
            }`}>
              {tenant.plan}
            </span>
            <div className={`w-2 h-2 rounded-full ${tenant.isActive ? 'bg-green-500' : 'bg-red-500'}`} title={tenant.isActive ? 'Activo' : 'Suspendido'} />
          </div>
          <p className="text-command-text-dim flex items-center gap-2">
            <ExternalLink size={14} />
            <span className="font-mono text-sm">{tenant.slug}.invitaweb.com</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <TenantSettings tenant={tenant} />
        </div>
      </header>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-command-surface border border-command-border p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-command-text-dim">Administradores</p>
            <p className="text-2xl font-bold font-mono">{tenant.users.length}</p>
          </div>
        </div>
        <div className="bg-command-surface border border-command-border p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm text-command-text-dim">Eventos Activos</p>
            <p className="text-2xl font-bold font-mono">{tenant._count.events}</p>
          </div>
        </div>
        <div className="bg-command-surface border border-command-border p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-sm text-command-text-dim">Fecha Registro</p>
            <p className="text-lg font-bold">
              {format(new Date(tenant.createdAt), "dd MMM yyyy", { locale: es })}
            </p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-fraunces font-bold flex items-center gap-2">
            <ShieldCheck size={20} className="text-command-accent" />
            Usuarios del Sistema
          </h2>
        </div>

        <div className="bg-command-surface border border-command-border rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-command-border bg-command-bg/50">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-command-text-dim">Nombre / Email</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-command-text-dim">Rol</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-command-text-dim">Fecha Creación</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-command-text-dim text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-command-border">
              {tenant.users.map((user) => (
                <tr key={user.id} className="hover:bg-command-surface-hi transition-colors group">
                  <td className="p-4">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-command-text-dim">{user.email}</p>
                  </td>
                  <td className="p-4 text-sm font-mono text-command-accent">
                    {user.role}
                  </td>
                  <td className="p-4 text-sm text-command-text-dim">
                    {format(new Date(user.createdAt), "dd MMM yyyy", { locale: es })}
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
                      Suspender
                    </button>
                  </td>
                </tr>
              ))}
              {tenant.users.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-command-text-dim">
                    Este tenant aún no tiene usuarios administradores.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
