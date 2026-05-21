"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Role, TemplateStatus, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { TIER_FEATURES, type TemplateTierKey } from "@/lib/tier-features";

async function ensureSuperAdmin() {
  const session = await auth();
  if (session?.user?.role !== Role.super_admin) {
    throw new Error("No autorizado.");
  }
}

export async function getTemplates() {
  await ensureSuperAdmin();
  return await prisma.template.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { events: true } } },
  });
}

export async function createTemplate(data: {
  name: string;
  description?: string;
  category: string;
  mood: string;
  componentId: string;
  tier: TemplateTierKey;
  config?: Prisma.InputJsonValue;
}) {
  await ensureSuperAdmin();

  try {
    const tierDef = TIER_FEATURES[data.tier];
    const initialConfig: Prisma.InputJsonValue = (data.config as Prisma.InputJsonValue) ?? ({
      theme: { primary: "#B8745A", secondary: "#FBF9F6", accent: "#2D5F4E" },
      typography: { pairId: "fraunces-inter", headingFont: "Fraunces", bodyFont: "Inter" },
      sectionsOrder: tierDef.sections,
      features: tierDef.features,
    } as unknown as Prisma.InputJsonValue);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = prisma as any;
    const template = await db.template.create({
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        mood: data.mood,
        componentId: data.componentId,
        tier: data.tier,
        status: TemplateStatus.draft,
        config: initialConfig,
      },
    });

    revalidatePath("/command/templates");
    return { success: true, template };
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return { success: false, error: "Error al crear la plantilla." };
  }
}

export async function updateTemplateStatus(id: string, status: TemplateStatus) {
  await ensureSuperAdmin();
  await prisma.template.update({ where: { id }, data: { status } });
  revalidatePath("/command/templates");
}

export async function deleteTemplate(id: string) {
  await ensureSuperAdmin();
  try {
    await prisma.template.delete({ where: { id } });
    revalidatePath("/command/templates");
    return { success: true };
  } catch {
    return { success: false, error: "No se puede eliminar una plantilla en uso." };
  }
}
