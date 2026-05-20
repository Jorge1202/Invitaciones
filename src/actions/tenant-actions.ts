"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Role, Plan } from "@prisma/client";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

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
  tenantName: string;
  slug: string;
  plan: Plan;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
}) {
  await ensureSuperAdmin();

  try {
    const hashedPassword = await bcrypt.hash(data.adminPassword, 12);
    const cleanSlug = data.slug.toLowerCase().replace(/\s+/g, "-");

    const result = await prisma.$transaction(async (tx) => {
      // 1. Create the Tenant
      const tenant = await tx.tenant.create({
        data: {
          name: data.tenantName,
          slug: cleanSlug,
          plan: data.plan,
        },
      });

      // 2. Create the Admin User for this Tenant
      await tx.user.create({
        data: {
          name: data.adminName,
          email: data.adminEmail,
          password: hashedPassword,
          role: Role.tenant_admin,
          tenantId: tenant.id,
        },
      });

      return tenant;
    });

    revalidatePath("/command/tenants");
    return { success: true, tenant: result };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating tenant and admin:", error.message);
    }
    return { 
      success: false, 
      error: "Error al crear el revendedor. Verifica que el slug y el email no estén duplicados." 
    };
  }
}

export async function toggleTenantStatus(id: string, currentStatus: boolean) {
  await ensureSuperAdmin();

  await prisma.tenant.update({
    where: { id },
    data: { isActive: !currentStatus },
  });

  revalidatePath("/command/tenants");
  revalidatePath(`/command/tenants/${id}`);
}

export async function getTenantById(id: string) {
  await ensureSuperAdmin();
  return await prisma.tenant.findUnique({
    where: { id },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: { events: true },
      },
    },
  });
}

export async function updateTenant(id: string, data: {
  name: string;
  plan: Plan;
}) {
  await ensureSuperAdmin();

  await prisma.tenant.update({
    where: { id },
    data: {
      name: data.name,
      plan: data.plan,
    },
  });

  revalidatePath("/command/tenants");
  revalidatePath(`/command/tenants/${id}`);
  return { success: true };
}

export async function deleteTenant(id: string) {
  await ensureSuperAdmin();

  try {
    await prisma.$transaction(async (tx) => {
      await tx.tenant.delete({
        where: { id },
      });
    });

    revalidatePath("/command/tenants");
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting tenant:", error.message);
    }
    return { success: false, error: "Error al eliminar el tenant. Asegúrate de que no tenga datos vinculados críticos." };
  }
}

export async function createTenantUser(tenantId: string, data: {
  name: string;
  email: string;
  password: string;
}) {
  await ensureSuperAdmin();

  try {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: Role.tenant_admin,
        tenantId: tenantId,
      },
    });

    revalidatePath(`/command/tenants/${tenantId}`);
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating tenant user:", error.message);
    }
    return { success: false, error: "Error al crear el usuario. El email ya podría estar en uso." };
  }
}
