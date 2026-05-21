import { getEvents } from "@/actions/event-actions";
import { CalendarDays, Users2, ArrowRight, Plus, Inbox } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <header className="flex items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-fraunces font-bold text-studio-text">Mis Eventos</h1>
          <p className="text-studio-text-dim mt-1 italic">
            {events.length === 0
              ? "Aún no tienes eventos. ¡Crea el primero!"
              : `${events.length} evento${events.length !== 1 ? "s" : ""} en tu cuenta`}
          </p>
        </div>
        <Link
          href="/studio/events/new"
          className="flex items-center gap-2 bg-studio-text text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-studio-accent transition-all duration-300 shadow-soft shrink-0"
        >
          <Plus size={18} />
          Nuevo Evento
        </Link>
      </header>

      {events.length === 0 ? (
        <div className="py-32 border-2 border-dashed border-studio-border rounded-[3rem] flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 bg-studio-accent-soft rounded-full flex items-center justify-center text-studio-accent">
            <Inbox size={36} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-2xl font-fraunces font-bold text-studio-text">Sin eventos todavía</h3>
            <p className="text-studio-text-dim max-w-xs mx-auto mt-2 italic leading-relaxed">
              Crea tu primer evento y comienza a gestionar invitados desde aquí.
            </p>
          </div>
          <Link
            href="/studio/events/new"
            className="inline-flex items-center gap-2 bg-studio-accent text-white px-8 py-4 rounded-2xl font-bold hover:bg-studio-accent-hi transition-all shadow-lg shadow-studio-accent/20"
          >
            <Plus size={20} />
            Crear mi primer evento
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => {
            const total = event._count.guests;
            const isPast = new Date(event.date) < new Date();

            return (
              <Link
                key={event.id}
                href={`/studio/events/${event.id}`}
                className="group block bg-white border border-studio-border rounded-[2rem] p-6 hover:border-studio-accent/40 hover:shadow-premium transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  {/* Date block */}
                  <div className="shrink-0 w-16 text-center">
                    <p className="text-2xl font-bold font-mono text-studio-accent leading-none">
                      {format(new Date(event.date), "dd")}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-studio-text-dim mt-1">
                      {format(new Date(event.date), "MMM yyyy", { locale: es })}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-14 bg-studio-border shrink-0" />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg text-studio-text group-hover:text-studio-accent transition-colors truncate">
                        {event.name}
                      </h3>
                      {isPast && (
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest bg-stone-100 text-stone-500 border border-stone-200 px-2 py-0.5 rounded-full">
                          Pasado
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-studio-text-dim">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={13} strokeWidth={1.5} />
                        {event.location ?? "Sin ubicación"}
                      </span>
                      <span className="text-studio-border">·</span>
                      <span className="italic truncate">{event.template.name}</span>
                    </div>
                  </div>

                  {/* Guest count */}
                  <div className={cn(
                    "shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl",
                    total > 0 ? "bg-studio-accent-soft text-studio-accent" : "bg-studio-bg text-studio-text-dim"
                  )}>
                    <Users2 size={16} strokeWidth={1.5} />
                    <span className="font-bold text-sm">{total}</span>
                    <span className="text-[11px] font-medium">
                      {total === 1 ? "invitado" : "invitados"}
                    </span>
                  </div>

                  <ArrowRight
                    size={20}
                    className="shrink-0 text-studio-border group-hover:text-studio-accent group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
