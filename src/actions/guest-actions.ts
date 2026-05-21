"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { randomBytes } from "crypto";

async function ensureTenantAdmin(): Promise<{ tenantId: string }> {
  const session = await auth();
  if (!session?.user) throw new Error("No autenticado.");
  if (
    session.user.role !== Role.tenant_admin &&
    session.user.role !== Role.super_admin
  ) {
    throw new Error("No autorizado.");
  }
  if (!session.user.tenantId) throw new Error("Usuario sin tenant asignado.");
  return { tenantId: session.user.tenantId };
}

async function validateEventOwnership(eventId: string, tenantId: string) {
  const event = await prisma.event.findFirst({
    where: { id: eventId, tenantId },
    select: { id: true },
  });
  if (!event) throw new Error("Evento no encontrado o sin acceso.");
  return event;
}

export async function getGuests(eventId: string) {
  const { tenantId } = await ensureTenantAdmin();
  await validateEventOwnership(eventId, tenantId);

  return prisma.guest.findMany({
    where: { eventId, tenantId },
    select: {
      id: true,
      name: true,
      passes: true,
      token: true,
      status: true,
      confirmedPasses: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function createGuest(
  eventId: string,
  data: { name: string; passes?: number }
): Promise<{ success: boolean; error?: string }> {
  const { tenantId } = await ensureTenantAdmin();
  await validateEventOwnership(eventId, tenantId);

  if (!data.name.trim()) return { success: false, error: "El nombre es requerido." };

  const passes = data.passes ?? 1;
  if (passes < 1 || passes > 20) {
    return { success: false, error: "El número de pases debe estar entre 1 y 20." };
  }

  const token = randomBytes(16).toString("hex");

  await prisma.guest.create({
    data: {
      eventId,
      tenantId,
      name: data.name.trim(),
      passes,
      token,
    },
  });

  revalidatePath(`/studio/events/${eventId}/guests`);
  return { success: true };
}

export async function createGuestsBulk(
  eventId: string,
  guests: { name: string; passes: number }[]
): Promise<{ success: boolean; created: number; error?: string }> {
  const { tenantId } = await ensureTenantAdmin();
  await validateEventOwnership(eventId, tenantId);

  if (guests.length === 0) return { success: false, created: 0, error: "No hay invitados válidos." };

  const data = guests.map((g) => ({
    eventId,
    tenantId,
    name: g.name.trim(),
    passes: g.passes,
    token: randomBytes(16).toString("hex"),
  }));

  const result = await prisma.guest.createMany({ data });

  revalidatePath(`/studio/events/${eventId}/guests`);
  return { success: true, created: result.count };
}

export async function deleteGuest(
  guestId: string,
  eventId: string
): Promise<{ success: boolean; error?: string }> {
  const { tenantId } = await ensureTenantAdmin();

  const deleted = await prisma.guest.deleteMany({
    where: { id: guestId, tenantId },
  });

  if (deleted.count === 0) return { success: false, error: "Invitado no encontrado." };

  revalidatePath(`/studio/events/${eventId}/guests`);
  return { success: true };
}
