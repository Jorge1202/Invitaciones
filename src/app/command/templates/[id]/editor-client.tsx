"use client";

import { useState, useMemo } from "react";
import { TemplateRegistry } from "@/templates/registry";
import { ConfigEditor } from "@/components/command/config-editor";
import { ArrowLeft, Smartphone, Tablet, Monitor, RefreshCw } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TemplateEditorProps {
  template: {
    id: string;
    name: string;
    componentId: string;
    config: any;
  };
}

export default function TemplateEditorClient({ template }: TemplateEditorProps) {
  const [currentConfig, setCurrentConfig] = useState(template.config);
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">("mobile");
  const [previewKey, setPreviewKey] = useState(0);

  // Mock data reacts to config changes (colors update live in the preview)
  const mockData = useMemo(() => ({
    global: {
      primaryColor:   currentConfig.theme?.primary   ?? "#B8745A",
      secondaryColor: currentConfig.theme?.secondary ?? "#FBF9F6",
      accentColor:    currentConfig.theme?.accent    ?? "#2D5F4E",
      headingFont:    currentConfig.typography?.headingFont,
      bodyFont:       currentConfig.typography?.bodyFont,
    },
    cover: {
      title: "La Boda de",
      name1: "Montserrat",
      name2: "Abelardo",
      date:  "2026-06-20",
      quote: "Un viaje de mil millas comienza con un solo paso.",
    },
    family: {
      parents1: ["Reyna López", "Pedro Escobedo"],
      parents2: ["Domitila Balderas", "Rufino Barraza"],
    },
    itinerary: [
      { time: "14:00", title: "Ceremonia Religiosa", location: "Catedral de la Ciudad",   icon: "church"  },
      { time: "16:00", title: "Sesión de Fotos",     location: "Jardín del Palacio",      icon: "camera"  },
      { time: "18:00", title: "Cóctel de Bienvenida",location: "Terraza del Salón Real",  icon: "cheers"  },
      { time: "20:00", title: "Cena y Baile",         location: "Salón Real, Planta Baja", icon: "music"   },
    ],
    locations: [
      { type: "Ceremonia", name: "Catedral Metropolitana", address: "Plaza de la Constitución, Centro Histórico", mapUrl: "#" },
      { type: "Recepción", name: "Salón Real",             address: "Av. Reforma 450, Col. Cuauhtémoc",           mapUrl: "#" },
    ],
    details: {
      dressCode: "Formal",
      noKids: true,
    },
    gifts: {
      message: "Su presencia es nuestro mejor regalo. Si desea obsequiarnos algo, puede hacerlo a través de:",
      registries: [
        { store: "Liverpool",  url: "#" },
        { store: "Amazon",     url: "#" },
      ],
      bankDetails: {
        bank:    "BBVA",
        account: "1234 5678 9012",
        clabe:   "012 345 67890123456 7",
        name:    "Montserrat García López",
      },
    },
    rsvp: {
      deadline:         "2026-05-30",
      whatsappContact:  "5215512345678",
    },
  }), [currentConfig]);

  return (
    <div className="fixed inset-0 bg-command-bg flex flex-col z-[100] text-command-text">

      {/* ── Top Bar ── */}
      <header className="h-16 border-b border-command-border bg-command-surface flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-5">
          <Link
            href="/command/templates"
            className="p-2 hover:bg-command-bg rounded-lg transition-colors text-command-text-dim hover:text-white"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-bold text-sm tracking-tight">{template.name}</h1>
            <p className="text-[10px] text-command-text-dim uppercase tracking-widest font-bold">
              Editor de Plantilla Maestra
            </p>
          </div>
        </div>

        {/* Viewport toggles */}
        <div className="flex bg-command-bg border border-command-border p-1 rounded-xl gap-1">
          {(["mobile", "tablet", "desktop"] as const).map(v => (
            <button
              key={v}
              onClick={() => setViewport(v)}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewport === v
                  ? "bg-command-accent text-white shadow-lg"
                  : "text-command-text-dim hover:text-white",
              )}
              title={v}
            >
              {v === "mobile"  && <Smartphone size={18} />}
              {v === "tablet"  && <Tablet     size={18} />}
              {v === "desktop" && <Monitor    size={18} />}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPreviewKey(k => k + 1)}
          className="p-2 text-command-text-dim hover:text-white transition-colors"
          title="Forzar recarga del preview"
        >
          <RefreshCw size={18} />
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">

        {/* ── Preview area ── */}
        <main className="flex-1 bg-command-bg p-8 flex items-center justify-center overflow-hidden">
          <div
            className={cn(
              "bg-white shadow-2xl transition-all duration-500 overflow-auto",
              viewport === "mobile"  && "w-[375px]  h-[667px]  rounded-[3rem]  border-[12px] border-command-surface",
              viewport === "tablet"  && "w-[768px]  h-[900px]  rounded-[2rem]  border-[10px] border-command-surface",
              viewport === "desktop" && "w-full h-full",
            )}
          >
            <TemplateRegistry
              key={previewKey}
              componentId={template.componentId}
              data={mockData as any}
            />
          </div>
        </main>

        {/* ── Config sidebar ── */}
        <aside className="w-[450px] h-full shrink-0">
          <ConfigEditor
            templateId={template.id}
            initialConfig={template.config}
            onPreview={setCurrentConfig}
          />
        </aside>
      </div>
    </div>
  );
}
