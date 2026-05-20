He realizado la migración completa de Clerk a NextAuth (Auth.js), fortaleciendo la seguridad del sistema y actualizando la arquitectura de autenticación según lo solicitado.

  🛡️  Cambios y Mejoras de Seguridad:

   1. Esquema de Base de Datos (Prisma):
       * Implementé las tablas necesarias para Auth.js: User, Account, Session y VerificationToken.
       * La tabla User ahora incluye un campo password para autenticación local segura.
       * Mantuve la integridad multi-tenant con los campos role y tenantId.

   2. Seguridad de Contraseñas:
       * Integré bcryptjs para el hashing de contraseñas, asegurando que nunca se almacenen en texto plano, cumpliendo con estándares de protección contra ataques de diccionario y fuerza bruta.

   3. Configuración de NextAuth (Auth.js v5):
       * Implementé el Credentials Provider para login con Email/Password.
       * Configuré la Estrategia JWT con una duración de 30 días.
       * Personalicé los callbacks para inyectar el role y tenantId en la sesión y el token, permitiendo un acceso rápido y tipado.

   4. Middleware de Seguridad (NextAuth native):
       * El middleware.ts ahora utiliza la función auth de NextAuth.
       * Mantiene la lógica de "Guardián": redirige a /command/auth o /studio/auth según el destino, y bloquea accesos no autorizados basados en roles.

   5. Interfaces de Autenticación Personalizadas:
       * Reconstruí las páginas de login (/command/auth y /studio/auth) desde cero usando formularios nativos de React, manteniendo la estética Dark Mode (Command) y Light Mode (Studio) definida previamente.

   6. Tipado Estricto:
       * Creé src/types/next-auth.d.ts para extender los tipos de Session y User de NextAuth, eliminando cualquier uso de any en el flujo de autenticación.

  📁 Archivos Actualizados:
   * prisma/schema.prisma (Nuevas tablas de Auth)
   * src/auth.ts (Configuración central de Auth.js)
   * src/middleware.ts (Guardián de rutas actualizado)
   * src/app/command/layout.tsx (Acceso a sesión del lado del servidor)
   * src/components/command/header.tsx (Cerrar sesión actualizado)
   * .env (Variables de AUTH_SECRET y AUTH_URL configuradas)

  El sistema de autenticación ahora es totalmente independiente y bajo tu control. ¿Te gustaría que creemos una Seed Script para insertar el primer Super Admin en la base de datos y que puedas probar el login?_
si 