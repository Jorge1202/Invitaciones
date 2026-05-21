# 08-arquitectura-plantillas.md

# Especificación Técnica: Arquitectura Híbrida de Plantillas (Código + JSON)
> Sistema de renderizado de invitaciones premium con personalización multi-nivel.

## 🎯 Visión General
Para ofrecer invitaciones con animaciones de alto nivel (Cinematic experiences) y a la vez permitir una personalización total, InvitaWeb utiliza una arquitectura de **"Component Registry"**. 

Cada invitación es un **Componente React real** que consume un contrato de datos estructurado en **JSON**.

---

## 🏗️ 1. Estructura de Capas

### A. Capa de Código (Desarrollador / Super Admin)
Las plantillas se programan en código duro (`src/templates/`) usando herramientas como:
*   **Framer Motion / GSAP:** Para animaciones complejas (parallax, scroll-jacking).
*   **Tailwind CSS:** Para estilos base ultra-rápidos.
*   **Next.js:** Para renderizado en el servidor (SEO y velocidad).

### B. Capa de Esquema (Super Admin)
El Super Admin registra la plantilla en la base de datos y define el **JSON Schema**. Esto determina *qué campos* puede ver y editar el revendedor. 
*   *Ejemplo:* El Super Admin puede habilitar el campo "Mesa de Regalos" para la plantilla "Boda Diamante", pero deshabilitarlo para la plantilla "XV Valeria".

### C. Capa de Datos (Revendedor / Organizador)
El revendedor llena la información del evento. Este JSON es el "Combustible" que alimenta al componente.

---

## 📄 2. El Contrato de Datos (EventData JSON)
Basado en estándares de la industria (referencias analizadas), cada invitación debe soportar los siguientes nodos de datos:

| Sección | Campos Clave | Propósito |
| :--- | :--- | :--- |
| **Global** | `colors`, `musicUrl`, `mainBg` | Identidad visual y ambiente. |
| **Cover** | `names`, `date`, `quote`, `photo` | El impacto inicial (Hero). |
| **Family** | `parents`, `godparents` | Cortejo oficial y agradecimientos. |
| **Itinerary** | `time`, `event`, `location`, `icon` | Línea de tiempo del evento. |
| **GPS** | `address`, `googleMapsUrl` | Botones de navegación. |
| **Dress Code**| `type`, `colorPaletteImage` | Código de vestimenta sugerido. |
| **Fintech** | `bankDetails`, `registryLinks` | Mesa de regalos y lluvia de sobres. |
| **RSVP** | `deadline`, `confirmButton` | Acción de confirmación (vía WhatsApp/API). |

---

## ⚡ 3. Tipos de Experiencias

### 💎 Plantillas "Atelier" (Inmersivas)
*   **Características:** Mucho movimiento, cambio de color de fondo al hacer scroll, entrada de textos con delay, música de fondo sincronizada.
*   **Uso:** Bodas de lujo y XV años de alto presupuesto.
*   **Complejidad:** Alta (Requiere código React específico por versión).

### 📐 Plantillas "Modernas" (Eficientes)
*   **Características:** Diseño limpio, scroll tradicional, optimizadas para carga instantánea en móviles de gama baja.
*   **Uso:** Eventos corporativos, infantiles y bautizos.
*   **Complejidad:** Media (Estructura modular).

---

## 🛡️ 4. Reglas de Integridad
1.  **Versatilidad:** Un componente React debe ser capaz de renderizar con o sin ciertos nodos (ej. si el JSON no trae `parents`, la sección desaparece con elegancia).
2.  **Seguridad:** El JSON de datos se valida contra el esquema de la plantilla antes de guardarse.
3.  **Performance:** Las imágenes se procesan vía Next.js Image Optimization.

---

*Documento generado en mayo 2026 para estandarizar la creación de diseños de alta gama.*
