import React from "react";
import dynamic from "next/dynamic";
import { InvitationData } from "@/types/invitation";

const TemplateBodaDiamante = dynamic(() => import("@/templates/bodas-diamante"));

// Agrega aqui cada nuevo componente de plantilla que crees.
const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<{ data: any }>> = {
  TemplateBodaDiamante: TemplateBodaDiamante as any,
};

// Lista legible para el selector del modal de creacion.
// Cuando crees un nuevo componente, agrégalo aqui Y en TEMPLATE_COMPONENTS arriba.
export const REGISTERED_TEMPLATE_COMPONENTS: {
  id: string;
  label: string;
  category: string;
}[] = [
  { id: "TemplateBodaDiamante", label: "Boda Diamante",       category: "bodas"       },
  // { id: "TemplateXVRosa",       label: "XV Anos Rosa",        category: "xv"          },
  // { id: "TemplateInfantilGlob", label: "Infantil Globos",     category: "infantil"    },
  // { id: "TemplateCorporativo",  label: "Corporativo Clean",   category: "corporativo" },
];

export function TemplateRegistry({
  componentId,
  data,
}: {
  componentId: string;
  data: InvitationData;
}) {
  const Component = TEMPLATE_COMPONENTS[componentId];

  if (!Component) {
    return (
      <div className="flex items-center justify-center h-full bg-stone-100 text-stone-500 italic p-8 text-center text-sm">
        Componente <strong className="mx-1">"{componentId}"</strong> no registrado.
        Agregalo en src/templates/registry.tsx
      </div>
    );
  }

  return <Component data={data} />;
}
