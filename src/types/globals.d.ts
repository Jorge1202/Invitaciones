export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "super_admin" | "tenant_admin" | "event_owner" | "guest";
      tenantId?: string;
    };
  }
}
