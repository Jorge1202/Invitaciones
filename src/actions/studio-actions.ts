"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Role, RSVPStatus } from "@prisma/client";

export async function getStudioStats(tenantId: string) {
  const [totalGuests, confirmedGuests] = await Promise.all([
    prisma.guest.count({ where: { tenantId } }),
    prisma.guest.count({ where: { tenantId, status: RSVPStatus.confirmed } }),
  ]);

  const responseRate =
    totalGuests > 0
      ? `${((confirmedGuests / totalGuests) * 100).toFixed(1)}%`
      : "0%";

  return { totalGuests, confirmedGuests, responseRate };
}

export async function getCurrentTenant() {
  const session = await auth();
  
  if (!session?.user?.tenantId) {
    // If a Super Admin is in Studio, they might not have a tenantId in their session
    // unless they are impersonating. For now, let's redirect if no tenantId.
    if (session?.user?.role === Role.super_admin) {
        // Super Admin might need a way to pick a tenant. 
        // For simplicity, let's assume they are here for dogfooding their own tenant.
        // We'll need to handle impersonation later.
    }
    return null;
  }

  return await prisma.tenant.findUnique({
    where: { id: session.user.tenantId },
    include: {
        _count: {
            select: { events: true, users: true }
        }
    }
  });
}
