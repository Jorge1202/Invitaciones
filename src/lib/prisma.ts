import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * Helper to inject tenantId filter into Prisma queries.
 * This ensures multi-tenant isolation at the query level.
 */
export function withTenantFilter(tenantId: string) {
  return {
    where: {
      tenantId,
    },
  };
}
