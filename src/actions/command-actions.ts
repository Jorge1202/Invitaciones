"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Role, Plan, RSVPStatus } from "@prisma/client";
import { startOfMonth } from "date-fns";

async function ensureSuperAdmin() {
  const session = await auth();
  if (session?.user?.role !== Role.super_admin) {
    throw new Error("No autorizado. Se requieren permisos de Super Admin.");
  }
}

const MRR_BY_PLAN: Record<Plan, number> = {
  basic: 400,
  deluxe: 600,
  vip: 800,
};

export async function getGlobalStats() {
  await ensureSuperAdmin();

  const [
    totalTenants,
    activeTenants,
    planCounts,
    eventsThisMonth,
    totalGuests,
    confirmedGuests,
  ] = await Promise.all([
    prisma.tenant.count(),
    prisma.tenant.count({ where: { isActive: true } }),
    prisma.tenant.groupBy({
      by: ["plan"],
      where: { isActive: true },
      _count: { _all: true },
    }),
    prisma.event.count({
      where: { date: { gte: startOfMonth(new Date()) } },
    }),
    prisma.guest.count(),
    prisma.guest.count({ where: { status: RSVPStatus.confirmed } }),
  ]);

  const mrr = planCounts.reduce((acc, row) => {
    return acc + row._count._all * MRR_BY_PLAN[row.plan];
  }, 0);

  return {
    totalTenants,
    activeTenants,
    eventsThisMonth,
    totalGuests,
    confirmedGuests,
    mrr,
  };
}
