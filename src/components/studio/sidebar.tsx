"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users2, 
  Palette, 
  Sparkles, 
  CreditCard,
  Settings,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Panel Principal", href: "/studio" },
  { icon: CalendarDays, label: "Eventos", href: "/studio/events" },
  { icon: Users2, label: "Invitados", href: "/studio/guests" },
  { icon: Palette, label: "Catálogo", href: "/studio/templates" },
  { icon: Sparkles, label: "Asistente IA", href: "/studio/ai" },
];

export function StudioSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-white border-r border-studio-border flex flex-col py-10">
      <div className="px-10 mb-16">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-studio-accent rounded-xl flex items-center justify-center shadow-lg shadow-studio-accent/20">
            <span className="text-white font-bold text-lg italic">IW</span>
          </div>
          <div className="flex flex-col">
            <span className="font-fraunces font-bold text-2xl text-studio-text tracking-tight">Studio</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-studio-accent font-bold -mt-1">Atelier Edition</span>
          </div>
        </div>
      </div>

      <div className="px-6 mb-8">
         <button className="w-full bg-studio-text text-white rounded-2xl py-4 px-6 flex items-center justify-center gap-3 hover:bg-studio-accent transition-all duration-500 shadow-soft group">
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            <span className="font-bold text-sm tracking-wide">Nuevo Evento</span>
         </button>
      </div>

      <nav className="flex-1 px-6 space-y-2">
        <p className="px-4 text-[10px] uppercase tracking-[0.3em] text-studio-text-dim font-bold mb-4">Gestión</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group",
                isActive 
                  ? "bg-studio-accent-soft text-studio-accent" 
                  : "text-studio-text-dim hover:text-studio-text hover:bg-studio-bg"
              )}
            >
              <item.icon 
                size={20} 
                strokeWidth={isActive ? 2 : 1.5} 
                className={cn("transition-colors", isActive ? "text-studio-accent" : "group-hover:text-studio-text")} 
              />
              <span className={cn("text-sm font-semibold tracking-tight", isActive ? "text-studio-accent" : "text-studio-text-dim")}>
                {item.label}
              </span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-studio-accent animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 mt-auto space-y-2 pt-10 border-t border-studio-border/50">
        <Link
          href="/studio/billing"
          className={cn(
            "flex items-center gap-4 px-4 py-3 rounded-2xl text-studio-text-dim hover:text-studio-text transition-all",
            pathname === "/studio/billing" && "text-studio-accent"
          )}
        >
          <CreditCard size={18} strokeWidth={1.5} />
          <span className="text-sm font-medium italic">Mi Membresía</span>
        </Link>
        <Link
          href="/studio/settings"
          className="flex items-center gap-4 px-4 py-3 rounded-2xl text-studio-text-dim hover:text-studio-text transition-all"
        >
          <Settings size={18} strokeWidth={1.5} />
          <span className="text-sm font-medium">Configuración</span>
        </Link>
      </div>
    </aside>
  );
}
