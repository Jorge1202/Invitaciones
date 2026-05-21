# InvitaWeb — Plan de Implementación

## Estado real del proyecto (mayo 2026)

### Completado (más de lo que el briefing indicaba)
- ✅ Auth: NextAuth v5 + JWT + roles en token
- ✅ Middleware guardián (protege `/command` y `/studio`)
- ✅ Tenant Manager COMPLETO — `/command/tenants` con CRUD + toggle + detalle
- ✅ Template Manager COMPLETO — `/command/templates` con CRUD + editor visual + tier system
- ✅ Studio Dashboard — diseño real, datos parcialmente reales
- ✅ Command Dashboard — **métricas FALSAS hardcodeadas** (ver Fase A)
- ✅ Template registry + componente `TemplateBodaDiamante`

### Pendiente
- ❌ Command Dashboard con datos reales de BD
- ❌ Studio Dashboard: guests e invitados reales
- ❌ Event Manager en Studio
- ❌ Guest Manager + Token Generator
- ❌ Página pública de invitación `/e/[slug]/[token]`
- ❌ RSVP Engine
- ❌ Organizer Panel (link mágico)

---

## Grafo de dependencias

```
Auth + Middleware (✅)
  └── Tenant Manager (✅)
        └── Template Manager (✅)
              └── [A] Dashboard métricas reales      ~2h
              └── [B] Event Manager (Studio)          ~4h
                    └── [C] Guest Manager + Tokens    ~4h
                          └── [D] Invitación + RSVP   ~5h
                                └── [E] Organizer Panel ~3h
```

---

## Fase A — Métricas reales en dashboards (~2h)

### A-1: Command Dashboard con datos reales

**Archivo a crear:** `src/actions/command-actions.ts`
```typescript
export async function getGlobalStats()
// Queries: count tenants, active tenants, events this month,
// total guests, MRR calculado por plan (basic*400 + deluxe*600 + vip*800)
```

**Archivo a modificar:** `src/app/command/page.tsx`
- Convertir a `async` Server Component
- Reemplazar array hardcodeado por datos de `getGlobalStats()`

**Criterios de aceptación:**
- [ ] 4 tarjetas muestran datos reales de BD
- [ ] MRR calculado por distribución de planes activos
- [ ] Sin `any` en código nuevo

### A-2: Studio Dashboard con datos reales

**Archivo a modificar:** `src/actions/studio-actions.ts`
- Añadir `getStudioStats(tenantId)` que retorna total guests + confirmados

**Archivo a modificar:** `src/app/studio/page.tsx`
- "Invitados Gestionados" → total real
- "Tasa de Respuesta" → `(confirmed / total * 100).toFixed(1)%`

---

## Fase B — Event Manager en Studio (~4h)

### B-1: Server Actions de eventos

**Archivo a crear:** `src/actions/event-actions.ts`
```typescript
export async function getEvents()         // tenant-scoped
export async function createEvent(data)   // congela templateVersion al crear
export async function getEventById(id)    // con template + _count guests
export async function updateEvent(id, data)
export async function deleteEvent(id)     // solo si sin guests
```

**Regla:** `templateVersion` se toma de `TemplateVersion` más reciente al crear y queda **inmutable**.  
**Slug:** `kebab-case(nombre)-YYYY`, único en BD.

### B-2: Lista de eventos `/studio/events`

**Archivo a crear:** `src/app/studio/events/page.tsx`
- Tabla: nombre, fecha, plantilla, invitados/confirmados, acciones
- Empty state con CTA

### B-3: Crear evento `/studio/events/new`

**Archivo a crear:** `src/app/studio/events/new/page.tsx`
- Campos: nombre, tipo, fecha, lugar, selector de plantilla
- Selector filtra plantillas según plan del tenant (`canTenantAccessTier()`)
- Tras crear → redirige a `/studio/events/[id]`

### B-4: Detalle de evento `/studio/events/[id]`

**Archivo a crear:** `src/app/studio/events/[id]/page.tsx`
- Info editable del evento
- Resumen RSVP (total/confirmados/declinados/pendientes)
- Link a gestión de invitados
- Botón generar link de organizador

**Checkpoint B:** Revendedor puede crear un evento completo.

---

## Fase C — Guest Manager + Token Generator (~4h)

### C-1: Server Actions de invitados

**Archivo a crear:** `src/actions/guest-actions.ts`
```typescript
export async function getGuests(eventId)
export async function createGuest(eventId, { name, passes })
export async function createGuestsBulk(eventId, guests[])
export async function deleteGuest(guestId)
```

**Token:** `randomBytes(16).toString("hex")` — 32 chars hex, nunca secuencial.  
**URL:** `/e/[eventSlug]/[token]`

### C-2: Página de invitados `/studio/events/[id]/guests`

**Archivo a crear:** `src/app/studio/events/[id]/guests/page.tsx`
- Tabla: nombre, pases, estado RSVP, link (con botón copiar)
- Modal añadir invitado individual
- Upload CSV: `nombre,pases` (con header)
- Errores de CSV mostrados sin romper la carga

**Checkpoint C:** Revendedor tiene invitados cargados y links generados.

---

## Fase D — Invitación Pública + RSVP Engine (~5h)

### D-1: Página pública `/e/[slug]/[token]`

**Archivo a crear:** `src/app/e/[slug]/[token]/page.tsx`
- Sin auth. Pública.
- Busca guest por token → si no existe o slug no coincide → 404
- Renderiza `TemplateRegistry` con datos del evento e invitado

### D-2: RSVP Engine

**En `guest-actions.ts`:**
```typescript
export async function submitRsvp(token: string, data: {
  status: "confirmed" | "declined";
  confirmedPasses?: number;
  preferences?: { diet?: string; song?: string };
})
// Sin auth. El token ES la autenticación.
// RSVP siempre modificable (sobreescritura simple).
```

### D-3: UI RSVP en TemplateBodaDiamante

**Archivo a modificar:** `src/templates/bodas-diamante/index.tsx`
- Formulario: confirmar / declinar
- Si confirma: número de personas (≤ pases asignados)
- Preferencias opcionales
- Mensaje de éxito tras enviar

**Checkpoint D:** Invitado puede abrir su link y confirmar asistencia.

---

## Fase E — Organizer Panel / Link Mágico (~3h)

### E-1: Generar secret del organizador

**En `event-actions.ts`:**
```typescript
export async function generateOrganizerToken(eventId)
// randomBytes(32).toString("hex") guardado en Event.data.organizerSecret
```

### E-2: Organizer Panel `/e/[slug]/stats/[secret]`

**Archivo a crear:** `src/app/e/[slug]/stats/[secret]/page.tsx`
- Sin auth. Busca evento por slug, valida secret.
- Secret incorrecto → 404
- Muestra: totales RSVP, lista de invitados, preferencias
- Solo lectura — sin botones de edición

**Checkpoint E:** Flujo completo de extremo a extremo operativo.

---

## Archivos a crear/modificar

| Archivo | Acción |
|---|---|
| `src/actions/command-actions.ts` | Crear |
| `src/actions/event-actions.ts` | Crear |
| `src/actions/guest-actions.ts` | Crear |
| `src/actions/studio-actions.ts` | Modificar |
| `src/app/command/page.tsx` | Modificar |
| `src/app/studio/page.tsx` | Modificar |
| `src/app/studio/events/page.tsx` | Crear |
| `src/app/studio/events/new/page.tsx` | Crear |
| `src/app/studio/events/[id]/page.tsx` | Crear |
| `src/app/studio/events/[id]/guests/page.tsx` | Crear |
| `src/app/e/[slug]/[token]/page.tsx` | Crear |
| `src/app/e/[slug]/stats/[secret]/page.tsx` | Crear |
| `src/templates/bodas-diamante/index.tsx` | Modificar |

## Utilidades a reutilizar (no reimplementar)

- `withTenantFilter(tenantId)` — `src/lib/prisma.ts`
- `canTenantAccessTier()` — `src/lib/tier-features.ts`
- `TemplateRegistry` — `src/templates/registry.tsx`
- `ensureSuperAdmin()` / `ensureTenantAdmin()` — pattern de `tenant-actions.ts`
- Design tokens `command-*` / `studio-*` — `tailwind.config.ts`

## Decisiones tomadas

| Decisión | Respuesta |
|---|---|
| Auth provider | NextAuth v5 + JWT (intencional, no reabrir) |
| RSVP modificable | Sí, siempre — sobreescritura simple |
| Token invitado | `randomBytes(16).toString("hex")` |
| Token organizador | `randomBytes(32).toString("hex")` guardado en `Event.data` |
| Versionado de plantilla | Congelado al crear el evento, inmutable |

## Verificación end-to-end

1. Login Super Admin → Command Dashboard con datos reales
2. Login tenant_admin → Studio Dashboard con guests reales
3. Crear evento → aparece en lista, slug único generado
4. Añadir invitados → tokens generados, links `/e/[slug]/[token]` disponibles
5. Abrir link sin login → invitación renderiza con nombre del invitado
6. Confirmar RSVP → estado cambia en BD
7. Abrir Organizer Panel con secret → estadísticas en tiempo real
