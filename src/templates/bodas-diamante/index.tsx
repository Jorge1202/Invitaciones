"use client";

import { motion } from "framer-motion";
import { InvitationData } from "@/types/invitation";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Music2, 
  Gift, 
  Heart, 
  Info,
  ChevronDown
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface BodaDiamanteProps {
  data: InvitationData;
}

export default function TemplateBodaDiamante({ data }: BodaDiamanteProps) {
  const { cover, global, itinerary, locations, details, family, rsvp, gifts } = data;

  return (
    <div 
      className="min-h-screen font-sans selection:bg-studio-accent/20"
      style={{ 
        backgroundColor: global.secondaryColor,
        '--primary-color': global.primaryColor 
      } as React.CSSProperties}
    >
      {/* 1. HERO / COVER */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image Placeholder with Overlay */}
        <div className="absolute inset-0 z-0">
           {cover.heroImage ? (
             <img src={cover.heroImage} alt="Cover" className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full bg-stone-200" />
           )}
           <div className="absolute inset-0 bg-black/30" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 text-center text-white space-y-6 px-4"
        >
          <p className="uppercase tracking-[0.4em] text-sm font-medium opacity-80">
            {cover.title}
          </p>
          <h1 className="text-6xl md:text-8xl font-fraunces italic font-bold leading-tight">
            {cover.name1} <br/> & <br/> {cover.name2}
          </h1>
          <div className="w-12 h-[1px] bg-white mx-auto my-8 opacity-50" />
          <p className="text-xl md:text-2xl font-light tracking-widest uppercase">
            {format(new Date(cover.date), "dd 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* 2. QUOTE */}
      {cover.quote && (
        <section className="py-24 px-6 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Heart size={24} className="mx-auto mb-8 text-[var(--primary-color)] opacity-40" />
            <p className="text-2xl font-fraunces italic text-studio-text leading-relaxed">
              "{cover.quote}"
            </p>
          </motion.div>
        </section>
      )}

      {/* 3. FAMILY (Cortejo) */}
      {family && (
        <section className="py-20 bg-stone-100/50 px-6">
           <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
              <div className="space-y-6">
                 <h3 className="text-xs uppercase tracking-widest font-bold text-studio-text-dim">Padres de la Novia</h3>
                 <div className="space-y-1">
                    {family.parents1?.map(p => <p key={p} className="text-xl font-fraunces">{p}</p>)}
                 </div>
              </div>
              <div className="space-y-6">
                 <h3 className="text-xs uppercase tracking-widest font-bold text-studio-text-dim">Padres del Novio</h3>
                 <div className="space-y-1">
                    {family.parents2?.map(p => <p key={p} className="text-xl font-fraunces">{p}</p>)}
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* 4. ITINERARY */}
      {itinerary && (
        <section className="py-32 px-6 max-w-4xl mx-auto">
          <h2 className="text-center font-fraunces text-4xl mb-20 italic">Nuestro Itinerario</h2>
          <div className="space-y-12">
            {itinerary.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-8 border-b border-studio-border pb-8 last:border-0"
              >
                <span className="text-2xl font-mono text-[var(--primary-color)] font-bold">{item.time}</span>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-studio-text">{item.title}</h4>
                  <p className="text-studio-text-dim italic">{item.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 5. LOCATIONS / MAPS */}
      {locations && (
        <section className="py-32 bg-stone-900 text-white px-6">
           <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
              {locations.map((loc, i) => (
                <div key={i} className="space-y-6">
                   <span className="text-xs uppercase tracking-[0.3em] font-bold text-studio-accent">{loc.type}</span>
                   <h3 className="text-3xl font-fraunces italic">{loc.name}</h3>
                   <p className="text-white/60 font-light leading-relaxed">{loc.address}</p>
                   <a 
                    href={loc.mapUrl} 
                    target="_blank" 
                    className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all"
                   >
                     <MapPin size={16} />
                     Ver ubicación
                   </a>
                </div>
              ))}
           </div>
        </section>
      )}

      {/* 6. DETAILS (Dress Code, etc) */}
      {details && (
        <section className="py-32 px-6 text-center">
           <div className="max-w-xl mx-auto space-y-12">
              <div className="space-y-4">
                 <Info size={24} className="mx-auto text-[var(--primary-color)] opacity-40" />
                 <h3 className="text-xs uppercase tracking-widest font-bold text-studio-text-dim">Código de Vestimenta</h3>
                 <p className="text-2xl font-fraunces">{details.dressCode}</p>
              </div>
              {details.noKids && (
                <p className="text-sm uppercase tracking-widest text-studio-text-dim font-bold">Evento sin niños</p>
              )}
           </div>
        </section>
      )}

      {/* 7. GIFTS / FINTECH */}
      {gifts && (
        <section className="py-32 bg-studio-accent-soft px-6">
           <div className="max-w-2xl mx-auto text-center space-y-8">
              <Gift size={32} className="mx-auto text-studio-accent" />
              <h2 className="text-3xl font-fraunces italic">Mesa de Regalos</h2>
              <p className="text-studio-text-dim italic leading-relaxed">
                {gifts.message || "Su presencia es nuestro mejor regalo."}
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                 {gifts.registries?.map(r => (
                   <a 
                    key={r.store}
                    href={r.url} 
                    target="_blank"
                    className="bg-white border border-studio-border p-4 rounded-2xl flex items-center justify-between hover:shadow-soft transition-all"
                   >
                     <span className="font-bold">{r.store}</span>
                     <span className="text-xs uppercase tracking-widest font-bold text-studio-accent">Ver mesa</span>
                   </a>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* 8. RSVP FOOTER */}
      <section className="py-40 px-6 text-center">
         <div className="space-y-8">
            <h2 className="text-5xl font-fraunces font-bold italic">Confirmar Asistencia</h2>
            <p className="text-studio-text-dim italic">Por favor confirma antes del {format(new Date(rsvp.deadline), "dd 'de' MMMM", { locale: es })}</p>
            <a 
              href={`https://wa.me/${rsvp.whatsappContact}`}
              className="inline-block bg-studio-text text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-studio-accent transition-all shadow-xl shadow-studio-accent/20"
            >
              Confirmar por WhatsApp
            </a>
         </div>
      </section>

      <footer className="py-12 border-t border-studio-border text-center">
         <p className="text-[10px] uppercase tracking-widest text-studio-text-dim font-bold">Powered by InvitaWeb Studio</p>
      </footer>
    </div>
  );
}
