"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Role, Plan } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { canTenantAccessTier, type TemplateTierKey } from "@/lib/tier-features";

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

async function generateUniqueSlug(name: string, date: Date): Promise<string> {
  const year = date.getFullYear();
  const base = name
    .toLowerCase()
    .replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i")
    .replace(/ó/g, "o").replace(/ú/g, "u").replace(/ü/g, "u")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const candidate = `${base}-${year}`;
  const count = await prisma.event.count({
    where: { slug: { startsWith: candidate } },
  });
  return count === 0 ? candidate : `${candidate}-${count + 1}`;
}

export async function getEvents() {
  const { tenantId } = await ensureTenantAdmin();
  return prisma.event.findMany({
    where: { tenantId },
    include: {
      template: { select: { name: true } },
      _count: { select: { guests: true } },
    },
    orderBy: { date: "asc" },
  });
}

export async function getEventById(id: string) {
  const { tenantId } = await ensureTenantAdmin();
  return prisma.event.findFirst({
    where: { id, tenantId },
    include: {
      template: { select: { id: true, name: true, componentId: true } },
      guests: { select: { status: true } },
    },
  });
}

export async function createEvent(data: {
  name: string;
  date: string;
  location?: string;
  templateId: string;
}): Promise<{ error: string } | void> {
  const { tenantId } = await ensureTenantAdmin();

  if (!data.name.trim()) return { error: "El nombre es requerido." };
  if (!data.templateId) return { error: "Debes seleccionar una plantilla." };

  const date = new Date(data.date);
  if (isNaN(date.getTime())) return { error: "Fecha inválida." };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) return { error: "La fecha no puede ser en el pasado." };

  const latestVersion = await prisma.templateVersion.findFirst({
    where: { templateId: data.templateId },
    orderBy: { versionNumber: "desc" },
    select: { versionNumber: true },
  });
  const templateVersion = latestVersion?.versionNumber ?? 1;

  const slug = await generateUniqueSlug(data.name, date);

  const event = await prisma.event.create({
    data: {
      tenantId,
      templateId: data.templateId,
      templateVersion,
      slug,
      name: data.name.trim(),
      date,
      location: data.location?.trim() || null,
    },
  });

  revalidatePath("/studio/events");
  redirect(`/studio/events/${event.id}`);
}

export async function updateEvent(
  id: string,
  data: { name?: string; date?: string; location?: string | null }
): Promise<{ success: boolean; error?: string }> {
  const { tenantId } = await ensureTenantAdmin();

  await prisma.event.updateMany({
    where: { id, tenantId },
    data: {
      ...(data.name !== undefined && { name: data.name.trim() }),
      ...(data.date !== undefined && { date: new Date(data.date) }),
      ...(data.location !== undefined && { location: data.location?.trim() || null }),
    },
  });

  revalidatePath("/studio/events");
  revalidatePath(`/studio/events/${id}`);
  return { success: true };
}

export async function deleteEvent(id: string): Promise<{ success: boolean; error?: string }> {
  const { tenantId } = await ensureTenantAdmin();

  const guestCount = await prisma.guest.count({ where: { eventId: id, tenantId } });
  if (guestCount > 0) {
    return { success: false, error: "No se puede eliminar un evento con invitados." };
  }

  await prisma.event.deleteMany({ where: { id, tenantId } });
  revalidatePath("/studio/events");
  return { success: true };
}

export async function getAccessibleTemplates(tenantPlan: Plan) {
  await ensureTenantAdmin();
  const templates = await prisma.template.findMany({
    where: { status: { in: ["published", "featured"] } },
    select: {
      id: true,
      name: true,
      componentId: true,
      tier: true,
      category: true,
      description: true,
    },
    orderBy: { name: "asc" },
  });

  return templates.filter((t) =>
    canTenantAccessTier(tenantPlan, t.tier as TemplateTierKey)
  );
}
