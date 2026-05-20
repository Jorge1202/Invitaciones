import { getCurrentTenant } from "@/actions/studio-actions";
import { CalendarDays, Users2, Star, TrendingUp, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function StudioDashboard() {
  const tenant = await getCurrentTenant();

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Hero Welcome Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-fraunces font-bold text-studio-text tracking-tight">
            Bienvenido al <span className="text-studio-accent italic">Atelier</span>
          </h1>
          <p className="text-studio-text-dim text-lg italic">
            Diseñando momentos memorables para {tenant?.name}.
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-soft border border-studio-border/50">
           <div className="px-4 py-2 bg-studio-accent-soft rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-widest text-studio-accent">Plan {tenant?.plan}</span>
           </div>
           <div className="px-4 py-2">
              <span className="text-xs font-bold text-studio-text-dim">Membresía Activa</span>
           </div>
        </div>
      </section>

      {/* Modern Stats Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Eventos Activos", value: tenant?._count.events || 0, icon: CalendarDays, color: "bg-studio-accent", text: "text-white" },
          { label: "Invitados Gestionados", value: "0", icon: Users2, color: "bg-white", text: "text-studio-accent" },
          { label: "Tasa de Respuesta", value: "0%", icon: TrendingUp, color: "bg-white", text: "text-studio-botanic" },
          { label: "Créditos IA", value: "Ilimitados", icon: Sparkles, color: "bg-white", text: "text-purple-500" },
        ].map((stat, i) => (
          <div key={i} className={cn(
            "p-8 rounded-[2.5rem] border border-studio-border/50 transition-all duration-500 group cursor-default",
            stat.color === 'bg-white' ? "bg-white shadow-soft hover:shadow-premium" : `${stat.color} shadow-lg shadow-studio-accent/20`
          )}>
            <div className="flex items-center justify-between mb-6">
              <div className={stat.text}>
                <stat.icon size={24} strokeWidth={1.5} />
              </div>
              <ArrowUpRight size={20} className={cn("opacity-0 group-hover:opacity-100 transition-opacity", stat.text)} />
            </div>
            <p className={cn("text-[10px] font-bold uppercase tracking-[0.2em] mb-1", stat.text === 'text-white' ? "text-white/70" : "text-studio-text-dim")}>
              {stat.label}
            </p>
            <p className={cn("text-3xl font-bold font-mono tracking-tighter", stat.text)}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main Grid: Gallery Style */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Creation Card */}
        <div className="lg:col-span-2 group relative bg-studio-text rounded-[3rem] p-12 text-white overflow-hidden shadow-2xl">
          <div className="relative z-10 h-full flex flex-col">
            <h3 className="text-3xl font-fraunces font-bold mb-4 leading-tight">
              ¿Lista para crear una nueva <br/> experiencia digital?
            </h3>
            <p className="text-white/60 text-lg mb-10 max-w-sm italic">
              Nuestras plantillas están diseñadas para cautivar desde el primer segundo.
            </p>
            <button className="mt-auto self-start bg-white text-studio-text font-bold px-10 py-4 rounded-full hover:bg-studio-accent hover:text-white transition-all duration-500 transform group-hover:scale-105">
              Comenzar Invitación
            </button>
          </div>
          
          {/* Abstract decorative elements */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-studio-accent/20 rounded-full blur-[80px] group-hover:bg-studio-accent/40 transition-colors duration-1000" />
          <CalendarDays size={300} className="absolute -bottom-20 -right-20 text-white/5 transform rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
        </div>

        {/* Side Info Cards */}
        <div className="space-y-10">
          <div className="bg-white border border-studio-border/50 rounded-[2.5rem] p-8 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 rounded-full bg-studio-accent/10 flex items-center justify-center text-studio-accent">
                  <Star size={20} />
               </div>
               <h4 className="font-bold text-studio-text tracking-tight">Estatus de Marca</h4>
            </div>
            <div className="space-y-4">
               <div className="flex items-center justify-between text-sm">
                  <span className="text-studio-text-dim italic">Logo configurado</span>
                  <div className="w-2 h-2 rounded-full bg-studio-botanic" />
               </div>
               <div className="flex items-center justify-between text-sm">
                  <span className="text-studio-text-dim italic">Dominio personalizado</span>
                  <div className="w-2 h-2 rounded-full bg-studio-accent" />
               </div>
               <div className="pt-4 border-t border-studio-border/50">
                  <button className="text-xs font-bold text-studio-accent uppercase tracking-widest hover:underline">Ir a Marca Blanca</button>
               </div>
            </div>
          </div>

          <div className="bg-studio-bg border border-studio-border/50 rounded-[2.5rem] p-8 border-dashed">
            <h4 className="font-bold text-studio-text mb-2 tracking-tight italic text-center text-studio-text-dim">Tu asistente IA te espera</h4>
            <p className="text-xs text-studio-text-dim text-center leading-relaxed">
              Genera textos persuasivos y predice la asistencia de tus próximos eventos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
