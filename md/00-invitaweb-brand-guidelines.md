# InvitaWeb — Brand Guidelines
> Sistema de identidad visual para la plataforma de gestión multi-tenant
> Versión 1.0 · Mayo 2026

---

## Tabla de Contenido

1. [Filosofía de marca](#1-filosofía-de-marca)
2. [Arquitectura de marca: las dos capas](#2-arquitectura-de-marca-las-dos-capas)
3. [Identidad maestra](#3-identidad-maestra)
4. [Sistema tipográfico](#4-sistema-tipográfico)
5. [Paleta maestra](#5-paleta-maestra)
6. [Sub-marca Command (Super Admin)](#6-sub-marca-command-super-admin)
7. [Sub-marca Studio (Tenant Admin)](#7-sub-marca-studio-tenant-admin)
8. [Diferenciación visual entre roles](#8-diferenciación-visual-entre-roles)
9. [Sistema de iconografía](#9-sistema-de-iconografía)
10. [Voz y tono](#10-voz-y-tono)
11. [White label para plan VIP](#11-white-label-para-plan-vip)
12. [Reglas de uso y prohibiciones](#12-reglas-de-uso-y-prohibiciones)
13. [Asset checklist](#13-asset-checklist)

---

## 1. Filosofía de marca

### Esencia

InvitaWeb no vende invitaciones bonitas. Vende **control sobre el evento desde la primera invitación hasta el último invitado que cruzó la puerta**. La marca debe transmitir esa diferencia en cada superficie.

### Atributos centrales

| Atributo | Significa | No significa |
|---|---|---|
| Profesional | Confiable para cobrar membresías premium | Frío o corporativo |
| Sereno | Sensación de orden y dominio | Aburrido o gris |
| Cálido | Humano, accesible para emprendedoras | Cursi o infantil |
| Preciso | Datos claros, decisiones rápidas | Saturado de información |
| Premium | Justifica $400–$800 MXN/mes | Lujoso o inaccesible |

### Personalidad

Si InvitaWeb fuera una persona: una arquitecta de 35 años, mexicana, formada en una escuela europea, que diseña con software profesional pero envía notas a mano. Habla poco, dice lo justo, y todo lo que hace tiene una razón.

---

## 2. Arquitectura de marca: las dos capas

InvitaWeb tiene **dos productos visualmente distintos** bajo la misma marca maestra:

```
                    InvitaWeb (marca maestra)
                            │
              ┌─────────────┴─────────────┐
              │                           │
        Capa OPERATIVA              Capa PÚBLICA
        (dashboards)                (invitaciones)
              │                           │
     ┌────────┴────────┐                  │
     │                 │                  │
  Command           Studio          Templates por evento
  (Super Admin)   (Tenant Admin)   (customizables, sin marca propia)
``` 

**Regla fundamental:** La capa operativa lleva la marca InvitaWeb fuerte. La capa pública (lo que ve el invitado) lleva el branding del evento — InvitaWeb desaparece o queda en un footer discreto.

---

## 3. Identidad maestra

### Wordmark

El wordmark es la forma principal de la marca. Se compone en dos pesos:

```
Invita Web
regular  bold + acento
```

- `Invita` en peso regular (400)
- `Web` en peso bold (700), color de acento de la sub-marca activa
- Sin espacio entre palabras (`InvitaWeb`) o con espacio sutil de 4px en composiciones grandes
- Tipografía: **Fraunces** o **Instrument Serif** para versiones display; **Inter SemiBold** para uso compacto en UI

### Isotipo

El símbolo recomendado: **un sobre estilizado con un punto/pulso que sugiere actividad en tiempo real**. Comunica los dos pilares del producto: invitación + tracking en vivo.

Variantes aceptadas:
- Sobre con punto interior pulsante (preferida, animable en pantalla)
- Monograma `IW` con la barra horizontal de la "I" extendida como un trazo de envío
- Check (✓) integrado dentro de una silueta de sobre

### Área de protección

Ningún elemento debe acercarse al wordmark o isotipo a menos de **una unidad x** (donde x = altura de la letra `i` minúscula en el wordmark).

### Tamaños mínimos

| Aplicación | Wordmark | Isotipo |
|---|---|---|
| Digital (px) | 96 px de ancho | 24 px de ancho |
| Impreso (mm) | 25 mm de ancho | 8 mm de ancho |
| Favicon | — | 16 px (versión simplificada) |

### Versiones cromáticas

- **Full color** sobre fondo claro (preferida)
- **Monocromo oscuro** (`#0B0F19`) sobre fondo claro
- **Monocromo claro** (`#FBF9F6`) sobre fondo oscuro o foto
- **Negro plano** para impresión a una tinta

---

## 4. Sistema tipográfico

### Familia display — Fraunces

Uso: títulos de marca, hero sections, encabezados H1 en landing pages, materiales impresos.

- Pesos: Regular (400), SemiBold (600)
- Estilo: serifa contemporánea con personalidad editorial
- Open source (Google Fonts)

### Familia UI — Inter

Uso: dashboards, formularios, tablas, microcopy, body text.

- Pesos: Regular (400), Medium (500), SemiBold (600), Bold (700)
- Estilo: sans-serif neutra optimizada para pantalla
- Open source (Google Fonts)

### Familia mono — JetBrains Mono

Uso: tokens, IDs, código en documentación interna, valores en columnas numéricas.

- Pesos: Regular (400), Medium (500)
- Open source

### Escala tipográfica (rem, base 16px)

| Nivel | Tamaño | Peso | Familia | Uso |
|---|---|---|---|---|
| Display XL | 3.5 rem | 600 | Fraunces | Hero landing |
| Display L | 2.5 rem | 600 | Fraunces | Títulos de página |
| H1 | 2 rem | 600 | Fraunces / Inter | Encabezado principal de vista |
| H2 | 1.5 rem | 600 | Inter | Sección |
| H3 | 1.25 rem | 600 | Inter | Subsección |
| Body L | 1.125 rem | 400 | Inter | Texto principal |
| Body | 1 rem | 400 | Inter | Texto estándar |
| Small | 0.875 rem | 400 | Inter | Microcopy, captions |
| Caption | 0.75 rem | 500 | Inter | Etiquetas, badges |

### Reglas tipográficas

- Interlineado: 1.5 para body, 1.2 para títulos
- Tracking: -0.02em para títulos Fraunces, 0 para Inter
- Nunca mezclar más de dos familias en una misma vista
- Fraunces solo para acentos editoriales; el dashboard cotidiano vive en Inter

---

## 5. Paleta maestra

Estos colores son neutrales a la sub-marca y se usan en ambos productos.

### Neutros

| Token | HEX | Uso |
|---|---|---|
| `ink-900` | `#0B0F19` | Texto sobre claro, fondo Command |
| `ink-700` | `#1F1B16` | Texto sobre claro en Studio |
| `ink-500` | `#6B7280` | Texto secundario |
| `ink-300` | `#D1D5DB` | Bordes, divisores |
| `paper-100` | `#FBF9F6` | Fondo Studio, off-white champagne |
| `paper-0` | `#FFFFFF` | Superficies elevadas |

### Estado (universales)

| Token | HEX | Significado |
|---|---|---|
| `success` | `#10B981` | Confirmado, RSVP positivo, MRR creciendo |
| `warning` | `#F59E0B` | Cerca del límite del plan, recordatorio pendiente |
| `danger` | `#EF4444` | Error, declinado, suspendido |
| `info` | `#3B82F6` | Información neutral, tooltips |

---

## 6. Sub-marca Command (Super Admin)

### Concepto

Una **sala de control**. El Super Admin (tú) supervisa el negocio entero: MRR, tenants, alertas, costos de IA. La interfaz debe transmitir poder, precisión y "estar detrás del telón".

### Naming interno

**InvitaWeb Command** — usado en headers de la app, no en marketing externo.

### Paleta Command

| Token | HEX | Uso |
|---|---|---|
| `cmd-bg` | `#0B0F19` | Fondo principal (midnight) |
| `cmd-surface` | `#1A1F2E` | Cards, paneles |
| `cmd-surface-hi` | `#252B3D` | Hover, estados activos |
| `cmd-border` | `#2A3142` | Divisores, bordes de inputs |
| `cmd-text` | `#E5E7EB` | Texto principal |
| `cmd-text-dim` | `#9CA3AF` | Texto secundario |
| `cmd-accent` | `#7C3AED` | CTA primario, datos clave, focus rings (violeta eléctrico) |
| `cmd-accent-hi` | `#A78BFA` | Hover sobre acento |
| `cmd-mrr` | `#10B981` | Métricas de ingresos |

### Tono general

- **Modo:** Dark por defecto, sin opción de light mode
- **Densidad:** Alta. Tablas, métricas, listas largas
- **Animación:** Mínima y funcional (transitions de 150ms, sin bounces ni efectos decorativos)
- **Tipografía dominante:** Inter en todos los pesos; Fraunces solo en pantalla de bienvenida

### Composición tipo

```
[Sidebar oscura, iconos densos]  [Header con MRR + alertas]
                                  [Tabla de tenants, denso]
                                  [Cards con métricas, mono numbers]
```

---

## 7. Sub-marca Studio (Tenant Admin)

### Concepto

Una **herramienta creativa premium**. La revendedora típica (wedding planner, fotógrafa, salón) es una emprendedora entre 25–45 años que valora estética y control. Studio debe sentirse como Notion o Linear con un acabado cálido, no como un panel corporativo.

### Naming interno

**InvitaWeb Studio** — la palabra "Studio" eleva la percepción y justifica el precio. Aparece en el header de la app.

### Paleta Studio

| Token | HEX | Uso |
|---|---|---|
| `stu-bg` | `#FBF9F6` | Fondo principal (champagne off-white) |
| `stu-surface` | `#FFFFFF` | Cards, modales |
| `stu-surface-alt` | `#F5F1EA` | Hover, secciones diferenciadas |
| `stu-border` | `#EAE4DA` | Divisores sutiles |
| `stu-text` | `#1F1B16` | Texto principal (casi negro tibio) |
| `stu-text-dim` | `#7A7269` | Texto secundario |
| `stu-accent` | `#B8745A` | CTA primario, links activos (terracota / rose gold) |
| `stu-accent-hi` | `#A6624A` | Hover sobre acento |
| `stu-accent-soft` | `#F0DDD3` | Backgrounds sutiles, badges |
| `stu-botanic` | `#2D5F4E` | Confirmaciones positivas, estados de éxito |

### Tono general

- **Modo:** Light por defecto; dark mode opcional como feature secundaria
- **Densidad:** Media. Cards con respiración, previews visuales del evento
- **Animación:** Sutil con calidez (transitions 200–250ms, micro-interactions en hover)
- **Tipografía dominante:** Inter para UI; Fraunces para títulos de página y nombres de evento

### Composición tipo

```
[Sidebar clara, etiquetas visibles]  [Header con nombre del tenant]
                                      [Cards de eventos con preview]
                                      [Toolbar de IA destacada]
```

---

## 8. Diferenciación visual entre roles

**Regla de oro multi-tenant:** al ver una captura de pantalla aislada debe ser inmediatamente obvio en qué rol estás. Esto previene confusiones graves (un Super Admin tocando datos de tenant por accidente).

| Elemento | Command (Super Admin) | Studio (Tenant Admin) |
|---|---|---|
| Modo | Dark | Light |
| Color de acento | Violeta `#7C3AED` | Terracota `#B8745A` |
| Sidebar | Compacta, iconos densos, sin etiquetas | Espaciada, con etiquetas visibles |
| Densidad | Alta (tablas) | Media (cards) |
| Animaciones | Funcionales | Sutiles con calidez |
| Tipografía display | Inter SemiBold | Fraunces |
| Indicador de rol | Badge `ADMIN` en header (violeta) | Logo del tenant + nombre |
| Iconografía | Lucide outline, stroke 1.5 | Lucide outline, stroke 1.75 |
| Border radius base | 6 px | 12 px |
| Tono de microcopy | Directo, datos primero | Aspiracional, humano |

---

## 9. Sistema de iconografía

### Librería base

**Lucide Icons** — open source, consistente, cubre el 95% de los casos.

### Reglas

- Stroke 1.5 px en Command, 1.75 px en Studio
- Tamaños estándar: 16, 20, 24, 32 px
- Nunca rellenar iconos outline; nunca mezclar outline + filled en una misma vista
- Iconos siempre alineados al texto que acompañan (centro vertical)

### Iconos clave por dominio

| Concepto | Icono Lucide |
|---|---|
| Evento | `calendar` |
| Invitado | `user` / `users` |
| RSVP confirmado | `check-circle-2` |
| RSVP declinado | `x-circle` |
| Recordatorio WhatsApp | `message-circle` |
| QR Check-in | `qr-code` |
| Libro de firmas | `book-heart` |
| Plantilla | `layout-template` |
| IA | `sparkles` |
| Tenant | `building-2` |
| Métricas | `trending-up` |

### Ilustración

Cuando se necesite ilustración (estados vacíos, onboarding), usar **trazos finos sobre fondos planos** con la paleta de la sub-marca. Evitar 3D, gradientes saturados, isométricos genéricos tipo "undraw".

---

## 10. Voz y tono

### Principios

1. **Decir menos, decir mejor.** Si una palabra sobra, fuera.
2. **Hablar a profesionales, no a novias.** En el dashboard, la audiencia es la persona que cobra por organizar el evento.
3. **Sin diminutivos ni cursilería.** "Invitación" sí; "invitacioncita" no.
4. **Sin promesas vacías.** No usar "increíble", "mágico", "asombroso".

### Voz por sub-marca

**Command (Super Admin):**
- Directo, datos primero, sin emojis
- Ejemplo: `12 tenants activos · 3 al borde del límite · MRR +8% MoM`

**Studio (Tenant Admin):**
- Aspiracional pero práctico, humano sin ser cursi
- Ejemplo: `Tu evento está listo para distribuir · 47 invitados cargados`

**Invitación pública (cliente final):**
- Cálido, emocional, en segunda persona
- Ejemplo: `María, te esperamos el sábado 12 de junio`

### Microcopy: do / don't

| Contexto | Sí | No |
|---|---|---|
| Botón crear evento | `Nuevo evento` | `¡Crear nueva invitación increíble!` |
| Estado vacío | `Aún no tienes eventos. Crea el primero.` | `¡Vamos! Tu primer evento te está esperando 🎉` |
| Error | `No pudimos guardar. Reintenta.` | `¡Ups! Algo salió mal 😢` |
| Confirmación | `Evento publicado` | `¡Listo! Tu evento ya está volando 🚀` |

---

## 11. White label para plan VIP

Cuando un revendedor paga VIP, Studio se rebrandea con su identidad. El sistema permite:

### Configurable por el revendedor

- **Logo:** sube su isotipo, reemplaza el wordmark de InvitaWeb en la sidebar
- **Color de acento:** elige un HEX, reemplaza `stu-accent` en CTAs y links
- **Subdominio:** `[suMarca].invitaweb.com`
- **Favicon:** su logo

### NO configurable (mantiene consistencia)

- Estructura del layout
- Tipografías (Inter + Fraunces)
- Iconografía (Lucide)
- Paleta de neutros y estados
- Comportamiento de componentes

### Atribución obligatoria

Footer discreto en cada vista white-labeled:

```
Powered by InvitaWeb
```

- Tamaño: 11 px
- Color: `stu-text-dim` con opacidad 0.6
- Posición: footer derecho, no scroll

---

## 12. Reglas de uso y prohibiciones

### Wordmark e isotipo

**Permitido:**
- Usar el wordmark sobre fondos claros u oscuros con suficiente contraste
- Aplicar el isotipo solo cuando el espacio sea limitado (favicon, app icon, badge compacto)
- Animar sutilmente el punto pulsante del isotipo en interfaces digitales

**Prohibido:**
- Deformar, rotar o aplicar perspectiva al wordmark o isotipo
- Aplicar sombras paralelas, bevels, gradientes decorativos
- Reemplazar la tipografía del wordmark por otra
- Encerrar el logo en formas (círculos, cuadrados) salvo el sello oficial
- Usar el logo sobre fotografías de alto contraste sin un fondo de protección
- Cambiar el orden o jerarquía de las palabras "Invita" y "Web"

### Colores

**Permitido:**
- Usar las paletas Command y Studio exclusivamente en su sub-marca
- Aplicar colores de estado (success, warning, danger) en ambas sub-marcas
- Crear gradientes sutiles entre tokens de la misma familia para hero sections

**Prohibido:**
- Mezclar el violeta `cmd-accent` en Studio o el terracota `stu-accent` en Command
- Usar colores fuera de la paleta sin aprobación
- Aplicar el rose gold a textos de cuerpo (es exclusivo de acentos)
- Usar gradientes saturados (rainbow, neon, vaporwave)

### Tipografía

**Prohibido:**
- Usar Fraunces para body text en dashboards
- Stretch o condensación artificial de letras
- Mezclar más de dos familias en una vista
- Tipografías de sistema (Arial, Times) como reemplazo

---

## 13. Asset checklist

Para considerar el sistema "listo para producción", se necesita:

### Logos
- [ ] Wordmark SVG full color (claro y oscuro)
- [ ] Wordmark SVG monocromo (positivo y negativo)
- [ ] Isotipo SVG (todas las variantes)
- [ ] Favicon 32×32 y 16×16 (ICO + PNG)
- [ ] App icon iOS 1024×1024 y Android adaptive icon
- [ ] Open Graph image 1200×630 (para sharing)

### Tipografía
- [ ] Fraunces y Inter cargadas vía Google Fonts o self-hosted
- [ ] JetBrains Mono para tokens y código
- [ ] Variables CSS con la escala tipográfica completa

### Sistema de color
- [ ] Tokens de color exportados a Tailwind config
- [ ] Variables CSS para Command y Studio
- [ ] Paleta documentada en Figma con tokens vinculados

### Componentes base
- [ ] Buttons (primary, secondary, ghost, danger) en ambas sub-marcas
- [ ] Inputs, selects, textareas
- [ ] Cards, modales, drawers
- [ ] Tablas con paginación
- [ ] Badges de estado
- [ ] Empty states con ilustración

### Templates de marketing
- [ ] Landing page header
- [ ] Pricing cards
- [ ] Email transaccional base (bienvenida, confirmación)
- [ ] Email de invitación al cliente organizador

---

## Notas finales

Este sistema debe evolucionar. Recomendación: revisar al cerrar las primeras 10 ventas reales para validar si las decisiones de tono y color están conectando con la audiencia objetivo. Lo que no convierte, cambia.

El branding no es decoración: es el conjunto de decisiones que hace que un wedding planner abra el dashboard cada mañana y sienta que está en el lugar correcto.

---

*Documento generado en mayo 2026. Versión 1.0*
*Próxima revisión: tras las primeras 10 ventas validadas*
