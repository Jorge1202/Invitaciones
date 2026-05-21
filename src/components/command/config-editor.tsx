"use client";

import { useState, useCallback } from "react";
import { updateTemplateConfig } from "@/actions/template-editor-actions";
import {
  Save, Palette, Type, LayoutGrid, Code2,
  AlertCircle, Check, ChevronUp, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Constants ───────────────────────────────────────────────────────────────

const SECTION_DEFS = [
  { id: "hero",      label: "Hero / Portada",        icon: "🎴", required: true  },
  { id: "quote",     label: "Frase destacada",        icon: "💬", required: false },
  { id: "countdown", label: "Cuenta regresiva",       icon: "⏳", required: false },
  { id: "family",    label: "Familia / Cortejo",      icon: "🫂", required: false },
  { id: "itinerary", label: "Itinerario",             icon: "📋", required: false },
  { id: "locations", label: "Ubicaciones / Mapas",    icon: "📍", required: false },
  { id: "details",   label: "Dress code & Detalles",  icon: "👔", required: false },
  { id: "gifts",     label: "Mesa de regalos",        icon: "🎁", required: false },
  { id: "rsvp",      label: "RSVP / Confirmación",   icon: "✅", required: true  },
] as const;

const FONT_PAIRS = [
  { id: "fraunces-inter",         heading: "Fraunces",          body: "Inter",          style: "Elegante · Clásico"        },
  { id: "playfair-lato",          heading: "Playfair Display",  body: "Lato",           style: "Romántico · Moderno"       },
  { id: "cormorant-montserrat",   heading: "Cormorant Garamond",body: "Montserrat",     style: "Editorial · Fino"          },
  { id: "cinzel-crimson",         heading: "Cinzel",            body: "Crimson Text",   style: "Lujoso · Sofisticado"      },
  { id: "great-vibes-raleway",    heading: "Great Vibes",       body: "Raleway",        style: "Script · Festivo"          },
  { id: "dm-serif-dm-sans",       heading: "DM Serif Display",  body: "DM Sans",        style: "Contemporáneo · Limpio"    },
];

const PRESET_PALETTES = [
  { id: "diamante", name: "Diamante", primary: "#B8745A", secondary: "#FBF9F6", accent: "#2D5F4E" },
  { id: "sage",     name: "Sage",     primary: "#6B8E6B", secondary: "#F4F6F1", accent: "#B8924A" },
  { id: "midnight", name: "Midnight", primary: "#4A5568", secondary: "#F7F4EF", accent: "#9B7B4A" },
  { id: "blush",    name: "Blush",    primary: "#C4788E", secondary: "#FDF8F9", accent: "#8B6A7A" },
  { id: "obsidian", name: "Obsidian", primary: "#1A1A2E", secondary: "#F8F8FA", accent: "#C9A96E" },
  { id: "flora",    name: "Flora",    primary: "#3D7A5A", secondary: "#F5FAF7", accent: "#C4774A" },
];

type Tab = "theme" | "typography" | "sections" | "advanced";

interface SectionItem { id: string; enabled: boolean; }

interface ConfigEditorProps {
  templateId: string;
  initialConfig: any;
  onPreview: (config: any) => void;
}

// ─── Init helpers ─────────────────────────────────────────────────────────────

function initSections(config: any): SectionItem[] {
  const enabledOrder: string[] = config.sectionsOrder ?? SECTION_DEFS.map(s => s.id);
  const allIds: string[] = SECTION_DEFS.map(s => s.id);
  // Start with those in enabledOrder (in order), then append missing ones
  const ordered: SectionItem[] = enabledOrder
    .filter(id => allIds.includes(id))
    .map(id => ({ id, enabled: true }));
  allIds.forEach(id => {
    if (!ordered.find(s => s.id === id)) ordered.push({ id, enabled: false });
  });
  return ordered;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ConfigEditor({ templateId, initialConfig, onPreview }: ConfigEditorProps) {
  const [tab, setTab] = useState<Tab>("theme");

  // Theme
  const [theme, setTheme] = useState({
    primary:   initialConfig.theme?.primary   ?? "#B8745A",
    secondary: initialConfig.theme?.secondary ?? "#FBF9F6",
    accent:    initialConfig.theme?.accent    ?? "#2D5F4E",
  });

  // Typography
  const [fontPairId, setFontPairId] = useState<string>(
    initialConfig.typography?.pairId ?? "fraunces-inter"
  );

  // Sections
  const [sections, setSections] = useState<SectionItem[]>(() => initSections(initialConfig));

  // Advanced JSON
  const [jsonText, setJsonText] = useState(JSON.stringify(initialConfig, null, 2));

  // Save state
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);
  const [error,  setError]  = useState<string | null>(null);

  // ── Build config ──────────────────────────────────────────────────────────

  const buildConfig = useCallback((
    t   = theme,
    fpId = fontPairId,
    secs = sections,
  ) => {
    const pair = FONT_PAIRS.find(f => f.id === fpId) ?? FONT_PAIRS[0];
    const enabledOrder = secs.filter(s => s.enabled).map(s => s.id);
    return {
      ...initialConfig,
      theme: t,
      typography: { pairId: fpId, headingFont: pair.heading, bodyFont: pair.body },
      sectionsOrder: enabledOrder,
      features: {
        hasMusic:     initialConfig.features?.hasMusic     ?? true,
        hasCountdown: secs.find(s => s.id === "countdown")?.enabled ?? false,
        hasGallery:   initialConfig.features?.hasGallery   ?? false,
        hasRSVP:      true,
      },
    };
  }, [theme, fontPairId, sections, initialConfig]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleThemeChange = (key: keyof typeof theme, value: string) => {
    const next = { ...theme, [key]: value };
    setTheme(next);
    onPreview(buildConfig(next, fontPairId, sections));
  };

  const handlePaletteSelect = (p: typeof PRESET_PALETTES[0]) => {
    const next = { primary: p.primary, secondary: p.secondary, accent: p.accent };
    setTheme(next);
    onPreview(buildConfig(next, fontPairId, sections));
  };

  const handleFontChange = (pairId: string) => {
    setFontPairId(pairId);
    onPreview(buildConfig(theme, pairId, sections));
  };

  const handleSectionToggle = (index: number) => {
    const def = SECTION_DEFS.find(d => d.id === sections[index].id);
    if (def?.required) return;
    const next = sections.map((s, i) => i === index ? { ...s, enabled: !s.enabled } : s);
    setSections(next);
    onPreview(buildConfig(theme, fontPairId, next));
  };

  const moveSectionUp = (index: number) => {
    if (index === 0) return;
    const next = [...sections];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    setSections(next);
    onPreview(buildConfig(theme, fontPairId, next));
  };

  const moveSectionDown = (index: number) => {
    if (index === sections.length - 1) return;
    const next = [...sections];
    [next[index + 1], next[index]] = [next[index], next[index + 1]];
    setSections(next);
    onPreview(buildConfig(theme, fontPairId, next));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const config = tab === "advanced" ? JSON.parse(jsonText) : buildConfig();
      await updateTemplateConfig(templateId, config);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e: any) {
      setError(e.message ?? "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full bg-command-surface border-l border-command-border">

      {/* ── Header ── */}
      <header className="px-5 py-3.5 border-b border-command-border bg-command-bg/50 flex items-center justify-between shrink-0">
        <span className="font-bold text-[11px] uppercase tracking-widest text-command-accent">
          Panel de Diseño
        </span>
        <button
          onClick={handleSave}
          disabled={saving}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all",
            saved   ? "bg-emerald-600 text-white"
                    : "bg-command-accent hover:bg-command-accent-hi text-white",
            saving && "opacity-50 cursor-not-allowed",
          )}
        >
          {saved ? <Check size={13} /> : <Save size={13} />}
          {saving ? "Guardando…" : saved ? "¡Guardado!" : "Guardar cambios"}
        </button>
      </header>

      {/* ── Tabs ── */}
      <div className="flex shrink-0 border-b border-command-border">
        {([
          { id: "theme"      as Tab, label: "Tema",      Icon: Palette    },
          { id: "typography" as Tab, label: "Fuentes",   Icon: Type       },
          { id: "sections"   as Tab, label: "Secciones", Icon: LayoutGrid },
          { id: "advanced"   as Tab, label: "JSON",      Icon: Code2      },
        ]).map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "flex-1 flex flex-col items-center gap-1.5 py-3 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all",
              tab === id
                ? "border-command-accent text-command-accent bg-command-accent/5"
                : "border-transparent text-command-text-dim hover:text-command-text",
            )}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div className="flex-1 overflow-y-auto">

        {/* ════ TEMA ════ */}
        {tab === "theme" && (
          <div className="p-5 space-y-6">

            {/* Preset palettes */}
            <section>
              <p className="text-[10px] uppercase tracking-widest font-bold text-command-text-dim mb-3">
                Paletas preestablecidas
              </p>
              <div className="grid grid-cols-3 gap-2">
                {PRESET_PALETTES.map(p => {
                  const isActive =
                    theme.primary === p.primary &&
                    theme.secondary === p.secondary &&
                    theme.accent === p.accent;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handlePaletteSelect(p)}
                      className={cn(
                        "rounded-xl overflow-hidden border transition-all text-center",
                        isActive
                          ? "border-command-accent ring-1 ring-command-accent"
                          : "border-command-border hover:border-command-accent/50",
                      )}
                    >
                      <div className="flex h-7">
                        <div className="flex-1" style={{ background: p.primary   }} />
                        <div className="flex-1" style={{ background: p.secondary }} />
                        <div className="flex-1" style={{ background: p.accent    }} />
                      </div>
                      <p className="text-[9px] py-1.5 font-bold tracking-wide text-command-text-dim">
                        {p.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="h-px bg-command-border" />

            {/* Custom color pickers */}
            <section>
              <p className="text-[10px] uppercase tracking-widest font-bold text-command-text-dim mb-3">
                Ajuste fino
              </p>
              <div className="space-y-2.5">
                {([
                  { key: "primary"   as const, label: "Color primario",      desc: "Títulos, botones, íconos"   },
                  { key: "secondary" as const, label: "Fondo de la invitación", desc: "Color de fondo principal" },
                  { key: "accent"    as const, label: "Color acento",         desc: "Detalles secundarios"       },
                ]).map(({ key, label, desc }) => (
                  <div key={key} className="bg-command-bg rounded-xl p-3 flex items-center gap-3">
                    <label className="relative cursor-pointer shrink-0">
                      <div
                        className="w-10 h-10 rounded-lg border-2 border-command-border"
                        style={{ background: theme[key] }}
                      />
                      <input
                        type="color"
                        value={theme[key]}
                        onChange={e => handleThemeChange(key, e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                    </label>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-command-text truncate">{label}</p>
                      <p className="text-[10px] text-command-text-dim">{desc}</p>
                    </div>
                    <input
                      type="text"
                      value={theme[key]}
                      onChange={e => {
                        const v = e.target.value;
                        if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) handleThemeChange(key, v);
                      }}
                      className="w-[5.5rem] bg-command-surface border border-command-border rounded-lg px-2 py-1.5 text-[11px] font-mono text-command-text text-center outline-none focus:border-command-accent transition-colors"
                      maxLength={7}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Live palette preview */}
            <section>
              <p className="text-[10px] uppercase tracking-widest font-bold text-command-text-dim mb-3">
                Vista previa
              </p>
              <div className="rounded-xl overflow-hidden border border-command-border">
                <div className="flex h-8">
                  <div className="flex-1 flex items-center justify-center text-[10px] font-bold text-white/80" style={{ background: theme.primary   }}>Primario</div>
                  <div className="flex-1 flex items-center justify-center text-[10px] font-bold text-stone-400"  style={{ background: theme.secondary }}>Fondo</div>
                  <div className="flex-1 flex items-center justify-center text-[10px] font-bold text-white/80" style={{ background: theme.accent    }}>Acento</div>
                </div>
                <div className="p-4" style={{ background: theme.secondary }}>
                  <p className="text-lg font-bold" style={{ color: theme.primary }}>Valentina &amp; Rodrigo</p>
                  <p className="text-sm mt-0.5"    style={{ color: theme.accent  }}>Sábado 20 de Junio de 2026</p>
                  <p className="text-xs mt-2 opacity-60" style={{ color: theme.primary }}>Confirmar asistencia →</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ════ TIPOGRAFÍA ════ */}
        {tab === "typography" && (
          <div className="p-5 space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-command-text-dim mb-1">
                Pares de fuentes
              </p>
              <p className="text-xs text-command-text-dim leading-relaxed">
                Combinaciones elegidas para invitaciones. Cada par usa una fuente display para títulos y una de lectura para el cuerpo.
              </p>
            </div>

            <div className="space-y-2">
              {FONT_PAIRS.map(pair => {
                const isActive = fontPairId === pair.id;
                return (
                  <button
                    key={pair.id}
                    onClick={() => handleFontChange(pair.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all",
                      isActive
                        ? "border-command-accent bg-command-accent/10 shadow-sm"
                        : "border-command-border bg-command-bg hover:border-command-border/80",
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[10px] font-bold text-command-text-dim uppercase tracking-widest">
                        {pair.style}
                      </span>
                      {isActive && (
                        <span className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-command-accent font-bold">
                          <Check size={10} /> Activo
                        </span>
                      )}
                    </div>
                    <p
                      className="text-2xl text-command-text leading-tight"
                      style={{ fontFamily: `'${pair.heading}', Georgia, serif` }}
                    >
                      {pair.heading}
                    </p>
                    <p
                      className="text-xs text-command-text-dim mt-1.5"
                      style={{ fontFamily: `'${pair.body}', system-ui, sans-serif` }}
                    >
                      {pair.body} — Texto del cuerpo de la invitación
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ════ SECCIONES ════ */}
        {tab === "sections" && (
          <div className="p-5 space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-command-text-dim mb-1">
                Secciones activas
              </p>
              <p className="text-xs text-command-text-dim leading-relaxed">
                Activa o desactiva bloques y ajusta su orden. Los tenants verán exactamente este orden.
              </p>
            </div>

            <div className="space-y-2">
              {sections.map((item, index) => {
                const def = SECTION_DEFS.find(d => d.id === item.id)!;
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border transition-all",
                      item.enabled
                        ? "border-command-border bg-command-bg"
                        : "border-command-border/40 bg-command-bg/30 opacity-50",
                    )}
                  >
                    <span className="text-lg shrink-0">{def.icon}</span>

                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "text-xs font-semibold truncate",
                        item.enabled ? "text-command-text" : "text-command-text-dim",
                      )}>
                        {def.label}
                      </p>
                      {def.required && (
                        <p className="text-[9px] text-command-accent font-bold uppercase tracking-widest">
                          Requerida
                        </p>
                      )}
                    </div>

                    {/* Order controls */}
                    <div className="flex flex-col gap-px shrink-0">
                      <button
                        onClick={() => moveSectionUp(index)}
                        disabled={index === 0}
                        className="p-0.5 rounded text-command-text-dim hover:text-command-text hover:bg-command-surface disabled:opacity-20 transition-all"
                      >
                        <ChevronUp size={13} />
                      </button>
                      <button
                        onClick={() => moveSectionDown(index)}
                        disabled={index === sections.length - 1}
                        className="p-0.5 rounded text-command-text-dim hover:text-command-text hover:bg-command-surface disabled:opacity-20 transition-all"
                      >
                        <ChevronDown size={13} />
                      </button>
                    </div>

                    {/* Toggle switch */}
                    <button
                      onClick={() => handleSectionToggle(index)}
                      disabled={def.required}
                      title={
                        def.required  ? "Sección requerida"
                        : item.enabled ? "Desactivar sección"
                        : "Activar sección"
                      }
                      className={cn(
                        "relative w-10 h-5 rounded-full transition-colors shrink-0",
                        item.enabled ? "bg-command-accent" : "bg-command-border",
                        def.required  && "cursor-not-allowed",
                      )}
                    >
                      <span className={cn(
                        "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all",
                        item.enabled ? "left-5" : "left-0.5",
                      )} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="bg-command-bg/60 rounded-xl p-3 border border-command-border">
              <p className="text-[10px] text-command-text-dim leading-relaxed">
                💡 El orden aquí define el orden en la invitación. Los tenants solo pueden llenar contenido, no reorganizar secciones.
              </p>
            </div>
          </div>
        )}

        {/* ════ JSON AVANZADO ════ */}
        {tab === "advanced" && (
          <div className="flex flex-col h-full">
            <div className="px-4 py-2.5 bg-amber-500/10 border-b border-amber-500/20 shrink-0">
              <p className="text-[10px] text-amber-400 font-medium">
                Modo avanzado — los cambios aquí se guardan directamente como JSON.
              </p>
            </div>
            <textarea
              value={jsonText}
              onChange={e => {
                setJsonText(e.target.value);
                try {
                  onPreview(JSON.parse(e.target.value));
                  setError(null);
                } catch { /* ignore while typing */ }
              }}
              className="flex-1 w-full bg-transparent p-5 font-mono text-[11px] leading-relaxed text-command-text outline-none resize-none"
              style={{ minHeight: "60vh" }}
              spellCheck={false}
            />
          </div>
        )}
      </div>

      {/* ── Error bar ── */}
      {error && (
        <div className="px-4 py-3 bg-red-500/10 border-t border-red-500/20 text-red-400 text-xs flex items-center gap-2 shrink-0">
          <AlertCircle size={13} />
          {error}
        </div>
      )}
    </div>
  );
}
