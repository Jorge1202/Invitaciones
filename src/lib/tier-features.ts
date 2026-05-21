/**
 * Definición canónica de qué incluye cada tier de plantilla.
 * Úsalo como fuente de verdad en el editor, en el catálogo y en el checkout del tenant.
 */

export type TemplateTierKey = "basic" | "pro" | "vip";

export interface TierDefinition {
  key:         TemplateTierKey;
  label:       string;
  tagline:     string;
  color:       string;   // Tailwind arbitrary / inline style
  bgColor:     string;
  borderColor: string;
  emoji:       string;

  /** Secciones que esta tier puede incluir */
  sections: string[];

  /** Features booleanas disponibles */
  features: {
    hasMusic:       boolean;
    hasCountdown:   boolean;
    hasGallery:     boolean;
    hasRSVP:        boolean;
    hasGifts:       boolean;
    hasItinerary:   boolean;
    hasBankTransfer:boolean;   // CLABE / transferencia bancaria
    hasAnimations:  boolean;   // Framer Motion premium
    hasMultiLocation:boolean;  // más de 1 ubicación
  };

  /** Máximo de ubicaciones permitidas */
  maxLocations: number;

  /** Plan de Tenant mínimo para acceder */
  requiredTenantPlan: "basic" | "deluxe" | "vip";
}

export const TIER_FEATURES: Record<TemplateTierKey, TierDefinition> = {

  basic: {
    key:         "basic",
    label:       "Básica",
    tagline:     "Esencial y elegante",
    color:       "#6B7280",
    bgColor:     "#F3F4F6",
    borderColor: "#D1D5DB",
    emoji:       "✦",

    sections: ["hero", "quote", "family", "locations", "rsvp"],

    features: {
      hasMusic:        false,
      hasCountdown:    false,
      hasGallery:      false,
      hasRSVP:         true,
      hasGifts:        false,
      hasItinerary:    false,
      hasBankTransfer: false,
      hasAnimations:   false,
      hasMultiLocation:false,
    },

    maxLocations:        1,
    requiredTenantPlan: "basic",
  },

  pro: {
    key:         "pro",
    label:       "Pro",
    tagline:     "Completa y memorable",
    color:       "#7C3AED",
    bgColor:     "#EDE9FE",
    borderColor: "#C4B5FD",
    emoji:       "✦✦",

    sections: ["hero", "quote", "countdown", "family", "itinerary", "locations", "details", "gifts", "rsvp"],

    features: {
      hasMusic:        true,
      hasCountdown:    true,
      hasGallery:      false,
      hasRSVP:         true,
      hasGifts:        true,
      hasItinerary:    true,
      hasBankTransfer: false,
      hasAnimations:   true,
      hasMultiLocation:true,
    },

    maxLocations:        3,
    requiredTenantPlan: "deluxe",
  },

  vip: {
    key:         "vip",
    label:       "VIP",
    tagline:     "Experiencia premium total",
    color:       "#B8745A",
    bgColor:     "#FDF2EE",
    borderColor: "#F0C5B2",
    emoji:       "✦✦✦",

    sections: ["hero", "quote", "countdown", "family", "itinerary", "locations", "details", "gifts", "rsvp"],

    features: {
      hasMusic:        true,
      hasCountdown:    true,
      hasGallery:      true,
      hasRSVP:         true,
      hasGifts:        true,
      hasItinerary:    true,
      hasBankTransfer: true,
      hasAnimations:   true,
      hasMultiLocation:true,
    },

    maxLocations:        5,
    requiredTenantPlan: "vip",
  },
};

/** Lista ordenada de tiers para iterar en UI */
export const TIER_LIST: TierDefinition[] = [
  TIER_FEATURES.basic,
  TIER_FEATURES.pro,
  TIER_FEATURES.vip,
];

/** Labels legibles para mostrar en UI */
export const TIER_LABELS: Record<TemplateTierKey, string> = {
  basic: "Básica",
  pro:   "Pro",
  vip:   "VIP",
};

/** Verifica si un plan de tenant puede acceder a un tier de plantilla */
export function canTenantAccessTier(
  tenantPlan: "basic" | "deluxe" | "vip",
  templateTier: TemplateTierKey,
): boolean {
  const order: Record<string, number> = { basic: 0, deluxe: 1, vip: 2 };
  const required = order[TIER_FEATURES[templateTier].requiredTenantPlan] ?? 0;
  const actual   = order[tenantPlan] ?? 0;
  return actual >= required;
}
