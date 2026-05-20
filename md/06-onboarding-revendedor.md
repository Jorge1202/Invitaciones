# 06-onboarding-revendedor.md

# Especificación de Proceso: Onboarding Atómico de Revendedores
> Estándar de creación de Tenants para garantizar integridad y eficiencia operativa.

## 🎯 Objetivo
Eliminar la fragmentación en el proceso de alta de nuevos negocios. Un `Tenant` no puede existir sin al menos un `User` con rol `tenant_admin` que lo administre. Este documento establece que la creación de ambos debe ser un proceso atómico (todo o nada).

## 🚀 1. El Formulario Atómico (Manual)
Cuando el Super Admin crea un revendedor desde el panel `/command/tenants`, el sistema solicita en una sola interfaz:

### A. Datos del Tenant (El Negocio)
* **Nombre:** Razón social o comercial.
* **Slug:** Identificador único para la URL (`negocio.invitaweb.com`).
* **Plan:** Básico, Deluxe o VIP.

### B. Datos del Usuario (El Administrador)
* **Nombre:** Nombre completo del dueño o encargado.
* **Email:** Correo electrónico de acceso.
* **Contraseña:** Contraseña temporal para el primer inicio de sesión.

---

## 🛠️ 2. Implementación Técnica (Backend)
La creación se ejecuta mediante una **Transacción de Base de Datos** (`prisma.$transaction`).

1. **Validación:** Se verifica que el Super Admin tiene permisos.
2. **Encriptación:** Se genera el hash de la contraseña usando **bcryptjs**.
3. **Persistencia:**
   * Se inserta el registro en la tabla `Tenant`.
   * Se inserta el registro en la tabla `User` vinculándolo al `Tenant` recién creado.
4. **Seguridad:** Si cualquiera de los dos pasos falla (ej. email ya registrado o slug duplicado), la base de datos revierte todos los cambios automáticamente.

---

## 💍 3. El Onboarding Automatizado (Etapa C)
En el futuro flujo self-service:
1. El usuario se registra y paga en una landing page.
2. Un webhook de **MercadoPago** dispara la acción atómica.
3. El sistema crea el Tenant, el Usuario y le envía un correo de bienvenida.

---

## 🛡️ 4. Reglas de Negocio
* **Rol Obligatorio:** El primer usuario creado siempre debe tener el rol `tenant_admin`.
* **Estado Inicial:** Por defecto, el Tenant se crea como `isActive: true`.
* **Validación de Datos:** Se deben limpiar los slugs (minúsculas, sin espacios) antes de persistir.

---

*Documento generado en mayo 2026 para estandarizar el flujo de revendedores.*
