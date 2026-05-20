"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Role, TemplateStatus, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

async function ensureSuperAdmin() {
  const session = await auth();
  if (session?.user?.role !== Role.super_admin) {
    throw new Error("No autorizado. Se requieren permisos de Super Admin.");
  }
}

export async function getTemplates() {
  await ensureSuperAdmin();
  return await prisma.template.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { events: true }
      }
    }
  });
}

export async function createTemplate(data: {
  name: string;
  description?: string;
  category: string;
  mood: string;
  config: Prisma.InputJsonValue;
}) {
  await ensureSuperAdmin();

  try {
    const template = await prisma.template.create({
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        mood: data.mood,
        status: TemplateStatus.draft,
        config: data.config as Prisma.InputJsonValue,
      },
    });

    revalidatePath("/command/templates");
    return { success: true, template };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating template:", error.message);
    }
    return { success: false, error: "Error al crear la plantilla." };
  }
}

export async function updateTemplateStatus(id: string, status: TemplateStatus) {
  await ensureSuperAdmin();
  await prisma.template.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/command/templates");
}

export async function deleteTemplate(id: string) {
  await ensureSuperAdmin();
  try {
    await prisma.template.delete({
      where: { id },
    });
    revalidatePath("/command/templates");
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: "No se puede eliminar una plantilla en uso por eventos." };
  }
}
