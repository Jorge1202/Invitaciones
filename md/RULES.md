# Principios y Reglas del Sistema (InvitaWeb)

Este documento establece las reglas fundamentales de arquitectura y desarrollo para este proyecto. Todo el código nuevo o refactorizado debe apegarse estrictamente a estos principios.

## 1. Cero Tolerancia al uso de `any`

**Regla de Oro:** Queda estrictamente prohibido el uso de `any` en todo el sistema. 

- **Aplica para:** Variables, parámetros, retornos de funciones, interfaces, tipos y aserciones de tipos.
- **Razón:** El uso de `any` desactiva completamente el sistema de tipos de TypeScript, lo cual nos expone a errores impredecibles en tiempo de ejecución, pérdida de autocompletado en el IDE y dificulta refactorizaciones futuras.
- **Alternativas requeridas:** 
  - Si no conoces la forma exacta del objeto, utiliza `unknown` y valida el dato (Type Guards).
  - Usa interfaces o Generics (`<T>`) para tipos dinámicos.
  - En librerías de terceros (como NextAuth o Express), utiliza el "Module Augmentation" (extender módulos) para tipar correctamente los objetos globales.

### Cómo aplicarlo a nivel de proyecto

Para hacer cumplir esta regla automáticamente, el proyecto debe estar configurado de la siguiente manera:

1. En `tsconfig.json`: Asegurarse de tener `"noImplicitAny": true` y `"strict": true`.
2. En `.eslintrc.json` (ESLint): Activar la regla `"@typescript-eslint/no-explicit-any": "error"` para que el proceso de compilación falle si se detecta un `any`.