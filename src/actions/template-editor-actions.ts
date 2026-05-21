"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Role, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

async function ensureSuperAdmin() {
  const session = await auth();
  if (session?.user?.role !== Role.super_admin) {
    throw new Error("No autorizado");
  }
}

export async function updateTemplateConfig(id: string, config: Prisma.InputJsonValue) {
  await ensureSuperAdmin();
  
  await prisma.template.update({
    where: { id },
    data: { config },
  });

  revalidatePath(`/command/templates/${id}`);
  return { success: true };
}
