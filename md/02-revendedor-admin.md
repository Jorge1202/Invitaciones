# 02-revendedor-admin.md

# Especificación de Rol: Revendedor Admin (Tenant Admin)
> El cliente directo del SaaS. Opera un modelo de negocio de marca blanca llave en mano.

## 🔐 Reglas de Logueo y Autenticación
* **Proveedor:** Clerk multi-tenant.
* **Rol en base de datos:** `tenant_admin`.
* **Aislamiento:** Filtrado absoluto mediante `withTenantFilter()` en Prisma. Jamás ve datos de otros revendedores.

## 🎨 Diseño y UI (Sub-marca Studio)
Debe sentirse como una **herramienta creativa premium**, cálida y profesional.
* **Modo Visual:** Light mode por defecto (fondo champagne off-white `#FBF9F6`), con superficies en blanco puro `#FFFFFF`.
* **Acento:** Terracota / rose gold (`#B8745A`) para botones y links activos.
* **Tipografía:** `Fraunces` para títulos de página e `Inter` para la UI.

## 📦 Módulos del Sistema y Funcionalidades (Fase 1 - Core)

### 1. Panel "Mi Marca" (White Label)
* **Validación VIP ($800/mes):** Permite subir logo propio, elegir un color HEX de acento y configurar un subdominio propio (`empresa.invitaweb.com`).

### 2. CRUD de Eventos y Plantillas
* **Acción:** Creación de eventos y preselección de 3-5 plantillas para su cliente final.
* **Límites:** 5 eventos simultáneos (Básico), 15 (Deluxe) o Ilimitados (VIP).

### 3. Gestión y Carga de Invitados
* **Contenido:** Motor de importación masiva (CSV) o manual, vinculando pases a tokens criptográficos únicos.

### 4. Suite IA Operativa
* **Validación Deluxe+ / VIP:** Acceso a generador de textos, predictor analítico de asistencia, bot RSVP y mensajes personalizados de WhatsApp.

## 🚀 Módulos Plus / Innovaciones (Fase 2)

### 5. Módulo de E-commerce Temático / Afiliados
* **Contenido:** Panel para configurar IDs de afiliación de Booking.com, Uber, DiDi o convenios locales.
* **Objetivo:** Monetización cruzada del tráfico de los invitados de sus propios clientes.

### 6. Interruptor de Módulos Transaccionales
* **Acción:** Panel de configuración (checkboxes) por evento para encender o apagar la "Mesa de regalos virtual" con pasarela de pago o el módulo de boletaje (Cover).