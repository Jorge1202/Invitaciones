# 03-cliente-organizador.md

# Especificación de Rol: Cliente Organizador (Event Owner)
> El cliente final (los novios, festejados). Su objetivo es monitorear el evento sin fricciones.

## 🔐 Reglas de Logueo y Autenticación
* **Método:** Link mágico sin cuenta (`/stats/[token-secreto]`) o cuenta invitada con rol `event_owner` estrictamente limitada a su evento.

## 🎨 Diseño y UI
* **Estilo Visual:** Hereda el diseño de la sub-marca Studio (Light mode, tonos cálidos) o el White Label del Revendedor (VIP).
* **Voz y Tono:** Aspiracional pero práctico. Dashboard enfocado a la tranquilidad del organizador.

## 📦 Módulos del Sistema y Funcionalidades (Fase 1 - Core)

### 1. Dashboard Analítico en Tiempo Real
* **Contenido:** Total de confirmados, declinados y pendientes, con capacidad de exportación estructurada para el salón o banquete.

### 2. Flujo de Aprobación y RSVP Avanzado
* **Acción:** Da el Visto Bueno (VoBo) a la plantilla y monitorea restricciones alimentarias, alergias y canciones sugeridas.

### 3. Monitor de Acceso y Libro de Firmas (Plan VIP)
* **Contenido:** Bandeja para moderar mensajes/fotos de invitados y dashboard sincronizado en tiempo real con la app del staff en puerta.

## 🚀 Módulos Plus / Innovaciones (Fase 2)

### 4. Acomodo de Mesas Dinámico (Drag & Drop)
* **Contenido:** Panel visual interactivo donde el organizador arrastra los nombres de los invitados confirmados a círculos que representan las mesas del salón.

### 5. Consola de Control Live Photo Wall
* **Acción:** Botón de "Kill Switch" para activar o pausar la recepción de fotografías en tiempo real tomadas por los invitados, más la generación de la URL limpia para proyección.

### 6. Configuración de Regalos Fintech
* **Contenido:** Interfaz de vinculación de su cuenta bancaria (CLABE) o Stripe para la recepción directa del dinero de los regalos ("experiencias de viaje") de sus invitados.