import { getTemplates } from "@/actions/template-actions";
import { CreateTemplateModal } from "@/components/command/create-template-modal";
import { TIER_FEATURES, TIER_LIST, type TemplateTierKey } from "@/lib/tier-features";
import { LayoutTemplate, Eye, Edit3, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TIER_BADGE: Record<TemplateTierKey, { label: string; className: string }> = {
  basic: {
    label:     "Basica",
    className: "bg-zinc-700 text-zinc-300 border border-zinc-600",
  },
  pro: {
    label:     "Pro",
    className: "bg-purple-500/20 text-purple-300 border border-purple-500/40",
  },
  vip: {
    label:     "VIP",
    className: "bg-amber-500/20 text-amber-300 border border-amber-500/40",
  },
};

const STATUS_BADGE: Record<string, string> = {
  draft:     "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  published: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  featured:  "bg-command-accent/20 text-command-accent border border-command-accent/30",
  archived:  "bg-zinc-700 text-zinc-500 border border-zinc-600",
};

export default async function MasterTemplatesPage() {
  const templates = await getTemplates();

  const byTier = TIER_LIST.map(t => ({
    tier:  t,
    count: templates.filter(tp => (((tp as any).tier ?? "basic") as TemplateTierKey) === t.key).length,
  }));

  return (
    <div className="space-y-8">

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-fraunces font-bold">Catalogo Maestro</h1>
          <p className="text-command-text-dim text-lg">
            Disenio y gestion de estructuras base de invitaciones.
          </p>
        </div>
        <CreateTemplateModal />
      </header>

      {/* Tier summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {byTier.map(({ tier, count }) => {
          const badge = TIER_BADGE[tier.key];
          return (
            <div
              key={tier.key}
              className="bg-command-surface border border-command-border rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="text-2xl">{tier.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-command-text-dim uppercase tracking-widest font-bold">
                  {tier.label}
                </p>
                <p className="text-2xl font-bold text-command-text">{count}</p>
                <p className="text-[10px] text-command-text-dim truncate">{tier.tagline}</p>
              </div>
              <span className={cn("px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shrink-0", badge.className)}>
                {badge.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => {
          const tierKey   = ((template as any).tier ?? "basic") as TemplateTierKey;
          const tierBadge = TIER_BADGE[tierKey];
          const tierDef   = TIER_FEATURES[tierKey];
          const statusCls = STATUS_BADGE[template.status] ?? STATUS_BADGE.draft;

          return (
            <div
              key={template.id}
              className="bg-command-surface border border-command-border rounded-2xl overflow-hidden group hover:border-command-accent/40 transition-all duration-300 shadow-xl flex flex-col"
            >
              {/* Preview thumbnail */}
              <div className="aspect-[4/5] bg-command-bg relative flex items-center justify-center overflow-hidden">
                <LayoutTemplate
                  size={72}
                  className="text-command-surface-hi group-hover:scale-110 transition-transform duration-700"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className={cn("px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider", tierBadge.className)}>
                    {tierDef.emoji} {tierBadge.label}
                  </span>
                  <span className={cn("px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider", statusCls)}>
                    {template.status}
                  </span>
                </div>

                {/* Section pills on hover */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {tierDef.sections.slice(0, 5).map(sec => (
                    <span
                      key={sec}
                      className="px-2 py-0.5 bg-black/50 text-white/80 rounded-md text-[9px] font-bold uppercase tracking-wide backdrop-blur-sm"
                    >
                      {sec}
                    </span>
                  ))}
                  {tierDef.sections.length > 5 && (
                    <span className="px-2 py-0.5 bg-black/50 text-white/60 rounded-md text-[9px] font-bold backdrop-blur-sm">
                      +{tierDef.sections.length - 5}
                    </span>
                  )}
                </div>

                {/* Hover actions */}
                <div className="absolute inset-0 bg-command-accent/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <Link
                    href={`/command/templates/${template.id}`}
                    className="p-3 bg-white text-command-bg rounded-full hover:scale-110 transition-transform shadow-lg"
                    title="Ver preview"
                  >
                    <Eye size={18} />
                  </Link>
                  <Link
                    href={`/command/templates/${template.id}`}
                    className="p-3 bg-command-accent text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                    title="Editar plantilla"
                  >
                    <Edit3 size={18} />
                  </Link>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 space-y-3 flex-1 flex flex-col">
                <div>
                  <h3 className="font-bold text-lg group-hover:text-command-accent transition-colors leading-tight">
                    {template.name}
                  </h3>
                  <p className="text-xs text-command-text-dim uppercase tracking-widest font-bold mt-1">
                    {template.category} &middot; {template.mood}
                  </p>
                </div>

                <p className="text-sm text-command-text-dim line-clamp-2 italic flex-1">
                  {template.description || "Sin descripcion disponible."}
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-1.5">
                  {tierDef.features.hasMusic        && <FeaturePill label="Musica"         />}
                  {tierDef.features.hasCountdown     && <FeaturePill label="Countdown"      />}
                  {tierDef.features.hasGallery       && <FeaturePill label="Galeria"        />}
                  {tierDef.features.hasBankTransfer  && <FeaturePill label="Transferencia"  />}
                  {tierDef.features.hasAnimations    && <FeaturePill label="Animaciones"    />}
                </div>

                <div className="pt-3 border-t border-command-border flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-command-text-dim">
                  <span>{template._count.events} eventos activos</span>
                  <span className={cn("px-2 py-0.5 rounded-md", tierBadge.className)}>
                    plan {tierDef.requiredTenantPlan}+
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty state */}
        {templates.length === 0 && (
          <div className="col-span-full py-20 border-2 border-dashed border-command-border rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-command-surface rounded-full flex items-center justify-center text-command-accent">
              <Sparkles size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold">No hay disenos maestros</h3>
              <p className="text-command-text-dim max-w-xs mx-auto mt-1">
                Crea tu primera plantilla y elige su tier para que los tenants puedan usarla.
              </p>
            </div>
            <CreateTemplateModal />
          </div>
        )}
      </div>
    </div>
  );
}

function FeaturePill({ label }: { label: string }) {
  return (
    <span className="px-2 py-0.5 bg-command-bg border border-command-border rounded-md text-[9px] font-bold uppercase tracking-wide text-command-text-dim">
      {label}
    </span>
  );
}
