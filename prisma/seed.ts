import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@invitaweb.com";
  const adminPassword = "admin123"; // CAMBIAR EN PRODUCCIÓN

  console.log("🌱 Iniciando siembra de base de datos...");

  // 1. Verificar si ya existe el Super Admin
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Super Admin",
        password: hashedPassword,
        role: Role.super_admin,
      },
    });
    
    console.log(`✅ Super Admin creado: ${adminEmail}`);
    console.log(`🔑 Contraseña temporal: ${adminPassword}`);
  } else {
    console.log("⚠️ El Super Admin ya existe.");
  }

  // 2. Crear el Tenant #1 para Dogfooding (InvitaWeb Oficial)
  const officialTenantSlug = "invitaweb-oficial";
  const existingTenant = await prisma.tenant.findUnique({
    where: { slug: officialTenantSlug },
  });

  if (!existingTenant) {
    await prisma.tenant.create({
      data: {
        name: "InvitaWeb Oficial",
        slug: officialTenantSlug,
        plan: "vip",
        isActive: true,
      },
    });
    console.log(`✅ Tenant Oficial creado: ${officialTenantSlug}`);
  }

  console.log("🏁 Proceso de siembra completado.");
}

main()
  .catch((e) => {
    console.error("❌ Error en la siembra:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
