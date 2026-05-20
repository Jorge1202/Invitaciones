# 01-super-admin.md

# Especificación de Rol: Super Admin (Dueño de la Plataforma)
> Nivel de acceso global. Enfoque 100% en gobernanza, infraestructura y dogfooding.

## 🔐 Reglas de Logueo y Autenticación
* **Proveedor:** Clerk multi-tenant.
* **Rol en base de datos:** `super_admin` con scope global.
* **Aislamiento:** Es el único rol que tiene acceso total y puede ver o modificar datos de cualquier tenant.
* **Impersonación:** Capacidad de "actuar como" cualquier tenant (incluido el tenant propio interno) sin perder el contexto de Super Admin para volver atrás.

## 🎨 Diseño y UI (Sub-marca Command)
Este panel no debe sentirse como una fiesta, sino como una **sala de control** precisa y profesional.
* **Modo Visual:** Dark mode por defecto (sin opción a light mode), fondo `midnight` (`#0B0F19`).
* **Acento:** Violeta eléctrico (`#7C3AED`) para CTAs y datos clave.
* **Tipografía:** `Inter` en todos los pesos para alta densidad de datos; `Fraunces` solo en la pantalla de bienvenida.
* **Layout:** Sidebar oscura y compacta con iconos densos (Lucide outline, stroke 1.5), header con MRR y alertas.

## 📦 Módulos del Sistema y Funcionalidades (Fase 1 - Core)

### 1. Dashboard Global
* **Contenido:** Visualización de MRR, tenants activos, eventos del mes y tasa de RSVP promedio.
* **Acción:** Navegación rápida hacia cualquier tenant del sistema.

### 2. Gestión de Tenants y Facturación
* **Acciones:** CRUD completo, suspensión, reactivación, cambio manual de planes y administración de MercadoPago.

### 3. Repositorio Maestro de Plantillas
* **Regla de Oro:** Solo el Super Admin crea, edita, publica o archiva plantillas.
* **Versionado:** Actualización de plantillas congelando las versiones de eventos activos.

### 4. Gobernanza de IA y Assets
* **Control:** Configuración de prompts de Anthropic (Claude Sonnet), monitoreo de tokens, y repositorio central de fuentes/imágenes licenciadas.

## 🚀 Módulos Plus / Innovaciones (Fase 2)

### 5. Dashboard de Clearing y Conciliación Fintech
* **Contenido:** Panel transaccional para auditar el volumen de dinero movido a través de mesas de regalos virtuales y boletaje.
* **Acción:** Cálculo, retención y conciliación de la comisión (fee) de la plataforma antes de la dispersión de fondos a los organizadores.        