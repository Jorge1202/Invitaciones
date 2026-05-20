# 07-modulo-invitados.md

# Especificación de Módulo: Gestión de Invitados (Consola Concierge)
> Centro de control logístico y CRM para el revendedor. Transforma una lista de nombres en una base de datos operativa de alto valor.

## 🎯 Propósito del Módulo
En InvitaWeb Studio, el módulo de Invitados no es una simple tabla; es una **herramienta de servicio al cliente**. El revendedor lo utiliza para gestionar la "última milla" de la invitación: asegurar que llegue, que se abra y que se confirme.

---

## 🚀 1. Funcionalidades Core (Valor para el Revendedor)

### A. El "Concierge" de Carga
*   **Importación Inteligente:** Motor para subir archivos CSV/Excel, detectando automáticamente columnas de Nombre, Email, Teléfono y Pases.
*   **Asignación de Pases:** Control granular de cuántas personas ampara cada link único.
*   **Generación de Tokens:** Creación automática de URLs irrepetibles (`/e/[slug]/[token]`) protegidas criptográficamente.

### B. Consola de Seguimiento y Tracking
*   **Tasa de Apertura (Open Rate):** Visibilidad de quién ha abierto el link y quién no, permitiendo al revendedor asesorar al cliente sobre reenvíos.
*   **RSVP Manual:** Capacidad de confirmar asistencia vía telefónica/presencial para invitados que no interactúan con la web.
*   **Historial de Cambios:** Registro de ediciones en nombres o pases para evitar confusiones con el cliente final.

### C. Automatización y Recordatorios
*   **Disparadores de WhatsApp:** Interfaz para enviar recordatorios masivos o individuales (7 días, 1 día y día del evento).
*   **Filtros Inteligentes:** "Mostrar invitados que abrieron pero no confirmaron" o "Invitados sin abrir".

---

## 💎 2. El Diferenciador: CRM de Eventos
A diferencia de una invitación PDF, este módulo construye un activo para el revendedor:
*   **Preferencias Persistentes:** Almacenamiento de restricciones alimentarias (alergias) y canciones sugeridas.
*   **Base de Datos Recurrente:** Si el cliente organiza un segundo evento, el revendedor ya cuenta con la lista depurada.

---

## 🛠️ 3. Experiencia de Usuario (Atelier UI)
La interfaz debe sentirse como una **Consola de Mando Premium**:
*   **Visualización:** Uso de Badges elegantes para estados (Pendiente, Confirmado, Declinado).
*   **Acciones Rápidas:** Botones de "Copiar Link" y "Enviar WhatsApp" accesibles sin entrar al detalle.
*   **Modo Check-in (Plan VIP):** Vista optimizada para el staff de puerta el día del evento, mostrando la validación de QRs en tiempo real.

---

## 🛡️ 4. Reglas de Negocio e Integridad
*   **Aislamiento:** Un revendedor **jamás** puede ver la lista de invitados de otro tenant.
*   **Privacidad:** Los datos de contacto están protegidos y solo son visibles para el equipo autorizado del revendedor.
*   **Denormalización:** El `tenantId` se almacena en la tabla de `Guest` para acelerar las consultas de seguridad y filtrado.

---

*Documento generado en mayo 2026 para definir la estrategia de logística de invitados.*
