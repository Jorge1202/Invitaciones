import { getGlobalStats } from "@/actions/command-actions";

export default async function CommandDashboard() {
  const stats = await getGlobalStats();

  const mrr = `$${stats.mrr.toLocaleString("es-MX")} MXN`;

  const cards = [
    {
      label: "Tenants Activos",
      value: stats.activeTenants.toString(),
      sub: `${stats.totalTenants} total`,
      color: "text-command-accent",
    },
    {
      label: "Eventos del Mes",
      value: stats.eventsThisMonth.toString(),
      sub: "en el mes actual",
      color: "text-blue-400",
    },
    {
      label: "MRR Estimado",
      value: mrr,
      sub: "basado en planes activos",
      color: "text-green-400",
    },
    {
      label: "Invitados Confirmados",
      value: stats.confirmedGuests.toLocaleString("es-MX"),
      sub: `de ${stats.totalGuests.toLocaleString("es-MX")} totales`,
      color: "text-command-text",
    },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-fraunces font-bold">Resumen Global</h1>
        <p className="text-command-text-dim">
          Estado actual de la infraestructura multi-tenant.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-command-surface border border-command-border p-6 rounded-xl"
          >
            <p className="text-sm text-command-text-dim mb-1">{card.label}</p>
            <div className="flex items-end justify-between">
              <span className={`text-2xl font-bold font-mono ${card.color}`}>
                {card.value}
              </span>
              <span className="text-[10px] font-bold text-command-text-dim bg-command-bg px-1.5 py-0.5 rounded border border-command-border">
                {card.sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-command-surface border border-command-border rounded-xl h-96 flex items-center justify-center text-command-text-dim">
          Gráfica de Crecimiento (Próximamente)
        </div>
        <div className="bg-command-surface border border-command-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold">Actividad Reciente</h3>
          <p className="text-sm text-command-text-dim italic">
            Próximamente — feed de eventos del sistema.
          </p>
        </div>
      </div>
    </div>
  );
}
