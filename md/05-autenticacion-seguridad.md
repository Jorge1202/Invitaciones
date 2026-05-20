# Especificación de Módulo: Autenticación, Autorización y Seguridad (NextAuth / Auth.js)
> Estándares de acceso seguro, gestión de tokens y arquitectura de Login Separado (Dual-Frontend) para InvitaWeb.

## 👥 1. Matriz de Logueo por Rol
El principio de menor privilegio aplica aquí:

* **👑 Super Admin:** Requiere Autenticación Fuerte. Acceso mediante Email/Password en ruta `/command/auth`.
  * *Habilitado:* Gestión global y Dogfooding.
* **🤝 Revendedor Admin (Tenant Admin):** Login con Email/Password en la ruta `/studio/auth`.
* **💍 Cliente Organizador:** Acceso mediante "Magic Link" o cuenta invitada con rol `event_owner`.
* **🎉 Invitado:** **Sin registro.** Acceso validado vía URL con token único (`/e/[slug]/[token]`).

---

## 🚪 2. Arquitectura de Login Separado
* **Punto de Entrada Studio (Revendedores):** `/studio/auth` (Light Mode / Terracota).
* **Punto de Entrada Command (Super Admin):** `/command/auth` (Dark Mode / Violeta).

---

## 🚀 3. Flujos del Sistema y Seguridad

### A. Almacenamiento Seguro de Contraseñas
* **Algoritmo:** **bcryptjs** con factor de costo (salt) de 12.
* **Protección:** Inmune a ataques de tablas arcoíris y altamente resistente a fuerza bruta.

### B. Gestión de Sesiones (JWT)
* **Estrategia:** JSON Web Tokens (JWT) firmados con `AUTH_SECRET`.
* **Duración:** 30 días con renovación automática.
* **Multi-tenancy:** El `role` y el `tenantId` se inyectan en el JWT durante el login y se propagan a la sesión.

### C. El Guardián (Middleware)
1. **Intercepción:** El `middleware.ts` valida cada petición.
2. **Aislamiento:** 
   * Impide que un `tenant_admin` acceda a `/command`.
   * Redirige a la página de login correspondiente si no hay sesión.
   * Permite que el `super_admin` visite `/studio` para soporte/dogfooding.

---

## 🔑 4. Normas y Certificaciones de Protección

Para proteger la infraestructura SaaS:

1.  **Prevención de Inyección:** Uso de **Prisma ORM** que sanitiza automáticamente todas las consultas SQL.
2.  **Protección contra XSS:** 
    *   Cookies de sesión configuradas como `HttpOnly`, `Secure` y `SameSite=Lax`.
    *   Escape automático de caracteres en componentes de React.
3.  **Protección CSRF:** NextAuth incluye protección intrínseca contra Cross-Site Request Forgery.
4.  **Rate Limiting:** (Recomendado) Implementar en el futuro con Upstash Redis para prevenir ataques de fuerza bruta en los endpoints de login.
5.  **Aislamiento de Datos:** El helper `withTenantFilter()` es obligatorio en todas las consultas de negocio para garantizar que un tenant nunca vea datos de otro.

---
- El envío de correos se gestionará a través de la API de **Resend**.
  
**Plantillas Base Requeridas:**
* `auth_welcome`: Correo de bienvenida tras pago exitoso.
* `auth_verify_email`: Token link para validar la propiedad del correo.
* `auth_reset_password`: Link seguro para restablecer contraseña.
* `auth_magic_link`: Enlace de acceso sin contraseña para clientes organizadores.
* `billing_failed`: Alerta de fallo en el cobro recurrente de MercadoPago.

---

## 🛡️  6. Políticas de Seguridad y Validaciones (OWASP)
Para proteger la infraestructura SaaS y la data de los revendedores:

1. **Protección contra Fuerza Bruta:** Uso de **Upstash Redis** para implementar Rate Limiting estricto en APIs custom, sumado a las protecciones nativas de Clerk.
2. **Protección CSRF (Cross-Site Request Forgery):** Uso de validaciones de cabeceras `Origin` y `Referer` en Server Actions y Route Handlers.
3. **Protección XSS (Cross-Site Scripting):** Sanitización estricta de cualquier input del usuario, especialmente en los módulos de "Libro de Firmas" para evitar que los invitados inyecten scripts maliciosos.
4. **Segregación Multi-Tenant (Nivel de Datos):** La validación más importante del sistema. El `tenantId` extraído del *Access Token* debe inyectarse automáticamente en TODAS las consultas de Prisma a través del helper
    `withTenantFilter()`. **Ninguna consulta debe recibir el `tenantId` explícitamente desde el frontend.**
5. **Kill Switch (Revocación Inmediata de Sesión):** Los JWT de Clerk tienen un tiempo de vida (15-30 min). Para revocar el acceso *inmediatamente* (por fraude o impago rebotado detectado en MercadoPago), el Super Admin
    dispara una acción que registra el `tenantId` en una *Lista Negra* dentro de **Upstash Redis**. El `middleware.ts` de Next.js verifica esta caché en milisegundos en cada request, expulsando al usuario al instante sin esperar
    la expiración natural del token.