✦ He creado el script de siembra (seed) y actualizado la documentación técnica para reflejar los nuevos estándares de seguridad.

  🏁 Pasos para activar el Super Admin:

   1. Configurar la Base de Datos: Asegúrate de que tu base de datos PostgreSQL esté corriendo y que la URL en el archivo .env sea correcta.
   2. Sincronizar el Esquema: Ejecuta el siguiente comando para crear las tablas en tu base de datos:

   1     npx prisma db push
   3. Ejecutar la Siembra (Seed): He configurado un script automático para crear el primer administrador. Ejecútalo con:

   1     npx prisma db seed

  🔐 Credenciales Creadas:
   * Email: admin@invitaweb.com
   * Password: admin123 (Deberás cambiarla después por seguridad)

  📄 Documentación Actualizada:
  He reescrito el archivo md/05-autenticacion-seguridad.md para alinearlo con NextAuth (Auth.js), detallando las protecciones contra ataques:
   * Hashing: bcryptjs (factor 12).
   * XSS/CSRF: Protecciones nativas y configuración de cookies seguras.
   * Inyección SQL: Prevención mediante el uso de Prisma.
   * JWT: Sesiones firmadas y seguras.

  ¿Qué te gustaría hacer ahora?
   * ¿Implementamos el Tenant Manager para que el Super Admin pueda crear revendedores desde la UI?
   * ¿O prefieres que trabajemos en el Template Engine para el renderizado de las invitaciones?