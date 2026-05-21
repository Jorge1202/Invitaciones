import { getEventById } from "@/actions/event-actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  LayoutTemplate,
  Users2,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { RSVPStatus } from "@prisma/client";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) notFound();

  const total = event.guests.length;
  const confirmed = event.guests.filter((g) => g.status === RSVPStatus.confirmed).length;
  const declined = event.guests.filter((g) => g.status === RSVPStatus.declined).length;
  const pending = event.guests.filter((g) => g.status === RSVPStatus.pending).length;
  const responseRate = total > 0 ? `${((confirmed / total) * 100).toFixed(0)}%` : "—";

  const isPast = new Date(event.date) < new Date();

  return (
    <div className="max-w-4xl mx-auto space-y-10">

      {/* Header */}
      <header className="flex items-start gap-4">
        <Link
          href="/studio/events"
          className="mt-1 p-2 rounded-xl text-studio-text-dim hover:text-studio-text hover:bg-white transition-all shrink-0"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-4xl font-fraunces font-bold text-studio-text leading-tight">
              {event.name}
            </h1>
            {isPast && (
              <span className="text-[10px] font-bold uppercase tracking-widest bg-stone-100 text-stone-500 border border-stone-200 px-2.5 py-1 rounded-full">
                Evento pasado
              </span>
            )}
          </div>
          <p className="text-studio-text-dim italic mt-1">
            {format(new Date(event.date), "EEEE dd 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
        </div>

        <Link
          href={`/studio/events/${event.id}/guests`}
          className="shrink-0 flex items-center gap-2 bg-studio-text text-white px-5 py-3 rounded-2xl font-bold text-sm hover:bg-studio-accent transition-all duration-300 shadow-soft"
        >
          <Users2 size={16} />
          Gestionar Invitados
        </Link>
      </header>

      {/* RSVP Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total",
            value: total,
            icon: Users2,
            color: "bg-white border-studio-border text-studio-text",
            iconColor: "text-studio-text-dim",
          },
          {
            label: "Confirmados",
            value: confirmed,
            icon: CheckCircle2,
            color: "bg-emerald-50 border-emerald-200 text-emerald-700",
            iconColor: "text-emerald-500",
          },
          {
            label: "Declinaron",
            value: declined,
            icon: XCircle,
            color: "bg-red-50 border-red-200 text-red-700",
            iconColor: "text-red-400",
          },
          {
            label: "Pendientes",
            value: pending,
            icon: Clock,
            color: "bg-amber-50 border-amber-200 text-amber-700",
            iconColor: "text-amber-500",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`border rounded-[1.5rem] p-5 ${stat.color}`}
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={18} strokeWidth={1.5} className={stat.iconColor} />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                {stat.label}
              </span>
            </div>
            <p className="text-3xl font-bold font-mono">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event info */}
        <div className="lg:col-span-2 bg-white border border-studio-border rounded-[2rem] p-8 space-y-6">
          <h2 className="font-bold text-studio-text text-sm uppercase tracking-widest text-studio-text-dim">
            Información del Evento
          </h2>

          <dl className="space-y-5">
            <div className="flex items-start gap-4">
              <CalendarDays size={18} strokeWidth={1.5} className="text-studio-accent mt-0.5 shrink-0" />
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-studio-text-dim">Fecha</dt>
                <dd className="text-studio-text font-semibold mt-0.5">
                  {format(new Date(event.date), "dd 'de' MMMM 'de' yyyy", { locale: es })}
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin size={18} strokeWidth={1.5} className="text-studio-accent mt-0.5 shrink-0" />
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-studio-text-dim">Lugar</dt>
                <dd className={`font-semibold mt-0.5 ${event.location ? "text-studio-text" : "text-studio-text-dim italic"}`}>
                  {event.location ?? "Sin ubicación registrada"}
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <LayoutTemplate size={18} strokeWidth={1.5} className="text-studio-accent mt-0.5 shrink-0" />
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-studio-text-dim">Plantilla</dt>
                <dd className="text-studio-text font-semibold mt-0.5">
                  {event.template.name}
                  <span className="ml-2 text-[10px] font-bold text-studio-text-dim bg-studio-bg border border-studio-border px-2 py-0.5 rounded-lg">
                    v{event.templateVersion}
                  </span>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <ExternalLink size={18} strokeWidth={1.5} className="text-studio-accent mt-0.5 shrink-0" />
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-studio-text-dim">Slug público</dt>
                <dd className="text-studio-text-dim font-mono text-sm mt-0.5">
                  /e/{event.slug}/[token]
                </dd>
              </div>
            </div>
          </dl>
        </div>

        {/* Quick stats panel */}
        <div className="space-y-4">
          <div className="bg-studio-accent rounded-[2rem] p-6 text-white space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
              Tasa de Respuesta
            </p>
            <p className="text-5xl font-bold font-mono">{responseRate}</p>
            <p className="text-sm text-white/70 italic">
              {confirmed} confirmados de {total} invitados
            </p>
          </div>

          <Link
            href={`/studio/events/${event.id}/guests`}
            className="block bg-white border border-studio-border rounded-[2rem] p-6 hover:border-studio-accent/40 hover:shadow-soft transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-studio-text group-hover:text-studio-accent transition-colors">
                  Gestión de Invitados
                </p>
                <p className="text-sm text-studio-text-dim italic mt-1">
                  Añadir, importar CSV y ver links
                </p>
              </div>
              <Users2 size={24} strokeWidth={1.5} className="text-studio-accent" />
            </div>
          </Link>

          <div className="bg-studio-bg border border-dashed border-studio-border rounded-[2rem] p-6">
            <p className="font-bold text-studio-text-dim text-sm italic text-center">
              Panel del Organizador
            </p>
            <p className="text-xs text-studio-text-dim text-center mt-1">
              Disponible próximamente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
