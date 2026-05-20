/invitaweb-app
├── src/
│   ├── app/
│   │   ├── (public)/                 # Landing page, precios, contacto
│   │   │   ├── page.tsx              # invitaweb.com
│   │   │   └── layout.tsx
│   │   │
│   │   ├── command/                  # 👑 SUPER ADMIN (Dark Mode)
│   │   │   ├── auth/
│   │   │   │   └── [[...sign-in]]/page.tsx  # Login oculto: /command/auth
│   │   │   ├── tenants/              # CRUD de revendedores
│   │   │   ├── templates/            # Gestor maestro de plantillas
│   │   │   ├── layout.tsx            # Fuerza UI oscura y valida rol
│   │   │   └── page.tsx              # Dashboard global
│   │   │
│   │   ├── studio/                   # 🤝 REVENDEDOR (Light Mode / Marca Blanca)
│   │   │   ├── auth/
│   │   │   │   └── [[...sign-in]]/page.tsx  # Login público: /studio/auth
│   │   │   ├── checkout/
│   │   │   │   └── pending/page.tsx  # "Usuarios huérfanos" (Pago en MercadoPago pendiente)
│   │   │   ├── events/               # CRUD de eventos del tenant
│   │   │   ├── guests/               # Base de datos de invitados
│   │   │   ├── layout.tsx            # Fuerza UI clara y carga logo del tenant
│   │   │   └── page.tsx              # Dashboard del negocio
│   │   │
│   │   ├── e/                        # 🎉 INVITADOS (Rutas públicas dinámicas)
│   │   │   └── [slug]/               # Ej: /e/boda-ana-carlos
│   │   │       ├── [token]/          # Ej: /e/boda-ana-carlos/tk-123abc
│   │   │       │   └── page.tsx      # La invitación renderizada + RSVP
│   │   │       └── stats/            # 💍 ORGANIZADOR (Link mágico)
│   │   │           └── [secret]/page.tsx # Dashboard de su evento
│   │   │
│   │   └── api/                      # Endpoints de Backend
│   │       ├── webhooks/
│   │       │   ├── clerk/route.ts    # Sincroniza usuarios con tu BD
│   │       │   └── mercadopago/route.ts # Activa suscripciones
│   │       └── api/                  # Endpoints externos (si es necesario)
│   │
│   ├── actions/                      # ⚡ Server Actions (Mutaciones de BD)
│   │   ├── tenant-actions.ts         # ej: actualizar branding del revendedor
│   │   ├── event-actions.ts          # ej: crear evento con withTenantFilter()
│   │   └── rsvp-actions.ts           # ej: invitado confirma asistencia
│   │
│   ├── components/                   # UI Compartida y Específica
│   │   ├── command/
│   │   ├── studio/
│   │   └── shared/
│   │
│   ├── types/                        # 🏷️ TypeScript Globales
│   │   ├── globals.d.ts              # Custom Claims de Clerk (tenantId, role)
│   │   └── prisma.d.ts               # Tipos extendidos del ORM
│   │
│   ├── lib/                          # Lógica de negocio
│   │   ├── prisma.ts                 # Instancia de BD y withTenantFilter()
│   │   ├── upstash.ts                # Conexión Redis (Kill Switch / Caché)
│   │   └── utils.ts
│   │
│   └── middleware.ts                 # 🛡️ El guardián de roles de Clerk