# InvitaWeb — Documento Maestro del Negocio
> Plataforma SaaS multi-tenant de invitaciones digitales web para LATAM  
> Versión 1.1 · Mayo 2026

**Documentos relacionados:**
- [`invitaweb-brand-guidelines.md`](./invitaweb-brand-guidelines.md) — Sistema de identidad visual (Command + Studio + capa pública)

**Cambios desde v1.0:**
- Nueva sección 10: Política de Plantillas (centralizadas, versionadas, con niveles de personalización)
- Nueva sección 13: Estrategia de Validación (dogfooding como Tenant #1)
- Nueva sección 15: Roadmap de IA por Capas (texto → estilo → imágenes)
- Sección 16 (Roadmap Técnico) revisada con enfoque "Super Admin primero"

---

## Tabla de Contenido

1. [¿Qué es el producto?](#1-qué-es-el-producto)
2. [El modelo de negocio](#2-el-modelo-de-negocio)
3. [Las 3 etapas de crecimiento](#3-las-3-etapas-de-crecimiento)
4. [Análisis de competencia](#4-análisis-de-competencia)
5. [Diferenciadores reales](#5-diferenciadores-reales)
6. [Planes y precios](#6-planes-y-precios)
7. [Tipos de usuario y accesos](#7-tipos-de-usuario-y-accesos)
8. [Vistas por rol](#8-vistas-por-rol)
9. [Módulos de la plataforma](#9-módulos-de-la-plataforma)
10. [Política de plantillas](#10-política-de-plantillas)
11. [Stack tecnológico](#11-stack-tecnológico)
12. [Flujo operativo](#12-flujo-operativo)
13. [Estrategia de validación: dogfooding](#13-estrategia-de-validación-dogfooding)
14. [Números del negocio](#14-números-del-negocio)
15. [Roadmap de IA por capas](#15-roadmap-de-ia-por-capas)
16. [Roadmap técnico](#16-roadmap-técnico)

---

## 1. ¿Qué es el producto?

**InvitaWeb** es una plataforma SaaS multi-tenant para crear, gestionar y distribuir invitaciones digitales web personalizadas para eventos sociales (bodas, XV años, bautizos, graduaciones, eventos corporativos).

### La diferencia clave vs una invitación normal

| Invitación tradicional / PDF | InvitaWeb |
|---|---|
| Mismo contenido para todos | Cada invitado ve su nombre y pase |
| No sabes quién confirmó | Dashboard en tiempo real |
| Confirman por WhatsApp manualmente | RSVP automatizado |
| No hay seguimiento post-envío | Recordatorios automáticos |
| El organizador persigue invitados | El sistema trabaja solo |

### El producto desde la perspectiva del invitado

Cada invitado recibe un link único e irrepetible por WhatsApp:

```
tudominio.com/e/boda-ana-carlos/tkn-maria-garcia-x7k2
```

Al abrirlo ve:
- Su nombre personalizado de forma prominente
- Cuántos pases tiene asignados
- Todos los detalles del evento
- Botón de confirmación de asistencia (RSVP)

---

## 2. El modelo de negocio

### ¿A quién le vendes?

El cliente directo **no es** la novia ni la mamá de la quinceañera.  
El cliente directo es el **revendedor** (wedding planner, fotógrafo, salón de eventos, emprendedora digital).

```
Tú (plataforma)
    └── Cobra membresía mensual al revendedor
            └── Revendedor crea invitaciones para sus clientes
                    └── Cliente final (novia, organizador) accede a estadísticas
                            └── Invitados reciben link único
```

### Por qué este modelo es poderoso

- No dependes de que cada novia te encuentre individualmente
- Un revendedor activo = múltiples eventos al mes = ingreso constante
- Tu esfuerzo comercial se enfoca en pocos clientes de alto valor
- Cada revendedor trae sus propios clientes finales

---

## 3. Las 3 etapas de crecimiento

### Etapa B — Servicio (Arranque inmediato)
> Tú operas todo manualmente. Generás ingresos desde la semana 1.

- Tú creas cada invitación en tu admin panel
- Cobras por evento ($300–$600 MXN por invitación)
- Aprendes el mercado con clientes reales
- Construyes la plataforma con feedback real

**Objetivo:** 5–10 clientes pagando, $3,000–$5,000 MXN/mes

---

### Etapa C — Revendedores (El negocio escalable)
> Revendedores usan tu plataforma. Tú no tocas nada operativo.

- Wedding planners, fotógrafos, salones pagan membresía mensual
- Ellos crean y gestionan sus propios eventos
- Tú cobras recurrente sin intervenir en cada evento
- Multi-tenant: cada revendedor ve solo sus datos

**Objetivo:** 10–30 revendedores activos, $5,000–$24,000 MXN/mes

---

### Etapa A — SaaS Self-Service (Escala total)
> Clientes finales se registran y crean sus invitaciones solos.

- Plataforma pública con onboarding guiado
- Editor visual sin necesidad de diseño
- Pagos automáticos por evento o suscripción
- IA asiste en todo el proceso

**Objetivo:** Producto que crece solo, sin límite de escala

---

## 4. Análisis de Competencia

### Competidores identificados en el mercado LATAM

| Empresa | Modelo | Precio | Fortaleza | Debilidad |
|---|---|---|---|---|
| Creaciones Manitas | Franquicia revendedor | $400–$800 MXN membresía | Red de revendedores | No tienen plataforma propia robusta |
| Invitaciones Skary | Servicio B2C | Por evento | Diseño visual atractivo | Manual, sin automatización real |
| Digital RSVP | Servicio B2C | Desde $295 MXN | Precio bajo | Sin diferenciadores técnicos |
| Megapack/Plantillas | Venta de plantillas | $100 MXN paquete | Volumen, precio | No es una plataforma, es un archivo |

### Lo que TODOS ofrecen (mínimo del mercado)

- RSVP básico (botón confirmar / declinar)
- Cuenta regresiva al evento
- Música de fondo
- Álbum de fotos
- Enlace a Google Maps
- Diseños bonitos

### Demanda real detectada en redes

Usuarios buscando activamente en Facebook:

> *"Busco quien realice invitaciones digitales donde se pueda poner la ubicación directa a Google Maps"*

> *"Alguien que realice invitaciones digitales me urge 😢🙏"*

**Conclusión:** El mercado existe, está activo y tiene demanda no satisfecha. Nadie está cubriendo las necesidades operativas avanzadas del organizador.

---

## 5. Diferenciadores Reales

Lo que **ningún competidor** ofrece actualmente en LATAM a este precio:

---

### 🎯 Check-in con QR en la puerta del evento
El diferenciador más poderoso para cerrar ventas a salones y planners.

- Cada invitado tiene un QR único generado en su invitación
- El día del evento, el staff escanea el QR con una app simple
- El sistema confirma identidad y número de personas en tiempo real
- El organizador ve desde su teléfono cuántos entraron y quiénes faltan
- Detecta si alguien intenta entrar con un QR de otro invitado

**Por qué importa:** Elimina las listas en papel, el caos en la entrada y las coladas.

---

### 📖 Libro de Firmas Digital
El feature más emocional. El que genera referidos.

- Sección en la invitación donde invitados dejan mensajes antes/después del evento
- Acepta texto, fotos desde la cámara y audio de 30 segundos
- Los novios tienen un álbum permanente de mensajes de sus invitados
- Se puede visualizar como timeline o álbum visual

**Por qué importa:** Las personas lo comparten en redes. Marketing orgánico gratuito.

---

### 🍽️ Preferencias del Invitado en el RSVP
Datos que el organizador necesita y nadie recolecta automáticamente.

Al confirmar asistencia, el invitado responde:
- ¿Tienes restricción alimentaria? (vegetariano, celiaco, alergia específica)
- ¿Cuántas personas confirmas de tu pase? (si tiene pase para 2, puede confirmar 1)
- ¿Tienes alguna canción que no puede faltar? (opcional, crea engagement)

El organizador exporta estos datos directo al catering y al DJ. Hoy lo hacen por WhatsApp manualmente.

---

### 🔔 Recordatorios Automáticos por WhatsApp
El sistema trabaja solo. El organizador no toca nada.

```
7 días antes  → "Hola María, recuerda que la boda de Ana y Carlos 
                  es el próximo sábado 🎉 Tu pase es para 2 personas."

1 día antes   → "¡Mañana es el gran día! Aquí tu QR de entrada 👇"

Día del evento → "¡Hoy es el día! El evento comienza a las 7 PM. 
                   Toca aquí para ver la ubicación 📍"
```

Implementado vía Twilio + WhatsApp Business API.

---

### 🎬 Video de Invitación Personalizado
El upgrade premium que justifica el plan VIP.

- Los novios graban un video corto (30–60 segundos)
- El video se reproduce automáticamente al abrir la invitación
- Crea una experiencia emocional antes de ver los detalles
- Diferencial total vs cualquier competidor

---

### 🗺️ Itinerario Multi-Sede
Para eventos con múltiples locaciones (muy común en bodas).

```
4:00 PM → Ceremonia Religiosa — Parroquia San Francisco [Ver en Maps]
6:30 PM → Cocktail — Jardín Anexo [Ver en Maps]
8:00 PM → Cena y Fiesta — Salón Los Olivos [Ver en Maps]
```

Cada locación con su propio botón de Maps. Notificación automática cuando cambia de sede.

---

### 🤖 Suite de Inteligencia Artificial

| Módulo IA | Qué hace | Plan |
|---|---|---|
| Generador de texto | Crea el texto de la invitación basado en datos del evento | Deluxe+ |
| Personalizador de mensajes | Genera mensaje de WhatsApp único por invitado según su relación | VIP |
| Predictor de asistencia | Estima asistencia final basado en patrones de RSVP | Deluxe+ |
| Bot RSVP WhatsApp | Entiende respuestas libres por WhatsApp y actualiza el sistema | VIP |

Ver sección 15 (Roadmap de IA por Capas) para el plan de implementación por fases.

---

### Cuadro comparativo completo

| Feature | Competencia | InvitaWeb Básico | InvitaWeb Deluxe | InvitaWeb VIP |
|---|---|---|---|---|
| RSVP básico | ✅ | ✅ | ✅ | ✅ |
| Countdown | ✅ | ✅ | ✅ | ✅ |
| Música | ✅ | ✅ | ✅ | ✅ |
| Álbum de fotos | ✅ | ✅ | ✅ | ✅ |
| Google Maps | ✅ | ✅ | ✅ | ✅ |
| Itinerario multi-sede | ❌ | ❌ | ✅ | ✅ |
| Preferencias RSVP | ❌ | ❌ | ✅ | ✅ |
| Recordatorios WhatsApp | ❌ | ❌ | ✅ | ✅ |
| Estadísticas en tiempo real | ❌ | ❌ | ✅ | ✅ |
| IA generadora de texto | ❌ | ❌ | ✅ | ✅ |
| Predictor de asistencia IA | ❌ | ❌ | ✅ | ✅ |
| Check-in QR en puerta | ❌ | ❌ | ❌ | ✅ |
| Libro de firmas digital | ❌ | ❌ | ❌ | ✅ |
| Video de invitación | ❌ | ❌ | ❌ | ✅ |
| Bot RSVP WhatsApp | ❌ | ❌ | ❌ | ✅ |
| Mensajes personalizados IA | ❌ | ❌ | ❌ | ✅ |
| White label (logo propio) | ❌ | ❌ | ❌ | ✅ |

---

## 6. Planes y Precios

> Precios para revendedores (membresía mensual). El revendedor cobra a sus clientes finales por separado.

### 🌱 Plan Básico — $400 MXN/mes
- Hasta 5 eventos activos simultáneos
- 3 plantillas disponibles
- Hasta 100 invitados por evento
- RSVP básico (confirmar / declinar)
- Countdown, música, fotos, Maps
- Soporte por email

### ⭐ Plan Deluxe — $600 MXN/mes
Todo lo del Básico, más:
- Hasta 15 eventos activos
- 8 plantillas disponibles
- Hasta 300 invitados por evento
- Itinerario multi-sede
- Preferencias en RSVP (alergias, canciones)
- Recordatorios automáticos por WhatsApp
- Estadísticas en tiempo real para el organizador
- IA generadora de texto de invitación
- Predictor de asistencia IA

### 👑 Plan VIP — $800 MXN/mes
Todo lo del Deluxe, más:
- Eventos ilimitados
- Todas las plantillas
- Invitados ilimitados por evento
- Check-in QR en la puerta del evento
- Libro de firmas digital (texto, foto, audio)
- Video de invitación personalizado
- Bot RSVP por WhatsApp (entiende respuestas libres)
- Mensajes de WhatsApp personalizados por invitado (IA)
- White label (logo y colores del revendedor)
- Subdominio propio (revendedor.tudominio.com)
- Soporte prioritario

---

## 7. Tipos de Usuario y Accesos

### Jerarquía multi-tenant

```
👑 Super Admin (tú — scope global)
    │
    ├── 🤝 Tenant: "Wedding Dreams" (revendedor 1)
    │       ├── 💍 Evento: Boda de Ana y Carlos
    │       │       └── 🎉 150 invitados con links únicos
    │       └── 🎀 Evento: XV de Sofía
    │
    └── 🤝 Tenant: "Momentos Mágicos" (revendedor 2)
            └── 💍 Evento: Boda de Luis y María
```

---

### 👑 Super Admin
**Quién es:** Tú, el dueño de la plataforma.

**Acceso:** Total. Ve y puede modificar cualquier dato de cualquier tenant.

**Puede hacer:**
- CRUD completo de tenants y planes
- Crear y editar plantillas maestras (ver sección 10)
- Ver métricas globales (MRR, tenants activos, eventos, RSVP totales)
- Configurar prompts y módulos de IA
- Ver logs del sistema y errores
- Suspender / activar tenants
- Gestionar facturación global
- **Operar como tenant** (durante Etapa B, ver sección 13)

---

### 🤝 Revendedor (Tenant Admin)
**Quién es:** Wedding planner, fotógrafo, salón de eventos, emprendedora digital.

**Acceso:** Solo su tenant. Jamás ve datos de otros revendedores.

**Puede hacer:**
- Crear y gestionar sus eventos
- Cargar listas de invitados (manual o CSV)
- **Elegir plantillas del catálogo según su plan** (no puede crear ni subir)
- Personalizar dentro de los carriles permitidos (ver sección 10)
- Usar herramientas de IA según su plan
- Compartir acceso al cliente organizador
- Ver estadísticas de sus eventos
- Gestionar su suscripción y pagos
- Configurar su perfil y branding (plan VIP)

---

### 💍 Cliente Organizador (Event Owner)
**Quién es:** La novia, la mamá de la quinceañera, quien organiza el evento.

**Acceso:** Solo su evento específico. El revendedor le otorga acceso.

**Dos formas de acceso:**
1. **Link mágico** (sin cuenta): URL única temporal con token secreto. Recomendado para eventos simples.
2. **Cuenta propia**: Email + contraseña con rol "Event Owner". Para eventos grandes con seguimiento diario.

**Puede ver:**
- Dashboard en tiempo real de su evento
- Lista de invitados con estado de RSVP
- Gráficas de confirmaciones por día
- Predicción de asistencia final
- Preferencias recolectadas (alergias, canciones)
- Exportar reporte para catering / salón

**Puede hacer:**
- Dar VoBo al preview de la invitación antes de distribución
- Elegir entre el subconjunto curado de plantillas que el revendedor preselecciona (3–5 opciones)
- Editar textos finales de la invitación
- Aprobar/rechazar variaciones de IA

**No puede:**
- Crear nuevos eventos
- Ver otros eventos del tenant
- Acceder al catálogo completo de plantillas (solo a las preseleccionadas)
- Modificar la estructura de la invitación

---

### 🎉 Invitado
**Quién es:** Cualquier persona que recibe el link por WhatsApp.

**Acceso:** Solo su invitación personal. Sin registro.

**Ve:**
- Su nombre de forma prominente
- Cuántos pases tiene asignados
- Todos los detalles del evento
- Itinerario (si el organizador lo configuró)
- Countdown regresivo
- Fotos y música del evento
- Ubicación con botón directo a Maps

**Puede hacer:**
- Confirmar o declinar asistencia
- Indicar cuántas personas confirma (dentro de su pase)
- Seleccionar preferencias alimentarias
- Sugerir una canción
- Dejar mensaje en el libro de firmas
- Agregar evento a su calendario (Google / Apple)

---

## 8. Vistas por Rol

### Super Admin — Pantallas

| Pantalla | Qué ve | Acciones clave |
|---|---|---|
| Dashboard Global | MRR, tenants activos, eventos del mes, tasa RSVP promedio | Navegar a cualquier tenant |
| Gestión de Tenants | Lista de revendedores, plan, estado, último acceso | Crear, editar, suspender, cambiar plan |
| Plantillas Maestras | Todas las plantillas por categoría, plan, estado y versión | Crear, editar, versionar, archivar, asignar a planes |
| Biblioteca de Assets | Fuentes, imágenes de stock, iconos centralizados | Subir, categorizar, validar licencias |
| Configuración IA | Prompts por módulo, tokens consumidos, costo API | Editar prompts, activar/desactivar por plan |
| Reportes Globales | Ingresos, churn, eventos por categoría, crecimiento | Exportar reportes |
| **Operar como Tenant** | Vista del tenant propio (Etapa B) | Crear eventos directamente |

---

### Revendedor — Pantallas

| Pantalla | Qué ve | Acciones clave |
|---|---|---|
| Mi Dashboard | Eventos activos, invitados gestionados, tasa de confirmación, días del plan | Crear evento, ir a IA |
| Mis Eventos | Lista con nombre, tipo, fecha, invitados/confirmados, estado | CRUD de eventos |
| Gestión de Evento | Detalle: plantilla, fotos, música, invitados, links | Configurar todo el evento |
| Catálogo de Plantillas | Plantillas disponibles para su plan (filtros por tipo/mood) | Elegir, preseleccionar para organizador |
| Herramientas IA | Generador de texto, personalizador de mensajes, predictor | Generar y copiar contenido |
| Mi Suscripción | Plan, próximo cobro, historial de pagos, límites vs consumido | Cambiar plan, actualizar pago |

---

### Cliente Organizador — Pantallas

| Pantalla | Qué ve | Acciones clave |
|---|---|---|
| Dashboard del Evento | Confirmados ✅, declinados ❌, pendientes 🕐, % respuesta, predicción IA | Filtrar, exportar |
| Lista de Invitados | Nombre, pases, estado RSVP, fecha confirmación, preferencias | Buscar, filtrar por estado |
| Estadísticas | Gráfica de confirmaciones por día, horarios de respuesta, tendencia | Cambiar rango, exportar PDF |
| Vista Previa | Cómo ve la invitación cualquier invitado | Compartir link de prueba, dar VoBo |
| Selección de Plantilla | Subconjunto curado por el revendedor (3–5 opciones) | Elegir definitiva, ver variaciones |

---

### Invitado — Pantallas

| Pantalla | Contenido |
|---|---|
| Invitación Personal | Video intro (VIP), nombre del invitado, pases, detalles del evento, countdown |
| RSVP | Confirmar/declinar, número de personas, restricciones, canción sugerida |
| Confirmación | Mensaje de confirmación personalizado, QR de entrada (plan VIP) |
| Libro de Firmas | Formulario para dejar mensaje, foto o audio |

---

## 9. Módulos de la Plataforma

### Módulos Core (todos los planes)

| Módulo | Descripción |
|---|---|
| **Auth & Onboarding** | Clerk multi-tenant. Login, registro de revendedores, invitación de clientes, tokens únicos para invitados |
| **Tenant Manager** | CRUD de tenants. Planes, límites, estado. Solo Super Admin |
| **Event Manager** | CRUD de eventos por tenant. Tipo, fecha, lugar, plantilla, configuración general |
| **Guest Manager** | Lista de invitados. Carga individual o CSV. Token único por invitado. Pases asignados |
| **Link Generator** | URLs únicas por invitado: `/e/[slug]/[token]`. Tracking de apertura |
| **RSVP Engine** | Motor de confirmaciones en tiempo real. Estados: pendiente / confirmado / declinado |
| **Template Engine** | Plantillas renderizadas con datos del evento e invitado. Lee config JSON (ver sección 10) |
| **Template Manager** | Admin CRUD de plantillas con versionado, estados y categorización. Solo Super Admin |
| **Asset Library** | Fuentes, imágenes de stock e iconos centralizados. Solo Super Admin |
| **Media Manager** | Subida de fotos y música por evento. Cloudflare R2. Límites por plan. Optimización de imágenes |

### Módulos de Valor (plan Deluxe+)

| Módulo | Descripción |
|---|---|
| **Analytics Dashboard** | Estadísticas por evento en tiempo real: gráficas, tasa de respuesta, exportación |
| **Itinerary Manager** | Configuración de múltiples sedes con horarios y Maps |
| **Guest Preferences** | Recolección de restricciones alimentarias, número de asistentes, canción |
| **WhatsApp Reminders** | Recordatorios automáticos vía Twilio 7 días, 1 día y día del evento |
| **AI Suite** | Generador de texto, predictor de asistencia. Anthropic API |

### Módulos Premium (plan VIP)

| Módulo | Descripción |
|---|---|
| **QR Check-in** | Generación de QR por invitado. App de escaneo para el staff. Dashboard de entradas en tiempo real |
| **Digital Guestbook** | Libro de firmas: texto, foto, audio por invitado. Álbum permanente para el organizador |
| **Video Invitation** | Subida y reproducción de video intro al abrir la invitación |
| **WhatsApp Bot RSVP** | Bot que entiende respuestas libres. Anthropic API + Twilio |
| **AI Message Personalizer** | Genera mensaje de WhatsApp único por invitado según su relación con el organizador |
| **White Label & Branding** | Logo, colores y subdominio propio del revendedor |

### Módulos de Infraestructura

| Módulo | Descripción |
|---|---|
| **Billing & Plans** | MercadoPago. Suscripciones automáticas. Cambio de plan. Historial de pagos |
| **Notifications** | Emails transaccionales vía Resend: bienvenida, confirmación RSVP, alerta de renovación |
| **Settings** | Configuración de perfil por tenant. Preferencias del sistema |

### Dependencias entre módulos

```
Billing          → activa/desactiva módulos según plan
Auth             → protege todas las rutas por rol
Tenant Manager   → define el scope de todos los datos
Template Manager → fuente única de plantillas (solo Super Admin)
Event Manager    → requiere Tenant + asigna Template (de versión específica)
Guest Manager    → requiere Event + Link Generator
RSVP Engine      → requiere Guest Manager + Notifications
Analytics        → consume datos de RSVP Engine
WhatsApp Bot     → requiere RSVP Engine + AI Suite + Twilio
QR Check-in      → requiere Guest Manager + Link Generator
AI Suite         → consume Event + Guest data → Anthropic API
```

---

## 10. Política de Plantillas

> Las plantillas son el corazón del producto. Son activo de la empresa, no input del usuario.

### Regla fundamental

**Solo el Super Admin puede crear, editar, publicar o archivar plantillas.** Ningún revendedor, ni cliente organizador, ni invitado puede subir o crear plantillas. Los revendedores únicamente eligen y personalizan dentro de los carriles permitidos.

### Por qué esta política

**1. Elimina el riesgo legal de raíz.**  
Si un revendedor pudiera subir templates, eventualmente alguien subiría una de Frozen, Spiderman o Bluey. Cuando Disney mande el DMCA, la plataforma entera queda expuesta — no solo el revendedor. Centralizar pone la responsabilidad en un solo lugar (tú) donde puedes garantizar que todo es original o licenciado.

**2. Convierte el catálogo en activo de la empresa.**  
Cada plantilla es propiedad intelectual de InvitaWeb. En 18 meses tienes una biblioteca de 50–80 plantillas que un competidor tardaría más de un año en replicar. Esto es un moat real, no un feature.

**3. Garantiza calidad consistente.**  
Todo lo que se publica pasa por filtro estético. Nunca te vas a avergonzar de una invitación generada en tu plataforma. Es la diferencia entre Linear y Trello, entre Apple y Samsung: catálogo curado vs bazar abierto.

**4. Habilita el modelo de planes claramente.**  
Básico = 3 plantillas, Deluxe = 8, VIP = todas. Si las plantillas fueran user-generated, este sistema se rompe.

**5. Define la dirección de la IA correctamente.**  
La IA no genera plantillas desde cero — eso era el camino caro, lento y legalmente delicado. La IA **customiza dentro de plantillas aprobadas**.

### Niveles de personalización

El truco para que esta restricción no se sienta como una jaula es darle al revendedor carriles claros de personalización dentro de la plantilla:

| Nivel | Quién puede cambiar | Qué puede cambiar |
|---|---|---|
| **Estructura** | Solo Super Admin | Bloques del template, layout, animaciones, código |
| **Estilo** | Revendedor (todos los planes) | Paleta de colores (tokens primarios), hero image desde biblioteca curada, fuente del par aprobado |
| **Contenido** | Revendedor + IA | Textos, nombres, fechas, itinerario, música, fotos del evento |
| **Branding** | Revendedor VIP | Logo propio, color de acento del tenant en componentes seleccionados |

### Versionado de plantillas

**Regla:** Cada plantilla tiene versiones. Cuando edites una plantilla ya publicada, los eventos existentes que la usaban quedan **congelados en la versión que tenían al crearse**.

```
Template "Boda Elegante" v1.0  → usado por evento "Boda Ana y Carlos" (congelado en v1.0)
                          v1.1  → mejora menor publicada
                          v2.0  → cambio mayor publicado
                                  → nuevos eventos usan v2.0
                                  → "Boda Ana y Carlos" sigue en v1.0
```

**Por qué esto importa:** Puedes mejorar plantillas continuamente sin romper eventos en producción. Si un revendedor lleva 3 meses construyendo un evento y de pronto la plantilla cambia, el daño reputacional es serio. El versionado previene esto.

**Implementación:** Cada `Event` guarda `template_id` + `template_version`. El renderer carga la versión específica, no la última. Cuando un evento se cierra (pasa la fecha), opcionalmente puede migrarse a la última versión.

### Estados del template

Cada plantilla atraviesa un ciclo de vida claro:

| Estado | Significado | Visible para |
|---|---|---|
| `draft` | En construcción, no disponible | Solo Super Admin |
| `published` | Disponible en el catálogo | Revendedores según su plan |
| `featured` | Destacado en la galería | Aparece primero en filtros |
| `archived` | Ya no aparece para nuevos eventos | Eventos existentes la siguen usando |

Sin estados, te llenas de plantillas viejas sin saber cuáles están vivas.

### Categorización del catálogo

Con 50 plantillas en el catálogo, el revendedor necesita filtrar. Se sugieren **dos ejes de clasificación**:

**Por tipo de evento:**
- Boda
- XV años
- Bautizo / Comunión
- Cumpleaños infantil
- Cumpleaños adulto
- Graduación
- Corporativo
- Baby shower
- Despedida de soltera/o
- Aniversario

**Por mood / estilo:**
- Elegante
- Rústico
- Moderno / minimalista
- Romántico
- Divertido / casual
- Tropical / playa
- Vintage / retro
- Lujo / glamour

Cada plantilla lleva al menos un tag de cada eje. El revendedor filtra por combinación: "Boda + Rústico", "XV años + Moderno", etc.

### Selección por parte del organizador

El **cliente organizador no accede al catálogo completo**. El flujo correcto:

```
Revendedor → preselecciona 3-5 plantillas compatibles con el evento
           → comparte link al Organizer Panel
               → Organizador ve los 3-5, elige uno
                   → Da VoBo, dispara distribución
```

Esto reduce idas y vueltas, hace que el organizador se sienta dueño de la decisión, y mantiene la curaduría profesional del revendedor (que es lo que el cliente final está pagando).

### Biblioteca de Assets (centralizada)

Las plantillas referencian assets centralizados, también gestionados solo por Super Admin:

- **Fuentes**: solo fuentes con licencia comercial (Google Fonts, Adobe Fonts via acuerdo, fuentes compradas)
- **Imágenes de stock**: Unsplash, Pexels, o stock comprado. Categorizadas por tema (bodas, infantil, corporativo, etc.)
- **Iconos**: Lucide o equivalente, consistente con el brand system
- **Música**: solo tracks royalty-free o licenciados

Esto evita problemas de licencias de fuentes y de stock a futuro, y garantiza consistencia visual entre plantillas.

### Restricciones de temática (regla legal)

**No se permiten plantillas que usen marcas registradas o personajes con copyright.** Cuando un cliente pide una temática específica de franquicia, se mapea a un equivalente genérico:

| El cliente pide | Plantilla disponible |
|---|---|
| Cars / Disney | Autos de carrera (genérico) |
| Frozen | Princesa de hielo / invierno mágico |
| Spiderman / Marvel | Superhéroe / héroe arácnido |
| Bluey | Perritos animados / familia canina |
| Pokémon | Aventura monstruos coleccionables |
| Bridgerton | Romance vintage / regencia |

Esto es lo que hacen las imprentas honestas y plataformas serias. El cliente entiende y queda satisfecho — sin exponer a la empresa a demandas.

### Evolución futura del catálogo

Esta política abre tres caminos interesantes para más adelante:

**Designer Marketplace (mes 18+).**  
Invitar a diseñadores externos a contribuir plantillas bajo curaduría con revenue share. Tú apruebas todo, ellos diseñan. Multiplica el catálogo sin que tú diseñes más.

**Plantillas patrocinadas / colaboraciones.**  
Plantillas en colaboración con salones famosos, fotógrafos reconocidos o influencers de bodas. "Plantilla diseñada por XYZ Wedding Planner". Plan VIP only.

**Bundles temáticos.**  
"Pack Bodas Mexicanas Premium" — 5 plantillas curadas que se venden como upgrade puntual además de la membresía. Ingreso adicional.

### Catálogo recomendado al lanzar

Para el MVP, **6 plantillas iniciales** (no 3) — suficiente para mostrar variedad sin ser sobrecargo:

- 2 plantillas de boda (1 elegante + 1 rústica)
- 2 plantillas de XV años (1 moderna + 1 romántica)
- 1 plantilla de bautizo
- 1 plantilla infantil (estilo "autos de carrera" o "princesa")

Cada plantilla debe soportar **al menos 3 paletas de color** para que un mismo template se sienta diferente según el evento.

---

## 11. Stack Tecnológico

### Frontend & Backend
- **Next.js 15** — App Router, Server Components, API Routes
- **TypeScript** — tipado estricto en todo el proyecto
- **Tailwind CSS** — estilos utilitarios

### Base de Datos
- **PostgreSQL** (Neon) — multi-tenant con `tenantId` en todas las tablas
- **Prisma** — ORM con helper `withTenantFilter()` como regla universal
- **Redis** (Upstash) — caché de sesiones y rate limiting

### Autenticación
- **Clerk** — multi-tenant nativo (Organizations = tenants), login social incluido

### Storage
- **Cloudflare R2** — fotos, música, videos de invitación. Sin costo de egress

### Pagos
- **MercadoPago** — suscripciones mensuales. Acepta SPEI, OXXO, tarjetas MX/CO

### Comunicaciones
- **Resend** — emails transaccionales
- **Twilio + WhatsApp Business API** — recordatorios automáticos y bot RSVP

### Inteligencia Artificial
- **Anthropic API** (Claude Sonnet) — generador de texto, personalizador, predictor, bot RSVP
- Para generación de imágenes (fase futura): Flux Schnell o DALL-E 3, evaluación pendiente

### Infraestructura
- **Vercel** — hosting Next.js con deploy automático
- **GitHub** — control de versiones

### Costo mensual estimado (arranque)

| Servicio | Costo inicial |
|---|---|
| Neon (PostgreSQL) | $0 (free tier) |
| Vercel | $0 (free tier) |
| Cloudflare R2 | $0 (10GB gratis) |
| Clerk | $0 (hasta 10K MAU) |
| Resend | $0 (3K emails/mes) |
| Upstash Redis | $0 (free tier) |
| Dominio | ~$150 MXN/año |
| **Total mes 1** | **~$0** |

---

## 12. Flujo Operativo

### Etapa B — Tú como servicio

```
1. Cliente contacta por WhatsApp/Instagram
2. Recopilas: nombres, fecha, lugar, fotos, lista de invitados
3. Creas el evento en tu admin panel (operando como tu tenant)
4. Eliges plantilla del catálogo y la preseleccionas para el organizador
5. Usas IA para generar el texto de la invitación
6. Cargas la lista de invitados (CSV o manual)
7. Generas link de Organizer Panel y se lo envías al cliente
8. Cliente revisa preview, elige plantilla final, da VoBo
9. Sistema genera link único por invitado
10. Envías los links al cliente
11. Cliente los distribuye por WhatsApp
12. Invitados abren, ven su nombre, confirman
13. Cliente accede a estadísticas en tiempo real
14. 7 días antes: recordatorios automáticos
15. Día del evento: QR de entrada (plan VIP)
```

---

### Etapa C — Revendedor opera solo

```
1. Revendedor descubre la plataforma (publicidad, referidos)
2. Se registra y paga su plan vía MercadoPago
3. Recibe acceso a su dashboard (su tenant aislado)
4. Crea el evento de su cliente final
5. Elige plantillas del catálogo (según su plan) y preselecciona 3-5 para el organizador
6. Usa IA para texto y mensajes personalizados
7. Genera link mágico o invita al cliente organizador
8. Cliente elige plantilla definitiva, da VoBo
9. El cliente distribuye los links a invitados
10. Sistema automatiza recordatorios y estadísticas
11. Día del evento: check-in QR (plan VIP)
12. Tú recibes el cobro mensual automático. Sin intervención.
```

---

### Cómo accede el cliente organizador a sus estadísticas

**Opción A — Link mágico (recomendada para Etapas B y C)**
- Revendedor genera URL de solo lectura con token secreto
- Sin necesidad de que el cliente cree cuenta
- Expira automáticamente después del evento
- `tudominio.com/stats/[token-secreto-unico]`

**Opción B — Cuenta Event Owner**
- Revendedor envía invitación por email al cliente
- Cliente crea cuenta con rol limitado a su evento
- Recomendada para eventos grandes con seguimiento diario
- El cliente ve solo su evento, nunca datos del tenant

---

## 13. Estrategia de Validación: Dogfooding

> Te conviertes en el Tenant #1 de tu propia plataforma. Es el principio de operación de la Etapa B implementado con disciplina arquitectónica.

### El enfoque

Antes de cobrar a un solo revendedor, **tú mismo operas como un revendedor** dentro de tu propia plataforma. Te creas a ti mismo como Tenant #1 desde el Super Admin, configurando tu propia marca, plan y catálogo. Desde ese tenant, atiendes clientes reales (bodas, XV años, etc.) durante la Etapa B.

### Por qué es la jugada correcta

**Valida el aislamiento multi-tenant desde día 1.**  
Si tu propio flujo pasa por el helper `withTenantFilter()` igual que el de cualquier revendedor, descubres bugs de scope antes de que un revendedor pague por ellos.

**Aprendes el dolor real del revendedor.**  
Pasas por exactamente el mismo flujo que ellos: crear evento, elegir plantilla, cargar invitados, lidiar con la IA, dar VoBo al organizador. Las fricciones que descubras son las que tus futuros revendedores también van a encontrar. Las resuelves antes de cobrarles.

**El código está probado por ti mismo.**  
Cuando vendas tu primera membresía, no estás vendiendo software no probado. Llevas semanas operando sobre el mismo código.

**El Super Admin no es vanity infrastructure.**  
Tu panel de Super Admin tiene datos reales (tu tenant, tus eventos, tus invitados) desde el día uno. Lo usas todos los días. Detectas problemas inmediatamente.

**Es la jugada de los grandes.**  
Linear se construyó usando Linear. Notion se construyó usando Notion. Basecamp se construyó usando Basecamp. La disciplina de usar tu propio producto es la garantía de calidad más barata que existe.

### Implicaciones operativas

- En la base de datos, tu tenant es una fila más en `tenants`. No tiene tratamiento especial.
- Tu rol como Super Admin te permite "actuar como" cualquier tenant (incluido el tuyo) sin perder el contexto de super admin para volver atrás.
- Cuando llegue el primer revendedor real, el sistema ya soporta múltiples tenants sin cambios arquitectónicos.

### Cuándo dejar de operar tu propio tenant

Cuando tengas 3–5 revendedores pagando consistentemente y suficientes ingresos para que tu tiempo de operación cueste más que el ingreso adicional de hacer eventos directos. Probablemente alrededor del mes 6–9.

A partir de ahí, tu tenant queda como sandbox de pruebas: ahí prácticas nuevas plantillas, pruebas features experimentales, simulas escenarios edge antes de exponerlos al resto.

---

## 14. Números del Negocio

### Proyección de ingresos por escenario

| Escenario | Revendedores | Distribución de planes | MRR |
|---|---|---|---|
| Conservador | 10 | 70% Básico, 30% Deluxe | $5,400 MXN |
| Moderado | 20 | 50% Básico, 30% Deluxe, 20% VIP | $11,600 MXN |
| Optimista | 40 | 30% Básico, 40% Deluxe, 30% VIP | $25,600 MXN |

### Costos operativos estimados (escenario moderado)

| Concepto | Costo mensual |
|---|---|
| Infraestructura (Vercel + Neon + R2 + Clerk) | ~$500 MXN |
| Twilio WhatsApp (mensajes) | ~$300 MXN |
| Anthropic API (tokens IA) | ~$400 MXN |
| Dominio y SSL | ~$15 MXN |
| **Total costos** | **~$1,215 MXN/mes** |

**Margen neto escenario moderado:** $11,600 - $1,215 = **$10,385 MXN/mes (~89% margen)**

---

## 15. Roadmap de IA por Capas

> La IA no se construye como un solo "feature". Se construye en capas, cada una con complejidad, costo y riesgo legal diferente.

### Las tres capas de IA

**Capa 1 — Texto y copy (Fácil, viable rápido)**  
La IA genera el título, descripción del evento, mensaje de RSVP, textos del itinerario, mensajes personalizados por invitado. Es exactamente lo que Claude o GPT hacen hoy.
- Complejidad: baja
- Tiempo de implementación: 3–5 días
- Costo: ~$0.01 por generación (Claude Haiku)
- Riesgo legal: nulo

**Capa 2 — Estilo y composición (Medio)**  
La IA elige paleta de colores, par de tipografías (de las aprobadas), propone qué plantilla base usar, sugiere mood visual. Las imágenes salen de la biblioteca curada (Unsplash, Pexels), no las genera.
- Complejidad: media
- Tiempo de implementación: 2–3 semanas
- Costo: ~$0.05 por generación
- Riesgo legal: bajo

**Capa 3 — Imágenes generadas por IA (Difícil + caro + delicado)**  
La IA genera las imágenes mismas con modelos como Flux, DALL-E o Midjourney via API. Útil para fondos decorativos, ilustraciones, patrones — **nunca personajes con marca registrada**.
- Complejidad: alta
- Tiempo de implementación: 3+ semanas (más infra de cola de tareas)
- Costo: $0.05–$0.30 por imagen, 10–60 segundos
- Riesgo legal: alto si no se controla bien

### El problema de las franquicias

**Disney, Marvel, Pokémon, Bluey, Frozen, Cars, Spiderman** — son marcas registradas. No se pueden generar invitaciones que las usen, ni manualmente ni con IA. Los generadores de imagen actuales (DALL-E, Flux Pro, Imagen) rechazan estos prompts activamente, y de todos modos generaría exposición legal directa.

**Solución:** mapeo a temáticas genéricas (ver sección 10, "Restricciones de temática").

### Costos operativos de IA

| Servicio | Por invitación | A 100 invitaciones/mes |
|---|---|---|
| Texto con Claude Haiku | $0.005 | $0.50 |
| Texto con Claude Sonnet | $0.05 | $5.00 |
| Imagen Flux Schnell | $0.003 | $0.30 |
| Imagen Flux Pro | $0.05 | $5.00 |
| Imagen DALL-E 3 HD | $0.12 | $12.00 |

Con plan Deluxe a $600/mes y consumo de $5–15 en IA, sigues con margen 97%+. Es rentable.

### Plan de despliegue por fases

| Fase | Cuándo | Qué se activa | Justificación |
|---|---|---|---|
| MVP (mes 1–2) | Lanzamiento | Sin IA | Foco en que el producto funcione |
| Fase IA-1 (mes 3–4) | Tras primeras ventas | Capa 1: texto generado | Marketing: "Invitación con texto personalizado por IA". Justifica upgrade a Deluxe |
| Fase IA-2 (mes 6–9) | Con base de clientes | Capa 2: estilo + biblioteca temática | Marketing: "Describe tu evento, recibe 3 propuestas en segundos". Producto se vuelve mágico |
| Fase IA-3 (mes 12+) | Evaluación | Capa 3: generación de imágenes | Solo si justifica el costo y se controla legalmente |

### La promesa de venta

Vendes "IA genera tu invitación" desde el inicio, pero la entregas en capas. El cliente que pide una de Cars recibe una invitación de autos de carrera personalizada con el nombre de su hijo en segundos, y queda fascinado — sin que hayas tocado un personaje de Disney.

---

## 16. Roadmap Técnico

> Roadmap revisado bajo el enfoque "Super Admin primero + Dogfooding". MVP estimado en 5–6 semanas.

### Fase 1 — Fundación + Super Admin Core (Semanas 1–2)

Objetivo: tener el esqueleto del Super Admin con auth, multi-tenant DB y capacidad de crear tu propio tenant.

- [ ] Setup Next.js 15 + TypeScript + Tailwind
- [ ] Integración Clerk con roles (`super_admin`, `tenant_admin`, `event_owner`, `guest`)
- [ ] Schema PostgreSQL en Neon con `tenantId` en todas las tablas
- [ ] Helper `withTenantFilter()` en Prisma como regla universal
- [ ] Layout Command (dark, sidebar compacta, header con métricas)
- [ ] CRUD de tenants (lista, crear, editar, suspender)
- [ ] Crear tu propio tenant #1 (Dogfooding)
- [ ] Vista "Operar como tenant" desde Super Admin

### Fase 2 — Template Manager + Asset Library (Semanas 3–4)

Objetivo: poder crear, versionar y publicar plantillas. Es el módulo más complejo del MVP.

- [ ] Schema de templates con versionado, estados (`draft`/`published`/`featured`/`archived`) y tags
- [ ] Template Manager UI en Super Admin (CRUD + preview)
- [ ] Sistema de configuración JSON por template (bloques + tokens de estilo)
- [ ] Asset Library básica (subida de imágenes, gestión de fuentes via Google Fonts)
- [ ] Renderer de templates que lee la versión específica
- [ ] Catálogo inicial de 6 plantillas (2 boda, 2 XV, 1 bautizo, 1 infantil)

### Fase 3 — Event Manager + Guest Manager (Semana 5)

Objetivo: crear eventos asignados a una plantilla y cargar invitados.

- [ ] CRUD de eventos scoped a tenant
- [ ] Asignación de plantilla + versión congelada al crear evento
- [ ] Gestión de invitados (manual + CSV)
- [ ] Generador de tokens únicos por invitado
- [ ] Generador de URLs `/e/[slug]/[token]`

### Fase 4 — Invitación Pública + RSVP (Semana 6)

Objetivo: que un invitado pueda abrir su link, ver la invitación personalizada y confirmar.

- [ ] Vista pública renderizando template + datos del evento + datos del invitado
- [ ] RSVP engine (confirmar / declinar / número de personas)
- [ ] Persistencia en tiempo real de RSVPs
- [ ] Confirmación visible para el invitado

### Fase 5 — Organizer Panel (Semana 6, paralelo)

Objetivo: que el cliente final pueda dar VoBo y monitorear su evento.

- [ ] Link mágico con token de solo lectura
- [ ] Dashboard del evento (confirmados / declinados / pendientes / %)
- [ ] Preview de la invitación
- [ ] Selección de plantilla entre subconjunto preseleccionado
- [ ] Aprobación / VoBo final

### Fase 6 — Polish + Primer Evento Real (Semana 7)

- [ ] QA general de los flujos
- [ ] Dominio + SSL configurado
- [ ] Primer evento real operado de extremo a extremo
- [ ] Documentar fricciones encontradas

---

### Post-MVP (después del primer evento real)

> No tienen orden fijo. Se priorizan según demanda del mercado.

**Fase IA-1 (mes 3–4)**
- [ ] Integración Anthropic API: Capa 1 (generador de texto)
- [ ] UI de IA dentro del Event Manager

**Fase Monetización (cuando aparezca el primer revendedor interesado)**
- [ ] Integración MercadoPago: suscripciones
- [ ] Onboarding self-service de revendedor
- [ ] Studio (Tenant Admin UI) — light mode, paleta terracota
- [ ] Sistema de planes con límites por tenant

**Fase Features Deluxe (mes 5–7)**
- [ ] Itinerario multi-sede
- [ ] Preferencias en RSVP
- [ ] Recordatorios automáticos WhatsApp (Twilio)
- [ ] Predictor de asistencia IA

**Fase IA-2 (mes 6–9)**
- [ ] Capa 2: IA de estilo + biblioteca temática
- [ ] Selector de variaciones para revendedor

**Fase VIP (mes 9–12)**
- [ ] QR Check-in + app de escaneo
- [ ] Libro de firmas digital
- [ ] Bot RSVP WhatsApp (Anthropic + Twilio)
- [ ] White label y subdominio por tenant
- [ ] Video de invitación personalizado

**Fase IA-3 (mes 12+)**
- [ ] Evaluación de generación de imágenes (Flux / DALL-E)
- [ ] Sistema de filtros de contenido para evitar IP infringement

---

## Notas Finales

### El pitch de venta que lo cambia todo

La competencia vende **"una invitación bonita"**.

InvitaWeb vende **"el sistema de gestión del evento desde la invitación hasta la última persona que entró"**.

Eso justifica la membresía recurrente vs el cobro por evento individual que hace toda la competencia.

### Los 5 primeros pasos antes de escribir código

1. Validar con 3 wedding planners reales si pagarían $600/mes por la plataforma
2. Hacer 3 invitaciones manualmente para aprender el flujo real del cliente
3. Definir las 6 primeras plantillas (2 bodas, 2 XV, 1 bautizo, 1 infantil)
4. Conseguir 1 salón de eventos interesado en el check-in QR como piloto
5. Setup del proyecto técnico y primer deploy en Vercel

### Decisiones arquitectónicas inmutables

Las siguientes decisiones se tomaron durante v1.1 y no deberían reabrirse sin razón fuerte:

- **Plantillas centralizadas:** Solo Super Admin crea plantillas. Nunca user-generated.
- **Versionado de plantillas:** Eventos quedan congelados en la versión que tenían al crearse.
- **Dogfooding:** El fundador opera como Tenant #1 desde el día 1.
- **IA por capas:** Texto primero (mes 3–4), estilo después (mes 6–9), imágenes solo si hay caso de negocio sólido.
- **Sin franquicias:** Nunca se generan plantillas con personajes con copyright. Mapeo a temáticas genéricas.

---

*Documento generado en mayo 2026. Versión 1.1*  
*Próxima revisión: al completar las primeras 5 ventas reales*  
*Documento de identidad visual: [`invitaweb-brand-guidelines.md`](./invitaweb-brand-guidelines.md)*
