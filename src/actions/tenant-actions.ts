"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Role, Plan } from "@prisma/client";
import { revalidatePath } from "next/cache";

/**
 * Ensures the caller is a Super Admin.
 */
async function ensureSuperAdmin() {
  const session = await auth();
  if (session?.user?.role !== Role.super_admin) {
    throw new Error("No autorizado. Se requieren permisos de Super Admin.");
  }
}

export async function getTenants() {
  await ensureSuperAdmin();
  return await prisma.tenant.findMany({
    include: {
      _count: {
        select: { users: true, events: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createTenant(data: {
  name: string;
  slug: string;
  plan: Plan;
}) {
  await ensureSuperAdmin();

  try {
    const tenant = await prisma.tenant.create({
      data: {
        name: data.name,
        slug: data.slug.toLowerCase().replace(/\s+/g, "-"),
        plan: data.plan,
      },
    });

    revalidatePath("/command/tenants");
    return { success: true, tenant };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating tenant:", error.message);
    }
    return { success: false, error: "Error al crear el tenant. El slug podría estar duplicado." };
  }
}

export async function toggleTenantStatus(id: string, currentStatus: boolean) {
  await ensureSuperAdmin();

  await prisma.tenant.update({
    where: { id },
    data: { isActive: !currentStatus },
  });

  revalidatePath("/command/tenants");
}
