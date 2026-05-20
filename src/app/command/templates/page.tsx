import { getTemplates } from "@/actions/template-actions";
import { CreateTemplateModal } from "@/components/command/create-template-modal";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { LayoutTemplate, Eye, Edit3, MoreVertical, Sparkles } from "lucide-react";
import Image from "next/image";

export default async function MasterTemplatesPage() {
  const templates = await getTemplates();

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-fraunces font-bold">Catálogo Maestro</h1>
          <p className="text-command-text-dim text-lg">
            Diseña y gestiona las estructuras base de las invitaciones.
          </p>
        </div>
        <CreateTemplateModal />
      </header>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div 
            key={template.id} 
            className="bg-command-surface border border-command-border rounded-2xl overflow-hidden group hover:border-command-accent/50 transition-all duration-500 shadow-xl"
          >
            {/* Template Preview Placeholder */}
            <div className="aspect-[4/5] bg-command-bg relative flex items-center justify-center overflow-hidden">
               <LayoutTemplate size={80} className="text-command-surface-hi group-hover:scale-110 transition-transform duration-700" />
               
               {/* Status Badge */}
               <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                    template.status === 'published' ? 'bg-green-500 text-white' :
                    template.status === 'draft' ? 'bg-yellow-500 text-black' :
                    'bg-command-surface-hi text-command-text-dim'
                  }`}>
                    {template.status}
                  </span>
               </div>

               {/* Hover Overlay Actions */}
               <div className="absolute inset-0 bg-command-accent/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="p-3 bg-white text-command-bg rounded-full hover:scale-110 transition-transform shadow-lg" title="Vista Previa">
                     <Eye size={20} />
                  </button>
                  <button className="p-3 bg-command-accent text-white rounded-full hover:scale-110 transition-transform shadow-lg" title="Editar Diseño">
                     <Edit3 size={20} />
                  </button>
               </div>
            </div>

            {/* Info Footer */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-xl group-hover:text-command-accent transition-colors">{template.name}</h3>
                  <p className="text-xs text-command-text-dim uppercase tracking-widest font-bold mt-1">
                    {template.category} • {template.mood}
                  </p>
                </div>
                <button className="text-command-text-dim hover:text-white">
                  <MoreVertical size={20} />
                </button>
              </div>

              <p className="text-sm text-command-text-dim line-clamp-2 italic">
                {template.description || "Sin descripción disponible."}
              </p>

              <div className="pt-4 border-t border-command-border flex items-center justify-between text-[10px] font-bold uppercase tracking-tighter text-command-text-dim">
                <span>Usado en {template._count.events} eventos</span>
                <span>v1.0.0</span>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {templates.length === 0 && (
          <div className="col-span-full py-20 border-2 border-dashed border-command-border rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-4">
             <div className="w-16 h-16 bg-command-surface rounded-full flex items-center justify-center text-command-accent">
                <Sparkles size={32} />
             </div>
             <div>
                <h3 className="text-xl font-bold">No hay diseños maestros</h3>
                <p className="text-command-text-dim max-w-xs mx-auto">
                   Comienza creando tu primera estructura base para que los revendedores puedan usarla.
                </p>
             </div>
             <CreateTemplateModal />
          </div>
        )}
      </div>
    </div>
  );
}
