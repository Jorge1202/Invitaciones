# InvitaWeb — Lista de Tareas

> Orden de ejecución: A → B → C → D → E (cada fase depende de la anterior)  
> Detalle completo en `tasks/plan.md`

---

## Fase A — Métricas reales (~2h) ✅

- [x] **A-1** Crear `src/actions/command-actions.ts` con `getGlobalStats()`
- [x] **A-1** Modificar `src/app/command/page.tsx` — datos reales (MRR, tenants, eventos, RSVP)
- [x] **A-2** Modificar `src/actions/studio-actions.ts` — añadir `getStudioStats()`
- [x] **A-2** Modificar `src/app/studio/page.tsx` — "Invitados Gestionados" y "Tasa de Respuesta" reales

---

## Fase B — Event Manager en Studio (~4h) ✅

- [x] **B-1** Crear `src/actions/event-actions.ts` con CRUD completo
- [x] **B-2** Crear `src/app/studio/events/page.tsx` — lista de eventos
- [x] **B-3** Crear `src/app/studio/events/new/page.tsx` — formulario crear evento
- [x] **B-4** Crear `src/app/studio/events/[id]/page.tsx` — detalle con resumen RSVP

**✓ Checkpoint B:** Revendedor puede crear y ver eventos.

---

## Fase C — Guest Manager + Tokens (~4h) ✅

- [x] **C-1** Crear `src/actions/guest-actions.ts` con CRUD + generador de tokens
- [x] **C-2** Crear `src/app/studio/events/[id]/guests/page.tsx` — tabla + add + CSV

**✓ Checkpoint C:** Invitados cargados, links de invitación generados.

---

## Fase D — Invitación Pública + RSVP (~5h)

- [ ] **D-1** Crear `src/app/e/[slug]/[token]/page.tsx` — página pública sin auth
- [ ] **D-2** Añadir `submitRsvp()` a `guest-actions.ts`
- [ ] **D-3** Modificar `src/templates/bodas-diamante/index.tsx` — añadir form RSVP

**✓ Checkpoint D:** Invitado puede confirmar asistencia desde su link.

---

## Fase E — Organizer Panel (~3h)

- [ ] **E-1** Añadir `generateOrganizerToken()` a `event-actions.ts`
- [ ] **E-1** Añadir botón en `/studio/events/[id]` para generar/copiar link del organizador
- [ ] **E-2** Crear `src/app/e/[slug]/stats/[secret]/page.tsx` — dashboard solo lectura

**✓ Checkpoint E:** Flujo completo de extremo a extremo operativo.

---

## Completadas

- [x] Auth: NextAuth v5 + JWT + roles en token
- [x] Middleware guardián
- [x] Tenant Manager COMPLETO (`/command/tenants`)
- [x] Template Manager COMPLETO (`/command/templates` + editor)
- [x] Studio Dashboard (diseño)
- [x] Command Dashboard (diseño — métricas hardcodeadas a corregir en A-1)
- [x] Template registry + TemplateBodaDiamante
