# InvitaWeb — Contexto del Proyecto para Claude

## ¿Qué es este proyecto?

SaaS multi-tenant de invitaciones digitales para eventos sociales en LATAM (bodas, XV años, bautizos). El cliente directo es el **revendedor** (wedding planner, fotógrafo, salón). Los revendedores crean y gestionan invitaciones para sus clientes finales.

Lee la documentación completa antes de tocar cualquier módulo:
- `md/00-invitaweb-modelo-negocio.md` — modelo de negocio, roles, planes, roadmap
- `md/estructura.md` — estructura de carpetas
- `md/RULES.md` — reglas estrictas de código (TypeScript, sin `any`)
- `md/01-super-admin.md` — especificaciones del panel Super Admin
- `md/02-revendedor-admin.md` — especificaciones del panel Revendedor
- `md/03-cliente-organizador.md` — especificaciones del Organizer Panel
- `md/04-invitado.md` — especificaciones de la invitación pública
- `md/05-autenticacion-seguridad.md` — arquitectura de seguridad

## Estado actual (mayo 2026)

### Completado
- Next.js 15 + TypeScript strict + Tailwind CSS
- Prisma schema completo con multi-tenancy (`tenantId` en todas las tablas)
- `withTenantFilter()` en `src/lib/prisma.ts` — regla universal de aislamiento
- NextAuth (Auth.js v5) con JWT, bcryptjs, roles en token
- Middleware "Guardián" en `src/middleware.ts` — protege `/command` y `/studio`
- Seed: Super Admin `admin@invitaweb.com`
- UI base: layout Command (dark) + Studio (light), header, sidebar

### Próximo a construir (Fase 1 del roadmap)
1. **Tenant Manager** — CRUD de revendedores en Super Admin (`/command/tenants`)
2. **Dashboard Super Admin** — métricas globales reales (MRR, tenants, eventos)
3. **Template Manager** — CRUD de plantillas con versionado (`/command/templates`)

## Decisiones arquitectónicas tomadas (no reabrir)

| Decisión | Elección | Razón |
|---|---|---|
| Auth | **NextAuth (Auth.js v5) + JWT** | Decisión intencional. El rol y tenantId viajan en el JWT. El aislamiento multi-tenant lo hace Prisma con `withTenantFilter()`, NO el proveedor de auth. |
| Multi-tenancy | `tenantId` en todas las tablas + helper Prisma | Regla universal. Toda consulta de negocio pasa por `withTenantFilter()`. Sin excepciones. |
| Plantillas | Solo Super Admin crea plantillas | Nunca user-generated. Ver sección 10 del modelo de negocio. |
| Versionado | Eventos congelados en la versión de plantilla al crearse | `Event.templateVersion` es inmutable después de crearse. |

## Stack

- **Framework:** Next.js 15, App Router, Server Components, Server Actions
- **DB:** PostgreSQL (Neon) + Prisma ORM
- **Auth:** NextAuth v5 + PrismaAdapter + JWT strategy
- **UI:** Tailwind CSS (tokens Command/dark + Studio/light)
- **Storage:** Cloudflare R2
- **Pagos:** MercadoPago
- **Emails:** Resend
- **WhatsApp:** Twilio
- **IA:** Anthropic API (Claude Haiku para texto)

## Sub-marcas y rutas

| Panel | Ruta | Modo | Usuarios |
|---|---|---|---|
| Command | `/command` | Dark / Violeta | Super Admin |
| Studio | `/studio` | Light / Terracota | Revendedores |
| Organizer | `/e/[slug]/stats/[secret]` | Light | Cliente organizador (link mágico) |
| Invitación | `/e/[slug]/[token]` | Público | Invitados (sin login) |

## Reglas de código (de RULES.md)

- **Cero `any`** — usar `unknown` + type guards, o generics. ESLint fallará si hay `any`.
- `tsconfig.json`: `strict: true`, `noImplicitAny: true`
- Toda mutación de BD va en `src/actions/` (Server Actions), nunca en componentes.
- Toda query de BD multi-tenant usa `withTenantFilter(tenantId)` sin excepción.
- Super Admin tiene `tenantId: null` en BD. El middleware valida `role === 'super_admin'`.

## Cómo trabajar en este proyecto

Siempre que vayas a implementar algo nuevo:
1. Leer el doc de `md/` del rol afectado antes de escribir código
2. Construir en slices verticales finos (un endpoint + su UI a la vez)
3. Verificar aislamiento multi-tenant en cada Server Action antes de considerar terminado
4. No añadir features que no estén en el roadmap del doc de negocio

---

@E:\JORGE\MIS PROYECTOS\agent-skills\skills\incremental-implementation\SKILL.md
@E:\JORGE\MIS PROYECTOS\agent-skills\skills\spec-driven-development\SKILL.md
@E:\JORGE\MIS PROYECTOS\agent-skills\skills\planning-and-task-breakdown\SKILL.md
@E:\JORGE\MIS PROYECTOS\agent-skills\skills\test-driven-development\SKILL.md
@E:\JORGE\MIS PROYECTOS\agent-skills\skills\api-and-interface-design\SKILL.md
@E:\JORGE\MIS PROYECTOS\agent-skills\skills\frontend-ui-engineering\SKILL.md
@E:\JORGE\MIS PROYECTOS\agent-skills\skills\security-and-hardening\SKILL.md
@E:\JORGE\MIS PROYECTOS\agent-skills\skills\debugging-and-error-recovery\SKILL.md
@E:\JORGE\MIS PROYECTOS\agent-skills\skills\code-review-and-quality\SKILL.md
