export default function CommandDashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-fraunces font-bold">Resumen Global</h1>
        <p className="text-command-text-dim">Estado actual de la infraestructura multi-tenant.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Tenants Activos", value: "38", trend: "+2", color: "text-command-accent" },
          { label: "Eventos del Mes", value: "154", trend: "+12%", color: "text-blue-400" },
          { label: "RSVP Totales", value: "12,402", trend: "+1.2k", color: "text-green-400" },
          { label: "Alertas Sistema", value: "0", trend: "Normal", color: "text-command-text" },
        ].map((stat) => (
          <div key={stat.label} className="bg-command-surface border border-command-border p-6 rounded-xl">
            <p className="text-sm text-command-text-dim mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <span className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</span>
              <span className="text-[10px] font-bold text-command-text-dim bg-command-bg px-1.5 py-0.5 rounded border border-command-border">
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for more content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-command-surface border border-command-border rounded-xl h-96 flex items-center justify-center text-command-text-dim">
          Gráfica de Crecimiento (Próximamente)
        </div>
        <div className="bg-command-surface border border-command-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold">Actividad Reciente</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="text-sm border-l-2 border-command-accent pl-3 py-1">
                <p className="font-medium">Nuevo Tenant: Eventos Mágicos</p>
                <p className="text-xs text-command-text-dim">Hace 2 horas · Plan Deluxe</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
